const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload'); 
const Products = require('./models/products')
const path = require('path')

const app = express();
const port = process.env.PORT || 8080;

/*Start MongoDB connection*/
const uri = 'mongodb://localhost/colaborape';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
/*End MongoDB connection*/

app.use(morgan('dev'))
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }))
app.use(fileupload({useTempFiles: true}))


//routes
require('./routes/products')(app)


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});