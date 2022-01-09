var Plan = 0.2;

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
    $(".owl-carousel").owlCarousel({
        center: true,
        items: 2,
        loop: true,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 2
            },
            800: {
                items: 3
            },
            1200: {
                items: 4
            }
        }
    });

    $("#slide-memory, #slide-instance").on('input', function() {
        $("#memory-value").text($("#slide-memory").val());
        $("#instance-value").text($("#slide-instance").val());
        $("#pricing-value").text((parseInt($("#slide-memory").val()) * 0.05 * parseInt($("#slide-instance").val()) * Plan + Plan * 300).toFixed(2))
        $("#pricing-unit").text(((parseInt($("#slide-memory").val()) * 0.05 * parseInt($("#slide-instance").val()) * Plan + Plan * 300) / parseInt($("#slide-instance").val())).toFixed(2))
        if (parseInt($("#slide-instance").val()) === 0) $("#pricing-unit").text(Plan * 300)
    })

    $("#bronze-btn, #silver-btn, #gold-btn").on('click', function() {
        $("#bronze-btn").removeClass("btn-warning").removeClass("text-white");
        $("#silver-btn").removeClass("btn-warning").removeClass("text-white");
        $("#gold-btn").removeClass("btn-warning").removeClass("text-white");
        $(this).addClass("btn-warning").addClass("text-white");
        Plan = parseFloat($(this).data('price'))
        $("#pricing-value").text((parseInt($("#slide-memory").val()) * 0.05 * parseInt($("#slide-instance").val()) * Plan + Plan * 300).toFixed(2))
        $("#pricing-unit").text(((parseInt($("#slide-memory").val()) * 0.05 * parseInt($("#slide-instance").val()) * Plan + Plan * 300) / parseInt($("#slide-instance").val())).toFixed(2))
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
})