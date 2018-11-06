/*
imgLiquid v0.9.944 / 03-05-2013
jQuery plugin to resize images to fit in a container.
Copyright (c) 2012 Alejandro Emparan (karacas) @krc_ale
Dual licensed under the MIT and GPL licenses
https://github.com/karacas/imgLiquid

ex:
	$('.imgLiquid').imgLiquid({fill:true});

	// OPTIONS:

	> js:
			fill: true,
			verticalAlign:		// 'center' //	'top'	//	'bottom' // '50%'  // '10%'
			horizontalAlign:	// 'center' //	'left'	//	'right'  // '50%'  // '10%'

	> CallBacks:
			onStart:		function(){},
			onFinish:		function(){},
			onItemStart:	function(index, container, img){},
			onItemFinish:	function(index, container, img){}

	> hml5 data attr (overwrite all)
			data-imgLiquid-fill='true'
			data-imgLiquid-horizontalAlign='center'
			data-imgLiquid-verticalAlign='center'
*/
//


var imgLiquid = imgLiquid || {VER: '0.9.944'};
imgLiquid.bgs_Available = false;
imgLiquid.bgs_CheckRunned = false;
imgLiquid.injectCss = '.imgLiquid .respimg {visibility:hidden}';


(function ($) {

	// ___________________________________________________________________

	function checkBgsIsavailable() {
		if (imgLiquid.bgs_CheckRunned) return;
		else imgLiquid.bgs_CheckRunned = true;

		var spanBgs = $('<span style="background-size:cover" />');
		$('body').append(spanBgs);

		!function () {
			var bgs_Check = spanBgs[0];
			if (!bgs_Check || !window.getComputedStyle) return;
			var compStyle = window.getComputedStyle(bgs_Check, null);
			if (!compStyle || !compStyle.backgroundSize) return;
			imgLiquid.bgs_Available = (compStyle.backgroundSize === 'cover');
		}();

		spanBgs.remove();
	}





	// ___________________________________________________________________

	$.fn.extend({
		imgLiquid: function (options) {

			this.defaults = {
				fill: true,
				verticalAlign: 'center',			//	'top'	//	'bottom' // '50%'  // '10%'
				horizontalAlign: 'center',			//	'left'	//	'right'  // '50%'  // '10%'
				useBackgroundSize: true,
				useDataHtmlAttr: true,

				responsive: true,					/* Only for use with BackgroundSize false (or old browsers) */
				delay: 0,							/* Only for use with BackgroundSize false (or old browsers) */
				fadeInTime: 0,						/* Only for use with BackgroundSize false (or old browsers) */
				removeBoxBackground: true,			/* Only for use with BackgroundSize false (or old browsers) */
				hardPixels: true,					/* Only for use with BackgroundSize false (or old browsers) */
				responsiveCheckTime: 500,			/* Only for use with BackgroundSize false (or old browsers) */ /* time to check div resize */
				timecheckvisibility: 500,			/* Only for use with BackgroundSize false (or old browsers) */ /* time to recheck if visible/loaded */

				// CALLBACKS
				onStart: null,						// no-params
				onFinish: null,						// no-params
				onItemStart: null,					// params: (index, container, img )
				onItemFinish: null,					// params: (index, container, img )
				onItemError: null					// params: (index, container, img )
			};


			checkBgsIsavailable();
			var imgLiquidRoot = this;

			// Extend global settings
			this.options = options;
			this.settings = $.extend({}, this.defaults, this.options);

			// CallBack
			if (this.settings.onStart) this.settings.onStart();




			// ___________________________________________________________________

			return this.each(function ($i) {

				// MAIN >> each for image

				var settings = imgLiquidRoot.settings,
				$imgBoxCont = $(this),
				$img = $('img:first',$imgBoxCont);
				if (!$img.length) {onError(); return;}


				// Extend settings
				if (!$img.data('imgLiquid_settings')) {
					// First time
					settings = $.extend({}, imgLiquidRoot.settings, getSettingsOverwrite());
				} else {
					// Recall
					// Remove Classes
					$imgBoxCont.removeClass('imgLiquid_error').removeClass('imgLiquid_ready');
					settings = $.extend({}, $img.data('imgLiquid_settings'), imgLiquidRoot.options);
				}
				$img.data('imgLiquid_settings', settings);


				// Start CallBack
				if (settings.onItemStart) settings.onItemStart($i, $imgBoxCont, $img); /* << CallBack */


				// Process
				if (imgLiquid.bgs_Available && settings.useBackgroundSize)
					processBgSize();
				else
					processOldMethod();


				// END MAIN <<




				// ___________________________________________________________________

				function processBgSize() {

					// Check change img src
					if ($imgBoxCont.css('background-image').indexOf(encodeURI($img.attr('src'))) === -1) {
						// Change
						$imgBoxCont.css({'background-image': 'url("' + encodeURI($img.attr('src')) + '")'});
					}

					$imgBoxCont.css({
						'background-size':		(settings.fill) ? 'cover' : 'contain',
						'background-position':	(settings.horizontalAlign + ' ' + settings.verticalAlign).toLowerCase(),
						'background-repeat':	'no-repeat'
					});

					$('a:first', $imgBoxCont).css({
						//'display':	'block',
						//'width':	'100%',
						//'height':	'100%'
					});

					$('img#respimg', $imgBoxCont).css({'display': 'none'});

					if (settings.onItemFinish) settings.onItemFinish($i, $imgBoxCont, $img); /* << CallBack */

					$imgBoxCont.addClass('imgLiquid_bgSize');
					$imgBoxCont.addClass('imgLiquid_ready');
					checkFinish();
				}




				// ___________________________________________________________________

				function processOldMethod() {

					// Check change img src
					if ($img.data('oldSrc') && $img.data('oldSrc') !== $img.attr('src')) {

						/* Clone & Reset img */
						var $imgCopy = $img.clone().removeAttr('style');
						$imgCopy.data('imgLiquid_settings', $img.data('imgLiquid_settings'));
						$img.parent().prepend($imgCopy);
						$img.remove();
						$img = $imgCopy;
						$img[0].width = 0;

						// Bug ie with > if (!$img[0].complete && $img[0].width) onError();
						setTimeout(processOldMethod, 10);
						return;
					}


					// Reproceess?
					if ($img.data('imgLiquid_oldProcessed')) {
						makeOldProcess(); return;
					}


					// Set data
					$img.data('imgLiquid_oldProcessed', false);
					$img.data('oldSrc', $img.attr('src'));


					// Hide others images
					$('img:first', $imgBoxCont).css('display', 'none');


					// CSSs
					$imgBoxCont.css({'overflow': 'hidden'});
					$img.fadeTo(0, 0).removeAttr('width').removeAttr('height').css({
						'visibility': 'visible',
						'max-width': 'none',
						'max-height': 'none',
						'width': 'auto',
						'height': 'auto',
						'display': 'block'
					});


					// CheckErrors
					$img.on('error', onError);
					$img[0].onerror = onError;


					// loop until load
					function onLoad() {
						if ($img.data('imgLiquid_error') || $img.data('imgLiquid_loaded') || $img.data('imgLiquid_oldProcessed')) return;
						if ($imgBoxCont.is(':visible') && $img[0].complete && $img[0].width > 0 && $img[0].height > 0) {
							$img.data('imgLiquid_loaded', true);
							setTimeout(makeOldProcess, $i * settings.delay);
						} else {
							setTimeout(onLoad, settings.timecheckvisibility);
						}
					}


					onLoad();
					checkResponsive();
				}




				// ___________________________________________________________________

				function checkResponsive() {

					/* Only for oldProcessed method (background-size dont need) */

					if (!settings.responsive && !$img.data('imgLiquid_oldProcessed')) return;
					if (!$img.data('imgLiquid_settings')) return;

					settings = $img.data('imgLiquid_settings');

					$imgBoxCont.actualSize = $imgBoxCont.get(0).offsetWidth + ($imgBoxCont.get(0).offsetHeight / 10000);
					if ($imgBoxCont.sizeOld && $imgBoxCont.actualSize !== $imgBoxCont.sizeOld) makeOldProcess();

					$imgBoxCont.sizeOld = $imgBoxCont.actualSize;
					setTimeout(checkResponsive, settings.responsiveCheckTime);
				}




				// ___________________________________________________________________

				function onError() {
					$img.data('imgLiquid_error', true);
					$imgBoxCont.addClass('imgLiquid_error');
					if (settings.onItemError) settings.onItemError($i, $imgBoxCont, $img); /* << CallBack */
					checkFinish();
				}




				// ___________________________________________________________________

				function getSettingsOverwrite() {
					var SettingsOverwrite = {};

					if (imgLiquidRoot.settings.useDataHtmlAttr) {
						var dif = $imgBoxCont.attr('data-imgLiquid-fill'),
						ha =  $imgBoxCont.attr('data-imgLiquid-horizontalAlign'),
						va =  $imgBoxCont.attr('data-imgLiquid-verticalAlign');

						if (dif === 'true' || dif === 'false') SettingsOverwrite.fill = Boolean (dif === 'true');
						if (ha !== undefined && (ha === 'left' || ha === 'center' || ha === 'right' || ha.indexOf('%') !== -1)) SettingsOverwrite.horizontalAlign = ha;
						if (va !== undefined && (va === 'top' ||  va === 'bottom' || va === 'center' || va.indexOf('%') !== -1)) SettingsOverwrite.verticalAlign = va;
					}

					if (imgLiquid.isIE && imgLiquidRoot.settings.ieFadeInDisabled) SettingsOverwrite.fadeInTime = 0; //ie no anims
					return SettingsOverwrite;
				}





				// ___________________________________________________________________

				function makeOldProcess() { /* Only for old browsers, or useBackgroundSize seted false */

					// Calculate size
					var w, h, wn, hn, ha, va, hdif, vdif,
					margT = 0,
					margL = 0,
					$imgCW = $imgBoxCont.width(),
					$imgCH = $imgBoxCont.height();


					// Save original sizes
					if ($img.data('owidth')	=== undefined) $img.data('owidth',	$img[0].width);
					if ($img.data('oheight') === undefined) $img.data('oheight', $img[0].height);


					// Compare ratio
					if (settings.fill === ($imgCW / $imgCH) >= ($img.data('owidth') / $img.data('oheight'))) {
						w = '100%';
						h = 'auto';
						wn = Math.floor($imgCW);
						hn = Math.floor($imgCW * ($img.data('oheight') / $img.data('owidth')));
					} else {
						w = 'auto';
						h = '100%';
						wn = Math.floor($imgCH * ($img.data('owidth') / $img.data('oheight')));
						hn = Math.floor($imgCH);
					}

					// Align X
					ha = settings.horizontalAlign.toLowerCase();
					hdif = $imgCW - wn;
					if (ha === 'left') margL = 0;
					if (ha === 'center') margL = hdif * 0.5;
					if (ha === 'right') margL = hdif;
					if (ha.indexOf('%') !== -1){
						ha = parseInt (ha.replace('%',''), 10);
						if (ha > 0) margL = hdif * ha * 0.01;
					}


					// Align Y
					va = settings.verticalAlign.toLowerCase();
					vdif = $imgCH - hn;
					if (va === 'left') margT = 0;
					if (va === 'center') margT = vdif * 0.5;
					if (va === 'bottom') margT = vdif;
					if (va.indexOf('%') !== -1){
						va = parseInt (va.replace('%',''), 10);
						if (va > 0) margT = vdif * va * 0.01;
					}


					// Add Css
					if (settings.hardPixels) {w = wn; h = hn;}
					$img.css({
						'width': w,
						'height': h,
						'margin-left': Math.floor(margL),
						'margin-top': Math.floor(margT)
					});


					// FadeIn > Only first time
					if (!$img.data('imgLiquid_oldProcessed')) {
						$img.fadeTo(settings.fadeInTime, 1);
						$img.data('imgLiquid_oldProcessed', true);
						if (settings.removeBoxBackground) $imgBoxCont.css('background-image', 'none');
						$imgBoxCont.addClass('imgLiquid_nobgSize');
						$imgBoxCont.addClass('imgLiquid_ready');
					}


					if (settings.onItemFinish) settings.onItemFinish($i, $imgBoxCont, $img); /* << CallBack */
					checkFinish();
				}




				// ___________________________________________________________________

				function checkFinish() { /* Check callBack */
					if ($i === imgLiquidRoot.length - 1) if (imgLiquidRoot.settings.onFinish) imgLiquidRoot.settings.onFinish();
				}


			});
		}
	});
})(jQuery);



