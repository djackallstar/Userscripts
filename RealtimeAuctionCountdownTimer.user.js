// ==UserScript==
// @name            Realtime Auction Countdown Timer
// @description     Show realtime countdown timers next to all auction threads in the WTS forum
// @include         http://forums.e-hentai.org/index.php?showforum=77
// ==/UserScript==

/*** Settings ***/

var update_interval = 60    // The interval (in seconds) for the timers to be updated.
var timer_height    = 45    // The height of timers (in pixels).

/****************/

var wnd = window
var doc = wnd.document
var loc = location
var href = loc.href

var init_timer = function(timer, thread_url) {
    var timer_url = ''
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            var m = /(http:\/\/e-hentai-countdown\.darknessfall\.com\/[^'"]+\?)([^'"]+)/.exec(xhr.responseText)
            if(!m) { return }
            timer_url = m[1] + encodeURI(unescape(m[2].replace(/&?auctionname=[^'"]*?&amp;/, '&').replace(/&amp;/g, '&').replace(/&expire=[^&]*/, '')))
            timer.src = timer_url
        }
    }
    xhr.open('GET', thread_url, true)
    xhr.send(null)
}

var threads = doc.querySelectorAll('table.ipbtable>tbody>tr>td.row1>div:last-child')
for(var i=threads.length-1; i>=0; i--) {
    var title = threads[i].textContent
    if(/\bauction\b/i.test(title)) {
        (function() {
            var thread_url = threads[i].querySelector('span>a:first-child').href
            var timer = doc.createElement('IFRAME')
            timer.height = timer_height + 'px'
            timer.frameBorder = 0
            setInterval(function() { timer.src = timer.src }, update_interval*1000)
            threads[i].appendChild(timer)
            init_timer(timer, thread_url)
        })()
    }
}
