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
  if ('locale' in user) $('#lang-flag').attr('src', '/img/' + user.locale + '.png')
  if ('lang' in user) $('#lang-flag').attr('src', '/img/' + user.lang + '.png')
  $.ajax({
    url: "https://saas.saashup.com/api/account/" + user.email,
    beforeSend: function (xhr) {
      xhr.setRequestHeader("x-auth-token", user.jwt.token)
    }
  }).done(function (result) {
    account = result;
    if (account === null || (!("saas" in account)) || Object.keys(account.saas).length === 0 ) setup();
    else display();
  }).fail(function (jqXHR, textStatus, errorThrown) {
    if (["401", "403"].includes(jqXHR.status.toString())) {
      $("#modalNotificationOk").attr("disabled", true)
      $("#modalNotificationTitle").html(findLang("logout-required-title-text", myLang));
      $("#modalNotificationContent").html('<div class="text-center">' + findLang("logout-required-text", myLang) + '</div>');
      $("#modalNotificationOk").unbind();
      $("#modalNotification").modal("show");
      setTimeout(function () {
        logout()
      }, 1200);
    } else setup();
  })

}

const login = async (targetUrl) => {
  try {
    const options = {
      redirect_uri: window.location.origin + '/saas.html'
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
      returnTo: window.location.origin
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
    window.history.replaceState({}, document.title, "/");
  }

};