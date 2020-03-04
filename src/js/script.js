(function() {
  "use strict";
  var displayBackground = document.querySelector("#display-background");
  var elementDisplayBackground = document.querySelector(
    "#element-display-background"
  );
  var backgroundInputColor = document.querySelector("#background-color-input");
  var elementInputColor = document.querySelector(
    "#element-background-color-input"
  );
  var hOffsetSlider = document.querySelector("#h-offset-slider");
  var hOffsetInput = document.querySelector("#h-offset-input");
  var vOffsetSlider = document.querySelector("#v-offset-slider");
  var vOffsetInput = document.querySelector("#v-offset-input");
  var blurSlider = document.querySelector("#blur-slider");
  var blurInput = document.querySelector("#blur-input");
  var spreadSlider = document.querySelector("#spread-slider");
  var spreadInput = document.querySelector("#spread-input");
  var opacitySlider = document.querySelector("#opacity-slider");
  var opacityInput = document.querySelector("#opacity-input");
  var shadowInputColor = document.querySelector("#shadow-color-input");
  var resetButton = document.querySelector("#reset-button");
  var boxShadowCode = document.querySelector("#box-shadow-code");
  var filterShadowCode = document.querySelector("#filter-shadow-code");
  var boxShadowCopyButton = document.querySelector("#box-shadow-copy-button");
  var filterCopyButton = document.querySelector("#filter-copy-button");

  var backgroundColor = "#ffffff";
  var elementBackgroundColor = "#bbbbbb";
  var hOffset = hOffsetSlider.value;
  var vOffset = vOffsetSlider.value;
  var blur = blurSlider.value;
  var spread = spreadSlider.value;
  var shadowColor = "#000000";
  var opacity = 1;

  window.addEventListener("load", startup, false);
  backgroundInputColor.addEventListener("input", setBackgroundColor, false);
  elementInputColor.addEventListener("input", setElementBackgroundColor, false);
  hOffsetSlider.addEventListener("input", setHOffset, false);
  hOffsetInput.addEventListener("input", setHOffset, false);
  vOffsetSlider.addEventListener("input", setVOffset, false);
  vOffsetInput.addEventListener("input", setVOffset, false);
  blurSlider.addEventListener("input", setBlur, false);
  blurInput.addEventListener("input", setBlur, false);
  spreadSlider.addEventListener("input", setSpread, false);
  spreadInput.addEventListener("input", setSpread, false);
  opacitySlider.addEventListener("input", setOpacity, false);
  opacityInput.addEventListener("input", setOpacity, false);
  shadowInputColor.addEventListener("input", setShadowColor, false);
  resetButton.addEventListener("click", resetButtonClick, false);
  boxShadowCopyButton.addEventListener("click", copyButtonClick, false);
  filterCopyButton.addEventListener("click", copyButtonClick, false);

  function startup() {
    resetButtonClick();
  }

  function setBackgroundColor(e) {
    backgroundColor = e.target.value;
    displayBackground.style.backgroundColor = backgroundColor;
  }

  function setElementBackgroundColor(e) {
    elementBackgroundColor = e.target.value;
    elementDisplayBackground.style.backgroundColor = elementBackgroundColor;
  }

  function setHOffset(e) {
    hOffset = e.target.value;
    hOffsetSlider.value = hOffset;
    hOffsetInput.value = hOffset;
    boxShadow();
  }

  function setVOffset(e) {
    vOffset = e.target.value;
    vOffsetSlider.value = vOffset;
    vOffsetInput.value = vOffset;
    boxShadow();
  }

  function setBlur(e) {
    blur = e.target.value;
    blurSlider.value = blur;
    blurInput.value = blur;
    boxShadow();
  }

  function setSpread(e) {
    spread = e.target.value;
    spreadSlider.value = spread;
    spreadInput.value = spread;
    boxShadow();
  }

  function setOpacity(e) {
    opacity = e.target.value;
    opacitySlider.value = opacity;
    opacityInput.value = opacity;
    boxShadow();
  }

  function setShadowColor(e) {
    shadowColor = e.target.value;
    boxShadow();
  }

  function hexToRgba(hexColor, opacity) {
    var r, g, b;
    var _opacity;
    if (opacity < 1 && opacity >= 0) {
      _opacity = opacity;
    } else {
      _opacity = 1;
    }
    r = parseInt(hexColor.substring(1, 3), 16);
    g = parseInt(hexColor.substring(3, 5), 16);
    b = parseInt(hexColor.substring(5, 7), 16);
    if (_opacity === 1) {
      return "rgb(" + r + ", " + g + ", " + b + ")";
    } else {
      return "rgba(" + r + ", " + g + ", " + b + ", " + _opacity + ")";
    }
  }

  function boxShadow() {
    var boxShadowProperty =
      hOffset +
      "px " +
      vOffset +
      "px " +
      blur +
      "px " +
      spread +
      "px " +
      hexToRgba(shadowColor, opacity);
    var filterShadowProperty =
      "drop-shadow(" +
      hOffset +
      "px " +
      vOffset +
      "px " +
      blur +
      "px " +
      spread +
      "px " +
      hexToRgba(shadowColor, opacity);

    elementDisplayBackground.style.boxShadow = boxShadowProperty;
    boxShadowCode.innerHTML = "box-shadow: " + boxShadowProperty;
    filterShadowCode.innerHTML = "filter: " + filterShadowProperty;
  }

  function resetButtonClick() {
    hOffsetSlider.value = 0;
    hOffsetInput.value = 0;
    hOffset = 0;
    vOffsetSlider.value = 0;
    vOffsetInput.value = 0;
    vOffset = 0;
    blurSlider.value = 0;
    blurInput.value = 0;
    blur = 0;
    spreadSlider.value = 0;
    spreadInput.value = 0;
    spread = 0;
    opacitySlider.value = 1;
    opacityInput.value = 1;
    opacity = 1;
    shadowColor = "#000000";
    shadowInputColor.value = "#000000";

    boxShadow();
  }

  function copyButtonClick(e) {
    var targetText;
    var range;

    if (e.target.id === "box-shadow-copy-button") {
      targetText = boxShadowCode;
    } else {
      targetText = filterShadowCode;
    }

    if (document.selection) {
      range = document.body.createTextRange();
      range.moveToElementText(targetText);
      range.select().createTextRange();
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
    } else if (window.getSelection) {
      range = document.createRange();
      range.selectNode(targetText);
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
    }
  }
})();
