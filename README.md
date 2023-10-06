
# **VARIABLES**
[name] is a page name's
>_contact_

[ports] is an integer associated by a port 
>_8080_

[language] is in format ISO 639-1 without the localization.

> _fr_

[languageCode] is in format ISO 639-1 with the localization.

>_fr-FR_

[languageName] is the name of the language.

>_french_
# **DEVELOPER**

> Read : https://gohugo.io/documentation/

To do any modification or start the Hugo website, you must be located at the root of the project.

> Read :
> [https://gohugo.io/getting-started/quick-start/](https://gohugo.io/getting-started/quick-start/) or `hugo --help`

### **To start the website :**

    hugo serve -p [ports]

### **To build the website in a folder :**

    hugo

> Read :
> [https://gohugo.io/content-management/formats/](https://gohugo.io/content-management/formats/)
> and https://gohugo.io/content-management/types/

### **To add content/pages on the website :**
_Use only HTML format._


**With hugo :**

    Hugo new [name]/_index.html

**Manually :**

    cd content && mkdir [name] && cd [name] && touch _index.html

> Read : https://gohugo.io/content-management/multilingual/

### **To add multilanguage content/pages on the website :**

_You must have the page in each language_


    cd content && mkdir [name] && cd [name] && touch _index.html
    
    cd ../../ && mv [name] [language]

## **To add languages on the website :**

> **MANDATORY :**

 - **Flag image** _(./assets/images/[language].png_**)**
   
 - **Translated all the content in this language**

### **Add language in the config file :**

Copy and complete next to last language of this content :

    [languageCode]:
    
    languageName: [languageName]
    
    languageCode: [language]
    
    contentDir: content/[language]
    
    title: SaaShup, SaaS next solution engine, easily run your SaaS business
    
    weight: 1
    
    menu:
    
    main:
    
    - name: home ##(You have to translate it)
    
    url: .
    
    identifier:
    
    weight: 1
    
    pre: fas fa-home
    
    - name: catalog ##(You have to translate it)
    
    url: catalog/
    
    identifier: catalog
    
    weight: 2
    
    pre: fas fa-book
    
    - name: pricing ##(You have to translate it)
    
    url: pricing/
    
    identifier: pricing
    
    weight: 3
    
    pre: fas fa-dollar-sign
    
    - name: contact ##(You have to translate it)
    
    url: contact/
    
    identifier: contact
    
    weight: 4
    
    pre: fas fa-book
    
    - name: jobs ##(You have to translate it)
    
    identifier: jobs
    
    weight: 5
    
    pre: fas fa-gamepad
    
    - name: docs ##(You have to translate it)
    
    identifier: docs
    
    weight: 6
    
    pre: fas fa-file-alt
    
    - name: status ##(You have to translate it)
    
    identifier: status
    
    weight: 7
    
    pre: fas fa-battery-full

### **Create a folder for the language :**

    cd content && mkdir [language]

Past in, it all the content translated with exactly the same architecture as the other languages.

### **Modify the navbar :**

    cd layouts/partials

**In nav.html :**

 1. Add this content down below this line :

*span class="pe-1 pt-2"><link href="{{ $style.Permalink }}" rel="stylesheet"* 

    {{ $[language]_flag := resources.Get "images/[language].png" }}

2. Add this content downbelow this line :
*ul class="dropdown-menu" style="padding-left:2rem;" aria-labelledby="dropdownMenuLink*

``<li class="p-2">
        <a href="/[languageCode]/{{ $currentUrl }}">
    <img id="lang-flag" src="{{ $[language]_flag.RelPermalink }}" alt="[languageName] langage" width="32px"/>
    </a>
    </li>``

### **Translate i18n**

    cd i18n && touch [language].TOML

Use a translator like ChatGPT to translate in your language like the other.

# **CLOUDFLARE**

To Deploy on Cloudflare, you have to follow instructions from this : [Docs](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/#deploy-with-cloudflare-pages)

# **PLAYWRIGHT**

…




