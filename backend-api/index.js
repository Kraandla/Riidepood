require('dotenv').config();
const port = process.env.PORT || 8080;
const host = 'localhost';
const express = require('express');
const cors = require('cors');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
//const auth = require('./routes/auth.js');
const corsOptions = require('./config/cors')
const credentials = require('./middleware/credentials')
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');
//const swaggerDocument = require('./docs/swagger.json');
const {sync, sessionStore} = require("./db")
const errorHandlerMiddleware = require('./middleware/error_handler')



// app.get('/clothing', (req, res) => {
//     res.send(["Jeans", "T-Shirts", "Jackets"]);
// })
app.use(credentials)
app.use(cors(corsOptions));
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
//application.x.ww.form-urlencoded middleware
app.use(express.urlencoded({extended: false}));
//application.json middleware
app.use(express.json());

//middleware for cookies
app.use(cookieParser());
//app.use('/auth', auth);
app.use('/static', express.static(path.join(__dirname, 'public')));
// app.use(session({
//     secret: process.env.SESSIONSECRET || 'dev',
//     store: sessionStore,
//     resave: false,
//     saveUninitialized: false,
//     cookie:{
//         httpOnly: true,
//         sameSite: 'lax',
//         secure: false,
//         maxAge: 7*24 * 60 * 60 * 1000, 
//     }
// }))
// sessionStore.sync();
app.use(errorHandlerMiddleware);
require("./routes/rpRoutes")(app);


app.use((req, res) => {
  res.status(404)

  if(req.accepts('json')){
    res.json({'error': '404 Not Found'})
  }else{
    res.type('text').send('404 Not Found')
  }
})


app.listen(port, async () => {
    if (process.env.SYNC === 'true') {await sync();}
    console.log(`API on aadressil: http://${host}:${port}`);
    console.log(`Docs on aadressil: http://${host}:${port}/docs`);
})