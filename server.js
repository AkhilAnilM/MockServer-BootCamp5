const jsonServer = require('json-server')
const fetch = require('node-fetch')
const fs = require('fs')

const server = jsonServer.create()
const router = jsonServer.router("db.json")
const middlewares = jsonServer.defaults()

const updateRemote=()=>{
  setTimeout(()=>
  fs.readFile('./db.json', (err, data) => {
    if (err) throw err;
    
    fetch(`https://api.jsonbin.io/b/5f0d982354a3e04bf7cd8908`,{
            method:'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body:data
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:');
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    })
  ,1000)
}


server.use(middlewares)

server.use(jsonServer.rewriter({
    "/books/:id/reviews/": "/reviews/?bookId=:id",
    "/books/:id/reviews/": "/reviews/?bookId=:id"
}))

server.use(jsonServer.bodyParser)

server.use((req, res, next) => {

  next()
  updateRemote()
})

// Use default router
// `${process.env.PORT}`,"0.0.0.0",
server.use(router)
server.listen(`${process.env.PORT}`,"0.0.0.0", () => {
  console.log("JSON Server is running")
})

