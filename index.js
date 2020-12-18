const express = require('express');
const mongoose = require('mongoose');
const authroute = require('./router/AuthRouter');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;
// Connect To Database
const mydb = 'mongodb+srv://evorius:123@clusterv-1.bdlq1.mongodb.net/users?retryWrites=true&w=majority';
mongoose.connect(mydb , {useNewUrlParser:true , useUnifiedTopology:true})
.then(result => {app.listen(port, () => {
   console.log(`Server started on port ${port}`);
});})
.catch(err => console.log(err))
mongoose.set('useCreateIndex', true);

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(authroute);
app.use(cookieParser());
app.set('view engine' , 'ejs');

app.get('/terms' , (req , res) => {
   res.sendFile('Losbeat-terms-conditions.pdf' , {root:__dirname})
})
