// JavaScript Document

$(function(){
	
	$('.faq-item dt').click(function(){
		$(this).not(':animated').toggleClass('open');
		if($(this).hasClass('open')){
			$(this).next('dd').not(':animated').slideDown('fast');	
			$(this).parent('dl').siblings().children('dd').not(':animated').slideUp('fast');
			$(this).parent('dl').siblings().children('dt').removeClass('open');
		} else {
			$(this).next('dd').not(':animated').slideUp('fast');	
		}
		return false;
	});
	

});