// Inject css styles ______________________________________________________
!function () {
	var css = imgLiquid.injectCss,
	head = document.getElementsByTagName('head')[0],
	style = document.createElement('style');
	style.type = 'text/css';
	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}
	head.appendChild(style);
}();


/*! responsiveCarousel.JS - v1.0
 * http://basilio.github.com/responsiveCarousel
 *
 * Copyright (c) 2013 Basilio Cáceres <basilio.caceres@gmail.com>;
 * Licensed under the MIT license */

;(function($){
	"use strict";
	$.fn.respcarousel = function(args){
		var defaults, obj;
		defaults = {
			infinite : true,
			visible : 1,
			speed : 'fast',
			overflow : false,
			autoRotate : false,
			navigation : $(this).data('navigation'),
			itemMinWidth : 0,
			itemEqualHeight : false,
			itemMargin : 0,
			itemClassActive : 'crsl-active',
			imageWideClass : 'wide-image',
			// Use to build grid system - carousel : false
			respcarousel : true
		};
		return $(this).each( function(){
			// Set Object
			obj = $(this);

			// Extend
			if( $.isEmptyObject(args) === false )
				$.extend( defaults, args );
			if( $.isEmptyObject( $(obj).data('crsl') ) === false )
				$.extend( defaults, $(obj).data('crsl') );


			// Touch detection
			defaults.isTouch = 'ontouchstart' in document.documentElement || navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i) ? true : false ;

			obj.init = function(){
				// Set some default vars
				defaults.total = $(obj).find('.crsl-item').length;
				defaults.itemWidth = $(obj).outerWidth();
				defaults.visibleDefault = defaults.visible;

				// Touch Defaults
				defaults.swipeDistance = null;
				defaults.swipeMinDistance = 100;
				defaults.startCoords = {};
				defaults.endCoords = {};

				// .crsl-items
				$(obj).css({ width: '100%' });
				// .crls-item
				$(obj).find('.crsl-item').css({ position: 'relative', float: 'left', overflow: 'hidden', height: 'auto' });
				// .crsl-item > images with full width
				$(obj).find('.'+defaults.imageWideClass).each( function(){
					$(this).css({ display: 'block', width: '100%', height: 'auto' });
				});
				// .crsl-item > iframes (videos)
				$(obj).find('.crsl-item iframe').attr({ width: '100%' });


				// Declare the item ative
				if( defaults.respcarousel )
					$(obj).find('.crsl-item:first-child').addClass(defaults.itemClassActive);

				//customer change to reduce opacity for novisible items.
				$( ".crsl-item" ).each(function() {
				$( this ).css({ opacity: 0.2 });
				});
				var item1 = $(obj).find('.crsl-item:first-child');
				item1.css({ opacity: 1 });
				item1.next('.crsl-item').css({ opacity: 1 });
				
				// Move last element to begin for infinite carousel
				if( defaults.respcarousel && defaults.infinite && ( defaults.visible < defaults.total ) )
					$(obj).find('.crsl-item:first-child').before( $('.crsl-item:last-child', obj) );

				// if defaults.overflow
				if( defaults.overflow === false ){
					$(obj).css({ overflow: 'hidden' });
				} else {
					if( defaults.isTouch ){
					$(obj).css({ overflow: 'hidden' });
					}else{
					$('html, body').css({ 'overflow-x': 'hidden' });
					}
				}

				$(obj).trigger('initCarousel', [defaults, obj]);

				// Preload if it`s neccesary
				obj.testPreload();

				// This configure and margins and variables when document is ready,
				// loaded and window is resized
				obj.config();

				// Init AutoRotate
				obj.initRotate();

				// Trigger Clicks
				obj.triggerNavs();

			};

			obj.testPreload= function(){
				if( $(obj).find('img').length > 0 ){
					var totalImages = $(obj).find('img').length, i = 1;
					$(obj).find('img').each( function(){
						obj.preloadImage(this, i , totalImages);
						i++;
					});
				} else {
					$(obj).trigger('loadedCarousel', [defaults, obj]);
				}
			};

			obj.preloadImage = function(image, i, totalImages){
				var new_image = new Image(), attributes = {};
				attributes.src = ( $(image).attr('src') !== undefined ? image.src : '' );
				attributes.alt = ( $(image).attr('alt') !== undefined ? image.alt : '' );
				$(new_image).attr( attributes );
				$(new_image).on('load', function(){
					// Trigger first image loaded as init Loading action
					if( i === 1 )
						$(obj).trigger('loadingImagesCarousel', [defaults, obj]);
					// Trigger last image loaded as loaded complete action
					if( i === totalImages )
						$(obj).trigger('loadedImagesCarousel', [defaults, obj]);
				});
			};

			// Base Configuration:
			obj.config = function(){
				// Width Item
				defaults.itemWidth = Math.floor( ( $(obj).outerWidth() - ( defaults.itemMargin * ( defaults.visibleDefault - 1 ) ) ) / defaults.visibleDefault );
				if( defaults.itemWidth <= defaults.itemMinWidth ){
					defaults.visible = Math.floor( ( $(obj).outerWidth() - ( defaults.itemMargin * ( defaults.visible - 1 ) ) ) / defaults.itemMinWidth ) === 1 ?
						Math.floor( $(obj).outerWidth() / defaults.itemMinWidth ) :
						Math.floor( ( $(obj).outerWidth() - defaults.itemMargin ) / defaults.itemMinWidth );
					defaults.visible = defaults.visible < 1 ? 1 : defaults.visible;
					defaults.itemWidth = defaults.visible === 1 ? Math.floor( $(obj).outerWidth() ) : Math.floor( ( $(obj).outerWidth() - ( defaults.itemMargin * ( defaults.visible - 1 ) ) ) / defaults.visible );
				} else {
					defaults.visible = defaults.visibleDefault;
				}

				if( defaults.respcarousel ){
					// Normal use - Global carousel variables
					// Set Variables
					obj.wrapWidth = Math.floor( ( defaults.itemWidth + defaults.itemMargin ) * defaults.total );
					obj.wrapMargin = obj.wrapMarginDefault = defaults.infinite && defaults.visible < defaults.total ? parseInt( ( defaults.itemWidth + defaults.itemMargin ) * -1, 10 ) : 0 ;
					// Move last element to begin for infinite carousel
					if( defaults.infinite && ( defaults.visible < defaults.total ) && ( $(obj).find('.crsl-item.'+defaults.itemClassActive).index() === 0 ) ){
						$(obj).find('.crsl-item:first-child').before( $('.crsl-item:last-child', obj) );
						obj.wrapMargin = obj.wrapMarginDefault = parseInt( ( defaults.itemWidth + defaults.itemMargin ) * -1, 10 );
					}
					// Modify width & margin to .crsl-wrap
					
					$(obj).find('.crsl-wrap').css({marginLeft: obj.wrapMargin });
					
					if(defaults.total != 1){
						$(obj).find('.crsl-wrap').css('width',obj.wrapWidth+'px');
					}
				} else {
					// Excepcional use
					// responsiveCarousel might be use to create grids!
					obj.wrapWidth = $(obj).outerWidth();
					$(obj).find('.crsl-wrap').css({ width: obj.wrapWidth+defaults.itemMargin+'px' });
					$('#'+defaults.navigation).hide();
				}
				$(obj).find('.crsl-item').css({ marginRight : defaults.itemMargin+'px' });

				if(defaults.total != 1){
					$(obj).find('.crsl-item').css('width',defaults.itemWidth+'px');
				}

				// Equal Height Configuration
				obj.equalHeights();

				// Condition if total <= visible
				if( defaults.respcarousel ){
					if( defaults.visible >= defaults.total ){
						defaults.autoRotate = false;
						$('#'+defaults.navigation).hide();
					} else {
						$('#'+defaults.navigation).show();
					}
				}
			};

			// Equal Heights
			obj.equalHeights = function(){
				if( defaults.itemEqualHeight !== false ){
					var tallest = 0;
					$(obj).find('.crsl-item').each( function(){
						$(this).css({ 'height': 'auto' });
						if ( $(this).outerHeight() > tallest ){ tallest = $(this).outerHeight(); }
					});
					$(obj).find('.crsl-item').css({ height: tallest+'px' });
				}
				return true;
			};

			obj.initRotate = function(){
				// Set AutoRotate Interval
				if( defaults.autoRotate !== false ){
					obj.rotateTime = window.setInterval( function(){
						obj.rotate();
					}, defaults.autoRotate);
				}
			};

			obj.triggerNavs = function(){
				// Previous / Next Navigation
				$('#'+defaults.navigation).delegate('.previous, .next', 'click', function(event){
					// Prevent default
					event.preventDefault();
					// Prepare execute
					obj.prepareExecute();
					// Previous & next action
					if( $(this).hasClass('previous') && obj.testPrevious(obj.itemActive) ){
						obj.previous();
					} else if( $(this).hasClass('next') && obj.testNext() ){
						obj.next();
					} else {
						return;
					}
				});
			};

			// Prepare Execute
			obj.prepareExecute = function(){
				// Stop rotate
				if( defaults.autoRotate ){
					clearInterval(obj.rotateTime);
				}
				// Prevent Animate Event
				obj.preventAnimateEvent();
				// Active
				obj.itemActive = $(obj).find('.crsl-item.'+defaults.itemClassActive);
				return true;
			};

			obj.preventAnimateEvent = function(){
				if( $(obj).find('.crsl-wrap:animated').length > 0 ){
					return false;
				}
			};

			// Rotate Action
			obj.rotate = function(){
				// Prevent Animate Event
				obj.preventAnimateEvent();
				// Active
				obj.itemActive = $(obj).find('.crsl-item.'+defaults.itemClassActive);
				obj.next();
				return true;
			};

			obj.testPrevious = function(active){
				return $('.crsl-wrap', obj).find('.crsl-item').index(active) > 0;
			};
			obj.testNext = function(){
				return ( !defaults.infinite &&
					obj.wrapWidth >= (
						( ( defaults.itemWidth + defaults.itemMargin ) * ( defaults.visible + 1 ) ) - obj.wrapMargin
					)
				) || defaults.infinite;
			};

			// Previous Animate
			obj.previous = function(){
				obj.wrapMargin = defaults.infinite ? obj.wrapMarginDefault + $(obj.itemActive).outerWidth(true) : obj.wrapMargin + $(obj.itemActive).outerWidth(true);
				var prevItemIndex = $(obj.itemActive).index();
				var newItemActive = $(obj.itemActive).prev('.crsl-item');
				$( ".crsl-item" ).each(function() {
					if( defaults.isTouch ){$( this ).css({ opacity: 1 });}else{$( this ).css({ opacity: 0.2 });}
				});
				$(newItemActive).css({ opacity: 1 });
				$(newItemActive).next('.crsl-item').css({ opacity: 1 });
				
				var action = 'previous';
				// Trigger Begin Carousel Move
				$(obj).trigger('beginCarousel', [defaults, obj, action]);
				// Animate
				$(obj).
					find('.crsl-wrap').
					animate({ marginLeft: obj.wrapMargin+'px' }, defaults.speed, function(){
						// Active
						$(obj.itemActive).removeClass(defaults.itemClassActive);
						$(newItemActive).addClass(defaults.itemClassActive);
						if( defaults.infinite ){
							$(this).css({ marginLeft: obj.wrapMarginDefault }).find('.crsl-item:first-child').before( $('.crsl-item:last-child', obj) );
						} else {
							if( obj.testPrevious(newItemActive) === false )
								$( '#'+defaults.navigation ).find('.previous').addClass('previous-inactive');
							if( obj.testNext() )
								$( '#'+defaults.navigation ).find('.next').removeClass('next-inactive');
						}
						// Trigger Carousel Exec
						$(this).trigger('endCarousel', [defaults, obj, action]);
					});
			};

			// Next Animate
			obj.next = function(){
				obj.wrapMargin = defaults.infinite ? obj.wrapMarginDefault - $(obj.itemActive).outerWidth(true) : obj.wrapMargin - $(obj.itemActive).outerWidth(true);
				var nextItemIndex = $(obj.itemActive).index();
				var newItemActive = $(obj.itemActive).next('.crsl-item');
				$( ".crsl-item" ).each(function() {
					if( defaults.isTouch ){$( this ).css({ opacity: 1 });}else{$( this ).css({ opacity: 0.2 });}
				});
				$(newItemActive).css({ opacity: 1 });
				$(newItemActive).next('.crsl-item').css({ opacity: 1 });

				var action = 'next';
				// Trigger Begin Carousel Move
				$(obj).trigger('beginCarousel', [defaults, obj, action]);
				// Animate
				$(obj).
					find('.crsl-wrap').
					animate({ marginLeft: obj.wrapMargin+'px' }, defaults.speed, function(){
						// Active
						$(obj.itemActive).removeClass(defaults.itemClassActive);
						$(newItemActive).addClass(defaults.itemClassActive);
						if( defaults.infinite ){
							$(this).css({ marginLeft: obj.wrapMarginDefault }).find('.crsl-item:last-child').after( $('.crsl-item:first-child', obj) );
						} else {
							if( obj.testPrevious(newItemActive) )
								$( '#'+defaults.navigation ).find('.previous').removeClass('previous-inactive');
							if( obj.testNext() === false )
								$( '#'+defaults.navigation ).find('.next').addClass('next-inactive');
						}
						// Trigger Carousel Exec
						$(this).trigger('endCarousel', [defaults, obj, action]);
					});
			};

			var mouseHover = false, current;
			$(window).on('mouseleave', function(event){
				// Detect current
				if (event.target) current = event.target;
				else if (event.srcElement) current = event.srcElement;
				// Detect mouseover
				if( ( $(obj).attr('id') && $(current).parents('.crsl-items').attr('id') === $(obj).attr('id') ) || ( $(current).parents('.crsl-items').data('navigation') === $(obj).data('navigation') ) ){
					mouseHover = true;
				} else {
					mouseHover = false;
				}
				// False
				return false;
			});

			$(window).on('keydown', function(event){
				if( mouseHover === true ){
					// Previous & next action
					if( event.keyCode === 37 ){
						// Prepare execute
						obj.prepareExecute();
						// Previous
						obj.previous();
					} else if( event.keyCode === 39 ){
						// Prepare execute
						obj.prepareExecute();
						// Next
						obj.next();
					}
				}
				return;
			});

			if( defaults.isTouch ){
				$(obj).on('touchstart', function(e){
					$(obj).addClass('touching');
					defaults.startCoords = e.originalEvent.targetTouches[0];
					defaults.endCoords = e.originalEvent.targetTouches[0];
					$('.touching').on('touchmove',function(e){
						defaults.endCoords = e.originalEvent.targetTouches[0];
						if( Math.abs( parseInt( defaults.endCoords.pageX-defaults.startCoords.pageX, 10 ) ) > Math.abs( parseInt( defaults.endCoords.pageY-defaults.startCoords.pageY, 10 ) ) ){
							e.preventDefault();
							e.stopPropagation();
						}
					});
				}).on('touchend', function(e){
					e.preventDefault();
					e.stopPropagation();
					defaults.swipeDistance = defaults.endCoords.pageX - defaults.startCoords.pageX;
					if( defaults.swipeDistance >= defaults.swipeMinDistance ){
						// swipeLeft
						obj.previous();
					} else if( defaults.swipeDistance <= - defaults.swipeMinDistance ){
						// swipeRight
						obj.next();
					}
					$('.touching').off('touchmove').removeClass('touching');
				});
			}

			$(obj).on('loadedCarousel loadedImagesCarousel', function(){
				// Trigger window onload EqualHeights
				obj.equalHeights();
			});

			// Create method to resize element
			$(window).on('carouselResizeEnd', function(){
				// This configure and margins and variables when document is ready,
				// loaded and window is resized
				if( defaults.itemWidth !== $(obj).outerWidth() )
					obj.config();

			});

			// Carousel General Detection
			$(window).ready( function(){
				// Trigger Prepare Event Carousel
				$(obj).trigger('prepareCarousel', [defaults, obj]);
				// Init some defaults styles
				obj.init();
				// ResizeEnd event
				$(window).on('resize', function(){
					if( this.carouselResizeTo ) clearTimeout(this.carouselResizeTo);
					this.carouselResizeTo = setTimeout(function(){
						$(this).trigger('carouselResizeEnd');
					}, 10);
				});
			});

			$(window).load( function(){
				// Preload if it`s neccesary
				obj.testPreload();
				// This configure and margins and variables when document is ready,
				// loaded and window is resized
				obj.config();
			});
		});
	};
})(jQuery);



