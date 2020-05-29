import React, { useState, useCallback } from 'react';

import { Container, Form, Input, Textarea, Button, Span } from './styles'

function Cadastro() {
    const initialValue = {
        sku: "",
        name: "",
        description: "",
        price: "",
        quantity: "",
        image: ""
    };

    const [product, setProduct] = useState(initialValue);
    const [products, setProducts] = useState([]);
    const [responseError, setResponseError] = useState(null);

    const validation = useCallback(() => {
        if(!product.sku) {
            setResponseError("SKU não foi preenchido!")
            const input = document.getElementsByName('sku')[0];
            input.focus();
            return false;
        }
        if(!product.name) {
            setResponseError("O nome não foi preenchido!")
            const input = document.getElementsByName('name')[0];
            input.focus();
            return false;
        }
        if(!product.description) {
            setResponseError("A descrição não foi preenchida!")
            const txt = document.getElementById("txt");
            txt.focus();
            return false;
        }
        if(!product.price) {
            setResponseError("O preço não foi preenchido!")
            const input = document.getElementsByName('price')[0];
            input.focus();
            return false;
        }
        if(!product.quantity) {
            setResponseError("A quantidade não foi preenchida!")
            const input = document.getElementsByName('quantity')[0];
            input.focus();
            return false;
        }
        if(!product.image) {
            setResponseError("A imagem não foi preenchida!")
            const input = document.getElementsByName('image')[0];
            input.focus();
            return false;
        }
        if(products.find((prod) => prod.sku === product.sku)) {
            setResponseError("SKU já cadastrado!")
            return false;
        }
        setResponseError(null);
        return true;
    },[product, products]);

    const handleKeyUp = useCallback((e) => {
        let value;
        value = e.target.value;
        value = value.replace(/\D/g,"");
        value = value.replace(/(\d)(\d{2})$/,"$1,$2");
        value = value.replace(/(?=(\d{3})+(\D))\B/g,".");
        e.target.value = value;
    },[]);

    const handleChange = useCallback((e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    },[product]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if(!validation()){
            return;
        }
        const prods = [...products, product];
        setProducts(prods);
        localStorage.setItem("produtos", JSON.stringify(prods));
        setProduct(initialValue);
    },[product, products, validation, initialValue]);

    const handleLog = useCallback((e) => {
        e.preventDefault();
        console.log(products);
    },[products]);

    return <Container>
        <h3>Cadastro</h3>

        <Form>
            <Span>{responseError}</Span>
            <Input placeholder="SKU" onChange={handleChange} name="sku" value={product.sku} />
            <Input placeholder="Nome do Produto" onChange={handleChange} name="name" value={product.name} />
            <Textarea placeholder="Descrição" onChange={handleChange} id="txt" name="description" value={product.description}></Textarea>
            <Input placeholder="Preço de Venda" onChange={handleChange} name="price" onKeyUp={handleKeyUp} value={product.price} />
            <Input placeholder="Quantidade" type="number" min="0" onChange={handleChange} name="quantity" value={product.quantity} />
            <Input placeholder="Imagem" onChange={handleChange} name="image" value={product.image} />

            <Button onClick={handleSubmit}>Cadastrar</Button>
            <Button onClick={handleLog}>Log</Button>
        </Form>
    </Container>;
}

export default Cadastro;
