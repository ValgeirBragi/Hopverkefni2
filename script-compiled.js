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
    sek = "0" + sek;
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
    var yearText = document.createTextNode('Fyrir ' + ar + ' árum síðan');
    yearP.appendChild(yearText);
    div.appendChild(yearP);
  } else if (month < timi) {
    var manudur = Math.floor(timi / month);
    var monthP = document.createElement('p');
    monthP.setAttribute('class', 'video_date');
    var monthText = document.createTextNode('Fyrir ' + manudur + ' mánuðum síðan');
    monthP.appendChild(monthText);
    div.appendChild(monthP);
  } else if (week < timi) {
    var vika = Math.floor(timi / week);
    var weekP = document.createElement('p');
    weekP.setAttribute('class', 'video_date');
    var weekText = document.createTextNode('Fyrir ' + vika + ' vikum síðan');
    weekP.appendChild(weekText);
    div.appendChild(weekP);
  } else if (day < timi) {
    var dagur = Math.floor(timi / day);
    var dayP = document.createElement('p');
    dayP.setAttribute('class', 'video_date');
    var dayText = document.createTextNode('Fyrir ' + dagur + ' dögum síðan');
    dayP.appendChild(dayText);
    div.appendChild(dayP);
  } else {
    var klukkutimar = Math.floor(timi / hour);
    var hourP = document.createElement('p');
    hourP.setAttribute('class', 'video_date');
    var hourText = document.createTextNode('Fyrir ' + klukkutimar + ' klukkutímum síðan');
    hourP.appendChild(hourText);
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

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data.categories[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;
          var title = _ref.title;
          var videos = _ref.videos;

          var section = document.createElement('section');
          var videoboxes = document.createElement('div');
          videoboxes.setAttribute('class', 'video_boxes');

          showTitle(section, title);

          section.appendChild(videoboxes);

          var _loop = function _loop(id) {
            var video = data.videos.find(function (v) {
              return v.id === id;
            });
            showVideo(section, videoboxes, video);
          };

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = videos[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var id = _step2.value;

              _loop(id);
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
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