/**************************
******************/
/*
 *  Project: jquery.responsiveTabs.js
 *  Description: A plugin that creates responsive tabs, optimized for all devices
 *  Author: Jelle Kralt (jelle@jellekralt.nl)
 *  License: MIT
 */

;(function ( $, window, undefined ) {

    // Default settings
    var defaults = {
        collapsible: 'accordion',
        startCollapsed: false,
        rotate: false,
        setHash: false,
        animation: 'default',
        duration: 500,
        activate: function(){},
        deactivate: function(){},
        load: function(){},
        activateState: function(){},
        classes: {
            stateDefault: 'r-tabs-state-default',
            stateActive: 'r-tabs-state-active',
            tab: 'r-tabs-tab',
            anchor: 'r-tabs-anchor',
            panel: 'r-tabs-panel',
            accordionTitle: 'r-tabs-accordion-title'
        }
    };

    // Plugin constructor
    function ResponsiveTabs(element, options) {
        this.element = element; // Selected DOM element
        this.$element = $(element); // Selected jQuery element

        this.tabs = []; // Create tabs array
        this.state = ''; // Define the plugin state (tabs/accordion)
        this.rotateInterval = 0; // Define rotate interval
        this.$queue = $({});

        // Extend the defaults with the passed options
        this.options = $.extend( {}, defaults, options);

        this.init();
    }

    /*
     * init
     * This function is called when the plugin loads
    **/
    ResponsiveTabs.prototype.init = function () {
        var _this = this;

        // Load all the elements
        this.tabs = this.loadElements();
        this.loadClasses();
        this.loadEvents();

        // Window resize bind to check state
        $(window).on('resize', function(e) {
            _this.setState(e);
        });

        // Hashchange event
        $(window).on('hashchange', function(e) {
            var tabRef = _this.getTabRefBySelector(window.location.hash);

            // Check if a tab is found that matches the hash
            if(tabRef >= 0 && !_this.getTab(tabRef)._ignoreHashChange) {
                // If so, open the tab and auto close the current one
                _this.openTab(e, _this.getTab(tabRef), true);
            }
        });

        // Start rotate event if rotate option is defined
        if(this.options.rotate !== false) {
            this.startRotation();
        }

        // --------------------
        // Define plugin events
        //

        // Activate: this event is called when a tab is selected
        this.$element.bind('tabs-activate', function(e) {
            _this.options.activate.call(this, e);
        });
        // Deactivate: this event is called when a tab is closed
        this.$element.bind('tabs-deactivate', function(e) {
            _this.options.deactivate.call(this, e);
        });
        // Load: this event is called when the plugin has been loaded
        this.$element.bind('tabs-load', function(e) {
            var tabRef = _this.getTabRefBySelector(window.location.hash);
            var firstTab;

            _this.setState(e); // Set state

            // Check if the panel should be collaped on load
            if(_this.options.startCollapsed !== true && !(_this.options.startCollapsed === 'accordion' && _this.state === 'accordion')) {

                // Check if the page has a hash set that is linked to a tab
                if(tabRef >= 0) {
                    // If so, set the current tab to the linked tab
                    firstTab = _this.getTab(tabRef);
                } else {
                    // If not, just get the first one
                    firstTab = _this.getTab(0);
                }

                // Open the initial tab
                _this.openTab(e, firstTab); // Open first tab

                // Call the callback function
                _this.options.load.call(this, e, firstTab); // Call the load callback
            }
        });
        // Trigger loaded event
        this.$element.trigger('tabs-load');
    };

    /*
     * loadElements
     * This function loads the tab elements and stores them in an array
     * return: Tab array
    **/
    ResponsiveTabs.prototype.loadElements = function() {
        var $ul = this.$element.children('ul');
        var tabs = [];

        // Add the classes to the basic html elements
        this.$element.addClass('r-tabs'); // Tab container
        $ul.addClass('r-tabs-nav'); // List container


        // Get tab buttons and store their data in an array
        $('li', $ul).each(function() {
            var $tab = $(this);
            var $anchor = $('a', $tab);
            var panelSelector = $anchor.attr('href');
            var $panel = $(panelSelector);
            var $accordionTab = $('<div></div>').insertBefore($panel);
            var $accordionAnchor = $('<a></a>').attr('href', panelSelector).html($anchor.html()).appendTo($accordionTab);
            var oTab = {
                _ignoreHashChange: false,
                tab: $(this),
                anchor: $('a', $tab),
                panel: $panel,
                selector: panelSelector,
                accordionTab: $accordionTab,
                accordionAnchor: $accordionAnchor,
                active: false
            };
            // Add to tab array
            tabs.push(oTab);
        });
        return tabs;
    };

    /*
     * loadClasses
     * This function adds classes to the tab elements based on the options
    **/
    ResponsiveTabs.prototype.loadClasses = function() {
        for (var i=0; i<this.tabs.length; i++) {
            this.tabs[i].tab.addClass(this.options.classes.stateDefault).addClass(this.options.classes.tab);
            this.tabs[i].anchor.addClass(this.options.classes.anchor);
            this.tabs[i].panel.addClass(this.options.classes.stateDefault).addClass(this.options.classes.panel);
            this.tabs[i].accordionTab.addClass(this.options.classes.accordionTitle);
            this.tabs[i].accordionAnchor.addClass(this.options.classes.anchor);
        }
    };

    /*
     * loadEvents
     * This function adds events to the tab elements
    **/
    ResponsiveTabs.prototype.loadEvents = function() {
        var _this = this;
        // Define click event on a tab element
        var fClick = function(e) {
            var current = _this.getCurrentTab(); // Fetch current tab
            var clickedTab = e.data.tab;

            e.preventDefault();

            // Check if hash has to be set in the URL location
            if(_this.options.setHash) {
                window.location.hash = clickedTab.selector;
            }

            e.data.tab._ignoreHashChange = true;

            // Check if the clicked tab isnt the current one or if its collapsible. If not, do nothing
            if(current !== clickedTab || _this.isCollapisble()) {
                // The clicked tab is either another tab of the current one. If it's the current tab it is collapsible
                // Either way, the current tab can be closed
                _this.closeTab(e, current);

                // Check if the clicked tab isnt the current one or if it isnt collapsible
                if(current !== clickedTab || !_this.isCollapisble()) {
                    _this.openTab(e, clickedTab, false, true);
                }
            }
        };

        // Loop tabs
        for (var i=0; i<this.tabs.length; i++) {
            // Add click function to the tab and accordion selection element
            this.tabs[i].anchor.on('click', {tab: _this.tabs[i]}, fClick);
			this.tabs[i].anchor.on('mouseover', {tab: _this.tabs[i]}, fClick);
            this.tabs[i].accordionAnchor.on('click', {tab: _this.tabs[i]}, fClick);
        }
    };

    /*
     * setState
     * This function sets the current state of the plugin
    **/
    ResponsiveTabs.prototype.setState = function(e) {
        var $ul = $('ul', this.$element);
        var oldState = this.state;

        // The state is based on the visibility of the tabs list
        if($ul.is(':visible')){
            // Tab list is visible, so the state is 'tabs'
            this.state = 'tabs';
        } else {
            // Tab list is invisible, so the state is 'accordion'
            this.state = 'accordion';
        }

        // If the new state is different from the old state, the state activate trigger must be called
        if(this.state !== oldState) {
            this.$element.trigger('tabs-activate-state', e, {oldState: oldState, newState: this.state});
        }
    };

    /*
     * getState
     * This function gets the current state of the plugin
    **/
    ResponsiveTabs.prototype.getState = function() {
        return this.state;
    };

    /*
     * openTab
     * This function opens a tab
    **/
    ResponsiveTabs.prototype.openTab = function(e, oTab, closeCurrent, stopRotation) {
        var _this = this;

        // Check if the current tab has to be closed
        if(closeCurrent) {
            this.closeTab(e, this.getCurrentTab());
        }

        // Check if the rotation has to be stopped when activated
        if(stopRotation && this.rotateInterval > 0) {
            this.stopRotation();
        }

        // Set this tab to active
        oTab.active = true;
        // Set active classes to the tab button and accordion tab button
        oTab.tab.removeClass(_this.options.classes.stateDefault).addClass(_this.options.classes.stateActive);
        oTab.accordionTab.removeClass(_this.options.classes.stateDefault).addClass(_this.options.classes.stateActive);

        // Run panel transiton
        _this.doTransition(oTab.panel, _this.options.animation, 'open', function() {
            // When finished, set active class to the panel
            oTab.panel.removeClass(_this.options.classes.stateDefault).addClass(_this.options.classes.stateActive);
        });

        this.$element.trigger('tabs-activate', e, oTab);
    };

    /*
     * closeTab
     * This function closes a tab
    **/
    ResponsiveTabs.prototype.closeTab = function(e, oTab) {
        var _this = this;

        if(oTab !== undefined) {

            // Deactivate tab
            oTab.active = false;
            // Set default class to the tab button
            oTab.tab.removeClass(_this.options.classes.stateActive).addClass(_this.options.classes.stateDefault);

            // Run panel transition
            _this.doTransition(oTab.panel, _this.options.animation, 'close', function() {
                // Set default class to the accordion tab button and tab panel
                oTab.accordionTab.removeClass(_this.options.classes.stateActive).addClass(_this.options.classes.stateDefault);
                oTab.panel.removeClass(_this.options.classes.stateActive).addClass(_this.options.classes.stateDefault);
            }, true);

            this.$element.trigger('tabs-deactivate', e, oTab);
        }
    };

    /*
     * doTransition
     * This function runs an effect on a panel
    **/
    ResponsiveTabs.prototype.doTransition = function(panel, method, state, callback, dequeue) {
        var effect;
        var _this = this;

        // Get effect based on method
        switch(method) {
            case 'slide':
                effect = (state === 'open') ? 'slideDown' : 'slideUp';
                break;
            case 'fade':
                effect = (state === 'open') ? 'fadeIn' : 'fadeOut';
                break;
            default:
                effect = (state === 'open') ? 'show' : 'hide';
                break;
        }

        // Add the transition to a custom queue
        this.$queue.queue('responsive-tabs',function(next){
            // Run the transition on the panel
            panel[effect]({
                duration: _this.options.duration,
                done: function() {
                    // Call the callback function
                    callback.call(panel, method, state);
                    // Run the next function in the queue
                    next();
                }
            });
        });

        // When the panel is openend, dequeue everything so the animation starts
        if(state === 'open' || dequeue) {
            this.$queue.dequeue('responsive-tabs');
        }

    };

    /*
     * isCollapisble
     * This function returns the collapsibility of the tab in this state
     * return: Boolean
    **/
    ResponsiveTabs.prototype.isCollapisble = function() {
        return (typeof this.options.collapsible === 'boolean' && this.options.collapsible) || (typeof this.options.collapsible === 'string' && this.options.collapsible === this.getState());
    };

    /*
     * getTab
     * This function returns a tab by numeric reference
     * return: tab element
    **/
    ResponsiveTabs.prototype.getTab = function(numRef) {
        return this.tabs[numRef];
    };

     /*
     * getTabRefBySelector
     * This function returns the numeric tab reference based on a hash selector
     * return: numeric tab reference
    **/
    ResponsiveTabs.prototype.getTabRefBySelector = function(selector) {
        // Loop all tabs
        for (var i=0; i<this.tabs.length; i++) {
            // Check if the hash selector is equal to the tab selector
            if(this.tabs[i].selector === selector) {
                return i;
            }
        }
        // If none is found return a negative index
        return -1;
    };

    /*
     * getCurrentTab
     * This function returns the current tab element
     * return: current tab element
    **/
    ResponsiveTabs.prototype.getCurrentTab = function() {
        return this.getTab(this.getCurrentTabRef());
    };

    /*
     * getNextTabRef
     * This function returns the next tab's numeric reference
     * return: numeric tab reference
    **/
    ResponsiveTabs.prototype.getNextTabRef = function() {
        return (this.getCurrentTabRef() === this.tabs.length - 1) ? 0 : this.getCurrentTabRef() + 1;
    };

    /*
     * getPreviousTabRef
     * This function returns the previous tab's numeric reference
     * return: numeric tab reference
    **/
    ResponsiveTabs.prototype.getPreviousTabRef = function() {
        return (this.getCurrentTabRef() === 0) ? this.tabs.length - 1 : this.getCurrentTabRef() - 1;
    };

    /*
     * getPreviousTabRef
     * This function returns the current tab's numeric reference
     * return: numeric tab reference
    **/
    ResponsiveTabs.prototype.getCurrentTabRef = function() {
        // Loop all tabs
        for (var i=0; i<this.tabs.length; i++) {
            // If this tab is active, return it
            if(this.tabs[i].active) {
                return i;
            }
        }
        // No tabs have been found, return negative index
        return -1;
    };

     /*
     * startRotation
     * This function starts the rotation of the tabs
    **/
    ResponsiveTabs.prototype.startRotation = function() {
        var _this = this;
        this.rotateInterval = setInterval(function(){
            var e = jQuery.Event('rotate');
            _this.openTab(e, _this.getTab(_this.getNextTabRef()), true);
        }, ($.isNumeric(_this.options.rotate)) ? _this.options.rotate : 4000 );
    };

    /*
     * stopRotation
     * This function stops the rotation of the tabs
    **/
    ResponsiveTabs.prototype.stopRotation = function() {
        window.clearInterval(this.rotateInterval);
        this.rotateInterval = 0;
    };

    // Plugin wrapper
    $.fn.responsiveTabs = function ( options ) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'responsivetabs')) {
                    $.data(this, 'responsivetabs', new ResponsiveTabs( this, options ));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            return this.each(function () {
                var instance = $.data(this, 'responsivetabs');

                if (instance instanceof ResponsiveTabs && typeof instance[options] === 'function') {
                    instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }

                // Allow instances to be destroyed via the 'destroy' method
                if (options === 'destroy') {
                    // TODO: destroy instance classes, etc
                    $.data(this, 'responsivetabs', null);
                }
            });
        }
    };

}(jQuery, window));

