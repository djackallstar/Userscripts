// ==UserScript==
// @name           Hung-Ya Forum Tweaks
// @description    Some tweaks on the Hung-Ya forums.
// @include        http://bbs.bbs-tw.com/*
// ==/UserScript==

var wnd = window
var doc = wnd.document
var loc = location
var href = loc.href

if(/^http:\/\/bbs\.bbs-tw\.com\//.test(href))
{
    if(/\/postshow\.pl\?/.test(href))
    {
        // Auto redirection upon failure
        if( (!doc.getElementById("BbsShow")) || (!doc.getElementById("BbsShowMenu")) ) { loc.href += "&_=" + +(new Date); throw 'exit' }

        // Remove scripts
        //var scripts=doc.getElementsByTagName('script')
        //for(var i=scripts.length-1; i>=0; i--) { try { scripts[i].parentNode.removeChild(scripts[i]) } catch(e) {} }

        // Diable the <meta> refresh
        var no_refresh = function() { wnd.stop(); if( (!doc.getElementById("BbsShow")) || (!doc.getElementById("BbsShowMenu")) ) { loc.reload() } }
        if(doc.readyState == 'interactive') { no_refresh() }
        else { addEventListener("DOMContentLoaded", no_refresh, false) }

        // Clear all timeouts/intervals
        setTimeout(function() {
            var id = setTimeout(function() {}, 0)
            while(id--) { clearTimeout(id) }
            var id = setInterval(function() {}, 0)
            while(id--) { clearInterval(id) }
        }, 100)

        // Reload broken images
        var rbi = function() {
            var is_img_ok = function(img)
            {
                if(img.readyState!='complete') { return false }
                if(('naturalHeight' in img)&&(img.naturalHeight+img.naturalWidth==0)) { return false }
                if(img.width+img.height==0) { return false }
                return true
            }
            var reloadImages=function(w) {
                try {
                    for(var i=0; img=w.document.images[i]; i++) { if(!is_img_ok(img)) { img.src=img.src } } // doc.images[j]... does not work, cuz doc isn't a member of a window object
                    for(var j=0,F=null;F=w.frames[j];j++) { reloadImages(F) }
                } catch(e) {}
            }
            reloadImages(wnd)
        }
        if(doc.readyState == 'interactive') { rbi() } else { addEventListener("DOMContentLoaded", rbi, false) }

        // Remove iframes
        var no_frm = function() { for(var frms = doc.getElementsByTagName('IFRAME'), i=frms.length-1; i>=0; i--) { frms[i].parentNode.removeChild(frms[i]) } }
        if(doc.readyState == 'interactive') { no_frm() } else { addEventListener('load', no_frm, false) }
    }
    else if(/\/postlist\.pl\?/.test(href)) {
        for(var lnks=doc.getElementsByTagName('A'), i=lnks.length-1; i>=0; i--) { lnks[i].target = '_blank' }
    }
}
