const filter = {
    "text": ".*",
    "category": ".*"
}

const catalog = [{
    "name": "Nginx",
    "logo": "https://www.nginx.com/wp-content/uploads/2020/05/NGINX-product-icon.svg",
    "text": "Advanced Load Balancer, Web Server, & Reverse Proxy",
    "website": "https://www.nginx.com/",
    "saas": "https://nginx.saashup.com/",
    "plan": "iron",
    "plancolor": "info",
    "category": "http"
}, {
    "name": "Redis",
    "logo": "https://dwglogo.com/wp-content/uploads/2017/12/1100px_Redis_Logo_01.png",
    "text": "Open source in-memory data structure store",
    "website": "https://redis.io/",
    "saas": "https://redis.saashup.com/",
    "plan": "iron",
    "plancolor": "info",
    "category": "database"
}, {
    "name": "Mysql",
    "logo": "https://labs.mysql.com/common/logos/mysql-logo.svg",
    "text": "The world's most popular open source database",
    "website": "https://www.mysql.com/",
    "saas": "https://mysql.saashup.com/",
    "plan": "iron",
    "plancolor": "info",
    "category": "database"
}, {
    "name": "Engine",
    "logo": "https://saashup.com/img/logo_saashup.png",
    "text": "A docker management engine and ui",
    "website": "https://www.saashup.com/",
    "saas": "https://saashup.com/saas",
    "plan": "iron",
    "plancolor": "info",
    "category": "docker"
}, {
    "name": "Nodered",
    "logo": "https://app.nodered.cloud/img/nodered.png",
    "text": "Low-code programming for event-driven applications",
    "website": "https://nodered.org/",
    "saas": "https://app.nodered.cloud/",
    "plan": "iron",
    "plancolor": "info",
    "category": "nocode"
}, {
    "name": "Traccar",
    "logo": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMCAzMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgdHJhbnNmb3JtPSJtYXRyaXgoLjQ2ODc1IDAgMCAuNDY4NzUgMCA5LjM3NWUtNSkiPgo8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKC0zMCkiIGN4PSIxMS43MTMiIGN5PSI0My43MTMiIHI9IjI3LjcyMiIgZmlsbD0iI2ZmZiIvPgo8Y2lyY2xlIHRyYW5zZm9ybT0icm90YXRlKC0zMCkiIGN4PSI5LjQ1NzgiIGN5PSI0My43MTMiIHI9IjIuMjU1Ii8+CjxwYXRoIGQ9Im0zNi45NjUgMjQuMjUxLTIuODE2MSAzLjU3ODhjMC42NTcyMSAwLjUxNzEzIDEuMzEzIDEuMTQ2NyAxLjc1NjcgMS45MTUxIDAuNDQzNjggMC43Njg0NyAwLjY2MDk4IDEuNjUxMiAwLjc4MDIyIDIuNDc4OWw0LjUwNzMtMC42NDk0Yy0wLjE5Mi0xLjQwOC0wLjYyNy0yLjc3OS0xLjM4MS00LjA4NS0wLjc1NS0xLjMwNi0xLjcyNC0yLjM2OS0yLjg0Ny0zLjIzOXoiLz4KPHBhdGggZD0ibTQyLjQwNSAxNy4wNDItMi44MTYxIDMuNTc4OGMxLjU5MTkgMS4yMjM5IDMuMDYyMyAyLjc2NzIgNC4xMjg3IDQuNjE0MnMxLjY2NzcgMy44OTIxIDEuOTMxNyA1Ljg4MjdsNC41MDczLTAuNjQ5NGMtMC4zMzY0Ny0yLjU3MS0xLjE1Ni01LjEwMjgtMi41MzMyLTcuNDg4M3MtMy4xNjAxLTQuMzYxMS01LjIxODUtNS45Mzh6Ii8+CjxwYXRoIHRyYW5zZm9ybT0icm90YXRlKC0zMCkiIGQ9Im0yLjY5MjcgNTIuNzMzYTkuMDIwMSA5LjAyMDEgMCAwIDEtNy44MTE2LTQuNTEwMSA5LjAyMDEgOS4wMjAxIDAgMCAxLTFlLTcgLTkuMDIwMSA5LjAyMDEgOS4wMjAxIDAgMCAxIDcuODExNi00LjUxMDFsLTFlLTcgOS4wMjAxeiIvPgo8cGF0aCBkPSJtMTcuNjM5IDcuMTI1OGMtMTMuNzM4IDcuOTMxMi0xOC40NDUgMjUuNDk3LTEwLjUxMyAzOS4yMzUgNy45MzEgMTMuNzM4IDI1LjQ5NyAxOC40NDUgMzkuMjM1IDEwLjUxMyAxMy43MzgtNy45MzEgMTguNDQ1LTI1LjQ5NyAxMC41MTMtMzkuMjM1LTcuOTMxLTEzLjczOC0yNS40OTctMTguNDQ1LTM5LjIzNS0xMC41MTN6bTEuNjg5NSAyLjkyNjRjMTIuMTIyLTYuOTk4MSAyNy42MjEtMi44NDUgMzQuNjIgOS4yNzYgNi45OTggMTIuMTIyIDIuODQ1IDI3LjYyMS05LjI3NiAzNC42Mi0xMi4xMjIgNi45OTgtMjcuNjIxIDIuODQ1LTM0LjYyLTkuMjc2LTYuOTk4MS0xMi4xMjItMi44NDUtMjcuNjIxIDkuMjc2LTM0LjYyeiIvPgo8L2c+Cjwvc3ZnPgo=",
    "text": "Modern GPS tracking platform",
    "website": "https://www.traccar.org/",
    "saas": "https://traccar.saashup.com/",
    "category": "logistic"
}, {
    "name": "Gotenberg",
    "logo": "https://gotenberg.dev/img/logo_jed.png",
    "text": "stateless API for PDF files",
    "website": "https://gotenberg.dev/",
    "saas": "https://gotenberg.saashup.com/",
    "plan": "iron",
    "plancolor": "info",
    "category": "file"
}, {
    "name": "Portainer-ce",
    "logo": "https://cdn.worldvectorlogo.com/logos/portainer.svg",
    "text": "Container management made easy",
    "website": "https://www.portainer.io/",
    "saas": "https://portainer-ce.saashup.com/",
    "plan": "iron",
    "plancolor": "info",
    "category": "docker"
}, {
    "name": "CouchDB",
    "logo": "https://couchdb.apache.org/image/couch@2x.png",
    "text": "Seamless, that scales, reliable with an Intuitive HTTP/JSON API",
    "website": "https://couchdb.apache.org/",
    "saas": "https://couchdb.saashup.com/",
    "plan": "iron",
    "plancolor": "info",
    "category": "database"
}, {
    "name": "Uptime Kuma",
    "logo": "https://uptime.kuma.pet/img/icon.svg",
    "text": "A self-hosted monitoring tool",
    "website": "https://uptime.kuma.pet/",
    "saas": "https://uptime-kuma.saashup.com/",
    "plan": "iron",
    "plancolor": "info",
    "category": "monitoring"
}, {
    "name": "Solr",
    "logo": "data:image/png;base64,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",
    "text": "open source enterprise search platform built on Apache Lucene",
    "website": "https://solr.apache.org/",
    "saas": "https://solr.saashup.com/",
    "plan": "iron",
    "plancolor": "info",
    "category": "database"
}, {
    "name": "LAM",
    "logo": "https://www.ldap-account-manager.org/lamcms/sites/default/files/logo.png",
    "text": "LAM is a webfrontend for LDAP directory",
    "website": "https://www.ldap-account-manager.org/",
    "saas": "https://lam.saashup.com/",
    "plan": "iron",
    "plancolor": "info",
    "category": "admin"
}, {
    "name": "Osjs",
    "logo": "https://raw.githubusercontent.com/os-js/gfx/master/logo-big.png",
    "text": "JavaScript web desktop platform with a window manager",
    "website": "https://www.os-js.org/",
    "saas": "https://osjs.saashup.com/",
    "plan": "iron",
    "plancolor": "info",
    "category": "other"
}, {
    "name": "PhpMyAdmin",
    "logo": "https://www.phpmyadmin.net/static/images/logo.png?067b638aa2a2",
    "text": "Administration of MySQL over the Web",
    "website": "https://www.phpmyadmin.net/",
    "saas": "https://phpmyadmin.saashup.com/",
    "plan": "iron",
    "plancolor": "info",
    "category": "admin"
}, {
    "name": "Statping",
    "logo": "https://camo.githubusercontent.com/adc90af589fd69235a49fc1e71eb55d6a9a9890c786ebcd578d1ac04fe8a884f/68747470733a2f2f73332d75732d776573742d322e616d617a6f6e6177732e636f6d2f676974696d67732f7374617470696e672e706e67",
    "text": "Status Page & Monitoring Server",
    "website": "https://github.com/statping/statping",
    "saas": "https://statping.saashup.com/",
    "plan": "iron",
    "plancolor": "info",
    "category": "monitoring"
}, {
    "name": "Baikal",
    "logo": "https://sabre.io/img/baikal.png",
    "text": "lightweight CalDAV+CardDAV server",
    "website": "https://sabre.io/baikal/",
    "saas": "https://baikal.saashup.com/",
    "plan": "iron",
    "plancolor": "info",
    "category": "file"
}, {
    "name": "Minio",
    "logo": "https://min.io/resources/img/logo.svg",
    "text": "Multi-Cloud Object Storage",
    "website": "https://min.io",
    "saas": "https://minio.saashup.com/",
    "plan": "iron",
    "plancolor": "info",
    "category": "file"
}, {
    "name": "Nextcoud",
    "logo": "https://nextcloud.com/wp-content/themes/next/assets/img/common/nextcloud-square-logo.png",
    "text": "productivity platform that keeps you in control",
    "website": "https://nextcloud.com/",
    "saas": "https://nextcloud.saashup.com/",
    "plan": "iron",
    "plancolor": "info",
    "category": "groupware"
}]

