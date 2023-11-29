"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _config = require("./config");
var _hooks = require("./hooks");
var _Snowflake = require("./Snowflake");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var Snowfall = function Snowfall() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? _Snowflake.defaultConfig.color : _ref$color,
    _ref$changeFrequency = _ref.changeFrequency,
    changeFrequency = _ref$changeFrequency === void 0 ? _Snowflake.defaultConfig.changeFrequency : _ref$changeFrequency,
    _ref$radius = _ref.radius,
    radius = _ref$radius === void 0 ? _Snowflake.defaultConfig.radius : _ref$radius,
    _ref$speed = _ref.speed,
    speed = _ref$speed === void 0 ? _Snowflake.defaultConfig.speed : _ref$speed,
    _ref$wind = _ref.wind,
    wind = _ref$wind === void 0 ? _Snowflake.defaultConfig.wind : _ref$wind,
    _ref$rotationSpeed = _ref.rotationSpeed,
    rotationSpeed = _ref$rotationSpeed === void 0 ? _Snowflake.defaultConfig.rotationSpeed : _ref$rotationSpeed,
    _ref$opacity = _ref.opacity,
    opacity = _ref$opacity === void 0 ? _Snowflake.defaultConfig.opacity : _ref$opacity,
    _ref$snowflakeCount = _ref.snowflakeCount,
    snowflakeCount = _ref$snowflakeCount === void 0 ? 150 : _ref$snowflakeCount,
    images = _ref.images,
    style = _ref.style;
  var mergedStyle = (0, _hooks.useSnowfallStyle)(style);
  var canvasRef = (0, _react.useRef)(null);
  var canvasSize = (0, _hooks.useComponentSize)(canvasRef);
  var animationFrame = (0, _react.useRef)(0);
  var lastUpdate = (0, _react.useRef)(Date.now());
  var config = (0, _hooks.useDeepMemo)({
    color: color,
    changeFrequency: changeFrequency,
    radius: radius,
    speed: speed,
    wind: wind,
    rotationSpeed: rotationSpeed,
    images: images,
    opacity: opacity
  });
  var snowflakes = (0, _hooks.useSnowflakes)(canvasRef, snowflakeCount, config);
  var render = (0, _react.useCallback)(function () {
    var framesPassed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var canvas = canvasRef.current;
    if (canvas) {
      // Update the positions of the snowflakes
      snowflakes.forEach(function (snowflake) {
        return snowflake.update(canvas, framesPassed);
      });

      // Render them if the canvas is available
      var ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
        snowflakes.forEach(function (snowflake) {
          return snowflake.draw(ctx);
        });
      }
    }
  }, [snowflakes]);
  var loop = (0, _react.useCallback)(function () {
    // Update based on time passed so that a slow frame rate won't slow down the snowflake
    var now = Date.now();
    var msPassed = Date.now() - lastUpdate.current;
    lastUpdate.current = now;

    // Frames that would have passed if running at 60 fps
    var framesPassed = msPassed / _config.targetFrameTime;
    render(framesPassed);
    animationFrame.current = requestAnimationFrame(loop);
  }, [render]);
  (0, _react.useEffect)(function () {
    loop();
    return function () {
      return cancelAnimationFrame(animationFrame.current);
    };
  }, [loop]);
  return /*#__PURE__*/_react["default"].createElement("canvas", {
    ref: canvasRef,
    height: canvasSize.height,
    width: canvasSize.width,
    style: mergedStyle,
    "data-testid": "SnowfallCanvas"
  });
};
var _default = exports["default"] = Snowfall;
//# sourceMappingURL=Snowfall.js.map