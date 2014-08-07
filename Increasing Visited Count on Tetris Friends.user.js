// ==UserScript==
// @name           Increasing Visited Count on Tetris Friends
// @description    Refreshes your profile page to increase the visited count.
// @include        http://www.tetrisfriends.com/users/profile.php*
// ==/UserScript==

if(document.getElementById('container')==null) { setTimeout('location.reload()', 10000) } else { location.reload() }
