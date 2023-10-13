const stripe = Stripe("pk_live_51KYzUAIN4YVCUfYxvj2HyC2Sw4kLUcRT2g9VS1twIiV11y9kAhODHOTFZ1PaFKgNkrNlfqGRsil3np18DcCAqwie002zBfjeUO");
const appParams = new URLSearchParams(window.location.search);
var account = null;

function handlePathLang (lang) {
    window.localStorage.setItem('lang', lang)
}

function setHomePath () {
    var langSite = ['en', 'en-us', 'fr-fr', 'de-de'];
    var langUserAuth0 = ['en', 'en', 'fr', 'de'];
    var i = 0;

    for (i = 0 ; i < langUserAuth0.length ; i++) {
        if (langUserAuth0[i] === user.lang) {
            console.log(langUserAuth0[i], langSite[i]);
            break;
        }
    }
    handlePathLang(langSite[i]);
    $('#homelogo').attr('href', '/' + langSite[i]);
    return '/' + langSite[i];
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("homelogo").href = setHomePath();
});

function apiFail(jqXHR, textStatus, errorThrown) {
    switch (jqXHR.status.toString()) {
        case "401":
        case "403":
            setTimeout(function () {
                $("#modalNotificationOk").attr("disabled", true)
                $("#modalNotificationTitle").html(findLang("logout-required-title-text"));
                $("#modalNotificationContent").html('<div class="text-center">' + findLang("logout-required-text") + '</div>');
                logout()
            }, 5000);
            break;
        case "402":
            $("#modalNotificationOk").attr("disabled", false)
            $("#modalNotificationTitle").html('Payment required');
            $("#modalNotificationContent").html('<div class="text-center">' + findLang("limit-reached-text") + '</div>');
            break;
        default:
            $("#modalNotificationOk").attr("disabled", false)
            $("#modalNotificationTitle").html(findLang('Oops'));
            $("#modalNotificationContent").html('<div class="text-center">' + findLang("auth-sth-wrong-required-text") + '</div>');
    }
    $("#modalNotificationOk").unbind();
    $("#modalQuestionDialog").removeClass('modal-xl');
    $("#modalQuestion").modal("hide");
    $("#modalNotification").modal("show");
}

function appLogout() {
    $("#modalNotification").modal("hide");
    $("#modalQuestionYes").html(findLang('modalDockerYes'))
    $("#modalQuestionTitle").html(findLang('logout-title'))
    $("#modalQuestionContent").html(findLang('logout-question-text'))
    $("#modalQuestion").modal("show");
    $("#modalQuestionYes").unbind();
    $("#modalQuestionYes").on("click", function () {
        logout();
    })
}

function cls() {
    $("#empty").addClass("d-none")
    $("#home").addClass("d-none");
    $("#admin").addClass("d-none");
}

function saveProfile() {
    if ($("#billing-country").val().length !== 2) {
        $("#billing-country").addClass("is-invalid");
        $("#billing-country-toast").toast("show")
        return
    }
    if (!($("#billing-phone").val().match(/^\d{8,15}$/))) {
        $("#billing-phone").addClass(" is-invalid");
        $("#billing-phone-toast").toast("show")
        return
    }
    $("#modalNotificationTitle").html(findLang("saveLabel"));
    $("#modalNotificationContent").html('<div class="container text-center">' + findLang("save-text") + "<br><br>" + '<div class="spinner-div text-center"><div class="spinner-circle-lg"><div class="spinner-lg"></div><img class="spinner-img" src="/images/saashup2.png" width="128" height="128"/></div></div></div>');
    $("#modalNotification").modal("show");
    $("#modalNotificationOk").attr("disabled", true)
    $.ajax({
        url: "https://saas.saashup.com/api/account/" + account["id"] + "/payment/" + user["email"] + "/pm/" + account.payments[0].id,
        method: "PUT",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("x-auth-token", user.jwt.token)
        },
        dataType: "json",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: {
            billing_details: {
                address: {
                    city: $("#billing-city").val(),
                    country: $("#billing-country").val(),
                    line1: $("#billing-street").val(),
                    postal_code: $("#billing-zip").val()
                },
                name: $("#billing-name").val(),
                phone: $("#billing-phone").val()
            }
        }
    }).done(function (result) {
        account = result;
        setTimeout(function () {
            $("#modalNotification").modal("hide");
            $("#nav-admin-btn").click();
        }, 1000)
    }).fail(function (jqXHR, textStatus, errorThrown) {
        apiFail(jqXHR, textStatus, errorThrown);
    })
}

