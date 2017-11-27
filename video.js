function createButton(buttons, pic, classs) {
    const button = document.createElement('span');
    button.setAttribute('class', classs)
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

  h1.appendChild(title);
  divtitle.appendChild(h1);
  main.appendChild(divtitle);

  const divvid = document.createElement('div');
  const vid = document.createElement('video');
  vid.src = video.video;
  divvid.appendChild(vid);
  main.appendChild(divvid);

  const buttons = document.createElement('div');
  buttons.setAttribute('id', 'buttons');
  main.appendChild(buttons);

  createButton(buttons, 'img/play.svg', 'button overlay');
  createButton(buttons, 'img/back.svg', 'button');
  createButton(buttons, 'img/play.svg', 'button');
  createButton(buttons, 'img/pause.svg', 'button hide');
  createButton(buttons, 'img/mute.svg', 'button');
  createButton(buttons, 'img/unmute.svg', 'button hide');
  createButton(buttons, 'img/fullscreen.svg', 'button');
  createButton(buttons, 'img/next.svg', 'button');

  let takkar = buttons.children;

  takkar[0].addEventListener('click', () => {
    vid.play();
    takkar[0].classList.add('hide');
    takkar[2].classList.add('hide');
    takkar[3].classList.remove('hide');
  });

  takkar[1].addEventListener('click', () => {
    vid.currentTime -= 3;
  });

  takkar[2].addEventListener('click', () => {
    vid.play();
    takkar[0].classList.add('hide');
    takkar[2].classList.add('hide');
    takkar[3].classList.remove('hide');
  });

  takkar[3].addEventListener('click', () => {
    vid.pause();
    takkar[0].classList.remove('hide');
    takkar[2].classList.remove('hide');
    takkar[3].classList.add('hide');
  });

  takkar[4].addEventListener('click', () => {
    vid.muted = true;
    takkar[4].classList.add('hide');
    takkar[5].classList.remove('hide');
  });

  takkar[5].addEventListener('click', () => {
    vid.muted = false;
    takkar[4].classList.remove('hide');
    takkar[5].classList.add('hide');
  });

  takkar[6].addEventListener('click', () => {
    if (vid.requestFullscreen) {
      vid.requestFullscreen();
    } else if (vid.mozRequestFullScreen) {
      vid.mozRequestFullScreen();
    } else if (vid.webkitRequestFullscreen) {
      vid.webkitRequestFullscreen();
    }
  });

  takkar[7].addEventListener('click', () => {
    vid.currentTime += 3;
  });
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
