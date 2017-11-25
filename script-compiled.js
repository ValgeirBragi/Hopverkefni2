'use strict';

var URL = 'videos.json';

function createHeader() {
    var section = document.createElement('div');
    section.setAttribute('class', 'section');

    var header = document.createElement('h1');
    var text = document.createTextNode('Myndbandaleigan');

    header.appendChild(text);
    section.appendChild(header);
    document.querySelector('main').appendChild(section);
}

function showTitle(title) {
    var section = document.createElement('div');
    section.setAttribute('class', 'section');

    var div = document.createElement('div');
    div.setAttribute('class', '');

    var h2 = document.createElement('h2');
    h2.setAttribute('class', '');
    var titill = document.createTextNode(title);

    h2.appendChild(titill);
    div.appendChild(h2);
    section.appendChild(div);
    document.querySelector('main').appendChild(section);
}

function showVideo(video) {
    var section = document.createElement('div');
    section.setAttribute('class', 'section');

    var div = document.createElement('div');
    div.setAttribute('class', '');

    var img = document.createElement('img');
    img.setAttribute('src', video.poster);
    img.setAttribute('class', 'img');

    var id = video.id;

    img.addEventListener('click', function (event) {
        video(event, id);
    });
    div.appendChild(img);

    var lengd = video.duration;

    var klst = Math.floor(lengd / 60);
    var min = lengd % 60;

    var div2 = document.createElement('div');
    div2.setAttribute('class', '');
    var text = document.createTextNode(klst + ' klst og ' + min + ' min.');

    div2.appendChild(text);
    div.appendChild(div2);

    var h2 = document.createElement('h2');
    var title = document.createTextNode(video.title);
    h2.setAttribute('class', '');
    h2.appendChild(title);
    div.appendChild(h2);
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

                    showTitle(title);

                    var _loop = function _loop(id) {
                        var video = data.videos.find(function (v) {
                            return v.id === id;
                        });
                        showVideo(video);
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