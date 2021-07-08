const router = require('express').Router()
var multer = require('multer')
const multerS3 = require('multer-s3')
var upload = multer({ dest: 'uploads/' })
const Products = require('../models/products')
const path = require('path')


/*S of Cloudinary*/
var cloudinary = require('cloudinary')
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET 
})
/*E of Cloudinary*/

router.route('/').get((req,res)=>{
	
})

router.route('/productsall').get(async(req,res)=>{

	try{
		await Products.find()
		res.json(products)
	}catch(err){
		res.status(400).json(err)
	} 


	/*Products.find()
	.then(products => res.json(products))
	.catch(err => res.status(400).json(err))*/
})


router.route('/save/products').post(async(req,res)=>{

	try{

		const TProducts = {
			nombre : req.body.nombre,
			descripcion : req.body.descripcion,
			codigo : req.body.codigo,
			picture : req.body.picture
		}
		var newProduct = new Products(TProducts);
		
		console.log(newProduct)

		const uploadedResponse = await cloudinary.uploader.upload(file.tempFilePath, {upload_preset:'dev_setups'})
		console.log(uploadedResponse)

		newProduct.save()
		    .then(() => res.json('Producto agregado'))
		    .catch(err => res.status(400).json('Error: ' + err));

		/*cloudinary.uploader.upload(req.body.data,

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

module.exports = router;