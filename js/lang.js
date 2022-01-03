const lang = {
    "en": { 
        "navHome": "home",
        "navDoc": "docs",
        "navStatus": "status",
        "navCatalog": "catalog",
        "navContact": "contact",
        "navPricing": "pricing",
        "navJobs": "jobs",
        "first": "<b class='text-primary'>Do you have a SaaS ?</b> <br>Make SaaS our problem.<br>Focus on product and revenue while we provide you a Saas platform.<br>",
        "intro": "Saas-ify now<br>your <span class='text-primary'>application</span>.<br><br>You can request a <a href='https://demo.saashup.com' target='_blank'>demo</a><br>and increase your <span class='text-primary'>selling</span><br> through your customized <span class='text-danger'>saas</span> with no hiding cost.",
        "description": "<span class='text-info'>SaaShup</span> is a simple solution to <span class='text-primary'>saas-ify</span> your application.<br>We help you to expose your application and simplify the management. Build and develop your software and let us taking care of deploying it to your customer through your owned customized Saas. Our services remain flexible and scalable: we adapt the capacity to your activity.",
        "explain": "<div class='text-info text-center'>What do I get ?</div>You just need to provide a docker and we provide a full Saas solution : Front application, authentication, payment, monitoring, backups, logging, auditing, L1 support...<br> <a href='#contact-title'> get in touch</a> if you have questions.",
        "stage1-title": "Last Release",
        "stage2-title": "Testing",
        "stage3-title": "Developping",
        "stage1": "A centralized service delivery platform for containerized apps",
        "stage2": "Modern GPS tracking platform",
        "stage3": "La suite logicielle libre des ostéopathes",
        "plan-title": "Plans",
        "pricing-title": "Pricing",
        "portainer-text": "A centralized service delivery platform for containerized apps",
        "nginx-text": "Advanced Load Balancer, Web Server, &amp; Reverse Proxy",
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
    },
    "fr": {
        "first": "<b class='text-primary'>Avez-vous un SaaS ?</b> <br>Laissez-nous s'en occuper.<br>Travaillez sur votre produit et revenu pendant que l'on gere votre Saas.<br>",
    }
}

function findLang(myid, langSelected) {
    if (myid in lang[langSelected]) return lang[langSelected][myid]
    if (myid in lang['en']) return lang['en'][myid]
    return ''
}

function updateLang(langSelected) {
   for (let t in lang['en']) {
       $('#'+t).html(findLang(t, langSelected))
   }
}
