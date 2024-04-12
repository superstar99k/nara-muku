// JavaScript Document

$(function(){
    // setViewport
	
	var viewportWinWidth = $(window).width();
	var initialScale =	viewportWinWidth / 1200;
	initialScale =	Math.floor(initialScale * 10) / 10;
	
	tbView = 'width=1200px,maximum-scale=2.0,initial-scale=' + initialScale + ',user-scalable=yes';
	pcView = 'width=1200px,maximum-scale=2.0,initial-scale=1,user-scalable=yes';
 	
	var ua = navigator.userAgent;
	if((ua.indexOf('Android') > 0 && ua.indexOf('Mobile') == -1) || ua.indexOf('iPad') > 0 || ua.indexOf('Kindle') > 0 || ua.indexOf('Silk') > 0){
		$('#viewport').attr('content',tbView);
	} else if ((ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) || ua.indexOf('iPhone') > 0 || ua.indexOf('Blackberry') > 0 || ua.indexOf('iPhone') > 0){
		return false;
	} else {
		$('#viewport').attr('content',pcView);
	}

});