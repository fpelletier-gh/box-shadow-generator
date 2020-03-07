(function() {
  "use strict";
  var displayBackground = document.querySelector("#display-background");
  var elementDisplayBackground = document.querySelector(
    "#element-display-background"
  );
  var boxShadowCode = document.querySelector("#box-shadow-code");
  var filterShadowCode = document.querySelector("#filter-shadow-code");
  var inputs = [];
  var config = {
    hOffset: 0,
    vOffset: 0,
    blur: 0,
    spread: 0,
    opacity: 1,
    shadowColor: "#000000",
    backgroundColor: "#ffffff",
    elementBackgroundColor: "#b5b5b5",
    hexToRgba(hexColor, opacity) {
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
    },
    boxShadowStyle() {
      var style =
        this.hOffset +
        "px " +
        this.vOffset +
        "px " +
        this.blur +
        "px " +
        this.spread +
        "px " +
        this.hexToRgba(this.shadowColor, this.opacity);
      return style;
    },
    boxShadowCode() {
      return "box-shadow: " + this.boxShadowStyle();
    },
    filterShadowCode() {
      return "filter: " + this.boxShadowStyle();
    }
  };

  window.addEventListener("load", startup, false);

  function startup() {
    inputs = addEventAll("input", ".js-input", handleInputEvent);
    addEventAll("click", ".button", handleClickEvent);
    reset();
  }

  function selectAll(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector));
  }

  function addEventAll(type, _selector, event) {
    var selectors = selectAll(_selector);
    selectors.forEach(function(selector) {
      selector.addEventListener(type, event, false);
    });
    return selectors;
  }

  function handleInputEvent(e) {
    var name = e.target.dataset.input;
    var value = e.target.value;
    var elem = e.target;
    setProperty(name, value);
    updateInput(elem, value);
  }

  function setProperty(name, value) {
    config[name] = value;
    updateDisplay(name);
  }

  function updateInput(element, value) {
    if (
      element.nextElementSibling &&
      element.nextElementSibling.localName === "input"
    ) {
      element.nextElementSibling.value = value;
    } else if (
      element.previousElementSibling &&
      element.previousElementSibling.localName === "input"
    ) {
      element.previousElementSibling.value = value;
    }
  }

  function updateDisplay(element) {
    if (element === "backgroundColor") {
      displayBackground.style.backgroundColor = config[element];
    } else if (element === "elementBackgroundColor") {
      elementDisplayBackground.style.backgroundColor = config[element];
    } else {
      elementDisplayBackground.style.boxShadow = config.boxShadowStyle();
      boxShadowCode.innerHTML = config.boxShadowCode();
      filterShadowCode.innerHTML = config.filterShadowCode();
    }
  }

  function reset() {
    config.hOffset = 0;
    config.vOffset = 0;
    config.blur = 0;
    config.spread = 0;
    config.opacity = 1;
    config.shadowColor = "#000000";
    config.backgroundColor = "#ffffff";
    config.elementBackgroundColor = "#b5b5b5";

    inputs.forEach(function(input) {
      var data = input.dataset.input;
      input.value = config[data];
    });

    updateDisplay("");
    updateDisplay("backgroundColor");
    updateDisplay("elementBackgroundColor");
  }

  function handleClickEvent(e) {
    if (e.target.classList.contains("copy-button")) {
      copyButtonClick(e.target.previousElementSibling);
    } else if ((e.target.id = "reset-button")) {
      reset();
    }
  }

  function copyButtonClick(targetText) {
    var range;
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
