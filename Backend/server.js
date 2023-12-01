require('dotenv').config();
const express = require("express")
const apiRouter = require('./routes/api')
const indexRouter = require('./routes/index')
const connectDb = require('./db/connect')

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}))



// Set template engine 
app.set('view engine', 'hbs')
app.get('', (req, res) => res.render('index'))

// Set routes
app.use('', indexRouter)
app.use('/api', apiRouter);

// Set pagenotFound template 
app.get('**', (req, res) => res.render('pageNotFound'))

connectDb.then(() => {
    app.listen(PORT, () => console.log("Server running on Port : " + PORT))
})
