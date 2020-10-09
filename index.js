const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const authRoutes = require('./routes/auth')
const postRoutes = require('./routes/post')
const cors = require('cors');


app.use(bodyParser({
    extended:true
}));
app.use(cors());
app.use(express.json());
app.use('/api',authRoutes);
app.use('/api',postRoutes);

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true}).then(res => {
     app.listen(5000);
}).catch(err => {
    console.log(err);
});

