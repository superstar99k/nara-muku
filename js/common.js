// JavaScript Document

$(function(){
	
	//$('a[href^=#]').click(function(){
	$('a[href^=#]' + 'a:not([data-toggle="tab"]),area').click(function(){
		var speed = 500;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$("html, body").animate({scrollTop:position}, speed, "swing");
		return false;
	});
	
	$('.sp-menu').click(function(){
		$(this).not(':animated').toggleClass('open');
		if($(this).hasClass('open')){
			$('.header').addClass('open');
			$('.header-sitemap').addClass('open');
			$('.shadow').not(':animated').fadeIn(500);
		} else {
			$('.header').removeClass('open');
			$('.header-sitemap').removeClass('open');
			$('.shadow').not(':animated').fadeOut(500);
		}
	});
	
	var state = false;
	var scrollpos;
	
	$('.sp-menu').on('click', function(){
		if(state == false) {
			scrollpos = $(window).scrollTop();
			$('body').addClass('back-fixed').css({'top': -scrollpos});
		state = true;
		} else {
			$('body').removeClass('back-fixed').css({'top': 0});
			window.scrollTo( 0 , scrollpos );
			state = false;
		}
	});
	
	
	var ua = navigator.userAgent;
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0) {
        // スマートフォン用コード
		$('.gNav .havChild>a').click(function(){
			$(this).parent('li').not(':animated').toggleClass('open');
			if($(this).parent('li').hasClass('open')){
				$(this).next('div').not(':animated').slideDown();	
			} else {
				$(this).next('div').not(':animated').slideUp();	
			}
			return false;
		});
	
		$('.gNav-subNav-sub').click(function(){
			$(this).not(':animated').toggleClass('open');
			if($(this).hasClass('open')){
				$(this).next('div').not(':animated').slideDown();	
			} else {
				$(this).next('div').not(':animated').slideUp();	
			}
			return false;
		});
		
    } else if (ua.indexOf('iPad') > 0 || ua.indexOf('Android') > 0) {
        // タブレット用コード
		$('body').addClass('tabletView');
		
		$('.gNav>ul>li.havChild>a').click(function(){
			$(this).parent('li').siblings().children('div').not(':animated').hide();
			$(this).parent('li').siblings().not(':animated').removeClass('open');
			
			if(!$(this).parent('li').hasClass('open')){
				$(this).parent('li').not(':animated').addClass('open');
				$(this).parent('li').children('div').not(':animated').slideDown();
			} else {
				$(this).parent('li').not(':animated').removeClass('open');
				$(this).parent('li').children('div').not(':animated').slideUp();
			}
			return false;			
		});
		
		$('.childClose li').click(function(){
			$(this).parents('li.havChild').not(':animated').removeClass('open');
			$(this).parents('li.havChild').children('div').not(':animated').slideUp();		
		});	
		
		
		
    } else {
        // PC用コード
		
		$('body').addClass('pcView');
		
		$('.gNav>ul>li').hover(function(){
			$(this).siblings().not(':animated').removeClass('open');
			if($(this).hasClass('havChild')){
				$(this).not(':animated').addClass('open');
				$(this).children('div').not(':animated').slideDown();
			}
			
			$(this).siblings().children('div').not(':animated').hide();
			
		});	
		
		$('.header').on({
			mouseleave: function(){
			  $('.havChild>div').hide();
			  $('.havChild').removeClass('open');
			}
		});


		
		var timer = false;
		$(window).resize(function() {
			if (timer !== false) {
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				var headHeight = $('.header').outerHeight();
				$('.header-sitemap li div').css('top', headHeight);				
			}, 200);
		});
    }
	
	
	var w = $(window).width();
	var x = 670;
	
	if (w < x) {
	
		
		
	} else {
		
		
	}
		
	if($('.type2>li.havChild').length){
		$('.type2>li.havChild').children('ul').hide();
		$('.type2>li.havChild.active').children('ul').show();
	}
	
	$('aside .havChild>a').click(function(){
		$(this).parent('li').not(':animated').toggleClass('open');
		if($(this).parent('li').hasClass('open')){
			$(this).next('ul').not(':animated').slideDown();	
		} else {
			$(this).next('ul').not(':animated').slideUp();	
		}
		return false;
	});
	
	if($('.product-search').length){
		$('.product-search-scene>span').click(function(){
			if(!$(this).parent('li').hasClass('open')){
				$('.product-search-content.item').hide();
				$('.product-search>ul>li').not(':animated').removeClass('open');
				$(this).parent('li').addClass('open');
				$('.product-search-content.scene').not(':animated').slideDown();	
				
				$('.product-search-content.scene .product-search-close').fadeIn();
				
			} else {
				$(this).parent('li').removeClass('open');
				$('.product-search-content.scene').not(':animated').slideUp();	
				
				$('.product-search-content.scene .product-search-close').hide();
			}
			return false;
		});
		
		$('.product-search-content.scene .product-search-close').click(function(){
			$('.product-search-scene').removeClass('open');
			$(this).parent().not(':animated').slideUp();
			$(this).hide();
		});
		
		$('.product-search-item>span').click(function(){
			if(!$(this).parent('li').hasClass('open')){
				$('.product-search-content.scene').hide();
				$('.product-search>ul>li').not(':animated').removeClass('open');
				$(this).parent('li').addClass('open');
				$('.product-search-content.item').not(':animated').slideDown();	
				
				$('.product-search-content.item .product-search-close').fadeIn();
				
			} else {
				$(this).parent('li').removeClass('open');
				$('.product-search-content.item').not(':animated').slideUp();	
				
				$('.product-search-content.item .product-search-close').hide();
			}
			return false;
		});
		
		$('.product-search-content.item .product-search-close').click(function(){
			$('.product-search-item').removeClass('open');
			$(this).parent().not(':animated').slideUp();
			$(this).hide();
		});
		
		
		var productNameBWidth = $('.common-sub03>b').width();
		if (w >= 1200) {
			var productNameBWidthMax = 600;
		} else {
			var productNameBWidthMax = 500;
		}
		
		if(productNameBWidth >= productNameBWidthMax && productNameBWidth < 1190){
			$('.common-sub03').parent('section').addClass('longSub');
		} else if(productNameBWidth >= productNameBWidthMax && productNameBWidth > 1190){
			$('.common-sub03').parent('section').addClass('longlongSub');
		}
		
		
	}
	
	
	
	
	if($('.object-fit-img').length){
		objectFitImages('img.object-fit-img');
	}
	

});

$(window).load(function () {
	setTimeout(function(){    
		var w = $(window).width();
		var x = 670;
		var headHeight = $('.header').outerHeight();
		if (w > x) {
			$('.gNav>ul>li>div').css('top', headHeight);
		}
	},500);
});