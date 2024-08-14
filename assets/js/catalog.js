const filter = {
    "text": ".*",
    "category": ".*"
}

var catalog = [];

function refreshCatalog() {

    $("#catalog-dynamic-list").html('')
    for (const c of catalog) {
        if (!("category" in c)) c.category = "other";
        if (c.category.match(new RegExp(filter.category)) && c.name.match(new RegExp(filter.text, "i"))) $("#catalog-dynamic-list").append('<div class="col-sm-12 col-md-4"><div class="card m-3" style="height: 250px;"><div class="card-body">\
            <h2 class="card-title text-primary text-center p-3">' + c.name.replace(/^.*\//,'') + '</h2><span class="position-absolute translate-middle badge rounded-pill bg-' + c.plancolor + '" style="top:20px; right: -10px;">' + c.plan + '</span>\
            \<span class="position-absolute translate-middle badge rounded-pill bg-primary" style="top:20px; left: 50px;">' + c.category + '</span><div class="row card-text"><div class="col-6 text-center"><br><a href="' + c.website + '">\
            <img src="' + c.logo + '"  alt="' + c.text + '" width="64" /></a></div><div class="col-6"><a href="https://' + c.saas + '.saashup.com" target="_blank">' + c.name.replace('/','<br>') + '</a><span class="position-absolute translate-middle badge rounded-pill bg-success" style="bottom:10px;right:15px;">' + (c.instances || 0) + '</span><br><span class="small text-muted">' + c.text + '</span></div>\
            </div></div></div></div>');

        if ($('#search-input-select option[value=' + c.category + ']').length === 0) $("#search-input-select").append("<option value="+c.category+">"+c.category+"</option>")

    }
}

$(document).ready(function () {
    
    $("#search-input-select").html("<option value='.*'>all</option>")
    
    /*for (const c of catalog) {
        if ($('#search-input-select option[value=' + c.category + ']').length === 0) $("#search-input-select").append("<option value=" + c.category + ">" + c.category + "</option>")
    }*/

    $("#search-input-select").on('change', function() {
        filter.category = $("#search-input-select").val();
        refreshCatalog();
    })

    $("#search-button").on('click', function() {
        filter.text = ".*" + $("#search-input-text").val() + ".*";
        $("#search-input-text").val('') 
        refreshCatalog()
    })

    $("#search-input-text").keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode === 13){
            $("#search-button").trigger('click')
        }
      });

      $("#search-input-text").focus();

      $.ajax({
        url: "https://saas.saashup.com/api/catalog"
      }).done(function (result) {
        console.log(result)
        catalog = result;
        catalog.sort(function(a, b){ 
            if (!("category" in a)) a.category = "other";
            return a.category.localeCompare(b.category)});
        refreshCatalog()

      }).fail(function (jqXHR, textStatus, errorThrown) {

      })

})