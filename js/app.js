$(document).ready(function () {
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();

    $('.nav-link').on('click', function() {
        $( ".nav-link" ).each(function() { 
            $(this).removeClass('active');
        })
        $(this).addClass('active')
    })

    updateLang();
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
        $("#pricing-value").text(parseInt($("#slide-memory").val()) * 0.05 * parseInt($("#slide-instance").val()) * 0.2 + 50)
    })
})