function getCurrentDate(){
    var d = new Date();
    var monthNames = new Array("JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER");
    return(monthNames[d.getMonth()] + ' ' + d.getDate() + ',' + ' '+ d.getFullYear());
}

/**
function to get the xmlhttp request
*/
function getHTTPRequestObject(){
	var xmlHttpRequest;
	/*@cc_on
	  @if (@_jscript_version >= 5)
	    try {
	      xmlHttpRequest = new ActiveXObject("Msxml2.XMLHTTP");
	    } catch (exception1) {
	      try {
	        xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	      } catch (exception2) {
	        xmlhttp = false;
	      }
	    }
	  @else
	  xmlhttpRequest = false;
	@end @*/
	if(!xmlHttpRequest && typeof XMLHttpRequest!='undefined'){
		 try{
			 xmlHttpRequest=new XMLHttpRequest();
		 }catch(exception){
			 xmlHttpRequest=false
		 }
	}
	return xmlHttpRequest
}

/**
function to perform an ajax action
*/
function getXMLHTTPRequestObject(url,functionName,param){
	var httpRequester=getHTTPRequestObject();
    if (window.XMLHttpRequest) {
        eval("httpRequester.onreadystatechange ="+functionName); //req.onreadystatechange =processReqChange;
        httpRequester.open("POST", url, true);
        httpRequester.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        httpRequester.send(param);
    } else if (window.ActiveXObject) {
        if (httpRequester) {
            //req.onreadystatechange = processReqChange;
            eval("httpRequester.onreadystatechange ="+functionName);
            httpRequester.open("POST", url, true);
            httpRequester.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            httpRequester.send(param);
        }
    }
    return httpRequester;
}
var xmlrequest;
function tabOutTopNav(key,value,url){
	var reqParam = "key="+key+"&value="+value+"&exclGen=true";
	xmlrequest = getXMLHTTPRequestObject(url,"processValidation", reqParam);	
}

