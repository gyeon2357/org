

var spWindow = 559;
var tbWindow = 959;


$(function() {

	
	$('.main-visual-slide').bxSlider({
		mode: 'fade',
		auto: true,
		speed: 4000,
		pause: 7000,
		pager: false,
		controls: false,
		touchEnabled: false,
	});

	//typo N
	var mainVisualScriptPC = new Vivus('move', {
		type: 'delayed',
		start: 'manual',
		duration: 600,
		forceRender: false,
		pathTimingFunction: Vivus.EASE_OUT
	})

	//lazy load
	var headerLogo = $(".header-logo");
	var headerGnavPcList = $(".header-gnav-pc-list");
	var mainVisualCopy = $(".main-visual-copy");

	//windowサイズ取得
	var windowWidth = document.documentElement.clientWidth;
	if(windowWidth <= spWindow) {
		//画面サイズ559以下（sp）
		setTimeout(function(){
			headerLogo.addClass('fade-in');
		},900);
		setTimeout(function(){
			mainVisualCopy.addClass('fade-in');
		},1300);

		setTimeout(function(){
			mainVisualScriptPC.play();
		},2200);


		//Projectsスライド
		var slider1 = new Swiper ('.slider1', {
			effect: 'slide',
			width: 230,
			slidesPerView: 'auto',
			loop: true,
			navigation: {
				nextEl: '.swiper-left-btn',
				prevEl: '.swiper-right-btn',
			},
		});

		//スライドイメージエリア
		$('.slide-img01').bxSlider({
			minSlides: 6,
			maxSlides: 6,
			slideWidth: 330,
			ticker: true,
			speed: 80000,
		});

		$(window).scroll(function (){
			var keyVisualHeight = $("#header").height();
			if (keyVisualHeight - 30 < $(this).scrollTop()) {
				$(".menu-trigger").addClass("menu-color-black");
			} else {
				$(".menu-trigger").removeClass("menu-color-black");
			}
		});

	} else if (windowWidth > spWindow && windowWidth <= tbWindow) {
		//画面サイズ959以下（tb）
		setTimeout(function(){
			headerLogo.addClass('fade-in');
		},700);
		setTimeout(function(){
			mainVisualCopy.addClass('fade-in');
		},1300);

		setTimeout(function(){
			mainVisualScriptPC.play();
		},2200);


		//Projectsスライド
		var slider1 = new Swiper ('.slider1', {
			effect: 'slide',
			width: 280,
			slidesPerView: 'auto',
			loop: true,
			navigation: {
				nextEl: '.swiper-left-btn',
				prevEl: '.swiper-right-btn',
			},
		});

		//スライドイメージエリア
		$('.slide-img01').bxSlider({
			minSlides: 6,
			maxSlides: 6,
			slideWidth: 380,
			ticker: true,
			speed: 80000,
		});

		$(window).scroll(function (){
			var keyVisualHeight = $("#header").height();
			if (keyVisualHeight - 30 < $(this).scrollTop()) {
				$(".menu-trigger").addClass("menu-color-black");
			} else {
				$(".menu-trigger").removeClass("menu-color-black");
			}
		});
		
	} else {
		//画面サイズ960以上（pc）
		setTimeout(function(){
			headerLogo.addClass('fade-in');
		},600);
		setTimeout(function(){
			mainVisualCopy.addClass('fade-in');
		},1300);

		setTimeout(function(){
			mainVisualScriptPC.play();
		},2200);


		//Projectsスライド
		var slider1 = new Swiper ('.slider1', {
			effect: 'slide',
			width: 430,
			slidesPerView: 'auto',
			loop: true,
			navigation: {
				nextEl: '.swiper-left-btn',
				prevEl: '.swiper-right-btn',
			},
		});

		//スライドイメージエリア
		$('.slide-img01').bxSlider({
			minSlides: 6,
			maxSlides: 6,
			slideWidth: 700,
			ticker: true,
			speed: 160000,
		});

		$(window).scroll(function (){
			
		});
		
	}

});





