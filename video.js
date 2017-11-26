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


  createButton(buttons, 'img/back.svg', 'button back');
  createButton(buttons, 'img/play.svg', 'button play');
  createButton(buttons, 'img/mute.svg', 'button mute');
  createButton(buttons, 'img/fullscreen.svg', 'button fullscreen');
  createButton(buttons, 'img/next.svg', 'button next');

  let takkar = buttons.children;

  console.log(takkar[1]);
  takkar[1].addEventListener('click', () => {
    if (vid.paused) {
      vid.play();
      const pause = document.createElement('span');
      const pausepicture = document.createElement('IMG');
      pausepicture.src = ('img/pause.svg');
      pause.appendChild(pausepicture);
      buttons.childNodes[1] = pause;
    } else {
      vid.pause();
      const playbutton = document.createElement('span');
      const playpicture = document.createElement('IMG');
      playpicture.src = ('img/play.svg');
      playbutton.appendChild(playpicture);
      buttons.childNodes[1] = playbutton;
    }
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
