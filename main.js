const play = require('audio-play');
const load = require('audio-loader');
const afterLoad = require('after-load');
const jsdom = require("jsdom");
const prompt = require('prompt-sync')();
const { JSDOM } = jsdom;

// play audio
const play_audio = async() => {
  load('./alarm.wav').then(play);
};
var cell = 'td50';
const check_natega = async () => {
  (async (url) => {
    html = await afterLoad(url);
    const dom = new JSDOM(html);

    // CMP 4th year, change if you want another year
    // Try cell = td50 e3dady
    flag = dom.window.document.getElementById(cell)
    .getElementsByTagName('a')
    .length > 0;
    if (flag) {
      play_audio();
      console.log('El Natega Zahreeet!');
    }
  })('http://www.results.eng.cu.edu.eg');
};

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

const choose_department = () => {
    const dep = Number(prompt(
      "Choose Your Department:\n"+
      "1: Etsalat\n"+
      "2: Kahrabah Power\n"+
      "3: Petrol\n"+
      "4: Felezat\n"+
      "5: Managem\n"+
      "6: Tbyah\n"+
      "7: Tyaran\n"+
      "8: 3marah\n"+
      "9: Kmya\n"+
      "10: Mekaneka\n"+
      "11: 7asebat\n"+
      "12: E3dady\n\nEnter Department: "
    ));
    if (dep < 1 || dep > 12) {
      return 0;
    }

    if (dep == 12) {
      return 50;
    } else if (dep == 10) {
      const year = Number(prompt(
        "Choose Your Year:\n\n"+
        "1: First Year\n"+
        "2: Second Year\n"+
        "3: Third Year (Power)\n"+
        "4: Forth Year (Power)\n"+
        "5: Third Year (Production)\n"+
        "6: Forth Year (Production)\n\nEnter Year: "
      ));
      switch (year) {
        case 1:
          return 41;
        case 2:
          return 42;
        case 3:
          return 39;
        case 4:
          return 40;
        case 5:
          return 43;
        case 6:
          return 44;
        default:
          return 0;
      }
    } else {
      const year = Number(prompt(
        "Choose Your Year:\n\n"+
        "1: First Year\n"+
        "2: Second Year\n"+
        "3: Third Year\n"+
        "4: Forth Year\n\nEnter Year: "
      ));
      if (year < 1 || year > 4) {
        return 0;
      }
      var cell;
      if (dep > 10) {
        cell = ((dep - 11) * 4) + 44 + year;
      } else {
        cell = ((dep - 1) * 4) + year;
      }
      return cell;
    }
}

const run = async() => {
  const cell_num = choose_department();
  if (cell_num != 0) {
    // run for one day
    cell = 'td' + String(cell_num);
    for (var i = 1; i <= 2880; ++i) {
      await check_natega();
      await sleep(30000);
    }
  }
};

run();
