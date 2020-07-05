const fetch = require('node-fetch')
const fs = require('fs')

fetch(`https://api.jsonbin.io/b/5f01f260bb5fbb1d2564833e/latest`,{
  method:"GET",
  headers:{
    "accept":"application/json"
  }
})
.then(res=>res.json())
.then(data=>{
  fs.writeFileSync('./db.json',JSON.stringify(data),function (err) {
  if (err) throw err;
  console.log('Saved!');
})
})