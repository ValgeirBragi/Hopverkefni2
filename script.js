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

function showTitle(title) {
  const section = document.createElement('section');
  section.setAttribute('class', '');

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
  const section = document.createElement('section');
  section.setAttribute('class', '');
  document.querySelector('main').appendChild(section);

  const div = document.createElement('div');
  div.setAttribute('class', '');
  section.appendChild(div);

  const img = document.createElement('IMG');
  img.src = video.poster;
  img.setAttribute('class', '');

  const id = video.id;

  img.addEventListener('click', () => {
    window.location.href = 'video.html?id=' + id;
  });

  div.appendChild(img);
  const lengd = video.duration;

  let min = Math.floor(lengd / 60);
  let sek = lengd % 60;

  if(sek < 10){
      sek = "0" +sek;
  }

  const div2 = document.createElement('div');
  div2.setAttribute('class', '');
  const text = document.createTextNode(min + ':' + sek);

  div2.appendChild(text);
  div.appendChild(div2);

  const h2 = document.createElement('h2');
  const title = document.createTextNode(video.title);
  h2.setAttribute('class', '');
  h2.appendChild(title);
  div.appendChild(h2);

  const date1 = new Date();
  const date1Sec = Math.round(date1.getTime() / 1000);
  const date2 = new Date(video.created);
  const date2Sec = Math.round(date2.getTime() / 1000);
  const timi = Math.floor(date1Sec - date2Sec);

  const hour = 60 * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 31;
  const year = day * 365;

  if (year < timi) {
    const ar = Math.floor(timi / year);
    const yearP = document.createElement('p');
    yearP.setAttribute('class', '');
    const yearText = document.createTextNode('Fyrir ' + ar + ' árum síðan');
    yearP.appendChild(yearText);
    div.appendChild(yearP);
  } else if (month < timi) {
    const manudur = Math.floor(timi / month);
    const monthP = document.createElement('p');
    monthP.setAttribute('class', '');
    const monthText = document.createTextNode('Fyrir ' + manudur + ' mánuðum síðan');
    monthP.appendChild(monthText);
    div.appendChild(monthP);
  } else if (week < timi) {
    const vika = Math.floor(timi / week);
    const weekP = document.createElement('p');
    weekP.setAttribute('class', '');
    const weekText = document.createTextNode('Fyrir ' + vika + ' vikum síðan');
    weekP.appendChild(weekText);
    div.appendChild(weekP);
  } else if (day < timi) {
    const dagur = Math.floor(timi / day);
    const dayP = document.createElement('p');
    dayP.setAttribute('class', '');
    const dayText = document.createTextNode('Fyrir ' + dagur + ' dögum síðan');
    dayP.appendChild(dayText);
    div.appendChild(dayP);
  } else {
    const klukkutimar = Math.floor(timi / hour);
    const hourP = document.createElement('p');
    hourP.setAttribute('class', '');
    const hourText = document.createTextNode('Fyrir ' + klukkutimar + ' klukkutímum síðan');
    hourP.appendChild(hourText);
    div.appendChild(hourP);
  }
}

const Videos = (() => {
  function init() {
    const request = new XMLHttpRequest();
    request.open('GET', URL, true);

    request.onload = () => {
      const data = JSON.parse(request.response);

      createHeader();

      for (const { title, videos } of data.categories) {
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