function appProfile() {
    let provider = '<i class="fas fa-database fa-2x text-primary"></i>'
    if (user.sub.startsWith('google-oauth2')) provider = '<i class="fab fa-google fa-2x  text-danger"></i>';
    if (user.sub.startsWith('github')) provider = '<i class="fab fa-github fa-2x"></i>';
    if (user.sub.startsWith('auth0')) provider = '<img src="https://avatars.githubusercontent.com/u/2824157" width="48px" class="rounded-circle" />';
    if (user.sub.startsWith('oauth2|discord')) provider = '<i class="fab fa-discord fa-2x" style="color:#5865F2;"></i>';
    rows = '<div class="container"><div class="row">';
    if (account) rows += '<div class="col-12"><div class="mb-1 row"><div class="col-6 text-center"><img class="rounded-circle" src="' + user.picture + '" width="64px;"></div><div class="col-6"><label class="col-sm-12 col-md-12 col-form-label">' + findLang('name-text') + '</label><div class="col-sm-12 col-md-12 "><input class="form-control-plaintext" value="' + user.name + '" readonly /></div></div></div></div>\
    <div class="col-12"><div class="mb-1 row"><label class="col-6 col-form-label">Provider</label><div class="col-6">' + provider + '</div></div></div>\
    <div class="col-12"><div class="mb-1 row"><label class="col-sm-12 col-md-6 col-form-label">' + findLang('email-text') + ':</label><div class="col-sm-12 col-md-6 "><input type="text" class="form-control-plaintext" value="' + user.email + '" readonly /></div></div></div>\
    <div class="col-12"><div class="mb-1 row"><label class="col-sm-12 col-md-6 col-form-label">' + findLang('lang-text') + ':</label><div class="col-sm-12 col-md-6 "><img src="/images/' + ('locale' in user ? user.locale : 'en') + '.png" width="32px;"/></div></div></div>\
    <div class="col-12"><div class="mb-1 row"><label class="col-sm-12 col-md-6 col-form-label">' + findLang('creation-date-text') + ':</label><div class="col-sm-12 col-md-6 "><input type="text" class="form-control-plaintext" value="' + account.date.replace('T', ' ').substring(0, 19) + '" readonly /></div></div></div>\
    <div class="col-12"><div class="mb-1 row"><label class="col-6 col-form-label">' + findLang('engine-limits-text') + ':</label><div class="col-6">' + Object.keys(account.engine).length + ' / ' + account.limits.engine + ' ' + (parseInt(account.limits.engine) <= Object.keys(account.engine).length ? '<i class="fas fa-exclamation-circle text-warning">' : '') + '</i></div></div></div>\
    <div class="col-12"><div class="mb-1 row"><label class="col-6 col-form-label">' + findLang('dockers-limits-text') + ':</label><div class="col-6">' + Object.keys(account.dockers).length + ' / ' + account.limits.dockers + ' ' + (parseInt(account.limits.dockers) <= Object.keys(account.dockers).length ? '<i class="fas fa-exclamation-circle text-warning">' : '') + '</i></div></div></div>\
    <div class="col-12"><div class="mb-1 row"><label class="col-6 col-form-label">' + findLang('saas-limits-text') + ':</label><div class="col-6">' + Object.keys(account.saas).length + ' / ' + account.limits.saas + ' ' + (parseInt(account.limits.saas) <= Object.keys(account.saas).length ? '<i class="fas fa-exclamation-circle text-warning">' : '') + '</i></div></div></div>';

    if ('payments' in account && account.payments.length > 0) rows += '<div class="container"><div class="row">\
    <div class="col-12"><div class="mb-3 row"><label class="col-sm-12 col-md-6 col-form-label">' + findLang('companyLabel') + '</label><div class="col-sm-12 col-md-6 "><input id="billing-name" class="form-control" value="' + account.payments[0].billing_details.name + '" /></div></div></div>\
    <div class="col-12"><div class="mb-3 row"><label class="col-sm-12 col-md-6 col-form-label">' + findLang('phoneLabel') + '</label><div class="col-sm-12 col-md-6 "><input id="billing-phone" type="text" class="form-control" value="' + account.payments[0].billing_details.phone + '" /><div class="toast" data-bs-delay="1000" id="billing-phone-toast" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-body">XXXXXXXXXXXX format</div></div></div></div></div>\
    <div class="col-12"><div class="mb-3 row"><label class="col-sm-12 col-md-6 col-form-label">' + findLang('streetLabel') + '</label><div class="col-sm-12 col-md-6 "><input id="billing-street" type="text" class="form-control" value="' + account.payments[0].billing_details.address.line1 + '" /></div></div></div>\
    <div class="col-12"><div class="mb-3 row"><label class="col-sm-12 col-md-6 col-form-label">' + findLang('zipLabel') + '</label><div class="col-sm-12 col-md-6 "><input id="billing-zip" type="text" class="form-control" value="' + account.payments[0].billing_details.address.postal_code + '" /></div></div></div>\
    <div class="col-12"><div class="mb-3 row"><label class="col-sm-12 col-md-6 col-form-label">' + findLang('cityLabel') + '</label><div class="col-sm-12 col-md-6 "><input id="billing-city" type="text" class="form-control" value="' + account.payments[0].billing_details.address.city + '" /></div></div></div>\
    <div class="col-12"><div class="mb-3 row"><label class="col-sm-12 col-md-6 col-form-label">' + findLang('countryLabel') + '</label><div class="col-sm-12 col-md-6 "><input id="billing-country" type="text" class="form-control" value="' + account.payments[0].billing_details.address.country + '" /><div class="toast" data-bs-delay="1000" id="billing-country-toast" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-body">2 LETTERS COUNTRY</div></div></div></div></div>\
    </div></div>'
    rows += '<div class="col-6"><p class="text-center"><button class="btn btn-outline-primary ' + ('payments' in account && account.payments.length > 0 ? '' : 'd-none') + '" onclick="saveProfile();">Save</button></p></div>'
    rows += '<div class="col-6"><p class="text-center"><button class="btn btn-danger" onclick="appLogout();">Logout</button></p></div>\
    </div></div>';
    $("#profile").html(rows);
}

function stripeGO() {
    $("#modalNotificationOk").attr("disabled", true)
    $("#modalNotificationOk").unbind();
    $("#modalNotificationTitle").html(findLang('setup-payment-title'));
    $("#modalNotificationContent").html(findLang('setup-payment-text'));
    $("#modalNotification").modal("show");
    $("#modalNotificationOk").attr("disabled", true)
    $.ajax({
        url: "https://saas.saashup.com/api/payment/session/" + user.email,
        method: "POST",
        dataType: "json",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("x-auth-token", user.jwt.token)
        },
        data: {
            payment_method_types: ["card"],
            success_url: window.location.origin + '/saas?payment=success',
            cancel_url: window.location.origin + '/saas?payment=cancelled',
            mode: "setup"
        }
    }).done(function (session) {
        $("#modalNotification").modal("hide");
        stripe.redirectToCheckout({
                "sessionId": session.id
            })
            .then(function (result) {
                if (result.error) {
                    console.log(result)
                }
            });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        apiFail(jqXHR, textStatus, errorThrown);
    })
}

function removeEngine(id) {
    $("#modalQuestionTitle").html(findLang("delete_engine_title"));
    $("#modalQuestionContent").html(findLang("delete_engine_text") + id + "?");
    $("#modalQuestionYes").unbind();
    $("#modalQuestionYes").on("click", function () {
        $("#modalQuestion").modal("hide");
        $("#modalNotificationTitle").html(findLang("delete_engine_title"));
        $("#modalQuestionYes").html(findLang("modalQuestionYes"))
        $("#modalNotificationContent").html('<div class="container text-center">' + findLang("delete_engine_text_wait") + "<br><br>" + '<div class="spinner-div text-center"><div class="spinner-circle-lg"><div class="spinner-lg"></div><img class="spinner-img" src="/images/saashup2.png" width="128" height="128"/></div></div></div>');
        $("#modalNotification").modal("show");
        $.ajax({
            url: "https://saas.saashup.com/api/engine/" + user.email + "/" + Object.keys(account.engine)[0],
            method: "DELETE",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("x-auth-token", user.jwt.token)
            },
            data: {
                "engine": id
            },
            dataType: "json"
        }).done(function (result) {
            account = result;
            setTimeout(function () {
                $("#modalNotification").modal("hide");
                refreshCard(account.engine);
            }, 1000);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            $("#modalNotification").modal("hide");
            apiFail(jqXHR, textStatus, errorThrown);
        })
    })
    $("#modalQuestion").modal("show");
}

