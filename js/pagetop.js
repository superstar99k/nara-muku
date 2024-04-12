	
/*===========================================================
	onload function
===========================================================*/

$(function(){
	
	var $body     = $('body');
	var $window   = $(window);
	var $document = $(document);
	var $docbody  = $($('html').hasClass('opera') ? document.compatMode == 'BackCompat' ? 'body' : 'html' : 'html,body');
	var windowWidth = $(window).width();
	var windowSm = 640;
	
	var	nowY = $(this).scrollTop();
	var	nowX = $(this).scrollLeft();
	
	
	/*===========================================================
	 scrollTop Module
	===========================================================*/
					
	function hashMove(hash,easing,speed,revision) {
			
		wheelEnabled(false);
		
		var targetY, scrollY;
		
		if (hash == '.footer') {
			targetY = $document.height();
		} else {
			targetY = $(hash).offset().top;
		}
		
		targetY += revision;
		
		scrollY = $document.height() - targetY;
		
		var viewerHeight = window.innerHeight ? window.innerHeight : $window.height();
		
		if (viewerHeight > scrollY) {
			targetY = $document.height() - viewerHeight;
		}
		
		// scroll Y
		$docbody.
			stop().
				animate({
					'scroll-top' : targetY
				},{
					easing   : easing,
					duration : speed,
					complete : function () {
						wheelEnabled(true);
					}
				});
	};
	
	

	function hashScroll($target,easing,speed,revision) {
	
		
		$target.click(function(){
		
			hashMove(this.hash,easing,speed,revision);
			
			return false;
		});
		
	};
	
	/*===========================================================
	 floatTop Module
	===========================================================*/
	
	function float($target, t, pos) {
			
		var h = 0;
		
		if ($target.css('position') != 'fixed' && $target.css('position') != 'absolute') {
			h = parseInt($target.height()) + parseInt($target.css('margin-bottom')) + parseInt($target.prev().css('margin-bottom'));
		}
		
		$window.scroll(function () {
		
			if (nowY > t) {
				
				$target.css({
					'position' : 'fixed',
					'top'      : pos,
					'margin'   : 0
				});
				
				$target.prev().css({
					'margin-bottom' : h
				});
						
			} else {
				
				$target.css({
					'position' : '',
					'top'      : '',
					'margin'   : ''
				});
				
				$target.prev().css({
					'margin-bottom' : ''
				});
				
			}
		});
	};
	
	
	function floatPagetop($target) {
		
		var h, t;
		var footerHeightNum = $('.footer').outerHeight() - 50;
		var footerHeightNumPc = $('.footer').outerHeight() - 300;
		
		
		function floatPagetopEvent() {
			
		h = 0;
		
		if (windowWidth <= windowSm) {
			t = $document.height() - $window.height() - footerHeightNum;
        } else {
        	t = $document.height() - $window.height() - footerHeightNumPc;
		}
		
		
		
		if (nowY > t) {
			if (windowWidth <= windowSm) {
				$target.css({
					'position' : 'fixed',
					'bottom'   : nowY + $window.height() - $document.height() + footerHeightNum
				});
			} else {
				$target.css({
					'position' : 'fixed',
					'bottom'   : nowY + $window.height() - $document.height() + footerHeightNumPc
				});
			}
			
					
		} else {
			
			$target.css({
				'position' : '',
				'bottom'  	: ''
			});
			
		}
		
		};
		
		$window.resize(floatPagetopEvent);
		
		$window.scroll(floatPagetopEvent);
	};
	
	
	/*===========================================================
	pagetop Event
	===========================================================*/
	
	if (windowWidth <= windowSm) {
		var
		$pt = $('.gotop-btn'),
		pos = 100;
	} else {
		var
		$pt = $('.gotop-btn'),
		pos = 100;
	}
	
	var pageTimer;
	
	
	function pagetop() {
		
		clearTimeout(pageTimer);
		
		pageTimer = setTimeout(function(){
			
			if (nowY > pos) {
				
				$pt.removeClass('out').addClass('in');
						
			} else {
				
				$pt.removeClass('in').addClass('out');
				
			}
		}, 100);
	};
	
	
	$window.on('load resize scroll', pagetop);
	
	
	
	/*===========================================================
		Scroll Event
	===========================================================*/
	
	$window.scroll(function () {
		
		nowY = $(this).scrollTop();
		nowX = $(this).scrollLeft();
		
	});
	
	

	if ($('.gotop-btn')[0]) {
		floatPagetop($('.gotop-btn'));
	}
	
	if ($('.gotop-btn')[0]) {
		floatPagetop($('.gotop-btn'));
	}
	

});
