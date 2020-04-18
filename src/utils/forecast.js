const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/'+latitude+','+longitude
    request({ url, json: true }, (error, response) => {
        if(error) {
            callback('Can not connect to the Network!',undefined)
        } else if(response.body.error) {
            callback('Can not find forecast for specified location!',undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary)
        }
    })
}

module.exports = forecast