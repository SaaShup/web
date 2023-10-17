var auth0;
var user = null;
var code = null;
var token = null;

if (window.localStorage.getItem('user') !== null) user = JSON.parse(window.localStorage.getItem('user'));

const authParams = new URLSearchParams(window.location.search);
if (authParams.has('code')) code = authParams.get('code')

const init = () => {
  username = user.nickname;
  $('#avatar').attr('src', user.picture).removeClass("d-none");
  if ('locale' in user) $('#lang-flag').attr('src', '/images/' + user.locale + '.png')
  if ('lang' in user) $('#lang-flag').attr('src', '/images/' + user.lang + '.png')
  $.ajax({
    url: "https://saas.saashup.com/api/account/" + user.email,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("x-auth-token", user.jwt.token)
    }
  }).done(function (result) {
    $("#contactEmail").val(user.email)
    if ('id' in result) {
      account = result;
      $('#providers').attr('disabled', false)
      refreshDocker(account.dockers)
      refreshCard(account.engine)
      refreshSaas(account.saas)
      appProfile();
      if (Object.keys(account.dockers).length + Object.keys(account.engine).length + Object.keys(account.saas).length > 0) {
        $("#empty").addClass("d-none")
        $("#admin").addClass("d-none");
        $("#home").removeClass("d-none")
      }
      else $("#nav-admin-btn").click()
      if ('invoices' in account && Object.keys(account.invoices).length > 0) {
        $('#no-invoice-text').addClass('d-none')
        $('#invoice').html('<a href="#" onclick="toggleInvoices();">' + Object.keys(account.invoices).length + ' <span id="there-is-invoice-text">' + findLang("there-is-invoice-text") + '</span></a>')
      }
      if (parseInt(account.amount) === 0) {
        $("#delete").attr('disabled', false)
      }
      if ('payments' in account && account.payments.length > 0) {
        $("#cus-details").removeClass("d-none")
        $("#setup-payment").addClass('disabled')
        $("#cost").html(account.amount + "€")
        $("#next-cost").html(parseInt(parseInt(account.amountEngine) + parseInt(account.amountSaas) + parseInt(account.amountDocker)) + "€")
        for (const c of account.payments) {
          $("#card-info-none").addClass('d-none')
          $("#card-info").html('<div class="container"><div class="row"><div class="col-4"><i class="fab fa-cc-visa fa-3x text-primary"></i> </div><div class="col-6 text-uppercase px-1 pt-2"><b>' + c.card.brand + ' **** ' + c.card.last4 + '</b><br><i class="small muted">' + findLang("expire-text") + ' ' + c.card.exp_month + '/' + c.card.exp_year + '</i></div><div class="col-2"><button class="btn btn-outline-danger" data-toggle="tooltip" data-placement="top" title="Delete payment" onclick="deletePayment(\'' + c.id + '\');" ' + (parseInt(account.amount) === 0 ? '' : 'disabled') + '><i class="fas fa-trash-alt"></i> </button></div></div></div>')
        }
      } else {
        $("#setup-payment").removeClass('disabled')
        $("#delete").attr('disabled', false)
      }
    } else {
      $("#delete").attr('disabled', false)
    }
    $("#app").removeClass("d-none");
  }).fail(function (jqXHR, textStatus, errorThrown) {
    if (["401", "403"].includes(jqXHR.status.toString())) {
      $("#modalNotificationOk").attr("disabled", true)
      $("#modalNotificationTitle").html(findLang("logout-required-title-text"));
      $("#modalNotificationContent").html('<div class="text-center">' + findLang("logout-required-text") + '</div>');
      setTimeout(function () {
        logout()
      }, 1200);
    } else {
      $("#modalNotificationOk").attr("disabled", false)
      $("#modalNotificationTitle").html(findLang('Oops'));
      $("#modalNotificationContent").html('<div class="text-center">' + findLang("auth-sth-wrong-required-text") + '</div>');
      $("#maintenance").removeClass('d-none')
      $("#status-dot").addClass('bg-danger').addClass('text-danger');
    }
    $("#modalNotificationOk").unbind();
    $("#modalNotification").modal("show");
  })
}

const login = async (targetUrl) => {
  try {
    const options = {
      redirect_uri: window.location.origin + '/saas'
    };

    if (targetUrl) {
      options.appState = {
        targetUrl
      };
    }

    await auth0.loginWithRedirect(options);
  } catch (err) {
    console.log("Log in failed", err);
  }
};

const logout = async () => {
  try {
    await configureClient();
    user = null
    localStorage.removeItem('user');
    auth0.logout({
      returnTo: window.location.origin + '/saas'
    });
  } catch (err) {
    console.log("Log out failed", err);
  }
};

const configureClient = async () => {
  const config = {
    domain: 'saashup.eu.auth0.com',
    client_id: 'B2TB9BENupFqymrTHwmlaYvXV3FjUEtu',
    audience: "https://saashup.eu.auth0.com/api/v2/"
  }
  auth0 = await createAuth0Client(config);
};

window.onload = async () => {

  if (user !== null) {
    if (!('jwt' in user)) return logout();
    init();
    return
  }

  await configureClient();

  if (code === null && user === null) return login()
  const isAuthenticated = await auth0.isAuthenticated();

  if (isAuthenticated) {
    window.history.replaceState({}, document.title, window.location.pathname);
    return;
  }

  const query = window.location.search;

  if (query.includes("code=") && query.includes("state=")) {
    try {
      const result = await auth0.handleRedirectCallback();
      user = await auth0.getUser();
      let token = await auth0.getTokenSilently();
      let jwt = JSON.parse(atob(token.split('.')[1]));
      user.jwt = {
        token: token,
        key: jwt.azp,
        exp: jwt.exp
      }
      
      'locale' in user ? user.lang = user.locale : user.lang = 'en';
      window.localStorage.setItem('user', JSON.stringify(user))
      
      init();

    } catch (err) {
      console.log("Error parsing redirect:", err);
    }
    window.history.replaceState({}, document.title, "/saas");
  }

};