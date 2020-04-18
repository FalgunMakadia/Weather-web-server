const request = require('request')
const express = require('express')

const gc = express()

const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(location) +'.json?access_token=pk.eyJ1IjoiZmFsZ3VubWFrYWRpYTgwIiwiYSI6ImNrOG4yaXRzdTBsMjczZm8yY3Z3ZW53aWoifQ.QEPvbwx3KUH4rSG9X4cPBA&limit=1'
    request({ url, json: true }, (error, response) => {
        if(error) {
            callback('Can not connect to the Network', undefined)
        } else if(response.body.features.length === 0) {
            callback('Can not locate entered Location', undefined)
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

const location = process.argv[2]

if(!location) {
    console.log('Please enter a location')
} else {
    geocode(location, (error, data) => {
        if(error) {
            return console.log('Error in Geocode:', error)
        } 
        gc.get('/location', (req, res) => {
            res.send('Location:',data.location,'\nLongitude:',data.longitude,'/nLatitude:',data.latitude)
        })
        gc.listen(3000, () => {
            console.log('Application is running on port 3000')
        })        
    })
}