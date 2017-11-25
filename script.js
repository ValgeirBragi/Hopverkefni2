const URL = 'videos.json';

function createHeader() {
    const section = document.createElement('div');
    section.setAttribute('class', 'section');

    const header = document.createElement('h1');
    const text = document.createTextNode('Myndbandaleigan');

    header.appendChild(text);
    section.appendChild(header);
    document.querySelector('main').appendChild(section);
}

function showTitle(title){
    const section = document.createElement('div');
    section.setAttribute('class', 'section');

    const div = document.createElement('div');
    div.setAttribute('class', '');

    const h2 = document.createElement('h2');
    h2.setAttribute('class', '');
    const titill = document.createTextNode(title);

    h2.appendChild(titill);
    div.appendChild(h2);
    section.appendChild(div);
    document.querySelector('main').appendChild(section);
}

function showVideo(video) {
    const section = document.createElement('div');
    section.setAttribute('class', 'section');

    const div = document.createElement('div');
    div.setAttribute('class', '');

    const img = document.createElement('img');
    img.setAttribute('src', video.poster);
    img.setAttribute('class', 'img');

    const id = video.id;

    img.addEventListener('click', (event) => {
        video(event, id);
    });
    div.appendChild(img);

    const lengd = video.duration;

    let klst = Math.floor(lengd/60);
    let min = lengd % 60;

    const div2 = document.createElement('div');
    div2.setAttribute('class', '');
    const text = document.createTextNode(klst + ' klst og ' + min + ' min.');

    div2.appendChild(text);
    div.appendChild(div2);

    const h2 = document.createElement('h2');
    const title = document.createTextNode(video.title);
    h2.setAttribute('class', '');
    h2.appendChild(title);
    div.appendChild(h2);
}

const Videos = (() => {
    function init() {
        const request = new XMLHttpRequest();
        request.open('GET', URL, true);

        request.onload = () => {
            const data = JSON.parse(request.response);

            createHeader();

            for (const { title, videos} of data.categories) {
                showTitle(title);
                for (const id of videos) {
                    const video = data.videos.find(v => v.id === id);
                    showVideo(video);
                }
            }
        };
        request.send();
    }

    return {
        init: init,
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    Videos.init();
});
