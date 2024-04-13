const http = require('http')
const app = require('./app')
const port = process.env.PORT || 3000
const server = http.createServer(app)
server.listen(port,()=> console.log(`Server is running on port ${port}`))
/*
console.log("KEY")
console.log(process.env.PORT)
console.log("try")
console.log(process.env.JWT_KEY) // remove this after you've confirmed it is working
*/
