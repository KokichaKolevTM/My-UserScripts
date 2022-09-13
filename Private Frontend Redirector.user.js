// ==UserScript==
// @name        Private Frontend Redirector
// @namespace   Violentmonkey Scripts
// @match       *://*.imgur.com/*
// @match       *://*.imgur.io/*
// @match       *://*.medium.com/*
// @match       *://*.quora.com/*
// @match       *://*.tiktok.com/*
// @match       *://*.google.com/*
// @match       *://*.odysee.com/*
// @match       *://*.youtube.com/*
// @match       *://*.youtube-nocookie.com/*
// @grant       none
// @version     1.0
// @author      KokichaKolevTM
// @description Redirects some services to private frontends
// @run-at      document-start
// ==/UserScript==

//medium, tiktok, imgur, quora, instagram, search (google to startpage redirect)
// improve:
// Make sure redirects happen for certain services on main domain (https?:\/\/(www\.)?quora\.com\/([^\?]*))
// And maybe cleanup urls from unneeded parameters
function check_domain(domain) {
  return (window.location.hostname === domain || window.location.hostname.endsWith("." + domain)) && window.location.pathname !== "/";
}

function random(length) {
    return Math.floor(Math.random() * length);
}

let url = new URL(window.location.href);
const rimgo = ["rimgo.pussthecat.org", "i.bcow.xyz", "rimgo.vern.cc", "rimgo.privacydev.net"];
const scribe = ["scribe.pussthecat.org", "scribe.rip", "scribe.nixnet.services", "scribe.esmailelbob.xyz"];
const quetre = ["quetre.pussthecat.org", "quora.vern.cc", "quetre.esmailelbob.xyz"];
const proxitok = ["proxitok.pussthecat.org", "proxitok.herokuapp.com", "proxitok.esmailelbob.xyz", "proxitok.privacydev.net"];
const librarian = ["librarian.pussthecat.org", "lbry.bcow.xyz", "librarian.esmailelbob.xyz", "lbry.vern.cc"];
const invidious = ["yewtu.be", "vid.puffyan.us", "inv.riverside.rocks"];
const libreddit = ["libreddit.pussthecat.org", "libredd.it", "libreddit.spike.codes", "libreddit.privacydev.net"];
// if(invidious.includes(window.location.hostname) && !url.searchParams.has("local")) {
//   url.searchParams.set("local", "true");
//   window.location.replace(url.href);
// }

if(check_domain("youtube.com") || check_domain("youtube-nocookie.com")) {
  window.stop();
  url.hostname = invidious[random(invidious.length)];
  url.searchParams.set("local", "true");
  window.location.replace(url.href);
}
else if(check_domain("reddit.com")) {
  window.stop();
  url.hostname = libreddit[random(libreddit.length)];
  window.location.replace(url.href);
}
else if(check_domain("imgur.com") || check_domain("imgur.io")) {
  window.stop();
  url.hostname = rimgo[random(rimgo.length)];
  window.location.replace(url.href);
}
else if(check_domain("medium.com")) {
  window.stop();
  url.hostname = scribe[random(scribe.length)];
  window.location.replace(url.href);
}
else if(check_domain("quora.com")) {
  window.stop();
  url.hostname = quetre[random(quetre.length)];
  window.location.replace(url.href);
}
else if(check_domain("tiktok.com")) {
  window.stop();
  url.hostname = proxitok[random(proxitok.length)];
  window.location.replace(url.href);
}
else if(check_domain("odysee.com")) {
  window.stop();
  url.hostname = librarian[random(librarian.length)];
  window.location.replace(url.href);
}
else if(check_domain("google.com") && window.location.pathname === "/search") {
  window.stop();
  window.location.replace("https://www.startpage.com/sp/search?query=" + url.searchParams.get("q"));
}


