// ==UserScript==
// @name            AutoPager for E-Hentai
// @description     Provides an AutoPager-like function for g.E-Hentai.org.
// @grant           GM_xmlhttpRequest
// @include         http://g.e-hentai.org/*
// @include         http://exhentai.org/*
// ==/UserScript==

var wnd = window
var doc = wnd.document
var loc = location
var href = loc.href

var api_url = ''
if(/^http:\/\/g\.e-hentai\.org\//.test(href)) { api_url = 'http://g.e-hentai.org/api.php' }
else if(/^http:\/\/exhentai\.org\//.test(href)) { api_url = 'http://exhentai.org/api.php' }
if(!api_url) { throw 'exit' }

if((/^http:\/\/g\.e-hentai\.org\//.test(href)) || (/^http:\/\/exhentai\.org\//.test(href)))
{
    if(!/\/[gs]\//.test(href)) { throw 'exit' }

    var gid = gtoken = ''
    if(/\/g\//.test(href))
    {
        var m = /\/g\/([^\/]+)\/([^\/]+)/.exec(href)
        if(m == null) { console.log('Invalid gallery.'); throw 'exit' }
        gid = m[1], gtoken = m[2]
    }
    else if(/\/s\//.test(href))
    {
        var m = /\/s\/([^\/]+)\/([^\/]+)-([0-9]+)/.exec(href)
        if(m == null) { console.log('Invalid image page.'); throw 'exit' }
        var imgkey = m[1], gid = m[2], page = m[3]
        if(imgkey.length > 10) { imgkey = imgkey.substring(0, 10) }
        if(typeof GM_xmlhttpRequest != 'undefined')
        {
            var gtoken = GM_xmlhttpRequest({
                method: 'POST',
                url: api_url,
                data: JSON.stringify({'method':'gtoken', 'pagelist':[[gid, imgkey, page]]}),
                synchronous: true
            })
        }
        else
        {
            var gtoken = new XMLHttpRequest()
            gtoken.open('POST', api_url, false)
            gtoken.send(JSON.stringify({'method':'gtoken', 'pagelist':[[gid, imgkey, page]]}))
        }
        gtoken = JSON.parse(gtoken.responseText)['tokenlist'][0]['token']
    }
    if(gid == '' || gtoken == '') { console.log('Cannot find gid or gtoken.'); throw 'exit' }

    var filecount = ''
    if(typeof GM_xmlhttpRequest != 'undefined')
    {
        filecount = GM_xmlhttpRequest({
            method: 'POST',
            url: api_url,
            data: JSON.stringify({'method':'gdata', 'gidlist':[[gid, gtoken]]}),
            synchronous: true
        })
    }
    else
    {
        filecount = new XMLHttpRequest()
        filecount.open('POST', api_url, false)
        filecount.send(JSON.stringify({'method':'gdata', 'gidlist':[[gid, gtoken]]}))
    }
    filecount = parseInt(JSON.parse(filecount.responseText)['gmetadata'][0]['filecount'])
    if(isNaN(filecount)) { console.log('Cannot find file count.'); throw 'exit' }

    if(/\/g\//.test(href))
    {
        var page = imgkey = ''
        page = parseInt(doc.querySelector('#gdt a').href.replace(/^.*-([0-9]+)/, '$1')), page_url = ''
        lnks = doc.getElementsByTagName('A')
        for(var i=lnks.length-1; i>=0; i--)
        {
            if(new RegExp('/s/[^/]+/'+gid+'-'+page+'$').test(lnks[i].href))
            {
                try {
                    page_url = lnks[i].href
                    imgkey = /\/s\/([^\/]+)/.exec(lnks[i].href)[1]
                    if(imgkey.length > 10) { imgkey = imgkey.substring(0, 10) }
                } catch(e) {}
                break
            }
        }
    }
    else if(/\/s\//.test(href)) { page_url = href.replace(/\?.*/, '') }
    if(imgkey == '') { console.log('Cannot find the first imgkey.'); throw 'exit' }

    var showkey = ''
    if(typeof GM_xmlhttpRequest != 'undefined')
    {
        showkey = GM_xmlhttpRequest({
            method: 'GET',
            url: page_url,
            synchronous: true
        })
    }
    else
    {
        showkey = new XMLHttpRequest()
        showkey.open('GET', page_url, false)
        showkey.send(null)
    }
    try{ showkey = /\bshowkey=['"]?([-0-9a-z]+)/.exec(showkey.responseText)[1] } catch(e) { showkey = '' }
    if(showkey == '') { console.log('Cannot find the first showkey.'); throw 'exit' }

    var b = doc.body
    var append_img = function()
    {
        if(typeof GM_xmlhttpRequest != 'undefined')
        {
            GM_xmlhttpRequest({
                method: 'POST',
                url: api_url,
                data: JSON.stringify({'method':'showpage', 'gid':gid, 'page':page, 'imgkey':imgkey, 'showkey':showkey}),
                onload: function(response)
                {
                    var i3 = JSON.parse(response.responseText)['i3']
                    var img_src = /src=['"]([^'"]+)['"]/.exec(i3)[1].replace(/&amp;/g, '&')

                    var img = new Image()
                    img.id = page
                    img.onerror = function() { this.onerror = null; this.style.display = 'none' }
                    img.src = img_src
                    img.style.cssText = 'display: block; margin-left: auto; margin-right: auto'
                    img.width = wnd.innerWidth
                    b.appendChild(doc.createTextNode('p. '+page))
                    b.appendChild(doc.createElement('BR'))
                    b.appendChild(img)
                    b.appendChild(doc.createElement('BR'))

                    if(page >= filecount) { return }
                    var m = /\/s\/([^'"]+?)\/[^'"]+-([0-9]+)['"]/.exec(i3)
                    if(m == null) { console.log('An error happened when parsing p. ' + page); return }
                    imgkey = m[1]
                    page = parseInt(m[2])
                    setTimeout(append_img, 2000)
                }
            })
        }
        else
        {
            var xhr = new XMLHttpRequest()
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4 && xhr.status == 200) {
                    var response = xhr

                    var i3 = JSON.parse(response.responseText)['i3']
                    var img_src = /src=['"]([^'"]+)['"]/.exec(i3)[1].replace(/&amp;/g, '&')

                    var img = new Image()
                    img.id = page
                    img.onerror = function() { this.onerror = null; this.style.display = 'none' }
                    img.src = img_src
                    img.style.cssText = 'display: block; margin-left: auto; margin-right: auto'
                    img.width = wnd.innerWidth
                    b.appendChild(doc.createTextNode('p. '+page))
                    b.appendChild(doc.createElement('BR'))
                    b.appendChild(img)
                    b.appendChild(doc.createElement('BR'))

                    if(page >= filecount) { return }
                    var m = /\/s\/([^'"]+?)\/[^'"]+-([0-9]+)['"]/.exec(i3)
                    if(m == null) { console.log('An error happened when parsing p. ' + page); return }
                    imgkey = m[1]
                    page = parseInt(m[2])
                    setTimeout(append_img, 2000)
                }
            }
            xhr.open('POST', api_url, true)
            xhr.send(JSON.stringify({'method':'showpage', 'gid':gid, 'page':page, 'imgkey':imgkey, 'showkey':showkey}))
        }
    }
    append_img()
}
