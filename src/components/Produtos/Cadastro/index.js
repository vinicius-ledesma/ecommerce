import React, { useState, useCallback } from 'react';

import { Container, Form, Input, Textarea, Button } from './styles'

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

    const handleChange = useCallback((e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    },[product]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        console.log(product);
    })

    return <Container>
        <h3>Cadastro</h3>

        <Form onSubmit={handleSubmit}>
            <Input placeholder="SKU" onChange={handleChange} name="sku" value={product.sku} />
            <Input placeholder="Nome do Produto" onChange={handleChange} name="name" value={product.name} />
            <Textarea placeholder="Descrição" onChange={handleChange} name="description" value={product.description}></Textarea>
            <Input placeholder="Preço de Venda" onChange={handleChange} name="price" value={product.price} />
            <Input placeholder="Quantidade" onChange={handleChange} name="quantity" value={product.quantity} />
            <Input placeholder="Imagem" onChange={handleChange} name="image" value={product.image} />

            <Button>Cadastrar</Button>
        </Form>
    </Container>;
}

export default Cadastro;
