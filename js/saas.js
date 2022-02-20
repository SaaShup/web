const stripe = Stripe("pk_test_51K9TqNIIM9R6uh6Yw8aRxGFXvehMZqKdzuaNKEQCBwCMvR0HVs9lqJBzsSWEoAa76zDDsaoAnCJfca74mGpjNaXX009rj5eo3y");
const appParams = new URLSearchParams(window.location.search);
var account = null;

function cls() {
    $("#image-card").addClass("d-none");
    $("#saas").addClass("d-none");
    $("#admin").addClass("d-none");
}

function admin() {
    cls()
    if (account.id === "") {
        $("#register-div").removeClass("d-none");
    } else $("#register-div").addClass("d-none");
    if (account.payments.length > 0) {
        const c = account.payments[0];
        $("#profile-card").html('<div class="container"><div class="row"><div class="col-4"><i class="fab fa-cc-visa fa-3x text-primary"></i> </div><div class="col-6 text-uppercase px-1 pt-2"><b>' + c.card.brand + ' **** ' + c.card.last4 + '</b><br><i class="small muted">' + findLang("expire-text", myLang) + ' ' + c.card.exp_month + '/' + c.card.exp_year + '</i></div><div class="col-2"><button class="btn btn-outline-danger" data-toggle="tooltip" data-placement="top" title="Delete payment" onclick="deletePayment(\'' + c.id + '\');" ' + (parseInt(account.amount) === 0 ? 'disabled' : 'disabled') + '><i class="fas fa-trash-alt"></i> </button></div></div></div>')
        $("#profile-card").removeClass("d-none");
    } else $("#profile-card").addClass("d-none");
    if (account.id !== "" && account.payments.length === 0) {
        $("#add-card").removeClass("d-none");
    } else $("#add-card").addClass("d-none");
    $("#admin").removeClass("d-none")
}

function setup() {
    cls()
    $("#saas").removeClass("d-none")
}

function display() {
    const key = Object.keys(account.saas)[0];
    $("#my-image").html(key);
    $("#my-status").html(account.saas[key].status)
    account.saas[key].status === "ok" ?  $("#my-status").addClass("bg-success") : $("#my-status").addClass("bg-warning")
    $("#image_admin").html((key.split('/').length > 1 ? key.split('/')[1] : key) + ".saashup.com/admin");
    $("#image_admin_href").attr("href", "https://" + (key.split('/').length > 1 ? key.split('/')[1] : key) + ".saashup.com/admin");
    $("#image_saas").html((key.split('/').length > 1 ? key.split('/')[1] : key) + ".saashup.com");
    $("#image_saas_href").attr("href", "https://" + (key.split('/').length > 1 ? key.split('/')[1] : key) + ".saashup.com");
    $("#image_type").html(account.saas[key].type.toUpperCase());
    $("#image_memory").html(account.saas[key].memory);
    $("#created_at").html(account.saas[key].date.replace('T', ' ').substring(0,19));
    cls()
    $("#image-card").removeClass("d-none")
}

function appLogout() {
    $("#modalQuestionYes").html(findLang('yes-text', myLang))
    $("#modalQuestionTitle").html(findLang('logout-title', myLang))
    $("#modalQuestionContent").html(findLang('logout-question-text', myLang))
    $("#modalQuestion").modal("show");
    $("#modalQuestionYes").unbind();
    $("#modalQuestionYes").on("click", function () {
        logout();
    })
}

