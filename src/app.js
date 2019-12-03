const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express()

const publicDir = path.join(__dirname, '../public');
const viewspath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicDir));

app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Kemba'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		name: 'Ariel Moguillansky',
		title: 'About'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		text: 'How to use it',
		name: 'Kemba'
	})
})

app.get('/weather', (req, res) => {
	if (!req.query.adress) {
		return res.send({
			error: 'You must provide a location'
		})
	}
	var adress = req.query.adress;
	geocode(adress, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error })
		}

		forecast(longitude, latitude, (error, forecastData) => {
			if (error) {
				return res.send({ error })
			}

			res.send({
				location,
				forecast: forecastData
			})

		})
	})

})

app.get('/help/*', (req, res) => {
	res.render('error', {
		title: '404',
		name: 'Kemba',
		errorMessage: 'Help article not found'
	})
})

app.get('*', (req, res) => {
	res.render('error', {
		title: '404',
		name: 'Kemba',
		errorMessage1: 'Feeling lost?',
		errorMessage2: 'Nothing to see here.',
		errorMessage3: 'Please ',
		errorMessage4: 'return',
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000');
}); //init server