function removeDocker(id) {
    $("#modalQuestionYes").html(findLang('modalDockerYes'))
    $("#modalQuestionTitle").html(findLang('remove-docker-title'))
    $("#modalQuestionContent").html(findLang('remove-docker-text') + id + "?")
    $("#modalQuestion").modal("show");
    $("#modalQuestionYes").unbind();
    $("#modalQuestionYes").on("click", function () {
        $("#modalQuestion").modal("hide");
        $("#modalNotificationTitle").html(findLang("remove-docker-spinner-text"));
        $("#modalNotificationContent").html('<div class="container text-center">' + findLang("remove-docker-spinner-text") + "<br><br>" + '<div class="spinner-div text-center"><div class="spinner-circle-lg"><div class="spinner-lg"></div><img class="spinner-img" src="/images/saashup2.png" width="128" height="128"/></div></div></div>');
        $("#modalNotification").modal("show");
        $.ajax({
            url: "https://saas.saashup.com/api/docker/" + user["email"] + "/" + id,
            method: "DELETE",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("x-auth-token", user.jwt.token)
            }
        }).done(function (result) {
            account = result;
            setTimeout(function () {
                $("#modalNotification").modal("hide");
                $("#nav-home-btn").click();
            }, 1000)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            apiFail(jqXHR, textStatus, errorThrown);
        })
    })
}

function addEngine() {
    if (!('engine' in account)) account.engine = {};
    if (Object.keys(account.engine).length < account.limits.engine) {
        $("#modalNotificationTitle").html(findLang("create_engine_title"));
        $("#modalNotificationContent").html('<div class="container text-center">' + findLang("create_engine_text") + "<br><br>" + '<div class="spinner-div text-center"><div class="spinner-circle-lg"><div class="spinner-lg"></div><img class="spinner-img" src="/images/saashup2.png" width="128" height="128"/></div></div></div>');
        $("#modalNotification").modal("show");
        $.ajax({
            url: "https://saas.saashup.com/api/engine/" + user.email,
            method: "POST",
            timeout: 30000,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("x-auth-token", user.jwt.token)
            },
            dataType: "json",
        }).done(function (result) {
            account = result;
            setTimeout(function () {
                $("#modalNotification").modal("hide");
                $("#nav-home-btn").click();
            }, 1000)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            $("#modalNotification").modal("hide");
            apiFail(jqXHR, textStatus, errorThrown);
        })
    } else {
        $("#modalNotificationOk").unbind();
        $("#modalNotificationContent").html(findLang("limit-reached-text"))
        $("#modalNotification").modal("show");
    }

}

function fileDownload(url, name) {
    fetch(url, {
            headers: {
                "x-auth-token": user.jwt.token
            }
        })
        .then(response => response.blob())
        .then(blob => {
            const blobURL = URLObjectURL(blob);
            const a = document.createElement("a");
            a.href = blobURL;
            a.style = "display: none";

            a.download = name;
            document.body.appendChild(a);
            a.click();
        })
        .catch(() => setError(true));
}

function copyPassword(id) {
    var copyText = document.getElementById("input_server_" + id);
    copyText.focus();
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    $("#clipboard_server_" + id).toast('show');
}

function copyText(id) {
    var copyText = document.getElementById("input_docker_" + id);
    copyText.focus();
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    $("#clipboard_" + id).toast('show');
}

function deletePayment(id) {
    $("#cus-details").removeClass("d-none")
    $("#modalQuestionYes").html(findLang('modalDockerYes'))
    $("#modalQuestionTitle").html(findLang('remove-payment-title'))
    $("#modalQuestionContent").html(findLang('remove-payment-text'))
    $("#modalQuestion").modal("show");
    $("#modalQuestionYes").unbind();
    $("#modalQuestionYes").on("click", function () {
        $("#modalQuestion").modal("hide");
        $.ajax({
            url: "https://saas.saashup.com/api/account/" + account.id + '/payment/' + user.email + "/pm/" + id,
            method: "DELETE",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("x-auth-token", user.jwt.token)
            }
        }).done(function () {
            for (const p in account.payments) {
                if (account.payments[p].id === id) account.payments.splice(p, 1)
            }
            if (account.payments.length > 0) {
                $("#card-info-none").addClass('d-none')
                for (const c of account.payments) {
                    $("#card-info").html('<div class="container"><div class="row"><div class="col-4"><i class="fab fa-cc-visa fa-3x text-primary"></i> </div><div class="col-6 text-uppercase px-1 pt-2"><b>' + c.card.brand + ' **** ' + c.card.last4 + '</b><br><i class="small muted">' + findLang("expire-text") + ' ' + c.card.exp_month + '/' + c.card.exp_year + '</i></div><div class="col-2"><button class="btn btn-outline-danger" data-toggle="tooltip" data-placement="top" title="Delete payment" onclick="deletePayment(\'' + c.id + '\');" ' + (parseInt(account.amount) === 0 ? '' : 'disabled') + '><i class="fas fa-trash-alt"></i> </button></div></div></div>')
                }
            } else {
                $("#card-info-none").removeClass('d-none')
                $("#card-info").html('');
            }
            $('#payment-success').addClass('d-none');
            $("#invoices").html("");
            $('#providers').attr('disabled', true)
            $("#register").html(findLang('register')).removeClass('d-none');
        })
    })
}

function deleteAccount() {
    $("#modalQuestionYes").html(findLang('delete-account-text-btn'))
    $("#modalQuestionTitle").html(findLang('delete-account-title'))
    $("#modalQuestionContent").html(findLang('delete-account-text'))
    $("#modalQuestion").modal("show");
    $("#modalQuestionYes").unbind();
    $("#modalQuestionYes").on("click", function () {
        let paymentTmp = [];
        if (account && 'payments' in account && account.payments !== null) {
            for (const p of account.payments) {
                paymentTmp.push(p.id)
            }
        }
        $("#modalQuestion").modal("hide");
        $.ajax({
            url: "https://saas.saashup.com/api/account/" + user.email,
            method: "DELETE",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("x-auth-token", user.jwt.token)
            },
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                payments: [paymentTmp]
            })
        }).done(function () {
            $("#modalNotificationOk").unbind();
            $("#modalNotificationTitle").html(findLang("logout-required-title-text"));
            $("#modalNotificationContent").html(findLang("logout-bye-text"))
            $("#modalNotification").modal("show");
            $("#modalNotificationOk").on("click", function () {
                logout()
            })
        })
    })
}

