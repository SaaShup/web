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
})