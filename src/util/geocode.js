const request= require('request')
const geocode = (location,callback) => 
{if (location===undefined) {
    callback('No address specified!',undefined)}
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ location +'.json?access_token=pk.eyJ1Ijoib2JhYXBhbGFyYSIsImEiOiJja2RpaGNma2swNTR2MnVsaHNxdG8zbmVmIn0.eajeP0jGBNO_Otdy-q7IPQ&limit=3 ' 
request({url, json:true}, (error,{body}) => { 
    if (error) 
    {callback('Unable to connect to Geocode service', undefined)}
    else if (body.features.length===0)
    {callback('Unable to find location', undefined)}
    else { 
    const data= {
        latitude:  body.features[0].center[1],  
        longitude: body.features[0].center[0],
        location:  body.features[0].place_name    }
callback(undefined, data) }
     })
}
module.exports = geocode