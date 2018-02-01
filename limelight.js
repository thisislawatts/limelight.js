var limeLightItems = [];

var LimeLight = function(el) {
  "use strict";

  var _self = this;

  _self.el = el;

  _self.el.classList.add("ll__active");

  _self.positionX = _self.el.offsetLeft;
  _self.positionY = _self.el.offsetTop;

  if (_self.IS_DEBUG) {
    _self.d = document.createElement("div");
    _self.d.setAttribute(
      "style",
      `position: absolute; top: ${_self
        .positionY}px; left: 0; z-index: 99; background: lime; padding: .25em .5em;`
    );
    _self.d.innerHTML = `Pos: ${_self.positionY}px`;
    document.body.appendChild(_self.d);
  }
  return _self;
};

LimeLight.prototype.updatePosition = function() {
  this.positionX = this.el.offsetLeft;
  this.positionY = this.el.offsetTop;

  if (this.IS_DEBUG) {
    this.d.setAttribute(
      "style",
      `position: absolute; top: ${this
        .positionY}px; left: 0; z-index: 99; background: lime; padding: .25em .5em;`
    );
  }
};

var llElements = document.querySelectorAll("[data-limelight]");

llElements.forEach(el => limeLightItems.push(new LimeLight(el)));

function LimeLightEval() {
  var y =
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0;

  for (var i = limeLightItems.length - 1; i >= 0; i--) {
    var item = limeLightItems[i];

    if (y + window.innerHeight > item.positionY) {
      item.el.classList.add("ll__focus");
    } else {
      item.el.classList.remove("ll__focus");
    }
  }

  window.requestAnimationFrame(LimeLightEval);
}

LimeLightEval();
