// ==UserScript==
// @name            Shoutbox Everywhere
// @description     Press L to toggle the shoutbox anywhere in the Hard Drop Forum
// @include         http://harddrop.com/*
// ==/UserScript==

/*** Settings ***/

var display_sb_on_page_load = false // whether to display the shoutbox upon opening a page
var shoutbox_width = 400 // width in pixel
var shoutbox_height = window.innerHeight // height in pixel

/*** End of Settings ***/

var wnd = window
var doc = wnd.document
var loc = location
var href = loc.href

if(/\/shout.php\b/.test(href) || /harddrop\.com\/?$/.test(href)) { throw 'exit' }

var sb_frm = doc.createElement('IFRAME')
sb_frm.id = 'sb_frm'
sb_frm.src = 'http://harddrop.com/file/shout/shout.php'
sb_frm.width = shoutbox_width
sb_frm.height = shoutbox_height
sb_frm.frameBorder = 0

var sb_div = doc.createElement('DIV')
sb_div.id = 'sb_div'
sb_div.style.cssText = 'top:15px; right:0px; position:fixed; background-color:white; z-index:100'
sb_div.appendChild(sb_frm)
doc.body.appendChild(sb_div)

if(display_sb_on_page_load) { sb_div.style.visibility = 'visible' }
else { sb_div.style.visibility = 'hidden' }

var toggle_sb = function() {
    var sb_div = doc.getElementById('sb_div')
    if(sb_div.style.visibility != 'hidden') { sb_div.style.visibility = 'hidden'; return }
    sb_div.style.visibility = 'visible'
}
addEventListener('keydown', function(evt) { if((evt.target.tagName!='INPUT') && (evt.target.tagName!='TEXTAREA') && (evt.keyCode == 76)) { toggle_sb() } }, false)
