// ==UserScript==
// @name        18AV Tweaks
// @updateURL   about:blank
// @grant       GM_xmlhttpRequest
// @grant       GM_setClipboard
// @include     http://18av.mm-cg.com/*
// ==/UserScript==

var wnd = window
var doc = wnd.document
var loc = wnd.location
var href = loc.href

var $  = function(e, css) { if(!css) { css=e; e=doc }; return e.querySelector(css) }
var $$ = function(e, css) { if(!css) { css=e; e=doc }; return e.querySelectorAll(css) }

var zap = function(e, css) {
    if(!css) { css=e; e=doc }
    var a = e.querySelectorAll(css)
    for(var i=0, len=a.length; i<len; i++) { a[i].parentNode.removeChild(a[i]) }
}

var v = $$('iframe[src^="http://www.youjizz.com/videos/embed/"]')
for(var i=0, len=v.length; i<len; i++) {
    (function(i){
        v[i].style.display = 'none' // speed up the page load
        var btn = doc.createElement('button')
        var url = v[i].src
        var txt = doc.createTextNode(url)
        btn.appendChild(txt)
        $('.cs_mvwidth').appendChild(doc.createElement('br'))
        $('.cs_mvwidth').appendChild(btn)
        btn.addEventListener('click', function() {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                synchronous: false,
                onload: function(res) {
                    GM_setClipboard(res.responseText)
                    //var vlnk = res.responseXML.querySelector('#downloadButton').querySelector('a').href
                    var vlnk = res.responseText.match(/newLink\.setAttribute\(['"]href['"],['"]([^'"]*)['"]\)/)[1]
                    var vid = 'download_link_' + (i+1)
                    if(!$('#'+vid)) {
                        var a = doc.createElement('a')
                        a.id = vid
                        a.download = a.text = $('#main h1').textContent.match(/影片名稱：(.*)/)[1] + '_' + (i+1)
                        a.href = vlnk
                        btn.appendChild(doc.createElement('br'))
                        btn.appendChild(a)
                    }
                    var m3u = '#EXTM3U\n'
                    m3u += vlnk + '\n'
                    //loc.href = 'data:application/x-mpegurl;base64,' + btoa(m3u)
                    loc.href = 'data:audio/mpegurl;base64,' + btoa(m3u)
                },
            })
        })
    })(i)
}

zap('.TW_UTtoy')
zap('a[href^="http://goo.gl/"]')
zap('img[src*="blogspot.com"]')
zap('#ArticlesEx_box')
zap('.ut_ad_box')
zap('iframe')
