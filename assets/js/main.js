const UPGRADE_IMAGE_API_BASE = 'https://manage.saashup.com';
const CONTACT_ENDPOINT = `${UPGRADE_IMAGE_API_BASE}/contact`;
const REGISTRY_CHECK_ENDPOINT = `${UPGRADE_IMAGE_API_BASE}/registry/check`;
let contactTurnstileWidgetId = null;

function setElementStatus(element, message, type) {
  if (!element) return;
  element.textContent = message;
  element.classList.remove('is-success', 'is-error');
  if (type) element.classList.add(`is-${type}`);
}

async function postJson(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  let data = null;
  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    const message = data && (data.message || data.error || data.detail) ? data.message || data.error || data.detail : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data || {};
}

async function getJson(url) {
  const response = await fetch(url);

  let data = null;
  try {
    data = await response.json();
  } catch (error) {
    data = null;
  }

  if (!response.ok) {
    const message = data && (data.message || data.error || data.detail) ? data.message || data.error || data.detail : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data || {};
}

async function checkRegistryImage(dockerImage) {
  const url = new URL(REGISTRY_CHECK_ENDPOINT);
  url.searchParams.set('image', dockerImage);

  const result = await getJson(url.toString());
  if (result.exists === false) {
    throw new Error(result.message || result.error || result.detail || 'This Docker image could not be found.');
  }

  return result;
}

function registryErrorMessage(error) {
  if (error && /failed to fetch|networkerror|load failed/i.test(error.message || '')) {
    return 'Image not found.';
  }

  return error && error.message ? error.message : 'Image not found.';
}

function getTurnstileSiteKey() {
  const meta = document.querySelector('meta[name="turnstile-sitekey"]');
  return meta ? meta.getAttribute('content') : '';
}

function getTurnstileToken(form) {
  const response = form.querySelector('[name="cf-turnstile-response"]');
  return response ? response.value.trim() : '';
}

function resetContactTurnstile() {
  if (window.turnstile && contactTurnstileWidgetId !== null) {
    window.turnstile.reset(contactTurnstileWidgetId);
  }
}

function renderContactTurnstile() {
  const container = document.getElementById('contact-turnstile');
  const siteKey = getTurnstileSiteKey();

  if (!container || !siteKey || !window.turnstile || contactTurnstileWidgetId !== null) return;

  contactTurnstileWidgetId = window.turnstile.render(container, {
    sitekey: siteKey,
    theme: 'auto'
  });
}

window.renderContactTurnstile = renderContactTurnstile;

document.addEventListener('DOMContentLoaded', function() {
  const launchBtn = document.getElementById('docker-launch-btn');
  const imageInput = document.getElementById('docker-image-input');
  const launchStatus = document.getElementById('docker-launch-status');
  const contactForm = document.getElementById('contact-form');

  if (launchBtn && imageInput) {
    launchBtn.addEventListener('click', async function() {
      const dockerImage = imageInput.value.trim();

      if (!dockerImage) {
        setElementStatus(launchStatus, 'Please enter a Docker image.', 'error');
        imageInput.focus();
        return;
      }

      launchBtn.disabled = true;
      setElementStatus(launchStatus, 'Checking registry image...', null);

      try {
        await checkRegistryImage(dockerImage);
        sessionStorage.setItem('dockerImage', dockerImage);
        setElementStatus(launchStatus, 'Image found. Redirecting...', 'success');
        window.location.href = '/login';
      } catch (error) {
        setElementStatus(launchStatus, registryErrorMessage(error), 'error');
        launchBtn.disabled = false;
      }
    });

    imageInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        launchBtn.click();
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
      event.preventDefault();

      const submitBtn = contactForm.querySelector('.contact-submit-btn');
      const contactStatus = document.getElementById('contact-form-status');
      const payload = {
        name: contactForm.querySelector('[name="name"]').value.trim(),
        email: contactForm.querySelector('[name="email"]').value.trim(),
        subject: contactForm.querySelector('[name="subject"]').value.trim(),
        message: contactForm.querySelector('[name="message"]').value.trim(),
        website: contactForm.querySelector('[name="website"]') ? contactForm.querySelector('[name="website"]').value.trim() : '',
        turnstileToken: getTurnstileToken(contactForm),
        source: window.location.href,
        language: document.documentElement.getAttribute('lang') || ''
      };

      if (!payload.name || !payload.email || !payload.subject || !payload.message) {
        setElementStatus(contactStatus, 'Please complete all fields.', 'error');
        return;
      }

      if (getTurnstileSiteKey() && !payload.turnstileToken) {
        setElementStatus(contactStatus, 'Please complete the verification.', 'error');
        return;
      }

      if (submitBtn) submitBtn.disabled = true;
      setElementStatus(contactStatus, 'Sending message...', null);

      try {
        const result = await postJson(CONTACT_ENDPOINT, payload);
        if (result.ok === false) {
          throw new Error(result.message || result.error || result.detail || 'Unable to send your message.');
        }
        contactForm.reset();
        resetContactTurnstile();
        setElementStatus(contactStatus, 'Message sent. We will get back to you soon.', 'success');
      } catch (error) {
        setElementStatus(contactStatus, error.message || 'Unable to send your message.', 'error');
        resetContactTurnstile();
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });
  }

  renderContactTurnstile();
});
