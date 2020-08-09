const request=require('request')

const forecast = (latitude,longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c7c5e255eba5f2160bc339aef2ce421b&query='+latitude+',' +longitude
    request({url, json:true}, (error,{body})=>{
        if (error) {
            callback('Unable to connect to Weather service!', undefined)
        } else if (body.error) {
            callback('Can not find location specified!', undefined)
        } else {
            const data =  'Current temperature is ' + body.current.temperature +' but it feels like ' +body.current.feelslike+' out there'
            callback(undefined, data)
    
        }
             
        

    })
}

module.exports = forecast