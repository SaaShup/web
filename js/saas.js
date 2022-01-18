var account = null;

function setup() {
    $("#saas").removeClass("d-none")
}

function display() {
    $("#saas").html("display")
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
    })

})