// ==UserScript==
// @name           Dmzj Anime Downloader
// @description    Get anime download links from donghua.dmzj.com.
// @include        http://donghua.dmzj.com/*
// @grant          GM_log
// ==/UserScript==

var wnd = window
var doc = wnd.document
var loc = location
var href = loc.href

//var $  = function(e, css) { if(!css) { css=e; e=doc }; return e.querySelector(css) }
//var $$ = function(e, css) { if(!css) { css=e; e=doc }; return e.querySelectorAll(css) }

if(/^http:\/\/donghua\.dmzj\.com\//.test(href)) {
    var noimg = function() {
        var imgs = doc.querySelectorAll('IMG')
        for(var i=imgs.length-1; i>=0; i--) {
            imgs[i].onclick = function(evt) {
                evt.preventDefault()
                this.style.visibility = 'hidden'
            }
        }
        done = true
    }
    setTimeout(noimg, 500)
    if(/\/acg_donghua\//.test(href)) { setTimeout(noimg, 500) }
    else { if(doc.readyState == 'interactive') { noimg() } else { addEventListener('DOMContentLoaded', noimg, false) } }

    if(/\/donghua_play\//.test(href)) {
        var parse_dmzj = function() {
            var cites = doc.querySelectorAll('.cite-tools>ul>li>a')
            for(var i=cites.length-1; i>=0; i--) {
                (function(i) {
                    var f = '(' + cites[i].onclick.toString() + ')()'
                    var handler = function(evt) {
                        if(evt.type == 'click') {
                            if(evt.ctrlKey) { evt.preventDefault() }
                            else if(evt.shiftKey) { evt.preventDefault() }
                            else if(evt.altKey) { evt.preventDefault() }
                            else if(evt.metaKey) { evt.preventDefault() }
                            else { return }
                        }

                        //var m = /PlayerBox\.play\(['"]([^'"]*)['"],['"]([^'"]*)['"]/.exec(f)
                        var m = /PlayerBox\.play\(['"]([^'"]*)['"],['"]([^'"]*)['"],['"]([^'"]*)['"]/.exec(f)
                        if(m == null) {
                            console.log('Error: Cannot find PlayerBox.play(...).')
                            return
                        }
                        var site_name = m[1]
                        var vid = m[2]
                        var uu = m[3]

                        // http://donghua.dmzj.com/js/donghua_play.js
                        var vid_url = '', parse_service = ''
                        if(site_name == 'letv') {
                            vid_url = 'http://www.letv.com/ptv/vplay/' + vid + '.html'
                            parse_service = 'flvxz'
                        }
                        else if(site_name == 'letvyun') {
                            //vid_url = 'http://yuntv.letv.com/bcloud.swf?uu=d955239f11&vu=' + vid + '&auto_play=1&gpcflag=1&allowFullScreen=true&quality=high&allowScriptAccess=always&type=application/x-shockwave-flash'
                            vid_url = 'http://yuntv.letv.com/bcloud.swf?uu=' + uu + '&vu=' + vid + '&auto_play=1&gpcflag=1&allowFullScreen=true&quality=high&allowScriptAccess=always&type=application/x-shockwave-flash';
                            parse_service = 'flvxz'
                        }
                        else if(site_name == 'tudou' || site_name == 'tudou2') {
                            if(/^\d+$/.test(vid)) {
                                //vid_url = 'http://js.tudouui.com/bin/lingtong/PortalPlayer_53.swf?iid=' + vid
                                vid_url = 'http://tudou.com/v/' + vid
                            }
                            else {
                                vid_url = 'http://www.tudou.com/programs/view/' + vid
                            }
                            parse_service = 'flvxz'

                            // For future use:
                            // http://www.gy456.com/js/player/gy007/ckplayer.swf?f=http://www.gy456.com/js/player/api/api.php?url=132338889_tudou
                            // http://www.gy456.com/js/player/api/api.php?url=132338889_tudou
                        }
                        else if(site_name == 'weiyun') {
                            if(!/\.mp4$/.test(vid)) { vid = vid + '.mp4' }
                            vid_url = 'http://donghuaget.duapp.com/weiyun/' + vid
                            parse_service = 'none'
                        }
                        else if(site_name == 'qingkong') {
                            if(!/\.mp4$/.test(vid)) { vid = vid + '.mp4' }
                            vid_url = 'http://v.qingkong.net/bp/a.php/' + vid
                            parse_service = 'none'
                        }
                        else if(site_name == 'qq' || site_name == 'qq2') {
                            vid_url = 'http://cache.tv.qq.com/qqplayerout.swf?vid=' + vid
                            parse_service = 'flvxz'
                        }
                        else if(site_name == 'youku') {
                            vid_url = 'http://v.youku.com/v_show/id_' + vid
                            parse_service = 'flvxz'
                        }
                        else if(site_name == 'sina') {
                            vid_url = 'http://p.you.video.sina.com.cn/player/outer_player.swf?vid=' + vid
                            parse_service = 'flvxz'
                        }
                        else if(site_name == 'sohu') {
                            //vid_url = 'http://share.vrs.sohu.com/my/v.swf&id=' + vid
                            vid_url = 'http://share.vrs.sohu.com/' + vid + '/v.swf'
                            parse_service = 'flvxz'
                        }
                        else if(site_name == 'cntv') {
                            vid_url = 'http://player.cntv.cn/standard/cntvOutSidePlayer.swf?videoId=VIDE100165778382&videoCenterId=' + vid
                            parse_service = 'flvxz'
                        }
                        else if(site_name == '56') {
                            vid_url = 'http://player.56.com/v_' + vid + '.swf'
                            parse_service = 'flvxz'
                        }
                        else if(site_name == 'pptv') {
                            vid_url = 'http://v.pptv.com/show/' + vid + '.html'
                            parse_service = 'flvxz'
                        }
                        else if(site_name == 'ku6') {
                            vid_url = 'http://player.ku6.com/refer/' + vid + '/v.swf'
                            parse_service = 'flvxz'
                        }
                        else if(site_name == 'qiyi') {
                            vid_url = 'http://www.iqiyi.com/player/20130129155059/SharePlayer.swf?vid=' + vid
                            parse_service = 'flvxz'
                        }
                        else if(site_name == 'other') {
                            var p, m2
                            // letv
                            p = m2 = ''
                            if(vid_url == '') {
                                p = /letv\.com\/player\/swfPlayer\.swf\?.*?id=(\d+)/g
                                m2 = p.exec(vid)
                                if(m2 != null) {
                                    vid_url = 'http://www.letv.com/ptv/vplay/' + m2[1] + '.html'
                                    parse_service = 'flvxz'
                                }
                            }
                            if(vid_url == '') {
                                p = /player\.letvcdn\.com\/.*?\?.*?id=(\d+)/g
                                m2 = p.exec(vid)
                                if(m2 != null) {
                                    vid_url = 'http://www.letv.com/ptv/vplay/' + m2[1] + '.html'
                                    parse_service = 'flvxz'
                                }
                            }
                            // tudou
                            p = m2 = ''
                            if(vid_url == '') {
                                if(/\biid=(\d{9})/.test(vid)) {
                                    vid_url = vid
                                    parse_service = 'flvxz'
                                }
                            }
                            // 56
                            p = m2 = ''
                            if(vid_url == '') {
                                if(/\bplayer\.56\.com\b/.test(vid)) {
                                    vid_url = vid
                                    parse_service = 'flvxz'
                                }
                            }
                            // b9dm
                            p = m2 = ''
                            if(vid_url == '') {
                                p = /http:\/\/swf\.b9dm\.com\/[^'"]*?file=([^'"]+)/g
                                m2 = p.exec(vid)
                                if(m2 != null) {
                                    vid_url = m2[1]
                                    parse_service = 'none'
                                }
                            }
                            // file=...
                            p = m2 = ''
                            if(vid_url == '') {
                                p = /[^'"]+?file=([^'"&]+)/g
                                m2 = p.exec(vid)
                                if(m2 != null) {
                                    vid_url = m2[1]
                                    parse_service = 'none'
                                }
                            }
                            // whatever else
                            p = m2 = ''
                            if(vid_url == '') {
                                vid_url = vid
                                parse_service = 'flvxz'
                            }
                        }

                        if(vid_url == '') {
                            console.log('Error: Cannot find the video url.')
                            return
                        }

                        if(evt.ctrlKey) { parse_service = 'flvcd' }
                        else if(evt.shiftKey) { parse_service = 'flvxz' }
                        else if(evt.altKey) { }
                        else if(evt.metaKey) { parse_service = 'none' }

                        var parse_url = ''
                        if(parse_service == 'flvxz') {
                            parse_url = 'http://www.flvxz.com/?url=' + encodeURIComponent(vid_url)
                        }
                        else if(parse_service == 'flvcd') {
                            parse_url = 'http://www1.flvcd.com/parse.php?kw=' + encodeURIComponent(vid_url)
                        }
                        else if(parse_service == 'none') {
                            parse_url = vid_url
                        }
                        if(evt.type == 'click') { wnd.open(parse_url, '_blank') }
                        else if(evt.type == 'mouseover') {
                            console.log(vid_url)
                            //if(typeof GM_log != 'undefined') { GM_log(vid_url) }
                            if(evt.shiftKey) { alert(vid_url) }
                        }
                    }
                    cites[i].addEventListener('click', handler, false)
                    cites[i].addEventListener('mouseover', handler, false)
                } )(i)
            }
        }
        if((doc.readyState == 'interactive') || (doc.readyState == 'complete')) { parse_dmzj() } else { addEventListener('DOMContentLoaded', parse_dmzj, false) }
    }
}
