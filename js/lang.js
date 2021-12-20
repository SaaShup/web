const lang = {
    "en": { 
        "navHome": "home",
        "navDoc": "docs",
        "navStatus": "status",
        "navCatalog": "catalog",
        "navContact": "contact",
        "navJobs": "jobs",
        "intro": "Boost now<br>your <span class='text-primary'>application</span>.<br>You can request a <span class='text-primary'>demo</span><br>and simplify your <span class='text-primary'>selling</span><br> through your customized <span class='text-danger'>saas</span>.",
        "description": "<span class='text-info'>SaaShup</span> is a simple solution to <span class='text-primary'>saas-ify</span> your application.<br>We help you to expose your application and simplify the management. Build and develop your software and let us taking care of deploying it to your customer through your owned customized Saas. Our services remain flexible and scalable: we adapt the capacity to your activity.",
        "stage1-title": "Last Release",
        "stage2-title": "Testing",
        "stage3-title": "Developping",
        "stage1": "A centralized service delivery platform for containerized apps",
        "stage2": "Low-code programming for event-driven applications",
        "stage3": "Low / No Code mobile & web development platform",
        "portainer-text": "A centralized service delivery platform for containerized apps",
        "convertigo-text": "Low / No Code mobile & web development platform",
        "libreosteo-text": "La suite logicielle libre des ostéopathes",
        "traccar-text": "Modern GPS tracking platform",
        "redis-text": "Open source in-memory data structure store",
        "mysql-text": "The world's most popular open source database",
        "nodered-text": "Low-code programming for event-driven applications",
        "catalog-title": "Catalog",
        "catalog-text": "You can browse in our <a href='/catalog.html'>catalog</a> to find an application with build saas.<br>If you dont find one or own one you want us to work on, pls contact us.<br>Find SaaS apps  and see what other people have done with SaaShup. ",
        "contact-title": "Contact",
        "contact-text-1": "There is many ways to contact us. You can use our website chat below or one of the messaging. <br><br>",
        "contact-text-2": "<br>We are available 9 hours a day, 5 days a week.<br><br>"
    }
}

function findLang(myid) {
    if (myid in lang['en']) return lang['en'][myid]
    return ''
}

function updateLang() {
   for (let t in lang['en']) {
       $('#'+t).html(findLang(t))
   }
}