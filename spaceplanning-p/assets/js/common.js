
var spWindow = 559;
var tbWindow = 959;

$(function() {

	//page-fade
	var loadingImg = $(".loading-img");
	loadingImg.fadeOut(400,contFadeIn);
	function contFadeIn(){
		$("#contents-wrap").addClass('fade-in');
	}

	var headerGnavPcList = $(".header-gnav-pc-list");
	var underPageTtl = $(".page-ttl");

	//windowサイズ取得
	var windowWidth = document.documentElement.clientWidth;
	if(windowWidth <= spWindow) {
		//画面サイズ559以下
		setTimeout(function(){
			underPageTtl.addClass('fade-in');
		},800);

		$(window).scroll(function (){
			$('.fadein').each(function(){
				var elemPos = $(this).offset().top,
					scroll = $(window).scrollTop(),
					windowHeight = $(window).height();
				if (scroll > elemPos - windowHeight + 120){
					$(this).addClass('scrollin');
				}
			});
		});

	} else if (windowWidth <= tbWindow) {
		//画面サイズ959以下
		setTimeout(function(){
			underPageTtl.addClass('fade-in');
		},1000);

		$(window).scroll(function (){
			$('.fadein').each(function(){
				var elemPos = $(this).offset().top,
					scroll = $(window).scrollTop(),
					windowHeight = $(window).height();
				if (scroll > elemPos - windowHeight + 250){
					$(this).addClass('scrollin');
				}
			});
		});

	} else {
		//画面サイズ960以上
		setTimeout(function(){
			headerGnavPcList.addClass('fade-in');
		},1100);
		setTimeout(function(){
			underPageTtl.addClass('fade-in');
		},1000);

		$(window).scroll(function (){
			$('.fadein').each(function(){
				var elemPos = $(this).offset().top,
					scroll = $(window).scrollTop(),
					windowHeight = $(window).height();
				if (scroll > elemPos - windowHeight + 350){
					$(this).addClass('scrollin');
				}
			});
		});
	}

	


	//メニューボタン
	var menuFlag = false;
	$(".menu-trigger").click(function(){
		$(this).toggleClass("active");
		if($(this).hasClass("active")) {
			$(".slide-menu-nav").addClass("open");
		} else {
			$(".slide-menu-nav").removeClass("open");
		}
		return false;
	})

	//ページ内リンク
	$('a[href^=#]').click(function() {
		var speed = 1000;
		var href= $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
	});

    
});