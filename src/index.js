import showPass from "./js/show-pass";
import fancybox from "./js/fancybox";
import listing from './js/listing';
import rangeSlider from './js/range-slider';
import theme from './js/theme';
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
})

window.addEventListener('toggleclose', (event) => {
	if (event.detail.target.id == 'categories-form') {
		document.body.classList.remove('categories-search-open')
	}
	if (event.detail.target.classList.contains('-menu-')) {
		document.body.classList.remove('menu-open')
	}
})