function stripeGO() {
    $("#modalNotificationOk").attr("disabled", true)
    $("#modalNotificationOk").unbind();
    $("#modalNotificationTitle").html(findLang('setup-payment-title', myLang));
    $("#modalNotificationContent").html(findLang('setup-payment-text', myLang));
    $("#modalNotification").modal("show");
    $.ajax({
        url: "https://saas.saashup.com/api/payment/session/" + user.email,
        method: "POST",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("x-auth-token", user.jwt.token)
        },
        data: {
            payment_method_types: ["card"],
            success_url: window.location.origin + '/saas.html?payment=success',
            cancel_url: window.location.origin + '/saas.html',
            mode: "setup"
        }
    }).done(function (session) {
        $("#modalNotification").modal("hide");
        stripe.redirectToCheckout({
                "sessionId": session.id
        }).then(function (result) {
            if (result.error) {
                console.log(result)
            }
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $("#modalNotification").modal("hide");
        console.log("error")
    })
}

function appLogout() {
    $("#modalNotification").modal("hide");
    $("#modalQuestionYes").html(findLang('yes-text', myLang))
    $("#modalQuestionTitle").html(findLang('logout-title', myLang))
    $("#modalQuestionContent").html(findLang('logout-question-text', myLang))
    $("#modalQuestion").modal("show");
    $("#modalQuestionYes").unbind();
    $("#modalQuestionYes").on("click", function () {
        logout();
    })
}

$(document).ready(function () {
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();

    $('.nav-link').on('click', function() {
        $( ".nav-link" ).each(function() { 
            $(this).removeClass('active');
        })
        $(this).addClass('active')
    })

    updateLang('en');
    
    if (appParams.has('payment') && appParams.get('payment') === "success") {
        window.history.replaceState({}, document.title, "/saas.html");
    }

    $("#nav-admin-btn").on('click', function() {
        admin();
    })

    $("#nav-home-btn").on('click', function() {
        if (account === null || (!("saas" in account)) || Object.keys(account.saas).length === 0 ) setup();
        else display();
    })

    $("#delete-saas").on("click", function (event) {
        event.preventDefault()
        $("#modalQuestionTitle").html(findLang("delete_saas_title", myLang));
        $("#modalQuestionContent").html(findLang("delete_saas_text", myLang));
        $("#modalQuestionYes").unbind();
        $("#modalQuestionYes").on("click", function () {
            $("#modalQuestion").modal("hide");
            $("#modalNotificationTitle").html(findLang("delete_saas_title", myLang));
            $("#modalNotificationContent").html('<div class="container text-center">' + findLang("delete_saas_text_wait", myLang) + "<br><br>" + '<div class="spinner-div text-center"><div class="spinner-circle"><div class="spinner"></div><img class="spinner-img" src="/img/saashup2.png" width="32" height="32"/></div></div></div>');
            $("#modalNotification").modal("show");
            $.ajax({
                url: "https://saas.saashup.com/api/saas/" + user.email + "/" + (Object.keys(account.saas)[0].split('/').length > 0 ? Object.keys(account.saas)[0].split('/')[1] : Object.keys(account.saas)[0]),
                method: "DELETE",
                beforeSend: function (xhr) {
                  xhr.setRequestHeader("x-auth-token", user.jwt.token)
                },
                data: { "saas": Object.keys(account.saas)[0] },
                dataType: "json"
              }).done(function (result) {
                  account = result;
                  setTimeout(function () {
                    $("#modalNotification").modal("hide");
                    setup();
                  }, 1000);
              }).fail(function (jqXHR, textStatus, errorThrown) {
                $("#modalNotification").modal("hide");
                if (["401", "403"].includes(jqXHR.status.toString())) {
                    $("#modalNotificationOk").attr("disabled", true)
                    $("#modalNotificationTitle").html(findLang("logout-required-title-text", myLang));
                    $("#modalNotificationContent").html('<div class="text-center">' + findLang("logout-required-text", myLang) + '</div>');
                    $("#modalNotificationOk").unbind();
                    $("#modalNotification").modal("show");
                    setTimeout(function () {
                      logout()
                    }, 1200);
                    return
                }
              })
        })
        $("#modalQuestion").modal("show");
    })

    $("#create-saas").on("click", function (event) {
        if ($("#image").val().length === 0) {
            event.preventDefault()
            $("#modalNotificationTitle").html(findLang("create_saas_error_title", myLang));
            $("#modalNotificationContent").html(findLang("create_saas_empty", myLang));
            $("#modalNotification").modal("show");
            return
        }
        if ($("#image").val().startsWith("portainer") || $("#image").val().startsWith("nodered")) {
            event.preventDefault()
            $("#modalNotificationTitle").html(findLang("create_saas_error_title", myLang));
            $("#modalNotificationContent").html(findLang("create_saas_image_not_permitted", myLang));
            $("#modalNotification").modal("show");
            return
        }
        $("#modalNotificationTitle").html(findLang("create_saas_title", myLang));
        $("#modalNotificationContent").html('<div class="container text-center">' + findLang("create_saas_text", myLang) + "<br><br>" + '<div class="spinner-div text-center"><div class="spinner-circle"><div class="spinner"></div><img class="spinner-img" src="/img/saashup2.png" width="32" height="32"/></div></div></div>');
        $("#modalNotification").modal("show");
        $.ajax({
            url: "https://saas.saashup.com/api/saas/" + user.email,
            method: "POST",
            beforeSend: function (xhr) {
              xhr.setRequestHeader("x-auth-token", user.jwt.token)
            },
            dataType: "json",
            data: {
                image: $("#image").val(),
                type: $("#plan-type-select").val().toLowerCase(),
                port: $("#port").val(),
                price: $("#price").val(),
                password: $("#password").val() || "password",
                memory: $("#memory").val()
            }
          }).done(function (result) {
              account = result;
              setTimeout(function () {
                $("#modalNotification").modal("hide");
                display();
              }, 1000)
          }).fail(function (jqXHR, textStatus, errorThrown) {
            $("#modalNotification").modal("hide");
            if (["401", "403"].includes(jqXHR.status.toString())) {
                $("#modalNotificationOk").attr("disabled", true)
                $("#modalNotificationTitle").html(findLang("logout-required-title-text", myLang));
                $("#modalNotificationContent").html('<div class="text-center">' + findLang("logout-required-text", myLang) + '</div>');
                $("#modalNotificationOk").unbind();
                $("#modalNotification").modal("show");
                setTimeout(function () {
                  logout()
                }, 1200);
                return
            }
            if (["402"].includes(jqXHR.status.toString())) {
                $("#modalNotificationTitle").html(findLang("payment-required-title", myLang));
                $("#modalNotificationContent").html('<div class="text-center">' + findLang("payment-required-text", myLang) + '</div>');
                $("#modalNotificationOk").unbind();
                $("#modalNotification").modal("show");
                return
            }
          })
    })

})