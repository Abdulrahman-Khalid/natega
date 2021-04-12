const play = require('audio-play');
const load = require('audio-loader');
const afterLoad = require('after-load');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// play audio
const play_audio = async() => {
  load('./alarm.wav').then(play);
};

const check_natega = async () => {
  (async (url) => {
    html = await afterLoad(url);
    const dom = new JSDOM(html);

    // CMP 4th year, change if you want another year
    // Try td50 e3dady
    flag = dom.window.document.getElementById('td48')
    .getElementsByTagName('a')
    .length > 0;
    if (flag) {
      play_audio();
      console.log('El Natega Zahreeet!');
    }
  })('http://www.results.eng.cu.edu.eg');
};

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

const run = async() => {
  // run for one day
  for (i = 1; i <= 2880; ++i) {
    await check_natega();
    await sleep(30000);
  }
};

run();
