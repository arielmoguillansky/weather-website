const request = require('request');

const forecast = (long, lat, callback) => {

	const url = 'https://api.darksky.net/forecast/8e4d119c29d3e1bfd93715ff8e78025c/' + long + ',' + lat + '?units=si';

	request({ url: url, json: true }, (error, { body }) => { //destructuring object
		if (error) {
			callback(console.log('Unable to connect to API Weather'), undefined);
		} else if (body.error) {
			callback(console.log(error), undefined);
		} else {
			callback(undefined, {
				icon: body.currently.icon,
				temp: Math.round(body.currently.temperature)
			}
			)
		}
	})
}

module.exports = forecast;