import styled from 'styled-components'


export const Container = styled.div`
	height: 100%;
	width: 100%;
`
export const H1 = styled.h1`
	font-size: 30px;
	color: #0066cc;
	text-align:center;
	margin-bottom: 20px;
`

export const Button = styled.button`
	margin-top: 20px;
	margin-left: 20px;
	padding: 10px;
	cursor: pointer;
	border-radius: 10px;
	background: #0066cc;
	text-decoration: none;
	border: none;
	margin-bottom: 20px;
`

export const Link = styled.a`
	text-decoration: none;
	background: #0066cc;
	font-size: 15px;
	color: white;
`

export const MainBox = styled.div`
	max-width: 1000px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	align-items: center;
	grid-gap: 0 50px;

	@media screen and (max-width: 1000px){
		grid-template-columns: 1fr 1fr;
	}

	@media screen and (max-width:768px){

		padding: 0 20px;
		justify-content:center;
		display: table;
	}
`

export const ServicesContent = styled.div`
	padding:20px;
	align-items:center;
	text-align:left;;
	margin: auto;
	background: white;
	height: 100%;
	max-height: 100px;
	width:100%;
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
`

export const TitleProduct = styled.h2`
	font-size: 18px;
	background: white;
`

export const P = styled.p`
	font-size: 13px;
	width:100%;
	max-width: 300px;
	color: #0066cc;
	padding: 0 0 0px;
	margin: 0 0 0px;
	background: white;
	overflow: hidden;
	white-space: nowrap;
    text-overflow: ellipsis;
`

export const Box = styled.div`
	background: #fff;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 10px;
	height:100%;
	max-height: 340px;
	margin-bottom: 60px;
	padding: 0px;
	
	box-shadow: 0 0px 15px rgba(0,0,0,0.2);
	transition: all 0.2s ease-in-out;

	&:hover{
		transform: scale(1.02);
		transition: all 0.2s ease-in-out;
		cursor: pointer;
	}

	@media screen and (max-width:768px){
		widthe: 100%;
		max-width: 300px;
	}
`

export const ImgBox = styled.div`
	height: 200px;
	width: 100%;
	border-top-right-radius: 10px;
	border-top-left-radius: 10px;
	background-size: cover;
`