function deleteSaas(saas) {
    $("#modalQuestionTitle").html(findLang("delete_saas_title"));
    $("#modalQuestionContent").html(findLang("delete_saas_text"));
    $("#modalQuestionYes").unbind();
    $("#modalQuestionYes").on("click", function () {
        $("#modalQuestion").modal("hide");
        $("#modalNotificationTitle").html(findLang("delete_saas_title"));
        $("#modalNotificationContent").html('<div class="container text-center">' + findLang("delete_saas_text_wait") + "<br><br>" + '<div class="spinner-div text-center"><div class="spinner-circle-lg"><div class="spinner-lg"></div><img class="spinner-img" src="/images/saashup2.png" width="128" height="128"/></div></div></div>');
        $("#modalNotification").modal("show");
        $.ajax({
            url: "https://saas.saashup.com/api/saas/" + user.email + "/" + (saas.split('/').length > 1 ? saas.split('/')[1] : saas),
            method: "DELETE",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("x-auth-token", user.jwt.token)
            },
            data: {
                "saas": saas
            },
            dataType: "json"
        }).done(function (result) {
            account = result;
            setTimeout(function () {
                $("#modalNotification").modal("hide");
                refreshSaas(account.saas);
            }, 1000);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            $("#modalNotification").modal("hide");
            apiFail(jqXHR, textStatus, errorThrown);
        })
    })
    $("#modalQuestion").modal("show");
}

function refreshSaas(saas) {
    $("#saas-list").html('');
    if (Object.keys(saas).length >= parseInt(account.limits.saas)) $("#buySaas").addClass("disabled");
    else $("#buySaas").removeClass("disabled");
    for (const s of Object.keys(saas)) {
        $("#empty").addClass('d-none');
        let bgcolor = 'bg-primary text-white';
        if ($("#searchInput").val() !== "" && s.match($("#searchInput").val())) bgcolor = 'bg-success text-white';
        $("#saas-list").append('<div class="col-sm-12 ' + (Object.keys(saas).length === 1 ? 'col-md-12' : 'col-md-6') + '"><div class="card my-4"><div class="card-header ' + bgcolor + '"><i class="fas fa-cubes"></i> ' + s + '</div><div class="card-body"><div class="container">\
            <div class="row">\
                <div class="col-sm-12 col-md-6 p-1">Saas: <a href="https://' + ('name' in saas[s] ? saas[s].name : s) + '.saashup.com" target="_blank">https://' + ('name' in saas[s] ? saas[s].name : s) + '.saashup.com</a></div>\
                <div class="col-sm-12 col-md-6 p-1">Admin: <a href="https://' + ('name' in saas[s] ? saas[s].name : s) + '.saashup.com/admin" target="_blank">https://' + ('name' in saas[s] ? saas[s].name : s) + '.saashup.com/admin</a></div>\
                <div class="col-sm-6 col-md-6 p-1">Plan: ' + saas[s].type + '</div>\
                <div class="col-sm-6 col-md-6 p-1">Memory: ' + saas[s].memory + ' Mb</div>\
                <div class="col-sm-12 col-md-12 p-1">Created on: ' + saas[s].date.replace('T', ' ').substring(0, 19) + '</div>\
                <div class="col-sm-12 col-md-12 p-1">Upgraded on: ' + ("updated" in saas[s] ? saas[s].updated.replace('T', ' ').substring(0, 19) : saas[s].date.replace('T', ' ').substring(0, 19)) + '</div>\
                <div class="row my-4"><div class="col-4"><span class="badge bg-success px-4 py-2">' + saas[s].status.toUpperCase() + '</span></div>\
                <div class="col-4"><button class="btn btn-outline-primary disabled" onclick="upgradeSaasMemory()"><i class="fas fa-memory"></i> </button></div><div class="col-4"><button class="btn btn-outline-danger" onclick="deleteSaas(\'' + s + '\');"><i class="fas fa-trash-alt"></i></button></div></div>\
            </div></div></div></div></div>')
    }
}

function refreshDocker(dockers) {
    $("#docker-list").html('');
    if (Object.keys(dockers).length >= parseInt(account.limits.dockers)) $("#buyDocker").addClass("disabled");
    else $("#buyDocker").removeClass("disabled");
    let refresh = false
    for (const s in dockers) {
        $("#empty").addClass('d-none');
        $("#trash-" + dockers[s].engine).attr('disabled', true)
        if (dockers[s].status !== "ok") refresh = true;
        let bgcolor = 'bg-primary text-white';
        if ($("#searchInput").val() !== "" && s.match($("#searchInput").val())) bgcolor = 'bg-success text-white';
        $("#docker-list").append('<div class="card"><div class="card-header ' + bgcolor + '"><i class="fab fa-docker"></i> ' + s + '.saashup.com <span style="float:right;"><button class="btn ' + bgcolor + '" data-bs-toggle="collapse" data-bs-target="#docker-card-body-' + s + '"><i class="fas fa-caret-up"></i></button></span></div>\
        <div id="docker-card-body-' + s + '" class="card-body collapse ' + (dockers.length > 3 ? '' : 'show') + '"><div class="container"><div class="row">\
        <div class="col-12 p-1">' + s + '.saashup.com:4242 <input class="form-control d-none" id="input_docker_' + s + '" value="' + s + '.saashup.com:4242" readonly /><a href="#" onclick="copyText(\'' + s + '\');"><i class="fas fa-copy"></i></a>\
        <div class="toast" data-bs-delay="1000" id="clipboard_' + s + '" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-body">Copied to clipboard</div></div></div>\
        <div class="col-8">\
            <div class="col-12 small p-1">' + findLang("dockerRegionLabel") + ' : <span class="p-5"><img width="32" src="/images/' + dockers[s].region + '.png" alt="' + dockers[s].region + '"/></span></div>\
        </div>\
        <div class="col-4 text-center">\
            <img src="https://www.ovhtelecom.fr/images/ovh-fr.jpg" width="32px"/><br>\
            <div class="badge ' + (dockers[s].status === "ok" ? 'bg-success' : 'bg-warning') + '">' + dockers[s].status + '</div>\
        </div>\
        <div class="col-sm-12 col-md-6 small p-1">Engine : <a href="https://' + dockers[s].engine + '.saashup.com" target="_blank">' + dockers[s].engine + '</a></div>\
        <div class="col-sm-12 col-md-6 small p-1">' + findLang("creationLabel") + ' : ' + ('date' in dockers[s] ? dockers[s].date : new Date(parseInt(s)).toISOString().replace('T', ' ').substring(0, 19)) + '</div>\
        <div class="col-sm-12 col-md-6 small p-1">' + findLang("monthlyPriceLabel") + ' : ' + dockers[s].price + '€</div><div class="col-sm-12 col-md-6 small p-1">Type : ' + dockers[s].flavor + '</div>\
        <div class="col-9 small p-1"></div>\
        <div class="col-3 ' + (dockers[s].status === "ok" ? '' : 'd-none') + ' p-1"><button class="btn btn-outline-danger" data-toggle="tooltip" data-placement="top" title="Delete instance" onclick="removeDocker(\'' + s + '\')" id="' + s + '" ' + (dockers[s].status === "ok" ? '' : 'disabled') + '><i class="fas fa-trash-alt"></i> </button></div>\
        </div></div></div></div><br>');
    }
    if (refresh) setTimeout(function () {
        $.ajax({
            url: "https://saas.saashup.com/api/account/" + user.email,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("x-auth-token", user.jwt.token)
            }
        }).done(function (result) {
            account = result;
            refreshDocker(account.dockers)
        })
    }, 30000);
}

