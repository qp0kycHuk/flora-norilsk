import showPass from "./js/show-pass";
import fancybox from "./js/fancybox";
import listing from './js/listing';
import rangeSlider from './js/range-slider';
import theme from './js/theme';
import slideEvent from './js/slide-event';
import tab from 'npm-kit-tab';
import toggle from 'npm-kit-toggle';
import ripple from 'npm-kit-ripple';
import Swiper, { Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs, EffectFade, Lazy } from 'swiper';

import 'npm-kit-ripple/index.css';
import 'swiper/css';
import './ui/ui-reset.scss'
import './ui/ui-core.scss'
import './ui/ui-example.scss'
import './scss/frontend--fonts.scss'
import './scss/frontend--style.scss'

Swiper.use([Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs, EffectFade, Lazy]);
Swiper.defaults.touchStartPreventDefault = false
window.Swiper = Swiper
window.ripple = ripple
window.addEventListener('DOMContentLoaded', () => loadHandler())

function loadHandler() {
	fancybox.init();
	showPass.init();
	listing.init();
	rangeSlider.init()
	tab.init();
	toggle.init();
	ripple.init();
	theme.init();
	slideEvent.init();

	ripple.attach('.btn')
	ripple.attach('.card-action')
	ripple.attach('.waved')
	ripple.deAttach('.btn--link')
}



window.addEventListener('scroll', () => {
	const header = document.querySelector('.header');
	if (header.getBoundingClientRect().top <= -10) {
		header.classList.add('header--fixed')
	} else {
		header.classList.remove('header--fixed')

	}
})

window.addEventListener('toggleopen', (event) => {
	if (event.detail.target.id == 'categories-form') {
		document.body.classList.add('categories-search-open')
	}
	if (event.detail.target.classList.contains('-menu-')) {
		document.body.classList.add('menu-open')
	}
	if (event.detail.target.classList.contains('filter')) {
		document.body.classList.add('filter-open')
	}
})

window.addEventListener('toggleclose', (event) => {
	if (event.detail.target.id == 'categories-form') {
		document.body.classList.remove('categories-search-open')
	}
	if (event.detail.target.classList.contains('-menu-')) {
		document.body.classList.remove('menu-open')
	}
	if (event.detail.target.classList.contains('filter')) {
		document.body.classList.remove('filter-open')
	}
})


if (!!('ontouchstart' in window)) {
	window.addEventListener('swipemove', swipemoveHandler)
	window.addEventListener('swipeend', swipeendHandler)
}

function swipemoveHandler(event) {


	const menu = document.getElementById('menu')
	const shadow = document.getElementById('menu-shadow')

	if ((event.detail.startX > document.body.clientWidth * 0.25) && !menu.classList.contains('toggle-active')) {
		return
	}

	if (event.detail.startX < document.body.clientWidth * 0.75 && menu.classList.contains('toggle-active')) {
		return
	}

	let percent = 100 * event.detail.distX / document.body.clientWidth


	if (percent >= 100) {
		percent = 100
	}
	if (percent <= -100) {
		percent = -100
	}

	menu.style.transition = '0s';
	menu.style.setProperty('--transform', `translateX(${percent}%)`)
	if (percent > 0) {
		shadow.style.opacity = percent + '%';
	}

}

function swipeendHandler(event) {

	const menu = document.getElementById('menu')
	const shadow = document.getElementById('menu-shadow')

	if ((event.detail.startX > document.body.clientWidth * 0.25) && !menu.classList.contains('toggle-active')) {
		return
	}

	if (event.detail.startX < document.body.clientWidth * 0.75 && menu.classList.contains('toggle-active')) {
		return
	}

	if (event.detail.distX > 100) {
		setTimeout(() => {
			if (!menu.classList.contains('toggle-active')) {
				toggle.toggle('menu')
			}
		})
	}

	if (event.detail.distX < -100) {
		setTimeout(() => {
			if (menu.classList.contains('toggle-active')) {
				toggle.toggle('menu')
			}

		})
	}

	menu.style.transition = '';
	menu.style.setProperty('--transform', '')
	shadow.style.opacity = '';

}

