$(() => {
	// Ширина окна для ресайза
	WW = $(window).width()


	// Аккордион
	$('body').on('click', '.accordion .accordion_item .head', function (e) {
		e.preventDefault()

		const $item = $(this).closest('.accordion_item'),
			$accordion = $(this).closest('.accordion')

		if ($item.hasClass('active')) {
			$item.removeClass('active').find('.data').slideUp(500)
		} else {
			$accordion.find('.accordion_item').removeClass('active')
			$accordion.find('.data').slideUp(500)

			$item.addClass('active').find('.data').slideDown(500)
		}
	})


	// Портфолио
	var $masonry = $('.portfolio .masonry').isotope({
		itemSelector: '.item',
		percentPosition: true,
		getSortData: {
			sortIndex: '[data-sort]'
		},
		masonry: {
			columnWidth: '.item:not(.w2x)'
		}
	})

	$('.portfolio .filter .btn').click(function (e) {
		e.preventDefault()

		let filterValue = $(this).data('filter')

		$('.portfolio .filter .btn').removeClass('active')
		$(this).addClass('active')

		filterValue != '*'
			? $masonry.isotope({ filter: filterValue, sortBy: 'sortIndex' })
			: $masonry.isotope({ filter: filterValue, sortBy: 'original-order' })
	})


	// Моб. меню
	$('header .mob_menu_btn').click((e) => {
		e.preventDefault()

		if (!$('header .mob_menu_btn').hasClass('active')) {
			$('header .mob_menu_btn').addClass('active')
			$('header .menu').fadeIn(300)
		} else {
			$('header .mob_menu_btn').removeClass('active')
			$('header .menu').fadeOut(300)
		}
	})


	// Отправка форм
	$('body').on('submit', 'form.custom_submit', function (e) {
		e.preventDefault()

		Fancybox.close()

		Fancybox.show([{
			src: '#success_modal',
			type: 'inline'
		}])
	})
})



$(window).on('load', () => {
	// Параллакс
	$('.parallax').each(function () {
		let scene = document.getElementById($(this).attr('id')),
			parallax = new Parallax(scene)

		$(this).find('.layer').addClass('active')
	})
})



$(window).on('resize', () => {
	if (WW != $(window).width()) {
		// Моб. версия
		if (!fiestResize) {
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1, maximum-scale=1')
			if ($(window).width() < 360) $('meta[name=viewport]').attr('content', 'width=360, user-scalable=no')

			fiestResize = true
		} else {
			fiestResize = false
		}


		// Перезапись ширины окна
		WW = $(window).width()
	}
})



const initMap = () => {
	if ($('#map').length) {
		ymaps.ready(() => {
			let myMap = new ymaps.Map('map', {
				center: [55.728849, 37.644944],
				zoom: 16,
				controls: []
			})

			// Кастомный маркер
			let myPlacemark = new ymaps.Placemark([55.728849, 37.644944], {}, {
				iconLayout: 'default#image',
				iconImageHref: 'images/ic_map_marker.png',
				iconImageSize: [90, 90],
				iconImageOffset: [-45, -29]
			})

			myMap.geoObjects.add(myPlacemark)

			myMap.controls.add('zoomControl', {
				position: {
					right: '20px',
					top: '20px'
				}
			})

			myMap.behaviors.disable('scrollZoom')
		})
	}
}