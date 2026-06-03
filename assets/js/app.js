var Plan = 0.1;
var planName = "#bronze-btn";


var tblPrices = {"eur":
                        {   "iron":{"fixed":0, "byInstance":5, "memory":0},
                            "bronze":{"fixed":10, "byInstance":1, "memory":0.5},
                            "silver":{"fixed":30, "byInstance":2, "memory":1},
                            "gold":{"fixed":90, "byInstance":3, "memory":1.5}
                        }
                    };
const currencie = "eur";    
const startingMemory = 200;                

const appParams = new URLSearchParams(window.location.search);
var user = null;

if (window.localStorage.getItem('user') !== null) user = JSON.parse(window.localStorage.getItem('user'));

if (window.localStorage.getItem('lang') === null) {
    window.localStorage.setItem('lang', document.documentElement.lang)
}

if (window.localStorage.getItem('lang') !== document.documentElement.lang) {
    location.replace('/' + window.localStorage.getItem('lang'));
}

function showPrice(_btnPlan)
{

   
    $("#pricing-value").text(( ((parseInt($("#slide-memory").val()) - startingMemory) * parseFloat($(_btnPlan).data('memoryprice')) * parseInt($("#slide-instance").val())*0.01 )
                                + (parseInt($("#slide-instance").val()) * parseFloat($(_btnPlan).data('instanceprice')))
                                + parseFloat($(_btnPlan).data('price'))
                             ).toFixed(2));
                             
    $("#pricing-unit").text(( 
                                (((parseInt($("#slide-memory").val()) - startingMemory) * parseFloat($(_btnPlan).data('memoryprice')) * parseInt($("#slide-instance").val())*0.01)
                                    + (parseInt($("#slide-instance").val()) * parseFloat($(_btnPlan).data('instanceprice')))
                                    + parseFloat($(_btnPlan).data('price'))
                                )/ parseInt($("#slide-instance").val())
                            ).toFixed(2))

    if (parseInt($("#slide-instance").val()) === 0) $("#pricing-unit").text(Plan * 300);

    }

$(document).ready(function () {
    var i = 0;
    if (user && 'picture' in user) $('#avatar').attr('src', user.picture).removeClass("d-none");

    for(let thisPlan of Object.keys(tblPrices[currencie]))
    {
        $("#"+thisPlan+"-btn").attr("data-instanceprice", tblPrices[currencie][thisPlan]["byInstance"]);
        $("#"+thisPlan+"-btn").attr("data-price", tblPrices[currencie][thisPlan]["fixed"]);
        $("#"+thisPlan+"-btn").attr("data-memoryprice", tblPrices[currencie][thisPlan]["memory"]);

     }

    $("#slide-memory, #slide-instance").on('input', function() {
        $("#memory-value").text($("#slide-memory").val());
        $("#instance-value").text($("#slide-instance").val());
        if ($("#iron-btn").hasClass("btn-primary")) {
            $("#slide-memory").val(200);
            $("#memory-value").text($("#slide-memory").val());
            $("#slide-memory").attr("disabled", true)

        } else {
            $("#slide-memory").attr("disabled", false)
       }


        showPrice(planName);
    })

    $("#iron-btn, #bronze-btn, #silver-btn, #gold-btn").on('click', function() {
        $("#iron-btn").removeClass("btn-primary").removeClass("text-white");
        $("#bronze-btn").removeClass("btn-primary").removeClass("text-white");
        $("#silver-btn").removeClass("btn-primary").removeClass("text-white");
        $("#gold-btn").removeClass("btn-primary").removeClass("text-white");
        $(this).addClass("btn-primary").addClass("text-white");
        Plan = parseFloat($(this).data('price'))
        planName = $(this);
        if ($(this).attr('id') === "iron-btn") {
            $("#slide-memory").val(200);
            $("#memory-value").text($("#slide-memory").val());
            $("#slide-memory").attr("disabled", true)
        } else {
            $("#slide-memory").attr("disabled", false)
        }
        showPrice(this);
    });
    showPrice(planName);
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

function handlePathLang (lang) {
    window.localStorage.setItem('lang', lang)
}
