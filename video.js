function createButton(buttons, pic, classs) {
  const button = document.createElement('span');
  button.setAttribute('class', classs);
  const picture = document.createElement('IMG');
  picture.src = (pic);
  button.appendChild(picture);
  buttons.appendChild(button);
}

function play(video) {
  const main = document.querySelector('main');
  const title = document.createTextNode(video.title);
  const h1 = document.createElement('h1');
  const divtitle = document.createElement('div');
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

  const sectionbuttons = document.createElement('section');
  const buttons = document.createElement('div');
  buttons.setAttribute('id', 'buttons');

  sectionbuttons.appendChild(buttons);
  main.appendChild(sectionbuttons);

  const overlaybutton = document.createElement('span');
  overlaybutton.setAttribute('class', 'button overlay');
  const picture = document.createElement('IMG');
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
  baka. setAttribute('class', 'tilBaka');
  baka.setAttribute('href', 'index.html');
  baka.appendChild(text);
  main.appendChild(baka);
}


function byrja() {
  const request = new XMLHttpRequest();
  const URL = 'videos.json' + window.location.search;
  request.open('GET', URL, true);

  request.onload = () => {
    const data = JSON.parse(request.response);
    const numer = location.search.substr(4);

    if (numer == 1 || numer == 2 || numer == 3 || numer == 4) {
      for (let i = 0; i < 4; i += 1) {
        if (numer == data.videos[i].id) {
          play(data.videos[i]);
        }
      }
    }
  };
  request.send();
}
byrja();
