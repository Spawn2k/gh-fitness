'use strict';
// import '../scss/main.scss';

(() => {
  // === DOM & letS =======
  const DOM = {};

  DOM.h1El = document.querySelector('h1');
  DOM.asideEl = document.querySelector('aside');
  DOM.asideImageEls = Array.from(DOM.asideEl.querySelectorAll('div'));
  DOM.deadliftLiEls = Array.from(document.querySelectorAll('.sec-deadlift li'));
  DOM.deadLiftMotiTextEl = document.querySelector('.motiv-text');
  DOM.deadliftLiFirstEl = document.querySelector('.sec-deadlift li:first-child');
  DOM.deadliftLiLastEl = document.querySelector('.sec-deadlift li:last-child');
  DOM.benchLiEls = Array.from(document.querySelectorAll('.sec-bench li'));
  DOM.benchLiLastEl = document.querySelector('.sec-bench li:last-child');
  DOM.benchMotiTextEl = document.querySelector('.motiv-text.bench span:first-child');
  DOM.benchMotiText2El = document.querySelector('.motiv-text.bench span:last-child');
  DOM.squatLiEls = Array.from(document.querySelectorAll('.sec-squat li'));
  DOM.squatLiLastEl = document.querySelector('.sec-squat li:last-child');
  DOM.squatMotiTextEl = document.querySelector('.motiv-text.squat span:first-child');
  DOM.squatMotiText2El = document.querySelector('.motiv-text.squat span:last-child');
  DOM.imageRepeat = Array.from(document.querySelectorAll('.sec-img div'));

  DOM.svgDeadliftEls = Array.from(document.querySelectorAll('.svg-deadlift-parts'));
  DOM.svgBenchEls = Array.from(document.querySelectorAll('.svg-bench-parts'));
  DOM.svgSquatEls = Array.from(document.querySelectorAll('.svg-squat-parts'));
  DOM.svgCycleEls = Array.from(document.querySelectorAll('.svg-cycle-parts'));
  DOM.svgEl = document.querySelector('.svg-container svg');
  let path = document.querySelector('.svg-main');
  let pathLength = path.getTotalLength();

  path.style.strokeDasharray = pathLength;

  // text start/end-posotion for up and down scroll
  let asideMotiImg = 900;
  let imgageRepeat = 700;
  let deadliftMotivationText = 800;
  let deadliftGuidance = 900;
  let benchMotivationText = 600;
  let benchMotivationText2 = 800;
  let benchGuidance = 900;
  let squatMotivationText = 600;
  let squatMotivationText2 = 800;
  let squatGuidance = 900;

  // svg - parts start position
  const svgDeadliftsPosition = [
    { start: 35.3, end: 37.3 },
    { start: 35.6, end: 37.6 },
    { start: 35.9, end: 37.9 },
  ];

  const svgBenchPosition = [
    { start: 54.3, end: 54.3 },
    { start: 54.6, end: 54.6 },
  ];

  const svgSquatPosition = [
    { start: 75.3, end: 75.3 },
    { start: 75.6, end: 75.6 },
  ];

  const svgCyclePosition = [
    { start: 91.3, end: 95.3 },
    { start: 91.3, end: 95.3 },
    { start: 91.3, end: 95.3 },
    { start: 91.3, end: 95.3 },
  ];

  // === INIT =============
  const init = () => {
    window.addEventListener('scroll', onScroll);
  };

  // === EVENTHANDLER =====

  const onScroll = (e) => {
    //hero Parallex
    const pos = window.scrollY * DOM.h1El.dataset.rate;
    if (DOM.h1El.dataset.direction === 'vertical') {
      DOM.h1El.style.transform = 'translate3d(0px,' + pos + 'px, 0px)';
    } else {
      let posX = window.scrollY * DOM.h1El.dataset.ratex;
      let posY = window.scrollY * DOM.h1El.dataset.ratey;

      DOM.h1El.style.transform = 'translate3d(' + posX + 'px, ' + posY + 'px,0px)';
    }

    //svg main onScroll
    let scrollPercent =
      (document.body.scrollTop + document.documentElement.scrollTop + document.documentElement.clientHeight) /
      document.documentElement.scrollHeight;

    timing(scrollPercent, pathLength);

    //svg parts onScroll
    scrollEvent(DOM.svgDeadliftEls, svgDeadliftsPosition);
    scrollEvent(DOM.svgBenchEls, svgBenchPosition);
    scrollEvent(DOM.svgSquatEls, svgSquatPosition);
    scrollEvent(DOM.svgCycleEls, svgCyclePosition);

    //on-scroll animate text
    enableAnimate(DOM.asideImageEls, asideMotiImg);
    enableAnimate(DOM.deadLiftMotiTextEl, deadliftMotivationText);
    enableAnimate(DOM.deadliftLiEls, deadliftGuidance);
    enableAnimate(DOM.benchMotiTextEl, benchMotivationText);
    enableAnimate(DOM.benchMotiText2El, benchMotivationText2);
    enableAnimate(DOM.benchLiEls, benchGuidance);
    enableAnimate(DOM.squatLiEls, squatGuidance);
    enableAnimate(DOM.squatMotiTextEl, squatMotivationText);
    enableAnimate(DOM.squatMotiText2El, squatMotivationText2);
    enableAnimate(DOM.imageRepeat, imgageRepeat);

    // toggle and reset animate
    removeAnimateBottom(DOM.deadliftLiLastEl, [DOM.deadliftLiEls, DOM.deadLiftMotiTextEl], 'deadliftMotivationText');
    removeAnimateTop(DOM.deadliftLiFirstEl, [DOM.deadLiftMotiTextEl, DOM.deadliftLiEls], 'deadliftTop');

    removeAnimateTop(DOM.benchMotiTextEl, [DOM.benchMotiTextEl, DOM.benchMotiText2El, DOM.benchLiEls], 'benchTop');
    removeAnimateBottom(
      DOM.benchLiLastEl,
      [DOM.benchLiEls, DOM.benchMotiTextEl, DOM.benchMotiText2El],
      'benchMotivationBottom'
    );

    removeAnimateTop(DOM.squatMotiTextEl, [DOM.squatLiEls, DOM.squatMotiTextEl, DOM.squatMotiText2El], 'squatTop');
    removeAnimateBottom(
      DOM.squatLiLastEl,
      [DOM.squatLiEls, DOM.squatMotiTextEl, DOM.squatMotiText2El],
      'squatMotivationBottom'
    );
  };

  // === XHR/FETCH ========

  // === FUNCTIONS ========

  const removeAnimateBottom = (element, array = [], offsetEl) => {
    const trigger = element.getBoundingClientRect().bottom;
    if (trigger < -20) {
      element.classList.remove('show-animate');
      array.forEach((item) => {
        if (Array.isArray(item)) {
          item.forEach((el) => el.classList.remove('show-animate'));
        } else {
          item.classList.remove('show-animate');
        }
      });
      setOffset(offsetEl);
    }
  };

  const removeAnimateTop = (element, array = [], offsetEl) => {
    const trigger = element.getBoundingClientRect().top;
    if (trigger - window.innerHeight > 20) {
      array.forEach((item) => {
        if (Array.isArray(item)) {
          item.forEach((el) => el.classList.remove('show-animate'));
        } else {
          item.classList.remove('show-animate');
        }
      });
      setOffset(offsetEl);
    }
  };

  const enableAnimate = (element, position = 0) => {
    const top = window.scrollY;
    const offset = element.offsetTop - position;
    const height = element.offsetHeight;

    if (Array.isArray(element)) {
      element.forEach((el) => {
        const offset = el.offsetTop - position;
        const height = el.offsetHeight;
        if (top >= offset && top < offset + height) {
          el.classList.add('show-animate');
        } else {
          // el.classList.remove('show-animate');
          // if (el.classList.contains('show-animate')) {
          // }
        }
      });
    }

    if (top >= offset && top < offset + height) {
      element.classList.add('show-animate');
    }
  };

  const setOffset = (name) => {
    switch (name) {
      case 'deadliftTop':
        benchMotivationText = 600;
        benchMotivationText2 = 600;
        benchGuidance = 900;
        deadliftMotivationText = 800;
        deadliftGuidance = 900;
        break;
      case 'benchTop':
        benchMotivationText = 600;
        benchMotivationText2 = 800;
        benchGuidance = 900;
        break;
      case 'deadliftMotivationText':
        deadliftMotivationText = 300;
        deadliftGuidance = 100;
        break;
      case 'benchMotivationBottom':
        benchMotivationText = 100;
        benchMotivationText2 = 300;
        benchGuidance = 100;
        break;
      case 'squatTop':
        squatMotivationText = 600;
        squatMotivationText2 = 800;
        squatGuidance = 900;
        break;
      case 'squatMotivationBottom':
        squatMotivationText = 100;
        squatMotivationText2 = 300;
        squatGuidance = 100;
      default:
        return;
    }
  };

  const timing = (scrollPercent, pathLength) => {
    if (scrollPercent < 0.3103529411764706) {
      path.style.strokeDashoffset = pathLength + scrollPercent * pathLength * 0.47;
    }
    if (scrollPercent >= 0.3103529411764706 && scrollPercent < 0.3343529411764706) {
      path.style.strokeDashoffset = pathLength + scrollPercent * pathLength * 0.54;
    }
    if (scrollPercent >= 0.3343529411764706 && scrollPercent < 0.3403529411764706) {
      path.style.strokeDashoffset = pathLength + scrollPercent * pathLength * 0.66;
    }
    if (scrollPercent >= 0.3403529411764706 && scrollPercent < 0.3503529411764706) {
      path.style.strokeDashoffset = pathLength + scrollPercent * pathLength * 0.68;
    }
    if (scrollPercent >= 0.3503529411764706 && scrollPercent < 0.3543529411764706) {
      path.style.strokeDashoffset = pathLength + scrollPercent * pathLength * 0.74;
    }
    if (scrollPercent >= 0.3543529411764706 && scrollPercent < 0.3603529411764706) {
      path.style.strokeDashoffset = pathLength + scrollPercent * pathLength * 0.82;
    }
    if (scrollPercent >= 0.3603529411764706 && scrollPercent < 0.3753529411764706) {
      path.style.strokeDashoffset = pathLength + scrollPercent * pathLength * 0.93;
    }

    if (scrollPercent >= 0.3753529411764706 && scrollPercent < 0.5153529411764706) {
      const prevOffset = 1450;
      const currOffset = 0;
      path.style.strokeDashoffset = pathLength + scrollPercent * pathLength * 0.6 + prevOffset;
    }

    if (scrollPercent >= 0.5153529411764706 && scrollPercent < 0.5353529411764706) {
      const prevOffset = 1450;
      const currOffset = 700 + prevOffset;
      path.style.strokeDashoffset = pathLength + scrollPercent * pathLength * 0.6 + currOffset;
    }

    if (scrollPercent >= 0.5353529411764706 && scrollPercent < 0.7483529411764706) {
      const prevOffset = 1450;
      const currOffset = 2200 + prevOffset;
      path.style.strokeDashoffset = pathLength + scrollPercent * pathLength * 0.6 + currOffset;
    }

    if (scrollPercent >= 0.7483529411764706 && scrollPercent < 0.7583529411764706) {
      const prevOffset = 1450;
      const currOffset = 2800 + prevOffset;
      path.style.strokeDashoffset = pathLength + scrollPercent * pathLength * 0.6 + currOffset;
    }

    if (scrollPercent >= 0.7583529411764706 && scrollPercent < 0.7683529411764706) {
      const prevOffset = 1450;
      const currOffset = 3400 + prevOffset;
      path.style.strokeDashoffset = pathLength + scrollPercent * pathLength * 0.6 + currOffset;
    }
    if (scrollPercent >= 0.7683529411764706 && scrollPercent < 0.9283529411764706) {
      const prevOffset = 1450;
      const currOffset = 4000 + prevOffset;
      path.style.strokeDashoffset = pathLength + scrollPercent * pathLength * 0.6 + currOffset;
    }
  };

  const calcPathLength = (elem) => {
    if (elem.getTotalLength) {
      // It's a path
      return elem.getTotalLength();
    } else if (elem.tagName === 'rect') {
      // Handle rect elements: perimeter length = w + w + h + h
      return (elem.width.baseVal.value + elem.height.baseVal.value) * 2;
    } else if (elem.tagName === 'circle') {
      // Handle circle elements: perimeter length = 2 * r * PI
      return elem.r.baseVal.value * 2 * Math.PI;
    } else if (elem.tagName === 'line') {
      // Handle line elements: use pythagoras' theorem
      let dx = elem.x2.baseVal.value - elem.x1.baseVal.value;
      let dy = elem.y2.baseVal.value - elem.y1.baseVal.value;
      return Math.sqrt(dx * dx + dy * dy);
    }
    // If you use other elem types, you will have to add support for them here.
  };

  const scrollEvent = (elements, positions) => {
    let scrollPercent =
      (document.body.scrollTop + document.documentElement.scrollTop + document.documentElement.clientHeight * 1) /
      document.documentElement.scrollHeight;

    for (let i = 0; i < elements.length; i++) {
      const data = elements[i];
      const dashLen = calcPathLength(data);
      let fractionThroughThisElem =
        (scrollPercent * 100 - positions[i].start) / (positions[i].end - positions[i].start);
      // console.log(fractionThroughThisElem);
      fractionThroughThisElem = Math.max(fractionThroughThisElem, 0);
      fractionThroughThisElem = Math.min(fractionThroughThisElem, 1);
      let dashOffset = dashLen * (1 - fractionThroughThisElem);

      data.setAttribute('stroke-dasharray', dashLen);
      data.setAttribute('stroke-dashoffset', dashOffset);
    }

    // console.log(scrollPercent);
  };

  function fnBrowserDetect() {
    let browserName = (function (agent) {
      switch (true) {
        case agent.indexOf('edge') > -1:
          return 'MS Edge';
        case agent.indexOf('edg/') > -1:
          return 'Edge (chromium based)';
        case agent.indexOf('opr') > -1 && !!window.opr:
          return 'Opera';
        case agent.indexOf('chrome') > -1 && !!window.chrome:
          return 'Chrome';
        case agent.indexOf('trident') > -1:
          return 'MS IE';
        case agent.indexOf('firefox') > -1:
          return 'Mozilla Firefox';
        case agent.indexOf('safari') > -1:
          return 'Safari';
        default:
          return 'other';
      }
    })(window.navigator.userAgent.toLowerCase());
    return browserName.toLowerCase();
  }
  init();
})();
