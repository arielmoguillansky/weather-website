

const weatherForm = document.querySelector('.enter-btn');
const search = document.querySelector('input');
const message1 = document.getElementById('message1');
const inputContainer = document.querySelector('.container-icon-index');
const form = document.querySelector('form');
const temp = document.querySelector('.temp');
const returnIndex = document.querySelector('.msg4');
const about = document.querySelector('.about-ico');
const link1 = document.querySelector('.link1');
const link2 = document.querySelector('.link2');


switch (window.location.pathname) {
	case '/':
		weatherForm.addEventListener('click', (e) => {
			e.preventDefault();

			const location = search.value;
			inputContainer.classList.add('goDown')
			form.classList.add('reveal')
			message1.textContent = 'Loading...';

			let url = '/weather?adress=' + location;

			(function interval() {
				fetch(url).then((response) => {
					response.json().then((data) => {
						if (data.error) {
							message1.textContent = data.error;
						} else {
							bgColor(data.forecast.icon);
							message1.textContent = '';
							temp.textContent = data.forecast.temp + '°C';
							//message2.textContent = data.forecast.icon + data.forecast.temp;
						}
					})
				});
				setInterval(interval, 600000);
			})()

		})

		about.addEventListener('click', (e) => {
			window.location.href = '/about';
		})
		break;
	case '/about':
		link1.addEventListener('click', (e) => {
			window.location.href = 'https://github.com/arielmoguillansky';
		})

		link2.addEventListener('click', (e) => {
			window.location.href = 'https://www.linkedin.com/in/arielmoguillansky/';
		})
		break;
	case '/error':
		returnIndex.addEventListener('click', (e) => {
			window.location.href = '/';
		})
		break;
}

/*--------------------------------------------------------------------------------*/

function addRain(iconWeather) {

	let rainDrops = 0;
	let e = document.querySelector('.rain');
	while (e.hasChildNodes()) {
		e.removeChild(e.firstChild);
	}

	if (iconWeather === 'rain') {
		rainDrops = 100;
	} else if (iconWeather === 'thunderstorm') {
		e.style.animationDuration = '0.8s';
		let thunderLight = document.createElement('div');
		thunderLight.setAttribute('class', 'thunderstorm');
		e.appendChild(thunderLight);
		rainDrops = 400;
	}

	for (i = 1; i < rainDrops; i++) {
		e = document.querySelector('.rain');
		let child = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		child.setAttribute('class', 'rain__drop');
		child.setAttribute('preserveAspectRatio', 'xMinYMin');
		child.setAttribute('viewBox', '0 0 5 50');
		child.setAttribute('style', '--x:' + Math.floor(Math.random() * 100) + '; --y:' + Math.floor(Math.random() * 100) + '; --o:' + Math.random() + '; --a:' + Math.random() * 0.5 + '; --d:' + Math.random() * 2 + '; --s:' + Math.random() + '')
		let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
		path.setAttribute('stroke', 'none')
		path.setAttribute('class', 'path')
		path.setAttribute('d', 'M 2.5,0 C 2.6949458,3.5392017 3.344765,20.524571 4.4494577,30.9559 5.7551357,42.666753 4.5915685,50 2.5,50 0.40843152,50 -0.75513565,42.666753 0.55054234,30.9559 1.655235,20.524571 2.3050542,3.5392017 2.5,0 Z')
		child.appendChild(path);
		e.appendChild(child);
	}
}


function addStars(number, iconWeather) {

	let e = document.querySelector('.stars');
	while (e.hasChildNodes()) {
		e.removeChild(e.firstChild);
	}
	if (iconWeather === 'partly-cloudy-night') {
		document.querySelector('.partly-cloudy-night').classList.remove('hide');
	} else {
		document.querySelector('.partly-cloudy-night').classList.add('hide');
	}
	for (let i = 0; i < number; i++) {

		const top = Math.floor(Math.random() * 250) + 1;
		const left = Math.floor(Math.random() * 150) + 1;
		let min = 0;
		let max = 3;

		let container = document.querySelector('.stars');
		let star = document.createElement('div');


		let classes = ["star-small", "star-medium", "star-large"];

		star.setAttribute('class', classes[Math.floor(Math.random() * (+max - +min)) + +min]);
		star.setAttribute('style', 'left:' + left + 'em; top:' + top + 'em');
		container.appendChild(star);

	}
};


