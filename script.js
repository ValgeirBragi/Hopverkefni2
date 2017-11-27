const URL = 'videos.json';

function createHeader() {
  const section = document.createElement('div');
  section.setAttribute('class', 'section');

  const header = document.createElement('h1');
  const text = document.createTextNode('Myndbandaleigan');
  header.setAttribute('class', 'title');

  header.appendChild(text);
  section.appendChild(header);
  document.querySelector('main').appendChild(section);
}

function showTitle(section, title) {
  section.setAttribute('class', 'category');

  const h1 = document.createElement('h1');
  h1.setAttribute('class', 'category_title');
  const titill = document.createTextNode(title);

  h1.appendChild(titill);
  section.appendChild(h1);
  document.querySelector('main').appendChild(section);
}

function showVideo(section, videoboxes, video) {
  document.querySelector('main').appendChild(section);

  const div = document.createElement('div');
  div.setAttribute('class', 'video_box');
  videoboxes.appendChild(div);

  const img = document.createElement('IMG');
  img.src = video.poster;
  img.setAttribute('class', 'VideoImg');

  const { id } = video;
  img.addEventListener('click', () => {
    window.location.href = `video.html?id=${id}`;
  });

  div.appendChild(img);
  const lengd = video.duration;

  let min = Math.floor(lengd / 60);
  let sek = lengd % 60;

  if (sek < 10) {
    sek = `0${sek}`;
  }
  if (min < 10) {
    min = `0${min}`;
  }

  const div2 = document.createElement('div');
  div2.setAttribute('class', 'video_duration');
  const text = document.createTextNode(`${min}:${sek}`);

  div2.appendChild(text);
  div.appendChild(div2);

  const pTitle = document.createElement('p');
  const title = document.createTextNode(video.title);
  pTitle.setAttribute('class', 'video_title');
  pTitle.appendChild(title);
  div.appendChild(pTitle);

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
    yearP.setAttribute('class', 'video_date');
    if (ar === 1) {
      const yearText = document.createTextNode('Fyrir 1 ári síðan');
      yearP.appendChild(yearText);
    } else {
      const yearText = document.createTextNode(`Fyrir ${ar} árum síðan`);
      yearP.appendChild(yearText);
    }
    div.appendChild(yearP);
  } else if (month < timi) {
    const manudur = Math.floor(timi / month);
    const monthP = document.createElement('p');
    monthP.setAttribute('class', 'video_date');
    if (manudur === 1) {
      const monthText = document.createTextNode('Fyrir 1 mánuði síðan');
      monthP.appendChild(monthText);
    } else {
      const monthText = document.createTextNode(`Fyrir ${manudur} mánuðum síðan`);
      monthP.appendChild(monthText);
    }
    div.appendChild(monthP);
  } else if (week < timi) {
    const vika = Math.floor(timi / week);
    const weekP = document.createElement('p');
    weekP.setAttribute('class', 'video_date');
    if (vika === 1) {
      const weekText = document.createTextNode('Fyrir 1 viku síðan');
      weekP.appendChild(weekText);
    } else {
      const weekText = document.createTextNode(`Fyrir ${vika} vikum síðan`);
      weekP.appendChild(weekText);
    }
    div.appendChild(weekP);
  } else if (day < timi) {
    const dagur = Math.floor(timi / day);
    const dayP = document.createElement('p');
    dayP.setAttribute('class', 'video_date');
    if (dagur === 1) {
      const dayText = document.createTextNode('Fyrir 1 degi síðan');
      dayP.appendChild(dayText);
    } else {
      const dayText = document.createTextNode(`Fyrir ${dagur} dögum síðan`);
      dayP.appendChild(dayText);
    }
    div.appendChild(dayP);
  } else {
    const klukkutimar = Math.floor(timi / hour);
    const hourP = document.createElement('p');
    hourP.setAttribute('class', 'video_date');
    if (klukkutimar === 1) {
      const hourText = document.createTextNode('Fyrir 1 klukkutíma síðan');
      hourP.appendChild(hourText);
    } else {
      const hourText = document.createTextNode(`Fyrir ${klukkutimar} klukkutímum síðan`);
      hourP.appendChild(hourText);
    }
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
      for (let i = 0; i < data.categories.length; i += 1) {
        const section = document.createElement('section');
        const videoboxes = document.createElement('div');
        videoboxes.setAttribute('class', 'video_boxes');

        showTitle(section, data.categories[i].title);

        section.appendChild(videoboxes);

        for (let j = 0; j < data.categories[i].videos.length; j += 1) {
          const video = data.videos.find(v => v.id === data.categories[i].videos[j]);
          showVideo(section, videoboxes, video);
        }
      }
    };
    request.send();
  }
  return {
    init,
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  Videos.init();
});
