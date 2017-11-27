'use strict';

var URL = 'videos.json';

function createHeader() {
  var section = document.createElement('div');
  section.setAttribute('class', 'section');

  var header = document.createElement('h1');
  var text = document.createTextNode('Myndbandaleigan');
  header.setAttribute('class', 'title');

  header.appendChild(text);
  section.appendChild(header);
  document.querySelector('main').appendChild(section);
}

function showTitle(section, title) {
  section.setAttribute('class', 'category');

  var h1 = document.createElement('h1');
  h1.setAttribute('class', 'category_title');
  var titill = document.createTextNode(title);

  h1.appendChild(titill);
  section.appendChild(h1);
  document.querySelector('main').appendChild(section);
}

function showVideo(section, videoboxes, video) {
  document.querySelector('main').appendChild(section);

  var div = document.createElement('div');
  div.setAttribute('class', 'video_box');
  videoboxes.appendChild(div);

  var img = document.createElement('IMG');
  img.src = video.poster;
  img.setAttribute('class', 'VideoImg');

  var id = video.id;

  img.addEventListener('click', function () {
    window.location.href = 'video.html?id=' + id;
  });

  div.appendChild(img);
  var lengd = video.duration;

  var min = Math.floor(lengd / 60);
  var sek = lengd % 60;

  if (sek < 10) {
    sek = '0' + sek;
  }
  if (min < 10) {
    min = '0' + min;
  }

  var div2 = document.createElement('div');
  div2.setAttribute('class', 'video_duration');
  var text = document.createTextNode(min + ':' + sek);

  div2.appendChild(text);
  div.appendChild(div2);

  var pTitle = document.createElement('p');
  var title = document.createTextNode(video.title);
  pTitle.setAttribute('class', 'video_title');
  pTitle.appendChild(title);
  div.appendChild(pTitle);

  var date1 = new Date();
  var date1Sec = Math.round(date1.getTime() / 1000);
  var date2 = new Date(video.created);
  var date2Sec = Math.round(date2.getTime() / 1000);
  var timi = Math.floor(date1Sec - date2Sec);

  var hour = 60 * 60;
  var day = hour * 24;
  var week = day * 7;
  var month = day * 31;
  var year = day * 365;

  if (year < timi) {
    var ar = Math.floor(timi / year);
    var yearP = document.createElement('p');
    yearP.setAttribute('class', 'video_date');
    if (ar === 1) {
      var yearText = document.createTextNode('Fyrir 1 ári síðan');
      yearP.appendChild(yearText);
    } else {
      var _yearText = document.createTextNode('Fyrir ' + ar + ' \xE1rum s\xED\xF0an');
      yearP.appendChild(_yearText);
    }
    div.appendChild(yearP);
  } else if (month < timi) {
    var manudur = Math.floor(timi / month);
    var monthP = document.createElement('p');
    monthP.setAttribute('class', 'video_date');
    if (manudur === 1) {
      var monthText = document.createTextNode('Fyrir 1 mánuði síðan');
      monthP.appendChild(monthText);
    } else {
      var _monthText = document.createTextNode('Fyrir ' + manudur + ' m\xE1nu\xF0um s\xED\xF0an');
      monthP.appendChild(_monthText);
    }
    div.appendChild(monthP);
  } else if (week < timi) {
    var vika = Math.floor(timi / week);
    var weekP = document.createElement('p');
    weekP.setAttribute('class', 'video_date');
    if (vika === 1) {
      var weekText = document.createTextNode('Fyrir 1 viku síðan');
      weekP.appendChild(weekText);
    } else {
      var _weekText = document.createTextNode('Fyrir ' + vika + ' vikum s\xED\xF0an');
      weekP.appendChild(_weekText);
    }
    div.appendChild(weekP);
  } else if (day < timi) {
    var dagur = Math.floor(timi / day);
    var dayP = document.createElement('p');
    dayP.setAttribute('class', 'video_date');
    if (dagur === 1) {
      var dayText = document.createTextNode('Fyrir 1 degi síðan');
      dayP.appendChild(dayText);
    } else {
      var _dayText = document.createTextNode('Fyrir ' + dagur + ' d\xF6gum s\xED\xF0an');
      dayP.appendChild(_dayText);
    }
    div.appendChild(dayP);
  } else {
    var klukkutimar = Math.floor(timi / hour);
    var hourP = document.createElement('p');
    hourP.setAttribute('class', 'video_date');
    if (klukkutimar === 1) {
      var hourText = document.createTextNode('Fyrir 1 klukkutíma síðan');
      hourP.appendChild(hourText);
    } else {
      var _hourText = document.createTextNode('Fyrir ' + klukkutimar + ' klukkut\xEDmum s\xED\xF0an');
      hourP.appendChild(_hourText);
    }
    div.appendChild(hourP);
  }
}

var Videos = function () {
  function init() {
    var request = new XMLHttpRequest();
    request.open('GET', URL, true);

    request.onload = function () {
      var data = JSON.parse(request.response);

      createHeader();

      var _loop = function _loop(i) {
        var section = document.createElement('section');
        var videoboxes = document.createElement('div');
        videoboxes.setAttribute('class', 'video_boxes');

        showTitle(section, data.categories[i].title);

        section.appendChild(videoboxes);

        var _loop2 = function _loop2(j) {
          var video = data.videos.find(function (v) {
            return v.id === data.categories[i].videos[j];
          });
          showVideo(section, videoboxes, video);
        };

        for (var j = 0; j < data.categories[i].videos.length; j += 1) {
          _loop2(j);
        }
      };

      for (var i = 0; i < data.categories.length; i += 1) {
        _loop(i);
      }
    };
    request.send();
  }
  return {
    init: init
  };
}();

document.addEventListener('DOMContentLoaded', function () {
  Videos.init();
});

//# sourceMappingURL=script-compiled.js.map