function tabOutCarous(key,value,url,element,form){
	if(key=='violinv'){
		if(value.startsWith('T') || value.startsWith('t')){
			url=valViolURL;
			key='violationNumber';
			$(element).prop('name', 'violationNumber')
			form.action = violaction;
		}else{
			url=valInvURL;
			key='invoiceNumber';
			$(element).prop('name', 'invoiceNumber')
			form.action=invaction;
		}
	}
	var reqParam = "key="+key+"&value="+value+"&exclGen=true";
	xmlrequest = getXMLHTTPRequestObject(url,"processValidationCarous", reqParam);	
}
function processValidationCarous(){
	if(!!xmlrequest){
		var flag = "";
		var property = "";
		if ( xmlrequest.readyState == 4 ){
			if ( xmlrequest.status == 200 ){
				if((!!xmlrequest.responseXML.getElementsByTagName("flag")) 
					&& (!!xmlrequest.responseXML.getElementsByTagName("flag")[0])
					&& (!!xmlrequest.responseXML.getElementsByTagName("flag")[0].childNodes[0])){
					flag  = xmlrequest.responseXML.getElementsByTagName("flag")[0].childNodes[0].nodeValue
					if(flag == "Please enter Violation Number") flag = "Please enter an Invoice or Violation Number";
				}
				if((!!xmlrequest.responseXML.getElementsByTagName("property")) 
					&& (!!xmlrequest.responseXML.getElementsByTagName("property")[0])
					&& (!!xmlrequest.responseXML.getElementsByTagName("property")[0].childNodes[0])){
					property = xmlrequest.responseXML.getElementsByTagName("property")[0].childNodes[0].nodeValue
				}
				if(flag!=null && property!=null){
					if(property=='invoiceNumber'){
						property = 'invViolNum';
					}
					var $element = $(document.getElementById(property));
					var $ttelement = $(document.getElementById('tt_'+property));
					if(flag==" "){
						$element.removeClass("has-error").removeClass("has-success").addClass("has-success");
						$ttelement.prop('title', flag);
						$ttelement.tooltipster();
						$ttelement.tooltipster('destroy');
					}else{
						$element.removeClass("has-error").removeClass("has-success").addClass("has-error");
						$ttelement.prop('title', flag);
						$ttelement.tooltipster({position: 'bottom',animation:'grow',onlyOne:true,timer:1000});
						$ttelement.tooltipster('show');
					}
				}
				xmlrequest = null;
			}
		}
	}
}
function processValidation(){
	if(!!xmlrequest){
		var flag = "";
		var property = "";
		if ( xmlrequest.readyState == 4 ){
			if ( xmlrequest.status == 200 ){
				if((!!xmlrequest.responseXML.getElementsByTagName("flag")) 
					&& (!!xmlrequest.responseXML.getElementsByTagName("flag")[0])
					&& (!!xmlrequest.responseXML.getElementsByTagName("flag")[0].childNodes[0])){
					flag  = xmlrequest.responseXML.getElementsByTagName("flag")[0].childNodes[0].nodeValue
				}
				if((!!xmlrequest.responseXML.getElementsByTagName("property")) 
					&& (!!xmlrequest.responseXML.getElementsByTagName("property")[0])
					&& (!!xmlrequest.responseXML.getElementsByTagName("property")[0].childNodes[0])){
					property = xmlrequest.responseXML.getElementsByTagName("property")[0].childNodes[0].nodeValue
				}
				if(flag!=null && property!=null){
					var $element = $(document.getElementById(property));
					var $ttelement = $(document.getElementById('tt_'+property));
					if(flag==" "){
						$element.removeClass("has-error").removeClass("has-success").addClass("has-success");
						$ttelement.prop('title', flag);
						$ttelement.tooltipster();
						$ttelement.tooltipster('destroy');
					}else{
						$element.removeClass("has-error").removeClass("has-success").addClass("has-error");
						$ttelement.prop('title', flag);
						$ttelement.tooltipster({position: 'bottom',animation:'grow',onlyOne:true,timer:1000});
						$ttelement.tooltipster('show');
					}
				}
				xmlrequest = null;
			}
		}
	}
}