function setServerName(id, name) {
    $("#modalQuestionDialog").addClass('modal-xl');
    $("#modalQuestionYes").html(findLang("change-name-title"))
    $("#modalQuestionTitle").html(findLang('saveLabel'))
    $("#modalQuestionContent").html('<div class="container"><div class="row"><div class="col-12"><div class="mb-3 row"><label class="col-sm-12 col-md-6 col-form-label">Name</label><div class="col-sm-12 col-md-6"><input class="form-control" value="' + name + '" id="newName"/></div></div></div>')
    $("#modalQuestion").modal("show");
    $("#modalQuestionYes").unbind();
    $("#modalQuestionYes").on("click", function () {
        account.engine[id].name = $('#newName').val();
        $.ajax({
            url: "https://saas.saashup.com/api/server/" + user.email + "/" + id,
            method: "PATCH",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("x-auth-token", user.jwt.token)
            },
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                server: account.engine[id]
            })
        }).done(function (result) {
            account = result;
            $("#modalQuestion").modal("hide");
            refreshCard(account.engine)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            apiFail(jqXHR, textStatus, errorThrown);
        })
    })

}

function refreshCard(servers) {
    let rows = '';
    $("#engine-list").html(rows);
    if (Object.keys(servers).length >= parseInt(account.limits.engine)) $("#buy").addClass("disabled");
    else $("#buy").removeClass("disabled");
    for (const s in servers) {
        $("#empty").addClass('d-none');
        let bgcolor = 'bg-primary text-white';
        if ($("#searchInput").val() !== "" && s.match($("#searchInput").val())) bgcolor = 'bg-success text-white';
        rows += '<div class="card"><div class="card-header ' + bgcolor + '"><i class="fas fa-database"></i> ' + ('name' in servers[s] ? servers[s].name : s) + ' <a href="#" onclick="setServerName(\'' + s + '\', \'' + ('name' in servers[s] ? servers[s].name : s) + '\');" style="color:white !important;"><i class="fas fa-edit"></i></a> <span style="float:right;"><button class="btn ' + bgcolor + '" data-bs-toggle="collapse" data-bs-target="#server-card-body-' + s + '"><i class="fas fa-caret-up"></i></button></span></div>\
        <div class="card-body collapse ' + (servers.length > 3 ? '' : 'show') + '" id="server-card-body-' + s + '"><div class="container"><div class="row">\
        <div class="col-8">\
            <div class="col-12"><a href="https://' + s + '.saashup.com" class="card-title" target="_blank">' + s + '</a></div>\
        </div>\
        <div class="col-4 text-center">\
            <img src="/images/logo_saashup.png" width="64px"/>\
        </div>\
        <div class="col-sm-12 col-md-8 small p-1">' + findLang("creation-date-text") + ': ' + ('date' in servers[s] ? servers[s].date.replace('T', ' ').substring(0, 16) : 'na') + '</div>\
        <div class="col-sm-12 col-md-4 small p-1">' + findLang("memoryLabel") + ': ' + ('memory' in servers[s] ? parseInt(servers[s].memory) : 0) + ' Mb</div>\
        <div class="col-sm-12 col-md-8 small p-1">' + findLang("monthlyPriceLabel") + ': ' + ('flavor' in servers[s] ? servers[s].flavor : 'na') + '€</div>';
        if (servers[s].password === true) {
            rows += '<div class="col-12 small p-1">' + findLang("passwordLabel") + ': ******** <input class="form-control d-none" id="input_server_' + servers[s].id + '" value="' + ('pwd' in servers[s] ? servers[s].pwd : servers[s].id) + '" readonly /><a href="#" onclick="copyPassword(\'' + servers[s].id + '\');"><i class="fas fa-copy"></i></a></div>'
            rows += '<div class="toast" data-bs-delay="1000" id="clipboard_server_' + servers[s].id + '" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-body">' + findLang("copy-clipboard-text") + '</div></div>'
        }
        let color = 'warning'
        let status = 'na';
        if ('status' in servers[s]) {
            status = servers[s].status.toUpperCase();
            if (status.toLowerCase() === "online") color = "success";
            if (status.toLowerCase() === "offline") color = "danger";
        }
        rows += '<div class="col-12">&nbsp;</div>\
        <div class="col-4"><div class="badge bg-' + color + ' px-4 py-2">' + status.toUpperCase() + '</div></div>';
        rows += '<div class="col-2"><span class="d-inline-block" data-toggle="tooltip" data-placement="top" title="Upgrade Memory"><button class="btn btn-outline-primary ' + ('id' in servers[s] ? '' : 'disabled') + '" onclick="upgradeMemory(\'' + s + '\')" id="upgrade_' + s + '"><i class="fas fa-memory"></i> </button></span></div>';
        rows += '<div class="col-2"><button class="btn btn-outline-danger" data-toggle="tooltip" data-placement="top" title="Delete engine" onclick="removeEngine(\'' + s + '\')" id="trash-' + s + '"><i class="fas fa-trash-alt"></i> </button></div>';
        rows += '</div></div></div></div><br>';
    }
    $("#engine-list").html(rows)
}

