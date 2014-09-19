// ==UserScript==
// @name            Equipment Highlight for E-Hentai Forums
// @description     Highlights Equipment Names with Colors in the WTS/WTB Forums
// @include         http://forums.e-hentai.org/index.php?*showtopic=*
// ==/UserScript==

var wnd = window
var doc = wnd.document
var loc = location
var href = loc.href

/*** Settings ***/

p = // Add [[pattern_1, pattern_2, ... , pattern_n], color] to the array by yourself.
[
    [
        [   // Rapier
            /(Peerless|Leg|Mag)(\S+)?(Ethereal|Hallowed|Demonic|Tempestuous) +Rapier.+(Slaughter)/i, // Mag+ good-prefixed rapier of slaughter
            // Force Shield
            /(Peerless|Leg)(\S+)?( +\S+)? +Force +Shield/i, // Leg+ force shield
            /(Mag)(\S+)? +Force +Shield/i, // Mag non-prefixed force shield
            // Power of Slaughter
            /(Peerless|Leg)(\S+)?( +\S+)? +Power.+(Slaughter)/i, // Leg+ power of slaughter
            /(Mag)(\S+)? +Power.+(Slaughter)/i, // Mag non-prefixed power of slaughter
        ], 'darkred'
    ],
    [
        [   // Power of Slaughter
            /(Exq)(\S+)? +Power.+(Slaughter)/i, // Exq non-prefixed power of slaughter
            // Power of Protection
            /(Peerless|Leg)(\S+)?( +\S+)? +Power.+(Protection)/i, // Leg+ power of protection
        ], 'darkgreen'
    ],
    [
        [   // Rapier
            /(Peerless|Leg|Mag)(\S+)?( +\S+) +Rapier.+(Slaughter)/i, // Mag+ bad-prefixed rapier of slaughter
            // Force Shield
            /(Mag)(\S+)?( +\S+) +Force +Shield/i, // Mag prefixed force shield
            // Power of Slaughter
            /(Exq)(\S+)?( +\S+) +Power.+(Slaughter)/i, // Exq prefixed power of slaughter
        ], 'darkblue'
    ],
    [
        [   // Toys
            /(Peerless|Leg)(\S+)?( +\S+) +(Rapier|Wakizashi|Dagger|Shortsword).+(Slaughter|Nimble|Balance|Swiftness)/i, // Leg+ prefixed rapier/wakizashi/dagger/shortsword of slaughter/nimble/balance/swiftness
            /(Mag)(\S+)? +Power.+(Protection)/i, // Mag non-prefixed power of protection
            /(Mag)(\S+)? +Power +Leggings +.+(Warding)/i, // Magnificent Power Leggings of Warding
        ], 'purple'
    ],

    [
        [   // It's your turn to add patterns and color!
        ], '#00FFFF' // You can find other color codes using this website: http://www.colourlovers.com/palettes/search
    ],
]

/*** End of Settings ***/

var posts = doc.getElementsByClassName('postcolor')
for(var i=posts.length-1; i>=0; i--) {
    var lnks = posts[i].getElementsByTagName('A')
    for(var j=lnks.length-1; j>=0; j--) {
        for (var k=0, len=p.length; k<len; k++) {
            var highlighted = false
            for(var m=p[k][0].length-1; m>=0; m--) {
                if(p[k][0][m].test(lnks[j].text)) {
                    highlighted = true
                    lnks[j].text = '[Highlight] ' + lnks[j].text
                    lnks[j].style.color = 'white'
                    lnks[j].style.backgroundColor = p[k][1]
                    break
                }
            } if(highlighted) { break }
        }
    }
}
