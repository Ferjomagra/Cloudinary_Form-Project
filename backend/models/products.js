const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productsSchema = new Schema({
  nombre: { type: String },
  descripcion: {type: String},
  codigo: {type:String},
  picture: {type:String}
  
}, {
  timestamps: true,
});

const Products = mongoose.model('Products', productsSchema);

module.exports = Products;