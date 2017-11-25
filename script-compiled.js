'use strict';

var URL = 'videos.json';

var Videos = function () {
    function init() {
        var request = new XMLHttpRequest();
        request.open('GET', URL, true);
    }

    return {
        init: init
    };
}();

document.addEventListener('DOMContentLoaded', function () {
    Videos.init();
});

//# sourceMappingURL=script-compiled.js.map