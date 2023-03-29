import { SlideGesture } from './node_modules/@nicufarmache/slide-gesture/index.js';

const el = document.getElementById("el");
const handler = (evt, extra) => {

  console.log('Main handleEvt', evt.type, extra.totalX, evt.pageX, extra);

  el.style.transform =`translate(${extra.totalX}px, 0px)`;

  if (evt.type === 'pointerdown') {
    el.classList.add('moving');
    evt.preventDefault();
  }

  if (evt.type === 'pointermove') {

  }

  if (evt.type === 'pointerup') {
    setTimeout(() => {
      el.classList.remove('moving');
      el.classList.remove('canceled');
    }, 50);
  }

  if (evt.type === 'pointercancel') {
    el.classList.add('canceled');
    setTimeout(() => {
      el.classList.remove('moving');
      el.classList.remove('canceled');
    }, 50);
  }
};

const slideGesture = new SlideGesture(el, handler, { touchActions: 'pan-y', stopScrollDirection: 'horizontal' });




