// ==UserScript==
// @name           HHcomic Autoload
// @description    Autoload all images on one page when reading manga on HHcomic.com.
// @grant          GM_xmlhttpRequest
// @grant          unsafeWindow
// @include        http://paga.hhcomic.net/*/*
// @include        http://paga.vs20.com/*/*
// ==/UserScript==

var wnd = window
var doc = wnd.document
var loc = location
var href = loc.href

var load_imgs = function()
{
    doc.body.innerHTML = ''
    var d = doc.createDocumentFragment()
    for(var i=0, len=imgs.length; i<len; i++)
    {
        var img = new Image()
        img.id = i
        img.onerror = function() { this.onerror = null; this.style.display = 'none' }
        img.src = imgs[i]
        img.style.cssText = 'display: block; margin-left: auto; margin-right: auto'
        img.width = wnd.innerWidth * 0.70
        d.appendChild(doc.createTextNode('p. '+i))
        d.appendChild(doc.createElement('BR'))
        d.appendChild(img)
        d.appendChild(doc.createElement('BR'))
    }
    doc.body.appendChild(d)
}

if((/^http:\/\/paga\.hhcomic\.net\//.test(href)) || (/^http:\/\/paga\.vs20\.com\//.test(href)))
{
    if(href.indexOf('#')==-1) { loc.href = loc.href + '#' }
    var imgs = []
    if(typeof unsafeWindow != 'undefined') { wnd = unsafeWindow }
    if(typeof wnd.arrPicLlstUrl != 'undefined') { imgs = wnd.arrPicLlstUrl } else { alert('Cannot find the image links.'); throw 'exit' }
    var server = wnd.ServerList[/.*\bs=(\d+)/.exec(href)[1]-1]
    for(var i=imgs.length-1; i>=0; i--) { imgs[i] = server + imgs[i] }
    load_imgs()

    if(typeof GM_xmlhttpRequest != 'undefined')
    {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'http://hhcomic.com/comic/' + /.*?\/(\d+\/).*/.exec(href)[1],
            onload: function(response)
            {
                var html = response.responseText, m, p = /<li><a [^>]*?href=(http:\/\/[^ ]*)/g, vlnks = ['javascript:alert("This is the last volume.")']
                while(m=p.exec(html)) { if(m[1] != href) { vlnks.push(m[1]) } else { break } }
                vlnks.sort()
                var nextlink = vlnks[0]

                var nextlink_el = doc.createElement('A')
                nextlink_el.appendChild(doc.createTextNode('Next'))
                nextlink_el.href = nextlink
                doc.body.appendChild(nextlink_el)

                addEventListener("keydown", function(evt) { if(evt.keyCode == 32) { evt.preventDefault(); loc.href = doc.getElementsByTagName('A')[0].href } }, false)
            }
        })
    }
    else
    {
        var f = doc.createElement('IFRAME')
        f.src = 'http://hhcomic.com/comic/' + /.*?\/(\d+\/).*/.exec(href)[1]
        f.width = 800
        f.height = 600
        f.frameBorder = 1
        doc.body.appendChild(f)
    }
}
