// ==UserScript==
// @name           Dmzj Anime Downloader (Old Version (Dmzj_1))
// @description    A Firefox bookmarklet to parse download links from donghua.dmzj.com.
// @include        http://donghua.dmzj.com/donghua_play/*
// ==/UserScript==

javascript:
(function() {
  var comment='http://donghua.dmzj.com/js/donghua_play.js';
  var getv_56=function() {
    var m,lnk,vlnks=[],p;
    p=/https?:\/\/player\.56\.com\/[^']+\.swf/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk=m[0].replace(/&amp;/g,'&');
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    p=/PlayerBox\.play\('56','([^']*?)'/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk='http://player.56.com/v_'+m[1]+'.swf';
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    return vlnks;
  }
  ;
  var getv_b9dm=function() {
    var m,lnk,vlnks=[],p;
    p=/PlayerBox\.play\('other','http:\/\/swf\.b9dm\.com\/[^']*?file=([^']+)'/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk=m[1].replace(/&amp;/g,'&');
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    return vlnks;
  }
  ;
  var getv_cntv=function() {
    var m,lnk,vlnks=[],p;
    p=/PlayerBox\.play\('cntv','([^']*?)'/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk='http://player.cntv.cn/standard/cntvOutSidePlayer.swf?videoId=VIDE100165778382&videoCenterId='+m[1];
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    return vlnks;
  }
  ;
  var getv_ku6=function() {
    var m,lnk,vlnks=[],p;
    p=/PlayerBox\.play\('ku6','([^']*?)'/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk='http://player.ku6.com/refer/'+m[1]+'/v.swf';
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    return vlnks;
  }
  ;
  var getv_letv=function() {
    var m,lnk,vlnks=[],p;
    p=/PlayerBox\.play\('letv[^']*','(\d+)'/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk='http://www.letv.com/ptv/vplay/'+m[1]+'.html';
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    p=/PlayerBox\.play\('letv[^']*','([a-zA-Z0-9]+)'/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk='http://yuntv.letv.com/bcloud.swf?uu=d955239f11&vu='+m[1]+'&auto_play=1&gpcflag=1&allowFullScreen=true&quality=high&allowScriptAccess=always&type=application/x-shockwave-flash';
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    p=/letv\.com\/player\/swfPlayer\.swf\?.*?id=(\d+)/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk='http://www.letv.com/ptv/vplay/'+m[1]+'.html';
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    p=/player\.letvcdn\.com\/.*?\?.*?id=(\d+)/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk='http://www.letv.com/ptv/vplay/'+m[1]+'.html';
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    return vlnks;
  }
  ;
  var getv_other=function() {
    var m,lnk,vlnks=[],p;
    p=/PlayerBox\.play\('other','[^']+?file=([^'&]+)/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk=m[1].replace(/&amp;/g,'&');
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    p=/PlayerBox\.play\('other','([^']+)/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk=m[1].replace(/&amp;/g,'&');
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    return vlnks;
  }
  ;
  var getv_pptv=function() {
    var m,lnk,vlnks=[],p;
    p=/PlayerBox\.play\('pptv','([^']*?)'/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk='http://v.pptv.com/show/'+m[1]+'.html';
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    return vlnks;
  }
  ;
  var getv_qingkong=function() {
    var m,lnk,vlnks=[],p;
    p=/PlayerBox\.play\('other','http:\/\/[^']+?\/flvplayer\.swf\?.*?file=([^&']*)/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk=m[1].replace(/&amp;/g,'&');
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    p=/PlayerBox\.play\('qingkong','http:\/\/[^']+?\/flvplayer\.swf\?.*?file=([^&']*)/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk=m[1].replace(/&amp;/g,'&');
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    p=/PlayerBox\.play\('qingkong','([^':]+)'/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk='http://v.qingkong.net/bp/a.php/'+(/.*\.mp4$/.test(m[1])?m[1]:m[1]+'.mp4').replace(/&amp;/g,'&');
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    return vlnks;
  }
  ;
  var getv_qiyi=function() {
    var m,lnk,vlnks=[],p;
    p=/PlayerBox\.play\('qiyi','([^']*?)'/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk='http://www.iqiyi.com/player/20130129155059/SharePlayer.swf?vid='+m[1];
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    return vlnks;
    var comment='http://dispatcher.video.qiyi.com/disp/shareplayer.swf?vid='+m[1];
    var comment=/https?:\/\/player\.video\.qiyi\.com\/([^\/]*)/g;
  }
  ;
  var getv_qq=function() {
    var m,lnk,vlnks=[],p;
    p=/PlayerBox\.play\('qq2?','([^']*?)'/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk='http://cache.tv.qq.com/qqplayerout.swf?vid='+m[1];
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    return vlnks;
    var comment='http://static.video.qq.com/v1/res/qqplayerout.swf?vid='+m[1]+'.flv';
    var comment='http://videotfs.tc.qq.com/'+m[1]+'.flv';
    var comment='http://web.qqvideo.tc.qq.com/'+m[1]+'.flv';
  }
  ;
  var getv_sina=function() {
    var m,lnk,vlnks=[],p;
    p=/PlayerBox\.play\('sina','([^']*?)'/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk='http://p.you.video.sina.com.cn/player/outer_player.swf?vid='+m[1];
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    return vlnks;
    var comment='http://vhead.blog.sina.com.cn/player/outer_player.swf?vid=';
    var comment='http://you.video.sina.com.cn/api/sinawebApi/outplayrefer.php/vid=';
  }
  ;
  var getv_sohu=function() {
    var m,lnk,vlnks=[],p;
    p=/PlayerBox\.play\('sohu','([^']*?)'/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk='http://share.vrs.sohu.com/my/v.swf&id='+m[1];
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    return vlnks;
  }
  ;
  var getv_tudou=function() {
    var m,lnk,vlnks=[],p;
    p=/PlayerBox\.play\('tudou.?',' *?([^']*?) *?'/g;
    while((m=p.exec(document.documentElement.innerHTML))!=null) {
      if(!/^\d+$/.test(m[1])) {
        lnk='http://www.tudou.com/programs/view/'+m[1];
      }
      else{
        lnk='http://js.tudouui.com/bin/lingtong/PortalPlayer_53.swf?iid='+m[1];
      }
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    p=/PlayerBox\.play\('[^']*','([^']*\biid=(\d{9})[^']*)'/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk=m[1].replace(/&amp;/g,'&');
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    return vlnks;
    var comment='http://www.tudou.com/player/outside/beta_player.swf?iid=';
    var comment='http://www.tudou.com/player/skin/plu.swf?iid=';
    var comment='http://v2.tudou.com/v2/cdn?id=';
  }
  ;
  var getv_weiyun=function() {
    var m,lnk,vlnks=[],p;
    p=/PlayerBox\.play\('weiyun','([^']*?)'/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk='http://donghuaget.duapp.com/weiyun/'+m[1]+'.mp4';
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    return vlnks;
  }
  ;
  var getv_youku=function() {
    var m,lnk,vlnks=[],p;
    p=/PlayerBox\.play\('youku','([^']*?)'/g;
    while(m=p.exec(document.documentElement.innerHTML)) {
      lnk='http://v.youku.com/v_show/id_'+m[1];
      vlnks.indexOf(lnk)==-1?vlnks.push(lnk):null;
    }
    return vlnks;
  }
  ;
  var getv_all=function() {
    var vlnks=[],vlnks_all=[];
    for(var i=0;i<getv_funcs.length;i++) {
      vlnks=getv_funcs[i]();
      for(var j=0;j<vlnks.length;j++) {
        lnk=vlnks[j];
        vlnks_all.indexOf(lnk)==-1?vlnks_all.push(lnk):null;
      }
    }
    return vlnks_all;
  }
  ;
  var getv_funcs=[getv_letv,getv_tudou,getv_weiyun,getv_b9dm,getv_qingkong,getv_qq,getv_youku,getv_sina,getv_sohu,getv_cntv,getv_56,getv_pptv,getv_ku6,getv_qiyi,getv_other];
  var flvcd=function(lnk) {
    return 'http://www.flvcd.com/parse.php?kw='+encodeURIComponent(lnk);
  }
  ;
  var flvxz=function(lnk) {
    return 'http://www.flvxz.com/?url='+encodeURIComponent(lnk);
  }
  ;
  var open_one_dllink=function(vlnks) {
    for(var i=0;i<vlnks.length;i++) {
      if(typeof vlnks[i]!='undefined') {
        if(/^https?:\/\/.+\.qingkong\.net\//.test(vlnks[i])) {
          window.prompt('Copy to clipboard: Ctrl+C, Enter',vlnks[i]);
          break;
        }
        if(/\/b9dm\.mp4\b/.test(vlnks[i])) {
          window.open(vlnks[i],'_blank');
          break;
        }
        if(/\.(mp4|flv)\b/.test(vlnks[i])) {
          window.open(vlnks[i],'_blank');
          break;
        }
        if(/\.(sina|56|(i?qiyi)|pptv|sohu|(tudou(ui)?))\.com[\/\.]/.test(vlnks[i])) {
          window.open(flvxz(vlnks[i]),'_blank');
          break;
        }
        window.open(flvcd(vlnks[i]),'_blank');
        break;
      }
    }
  }
  ;
  var q='';
  if(q=='') {
    var vlnks=[];
    for(var i=0;i<getv_funcs.length;i++) {
      vlnks=getv_funcs[i]();
      if(vlnks.length!=0) {
        open_one_dllink(vlnks);
        break;
      }
    }
  }
  else{
    var vlnks=eval('getv_'+q+'()');
    if(vlnks.length>=2||q=='all') {
      var msg='Choose a link:';
      for(var i=0;i<vlnks.length;i++) {
        msg+='\n'+'('+(i+1)+') '+vlnks[i];
      }
      open_one_dllink([vlnks[prompt(msg)-1]]);
    }
    else{
      open_one_dllink(vlnks);
    }
  }
}
)();
