/* global jQuery */

var limeLightItems = [];

var LimeLight = function($el) {
  "use strict";

  var _self = this;

  this.$el = $el.addClass("ll__active");

  this.id = this.$el.attr("id");
  this.positionX = this.$el.offset().left;
  this.positionY = this.$el.offset().top;

  // Debugging
  this.IS_DEBUG = window.location.hostname.match(/dev$/);

  if (this.IS_DEBUG) {
    this.d = document.createElement("div");
    this.d.setAttribute(
      "style",
      `position: absolute; top: ${this
        .positionY}px; left: 0; z-index: 99; background: lime; padding: .25em .5em;`
    );
    this.d.innerHTML = `Pos: ${this.positionY}px ${this.id}`;
    document.body.appendChild(this.d);
  }

  setInterval(function() {
    _self.updatePosition();
  }, 1000);

  return this;
};

LimeLight.prototype.updatePosition = function(argument) {
  this.positionX = this.$el.offset().left;
  this.positionY = this.$el.offset().top;

  if (this.IS_DEBUG) {
    this.d.setAttribute(
      "style",
      `position: absolute; top: ${this
        .positionY}px; left: 0; z-index: 99; background: lime; padding: .25em .5em;`
    );
  }
};

jQuery("[data-limelight]").each(function() {
  limeLightItems.push(new LimeLight(jQuery(this)));
});

function LimeLightEval() {
  for (var i = limeLightItems.length - 1; i >= 0; i--) {
    var item = limeLightItems[i];

    for (var i = limeLightItems.length - 1; i >= 0; i--) {
      var item = limeLightItems[i];

      if (document.body.scrollTop + window.innerHeight > item.positionY) {
        item.$el.addClass("ll__focus");
      } else {
        item.$el.removeClass("ll__focus");
      }
    }
  }

  window.requestAnimationFrame(LimeLightEval);
}

LimeLightEval();
