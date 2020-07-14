const fetch = require('node-fetch')
const fs = require('fs')

fetch(`https://api.jsonbin.io/b/5f0d982354a3e04bf7cd8908/latest`,{
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