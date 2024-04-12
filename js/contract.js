// JavaScript Document

$(window).load(function(){
	
$(".check").attr("disabled", "disabled");
$(".check").addClass("disabled-btn");

$('.form-set input').blur(function(){			
		if($("#name").val() != "" && $("#kana").val() != "" && $("#zipcode").val() != "" && $("#pref").val() != "" && $("#address1").val() != "" && $("#tel").val() != "" && $("#email").val() != "" && $("#comment").val() != "" && $("#agreecheck").prop('checked')){
           $(".check").removeAttr("disabled");
		   $(".check").removeClass("disabled-btn");
        } else {
			$(".check").attr("disabled", "disabled");
			$(".check").addClass("disabled-btn");
		}
});

$('.form-set textarea').blur(function(){
	    if($("#name").val() != "" && $("#kana").val() != "" && $("#zipcode").val() != "" && $("#pref").val() != "" && $("#address1").val() != "" && $("#tel").val() != "" && $("#email").val() != "" && $("#comment").val() != "" && $("#agreecheck").prop('checked')){
           $(".check").removeAttr("disabled");
		   $(".check").removeClass("disabled-btn");
        } else {
			$(".check").attr("disabled", "disabled");
			$(".check").addClass("disabled-btn");
		}
});
	
$('.form-set select').blur(function(){
	    if($("#name").val() != "" && $("#kana").val() != "" && $("#zipcode").val() != "" && $("#pref").val() != "" && $("#address1").val() != "" && $("#tel").val() != "" && $("#email").val() != "" && $("#comment").val() != "" && $("#agreecheck").prop('checked')){
           $(".check").removeAttr("disabled");
		   $(".check").removeClass("disabled-btn");
        } else {
			$(".check").attr("disabled", "disabled");
			$(".check").addClass("disabled-btn");
		}
});

$('#agreecheck').change(function(){
	    if($("#name").val() != "" && $("#kana").val() != "" && $("#zipcode").val() != "" && $("#pref").val() != "" && $("#address1").val() != "" && $("#tel").val() != "" && $("#email").val() != "" && $("#comment").val() != "" && $("#agreecheck").prop('checked')){
           $(".check").removeAttr("disabled");
		   $(".check").removeClass("disabled-btn");
        } else {
			$(".check").attr("disabled", "disabled");
			$(".check").addClass("disabled-btn");
		}
});

});
