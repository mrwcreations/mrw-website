$(document).ready(function(){
	function openlink(url){
		window.open(url, '_blank');
	}
	$('.customer-logos').slick({
		slidesToShow: 6,
		slidesToScroll: 6,
		autoplay: true,
		autoplaySpeed: 3000,
		arrows: false,
		dots: false,
		pauseOnHover: true,
			responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow: 4
			}
		}, {
			breakpoint: 520,
			settings: {
				slidesToShow: 3
			}
		}]
	});
});