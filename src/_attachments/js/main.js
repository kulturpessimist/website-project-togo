(function(){

	$('.content img').each(function(i,el){
		var content = $(el).attr('alt');
		$( "<div class='description'>"+content+"</div>" ).insertAfter( el );
	});

	$('footer img').each(function(i,el){
		var src = $(el).attr('src');
		$('footer').css('background-image', 'url('+src+')');
	});

	$('.header img').each(function(i,el){
		var src = $(el).attr('src');
		$('.header').css('background-image', 'url('+src+')');
	});

	$('a').smoothScroll({
		offset: -50,
		direction: 'top',
	  	easing: 'swing',
		speed: "auto",
		autoCoefficient: 3
	});

})();

	$(document).ready(function() {

	});