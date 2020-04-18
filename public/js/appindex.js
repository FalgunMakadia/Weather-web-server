const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#m1')
const messageTwo = document.querySelector('#m2')
const messageThree = document.querySelector('#m3')

weatherForm.addEventListener('submit' ,(e) => {
    e.preventDefault()

    const location = search.value
    if(location.length === 0){
        return (messageOne.textContent = 'Error : Location is not provided!') && (messageTwo.textContent = 'Please enter a Location.') && (messageThree.textContent = '')
    }
    messageOne.textContent = 'Loading...'
    const searchStr = 'http://localhost:3000/weather?location='+encodeURIComponent(location)

    fetch(searchStr).then((response) => {
        response.json().then((data) => {
            if(data.gerror){
                messageOne.textContent = 'Error : '+data.gerror
                messageTwo.textContent = ''
                messageThree.textContent = ''
            } else if(data.ferror){
                messageOne.textContent = 'Error : '+data.ferror
                messageTwo.textContent = 'Location : '+data.location 
                messageThree.textContent = 'Latitude : '+data.latitude+'   Longitude : '+data.longitude 
            } else {
                console.log(data)
            }
        })
    })
})