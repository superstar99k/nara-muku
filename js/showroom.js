// JavaScript Document

$(window).load(function(){
	
$(".check").attr("disabled", "disabled");
$(".check").addClass("disabled-btn");

$('.form-set input').blur(function(){			
		if($("#area-list").val() != "" && $("#date").val() != "" && $(".time-list input:checked").length > 0 && $("#name").val() != "" && $("#kana").val() != "" && $("#tel").val() != "" && $("#email").val() != "" && $("#agreecheck").prop('checked')){
           $(".check").removeAttr("disabled");
		   $(".check").removeClass("disabled-btn");
        } else {
			$(".check").attr("disabled", "disabled");
			$(".check").addClass("disabled-btn");
		}
});

$('.time-list input').change(function(){
	  if($("#area-list").val() != "" && $("#date").val() != "" && $(".time-list input:checked").length > 0 && $("#name").val() != "" && $("#kana").val() != "" && $("#tel").val() != "" && $("#email").val() != "" && $("#agreecheck").prop('checked')){
           $(".check").removeAttr("disabled");
		   $(".check").removeClass("disabled-btn");
        } else {
			$(".check").attr("disabled", "disabled");
			$(".check").addClass("disabled-btn");
		}
});

$('.form-set select').blur(function(){
	   if($("#area-list").val() != "" && $("#date").val() != "" && $(".time-list input:checked").length > 0 && $("#name").val() != "" && $("#kana").val() != "" && $("#tel").val() != "" && $("#email").val() != "" && $("#agreecheck").prop('checked')){
           $(".check").removeAttr("disabled");
		   $(".check").removeClass("disabled-btn");
        } else {
			$(".check").attr("disabled", "disabled");
			$(".check").addClass("disabled-btn");
		}
});

$('#agreecheck').change(function(){
	    if($("#area-list").val() != "" && $("#date").val() != "" && $(".time-list input:checked").length > 0 && $("#name").val() != "" && $("#kana").val() != "" && $("#tel").val() != "" && $("#email").val() != "" && $("#agreecheck").prop('checked')){
           $(".check").removeAttr("disabled");
		   $(".check").removeClass("disabled-btn");
        } else {
			$(".check").attr("disabled", "disabled");
			$(".check").addClass("disabled-btn");
		}
});

});
