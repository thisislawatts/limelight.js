/* global jQuery, document */
"use strict";

var limeLightItems = [];

var LimeLight = function($el) {
  this.$el = $el;

  this.positionX = this.$el.offset().left;
  this.positionY = this.$el.offset().top;

  // Debugging
  //   document.body.append(
  //     '<div style="position: fixed; top: ' + this.positionX + '">Text</div>'
  //   );

  return this;
};

LimeLight.prototype.updatePosition = function(argument) {
  this.positionX = this.$el.offset().left;
  this.positionY = this.$el.offset().top;
};

jQuery("[data-limelight]").each(function() {
  limeLightItems.push(new LimeLight(jQuery(this)));
});

function LimeLightEval() {
  for (var i = limeLightItems.length - 1; i >= 0; i--) {
    var item = limeLightItems[i];

    if (document.body.scrollTop + window.innerHeight * 0.75 > item.positionY) {
      item.$el.addClass("ll__focus");
    } else {
      item.$el.removeClass("ll__focus");
    }
  }

  window.requestAnimationFrame(LimeLightEval);
}

LimeLightEval();
