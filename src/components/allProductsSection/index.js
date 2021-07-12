 import React, {useState, useEffect} from 'react'
 import axios from 'axios'

 import {Container, Link, Button, P, H1, TitleProduct, MainBox, Box, ImgBox, ServicesContent} from './elements'
 
 function AllProducts(){

     const [getProducts, setProducts] = useState([])


    const OnLoad = async (e) =>{
        try {
            axios.get('http://localhost:8080/productsall').then(res =>{
                console.log(res.data)
                setProducts(res.data)
            })
        } catch(err){
            console.log(err)
        }
    } 

    useEffect(() =>{
        OnLoad();
    }, [])


 	return (
 		<>
            <Container id="/products">
                <Button>
                    <Link href="/">
                        Registrar Producto
                    </Link>
                </Button>
 			    <H1>Página de productos</H1>
                <MainBox>
                    {getProducts && getProducts.slice().reverse().map((item, idx)=>(
                        <div>
                            <Box>
                                <ImgBox style={{backgroundImage: `url(${item.picture})`}}/>
                                
                                <ServicesContent>
                                    <TitleProduct>{item.nombre}</TitleProduct>
                                    <P>{item.descripcion}</P>
                                </ServicesContent>
                            </Box>
                        </div>
                    ))}
                    <onEmpty/>
                </MainBox>
            </Container>
 		</>
 	)
 }
 
 export default AllProducts