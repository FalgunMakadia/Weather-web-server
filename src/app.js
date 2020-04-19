const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const pathToPublic = path.join(__dirname, '../public')
const pathToViews = path.join(__dirname, '../templates/views')
const pathToPartials = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', pathToViews)
hbs.registerPartials(pathToPartials)

// Setup static directory to serve
app.use(express.static(pathToPublic))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Index',
        name:'Falgun Makadia',
        gamename: 'White Shadow'
    })
}) 

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Falgun Makadia'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is something to help you.',
        name: 'Falgun Makadia'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.location){
        return res.send({
            error: 'A location is required.'
        })
    }

    const userLocation = req.query.location
    geocode(userLocation, (gerror, {latitude, longitude, location} = {}) => {
        if(gerror){
            return res.send({
                location: userLocation,
                gerror
            })
        }
        forecast(latitude, longitude, (ferror, forecastdata) => {
            if(ferror){
                return res.send({
                    ferror,
                    longitude,
                    latitude,
                    location,
                    userLocation
                })
            }
            res.send({
                longitude,
                latitude,
                forecastdata
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'A search string must be provided!'
        })
    }
    res.send({
        productName : [req.query.search]
    })
})

app.get('/help/*', (req, res) => {
    res.render('error404', {
        title: 'ERROR 404',
        name: 'Falgun Makadia',
        errormsg: 'Help Article Not Found!'
    })
})

app.get('*', (req, res) => {
    res.render('error404', {
        title: 'ERROR 404',
        name: 'Falgun Makadia',
        errormsg: 'Page not Found!'
    })
})

app.listen(port, () => {
    console.log('Port id up on port '+port)
})
