

var spWindow = 559;
var tbWindow = 959;


$(function() {


	//windowサイズ取得
	var windowWidth = document.documentElement.clientWidth;
	if(windowWidth <= spWindow) {
		//画面サイズ559以下（sp）

		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);


	} else if (windowWidth > spWindow && windowWidth <= tbWindow) {
		//画面サイズ959以下（tb）

		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		
	} else {
		//画面サイズ960以上（pc）
		window.addEventListener('resize', () => {
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		});

	}

});





