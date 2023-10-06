console.log(lang);
const translatedText = findLang('navHome', lang.myLang);
console.log(translatedText);

if (window.location.pathname === '/') {
  history.replaceState(null, null, myLang);    
}