const URL = 'videos.json';

const Videos = (() => {
    function init() {
        const request = new XMLHttpRequest();
        request.open('GET', URL, true);

    }

    return {
        init: init,
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    Videos.init();
});