function addSnow(n) {
	for (i = 1; i < n; i++) {
		let e = document.querySelector('.snow');
		let child = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		child.setAttribute('class', 'snow__drop');
		child.setAttribute('viewBox', '0 0 298.177 298.177');
		child.setAttribute('style', '--x:' + Math.floor(Math.random() * 100) + '; --y:' + Math.floor(Math.random() * 100) + '; --o:' + Math.random() + '; --a:' + Math.random() * 0.5 + '; --d:' + Math.random() * 2 + '; --s:' + Math.random() + '')
		let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
		path.setAttribute('stroke', 'none')
		path.setAttribute('class', 'path')
		path.setAttribute('d', 'M298.177 149.089c0-5.571-4.517-10.087-10.087-10.087h-14.449l13.712-13.712c3.938-3.94 3.938-10.322 0-14.264-3.941-3.939-10.324-3.939-14.264 0l-27.977 27.976h-71.668l50.674-50.675h39.564c5.569 0 10.083-4.516 10.083-10.087 0-5.57-4.514-10.087-10.083-10.087h-19.391l10.219-10.219c3.938-3.94 3.938-10.324 0-14.265-3.941-3.938-10.323-3.938-14.263 0l-10.22 10.22V34.501c0-5.57-4.517-10.087-10.087-10.087-5.57 0-10.087 4.517-10.087 10.087v39.565l-50.679 50.676v-71.68l27.973-27.976c3.942-3.938 3.942-10.321 0-14.262-3.938-3.94-10.321-3.94-14.262 0l-13.711 13.711v-14.45c0-5.569-4.519-10.086-10.087-10.086-5.57 0-10.088 4.517-10.088 10.086v14.45l-13.712-13.711c-3.938-3.94-10.321-3.94-14.262 0-3.941 3.941-3.941 10.323 0 14.262l27.974 27.976v71.677L88.328 74.067V34.501c0-5.57-4.518-10.087-10.088-10.087-5.571 0-10.086 4.517-10.086 10.087V53.89L57.93 43.667c-3.941-3.939-10.323-3.939-14.263 0-3.94 3.938-3.94 10.322 0 14.264l10.224 10.224H34.5c-5.57 0-10.086 4.517-10.086 10.087 0 5.571 4.516 10.087 10.086 10.087h39.565l50.673 50.675H53.074l-27.976-27.976a10.084 10.084 0 00-14.262 0c-3.94 3.941-3.94 10.324 0 14.264l13.712 13.712H10.086C4.517 139.003 0 143.518 0 149.089c0 5.569 4.517 10.087 10.086 10.087h14.462l-13.712 13.711c-3.94 3.94-3.94 10.322 0 14.264a10.059 10.059 0 007.132 2.955 10.06 10.06 0 007.13-2.955l27.976-27.975h71.669l-50.678 50.679H34.5c-5.57 0-10.086 4.516-10.086 10.088 0 5.568 4.516 10.085 10.086 10.085h19.391l-10.224 10.224c-3.94 3.94-3.94 10.324 0 14.265a10.056 10.056 0 007.131 2.955c2.58 0 5.162-.986 7.132-2.955l10.225-10.225v19.391c0 5.57 4.515 10.085 10.086 10.085 5.57 0 10.088-4.515 10.088-10.085v-39.564l50.673-50.675v71.66l-27.974 27.976c-3.941 3.939-3.941 10.323 0 14.263a10.08 10.08 0 0014.262 0l13.712-13.711v14.46c0 5.571 4.518 10.086 10.088 10.086 5.568 0 10.087-4.515 10.087-10.086v-14.46l13.711 13.711a10.045 10.045 0 007.131 2.956c2.581 0 5.163-.984 7.131-2.956a10.08 10.08 0 000-14.263l-27.973-27.976V173.44l50.679 50.679v39.564c0 5.57 4.517 10.085 10.087 10.085 5.57 0 10.087-4.515 10.087-10.085v-19.391l10.22 10.219a10.05 10.05 0 007.131 2.956c2.58 0 5.161-.985 7.132-2.956 3.938-3.939 3.938-10.323 0-14.263l-10.219-10.22h19.391c5.569 0 10.083-4.517 10.083-10.085 0-5.572-4.514-10.088-10.083-10.088h-39.564l-50.68-50.679h71.674l27.977 27.975a10.056 10.056 0 007.131 2.955 10.088 10.088 0 007.133-17.219l-13.712-13.711h14.449c5.567 0 10.084-4.517 10.084-10.087z')
		child.appendChild(path);
		e.appendChild(child);
	}
};


function bgColor(icon) {
	let bg = document.querySelector('.bg');
	//bg.style.background = 'rgba(0,0,0,0.05)';
	let shape;
	let container = document.querySelectorAll('.container-icon');
	container.forEach(img => {
		if (!img.classList.contains('hide')) img.classList.add('hide');
	})
	if (icon !== 'thunderstorm' && icon !== 'partly-cloudy-night') { let className = document.querySelector('.' + icon).classList.remove('hide'); }

	switch (icon) {
		case 'clear-day':
			bg.style.background = 'rgba(0,0,0,0.05)';
			break;
		case 'clear-night':
			bg.style.background = 'rgba(0,0,0,0.8)';
			addStars(900, icon);
			break;
		case 'partly-cloudy-day':
			bg.style.background = 'rgba(0,0,0,0.1)';
			break;
		case 'partly-cloudy-night':
			bg.style.background = 'rgba(0,0,0,0.8)';
			document.querySelector('.clear-night').classList.remove('hide');
			addStars(500, icon);
			break;
		case 'cloudy':
			bg.style.background = 'rgba(0,0,0,0.3)';
			break;
		case 'rain':
			bg.style.background = 'rgba(0,0,0,0.5)';
			addRain(icon);
			break;
		case 'thunderstorm':
			bg.style.background = 'rgba(0,0,0,0.6)';
			document.querySelector('.rain').classList.remove('hide');
			addRain(icon);
			break;
		case 'snow':
			bg.style.background = 'rgba(0,0,0,0.5)';
			addSnow(250);
			break;
		case 'wind':
			bg.style.background = 'rgba(0,0,0,0.15)';
			break;
		default:
			bg.style.background = 'rgba(0,0,0,0.05)';
			break;
	}
}
