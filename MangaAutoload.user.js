// ==UserScript==
// @name            MangaAutoload
// @description
// @updateURL       about:blank
// @include         http://*.e-hentai.org/*
// @include         http://*.servik.com/*
// @include         http://18h.mm-cg.com/*
// @include         http://bbs.bbs-tw.com/*
// @include         http://donghua.dmzj.com/*
// @include         http://e-hentai.org/*
// @include         http://exhentai.org/*
// @include         http://harddrop.com/*
// @include         http://paga.hhcomic.net/*/*
// @include         http://www.tetrisfriends.com/*
// ==/UserScript==

var wnd = window
var doc = wnd.document
var loc = location
var href = loc.href

if(/^http:\/\/www\.tetrisfriends\.com\//.test(href)) {
    addEventListener('load', function() { doc.head.appendChild(doc.createElement('script')).src = 'https://github.com/djackallstar/Userscripts/raw/master/Tetris%20Friends%20Tweaks.user.js' }, false)
}
else if(/^http:\/\/donghua\.dmzj\.com\//.test(href)) {
    addEventListener('DOMContentLoaded', function() { doc.head.appendChild(doc.createElement('script')).src = 'https://github.com/djackallstar/Userscripts/raw/master/Dmzj%20Anime%20Downloader.user.js' }, false)
}
else if((/[\.\/]e-hentai\.org\//.test(href)) || (/\/exhentai\.org\//.test(href))) {
    //doc.head.appendChild(doc.createElement('script')).src = 'https://github.com/djackallstar/Userscripts/raw/master/Countdown%20Timer%20for%20the%20Random%20Encounter%20Event%20on%20E-Hentai.user.js'
    if(/^http:\/\/((g\.)|(ex))/.test(href)) {
        var e = doc.getElementsByClassName('itg')[0]
        if(e) { for(var lnks=e.querySelectorAll('a'), i=lnks.length-1; i>=0; i--) { lnks[i].target = '_blank' } }
        var e = doc.getElementById('gdt')
        if(e) { for(var lnks=e.querySelectorAll('a'), i=lnks.length-1; i>=0; i--) { lnks[i].target = '_blank' } }
        doc.head.appendChild(doc.createElement('script')).src = 'http://ss-o.net/userjs/oAutoPagerize.js'
    }
}
else if((/^http:\/\/18h\.mm-cg\.com\//.test(href)) || (/^http:\/\/.*?\.servik\.com\//.test(href))) {
    doc.head.appendChild(doc.createElement('script')).src = 'https://github.com/djackallstar/Userscripts/raw/master/18H%20Hentai%20Manga%20Autoload.user.js'
}
else if(/^http:\/\/bbs\.bbs-tw\.com\//.test(href)) {
    doc.head.appendChild(doc.createElement('script')).src = 'https://github.com/djackallstar/Userscripts/raw/master/Hung-Ya%20Forum%20Tweaks.user.js'
}
else if(/^http:\/\/harddrop\.com\//.test(href)) {
    var users_to_hide = ['agizzlefizzle123', 'Blink_', 'Boingloing', 'charchar_XD', 'dotamistern', 'FireTstar', 'gerdhal', 'josi', 'leilickan', 'pajezki25', 'pizzapizza', 'R_A_P_H_A_E_L_', 'Riisssaaa', 'Shuey', 'Sisu_', 'virulent', 'waizqt']
    users_to_hide = '["' + users_to_hide.join().replace(/,/g,'", "') + '"]'
    loc.href = 'javascript:var users_to_hide = ' + users_to_hide
    doc.head.appendChild(doc.createElement('script')).src = 'https://github.com/djackallstar/Userscripts/raw/master/Hard%20Drop%20Forum%20Tweaks.user.js'
}
else if(/^http:\/\/paga\.hhcomic\.net\//.test(href)) {
    doc.head.appendChild(doc.createElement('script')).src = 'https://github.com/djackallstar/Userscripts/raw/master/HHcomic%20Autoload.user.js'
}
