// ==UserScript==
// @name            Countdown Timer for the Random Encounter Event on E-Hentai
// @description     Adds a countdown timer for the Random Encounter event on E-Hentai.org and its subdomains.
// @include         http://e-hentai.org/*
// @include         http://*.e-hentai.org/*
// ==/UserScript==

var wnd = window
var doc = wnd.document
var loc = location
var href = loc.href

if(/[\.\/]e-hentai\.org\//.test(href))
{
    var get_cookie = function(k) {
        var cookies = doc.cookie.split('; ')
        for(var i=cookies.length-1; i>=0; i--) { if(new RegExp(k+'=').test(cookies[i])) { return cookies[i].substring(k.length+1) } }
    }
    var set_cookie = function(k, v) { doc.cookie = k + '=' + v + '; expires=Fri, 31 Dec 9999 23:59:59 GMT; domain=.e-hentai.org' }

    if(isNaN(get_cookie('event'))) { alert('The "event" cookie does not exist or is invalid.'); throw 'exit' }
    if(isNaN(get_cookie('re_cnt'))) { set_cookie('re_cnt', 0) }

    var timer_box = doc.createElement('DIV')
    timer_box.id = 'countdown_timer'
    timer_box.onclick = function() { if(/\bReady\b/i.test(this.textContent)) { wnd.open('http://e-hentai.org/', href=='http://e-hentai.org/'?'_self':'_blank') } }

    if(/\/e-hentai\./.test(href)) {
        timer_box.style.color = '#ff0000'
        doc.getElementById('newshead').appendChild(timer_box)
    } else {
        timer_box.style.cssText = 'top:0; right:0; position:fixed; z-index:2147483647; background:rgba(0,255,0,0.2); color:#ff0000;'
        doc.body.appendChild(timer_box)
    }

    var update_timer = function() {
        var now = Math.floor(new Date().getTime()/1000)
        var diff = parseInt(get_cookie('event')) + 1800 - now
        if(diff <= 0) { timer_box.textContent = 'Ready! re_cnt=' + get_cookie('re_cnt')
        } else {
            var mm = Math.floor(diff / 60) + ''
            mm = (mm.length >= 2 ? mm : '0' + mm)
            var ss = Math.floor(diff % 60) + ''
            ss = (ss.length >= 2 ? ss : '0' + ss)
            timer_box.textContent = mm + ':' + ss + ', re_cnt=' + get_cookie('re_cnt')
        }
        setTimeout(update_timer, 1000)
    }
    //addEventListener('DOMContentLoaded', update_timer, false)
    update_timer()

    var eventpane = doc.getElementById('eventpane')
    if(eventpane) {
        var hv_lnk = eventpane.querySelector('a[onclick*="http://hentaiverse.org/"]')
        if(hv_lnk) {
            hv_lnk.addEventListener('click', function() {
                eventpane.style.display = 'block'
                if(hv_lnk.text != 'HentaiVerse') { set_cookie('re_cnt', parseInt(get_cookie('re_cnt'))+1) }
                hv_lnk.text = 'HentaiVerse'
            }, false)
        }
        else if(/\bdawn\b/i.test(eventpane.textContent)) { set_cookie('re_cnt', 0) }
    }
}
