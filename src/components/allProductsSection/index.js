 import React, {useState, useEffect} from 'react'
 import axios from 'axios'

 import {Container, Link, P, H1, UL, LI} from './elements'
 
 function AllProducts(){

     const [getProducts, setProducts] = useState([])


     useEffect(() =>{
         axios.get('http://localhost:8080/productsall').then(res =>{
             console.log(res.data)
             setProducts(res.data)
         })
         .catch(err =>{
             console.log(err)
         })
     }, [])

 	return (
 		<>
            <Container id="/products">
                <Link href="/">
                    <P>Registrar Producto</P>
                </Link>
 			    <H1>Página de productos</H1>

                <div>
                    {getProducts && getProducts.map((item, idx)=>(
                        <div>
                        <P>{item.nombre}</P>

                        <P>{item.descripcion}</P>
                        </div>
                    ))}
                </div>
            </Container>
 		</>
 	)
 }
 
 export default AllProducts