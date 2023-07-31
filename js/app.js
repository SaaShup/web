var Plan = 0.1;
const appParams = new URLSearchParams(window.location.search);
var user = null;
if (window.localStorage.getItem('user') !== null) user = JSON.parse(window.localStorage.getItem('user'));

var Tawk_API = Tawk_API || {};
Tawk_API.customStyle = {
    visibility : {
      desktop : {
        position : 'bl',
        xOffset : '120px',
        yOffset : '120px',
      },
      mobile : {
        position : 'bl',
        xOffset : 5,
        yOffset : 140,
      },
      bubble : {
        rotate : '0deg',
         xOffset : -20,
         yOffset : 0
      }
    }
  };
var Tawk_LoadStart = new Date();
Tawk_API.onLoad = function () {
    $(".tawk-icon-close").click()
    if (user) Tawk_API.setAttributes({
        name: 'name' in user ? user.name : 'NA',
        email: 'email' in user ? user.email : 'tawk@saashup.com'
    }, function (error) {
        if (error) console.log(error)
    });
}

$(document).ready(function () {

    if (user && 'picture' in user) $('#avatar').attr('src', user.picture).removeClass("d-none");
    updateLang('en');
    if (user && 'lang' in user) {
        updateLang(user.lang);
        $('#lang-flag').attr('src', '/img/' + user.lang + '.png');
    }
    if (appParams.has('lang')) {
        updateLang(appParams.get('lang'));
        $('#lang-flag').attr('src', '/img/' + appParams.get('lang') + '.png');
    }

    $("#slide-memory, #slide-instance").on('input', function() {
        $("#memory-value").text($("#slide-memory").val());
        $("#instance-value").text($("#slide-instance").val());
        if ($("#iron-btn").hasClass("btn-primary")) {
            $("#slide-memory").val(200);
            $("#memory-value").text($("#slide-memory").val());
            $("#slide-memory").attr("disabled", true)
            $("#pricing-value").text((parseInt($("#slide-instance").val()) * 2).toFixed(2))
            $("#pricing-unit").text(((parseInt($("#slide-instance").val()) * 2) / parseInt($("#slide-instance").val())).toFixed(2))
        } else {
            $("#slide-memory").attr("disabled", false)
            $("#pricing-value").text((parseInt($("#slide-memory").val()) * 0.05 * parseInt($("#slide-instance").val()) * Plan + Plan * 100).toFixed(2))
            $("#pricing-unit").text(((parseInt($("#slide-memory").val()) * 0.05 * parseInt($("#slide-instance").val()) * Plan + Plan * 100) / parseInt($("#slide-instance").val())).toFixed(2))
        }
        if (parseInt($("#slide-instance").val()) === 0) $("#pricing-unit").text(Plan * 100)
    })

    $("#iron-btn, #bronze-btn, #silver-btn, #gold-btn").on('click', function() {
        $("#iron-btn").removeClass("btn-primary").removeClass("text-white");
        $("#bronze-btn").removeClass("btn-primary").removeClass("text-white");
        $("#silver-btn").removeClass("btn-primary").removeClass("text-white");
        $("#gold-btn").removeClass("btn-primary").removeClass("text-white");
        $(this).addClass("btn-primary").addClass("text-white");
        Plan = parseFloat($(this).data('price'))
        if ($(this).attr('id') === "iron-btn") {
            $("#slide-memory").val(200);
            $("#memory-value").text($("#slide-memory").val());
            $("#slide-memory").attr("disabled", true)
            $("#pricing-value").text((parseInt($("#slide-instance").val()) * 5).toFixed(2))
            $("#pricing-unit").text(((parseInt($("#slide-instance").val()) * 5) / parseInt($("#slide-instance").val())).toFixed(2))
        } else {
            $("#slide-memory").attr("disabled", false)

            $("#pricing-value").text((parseInt($("#slide-memory").val()) * 0.05 * parseInt($("#slide-instance").val()) * Plan + Plan * 300).toFixed(2))
            $("#pricing-unit").text(((parseInt($("#slide-memory").val()) * 0.05 * parseInt($("#slide-instance").val()) * Plan + Plan * 300) / parseInt($("#slide-instance").val())).toFixed(2))
        }
        if (parseInt($("#slide-instance").val()) === 0) $("#pricing-unit").text(Plan * 300)
    });

    $("#help_app_support").on('click', function(event) {
        event.preventDefault()
        $("#modalNotificationTitle").html(findLang("help_app_support_title", myLang));
        $("#modalNotificationContent").html(findLang("help_app_support_text", myLang));
        $("#modalNotification").modal("show");
    })

    $("#help_saas_support").on('click', function(event) {
        event.preventDefault()
        $("#modalNotificationTitle").html(findLang("help_saas_support_title", myLang));
        $("#modalNotificationContent").html(findLang("help_saas_support_text", myLang));
        $("#modalNotification").modal("show");
    })

    $("#help_engine").on('click', function(event) {
        event.preventDefault()
        $("#modalNotificationTitle").html(findLang("help_engine_title", myLang));
        $("#modalNotificationContent").html(findLang("help_engine_text", myLang));
        $("#modalNotification").modal("show");
    })

    $("#help_registry").on('click', function(event) {
        event.preventDefault()
        $("#modalNotificationTitle").html(findLang("help_registry_title", myLang));
        $("#modalNotificationContent").html(findLang("help_registry_text", myLang));
        $("#modalNotification").modal("show");
    })
    
})