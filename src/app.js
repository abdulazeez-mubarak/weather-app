const forecast = require('./util/forecast')
const geocode = require('./util/geocode')
const path=require('path')
const express=require('express')
const hbs=require('hbs')


const app=express() 

//Define path for Express config 
const publicDirectoryPath=path.join(__dirname,'../public') 
const viewPathDirectory= path.join(__dirname, '../template/views')
const partialsPath=path.join(__dirname,'../template/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPathDirectory)
app.set('partials', partialsPath)
hbs.registerPartials(partialsPath)
//Setup Static directory to use
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name:'Abduazeez Mubarak'
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404', {
        errorMessage:'No help available for this'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'Abdulazeez Mubarak'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About page',
        name:'Abdulazeez Mubarak'
    })
})

//Weather
app.get('/weather', (req,res)=>{
    const address=req.query.address
  
    if (!address)
    {
        return res.send('<h1>You must provide address</h1>')
    }

    geocode(address, (error,{latitude,longitude,location}={})=>{
        if (error) {
            res.send({error})
        }
        else {
            forecast(latitude,longitude, (error,data)=>
            {if (error) {
                res.send({error})
            }
            else {
                res.send({
                    Forecast: data,
                    Address: address,
                    Location: location
                })
            }})
        }

    })

    
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'404 Page'
    })
})

app.listen(3000)