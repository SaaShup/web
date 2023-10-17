$(document).ready(function () {
    var cc = initCookieConsent();
    var localLang = window.localStorage.getItem('lang').split('-')[0];
    cc.run({
        current_lang: localLang,
        autoclear_cookies: true,
        page_scripts: true,
        onFirstAction: function (user_preferences, cookie) {
        },
        onAccept: function (cookie) {
        },
        onChange: function (cookie, changed_preferences) {
        },
        languages: {
            'en': {
                consent_modal: {
                    title: 'We use cookies!',
                    description: 'Hi, this website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter will be set only after consent. <button type="button" data-cc="c-settings" class="cc-link">Let me choose</button>',
                    primary_btn: {
                        text: 'Accept all',
                        role: 'accept_all'
                    },
                    secondary_btn: {
                        text: 'Reject all',
                        role: 'accept_necessary'
                    }
                },
                settings_modal: {
                    title: 'Cookie preferences',
                    save_settings_btn: 'Save settings',
                    accept_all_btn: 'Accept all',
                    reject_all_btn: 'Reject all',
                    close_btn_label: 'Close',
                    cookie_table_headers: [
                        { col1: 'Name' },
                        { col2: 'Domain' },
                        { col3: 'Expiration' },
                        { col4: 'Description' }
                    ],
                    blocks: [
                        {
                            title: 'Cookie usage 📢',
                            description: 'I use cookies to ensure the basic functionalities of the website and to enhance your online experience. You can choose for each category to opt-in/out whenever you want. For more details relative to cookies and other sensitive data, please read the full <a href="#" class="cc-link">privacy policy</a>.'
                        }, {
                            title: 'Strictly necessary cookies',
                            description: 'These cookies are essential for the proper functioning of my website. Without these cookies, the website would not work properly',
                            toggle: {
                                value: 'necessary',
                                enabled: true,
                                readonly: true
                            }
                        }, {
                            title: 'Performance and Analytics cookies',
                            description: 'These cookies allow the website to remember the choices you have made in the past',
                            toggle: {
                                value: 'analytics',
                                enabled: false,
                                readonly: false
                            },
                            cookie_table: [
                                {
                                    col1: '^_ga',
                                    col2: 'google.com',
                                    col3: '2 years',
                                    col4: 'description ...',
                                    is_regex: true
                                },
                                {
                                    col1: '_gid',
                                    col2: 'google.com',
                                    col3: '1 day',
                                    col4: 'description ...',
                                }
                            ]
                        }, {
                            title: 'Advertisement and Targeting cookies',
                            description: 'These cookies collect information about how you use the website, which pages you visited and which links you clicked on. All of the data is anonymized and cannot be used to identify you',
                            toggle: {
                                value: 'targeting',
                                enabled: false,
                                readonly: false
                            }
                        }, {
                            title: 'More information',
                            description: 'For any queries in relation to our policy on cookies and your choices, please <a class="cc-link" href="#yourcontactpage">contact us</a>.',
                        }
                    ]
                }
            },
            'fr': {
                consent_modal: {
                    title: 'Nous utilisons des cookies !',
                    description: 'Bonjour, ce site web utilise des cookies essentiels pour assurer son bon fonctionnement et des cookies de suivi pour comprendre comment vous interagissez avec lui. Ces derniers ne seront définis qu\'après consentement. <button type="button" data-cc="c-settings" class="cc-link">Laissez-moi choisir</button>',
                    primary_btn: {
                        text: 'Accepter tout',
                        role: 'accept_all'
                    },
                    secondary_btn: {
                        text: 'Rejeter tout',
                        role: 'accept_necessary'
                    }
                },
                settings_modal: {
                    title: 'Préférences de cookies',
                    save_settings_btn: 'Enregistrer les paramètres',
                    accept_all_btn: 'Accepter tout',
                    reject_all_btn: 'Rejeter tout',
                    close_btn_label: 'Fermer',
                    cookie_table_headers: [
                        { col1: 'Nom' },
                        { col2: 'Domaine' },
                        { col3: 'Expiration' },
                        { col4: 'Description' }
                    ],
                    blocks: [
                        {
                            title: 'Utilisation des cookies 📢',
                            description: 'J\'utilise des cookies pour assurer les fonctionnalités de base du site web et améliorer votre expérience en ligne. Vous pouvez choisir d\'accepter ou de refuser chaque catégorie quand vous le souhaitez. Pour plus de détails sur les cookies et d\'autres données sensibles, veuillez lire la <a href="#" class="cc-link">politique de confidentialité complète</a>.'
                        }, {
                            title: 'Cookies strictement nécessaires',
                            description: 'Ces cookies sont essentiels pour le bon fonctionnement de mon site web. Sans ces cookies, le site ne fonctionnerait pas correctement',
                            toggle: {
                                value: 'necessary',
                                enabled: true,
                                readonly: true
                            }
                        }, {
                            title: 'Cookies de performance et d\'analyse',
                            description: 'Ces cookies permettent au site web de se souvenir des choix que vous avez faits par le passé',
                            toggle: {
                                value: 'analytics',
                                enabled: false,
                                readonly: false
                            },
                            cookie_table: [
                                {
                                    col1: '^_ga',
                                    col2: 'google.com',
                                    col3: '2 ans',
                                    col4: 'description ...',
                                    is_regex: true
                                },
                                {
                                    col1: '_gid',
                                    col2: 'google.com',
                                    col3: '1 jour',
                                    col4: 'description ...',
                                }
                            ]
                        }, {
                            title: 'Cookies publicitaires et de ciblage',
                            description: 'Ces cookies collectent des informations sur la façon dont vous utilisez le site web, quelles pages vous avez visitées et quels liens vous avez cliqués. Toutes les données sont anonymisées et ne peuvent pas être utilisées pour vous identifier',
                            toggle: {
                                value: 'targeting',
                                enabled: false,
                                readonly: false
                            }
                        }, {
                            title: 'Plus d\'informations',
                            description: 'Pour toute question concernant notre politique en matière de cookies et vos choix, veuillez <a class="cc-link" href="#yourcontactpage">nous contacter</a>.',
                        }
                    ]
                }
            },
            'de': {
                consent_modal: {
                    title: 'Wir verwenden Cookies!',
                    description: 'Hallo, diese Website verwendet essenzielle Cookies, um ihren ordnungsgemäßen Betrieb zu gewährleisten, und Tracking-Cookies, um zu verstehen, wie Sie damit interagieren. Letztere werden nur nach Zustimmung gesetzt. <button type="button" data-cc="c-settings" class="cc-link">Lass mich wählen</button>',
                    primary_btn: {
                        text: 'Alle akzeptieren',
                        role: 'accept_all'
                    },
                    secondary_btn: {
                        text: 'Alle ablehnen',
                        role: 'accept_necessary'
                    }
                },
                settings_modal: {
                    title: 'Cookie-Einstellungen',
                    save_settings_btn: 'Einstellungen speichern',
                    accept_all_btn: 'Alle akzeptieren',
                    reject_all_btn: 'Alle ablehnen',
                    close_btn_label: 'Schließen',
                    cookie_table_headers: [
                        { col1: 'Name' },
                        { col2: 'Domaine' },
                        { col3: 'Ablauf' },
                        { col4: 'Beschreibung' }
                    ],
                    blocks: [
                        {
                            title: 'Cookie-Nutzung 📢',
                            description: 'Ich verwende Cookies, um die grundlegenden Funktionen der Website sicherzustellen und Ihr Online-Erlebnis zu verbessern. Sie können für jede Kategorie wählen, ob Sie sie aktivieren oder deaktivieren möchten. Weitere Details zu Cookies und anderen sensiblen Daten finden Sie in der vollständigen <a href="#" class="cc-link">Datenschutzrichtlinie</a>.'
                        }, {
                            title: 'Unbedingt notwendige Cookies',
                            description: 'Diese Cookies sind für das ordnungsgemäße Funktionieren meiner Website unerlässlich. Ohne diese Cookies würde die Website nicht ordnungsgemäß funktionieren',
                            toggle: {
                                value: 'necessary',
                                enabled: true,
                                readonly: true
                            }
                        }, {
                            title: 'Cookies für Leistung und Analyse',
                            description: 'Diese Cookies ermöglichen es der Website, sich an die von Ihnen in der Vergangenheit getroffenen Entscheidungen zu erinnern',
                            toggle: {
                                value: 'analytics',
                                enabled: false,
                                readonly: false
                            },
                            cookie_table: [
                                {
                                    col1: '^_ga',
                                    col2: 'google.com',
                                    col3: '2 Jahre',
                                    col4: 'Beschreibung ...',
                                    is_regex: true
                                },
                                {
                                    col1: '_gid',
                                    col2: 'google.com',
                                    col3: '1 Tag',
                                    col4: 'Beschreibung ...',
                                }
                            ]
                        }, {
                            title: 'Werbe- und Targeting-Cookies',
                            description: 'Diese Cookies sammeln Informationen darüber, wie Sie die Website nutzen, welche Seiten Sie besucht und welche Links Sie angeklickt haben. Alle Daten sind anonymisiert und können nicht verwendet werden, um Sie zu identifizieren',
                            toggle: {
                                value: 'targeting',
                                enabled: false,
                                readonly: false
                            }
                        }, {
                            title: 'Weitere Informationen',
                            description: 'Für Fragen im Zusammenhang mit unserer Cookie-Richtlinie und Ihren Auswahlmöglichkeiten kontaktieren Sie uns bitte unter <a class="cc-link" href="#yourcontactpage">Ihrem Kontakt</a>.',
                        }
                    ]
                }
            }
        }
    });
});