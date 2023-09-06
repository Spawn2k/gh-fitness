'use strict';
import { svgDeadlift } from './svg.js';

const DOM = {};
DOM.pathDeadliftEl = document.querySelector('path.deadlift');
DOM.pathLeftEl = document.querySelector('path');
DOM.pathCenterEl = document.querySelector('path');
DOM.pathRightEl = document.querySelector('path');

const width = window.innerWidth;

const onRezize = (e) => {
  const innerWidth = window.innerWidth;
  const offsetBottom = 186 + (width - innerWidth) * 2;
  const offsetTop = 1438.76 + (width - innerWidth);
  // console.log(Math.floor(offsetBottom));

  // console.log(svgDeadlift(Math.floor(offsetBottom), Math.floor(offsetTop)));

  // DOM.pathDeadliftEl.setAttribute('d', svgDeadlift(Math.floor(offsetBottom), Math.floor(offsetTop)));
  // DOM.pathLeftEl.setAttribute('d', svgLeft);
};
window.addEventListener('resize', onRezize);

let path = document.querySelector('.test');
let pathLength = path.getTotalLength();

path.style.strokeDasharray = pathLength;

window.addEventListener('scroll', () => {
  let strokeDashoffset = document.documentElement.scrollTop - 2000;
  let point = path.getPointAtLength(document.documentElement.scrollTop);
  // console.log(point);
  let speed = 1;

  const test = path.getPointAtLength(document.documentElement.scrollTop);
  var scrollPercent =
    (document.body.scrollTop +
      document.documentElement.scrollTop +
      (document.documentElement.clientHeight - 2200) * speed) /
    document.documentElement.scrollHeight;
  // if (scrollPercent > 0.1316966554843956) {
  //   path.style.strokeDashoffset = pathLength - 1700 + scrollPercent * 0.8 * pathLength;
  //   console.log(scrollPercent * 2 * pathLength);
  // } else if (scrollPercent < 0.1316966554843956) {
  //   path.style.strokeDashoffset = pathLength + scrollPercent * 2 * pathLength;
  //   console.log('log');
  // }

  timing(scrollPercent, pathLength);
});

const timing = (scrollPercent, pathLength) => {
  console.log(scrollPercent);
  if (scrollPercent < 0.3316966554843956) {
    path.style.strokeDashoffset = pathLength - 1700 + scrollPercent * 0.8 * pathLength;
  }
  if (scrollPercent >= 0.3316966554843956 && scrollPercent < 0.3916966554843956) {
    path.style.strokeDashoffset = pathLength - 1700 + scrollPercent * 1.26 * pathLength;
  }
  if (scrollPercent >= 0.3916966554843956 && scrollPercent < 0.4216966554843956) {
    if (pathLength - 1700 + scrollPercent * 1.26 * pathLength > pathLength - 1700 + scrollPercent * 1.2 * pathLength) {
      return;
    }
    path.style.strokeDashoffset = pathLength - 1700 + scrollPercent * 1.2 * pathLength;
  }
  if (scrollPercent >= 0.4216966554843956 && scrollPercent < 0.4816966554843956) {
    if (
      pathLength - 1700 + scrollPercent * 1.2 * pathLength >
      pathLength - 1700 + scrollPercent * 1 * (pathLength + 2500)
    ) {
      console.log('ok');
      return;
    }
    path.style.strokeDashoffset = pathLength - 1700 + scrollPercent * 1.05 * (pathLength + 1000);
  }
  if (scrollPercent >= 0.4816966554843956 && scrollPercent < 0.5116966554843956) {
    path.style.strokeDashoffset = pathLength - 1700 + scrollPercent * 1.3 * pathLength;
  }
  if (scrollPercent >= 0.5116966554843956 && scrollPercent < 0.5416966554843956) {
    path.style.strokeDashoffset = pathLength - 1700 + scrollPercent * 1.5 * pathLength;
  }
  if (scrollPercent >= 0.5416966554843956 && scrollPercent < 0.5816966554843956) {
    if (
      pathLength - 1700 + scrollPercent * 1.5 * pathLength >
      pathLength - 1000 + scrollPercent * 1 * (pathLength + 0)
    ) {
      console.log('log');
      return;
    }
    path.style.strokeDashoffset = pathLength - 1000 + scrollPercent * 1 * (pathLength + 0);
  }
  if (scrollPercent >= 0.5816966554843956 && scrollPercent < 0.6116966554843956) {
    if (
      pathLength - 1000 + scrollPercent * 0.78 * (pathLength + 6500) >
      pathLength - 1000 + scrollPercent * 0.78 * (pathLength + 3500)
    ) {
      return;
    }
    path.style.strokeDashoffset = pathLength - 1000 + scrollPercent * 0.78 * (pathLength + 3500);
  }
  if (scrollPercent >= 0.6116966554843956 && scrollPercent < 0.6316966554843956) {
    if (pathLength > pathLength - 1000 + scrollPercent * 0.78 * (pathLength + 3500)) {
      return;
    }
    path.style.strokeDashoffset = pathLength - 700 + scrollPercent * 0.8 * (pathLength + 5000);
  }
  if (scrollPercent >= 0.6316966554843956 && scrollPercent < 0.6916966554843956) {
    path.style.strokeDashoffset = pathLength - 300 + scrollPercent * 0.8 * (pathLength + 4000);
    //   console.log(scrollPercent * 2 * pathLength);
  }
  if (scrollPercent > 0.6916966554843956 && scrollPercent < 0.7116966554843956) {
    path.style.strokeDashoffset = pathLength + scrollPercent * 1 * (pathLength + 2000);
    //   console.log(scrollPercent * 2 * pathLength);
  }
  if (scrollPercent > 0.7116966554843956) {
    path.style.strokeDashoffset = pathLength + scrollPercent * 1.33 * (pathLength + 0);
    //   console.log(scrollPercent * 2 * pathLength);
  }
};