function toggleInvoices() {
    if ($('#invoices').html().length > 0) {
        $('#invoices').html('')
        return
    }
    if ('invoices' in account && Object.keys(account.invoices).length > 0) {
        $('#invoices').html('')
        for (let i in account.invoices) {
            $('#invoices').append('<br><a href="' + account.invoices[i].url + '" target="_blank"> Invoice ' + account.invoices[i].date + '<span class="px-3"></span><span class="badge bg-success px-1">' + findLang("paidLabel") + '</span></a>')
        }
    }
}

function upgradeMemory(server) {
    $("#modalQuestionYes").html(findLang('memory-server-text-btn'))
    $("#modalQuestionTitle").html(findLang('memory-server-title'))
    $("#modalQuestionContent").html(findLang('memory-server-text') + server + " ?")
    $("#modalQuestion").modal("show");
    $("#modalQuestionYes").unbind();
    $("#modalQuestionYes").on("click", function () {
        $("#modalQuestion").modal("hide");
        $("#modalNotificationOk").attr("disabled", true)
        $("#modalNotificationOk").unbind();
        $("#modalNotificationTitle").html(findLang('memory-server-title'));
        $("#modalNotificationContent").html('<div class="text-center"><div>' + findLang('memory-server-spinner-text') + '</div><div class="spinner-div text-center"><div class="spinner-circle-lg"><div class="spinner-lg"></div><img class="spinner-img" src="/images/logo_saashup.png" width="128" height="128"/></div></div></div>');
        $("#modalNotification").modal("show");
        $.ajax({
            url: "https://saas.saashup.com/api/upgrade/" + user.email + "/" + server,
            method: "POST",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("x-auth-token", user.jwt.token)
            },
            contentType: "application/json",
            dataType: "json"
        }).done(function (result) {
            account = result;
            $("#modalNotification").modal("hide");
            refreshCard(account.engine)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            apiFail(jqXHR, textStatus, errorThrown);
        })
    })
}

function selectLangFlag(l) {
    for (const la in lang) {
        $("#" + la + "FlagLang").removeClass('selected-flag');
    }
    user.lang = l;
    $("#" + l + "FlagLang").addClass('selected-flag');
}

function setLang() {

    $("#modalQuestionYes").html(findLang('saveLabel'));
    $("#modalQuestionTitle").html(findLang("lang-text"))
    $("#modalQuestionContent").html("")
    let rows = '<div class="container"><div class="row text-center">';
    for (let l in lang) rows += '<div class="col-4"><img id="' + l + 'FlagLang" src="/images/' + l + '.png" width="64px" onclick="selectLangFlag(\'' + l + '\');" class="rounded-circle"/></div>';
    rows += '</div></div>';
    $("#modalQuestionContent").html(rows);
    if ('lang' in user) $("#" + user.lang + "FlagLang").addClass('selected-flag');
    else if ('locale' in user) $("#" + user.locale + "FlagLang").addClass('selected-flag');
    $("#modalQuestion").modal("show");
    $("#modalQuestionYes").unbind();
    $("#modalQuestionYes").on("click", function () {
        setHomePath();
        updateLang(user.lang);
        $("#modalQuestion").modal("hide");
    })
}

function validateCompose(compose) {
    let success = "";
    $("#compose-json").removeClass('text-success').removeClass('text-danger')
    if (Object.keys(compose).length > 1) success += '<div class="text-danger">Multi service: Gold required</div>'
    for (const c of Object.keys(compose)) {
        if (!('image' in compose[c])) success += '<div class="text-danger">Image is required</div>'
        else $("#image").val(compose[c].image)
        if (!('ports' in compose[c])) success += '<div class="text-danger">Port is required</div>'
        else if (compose[c].ports.length > 1) success += '<div class="text-danger">Bronze is required</div>'
        else $("#ports").val(compose[c].ports)
        if ('volumes' in compose[c] && compose[c].volumes.length > 1) success += '<div class="text-danger">Multi volume: Silver required</div>'
        if ('volumes' in compose[c] && compose[c].volumes.length > 0 && compose[c].volumes[0].split(":")[0].startsWith('/')) success += '<div class="text-danger">Bind volume: Silver required</div>'
        if ('NetworkMode' in compose[c] && compose[c].NetworkMode !== "bridge") success += '<div class="text-danger">Network bridge: Gold required</div>'
    }
    if (success.length > 0) {
        $("#compose-json").addClass('text-danger')
        $("#modalNotificationTitle").html(findLang("create_saas_error_title"));
        $("#modalNotificationContent").html(success);
        $("#modalNotification").modal("show");
    } else {
        $("#modalSaasYes").attr('disabled', false)
        $("#compose-json").addClass('text-success')
    }
    return (success.length === 0 ? true : false)
}

