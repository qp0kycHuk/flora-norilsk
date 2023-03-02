import AirDatepicker from 'air-datepicker';
import localeRu from 'air-datepicker/locale/ru';
import { isTouchDevice } from './functions/isTouchDevice';

window.AirDatepicker = AirDatepicker
window.AirDatepicker.defaultOptions = {
  locale: localeRu,
  dateFormat: 'dd.MM.yyyy',
  isMobile: isTouchDevice(),
  autoClose: true,

}

function init() {

}

export default { init }