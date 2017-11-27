function createButton(buttons, pic, classs) {
  const button = document.createElement('span');
  button.setAttribute('class', classs);
  const picture = document.createElement('IMG');
  picture.src = (pic);
  picture.setAttribute('class', 'picture');
  button.appendChild(picture);
  buttons.appendChild(button);
}

function play(video) {
  const main = document.querySelector('main');
  const title = document.createTextNode(video.title);
  const h1 = document.createElement('h1');
  const divtitle = document.createElement('div');
  divtitle.setAttribute('class', 'videotitle');
  const sectiontitle = document.createElement('section');

  h1.appendChild(title);
  divtitle.appendChild(h1);
  sectiontitle.appendChild(divtitle);
  main.appendChild(sectiontitle);

  const sectionvid = document.createElement('section');
  const divvid = document.createElement('div');
  divvid.setAttribute('class', 'divvid');
  const vid = document.createElement('video');
  vid.src = video.video;
  divvid.appendChild(vid);
  sectionvid.appendChild(divvid);
  sectionvid.setAttribute('class', 'secvid');
  main.appendChild(sectionvid);

  vid.setAttribute('poster', video.poster);
  vid.setAttribute('class', 'video');

  const sectionbuttons = document.createElement('section');
  const buttons = document.createElement('div');
  buttons.setAttribute('class', 'buttons');

  sectionbuttons.appendChild(buttons);
  main.appendChild(sectionbuttons);

  const overlaybutton = document.createElement('span');
  overlaybutton.setAttribute('class', 'button overlay');
  const picture = document.createElement('IMG');
  picture.setAttribute('class', 'picture');
  picture.src = 'img/play.svg';
  overlaybutton.appendChild(picture);
  divvid.appendChild(overlaybutton);

  createButton(buttons, 'img/back.svg', 'button');
  createButton(buttons, 'img/play.svg', 'button');
  createButton(buttons, 'img/pause.svg', 'button hide');
  createButton(buttons, 'img/mute.svg', 'button');
  createButton(buttons, 'img/unmute.svg', 'button hide');
  createButton(buttons, 'img/fullscreen.svg', 'button');
  createButton(buttons, 'img/next.svg', 'button');

  const takkar = buttons.children;

  overlaybutton.addEventListener('click', () => {
    vid.play();
    overlaybutton.classList.add('hide');
    takkar[1].classList.add('hide');
    takkar[2].classList.remove('hide');
  });

  takkar[0].addEventListener('click', () => {
    vid.currentTime -= 3;
  });

  takkar[1].addEventListener('click', () => {
    vid.play();
    overlaybutton.classList.add('hide');
    takkar[1].classList.add('hide');
    takkar[2].classList.remove('hide');
  });

  takkar[2].addEventListener('click', () => {
    vid.pause();
    overlaybutton.classList.remove('hide');
    takkar[1].classList.remove('hide');
    takkar[2].classList.add('hide');
  });

  takkar[3].addEventListener('click', () => {
    vid.muted = true;
    takkar[3].classList.add('hide');
    takkar[4].classList.remove('hide');
  });

  takkar[4].addEventListener('click', () => {
    vid.muted = false;
    takkar[3].classList.remove('hide');
    takkar[4].classList.add('hide');
  });

  takkar[5].addEventListener('click', () => {
    if (vid.requestFullscreen) {
      vid.requestFullscreen();
    } else if (vid.mozRequestFullScreen) {
      vid.mozRequestFullScreen();
    } else if (vid.webkitRequestFullscreen) {
      vid.webkitRequestFullscreen();
    }
  });

  takkar[6].addEventListener('click', () => {
    vid.currentTime += 3;
  });

  const baka = document.createElement('a');
  const text = document.createTextNode('Til Baka');
  baka.setAttribute('class', 'tilBaka');
  baka.setAttribute('href', 'index.html');
  baka.appendChild(text);
  main.appendChild(baka);
}


function byrja() {
  const request = new XMLHttpRequest();
  const URL = `videos.json${window.location.search}`;
  request.open('GET', URL, true);

  request.onload = () => {
    const data = JSON.parse(request.response);
    const numer = window.location.search.substr(4);
    if (numer === '1') {
      play(data.videos[0]);
    } else if (numer === '2') {
      play(data.videos[1]);
    } else if (numer === '3') {
      play(data.videos[2]);
    } else if (numer === '4') {
      play(data.videos[3]);
    } else {
      const h2 = document.createElement('h2');
      const texti = document.createTextNode('Myndbandaleigan');
      h2.appendChild(texti);
      const div = document.createElement('div');
      div.setAttribute('class', '');
      document.querySelector('main').appendChild(div);

      const villa = document.createElement('p');
      const villutext = document.createTextNode('Videó er ekki til');
      villa.setAttribute('class', '');
      villa.appendChild(villutext);
      div.appendChild(h2);
      div.appendChild(villa);

      const baka = document.createElement('a');
      const text = document.createTextNode('Til Baka');
      baka.setAttribute('class', 'tilBaka');
      baka.setAttribute('href', 'index.html');
      baka.appendChild(text);
      document.querySelector('main').appendChild(baka);
    }
  };
  request.send();
}
byrja();
