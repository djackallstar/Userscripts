// ==UserScript==
// @name           Merriam-Webster Online Tweaks
// @description    Some tweaks on Merriam-Webster.com.
// @include        http://www.merriam-webster.com/*
// ==/UserScript==

var wnd = window
var doc = wnd.document
var loc = location
var href = loc.href

if(/^http:\/\/www\.merriam-webster\.com\//.test(href))
{
    // allow to play audio files using HTML5 audio tags
    if(/\/audio\.php\b/.test(href))
    {
        doc.getElementsByClassName('listen-again')[0].innerHTML = '<audio controls><source src="' + /"([^"]*\.wav)"/.exec(doc.body.innerHTML)[1] + '" type="audio/wave"></audio>'
        throw 'exit'
    }

    if(/[^\/]$/.test(href)) // when looking up a word
    {
        // remove the annoying "Ask the Editor" videos
        doc.getElementById('adaptvDiv').style.display = 'none'

        // embed sound content using the HTML5 audio element
        var au = doc.getElementsByClassName('au')
        for(var i=au.length-1; i>=0; i--)
        {
            var audioElement = doc.createElement('AUDIO')
            var id = /return au\('([^']*)/.exec(au[i].onclick.toString())[1]
            audioElement.controls = 'controls'
            audioElement.src = 'http://media.merriam-webster.com/soundc11/' + id[0] + '/' + id +'.wav'
            au[i].parentNode.appendChild(doc.createElement('br'))
            au[i].parentNode.appendChild(doc.createElement('br'))
            au[i].parentNode.appendChild(audioElement)
            au[i].parentNode.appendChild(doc.createElement('br'))
        }

        // add Kenyon and Knott phonetic alphabet
        var pr = doc.getElementsByClassName('pr')
        for(var i=pr.length-1; i>=0; i--)
        {
            var mw = pr[i].innerHTML
            var kk = mw

            // remove redundancies
            kk = kk.replace(/<em>[^>]*<\/em>/g,'')
            kk = kk.replace(/<.?span[^>]*>/g,'')
            kk = kk.replace(/\(/g,'')
            kk = kk.replace(/\)/g,'')

            // vowels (大=ə, 日山=aʊ, 水=e, 戈=i, 日人=aɪ, 十=j)
            kk = kk.replace(/[ˈˌ]ə/g,'ʌ')
            kk = kk.replace(/ər/g,'ɝ')
            kk = kk.replace(/<sup>ə<\/sup>/g,'大')

            kk = kk.replace(/au̇/g,'日山')
            kk = kk.replace(/a/g,'æ')
            kk = kk.replace(/ā/g,'水')
            kk = kk.replace(/ä/g,'ɑ')

            kk = kk.replace(/e/g,'ɛ')
            kk = kk.replace(/[ˈˌ]ē/g,'戈')
            kk = kk.replace(/ē/g,'ɪ')

            kk = kk.replace(/i/g,'ɪ')
            kk = kk.replace(/ī/g,'日人')

            kk = kk.replace(/ȯi/g,'ɔɪ')
            kk = kk.replace(/ō/g,'o')
            kk = kk.replace(/ȯ/g,'ɔ')

            kk = kk.replace(/ü/g,'u')
            kk = kk.replace(/u̇/g,'ʊ')

            // consonants
            kk = kk.replace(/ch/g,'tʃ')
            kk = kk.replace(/j/g,'dʒ')
            kk = kk.replace(/ḵ/g,'x')
            kk = kk.replace(/sh/g,'ʃ')
            kk = kk.replace(/<u>th<\/u>/ig,'ð')
            kk = kk.replace(/th/g,'θ')
            kk = kk.replace(/y/g,'十')
            kk = kk.replace(/zh/g,'ʒ')

            // replace phonemic transcription (\\) with phonetic transcription ([])
            kk = kk.replace(/^\\/g,'[')
            kk = kk.replace(/\\$/g,']')

            // stress
            kk = kk.replace(/ˈ/g,'ˋ')
            kk = kk.replace(/ˌ/g,'ˊ')

            // remove redundancies
            kk = kk.replace(/<[^>]*>/g,'')
            kk = kk.replace(/-/g,'')

            // restore some letters
            kk = kk.replace(/大/g,'ə')
            kk = kk.replace(/日山/g,'aʊ')
            kk = kk.replace(/水/g,'e')
            kk = kk.replace(/戈/g,'i')
            kk = kk.replace(/日人/g,'aɪ')
            kk = kk.replace(/十/g,'j')

            pr[i].innerHTML = 'KK ' + kk + ', MW ' + mw
        }
    }
}
