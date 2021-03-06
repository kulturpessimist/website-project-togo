var aurora = {
	prepare: {
		header: function(){
			$('header > img').each(function(i,el){
				var src = $(el).attr('src');
				$('header').css('background-image', 'url('+src+')');
			});
		},
		footer: function(){
			$('footer > img').each(function(i,el){
				var src = $(el).attr('src');
				$('footer').css('background-image', 'url('+src+')');
			});
		},
		scrolling: function(){
			$('a').smoothScroll({
				offset: -120,
				direction: 'top',
			  	easing: 'swing',
				speed: "auto",
				autoCoefficient: 2
			});
			$('.content a[name]').each(function(i,el){
				$(el).attr( 'id', $(el).attr('name') );
			});
		},
		images: function(){
			$('.content img').each(function(i,el){
				var content = $(el).attr('alt');
				$( "<div class='description'>"+content+"</div>" ).insertAfter( el );
				// featherlight it...
				$(el).featherlight( $(el).attr('src') );
			});
		},
		contact: function(){
			$('a[rel="contact"]').featherlight('<iframe src="http://natureoffice.com/de/contact.togo.php" width="940" height="410" style="border:none;overflow:hidden"></iframe>')
		}
	},
	cms: (window.location.href.indexOf("cms.pagelime.com")>-1 || window.location.href.indexOf("cms.natureoffice.com")>-1),
	/* _init_ */
	init: function(){
		if( !aurora.cms ){
			aurora.prepare.header();
			aurora.prepare.footer();
			aurora.prepare.scrolling();
			aurora.prepare.images();
			aurora.prepare.contact();
		}
	}
};

aurora.init();


/* Lazy Header Plugin jQuery */
;(function($,window,document,undefined){'use strict';var elSelector='nav',elClassHidden='nav--hidden',throttleTimeout=500,$element=$(elSelector);if(!$element.length)return true;var $window=$(window),wHeight=0,wScrollCurrent=0,wScrollBefore=0,wScrollDiff=0,$document=$(document),dHeight=0,throttle=function(delay,fn){var last,deferTimer;return function(){var context=this,args=arguments,now=+new Date;if(last&&now<last+delay){clearTimeout(deferTimer);deferTimer=setTimeout(function(){last=now;fn.apply(context,args)},delay)}else{last=now;fn.apply(context,args)}}};$window.on('scroll',throttle(throttleTimeout,function(){dHeight=$document.height();wHeight=$window.height();wScrollCurrent=$window.scrollTop();wScrollDiff=wScrollBefore-wScrollCurrent;if(wScrollCurrent<=0)$element.removeClass(elClassHidden);else if(wScrollDiff>0&&$element.hasClass(elClassHidden))$element.removeClass(elClassHidden);else if(wScrollDiff<0){if(wScrollCurrent+wHeight>=dHeight&&$element.hasClass(elClassHidden))$element.removeClass(elClassHidden);else $element.addClass(elClassHidden)}wScrollBefore=wScrollCurrent}))})(jQuery,window,document);