function e(e) {
  return (
    null !== e &&
    "object" == typeof e &&
    "constructor" in e &&
    e.constructor === Object
  );
}
function t(s = {}, i = {}) {
  Object.keys(i).forEach((r) => {
    void 0 === s[r]
      ? (s[r] = i[r])
      : e(i[r]) && e(s[r]) && Object.keys(i[r]).length > 0 && t(s[r], i[r]);
  });
}
const s = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: "" },
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null,
  createEvent: () => ({ initEvent() {} }),
  createElement: () => ({
    children: [],
    childNodes: [],
    style: {},
    setAttribute() {},
    getElementsByTagName: () => [],
  }),
  createElementNS: () => ({}),
  importNode: () => null,
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
};
function i() {
  const e = "undefined" != typeof document ? document : {};
  return t(e, s), e;
}
const r = {
  document: s,
  navigator: { userAgent: "" },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle: () => ({ getPropertyValue: () => "" }),
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia: () => ({}),
  requestAnimationFrame: (e) =>
    "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0),
  cancelAnimationFrame(e) {
    "undefined" != typeof setTimeout && clearTimeout(e);
  },
};
function n() {
  const e = "undefined" != typeof window ? window : {};
  return t(e, r), e;
}
function a(e, t = 0) {
  return setTimeout(e, t);
}
function l() {
  return Date.now();
}
function o(e, t = "x") {
  const s = n();
  let i, r, a;
  const l = (function (e) {
    const t = n();
    let s;
    return (
      t.getComputedStyle && (s = t.getComputedStyle(e, null)),
      !s && e.currentStyle && (s = e.currentStyle),
      s || (s = e.style),
      s
    );
  })(e);
  return (
    s.WebKitCSSMatrix
      ? ((r = l.transform || l.webkitTransform),
        r.split(",").length > 6 &&
          (r = r
            .split(", ")
            .map((e) => e.replace(",", "."))
            .join(", ")),
        (a = new s.WebKitCSSMatrix("none" === r ? "" : r)))
      : ((a =
          l.MozTransform ||
          l.OTransform ||
          l.MsTransform ||
          l.msTransform ||
          l.transform ||
          l
            .getPropertyValue("transform")
            .replace("translate(", "matrix(1, 0, 0, 1,")),
        (i = a.toString().split(","))),
    "x" === t &&
      (r = s.WebKitCSSMatrix
        ? a.m41
        : 16 === i.length
        ? parseFloat(i[12])
        : parseFloat(i[4])),
    "y" === t &&
      (r = s.WebKitCSSMatrix
        ? a.m42
        : 16 === i.length
        ? parseFloat(i[13])
        : parseFloat(i[5])),
    r || 0
  );
}
function d(e) {
  return (
    "object" == typeof e &&
    null !== e &&
    e.constructor &&
    "Object" === Object.prototype.toString.call(e).slice(8, -1)
  );
}
function c(...e) {
  const t = Object(e[0]),
    s = ["__proto__", "constructor", "prototype"];
  for (let r = 1; r < e.length; r += 1) {
    const n = e[r];
    if (
      null != n &&
      ((i = n),
      !("undefined" != typeof window && void 0 !== window.HTMLElement
        ? i instanceof HTMLElement
        : i && (1 === i.nodeType || 11 === i.nodeType)))
    ) {
      const e = Object.keys(Object(n)).filter((e) => s.indexOf(e) < 0);
      for (let s = 0, i = e.length; s < i; s += 1) {
        const i = e[s],
          r = Object.getOwnPropertyDescriptor(n, i);
        void 0 !== r &&
          r.enumerable &&
          (d(t[i]) && d(n[i])
            ? n[i].__swiper__
              ? (t[i] = n[i])
              : c(t[i], n[i])
            : !d(t[i]) && d(n[i])
            ? ((t[i] = {}), n[i].__swiper__ ? (t[i] = n[i]) : c(t[i], n[i]))
            : (t[i] = n[i]));
      }
    }
  }
  var i;
  return t;
}
function p(e, t, s) {
  e.style.setProperty(t, s);
}
function u({ swiper: e, targetPosition: t, side: s }) {
  const i = n(),
    r = -e.translate;
  let a,
    l = null;
  const o = e.params.speed;
  (e.wrapperEl.style.scrollSnapType = "none"),
    i.cancelAnimationFrame(e.cssModeFrameID);
  const d = t > r ? "next" : "prev",
    c = (e, t) => ("next" === d && e >= t) || ("prev" === d && e <= t),
    p = () => {
      (a = new Date().getTime()), null === l && (l = a);
      const n = Math.max(Math.min((a - l) / o, 1), 0),
        d = 0.5 - Math.cos(n * Math.PI) / 2;
      let u = r + d * (t - r);
      if ((c(u, t) && (u = t), e.wrapperEl.scrollTo({ [s]: u }), c(u, t)))
        return (
          (e.wrapperEl.style.overflow = "hidden"),
          (e.wrapperEl.style.scrollSnapType = ""),
          setTimeout(() => {
            (e.wrapperEl.style.overflow = ""), e.wrapperEl.scrollTo({ [s]: u });
          }),
          void i.cancelAnimationFrame(e.cssModeFrameID)
        );
      e.cssModeFrameID = i.requestAnimationFrame(p);
    };
  p();
}
function f(e, t = "") {
  return [...e.children].filter((e) => e.matches(t));
}
function h(e, t = []) {
  const s = document.createElement(e);
  return s.classList.add(...(Array.isArray(t) ? t : [t])), s;
}
function m(e, t) {
  return n().getComputedStyle(e, null).getPropertyValue(t);
}
function v(e) {
  let t,
    s = e;
  if (s) {
    for (t = 0; null !== (s = s.previousSibling); )
      1 === s.nodeType && (t += 1);
    return t;
  }
}
function g(e, t, s) {
  const i = n();
  return s
    ? e["width" === t ? "offsetWidth" : "offsetHeight"] +
        parseFloat(
          i
            .getComputedStyle(e, null)
            .getPropertyValue("width" === t ? "margin-right" : "margin-top")
        ) +
        parseFloat(
          i
            .getComputedStyle(e, null)
            .getPropertyValue("width" === t ? "margin-left" : "margin-bottom")
        )
    : e.offsetWidth;
}
let w, S, T;
function b() {
  return (
    w ||
      (w = (function () {
        const e = n(),
          t = i();
        return {
          smoothScroll:
            t.documentElement && "scrollBehavior" in t.documentElement.style,
          touch: !!(
            "ontouchstart" in e ||
            (e.DocumentTouch && t instanceof e.DocumentTouch)
          ),
        };
      })()),
    w
  );
}
function x(e = {}) {
  return (
    S ||
      (S = (function ({ userAgent: e } = {}) {
        const t = b(),
          s = n(),
          i = s.navigator.platform,
          r = e || s.navigator.userAgent,
          a = { ios: !1, android: !1 },
          l = s.screen.width,
          o = s.screen.height,
          d = r.match(/(Android);?[\s\/]+([\d.]+)?/);
        let c = r.match(/(iPad).*OS\s([\d_]+)/);
        const p = r.match(/(iPod)(.*OS\s([\d_]+))?/),
          u = !c && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
          f = "Win32" === i;
        let h = "MacIntel" === i;
        return (
          !c &&
            h &&
            t.touch &&
            [
              "1024x1366",
              "1366x1024",
              "834x1194",
              "1194x834",
              "834x1112",
              "1112x834",
              "768x1024",
              "1024x768",
              "820x1180",
              "1180x820",
              "810x1080",
              "1080x810",
            ].indexOf(`${l}x${o}`) >= 0 &&
            ((c = r.match(/(Version)\/([\d.]+)/)),
            c || (c = [0, 1, "13_0_0"]),
            (h = !1)),
          d && !f && ((a.os = "android"), (a.android = !0)),
          (c || u || p) && ((a.os = "ios"), (a.ios = !0)),
          a
        );
      })(e)),
    S
  );
}
function E() {
  return (
    T ||
      (T = (function () {
        const e = n();
        let t = !1;
        function s() {
          const t = e.navigator.userAgent.toLowerCase();
          return (
            t.indexOf("safari") >= 0 &&
            t.indexOf("chrome") < 0 &&
            t.indexOf("android") < 0
          );
        }
        if (s()) {
          const s = String(e.navigator.userAgent);
          if (s.includes("Version/")) {
            const [e, i] = s
              .split("Version/")[1]
              .split(" ")[0]
              .split(".")
              .map((e) => Number(e));
            t = e < 16 || (16 === e && i < 2);
          }
        }
        return {
          isSafari: t || s(),
          needPerspectiveFix: t,
          isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
            e.navigator.userAgent
          ),
        };
      })()),
    T
  );
}
function y({ swiper: e, runCallbacks: t, direction: s, step: i }) {
  const { activeIndex: r, previousIndex: n } = e;
  let a = s;
  if (
    (a || (a = r > n ? "next" : r < n ? "prev" : "reset"),
    e.emit(`transition${i}`),
    t && r !== n)
  ) {
    if ("reset" === a) return void e.emit(`slideResetTransition${i}`);
    e.emit(`slideChangeTransition${i}`),
      "next" === a
        ? e.emit(`slideNextTransition${i}`)
        : e.emit(`slidePrevTransition${i}`);
  }
}
function C(e) {
  const t = this,
    s = i(),
    r = n(),
    a = t.touchEventsData;
  a.evCache.push(e);
  const { params: o, touches: d, enabled: c } = t;
  if (!c) return;
  if (!o.simulateTouch && "mouse" === e.pointerType) return;
  if (t.animating && o.preventInteractionOnTransition) return;
  !t.animating && o.cssMode && o.loop && t.loopFix();
  let p = e;
  p.originalEvent && (p = p.originalEvent);
  let u = p.target;
  if ("wrapper" === o.touchEventsTarget && !t.wrapperEl.contains(u)) return;
  if ("which" in p && 3 === p.which) return;
  if ("button" in p && p.button > 0) return;
  if (a.isTouched && a.isMoved) return;
  const f = !!o.noSwipingClass && "" !== o.noSwipingClass,
    h = e.composedPath ? e.composedPath() : e.path;
  f && p.target && p.target.shadowRoot && h && (u = h[0]);
  const m = o.noSwipingSelector ? o.noSwipingSelector : `.${o.noSwipingClass}`,
    v = !(!p.target || !p.target.shadowRoot);
  if (
    o.noSwiping &&
    (v
      ? (function (e, t = this) {
          return (function t(s) {
            if (!s || s === i() || s === n()) return null;
            s.assignedSlot && (s = s.assignedSlot);
            const r = s.closest(e);
            return r || s.getRootNode ? r || t(s.getRootNode().host) : null;
          })(t);
        })(m, u)
      : u.closest(m))
  )
    return void (t.allowClick = !0);
  if (o.swipeHandler && !u.closest(o.swipeHandler)) return;
  (d.currentX = p.pageX), (d.currentY = p.pageY);
  const g = d.currentX,
    w = d.currentY,
    S = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection,
    T = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
  if (S && (g <= T || g >= r.innerWidth - T)) {
    if ("prevent" !== S) return;
    e.preventDefault();
  }
  Object.assign(a, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0,
  }),
    (d.startX = g),
    (d.startY = w),
    (a.touchStartTime = l()),
    (t.allowClick = !0),
    t.updateSize(),
    (t.swipeDirection = void 0),
    o.threshold > 0 && (a.allowThresholdMove = !1);
  let b = !0;
  u.matches(a.focusableElements) &&
    ((b = !1), "SELECT" === u.nodeName && (a.isTouched = !1)),
    s.activeElement &&
      s.activeElement.matches(a.focusableElements) &&
      s.activeElement !== u &&
      s.activeElement.blur();
  const x = b && t.allowTouchMove && o.touchStartPreventDefault;
  (!o.touchStartForcePreventDefault && !x) ||
    u.isContentEditable ||
    p.preventDefault(),
    t.params.freeMode &&
      t.params.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !o.cssMode &&
      t.freeMode.onTouchStart(),
    t.emit("touchStart", p);
}
function M(e) {
  const t = i(),
    s = this,
    r = s.touchEventsData,
    { params: n, touches: a, rtlTranslate: o, enabled: d } = s;
  if (!d) return;
  if (!n.simulateTouch && "mouse" === e.pointerType) return;
  let c = e;
  if ((c.originalEvent && (c = c.originalEvent), !r.isTouched))
    return void (
      r.startMoving &&
      r.isScrolling &&
      s.emit("touchMoveOpposite", c)
    );
  const p = r.evCache.findIndex((e) => e.pointerId === c.pointerId);
  p >= 0 && (r.evCache[p] = c);
  const u = r.evCache.length > 1 ? r.evCache[0] : c,
    f = u.pageX,
    h = u.pageY;
  if (c.preventedByNestedSwiper) return (a.startX = f), void (a.startY = h);
  if (!s.allowTouchMove)
    return (
      c.target.matches(r.focusableElements) || (s.allowClick = !1),
      void (
        r.isTouched &&
        (Object.assign(a, {
          startX: f,
          startY: h,
          prevX: s.touches.currentX,
          prevY: s.touches.currentY,
          currentX: f,
          currentY: h,
        }),
        (r.touchStartTime = l()))
      )
    );
  if (n.touchReleaseOnEdges && !n.loop)
    if (s.isVertical()) {
      if (
        (h < a.startY && s.translate <= s.maxTranslate()) ||
        (h > a.startY && s.translate >= s.minTranslate())
      )
        return (r.isTouched = !1), void (r.isMoved = !1);
    } else if (
      (f < a.startX && s.translate <= s.maxTranslate()) ||
      (f > a.startX && s.translate >= s.minTranslate())
    )
      return;
  if (
    t.activeElement &&
    c.target === t.activeElement &&
    c.target.matches(r.focusableElements)
  )
    return (r.isMoved = !0), void (s.allowClick = !1);
  if (
    (r.allowTouchCallbacks && s.emit("touchMove", c),
    c.targetTouches && c.targetTouches.length > 1)
  )
    return;
  (a.currentX = f), (a.currentY = h);
  const m = a.currentX - a.startX,
    v = a.currentY - a.startY;
  if (s.params.threshold && Math.sqrt(m ** 2 + v ** 2) < s.params.threshold)
    return;
  if (void 0 === r.isScrolling) {
    let e;
    (s.isHorizontal() && a.currentY === a.startY) ||
    (s.isVertical() && a.currentX === a.startX)
      ? (r.isScrolling = !1)
      : m * m + v * v >= 25 &&
        ((e = (180 * Math.atan2(Math.abs(v), Math.abs(m))) / Math.PI),
        (r.isScrolling = s.isHorizontal()
          ? e > n.touchAngle
          : 90 - e > n.touchAngle));
  }
  if (
    (r.isScrolling && s.emit("touchMoveOpposite", c),
    void 0 === r.startMoving &&
      ((a.currentX === a.startX && a.currentY === a.startY) ||
        (r.startMoving = !0)),
    r.isScrolling ||
      (s.zoom &&
        s.params.zoom &&
        s.params.zoom.enabled &&
        r.evCache.length > 1))
  )
    return void (r.isTouched = !1);
  if (!r.startMoving) return;
  (s.allowClick = !1),
    !n.cssMode && c.cancelable && c.preventDefault(),
    n.touchMoveStopPropagation && !n.nested && c.stopPropagation();
  let g = s.isHorizontal() ? m : v,
    w = s.isHorizontal() ? a.currentX - a.previousX : a.currentY - a.previousY;
  n.oneWayMovement &&
    ((g = Math.abs(g) * (o ? 1 : -1)), (w = Math.abs(w) * (o ? 1 : -1))),
    (a.diff = g),
    (g *= n.touchRatio),
    o && ((g = -g), (w = -w));
  const S = s.touchesDirection;
  (s.swipeDirection = g > 0 ? "prev" : "next"),
    (s.touchesDirection = w > 0 ? "prev" : "next");
  const T =
    s.params.loop && !(s.virtual && s.params.virtual.enabled) && !n.cssMode;
  if (!r.isMoved) {
    if (
      (T && s.loopFix({ direction: s.swipeDirection }),
      (r.startTranslate = s.getTranslate()),
      s.setTransition(0),
      s.animating)
    ) {
      const e = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
      });
      s.wrapperEl.dispatchEvent(e);
    }
    (r.allowMomentumBounce = !1),
      !n.grabCursor ||
        (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
        s.setGrabCursor(!0),
      s.emit("sliderFirstMove", c);
  }
  let b;
  r.isMoved &&
    S !== s.touchesDirection &&
    T &&
    Math.abs(g) >= 1 &&
    (s.loopFix({ direction: s.swipeDirection, setTranslate: !0 }), (b = !0)),
    s.emit("sliderMove", c),
    (r.isMoved = !0),
    (r.currentTranslate = g + r.startTranslate);
  let x = !0,
    E = n.resistanceRatio;
  if (
    (n.touchReleaseOnEdges && (E = 0),
    g > 0
      ? (T &&
          !b &&
          r.currentTranslate >
            (n.centeredSlides
              ? s.minTranslate() - s.size / 2
              : s.minTranslate()) &&
          s.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0,
          }),
        r.currentTranslate > s.minTranslate() &&
          ((x = !1),
          n.resistance &&
            (r.currentTranslate =
              s.minTranslate() -
              1 +
              (-s.minTranslate() + r.startTranslate + g) ** E)))
      : g < 0 &&
        (T &&
          !b &&
          r.currentTranslate <
            (n.centeredSlides
              ? s.maxTranslate() + s.size / 2
              : s.maxTranslate()) &&
          s.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex:
              s.slides.length -
              ("auto" === n.slidesPerView
                ? s.slidesPerViewDynamic()
                : Math.ceil(parseFloat(n.slidesPerView, 10))),
          }),
        r.currentTranslate < s.maxTranslate() &&
          ((x = !1),
          n.resistance &&
            (r.currentTranslate =
              s.maxTranslate() +
              1 -
              (s.maxTranslate() - r.startTranslate - g) ** E))),
    x && (c.preventedByNestedSwiper = !0),
    !s.allowSlideNext &&
      "next" === s.swipeDirection &&
      r.currentTranslate < r.startTranslate &&
      (r.currentTranslate = r.startTranslate),
    !s.allowSlidePrev &&
      "prev" === s.swipeDirection &&
      r.currentTranslate > r.startTranslate &&
      (r.currentTranslate = r.startTranslate),
    s.allowSlidePrev ||
      s.allowSlideNext ||
      (r.currentTranslate = r.startTranslate),
    n.threshold > 0)
  ) {
    if (!(Math.abs(g) > n.threshold || r.allowThresholdMove))
      return void (r.currentTranslate = r.startTranslate);
    if (!r.allowThresholdMove)
      return (
        (r.allowThresholdMove = !0),
        (a.startX = a.currentX),
        (a.startY = a.currentY),
        (r.currentTranslate = r.startTranslate),
        void (a.diff = s.isHorizontal()
          ? a.currentX - a.startX
          : a.currentY - a.startY)
      );
  }
  n.followFinger &&
    !n.cssMode &&
    (((n.freeMode && n.freeMode.enabled && s.freeMode) ||
      n.watchSlidesProgress) &&
      (s.updateActiveIndex(), s.updateSlidesClasses()),
    s.params.freeMode &&
      n.freeMode.enabled &&
      s.freeMode &&
      s.freeMode.onTouchMove(),
    s.updateProgress(r.currentTranslate),
    s.setTranslate(r.currentTranslate));
}
function P(e) {
  const t = this,
    s = t.touchEventsData,
    i = s.evCache.findIndex((t) => t.pointerId === e.pointerId);
  if (
    (i >= 0 && s.evCache.splice(i, 1),
    ["pointercancel", "pointerout", "pointerleave"].includes(e.type))
  )
    return;
  const {
    params: r,
    touches: n,
    rtlTranslate: o,
    slidesGrid: d,
    enabled: c,
  } = t;
  if (!c) return;
  if (!r.simulateTouch && "mouse" === e.pointerType) return;
  let p = e;
  if (
    (p.originalEvent && (p = p.originalEvent),
    s.allowTouchCallbacks && t.emit("touchEnd", p),
    (s.allowTouchCallbacks = !1),
    !s.isTouched)
  )
    return (
      s.isMoved && r.grabCursor && t.setGrabCursor(!1),
      (s.isMoved = !1),
      void (s.startMoving = !1)
    );
  r.grabCursor &&
    s.isMoved &&
    s.isTouched &&
    (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
    t.setGrabCursor(!1);
  const u = l(),
    f = u - s.touchStartTime;
  if (t.allowClick) {
    const e = p.path || (p.composedPath && p.composedPath());
    t.updateClickedSlide((e && e[0]) || p.target),
      t.emit("tap click", p),
      f < 300 &&
        u - s.lastClickTime < 300 &&
        t.emit("doubleTap doubleClick", p);
  }
  if (
    ((s.lastClickTime = l()),
    a(() => {
      t.destroyed || (t.allowClick = !0);
    }),
    !s.isTouched ||
      !s.isMoved ||
      !t.swipeDirection ||
      0 === n.diff ||
      s.currentTranslate === s.startTranslate)
  )
    return (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1);
  let h;
  if (
    ((s.isTouched = !1),
    (s.isMoved = !1),
    (s.startMoving = !1),
    (h = r.followFinger
      ? o
        ? t.translate
        : -t.translate
      : -s.currentTranslate),
    r.cssMode)
  )
    return;
  if (t.params.freeMode && r.freeMode.enabled)
    return void t.freeMode.onTouchEnd({ currentPos: h });
  let m = 0,
    v = t.slidesSizesGrid[0];
  for (
    let a = 0;
    a < d.length;
    a += a < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup
  ) {
    const e = a < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
    void 0 !== d[a + e]
      ? h >= d[a] && h < d[a + e] && ((m = a), (v = d[a + e] - d[a]))
      : h >= d[a] && ((m = a), (v = d[d.length - 1] - d[d.length - 2]));
  }
  let g = null,
    w = null;
  r.rewind &&
    (t.isBeginning
      ? (w =
          t.params.virtual && t.params.virtual.enabled && t.virtual
            ? t.virtual.slides.length - 1
            : t.slides.length - 1)
      : t.isEnd && (g = 0));
  const S = (h - d[m]) / v,
    T = m < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
  if (f > r.longSwipesMs) {
    if (!r.longSwipes) return void t.slideTo(t.activeIndex);
    "next" === t.swipeDirection &&
      (S >= r.longSwipesRatio
        ? t.slideTo(r.rewind && t.isEnd ? g : m + T)
        : t.slideTo(m)),
      "prev" === t.swipeDirection &&
        (S > 1 - r.longSwipesRatio
          ? t.slideTo(m + T)
          : null !== w && S < 0 && Math.abs(S) > r.longSwipesRatio
          ? t.slideTo(w)
          : t.slideTo(m));
  } else {
    if (!r.shortSwipes) return void t.slideTo(t.activeIndex);
    t.navigation &&
    (p.target === t.navigation.nextEl || p.target === t.navigation.prevEl)
      ? p.target === t.navigation.nextEl
        ? t.slideTo(m + T)
        : t.slideTo(m)
      : ("next" === t.swipeDirection && t.slideTo(null !== g ? g : m + T),
        "prev" === t.swipeDirection && t.slideTo(null !== w ? w : m));
  }
}
let k;
function L() {
  const e = this,
    { params: t, el: s } = e;
  if (s && 0 === s.offsetWidth) return;
  t.breakpoints && e.setBreakpoint();
  const { allowSlideNext: i, allowSlidePrev: r, snapGrid: n } = e,
    a = e.virtual && e.params.virtual.enabled;
  (e.allowSlideNext = !0),
    (e.allowSlidePrev = !0),
    e.updateSize(),
    e.updateSlides(),
    e.updateSlidesClasses();
  const l = a && t.loop;
  !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
  !e.isEnd ||
  e.isBeginning ||
  e.params.centeredSlides ||
  l
    ? e.params.loop && !a
      ? e.slideToLoop(e.realIndex, 0, !1, !0)
      : e.slideTo(e.activeIndex, 0, !1, !0)
    : e.slideTo(e.slides.length - 1, 0, !1, !0),
    e.autoplay &&
      e.autoplay.running &&
      e.autoplay.paused &&
      (clearTimeout(k),
      (k = setTimeout(() => {
        e.autoplay.resume();
      }, 500))),
    (e.allowSlidePrev = r),
    (e.allowSlideNext = i),
    e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow();
}
function O(e) {
  const t = this;
  t.enabled &&
    (t.allowClick ||
      (t.params.preventClicks && e.preventDefault(),
      t.params.preventClicksPropagation &&
        t.animating &&
        (e.stopPropagation(), e.stopImmediatePropagation())));
}
function I() {
  const e = this,
    { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
  if (!i) return;
  let r;
  (e.previousTranslate = e.translate),
    e.isHorizontal()
      ? (e.translate = -t.scrollLeft)
      : (e.translate = -t.scrollTop),
    0 === e.translate && (e.translate = 0),
    e.updateActiveIndex(),
    e.updateSlidesClasses();
  const n = e.maxTranslate() - e.minTranslate();
  (r = 0 === n ? 0 : (e.translate - e.minTranslate()) / n),
    r !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
    e.emit("setTranslate", e.translate, !1);
}
const z = (e, t) => {
  const s = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`);
  if (s) {
    const t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
    t && t.remove();
  }
};
function A(e) {
  z(this, e.target), this.update();
}
let G = !1;
function D() {}
const _ = (e, t) => {
  const s = i(),
    { params: r, el: n, wrapperEl: a, device: l } = e,
    o = !!r.nested,
    d = "on" === t ? "addEventListener" : "removeEventListener",
    c = t;
  n[d]("pointerdown", e.onTouchStart, { passive: !1 }),
    s[d]("pointermove", e.onTouchMove, { passive: !1, capture: o }),
    s[d]("pointerup", e.onTouchEnd, { passive: !0 }),
    s[d]("pointercancel", e.onTouchEnd, { passive: !0 }),
    s[d]("pointerout", e.onTouchEnd, { passive: !0 }),
    s[d]("pointerleave", e.onTouchEnd, { passive: !0 }),
    (r.preventClicks || r.preventClicksPropagation) &&
      n[d]("click", e.onClick, !0),
    r.cssMode && a[d]("scroll", e.onScroll),
    r.updateOnWindowResize
      ? e[c](
          l.ios || l.android
            ? "resize orientationchange observerUpdate"
            : "resize observerUpdate",
          L,
          !0
        )
      : e[c]("observerUpdate", L, !0),
    n[d]("load", e.onLoad, { capture: !0 });
};
const B = (e, t) => e.grid && t.grid && t.grid.rows > 1;
var N = {
  init: !0,
  direction: "horizontal",
  oneWayMovement: !1,
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: !1,
  updateOnWindowResize: !0,
  resizeObserver: !0,
  nested: !1,
  createElements: !1,
  enabled: !0,
  focusableElements: "input, select, option, textarea, button, video, label",
  width: null,
  height: null,
  preventInteractionOnTransition: !1,
  userAgent: null,
  url: null,
  edgeSwipeDetection: !1,
  edgeSwipeThreshold: 20,
  autoHeight: !1,
  setWrapperSize: !1,
  virtualTranslate: !1,
  effect: "slide",
  breakpoints: void 0,
  breakpointsBase: "window",
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: !1,
  centeredSlides: !1,
  centeredSlidesBounds: !1,
  slidesOffsetBefore: 0,
  slidesOffsetAfter: 0,
  normalizeSlideIndex: !0,
  centerInsufficientSlides: !1,
  watchOverflow: !0,
  roundLengths: !1,
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: !0,
  shortSwipes: !0,
  longSwipes: !0,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: !0,
  allowTouchMove: !0,
  threshold: 5,
  touchMoveStopPropagation: !1,
  touchStartPreventDefault: !0,
  touchStartForcePreventDefault: !1,
  touchReleaseOnEdges: !1,
  uniqueNavElements: !0,
  resistance: !0,
  resistanceRatio: 0.85,
  watchSlidesProgress: !1,
  grabCursor: !1,
  preventClicks: !0,
  preventClicksPropagation: !0,
  slideToClickedSlide: !1,
  loop: !1,
  loopedSlides: null,
  loopPreventsSliding: !0,
  rewind: !1,
  allowSlidePrev: !0,
  allowSlideNext: !0,
  swipeHandler: null,
  noSwiping: !0,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  passiveListeners: !0,
  maxBackfaceHiddenSlides: 10,
  containerModifierClass: "swiper-",
  slideClass: "swiper-slide",
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
  slideNextClass: "swiper-slide-next",
  slidePrevClass: "swiper-slide-prev",
  wrapperClass: "swiper-wrapper",
  lazyPreloaderClass: "swiper-lazy-preloader",
  runCallbacksOnInit: !0,
  _emitClasses: !1,
};
function V(e, t) {
  return function (s = {}) {
    const i = Object.keys(s)[0],
      r = s[i];
    "object" == typeof r && null !== r
      ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
          !0 === e[i] &&
          (e[i] = { auto: !0 }),
        i in e && "enabled" in r
          ? (!0 === e[i] && (e[i] = { enabled: !0 }),
            "object" != typeof e[i] || "enabled" in e[i] || (e[i].enabled = !0),
            e[i] || (e[i] = { enabled: !1 }),
            c(t, s))
          : c(t, s))
      : c(t, s);
  };
}
const $ = {
    eventsEmitter: {
      on(e, t, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed) return i;
        if ("function" != typeof t) return i;
        const r = s ? "unshift" : "push";
        return (
          e.split(" ").forEach((e) => {
            i.eventsListeners[e] || (i.eventsListeners[e] = []),
              i.eventsListeners[e][r](t);
          }),
          i
        );
      },
      once(e, t, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed) return i;
        if ("function" != typeof t) return i;
        function r(...s) {
          i.off(e, r),
            r.__emitterProxy && delete r.__emitterProxy,
            t.apply(i, s);
        }
        return (r.__emitterProxy = t), i.on(e, r, s);
      },
      onAny(e, t) {
        const s = this;
        if (!s.eventsListeners || s.destroyed) return s;
        if ("function" != typeof e) return s;
        const i = t ? "unshift" : "push";
        return (
          s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e), s
        );
      },
      offAny(e) {
        const t = this;
        if (!t.eventsListeners || t.destroyed) return t;
        if (!t.eventsAnyListeners) return t;
        const s = t.eventsAnyListeners.indexOf(e);
        return s >= 0 && t.eventsAnyListeners.splice(s, 1), t;
      },
      off(e, t) {
        const s = this;
        return !s.eventsListeners || s.destroyed
          ? s
          : s.eventsListeners
          ? (e.split(" ").forEach((e) => {
              void 0 === t
                ? (s.eventsListeners[e] = [])
                : s.eventsListeners[e] &&
                  s.eventsListeners[e].forEach((i, r) => {
                    (i === t || (i.__emitterProxy && i.__emitterProxy === t)) &&
                      s.eventsListeners[e].splice(r, 1);
                  });
            }),
            s)
          : s;
      },
      emit(...e) {
        const t = this;
        if (!t.eventsListeners || t.destroyed) return t;
        if (!t.eventsListeners) return t;
        let s, i, r;
        "string" == typeof e[0] || Array.isArray(e[0])
          ? ((s = e[0]), (i = e.slice(1, e.length)), (r = t))
          : ((s = e[0].events), (i = e[0].data), (r = e[0].context || t)),
          i.unshift(r);
        return (
          (Array.isArray(s) ? s : s.split(" ")).forEach((e) => {
            t.eventsAnyListeners &&
              t.eventsAnyListeners.length &&
              t.eventsAnyListeners.forEach((t) => {
                t.apply(r, [e, ...i]);
              }),
              t.eventsListeners &&
                t.eventsListeners[e] &&
                t.eventsListeners[e].forEach((e) => {
                  e.apply(r, i);
                });
          }),
          t
        );
      },
    },
    update: {
      updateSize: function () {
        const e = this;
        let t, s;
        const i = e.el;
        (t =
          void 0 !== e.params.width && null !== e.params.width
            ? e.params.width
            : i.clientWidth),
          (s =
            void 0 !== e.params.height && null !== e.params.height
              ? e.params.height
              : i.clientHeight),
          (0 === t && e.isHorizontal()) ||
            (0 === s && e.isVertical()) ||
            ((t =
              t -
              parseInt(m(i, "padding-left") || 0, 10) -
              parseInt(m(i, "padding-right") || 0, 10)),
            (s =
              s -
              parseInt(m(i, "padding-top") || 0, 10) -
              parseInt(m(i, "padding-bottom") || 0, 10)),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(s) && (s = 0),
            Object.assign(e, {
              width: t,
              height: s,
              size: e.isHorizontal() ? t : s,
            }));
      },
      updateSlides: function () {
        const e = this;
        function t(t) {
          return e.isHorizontal()
            ? t
            : {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom",
              }[t];
        }
        function s(e, s) {
          return parseFloat(e.getPropertyValue(t(s)) || 0);
        }
        const i = e.params,
          {
            wrapperEl: r,
            slidesEl: n,
            size: a,
            rtlTranslate: l,
            wrongRTL: o,
          } = e,
          d = e.virtual && i.virtual.enabled,
          c = d ? e.virtual.slides.length : e.slides.length,
          u = f(n, `.${e.params.slideClass}, swiper-slide`),
          h = d ? e.virtual.slides.length : u.length;
        let v = [];
        const w = [],
          S = [];
        let T = i.slidesOffsetBefore;
        "function" == typeof T && (T = i.slidesOffsetBefore.call(e));
        let b = i.slidesOffsetAfter;
        "function" == typeof b && (b = i.slidesOffsetAfter.call(e));
        const x = e.snapGrid.length,
          E = e.slidesGrid.length;
        let y = i.spaceBetween,
          C = -T,
          M = 0,
          P = 0;
        if (void 0 === a) return;
        "string" == typeof y &&
          y.indexOf("%") >= 0 &&
          (y = (parseFloat(y.replace("%", "")) / 100) * a),
          (e.virtualSize = -y),
          u.forEach((e) => {
            l ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
              (e.style.marginBottom = ""),
              (e.style.marginTop = "");
          }),
          i.centeredSlides &&
            i.cssMode &&
            (p(r, "--swiper-centered-offset-before", ""),
            p(r, "--swiper-centered-offset-after", ""));
        const k = i.grid && i.grid.rows > 1 && e.grid;
        let L;
        k && e.grid.initSlides(h);
        const O =
          "auto" === i.slidesPerView &&
          i.breakpoints &&
          Object.keys(i.breakpoints).filter(
            (e) => void 0 !== i.breakpoints[e].slidesPerView
          ).length > 0;
        for (let p = 0; p < h; p += 1) {
          let r;
          if (
            ((L = 0),
            u[p] && (r = u[p]),
            k && e.grid.updateSlide(p, r, h, t),
            !u[p] || "none" !== m(r, "display"))
          ) {
            if ("auto" === i.slidesPerView) {
              O && (u[p].style[t("width")] = "");
              const n = getComputedStyle(r),
                a = r.style.transform,
                l = r.style.webkitTransform;
              if (
                (a && (r.style.transform = "none"),
                l && (r.style.webkitTransform = "none"),
                i.roundLengths)
              )
                L = e.isHorizontal() ? g(r, "width", !0) : g(r, "height", !0);
              else {
                const e = s(n, "width"),
                  t = s(n, "padding-left"),
                  i = s(n, "padding-right"),
                  a = s(n, "margin-left"),
                  l = s(n, "margin-right"),
                  o = n.getPropertyValue("box-sizing");
                if (o && "border-box" === o) L = e + a + l;
                else {
                  const { clientWidth: s, offsetWidth: n } = r;
                  L = e + t + i + a + l + (n - s);
                }
              }
              a && (r.style.transform = a),
                l && (r.style.webkitTransform = l),
                i.roundLengths && (L = Math.floor(L));
            } else
              (L = (a - (i.slidesPerView - 1) * y) / i.slidesPerView),
                i.roundLengths && (L = Math.floor(L)),
                u[p] && (u[p].style[t("width")] = `${L}px`);
            u[p] && (u[p].swiperSlideSize = L),
              S.push(L),
              i.centeredSlides
                ? ((C = C + L / 2 + M / 2 + y),
                  0 === M && 0 !== p && (C = C - a / 2 - y),
                  0 === p && (C = C - a / 2 - y),
                  Math.abs(C) < 0.001 && (C = 0),
                  i.roundLengths && (C = Math.floor(C)),
                  P % i.slidesPerGroup == 0 && v.push(C),
                  w.push(C))
                : (i.roundLengths && (C = Math.floor(C)),
                  (P - Math.min(e.params.slidesPerGroupSkip, P)) %
                    e.params.slidesPerGroup ==
                    0 && v.push(C),
                  w.push(C),
                  (C = C + L + y)),
              (e.virtualSize += L + y),
              (M = L),
              (P += 1);
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, a) + b),
          l &&
            o &&
            ("slide" === i.effect || "coverflow" === i.effect) &&
            (r.style.width = `${e.virtualSize + i.spaceBetween}px`),
          i.setWrapperSize &&
            (r.style[t("width")] = `${e.virtualSize + i.spaceBetween}px`),
          k && e.grid.updateWrapperSize(L, v, t),
          !i.centeredSlides)
        ) {
          const t = [];
          for (let s = 0; s < v.length; s += 1) {
            let r = v[s];
            i.roundLengths && (r = Math.floor(r)),
              v[s] <= e.virtualSize - a && t.push(r);
          }
          (v = t),
            Math.floor(e.virtualSize - a) - Math.floor(v[v.length - 1]) > 1 &&
              v.push(e.virtualSize - a);
        }
        if (d && i.loop) {
          const t = S[0] + y;
          if (i.slidesPerGroup > 1) {
            const s = Math.ceil(
                (e.virtual.slidesBefore + e.virtual.slidesAfter) /
                  i.slidesPerGroup
              ),
              r = t * i.slidesPerGroup;
            for (let e = 0; e < s; e += 1) v.push(v[v.length - 1] + r);
          }
          for (
            let s = 0;
            s < e.virtual.slidesBefore + e.virtual.slidesAfter;
            s += 1
          )
            1 === i.slidesPerGroup && v.push(v[v.length - 1] + t),
              w.push(w[w.length - 1] + t),
              (e.virtualSize += t);
        }
        if ((0 === v.length && (v = [0]), 0 !== i.spaceBetween)) {
          const s = e.isHorizontal() && l ? "marginLeft" : t("marginRight");
          u.filter(
            (e, t) => !(i.cssMode && !i.loop) || t !== u.length - 1
          ).forEach((e) => {
            e.style[s] = `${y}px`;
          });
        }
        if (i.centeredSlides && i.centeredSlidesBounds) {
          let e = 0;
          S.forEach((t) => {
            e += t + (i.spaceBetween ? i.spaceBetween : 0);
          }),
            (e -= i.spaceBetween);
          const t = e - a;
          v = v.map((e) => (e < 0 ? -T : e > t ? t + b : e));
        }
        if (i.centerInsufficientSlides) {
          let e = 0;
          if (
            (S.forEach((t) => {
              e += t + (i.spaceBetween ? i.spaceBetween : 0);
            }),
            (e -= i.spaceBetween),
            e < a)
          ) {
            const t = (a - e) / 2;
            v.forEach((e, s) => {
              v[s] = e - t;
            }),
              w.forEach((e, s) => {
                w[s] = e + t;
              });
          }
        }
        if (
          (Object.assign(e, {
            slides: u,
            snapGrid: v,
            slidesGrid: w,
            slidesSizesGrid: S,
          }),
          i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
        ) {
          p(r, "--swiper-centered-offset-before", -v[0] + "px"),
            p(
              r,
              "--swiper-centered-offset-after",
              e.size / 2 - S[S.length - 1] / 2 + "px"
            );
          const t = -e.snapGrid[0],
            s = -e.slidesGrid[0];
          (e.snapGrid = e.snapGrid.map((e) => e + t)),
            (e.slidesGrid = e.slidesGrid.map((e) => e + s));
        }
        if (
          (h !== c && e.emit("slidesLengthChange"),
          v.length !== x &&
            (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
          w.length !== E && e.emit("slidesGridLengthChange"),
          i.watchSlidesProgress && e.updateSlidesOffset(),
          !(d || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
        ) {
          const t = `${i.containerModifierClass}backface-hidden`,
            s = e.el.classList.contains(t);
          h <= i.maxBackfaceHiddenSlides
            ? s || e.el.classList.add(t)
            : s && e.el.classList.remove(t);
        }
      },
      updateAutoHeight: function (e) {
        const t = this,
          s = [],
          i = t.virtual && t.params.virtual.enabled;
        let r,
          n = 0;
        "number" == typeof e
          ? t.setTransition(e)
          : !0 === e && t.setTransition(t.params.speed);
        const a = (e) =>
          i
            ? t.slides.filter(
                (t) =>
                  parseInt(t.getAttribute("data-swiper-slide-index"), 10) === e
              )[0]
            : t.slides[e];
        if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
          if (t.params.centeredSlides)
            (t.visibleSlides || []).forEach((e) => {
              s.push(e);
            });
          else
            for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
              const e = t.activeIndex + r;
              if (e > t.slides.length && !i) break;
              s.push(a(e));
            }
        else s.push(a(t.activeIndex));
        for (r = 0; r < s.length; r += 1)
          if (void 0 !== s[r]) {
            const e = s[r].offsetHeight;
            n = e > n ? e : n;
          }
        (n || 0 === n) && (t.wrapperEl.style.height = `${n}px`);
      },
      updateSlidesOffset: function () {
        const e = this,
          t = e.slides,
          s = e.isElement
            ? e.isHorizontal()
              ? e.wrapperEl.offsetLeft
              : e.wrapperEl.offsetTop
            : 0;
        for (let i = 0; i < t.length; i += 1)
          t[i].swiperSlideOffset =
            (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) - s;
      },
      updateSlidesProgress: function (e = (this && this.translate) || 0) {
        const t = this,
          s = t.params,
          { slides: i, rtlTranslate: r, snapGrid: n } = t;
        if (0 === i.length) return;
        void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
        let a = -e;
        r && (a = e),
          i.forEach((e) => {
            e.classList.remove(s.slideVisibleClass);
          }),
          (t.visibleSlidesIndexes = []),
          (t.visibleSlides = []);
        for (let l = 0; l < i.length; l += 1) {
          const e = i[l];
          let o = e.swiperSlideOffset;
          s.cssMode && s.centeredSlides && (o -= i[0].swiperSlideOffset);
          const d =
              (a + (s.centeredSlides ? t.minTranslate() : 0) - o) /
              (e.swiperSlideSize + s.spaceBetween),
            c =
              (a - n[0] + (s.centeredSlides ? t.minTranslate() : 0) - o) /
              (e.swiperSlideSize + s.spaceBetween),
            p = -(a - o),
            u = p + t.slidesSizesGrid[l];
          ((p >= 0 && p < t.size - 1) ||
            (u > 1 && u <= t.size) ||
            (p <= 0 && u >= t.size)) &&
            (t.visibleSlides.push(e),
            t.visibleSlidesIndexes.push(l),
            i[l].classList.add(s.slideVisibleClass)),
            (e.progress = r ? -d : d),
            (e.originalProgress = r ? -c : c);
        }
      },
      updateProgress: function (e) {
        const t = this;
        if (void 0 === e) {
          const s = t.rtlTranslate ? -1 : 1;
          e = (t && t.translate && t.translate * s) || 0;
        }
        const s = t.params,
          i = t.maxTranslate() - t.minTranslate();
        let { progress: r, isBeginning: n, isEnd: a, progressLoop: l } = t;
        const o = n,
          d = a;
        if (0 === i) (r = 0), (n = !0), (a = !0);
        else {
          r = (e - t.minTranslate()) / i;
          const s = Math.abs(e - t.minTranslate()) < 1,
            l = Math.abs(e - t.maxTranslate()) < 1;
          (n = s || r <= 0), (a = l || r >= 1), s && (r = 0), l && (r = 1);
        }
        if (s.loop) {
          const s = v(
              t.slides.filter(
                (e) => "0" === e.getAttribute("data-swiper-slide-index")
              )[0]
            ),
            i = v(
              t.slides.filter(
                (e) =>
                  1 * e.getAttribute("data-swiper-slide-index") ==
                  t.slides.length - 1
              )[0]
            ),
            r = t.slidesGrid[s],
            n = t.slidesGrid[i],
            a = t.slidesGrid[t.slidesGrid.length - 1],
            o = Math.abs(e);
          (l = o >= r ? (o - r) / a : (o + a - n) / a), l > 1 && (l -= 1);
        }
        Object.assign(t, {
          progress: r,
          progressLoop: l,
          isBeginning: n,
          isEnd: a,
        }),
          (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
            t.updateSlidesProgress(e),
          n && !o && t.emit("reachBeginning toEdge"),
          a && !d && t.emit("reachEnd toEdge"),
          ((o && !n) || (d && !a)) && t.emit("fromEdge"),
          t.emit("progress", r);
      },
      updateSlidesClasses: function () {
        const e = this,
          { slides: t, params: s, slidesEl: i, activeIndex: r } = e,
          n = e.virtual && s.virtual.enabled,
          a = (e) => f(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
        let l;
        if (
          (t.forEach((e) => {
            e.classList.remove(
              s.slideActiveClass,
              s.slideNextClass,
              s.slidePrevClass
            );
          }),
          n)
        )
          if (s.loop) {
            let t = r - e.virtual.slidesBefore;
            t < 0 && (t = e.virtual.slides.length + t),
              t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
              (l = a(`[data-swiper-slide-index="${t}"]`));
          } else l = a(`[data-swiper-slide-index="${r}"]`);
        else l = t[r];
        if (l) {
          l.classList.add(s.slideActiveClass);
          let e = (function (e, t) {
            const s = [];
            for (; e.nextElementSibling; ) {
              const i = e.nextElementSibling;
              t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
            }
            return s;
          })(l, `.${s.slideClass}, swiper-slide`)[0];
          s.loop && !e && (e = t[0]), e && e.classList.add(s.slideNextClass);
          let i = (function (e, t) {
            const s = [];
            for (; e.previousElementSibling; ) {
              const i = e.previousElementSibling;
              t ? i.matches(t) && s.push(i) : s.push(i), (e = i);
            }
            return s;
          })(l, `.${s.slideClass}, swiper-slide`)[0];
          s.loop && 0 === !i && (i = t[t.length - 1]),
            i && i.classList.add(s.slidePrevClass);
        }
        e.emitSlidesClasses();
      },
      updateActiveIndex: function (e) {
        const t = this,
          s = t.rtlTranslate ? t.translate : -t.translate,
          {
            snapGrid: i,
            params: r,
            activeIndex: n,
            realIndex: a,
            snapIndex: l,
          } = t;
        let o,
          d = e;
        const c = (e) => {
          let s = e - t.virtual.slidesBefore;
          return (
            s < 0 && (s = t.virtual.slides.length + s),
            s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
            s
          );
        };
        if (
          (void 0 === d &&
            (d = (function (e) {
              const { slidesGrid: t, params: s } = e,
                i = e.rtlTranslate ? e.translate : -e.translate;
              let r;
              for (let n = 0; n < t.length; n += 1)
                void 0 !== t[n + 1]
                  ? i >= t[n] && i < t[n + 1] - (t[n + 1] - t[n]) / 2
                    ? (r = n)
                    : i >= t[n] && i < t[n + 1] && (r = n + 1)
                  : i >= t[n] && (r = n);
              return (
                s.normalizeSlideIndex && (r < 0 || void 0 === r) && (r = 0), r
              );
            })(t)),
          i.indexOf(s) >= 0)
        )
          o = i.indexOf(s);
        else {
          const e = Math.min(r.slidesPerGroupSkip, d);
          o = e + Math.floor((d - e) / r.slidesPerGroup);
        }
        if ((o >= i.length && (o = i.length - 1), d === n))
          return (
            o !== l && ((t.snapIndex = o), t.emit("snapIndexChange")),
            void (
              t.params.loop &&
              t.virtual &&
              t.params.virtual.enabled &&
              (t.realIndex = c(d))
            )
          );
        let p;
        (p =
          t.virtual && r.virtual.enabled && r.loop
            ? c(d)
            : t.slides[d]
            ? parseInt(
                t.slides[d].getAttribute("data-swiper-slide-index") || d,
                10
              )
            : d),
          Object.assign(t, {
            snapIndex: o,
            realIndex: p,
            previousIndex: n,
            activeIndex: d,
          }),
          t.emit("activeIndexChange"),
          t.emit("snapIndexChange"),
          a !== p && t.emit("realIndexChange"),
          (t.initialized || t.params.runCallbacksOnInit) &&
            t.emit("slideChange");
      },
      updateClickedSlide: function (e) {
        const t = this,
          s = t.params,
          i = e.closest(`.${s.slideClass}, swiper-slide`);
        let r,
          n = !1;
        if (i)
          for (let a = 0; a < t.slides.length; a += 1)
            if (t.slides[a] === i) {
              (n = !0), (r = a);
              break;
            }
        if (!i || !n)
          return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
        (t.clickedSlide = i),
          t.virtual && t.params.virtual.enabled
            ? (t.clickedIndex = parseInt(
                i.getAttribute("data-swiper-slide-index"),
                10
              ))
            : (t.clickedIndex = r),
          s.slideToClickedSlide &&
            void 0 !== t.clickedIndex &&
            t.clickedIndex !== t.activeIndex &&
            t.slideToClickedSlide();
      },
    },
    translate: {
      getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
        const { params: t, rtlTranslate: s, translate: i, wrapperEl: r } = this;
        if (t.virtualTranslate) return s ? -i : i;
        if (t.cssMode) return i;
        let n = o(r, e);
        return s && (n = -n), n || 0;
      },
      setTranslate: function (e, t) {
        const s = this,
          { rtlTranslate: i, params: r, wrapperEl: n, progress: a } = s;
        let l,
          o = 0,
          d = 0;
        s.isHorizontal() ? (o = i ? -e : e) : (d = e),
          r.roundLengths && ((o = Math.floor(o)), (d = Math.floor(d))),
          r.cssMode
            ? (n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                s.isHorizontal() ? -o : -d)
            : r.virtualTranslate ||
              (n.style.transform = `translate3d(${o}px, ${d}px, 0px)`),
          (s.previousTranslate = s.translate),
          (s.translate = s.isHorizontal() ? o : d);
        const c = s.maxTranslate() - s.minTranslate();
        (l = 0 === c ? 0 : (e - s.minTranslate()) / c),
          l !== a && s.updateProgress(e),
          s.emit("setTranslate", s.translate, t);
      },
      minTranslate: function () {
        return -this.snapGrid[0];
      },
      maxTranslate: function () {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
      translateTo: function (e = 0, t = this.params.speed, s = !0, i = !0, r) {
        const n = this,
          { params: a, wrapperEl: l } = n;
        if (n.animating && a.preventInteractionOnTransition) return !1;
        const o = n.minTranslate(),
          d = n.maxTranslate();
        let c;
        if (
          ((c = i && e > o ? o : i && e < d ? d : e),
          n.updateProgress(c),
          a.cssMode)
        ) {
          const e = n.isHorizontal();
          if (0 === t) l[e ? "scrollLeft" : "scrollTop"] = -c;
          else {
            if (!n.support.smoothScroll)
              return (
                u({ swiper: n, targetPosition: -c, side: e ? "left" : "top" }),
                !0
              );
            l.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" });
          }
          return !0;
        }
        return (
          0 === t
            ? (n.setTransition(0),
              n.setTranslate(c),
              s &&
                (n.emit("beforeTransitionStart", t, r),
                n.emit("transitionEnd")))
            : (n.setTransition(t),
              n.setTranslate(c),
              s &&
                (n.emit("beforeTransitionStart", t, r),
                n.emit("transitionStart")),
              n.animating ||
                ((n.animating = !0),
                n.onTranslateToWrapperTransitionEnd ||
                  (n.onTranslateToWrapperTransitionEnd = function (e) {
                    n &&
                      !n.destroyed &&
                      e.target === this &&
                      (n.wrapperEl.removeEventListener(
                        "transitionend",
                        n.onTranslateToWrapperTransitionEnd
                      ),
                      (n.onTranslateToWrapperTransitionEnd = null),
                      delete n.onTranslateToWrapperTransitionEnd,
                      s && n.emit("transitionEnd"));
                  }),
                n.wrapperEl.addEventListener(
                  "transitionend",
                  n.onTranslateToWrapperTransitionEnd
                ))),
          !0
        );
      },
    },
    transition: {
      setTransition: function (e, t) {
        const s = this;
        s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`),
          s.emit("setTransition", e, t);
      },
      transitionStart: function (e = !0, t) {
        const s = this,
          { params: i } = s;
        i.cssMode ||
          (i.autoHeight && s.updateAutoHeight(),
          y({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
      },
      transitionEnd: function (e = !0, t) {
        const s = this,
          { params: i } = s;
        (s.animating = !1),
          i.cssMode ||
            (s.setTransition(0),
            y({ swiper: s, runCallbacks: e, direction: t, step: "End" }));
      },
    },
    slide: {
      slideTo: function (e = 0, t = this.params.speed, s = !0, i, r) {
        "string" == typeof e && (e = parseInt(e, 10));
        const n = this;
        let a = e;
        a < 0 && (a = 0);
        const {
          params: l,
          snapGrid: o,
          slidesGrid: d,
          previousIndex: c,
          activeIndex: p,
          rtlTranslate: f,
          wrapperEl: h,
          enabled: m,
        } = n;
        if (
          (n.animating && l.preventInteractionOnTransition) ||
          (!m && !i && !r)
        )
          return !1;
        const v = Math.min(n.params.slidesPerGroupSkip, a);
        let g = v + Math.floor((a - v) / n.params.slidesPerGroup);
        g >= o.length && (g = o.length - 1);
        const w = -o[g];
        if (l.normalizeSlideIndex)
          for (let u = 0; u < d.length; u += 1) {
            const e = -Math.floor(100 * w),
              t = Math.floor(100 * d[u]),
              s = Math.floor(100 * d[u + 1]);
            void 0 !== d[u + 1]
              ? e >= t && e < s - (s - t) / 2
                ? (a = u)
                : e >= t && e < s && (a = u + 1)
              : e >= t && (a = u);
          }
        if (n.initialized && a !== p) {
          if (!n.allowSlideNext && w < n.translate && w < n.minTranslate())
            return !1;
          if (
            !n.allowSlidePrev &&
            w > n.translate &&
            w > n.maxTranslate() &&
            (p || 0) !== a
          )
            return !1;
        }
        let S;
        if (
          (a !== (c || 0) && s && n.emit("beforeSlideChangeStart"),
          n.updateProgress(w),
          (S = a > p ? "next" : a < p ? "prev" : "reset"),
          (f && -w === n.translate) || (!f && w === n.translate))
        )
          return (
            n.updateActiveIndex(a),
            l.autoHeight && n.updateAutoHeight(),
            n.updateSlidesClasses(),
            "slide" !== l.effect && n.setTranslate(w),
            "reset" !== S && (n.transitionStart(s, S), n.transitionEnd(s, S)),
            !1
          );
        if (l.cssMode) {
          const e = n.isHorizontal(),
            s = f ? w : -w;
          if (0 === t) {
            const t = n.virtual && n.params.virtual.enabled;
            t &&
              ((n.wrapperEl.style.scrollSnapType = "none"),
              (n._immediateVirtual = !0)),
              t && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0
                ? ((n._cssModeVirtualInitialSet = !0),
                  requestAnimationFrame(() => {
                    h[e ? "scrollLeft" : "scrollTop"] = s;
                  }))
                : (h[e ? "scrollLeft" : "scrollTop"] = s),
              t &&
                requestAnimationFrame(() => {
                  (n.wrapperEl.style.scrollSnapType = ""),
                    (n._immediateVirtual = !1);
                });
          } else {
            if (!n.support.smoothScroll)
              return (
                u({ swiper: n, targetPosition: s, side: e ? "left" : "top" }),
                !0
              );
            h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
          }
          return !0;
        }
        return (
          n.setTransition(t),
          n.setTranslate(w),
          n.updateActiveIndex(a),
          n.updateSlidesClasses(),
          n.emit("beforeTransitionStart", t, i),
          n.transitionStart(s, S),
          0 === t
            ? n.transitionEnd(s, S)
            : n.animating ||
              ((n.animating = !0),
              n.onSlideToWrapperTransitionEnd ||
                (n.onSlideToWrapperTransitionEnd = function (e) {
                  n &&
                    !n.destroyed &&
                    e.target === this &&
                    (n.wrapperEl.removeEventListener(
                      "transitionend",
                      n.onSlideToWrapperTransitionEnd
                    ),
                    (n.onSlideToWrapperTransitionEnd = null),
                    delete n.onSlideToWrapperTransitionEnd,
                    n.transitionEnd(s, S));
                }),
              n.wrapperEl.addEventListener(
                "transitionend",
                n.onSlideToWrapperTransitionEnd
              )),
          !0
        );
      },
      slideToLoop: function (e = 0, t = this.params.speed, s = !0, i) {
        if ("string" == typeof e) {
          e = parseInt(e, 10);
        }
        const r = this;
        let n = e;
        return (
          r.params.loop &&
            (r.virtual && r.params.virtual.enabled
              ? (n += r.virtual.slidesBefore)
              : (n = v(
                  r.slides.filter(
                    (e) => 1 * e.getAttribute("data-swiper-slide-index") === n
                  )[0]
                ))),
          r.slideTo(n, t, s, i)
        );
      },
      slideNext: function (e = this.params.speed, t = !0, s) {
        const i = this,
          { enabled: r, params: n, animating: a } = i;
        if (!r) return i;
        let l = n.slidesPerGroup;
        "auto" === n.slidesPerView &&
          1 === n.slidesPerGroup &&
          n.slidesPerGroupAuto &&
          (l = Math.max(i.slidesPerViewDynamic("current", !0), 1));
        const o = i.activeIndex < n.slidesPerGroupSkip ? 1 : l,
          d = i.virtual && n.virtual.enabled;
        if (n.loop) {
          if (a && !d && n.loopPreventsSliding) return !1;
          i.loopFix({ direction: "next" }),
            (i._clientLeft = i.wrapperEl.clientLeft);
        }
        return n.rewind && i.isEnd
          ? i.slideTo(0, e, t, s)
          : i.slideTo(i.activeIndex + o, e, t, s);
      },
      slidePrev: function (e = this.params.speed, t = !0, s) {
        const i = this,
          {
            params: r,
            snapGrid: n,
            slidesGrid: a,
            rtlTranslate: l,
            enabled: o,
            animating: d,
          } = i;
        if (!o) return i;
        const c = i.virtual && r.virtual.enabled;
        if (r.loop) {
          if (d && !c && r.loopPreventsSliding) return !1;
          i.loopFix({ direction: "prev" }),
            (i._clientLeft = i.wrapperEl.clientLeft);
        }
        function p(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }
        const u = p(l ? i.translate : -i.translate),
          f = n.map((e) => p(e));
        let h = n[f.indexOf(u) - 1];
        if (void 0 === h && r.cssMode) {
          let e;
          n.forEach((t, s) => {
            u >= t && (e = s);
          }),
            void 0 !== e && (h = n[e > 0 ? e - 1 : e]);
        }
        let m = 0;
        if (
          (void 0 !== h &&
            ((m = a.indexOf(h)),
            m < 0 && (m = i.activeIndex - 1),
            "auto" === r.slidesPerView &&
              1 === r.slidesPerGroup &&
              r.slidesPerGroupAuto &&
              ((m = m - i.slidesPerViewDynamic("previous", !0) + 1),
              (m = Math.max(m, 0)))),
          r.rewind && i.isBeginning)
        ) {
          const r =
            i.params.virtual && i.params.virtual.enabled && i.virtual
              ? i.virtual.slides.length - 1
              : i.slides.length - 1;
          return i.slideTo(r, e, t, s);
        }
        return i.slideTo(m, e, t, s);
      },
      slideReset: function (e = this.params.speed, t = !0, s) {
        return this.slideTo(this.activeIndex, e, t, s);
      },
      slideToClosest: function (e = this.params.speed, t = !0, s, i = 0.5) {
        const r = this;
        let n = r.activeIndex;
        const a = Math.min(r.params.slidesPerGroupSkip, n),
          l = a + Math.floor((n - a) / r.params.slidesPerGroup),
          o = r.rtlTranslate ? r.translate : -r.translate;
        if (o >= r.snapGrid[l]) {
          const e = r.snapGrid[l];
          o - e > (r.snapGrid[l + 1] - e) * i && (n += r.params.slidesPerGroup);
        } else {
          const e = r.snapGrid[l - 1];
          o - e <= (r.snapGrid[l] - e) * i && (n -= r.params.slidesPerGroup);
        }
        return (
          (n = Math.max(n, 0)),
          (n = Math.min(n, r.slidesGrid.length - 1)),
          r.slideTo(n, e, t, s)
        );
      },
      slideToClickedSlide: function () {
        const e = this,
          { params: t, slidesEl: s } = e,
          i =
            "auto" === t.slidesPerView
              ? e.slidesPerViewDynamic()
              : t.slidesPerView;
        let r,
          n = e.clickedIndex;
        const l = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
        if (t.loop) {
          if (e.animating) return;
          (r = parseInt(
            e.clickedSlide.getAttribute("data-swiper-slide-index"),
            10
          )),
            t.centeredSlides
              ? n < e.loopedSlides - i / 2 ||
                n > e.slides.length - e.loopedSlides + i / 2
                ? (e.loopFix(),
                  (n = v(f(s, `${l}[data-swiper-slide-index="${r}"]`)[0])),
                  a(() => {
                    e.slideTo(n);
                  }))
                : e.slideTo(n)
              : n > e.slides.length - i
              ? (e.loopFix(),
                (n = v(f(s, `${l}[data-swiper-slide-index="${r}"]`)[0])),
                a(() => {
                  e.slideTo(n);
                }))
              : e.slideTo(n);
        } else e.slideTo(n);
      },
    },
    loop: {
      loopCreate: function (e) {
        const t = this,
          { params: s, slidesEl: i } = t;
        if (!s.loop || (t.virtual && t.params.virtual.enabled)) return;
        f(i, `.${s.slideClass}, swiper-slide`).forEach((e, t) => {
          e.setAttribute("data-swiper-slide-index", t);
        }),
          t.loopFix({
            slideRealIndex: e,
            direction: s.centeredSlides ? void 0 : "next",
          });
      },
      loopFix: function ({
        slideRealIndex: e,
        slideTo: t = !0,
        direction: s,
        setTranslate: i,
        activeSlideIndex: r,
        byController: n,
      } = {}) {
        const a = this;
        if (!a.params.loop) return;
        a.emit("beforeLoopFix");
        const {
          slides: l,
          allowSlidePrev: o,
          allowSlideNext: d,
          slidesEl: c,
          params: p,
        } = a;
        if (
          ((a.allowSlidePrev = !0),
          (a.allowSlideNext = !0),
          a.virtual && p.virtual.enabled)
        )
          return (
            t &&
              (p.centeredSlides || 0 !== a.snapIndex
                ? p.centeredSlides && a.snapIndex < p.slidesPerView
                  ? a.slideTo(a.virtual.slides.length + a.snapIndex, 0, !1, !0)
                  : a.snapIndex === a.snapGrid.length - 1 &&
                    a.slideTo(a.virtual.slidesBefore, 0, !1, !0)
                : a.slideTo(a.virtual.slides.length, 0, !1, !0)),
            (a.allowSlidePrev = o),
            (a.allowSlideNext = d),
            void a.emit("loopFix")
          );
        const u =
          "auto" === p.slidesPerView
            ? a.slidesPerViewDynamic()
            : Math.ceil(parseFloat(p.slidesPerView, 10));
        let f = p.loopedSlides || u;
        f % p.slidesPerGroup != 0 &&
          (f += p.slidesPerGroup - (f % p.slidesPerGroup)),
          (a.loopedSlides = f);
        const h = [],
          m = [];
        let g = a.activeIndex;
        void 0 === r
          ? (r = v(
              a.slides.filter((e) =>
                e.classList.contains("swiper-slide-active")
              )[0]
            ))
          : (g = r);
        const w = "next" === s || !s,
          S = "prev" === s || !s;
        let T = 0,
          b = 0;
        if (r < f) {
          T = f - r;
          for (let e = 0; e < f - r; e += 1) {
            const t = e - Math.floor(e / l.length) * l.length;
            h.push(l.length - t - 1);
          }
        } else if (r > a.slides.length - 2 * f) {
          b = r - (a.slides.length - 2 * f);
          for (let e = 0; e < b; e += 1) {
            const t = e - Math.floor(e / l.length) * l.length;
            m.push(t);
          }
        }
        if (
          (S &&
            h.forEach((e) => {
              c.prepend(a.slides[e]);
            }),
          w &&
            m.forEach((e) => {
              c.append(a.slides[e]);
            }),
          a.recalcSlides(),
          p.watchSlidesProgress && a.updateSlidesOffset(),
          t)
        )
          if (h.length > 0 && S)
            if (void 0 === e) {
              const e = a.slidesGrid[g],
                t = a.slidesGrid[g + T] - e;
              a.slideTo(g + T, 0, !1, !0),
                i && (a.touches[a.isHorizontal() ? "startX" : "startY"] += t);
            } else i && a.slideToLoop(e, 0, !1, !0);
          else if (m.length > 0 && w)
            if (void 0 === e) {
              const e = a.slidesGrid[g],
                t = a.slidesGrid[g - b] - e;
              a.slideTo(g - b, 0, !1, !0),
                i && (a.touches[a.isHorizontal() ? "startX" : "startY"] += t);
            } else a.slideToLoop(e, 0, !1, !0);
        if (
          ((a.allowSlidePrev = o),
          (a.allowSlideNext = d),
          a.controller && a.controller.control && !n)
        ) {
          const t = {
            slideRealIndex: e,
            slideTo: !1,
            direction: s,
            setTranslate: i,
            activeSlideIndex: r,
            byController: !0,
          };
          Array.isArray(a.controller.control)
            ? a.controller.control.forEach((e) => {
                e.params.loop && e.loopFix(t);
              })
            : a.controller.control instanceof a.constructor &&
              a.controller.control.params.loop &&
              a.controller.control.loopFix(t);
        }
        a.emit("loopFix");
      },
      loopDestroy: function () {
        const e = this,
          { slides: t, params: s, slidesEl: i } = e;
        if (!s.loop || (e.virtual && e.params.virtual.enabled)) return;
        e.recalcSlides();
        const r = [];
        t.forEach((e) => {
          const t =
            void 0 === e.swiperSlideIndex
              ? 1 * e.getAttribute("data-swiper-slide-index")
              : e.swiperSlideIndex;
          r[t] = e;
        }),
          t.forEach((e) => {
            e.removeAttribute("data-swiper-slide-index");
          }),
          r.forEach((e) => {
            i.append(e);
          }),
          e.recalcSlides(),
          e.slideTo(e.realIndex, 0);
      },
    },
    grabCursor: {
      setGrabCursor: function (e) {
        const t = this;
        if (
          !t.params.simulateTouch ||
          (t.params.watchOverflow && t.isLocked) ||
          t.params.cssMode
        )
          return;
        const s =
          "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
        (s.style.cursor = "move"), (s.style.cursor = e ? "grabbing" : "grab");
      },
      unsetGrabCursor: function () {
        const e = this;
        (e.params.watchOverflow && e.isLocked) ||
          e.params.cssMode ||
          (e[
            "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
          ].style.cursor = "");
      },
    },
    events: {
      attachEvents: function () {
        const e = this,
          t = i(),
          { params: s } = e;
        (e.onTouchStart = C.bind(e)),
          (e.onTouchMove = M.bind(e)),
          (e.onTouchEnd = P.bind(e)),
          s.cssMode && (e.onScroll = I.bind(e)),
          (e.onClick = O.bind(e)),
          (e.onLoad = A.bind(e)),
          G || (t.addEventListener("touchstart", D), (G = !0)),
          _(e, "on");
      },
      detachEvents: function () {
        _(this, "off");
      },
    },
    breakpoints: {
      setBreakpoint: function () {
        const e = this,
          { realIndex: t, initialized: s, params: i, el: r } = e,
          n = i.breakpoints;
        if (!n || (n && 0 === Object.keys(n).length)) return;
        const a = e.getBreakpoint(n, e.params.breakpointsBase, e.el);
        if (!a || e.currentBreakpoint === a) return;
        const l = (a in n ? n[a] : void 0) || e.originalParams,
          o = B(e, i),
          d = B(e, l),
          p = i.enabled;
        o && !d
          ? (r.classList.remove(
              `${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`
            ),
            e.emitContainerClasses())
          : !o &&
            d &&
            (r.classList.add(`${i.containerModifierClass}grid`),
            ((l.grid.fill && "column" === l.grid.fill) ||
              (!l.grid.fill && "column" === i.grid.fill)) &&
              r.classList.add(`${i.containerModifierClass}grid-column`),
            e.emitContainerClasses()),
          ["navigation", "pagination", "scrollbar"].forEach((t) => {
            const s = i[t] && i[t].enabled,
              r = l[t] && l[t].enabled;
            s && !r && e[t].disable(), !s && r && e[t].enable();
          });
        const u = l.direction && l.direction !== i.direction,
          f = i.loop && (l.slidesPerView !== i.slidesPerView || u);
        u && s && e.changeDirection(), c(e.params, l);
        const h = e.params.enabled;
        Object.assign(e, {
          allowTouchMove: e.params.allowTouchMove,
          allowSlideNext: e.params.allowSlideNext,
          allowSlidePrev: e.params.allowSlidePrev,
        }),
          p && !h ? e.disable() : !p && h && e.enable(),
          (e.currentBreakpoint = a),
          e.emit("_beforeBreakpoint", l),
          f && s && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()),
          e.emit("breakpoint", l);
      },
      getBreakpoint: function (e, t = "window", s) {
        if (!e || ("container" === t && !s)) return;
        let i = !1;
        const r = n(),
          a = "window" === t ? r.innerHeight : s.clientHeight,
          l = Object.keys(e).map((e) => {
            if ("string" == typeof e && 0 === e.indexOf("@")) {
              const t = parseFloat(e.substr(1));
              return { value: a * t, point: e };
            }
            return { value: e, point: e };
          });
        l.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
        for (let n = 0; n < l.length; n += 1) {
          const { point: e, value: a } = l[n];
          "window" === t
            ? r.matchMedia(`(min-width: ${a}px)`).matches && (i = e)
            : a <= s.clientWidth && (i = e);
        }
        return i || "max";
      },
    },
    checkOverflow: {
      checkOverflow: function () {
        const e = this,
          { isLocked: t, params: s } = e,
          { slidesOffsetBefore: i } = s;
        if (i) {
          const t = e.slides.length - 1,
            s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
          e.isLocked = e.size > s;
        } else e.isLocked = 1 === e.snapGrid.length;
        !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
          !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
          t && t !== e.isLocked && (e.isEnd = !1),
          t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
      },
    },
    classes: {
      addClasses: function () {
        const e = this,
          { classNames: t, params: s, rtl: i, el: r, device: n } = e,
          a = (function (e, t) {
            const s = [];
            return (
              e.forEach((e) => {
                "object" == typeof e
                  ? Object.keys(e).forEach((i) => {
                      e[i] && s.push(t + i);
                    })
                  : "string" == typeof e && s.push(t + e);
              }),
              s
            );
          })(
            [
              "initialized",
              s.direction,
              { "free-mode": e.params.freeMode && s.freeMode.enabled },
              { autoheight: s.autoHeight },
              { rtl: i },
              { grid: s.grid && s.grid.rows > 1 },
              {
                "grid-column":
                  s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
              },
              { android: n.android },
              { ios: n.ios },
              { "css-mode": s.cssMode },
              { centered: s.cssMode && s.centeredSlides },
              { "watch-progress": s.watchSlidesProgress },
            ],
            s.containerModifierClass
          );
        t.push(...a), r.classList.add(...t), e.emitContainerClasses();
      },
      removeClasses: function () {
        const { el: e, classNames: t } = this;
        e.classList.remove(...t), this.emitContainerClasses();
      },
    },
  },
  F = {};
class H {
  constructor(...e) {
    let t, s;
    1 === e.length &&
    e[0].constructor &&
    "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
      ? (s = e[0])
      : ([t, s] = e),
      s || (s = {}),
      (s = c({}, s)),
      t && !s.el && (s.el = t);
    const r = i();
    if (
      s.el &&
      "string" == typeof s.el &&
      r.querySelectorAll(s.el).length > 1
    ) {
      const e = [];
      return (
        r.querySelectorAll(s.el).forEach((t) => {
          const i = c({}, s, { el: t });
          e.push(new H(i));
        }),
        e
      );
    }
    const n = this;
    (n.__swiper__ = !0),
      (n.support = b()),
      (n.device = x({ userAgent: s.userAgent })),
      (n.browser = E()),
      (n.eventsListeners = {}),
      (n.eventsAnyListeners = []),
      (n.modules = [...n.__modules__]),
      s.modules && Array.isArray(s.modules) && n.modules.push(...s.modules);
    const a = {};
    n.modules.forEach((e) => {
      e({
        params: s,
        swiper: n,
        extendParams: V(s, a),
        on: n.on.bind(n),
        once: n.once.bind(n),
        off: n.off.bind(n),
        emit: n.emit.bind(n),
      });
    });
    const o = c({}, N, a);
    return (
      (n.params = c({}, o, F, s)),
      (n.originalParams = c({}, n.params)),
      (n.passedParams = c({}, s)),
      n.params &&
        n.params.on &&
        Object.keys(n.params.on).forEach((e) => {
          n.on(e, n.params.on[e]);
        }),
      n.params && n.params.onAny && n.onAny(n.params.onAny),
      Object.assign(n, {
        enabled: n.params.enabled,
        el: t,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal: () => "horizontal" === n.params.direction,
        isVertical: () => "vertical" === n.params.direction,
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        allowSlideNext: n.params.allowSlideNext,
        allowSlidePrev: n.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: n.params.focusableElements,
          lastClickTime: l(),
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          evCache: [],
        },
        allowClick: !0,
        allowTouchMove: n.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      n.emit("_swiper"),
      n.params.init && n.init(),
      n
    );
  }
  recalcSlides() {
    const { slidesEl: e, params: t } = this;
    this.slides = f(e, `.${t.slideClass}, swiper-slide`);
  }
  enable() {
    const e = this;
    e.enabled ||
      ((e.enabled = !0),
      e.params.grabCursor && e.setGrabCursor(),
      e.emit("enable"));
  }
  disable() {
    const e = this;
    e.enabled &&
      ((e.enabled = !1),
      e.params.grabCursor && e.unsetGrabCursor(),
      e.emit("disable"));
  }
  setProgress(e, t) {
    const s = this;
    e = Math.min(Math.max(e, 0), 1);
    const i = s.minTranslate(),
      r = (s.maxTranslate() - i) * e + i;
    s.translateTo(r, void 0 === t ? 0 : t),
      s.updateActiveIndex(),
      s.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = e.el.className
      .split(" ")
      .filter(
        (t) =>
          0 === t.indexOf("swiper") ||
          0 === t.indexOf(e.params.containerModifierClass)
      );
    e.emit("_containerClasses", t.join(" "));
  }
  getSlideClasses(e) {
    const t = this;
    return t.destroyed
      ? ""
      : e.className
          .split(" ")
          .filter(
            (e) =>
              0 === e.indexOf("swiper-slide") ||
              0 === e.indexOf(t.params.slideClass)
          )
          .join(" ");
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = [];
    e.slides.forEach((s) => {
      const i = e.getSlideClasses(s);
      t.push({ slideEl: s, classNames: i }), e.emit("_slideClass", s, i);
    }),
      e.emit("_slideClasses", t);
  }
  slidesPerViewDynamic(e = "current", t = !1) {
    const {
      params: s,
      slides: i,
      slidesGrid: r,
      slidesSizesGrid: n,
      size: a,
      activeIndex: l,
    } = this;
    let o = 1;
    if (s.centeredSlides) {
      let e,
        t = i[l].swiperSlideSize;
      for (let s = l + 1; s < i.length; s += 1)
        i[s] &&
          !e &&
          ((t += i[s].swiperSlideSize), (o += 1), t > a && (e = !0));
      for (let s = l - 1; s >= 0; s -= 1)
        i[s] &&
          !e &&
          ((t += i[s].swiperSlideSize), (o += 1), t > a && (e = !0));
    } else if ("current" === e)
      for (let d = l + 1; d < i.length; d += 1) {
        (t ? r[d] + n[d] - r[l] < a : r[d] - r[l] < a) && (o += 1);
      }
    else
      for (let d = l - 1; d >= 0; d -= 1) {
        r[l] - r[d] < a && (o += 1);
      }
    return o;
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const { snapGrid: t, params: s } = e;
    function i() {
      const t = e.rtlTranslate ? -1 * e.translate : e.translate,
        s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
      e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let r;
    s.breakpoints && e.setBreakpoint(),
      [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
        t.complete && z(e, t);
      }),
      e.updateSize(),
      e.updateSlides(),
      e.updateProgress(),
      e.updateSlidesClasses(),
      e.params.freeMode && e.params.freeMode.enabled
        ? (i(), e.params.autoHeight && e.updateAutoHeight())
        : ((r =
            ("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) &&
            e.isEnd &&
            !e.params.centeredSlides
              ? e.slideTo(e.slides.length - 1, 0, !1, !0)
              : e.slideTo(e.activeIndex, 0, !1, !0)),
          r || i()),
      s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
      e.emit("update");
  }
  changeDirection(e, t = !0) {
    const s = this,
      i = s.params.direction;
    return (
      e || (e = "horizontal" === i ? "vertical" : "horizontal"),
      e === i ||
        ("horizontal" !== e && "vertical" !== e) ||
        (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
        s.el.classList.add(`${s.params.containerModifierClass}${e}`),
        s.emitContainerClasses(),
        (s.params.direction = e),
        s.slides.forEach((t) => {
          "vertical" === e ? (t.style.width = "") : (t.style.height = "");
        }),
        s.emit("changeDirection"),
        t && s.update()),
      s
    );
  }
  changeLanguageDirection(e) {
    const t = this;
    (t.rtl && "rtl" === e) ||
      (!t.rtl && "ltr" === e) ||
      ((t.rtl = "rtl" === e),
      (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
      t.rtl
        ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
          (t.el.dir = "rtl"))
        : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
          (t.el.dir = "ltr")),
      t.update());
  }
  mount(e) {
    const t = this;
    if (t.mounted) return !0;
    let s = e || t.params.el;
    if (("string" == typeof s && (s = document.querySelector(s)), !s))
      return !1;
    (s.swiper = t), s.shadowEl && (t.isElement = !0);
    const i = () =>
      `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let r = (() => {
      if (s && s.shadowRoot && s.shadowRoot.querySelector) {
        return s.shadowRoot.querySelector(i());
      }
      return f(s, i())[0];
    })();
    return (
      !r &&
        t.params.createElements &&
        ((r = h("div", t.params.wrapperClass)),
        s.append(r),
        f(s, `.${t.params.slideClass}`).forEach((e) => {
          r.append(e);
        })),
      Object.assign(t, {
        el: s,
        wrapperEl: r,
        slidesEl: t.isElement ? s : r,
        mounted: !0,
        rtl: "rtl" === s.dir.toLowerCase() || "rtl" === m(s, "direction"),
        rtlTranslate:
          "horizontal" === t.params.direction &&
          ("rtl" === s.dir.toLowerCase() || "rtl" === m(s, "direction")),
        wrongRTL: "-webkit-box" === m(r, "display"),
      }),
      !0
    );
  }
  init(e) {
    const t = this;
    if (t.initialized) return t;
    return (
      !1 === t.mount(e) ||
        (t.emit("beforeInit"),
        t.params.breakpoints && t.setBreakpoint(),
        t.addClasses(),
        t.updateSize(),
        t.updateSlides(),
        t.params.watchOverflow && t.checkOverflow(),
        t.params.grabCursor && t.enabled && t.setGrabCursor(),
        t.params.loop && t.virtual && t.params.virtual.enabled
          ? t.slideTo(
              t.params.initialSlide + t.virtual.slidesBefore,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0
            )
          : t.slideTo(
              t.params.initialSlide,
              0,
              t.params.runCallbacksOnInit,
              !1,
              !0
            ),
        t.params.loop && t.loopCreate(),
        t.attachEvents(),
        [...t.el.querySelectorAll('[loading="lazy"]')].forEach((e) => {
          e.complete
            ? z(t, e)
            : e.addEventListener("load", (e) => {
                z(t, e.target);
              });
        }),
        (t.initialized = !0),
        t.emit("init"),
        t.emit("afterInit")),
      t
    );
  }
  destroy(e = !0, t = !0) {
    const s = this,
      { params: i, el: r, wrapperEl: n, slides: a } = s;
    return (
      void 0 === s.params ||
        s.destroyed ||
        (s.emit("beforeDestroy"),
        (s.initialized = !1),
        s.detachEvents(),
        i.loop && s.loopDestroy(),
        t &&
          (s.removeClasses(),
          r.removeAttribute("style"),
          n.removeAttribute("style"),
          a &&
            a.length &&
            a.forEach((e) => {
              e.classList.remove(
                i.slideVisibleClass,
                i.slideActiveClass,
                i.slideNextClass,
                i.slidePrevClass
              ),
                e.removeAttribute("style"),
                e.removeAttribute("data-swiper-slide-index");
            })),
        s.emit("destroy"),
        Object.keys(s.eventsListeners).forEach((e) => {
          s.off(e);
        }),
        !1 !== e &&
          ((s.el.swiper = null),
          (function (e) {
            const t = e;
            Object.keys(t).forEach((e) => {
              try {
                t[e] = null;
              } catch (s) {}
              try {
                delete t[e];
              } catch (s) {}
            });
          })(s)),
        (s.destroyed = !0)),
      null
    );
  }
  static extendDefaults(e) {
    c(F, e);
  }
  static get extendedDefaults() {
    return F;
  }
  static get defaults() {
    return N;
  }
  static installModule(e) {
    H.prototype.__modules__ || (H.prototype.__modules__ = []);
    const t = H.prototype.__modules__;
    "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
  }
  static use(e) {
    return Array.isArray(e)
      ? (e.forEach((e) => H.installModule(e)), H)
      : (H.installModule(e), H);
  }
}
function j({ swiper: e, extendParams: t, on: s, emit: i }) {
  t({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled",
    },
  }),
    (e.navigation = { nextEl: null, prevEl: null });
  const r = (e) => (Array.isArray(e) || (e = [e].filter((e) => !!e)), e);
  function n(t) {
    let s;
    return t &&
      "string" == typeof t &&
      e.isElement &&
      ((s = e.el.shadowRoot.querySelector(t)), s)
      ? s
      : (t &&
          ("string" == typeof t && (s = [...document.querySelectorAll(t)]),
          e.params.uniqueNavElements &&
            "string" == typeof t &&
            s.length > 1 &&
            1 === e.el.querySelectorAll(t).length &&
            (s = e.el.querySelector(t))),
        t && !s ? t : s);
  }
  function a(t, s) {
    const i = e.params.navigation;
    (t = r(t)).forEach((t) => {
      t &&
        (t.classList[s ? "add" : "remove"](i.disabledClass),
        "BUTTON" === t.tagName && (t.disabled = s),
        e.params.watchOverflow &&
          e.enabled &&
          t.classList[e.isLocked ? "add" : "remove"](i.lockClass));
    });
  }
  function l() {
    const { nextEl: t, prevEl: s } = e.navigation;
    if (e.params.loop) return a(s, !1), void a(t, !1);
    a(s, e.isBeginning && !e.params.rewind), a(t, e.isEnd && !e.params.rewind);
  }
  function o(t) {
    t.preventDefault(),
      (!e.isBeginning || e.params.loop || e.params.rewind) &&
        (e.slidePrev(), i("navigationPrev"));
  }
  function d(t) {
    t.preventDefault(),
      (!e.isEnd || e.params.loop || e.params.rewind) &&
        (e.slideNext(), i("navigationNext"));
  }
  function c() {
    const t = e.params.navigation;
    if (
      ((e.params.navigation = (function (e, t, s, i) {
        return (
          e.params.createElements &&
            Object.keys(i).forEach((r) => {
              if (!s[r] && !0 === s.auto) {
                let n = f(e.el, `.${i[r]}`)[0];
                n ||
                  ((n = h("div", i[r])), (n.className = i[r]), e.el.append(n)),
                  (s[r] = n),
                  (t[r] = n);
              }
            }),
          s
        );
      })(e, e.originalParams.navigation, e.params.navigation, {
        nextEl: "swiper-button-next",
        prevEl: "swiper-button-prev",
      })),
      !t.nextEl && !t.prevEl)
    )
      return;
    let s = n(t.nextEl),
      i = n(t.prevEl);
    Object.assign(e.navigation, { nextEl: s, prevEl: i }),
      (s = r(s)),
      (i = r(i));
    const a = (s, i) => {
      s && s.addEventListener("click", "next" === i ? d : o),
        !e.enabled && s && s.classList.add(t.lockClass);
    };
    s.forEach((e) => a(e, "next")), i.forEach((e) => a(e, "prev"));
  }
  function p() {
    let { nextEl: t, prevEl: s } = e.navigation;
    (t = r(t)), (s = r(s));
    const i = (t, s) => {
      t.removeEventListener("click", "next" === s ? d : o),
        t.classList.remove(e.params.navigation.disabledClass);
    };
    t.forEach((e) => i(e, "next")), s.forEach((e) => i(e, "prev"));
  }
  s("init", () => {
    !1 === e.params.navigation.enabled ? u() : (c(), l());
  }),
    s("toEdge fromEdge lock unlock", () => {
      l();
    }),
    s("destroy", () => {
      p();
    }),
    s("enable disable", () => {
      let { nextEl: t, prevEl: s } = e.navigation;
      (t = r(t)),
        (s = r(s)),
        [...t, ...s]
          .filter((e) => !!e)
          .forEach((t) =>
            t.classList[e.enabled ? "remove" : "add"](
              e.params.navigation.lockClass
            )
          );
    }),
    s("click", (t, s) => {
      let { nextEl: n, prevEl: a } = e.navigation;
      (n = r(n)), (a = r(a));
      const l = s.target;
      if (e.params.navigation.hideOnClick && !a.includes(l) && !n.includes(l)) {
        if (
          e.pagination &&
          e.params.pagination &&
          e.params.pagination.clickable &&
          (e.pagination.el === l || e.pagination.el.contains(l))
        )
          return;
        let t;
        n.length
          ? (t = n[0].classList.contains(e.params.navigation.hiddenClass))
          : a.length &&
            (t = a[0].classList.contains(e.params.navigation.hiddenClass)),
          i(!0 === t ? "navigationShow" : "navigationHide"),
          [...n, ...a]
            .filter((e) => !!e)
            .forEach((t) =>
              t.classList.toggle(e.params.navigation.hiddenClass)
            );
      }
    });
  const u = () => {
    e.el.classList.add(e.params.navigation.navigationDisabledClass), p();
  };
  Object.assign(e.navigation, {
    enable: () => {
      e.el.classList.remove(e.params.navigation.navigationDisabledClass),
        c(),
        l();
    },
    disable: u,
    update: l,
    init: c,
    destroy: p,
  });
}
Object.keys($).forEach((e) => {
  Object.keys($[e]).forEach((t) => {
    H.prototype[t] = $[e][t];
  });
}),
  H.use([
    function ({ swiper: e, on: t, emit: s }) {
      const i = n();
      let r = null,
        a = null;
      const l = () => {
          e &&
            !e.destroyed &&
            e.initialized &&
            (s("beforeResize"), s("resize"));
        },
        o = () => {
          e && !e.destroyed && e.initialized && s("orientationchange");
        };
      t("init", () => {
        e.params.resizeObserver && void 0 !== i.ResizeObserver
          ? e &&
            !e.destroyed &&
            e.initialized &&
            ((r = new ResizeObserver((t) => {
              a = i.requestAnimationFrame(() => {
                const { width: s, height: i } = e;
                let r = s,
                  n = i;
                t.forEach(
                  ({ contentBoxSize: t, contentRect: s, target: i }) => {
                    (i && i !== e.el) ||
                      ((r = s ? s.width : (t[0] || t).inlineSize),
                      (n = s ? s.height : (t[0] || t).blockSize));
                  }
                ),
                  (r === s && n === i) || l();
              });
            })),
            r.observe(e.el))
          : (i.addEventListener("resize", l),
            i.addEventListener("orientationchange", o));
      }),
        t("destroy", () => {
          a && i.cancelAnimationFrame(a),
            r && r.unobserve && e.el && (r.unobserve(e.el), (r = null)),
            i.removeEventListener("resize", l),
            i.removeEventListener("orientationchange", o);
        });
    },
    function ({ swiper: e, extendParams: t, on: s, emit: i }) {
      const r = [],
        a = n(),
        l = (e, t = {}) => {
          const s = new (a.MutationObserver || a.WebkitMutationObserver)(
            (e) => {
              if (1 === e.length) return void i("observerUpdate", e[0]);
              const t = function () {
                i("observerUpdate", e[0]);
              };
              a.requestAnimationFrame
                ? a.requestAnimationFrame(t)
                : a.setTimeout(t, 0);
            }
          );
          s.observe(e, {
            attributes: void 0 === t.attributes || t.attributes,
            childList: void 0 === t.childList || t.childList,
            characterData: void 0 === t.characterData || t.characterData,
          }),
            r.push(s);
        };
      t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
        s("init", () => {
          if (e.params.observer) {
            if (e.params.observeParents) {
              const t = (function (e, t) {
                const s = [];
                let i = e.parentElement;
                for (; i; )
                  t ? i.matches(t) && s.push(i) : s.push(i),
                    (i = i.parentElement);
                return s;
              })(e.el);
              for (let e = 0; e < t.length; e += 1) l(t[e]);
            }
            l(e.el, { childList: e.params.observeSlideChildren }),
              l(e.wrapperEl, { attributes: !1 });
          }
        }),
        s("destroy", () => {
          r.forEach((e) => {
            e.disconnect();
          }),
            r.splice(0, r.length);
        });
    },
  ]);
export { j as N, H as S };
