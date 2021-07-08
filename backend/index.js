require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload'); 
const Products = require('./models/products')
var multer = require('multer')
var upload = multer({ dest: 'uploads/'})
const path = require('path')

const app = express();
const port = process.env.PORT || 8080;

const uri = 'mongodb://localhost/colaborape';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use(morgan('dev'))
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({parameterLimit: 100000, limit: '50mb', extended: true }))
app.use(fileupload({useTempFiles: true}))


/*S of Cloudinary*/
var cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET 
})
/*E of Cloudinary*/

//para correr backend: npm run start
app.get('/productsall', async(req,res) => {


  Products.find()
  .then(products => res.json(products))
  .catch(err => res.status(400).json(err))
})

app.post('/save/products', upload.single('picture'), async (req,res)=>{
  try{
    const TProducts = {
      nombre : req.body.nombre,
      descripcion : req.body.descripcion,
      codigo : req.body.codigo,
      picture : req.body.picture
    }
    var newProduct = new Products(TProducts);
    
    //console.log(newProduct)

    const uploadedResponse = await cloudinary.uploader.upload(req.body.data, {upload_preset:'cloudinary_react'})
    console.log(uploadedResponse)


    newProduct.save()
        .then(() => res.json('Producto agregado'))
        .catch(err => res.status(400).json('Error: ' + err));
    console.log(req.file)

    /*cloudinary.uploader.upload(req.file.path,
      function(result){
        newProduct.picture = result.url
        newProduct.save()
            .then(() => res.json('Producto agregado'))
            .catch(err => res.status(400).json('Error: ' + err));

        console.log(newProduct)
      }
    )*/
  } catch (error) {
    console.log(error)
    res.json({message: error.message})
  }
})




app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});