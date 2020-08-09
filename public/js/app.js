// fetch('http://localhost:3000/weather?address=boston').then((response)=>{
// response.json().then((data)=>{
//         if (!data.error){
//             console.log(data)
//         }
//         else{
//             console.log(data.error)
//         }
//     })
// })

const weatherForm = document.querySelector('form')
const search= document.querySelector('input')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')

message1.textContent='Loading message...'
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location= search.value 
    if (!location) {message2.textContent='Enter address'}
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
                if (!data.error){
                    
                    message1.textContent= data.Forecast
                    message2.textContent= data.Location
                }
                else{
                    message1.textContent=data.error
                }
            })
        })

})