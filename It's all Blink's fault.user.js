// ==UserScript==
// @name           It's all Blink's fault
// @description    Adds "It's all Blink's fault." to every sentence you write in the shoutbox.
// @include        http://harddrop.com/file/shout/shout.php
// ==/UserScript==

var wnd = window
var doc = wnd.document
var loc = location
var href = loc.href

if(doc.getElementById('ShoutCloud-Container')==null) { throw 'exit' }

// enable the input box
addEventListener('load', function() {
    doc.getElementsByName('ShoutCloud-Msg')[0].disabled=false
    doc.getElementsByName('ShoutCloud-Msg')[0].value=''
}, false)

// don't clear unsent text when unfocuing the input box
doc.getElementsByName('ShoutCloud-Msg')[0].onblur = function() { return }

addEventListener('keydown', function(evt) {
    if(evt.keyCode==13)
    {
        evt.preventDefault()
        var my_chat = doc.getElementsByName('ShoutCloud-Msg')[0].value
        if(my_chat.length == 0) { return }
        if(!/[a-zA-Z0-9]$/.test(my_chat[my_chat.length-1])) // end with punctuation
        {
            my_chat = my_chat + " It's all Blink's fault."
        }
        else
        {
            my_chat = my_chat + ". It's all Blink's fault."
        }
        doc.getElementsByName('ShoutCloud-Msg')[0].value = my_chat
        doc.getElementById('ShoutCloud-Shout').click()
    }
}, false)