if (typeof String.prototype.endsWith != 'function') {
  String.prototype.endsWith = function (str){
    return this.slice(-str.length) == str;
  };
}
if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function (str){
    return this.slice(0, str.length) == str;
  };
}

function documentready(){
	if($('.chatbox').length==0){
		if (top != self){
			top.location=self.location;
		}
	}	
	changeInputTypes();
	
	$('input, textarea').attr('autocomplete', 'off');
		$('input, textarea').each(function(){
		var onblurfnct=$(this).attr('onblur');
		$(this).attr('onblur','');
		$(this).placeholder();
		$(this).attr('onblur',onblurfnct);
	});
	
	$('[data-toggle=offcanvas]').click(function () {
		$('.row-offcanvas').toggleClass('active')
	});
	$('.panels-05').respcarousel({ overflow: true, visible: 2, itemMinWidth: 150, itemMargin: 20 });
	$(".imgLiquidFill").imgLiquid({fill:true,horizontalAlign:'bottom',verticalAlign:'center'});
	$(".imgLiquidFillTop").imgLiquid({fill:true,horizontalAlign:'top',verticalAlign:'center'});
	$(".imgLiquidNoFill").imgLiquid({fill:false});
	$('#horizontalTab').responsiveTabs({startCollapsed: 'accordion',  collapsible: 'accordion',  rotate: false, setHash: false, animation: 'fade', active: 0  });
	if(!!document.getElementById("currDate"))document.getElementById("currDate").innerHTML = getCurrentDate();
	$('.image-link').magnificPopup({
		type: 'image',
          closeOnContentClick: true,
          closeBtnInside: false,
          fixedContentPos: true
	});
	
	
	var config = {
      '.chosen-select'           : {}
    }
    for (var selector in config) {
      $(selector).chosen(config[selector]);
    }
	$('input').iCheck({
        checkboxClass: 'icheckbox_minimal',
        radioClass: 'iradio_minimal'
    });
	$('.righttip').tooltipster({position: 'right',animation:'grow',onlyOne:true});
	$('.imagetip').each(function(){
		var imgTips,imglen,imgi;
		var str="";
		imgTips = $(this).attr("title").split(",");
		imglen = imgTips.length;
		for (imgi = 0; imgi < imglen; imgi++) {
			str = str+"<img height='100em' width='100em' src='" + imgTips[imgi] +"'>";
		}
		
		$(this).tooltipster({
			position: 'right',animation:'grow',onlyOne:true,
			content: function() {
							return str;
						}
		}); 
	});
	
	$('.chat_image').click(function () {
		window.open('../support/livechat.shtml', 'chat', 'left=20,right=20,bottom=20,top=20,width=680,height=700');
	});
	var options = {
		"backdrop" : "static"
	}
	$('#basicModal').modal(options);


	if(!!$('.feedback-inner > span') && $('.feedback-inner > span').text().trim()==""){
		$('.feedback-inner').css('display','none');
	}
	
	$('form').submit(function(){
      	$(this).find('input, textarea').each(remove);
      	//openLoading();
    });
      
    function openLoading(){
      	$('#dialog-loading').modal('show');
      	var opts = {
		  lines: 13, // The number of lines to draw
		  length: 0, // The length of each line
		  width: 10, // The line thickness
		  radius: 30, // The radius of the inner circle
		  corners: 1, // Corner roundness (0..1)
		  rotate: 0, // The rotation offset
		  direction: 1, // 1: clockwise, -1: counterclockwise
		  color: '#fff', // #rgb or #rrggbb or array of colors
		  speed: 1.1, // Rounds per second
		  trail: 60, // Afterglow percentage
		  shadow: false, // Whether to render a shadow
		  hwaccel: false, // Whether to use hardware acceleration
		  className: 'spinner', // The CSS class to assign to the spinner
		  zIndex: 2e9 // The z-index (defaults to 2000000000)
		};
		var spinner = new Spinner(opts).spin();
		$('#spinner').html(spinner.el);
    }
      

	$('a').on('click',function(){
		if($(this).attr('target')== '_blank' 
			|| $(this).attr('href').startsWith('#')
			||  $(this).hasClass("linkext")){
			return;
		}
		openLoading();
	});
	$('button').on('click',function(){
		if(($(this).attr('type')== 'submit' 
			|| $(this).attr('value')=='1')
			&& (!$(this).hasClass("linkext"))){
			openLoading();
		}
	});
	  
	function remove() {
	    //if($(this).val() === $(this).attr('placeholder')){
	    //  $(this).val('').removeClass('placeholder');
	    //}
	    $(this).attr('onblur','');
	}
	
	/* Showing link to mobile site, only if the device is mobile*/
	if(/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge|maemo|meego.+mobile|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent||navigator.vendor||window.opera)
		||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
		.test((navigator.userAgent||navigator.vendor||window.opera).substr(0,4))){$('.mobile_only').show();}else{$('.mobile_only').hide();};

}

window.onunload = function(){};

var waitForFinalEvent = (function () {
  var timers = {};
  return function (callback, ms, uniqueId) {
	if (!uniqueId) {
	  uniqueId = "Don't call this twice without a uniqueId";
	}
	if (timers[uniqueId]) {
	  clearTimeout (timers[uniqueId]);
	}
	timers[uniqueId] = setTimeout(callback, ms);
  };
})();

if (typeof String.prototype.startsWith != 'function') {
  // see below for better implementation!
  String.prototype.startsWith = function (str){
    return this.indexOf(str) == 0;
  };
}
function createCookie(name,cookVal,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}else {
		var expires = "";
	}
	document.cookie = name+"="+cookVal+expires+"; path=/";
}
function eraseCookie(name) {
	createCookie(name,"",-1);
}

function changeInputTypes(){	
	$("input[class^='to-type-'],input[class*=' to-type-']").each(function(index,element){
		var type = (this.className.match(/to-type-\w*/)[0]).split('-')[2];
		$(this).attr('type',type);
	});
}