$(document).ready(function () {
    $.ajaxSetup({
        timeout: 15000
    });
    if (user === null) user = JSON.parse(window.localStorage.getItem('user'));

    updateLang();

    if (appParams.has('payment') && appParams.get('payment') === "success") {
        $("#payment-success").removeClass("d-none")
        $("#payment-success-br").removeClass("d-none")
        $("#register").html(findLang("buy-montlhy-cost-text"));
        $('#providers').attr('disabled', false)
        $("#card-info-none").addClass('d-none')
        $("#card-info").html('<div class="container"><div class="row"><div class="col-4"><i class="fab fa-cc-visa fa-3x text-primary"></i> </div><div class="col-6 text-uppercase px-1 pt-2"><b>' + findLang("waiting-validation-text") + '</b><br><i class="small muted">' + findLang("expire-text") + ' XX/YYYY</i></div><div class="col-2">&nbsp;</div></div></div>')
        window.history.replaceState({}, document.title, "/");
    }

    $('.nav-link').on('click', function () {
        $(".nav-link").each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active')
    })

    $("#nav-admin-btn").on('click', function () {
        cls();
        appProfile();
        $("#admin").removeClass("d-none")
    })

    $("#nav-home-btn").on('click', function () {
        $.ajax({
            url: "https://saas.saashup.com/api/account/" + user.email,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("x-auth-token", user.jwt.token)
            }
        }).done(function (result) {
            account = result
            cls();
            refreshCard(account.engine);
            refreshDocker(account.dockers);
            refreshSaas(account.saas);
            if (Object.keys(account.dockers).length + Object.keys(account.engine).length + Object.keys(account.saas).length > 0) $("#home").removeClass("d-none")
            else $("#empty").removeClass("d-none")
        }).fail(function (jqXHR, textStatus, errorThrown) {
            apiFail(jqXHR, textStatus, errorThrown);
        })
    })

    $("#buy").on('click', function () {
        $("#payment-success").addClass("d-none");
        $("#payment-success-br").addClass("d-none");
        $("#modalQuestionTitle").html(findLang("create_engine_title"));
        $("#modalQuestionContent").html(findLang("create_engine_text"));
        $("#modalQuestionYes").unbind();
        $("#modalQuestion").modal("show");
        $("#modalQuestionYes").on("click", function () {
            $("#modalQuestion").modal("hide");
            addEngine();
        })
    })

    $("#setup-payment").on('click', function () {
        stripeGO()
    })

    $("#modalDockerYes").on('click', function () {
        $("#modalDocker").modal("hide");
        $("#modalNotificationOk").attr("disabled", true)
        $("#modalNotificationOk").unbind();
        $("#modalNotificationTitle").html(findLang("createEnvModalTitle"));
        $("#modalNotificationContent").html('<div class="text-center"><div>' + findLang("create-docker-spinner-text") + '</div><div class="spinner-div text-center"><div class="spinner-circle-lg"><div class="spinner-lg"></div><img class="spinner-img" src="/images/logo_saashup.png" width="128" height="128"/></div></div></div>');
        $("#modalNotification").modal("show");
        $.ajax({
            url: "https://saas.saashup.com/api/docker/" + user["email"],
            method: "POST",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("x-auth-token", user.jwt.token)
            },
            data: {
                "region": $("#dockerRegion").val(),
                "flavor": $("#dockerModel").val(),
                "engine": $("#dockerAttach").val(),
                "account": $("#dockerProvider").val(),
                "status": "creating"
            }
        }).done(function (result) {
            account = result;
            $("#cost").html(account.amount + "€")
            $("#next-cost").html(parseInt(parseInt(account.amountKube) + parseInt(account.amountDocker) + parseInt(account.amountServer)) + "€")
            setTimeout(function () {
                $("#modalNotification").modal("hide");
                $("#nav-home-btn").click();
            }, 1000)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            apiFail(jqXHR, textStatus, errorThrown);
        })
    })

    $("#buyDocker").on('click', function () {
        if (account !== null && 'engine' in account && Object.keys(account.engine).length > 0) {
            $("#dockerAttach").html('');
            $("#dockerRegion").html('');
            $('#dockerCost').html("5");
            $("#dockerRegion").html('<option value="syd">syd</option><option value="gra">gra</option><option value="sbg">sbg</option><option value="de">de</option><option value="bhs">bhs</option><option value="waw">waw</option><option value="uk">uk</option>');
            $("#dockerModel").html('<option value="s1-2">2G</option>');
            for (const s in account.engine) {
                $("#dockerAttach").append('<option value="' + s + '">' + ('name' in account.engine[s] ? account.engine[s].name : s) + '</option>')
            }
            $("#modalDocker").modal('show');
        } else {
            $("#modalNotificationOk").unbind();
            $("#modalNotificationTitle").html(findLang("error-text"));
            $("#modalNotificationContent").html(findLang("no-engine-found-text"))
            $("#modalNotification").modal("show");
        }

    });

    $("#cus-details").on('click', function () {
        if (!account || !('payments' in account)) return
        $("#modalQuestionYes").html(findLang('saveLabel'))
        $("#modalQuestionTitle").html(findLang("billing-title"))
        $("#modalQuestionContent").html('<div class="container"><div class="row">\
        <div class="col-12"><div class="mb-3 row"><label class="col-sm-12 col-md-6 col-form-label">' + findLang('companyLabel') + '</label><div class="col-sm-12 col-md-6 "><input id="billing-name" class="form-control" value="' + account.payments[0].billing_details.name + '" /></div></div></div>\
        <div class="col-12"><div class="mb-3 row"><label class="col-sm-12 col-md-6 col-form-label">' + findLang('email-text') + '</label><div class="col-sm-12 col-md-6 "><input type="text" class="form-control-plaintext" value="' + account.payments[0].billing_details.email + '" /></div></div></div>\
        <div class="col-12"><div class="mb-3 row"><label class="col-sm-12 col-md-6 col-form-label">' + findLang('phoneLabel') + '</label><div class="col-sm-12 col-md-6 "><input id="billing-phone" type="text" class="form-control" value="' + account.payments[0].billing_details.phone + '" /><div class="toast" data-bs-delay="1000" id="billing-phone-toast" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-body">XXXXXXXXXXXX format</div></div></div></div></div>\
        <div class="col-12"><div class="mb-3 row"><label class="col-sm-12 col-md-6 col-form-label">' + findLang('streetLabel') + '</label><div class="col-sm-12 col-md-6 "><input id="billing-street" type="text" class="form-control" value="' + account.payments[0].billing_details.address.line1 + '" /></div></div></div>\
        <div class="col-12"><div class="mb-3 row"><label class="col-sm-12 col-md-6 col-form-label">' + findLang('zipLabel') + '</label><div class="col-sm-12 col-md-6 "><input id="billing-zip" type="text" class="form-control" value="' + account.payments[0].billing_details.address.postal_code + '" /></div></div></div>\
        <div class="col-12"><div class="mb-3 row"><label class="col-sm-12 col-md-6 col-form-label">' + findLang('cityLabel') + '</label><div class="col-sm-12 col-md-6 "><input id="billing-city" type="text" class="form-control" value="' + account.payments[0].billing_details.address.city + '" /></div></div></div>\
        <div class="col-12"><div class="mb-3 row"><label class="col-sm-12 col-md-6 col-form-label">' + findLang('countryLabel') + '</label><div class="col-sm-12 col-md-6 "><input id="billing-country" type="text" class="form-control" value="' + account.payments[0].billing_details.address.country + '" /><div class="toast" data-bs-delay="1000" id="billing-country-toast" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-body">2 LETTERS COUNTRY</div></div></div></div></div>\
        </div></div>')
        $("#modalQuestion").modal("show");
        $("#modalQuestionYes").unbind();
        $("#modalQuestionYes").on("click", function () {
            if ($("#billing-country").val().length !== 2) {
                $("#billing-country").addClass("is-invalid");
                $("#billing-country-toast").toast("show")
                return
            }
            if (!($("#billing-phone").val().match(/^\d{8,15}$/))) {
                $("#billing-phone").addClass(" is-invalid");
                $("#billing-phone-toast").toast("show")
                return
            }
            $.ajax({
                url: "https://saas.saashup.com/api/account/" + account["id"] + "/payment/" + user["email"] + "/pm/" + account.payments[0].id,
                method: "PUT",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("x-auth-token", user.jwt.token)
                },
                dataType: "json",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    billing_details: {
                        address: {
                            city: $("#billing-city").val(),
                            country: $("#billing-country").val(),
                            line1: $("#billing-street").val(),
                            postal_code: $("#billing-zip").val()
                        },
                        name: $("#billing-name").val(),
                        phone: $("#billing-phone").val()
                    }
                }
            }).done(function (result) {
                account = result;
                $("#modalQuestion").modal("hide");
            }).fail(function (jqXHR, textStatus, errorThrown) {
                apiFail(jqXHR, textStatus, errorThrown);
            })
        })
    })

    $("#search").on('click', function () {
        refreshCard(account.engine);
        refreshSaas(account.engine);
        refreshDocker(account.dockers);
        $("#searchInput").val('')
    })

    $("#audits").on('click', function () {
        $("#modalNotificationOk").unbind();
        $("#modalNotificationTitle").html(findLang('auditLabel'));
        $.ajax({
            url: "https://saas.saashup.com/api/account/audit/" + user["email"],
            beforeSend: function (xhr) {
                xhr.setRequestHeader("x-auth-token", user.jwt.token)
            }
        }).done(function (audits) {
            $("#modalNotificationContent").html("")
            for (const m of audits) {
                let event = m._source['event'].split(":")[1];
                if (["ContainerCreation", "ContainerDeletion", "DockerCreation", "DockerDeletion"].includes(event)) $("#modalNotificationContent").append('<div class="bg-light border border-primary rounded p-3 text-center">' + m._source['@timestamp'].replace('T', ' ').substring(0, 19) + ' - ' + event + ' - ' + (m._source['server'] ? m._source['server'].replace(".saashup.com", "") : "") + '</div><br>')
            }
            $("#modalNotification").modal("show");
        }).fail(function (jqXHR, textStatus, errorThrown) {
            apiFail(jqXHR, textStatus, errorThrown);
        })
    })

    $("#plan-type-select").on('change', function () {
        console.log('change')
        switch($("#plan-type-select").val()) {
            case  "Iron":   $("#display-volume-cfg").addClass('d-none');
                            $("#display-port-mgt").addClass('d-none');
                            break;
            case "Bronze":  $("#display-volume-cfg").removeClass('d-none');
                            $("#display-port-mgt").removeClass('d-none');
                            break;
        }
    })

    $("#buySaas").on("click", function (event) {
        if (account !== null) {
            $("#saasAttach").html('');
            for (const s in account.engine) {
                $("#saasAttach").append("<option>" + s + "</option>")
            }
            $("#compose-json").html("")
            $("#modalSaas").modal("show");
        } else {
            $("#modalNotificationOk").unbind();
            $("#modalNotificationTitle").html(findLang("error-text"));
            $("#modalNotificationContent").html(findLang("no-engine-found-text"))
            $("#modalNotification").modal("show");
        }
    })

    $("#modalSaasYes").on("click", function (event) {
        $("#modalSaas").modal("hide");
        let compose = {}
        if ($('#compose-json').html().length > 20) {
            if (validateCompose(compose) === true) return
        } else {
            if ($("#image").val().length === 0) {
                event.preventDefault()
                $("#modalNotificationTitle").html(findLang("create_saas_error_title"));
                $("#modalNotificationContent").html(findLang("create_saas_empty"));
                $("#modalNotification").modal("show");
                return
            }
            if ($("#port").val().length < 2) {
                event.preventDefault()
                $("#modalNotificationTitle").html(findLang("create_saas_error_title"));
                $("#modalNotificationContent").html(findLang("create_port_empty"));
                $("#modalNotification").modal("show");
                return
            }
            if ($("#env").val().length > 0 && Array.isArray(eval($("#env").val()))) {
                for (const a in eval($("#env").val())) {
                    if (eval($("#env").val())[a].split('=').length !== 2) {
                        event.preventDefault()
                        $("#modalNotificationTitle").html(findLang("create_saas_error_title"));
                        $("#modalNotificationContent").html(findLang("create_env_error"));
                        $("#modalNotification").modal("show");
                        return
                    }
                }
            }
        }
        $("#modalNotificationTitle").html(findLang("create_saas_title"));
        $("#modalNotificationContent").html('<div class="container text-center">' + findLang("create_saas_text") + "<br><br>" + '<div class="spinner-div text-center"><div class="spinner-circle-lg"><div class="spinner-lg"></div><img class="spinner-img" src="/images/saashup2.png" width="128" height="128"/></div></div></div>');
        $("#modalNotification").modal("show");
        $.ajax({
            url: "https://saas.saashup.com/api/saas/" + user.email,
            method: "POST",
            timeout: 60000,
            beforeSend: function (xhr) {
                xhr.setRequestHeader("x-auth-token", user.jwt.token)
            },
            dataType: "json",
            data: {
                engine: $("#saasAttach").val(),
                image: $("#image").val(),
                type: $("#plan-type-select").val().toLowerCase(),
                port_type: $("#port_type").val(),
                port: $("#port").val(),
                portmgt: $("#portmgt").val(),
                price: $("#price").val(),
                memory: $("#memory").val(),
                volume: $("#volume").val(),
                volumecfg: $("#volumecfg").val(),
                env: eval($("#env").val()) || [],
                compose: compose
            }
        }).done(function (result) {
            account = result;
            setTimeout(function () {
                $("#modalNotification").modal("hide");
                $("#nav-home-btn").click();
            }, 1000)
        }).fail(function (jqXHR, textStatus, errorThrown) {
            $("#modalNotification").modal("hide");
            apiFail(jqXHR, textStatus, errorThrown);
        })
    })

    $("#compose-window-btn").on("click", function () {
        if ($("#classic-window").hasClass('d-none')) {
            $("#modalSaasYes").attr('disabled', false)
            $("#classic-window").removeClass('d-none')
            $("#compose-window").addClass('d-none')
        } else {
            $("#modalSaasYes").attr('disabled', true)
            $("#classic-window").addClass('d-none')
            $("#compose-window").removeClass('d-none')
        }
    })

    $(document).on('keypress', function (e) {
        if (e.which == 13 && $("#searchInput").val() !== "") {
            $("#search").click();
        }
    });

});