function refreshCatalog() {
    $("#catalog-dynamic-list").html('')
    for (const c of catalog) {
        if (c.category.match(new RegExp(filter.category)) && c.name.match(new RegExp(filter.text, "i"))) $("#catalog-dynamic-list").append('<div class="col-sm-12 col-md-4"><div class="card m-3" style="height: 250px;"><div class="card-body">\
            <h2 class="card-title text-primary text-center">' + c.name + '</h2><span class="position-absolute translate-middle badge rounded-pill bg-' + c.plancolor + '" style="top:20px; right: -10px;">' + c.plan + '</span>\
            \<span class="position-absolute translate-middle badge rounded-pill bg-primary" style="top:20px; left: 50px;">' + c.category + '</span><div class="row card-text"><div class="col-6 text-center"><br><a href="' + c.website + '">\
            <img src="' + c.logo + '"  alt="' + c.text + '" width="64" /></a></div><div class="col-6"><a href="' + c.saas + '">' + c.name + '</a><br><span class="small text-muted">' + c.text + '</span></div>\
            </div></div></div></div>');
    }
}

$(document).ready(function () {

    $("#search-input-select").html("<option value='.*'>all</option>")
    for (const c of catalog) {
        if ($('#search-input-select option[value=' + c.category + ']').length === 0) $("#search-input-select").append("<option value='"+c.category+"'>"+c.category+"</option>")
    }

    refreshCatalog()

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

})