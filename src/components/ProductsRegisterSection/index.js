import React, {useState} from 'react'
import axios from 'axios'
import {ContainerR, Button, Link, H1, CentralBox, Form, Label, Input, Textarea, ButtonSubmit} from './elements'

import Alert from './Alert'

function ProductsForm (props){

	const [previewSource, setPreviewSource] = useState()
	const [fileInputState, setFileInputState] = useState('')
	const [selectedFile, setSelectedFile] = useState();
	const [loading, setLoading] = useState(false)
	const [successMsg, setSuccessMsg] = useState('');
	const [products, setProducts] = useState({
		nombre: '',
		descripcion: '',
		codigo: '',
		picture: ''
	})

	const handleFileInputChange = (e) =>{
		const file = e.target.files[0]
		previewFile(file)
		setSelectedFile(file)
		setFileInputState(e.target.value)
	}

	const previewFile = (file) =>{

		var fileBase64 = document.getElementById('gFile');
		var fileType = document.getElementById('gFileType');

		var reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = function () {
			setPreviewSource(reader.result)
			fileType.value = file.name.split('.').pop().toLowerCase();
			
			var img = new Image();
			img.src = reader.result;
			img.onload = function() {
				fileBase64.value = reader.result;

			};
		};
	}

	const handleSubmitFile = (e) =>{

		e.preventDefault()
		
		if(!selectedFile) return;
		const reader = new FileReader();
		reader.readAsDataURL(selectedFile)
		reader.onloadend = () =>{

			enviarDatos(reader.result)
		};
		reader.onerror = () =>{
			console.error('Nooo')
		}
		
		//para limpiar los inputs
      	e.target.reset()
	}

	const handleInputChange = (event) =>{
		setProducts({
			...products, 
			[event.target.name] : event.target.value,
			
		})
	}

	const enviarDatos = async (event) =>{
		
		try{
			
			const Products = {
				nombre: products.nombre,
				descripcion: products.descripcion,
				codigo: products.codigo,
				picture: document.getElementById('gFile').value
			}
			
			console.log(Products)
			setLoading(true)
	        await axios.post('http://localhost:8080/save/products', Products, {
	        	body: JSON.stringify({ data: event }),
	            headers: { 'Content-Type': 'application/json' },
	        })
			setFileInputState('');
	    	setPreviewSource('');
	    	setSuccessMsg('¡Nuevo producto registrado!');
	    	
	    	setLoading(false)
			//window.location = "/"
		} catch (err){
			console.error(err)
		}
		
		
		
	}

	return (
		<>
			<ContainerR id="/">
				<Button>
                    <Link href="/products">
                        Ver Productos
                    </Link>
                </Button>

                <Alert msg={successMsg} type="success" />
				<H1>Registra un producto</H1>
				<CentralBox>
					<Form className="form-group row" onSubmit={handleSubmitFile}>
						
	 					<Label>
		 					Nombre:
		 					<Input type="text" required name="nombre" onChange={handleInputChange}/>
		 				</Label>

		 				<Label>
		 					Descripción
		 					<Textarea required name="descripcion" onChange={handleInputChange}/>
		 				</Label>

		 				<Label>
		 					Código:
		 					<Input type="text" required name="codigo" onChange={handleInputChange}/>
		 				</Label>

		 				<Label>
		 					Foto:
		 					<Input type="file" name="picture" id="fileInput" onChange={handleFileInputChange} />
		 					<input type="hidden" name="gFile" id="gFile" value=""/>
							<input type="hidden" name="gFileType" id="gFileType" value=""/>
		 				</Label>

		 				{previewSource && (
		 					<img src={previewSource} alt="chosen" style={{width:'100%', background: 'white', marginBottom:'10px'}}/>
		 				)}

		 				<ButtonSubmit type="submit">
			 				{loading ? (
					            <div className="spinner-border spinner-border-sm text-light" role="status" style={{background: '#0066cc'}}>
								  <span className="sr-only"/>
								</div>

					          ): ("Registrar")
					        }
		 				</ButtonSubmit>
					</Form>
				</CentralBox>
			</ContainerR>
		</>
	)
}

export default ProductsForm