require('dotenv').config();
const router = require('express').Router()
var multer = require('multer')
const multerS3 = require('multer-s3')
var upload = multer({ dest: 'uploads/' })
const Products = require('../models/products')
const path = require('path')


/*S of Cloudinary*/
var cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET 
})
/*E of Cloudinary*/



module.exports = (app) =>{
	//para correr backend: npm run start
	app.get('/productsall', async(req,res) => {
	  Products.find()
	  .then(products => res.json(products))
	  .catch(err => res.status(400).json(err))
	}),

	app.post('/save/products', async (req,res)=>{
	  try{
	    const fileStr = req.body.picture
	    //console.log(fileStr)
	    const upload = await cloudinary.uploader.upload(fileStr)
	    console.log(upload.url)

	    const TProducts = {
	      nombre : req.body.nombre,
	      descripcion : req.body.descripcion,
	      codigo : req.body.codigo,
	      picture : upload.url
	    }
	    var newProduct = new Products(TProducts);
	    
	    console.log(newProduct)

	    newProduct.save()
	      .then(() => res.json('Producto agregado'))
	      .catch(err => res.status(400).json('Error: ' + err));
	    
	  } catch (error) {
	    console.log(error)
	    res.json({message: error.message})
	  }
	})
}