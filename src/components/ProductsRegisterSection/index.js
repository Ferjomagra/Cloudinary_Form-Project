import React, {useState, useRef} from 'react'
import axios from 'axios'

import {Container, Link, P, H1, Form, Label, Input, Textarea, Button} from './elements'

function ProductsForm (props){

	/*file*/
	const fileInput = React.useRef();
	/*file*/
	const [previewSource, setPreviewSource] = useState()
	const [fileInputState, setFileInputState] = useState('')
	const [selectedFile, setSelectedFile] = useState();
	const [products, setProducts] = useState({
		nombre: '',
		descripcion: '',
		codigo: '',
		picture: ''
	})

	const handleFileInputChange = (e) =>{
		const file = e.target.files[0]
		previewFile(file)
		setFileInputState(file)
	}
	const previewFile = (file) =>{
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onloadend = () =>{
			setPreviewSource(reader.result)
		}
	}

	const handleInputChange = (event) =>{
		setProducts({
			...products, 
			[event.target.name] : event.target.value
		})
		console.log(event.target.name + ': ' + event.target.value)
	}



	const enviarDatos = (event) =>{
		event.preventDefault();
		const reader = new FileReader();

		const Products = {
			nombre: products.nombre,
			descripcion: products.descripcion,
			codigo: products.codigo,
			picture: products.picture
		}
		console.log(Products)
		
		/*axios.post('http://localhost:8080/save/products', Products).then(res => console.log(res.products))
		setFileInputState('');
        setPreviewSource('');*/

        axios.post('http://localhost:8080/save/products', Products)
		setFileInputState('');
    	setPreviewSource('');

		window.location = "/"

		/*event.preventDefault();
		if(!selectedFile) return
		const reader = new FileReader();
		reader.readAsDataURL(selectedFile);
		reader.onloadend=()=>{
			uploadImage(reader.result)
		};
		reader.onerror = () =>{
			console.error('NOOOOOO')
		}*/
	}


	const uploadImage = async(base64EncodedImage) =>{
		const Products = {
			nombre: products.nombre,
			descripcion: products.descripcion,
			codigo: products.codigo,
			picture: products.picture
		}
		try{
			
			axios.post('http://localhost:8080/save/products', Products, {
			
				body: JSON.stringify({ data: base64EncodedImage }),
            	headers: { 'Content-Type': 'application/json' },
			})
			setFileInputState('');
        	setPreviewSource('');
		} catch(err){
			console.error(err);
		}
	}


	return (
		<>
			<Container id="/">
				<Link href="/products">
					<P>Ver productos</P>
				</Link>
				<Form onSubmit={enviarDatos}>
					<H1>Registra un productos</H1>
 					<Label>
	 					Nombre:
	 					<Input type="text" required  name="nombre" onChange={handleInputChange}/>
	 				</Label>

	 				<Label>
	 					Descripción
	 					<Textarea required name="descripcion" onChange={handleInputChange}/>
	 				</Label>

	 				<Label>
	 					Código:
	 					<Input type="text" required  name="codigo" onChange={handleInputChange}/>
	 				</Label>

	 				<Label>
	 					Foto:
	 					<Input type="file" name="picture" id="fileInput" onChange={handleFileInputChange} />
	 				</Label>

	 				{previewSource && (
	 					<img src={previewSource} alt="chosen" style={{height: '300px'}}/>
	 				)}

	 				<Button type="submit">Registrar</Button>
				</Form>
			</Container>
		</>
	)
}

export default ProductsForm