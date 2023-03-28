export class SlideGesture {
  constructor(el, touchActions){
    this.el = el;
    this.touchActions = touchActions;
    this.startX = 0;
    this.startY = 0;
    this.lastTotalX = 0;
    this.lastTotalY = 0;
  }

  addListener(callback) {
    this.el.addEventListener("pointerdown", this.handleEvt.bind(this));
    this.el.addEventListener("pointermove", this.handleEvt.bind(this));
    this.el.addEventListener("pointerup", this.handleEvt.bind(this));
    this.el.addEventListener("pointercancel", this.handleEvt.bind(this));
    window.addEventListener("touchmove", this.handleScroll.bind(this), {passive:false});
    this.el.style.touchAction = 'pan-y';
    this.callback = callback;
  }

  removeListener() {
    this.el.removeEventListner("pointerdown", this.handleEvt.bind(this));
    this.el.removeEventListner("pointermove", this.handleEvt.bind(this));
    this.el.removeEventListner("pointerup", this.handleEvt.bind(this));
    this.el.removeEventListner("pointercancel", this.handleEvt.bind(this));
    window.removeEventListner("touchmove", this.handleScroll.bind(this));
    this.el.style.touchAction = null;
    this.callback = null;
  }

  handleScroll(evt) {
    // console.log('S handleScroll', evt.type, evt);
    if(this.shouldPreventScroll){
      evt.preventDefault();
    }
  }

  handleEvt(evt) {  
    if (evt.type === 'pointerdown') {
      this.el.setPointerCapture(evt.pointerId);
      this.startX = evt.pageX;
      this.startY = evt.pageY;
    }

    if (el.hasPointerCapture(evt.pointerId) && evt.type !== 'pointercancel' && (typeof this.callback) === 'function') {
      const relativeX = evt.pageX - this.startX;
      const relativeY = evt.pageY - this.startY;

      if ( Math.abs(relativeX / relativeY) > 1 ) {
        // console.log("Stopped.");
        this.shouldPreventScroll = true;
      }

      this.callback(evt, {
        startX: this.startX,
        startY: this.startY,
        relativeX,
        relativeY,
        totalX: relativeX + this.lastTotalX,
        totalY: relativeY + this.lastTotalY,
      });
    }
  
    if (evt.type === 'pointerup') {
      this.lastTotalX = + this.lastTotalX + evt.pageX - this.startX;
      this.lastTotalY = + this.lastTotalY + evt.pageY - this.startY;
      this.el.releasePointerCapture(evt.pointerId);
      this.shouldPreventScroll = false;
    }

    if (evt.type === 'pointercancel') {
      this.callback(evt, {
        startX: this.startX,
        startY: this.startY,
        relativeX: 0,
        relativeY: 0,
        totalX: this.lastTotalX,
        totalY: this.lastTotalY,
      });
      this.el.releasePointerCapture(evt.pointerId);
      this.shouldPreventScroll = false;
    }
  }
}
