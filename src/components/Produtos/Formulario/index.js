import React, { useCallback, useState } from 'react';
import { Form, Input, Textarea, Button, Span, MessageSpan, ErrorSpan, Div } from './styles'

function Formulario({operation, initialValue, backFunction, callBack}) {

    if(!initialValue) {
        initialValue = {
            sku: "",
            name: "",
            description: "",
            price: "",
            quantity: "",
            image: ""
        };
    }

    const [product, setProduct] = useState(initialValue);
    const [responseError, setResponseError] = useState(null);
    const [message, setMessage] = useState(null);
    const [currentOperation, setCurrentOperation] = useState(operation)
    
    const validEmptyFields = useCallback(() => {
        const invalidKeys = Object.keys(product).filter(key => !product[key])
        if(invalidKeys.length > 0) {
            setResponseError(`Campos obrigatórios não preenchidos: ${invalidKeys.join(', ')}`)
            const input = document.getElementsByName(invalidKeys[0])[0];
            input.focus();
            return false;
        }
        setResponseError(null);
        return true;
    },[product]);
   
    const handleChange = useCallback((e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value,
        });
    },[product]);

    const handlePrice = useCallback((e) => {
        let value;
        value = e.target.value;
        value = value.replace(/\D/g,"");
        value = value.replace(/(\d)(\d{2})$/,"$1,$2");
        value = value.replace(/(?=(\d{3})+(\D))\B/g,".");
        e.target.value = value;
    },[]);

    const handleVoltar = useCallback((e) => {
        e.preventDefault();
        if(currentOperation !== operation) {
            setProduct(initialValue);
            setCurrentOperation(operation);
            return
        }
        if(backFunction){
            backFunction();
        }
    },[backFunction,currentOperation, operation, initialValue]);

    const handleChangeOperation = useCallback((e) => {
        e.preventDefault();
        setCurrentOperation(e.target.innerHTML);
    },[]);

    const handleConfirmar = useCallback((e) => {
        e.preventDefault();
        if(!validEmptyFields()){
            return;
        }
        if(callBack){
            callBack({product, currentOperation})
                .then(() => {
                    if(currentOperation === 'Cadastrar') {
                        setProduct(initialValue);
                        setMessage('Cadastro efetuado com sucesso!');
                        setTimeout(() => setMessage(null),5000);  
                    }
                    if(currentOperation === 'Editar') {
                        setCurrentOperation('Visualizar');
                    }                    
                    if(currentOperation === 'Excluir') {
                        backFunction();
                    }
                })
                .catch(message => {
                    setResponseError(message);
                });
            return;
        }
        setResponseError('Não há callback para enviar os valores...');
    },[product, 
        validEmptyFields, 
        initialValue, 
        currentOperation, 
        callBack, 
        backFunction
    ]);

    const evalDisableField = useCallback((e) => {
        return currentOperation==='Visualizar' || currentOperation==='Excluir';
    },[currentOperation]);

return (
     <Form>
        {message &&
            <MessageSpan>{message}</MessageSpan>
        }
        {responseError &&
            <ErrorSpan>{responseError}</ErrorSpan>
        }
        {currentOperation!=='Cadastrar' &&
            <Span id='sku'>SKU</Span>
        }
        <Input placeholder="SKU" 
            disabled={currentOperation!=='Cadastrar'}
            onChange={handleChange} 
            name="sku" 
            value={product.sku} />
        {currentOperation!=='Cadastrar' &&
            <Div>
                <Span id='name'>Nome do Produto</Span>
                <Input disabled={evalDisableField()}
                    onChange={handleChange} 
                    name="name" 
                    value={product.name} />
            </Div>
        }
        {currentOperation==='Cadastrar' &&
            <Input placeholder="Nome do Produto" 
                    disabled={evalDisableField()}
                    onChange={handleChange} 
                    name="name" 
                    value={product.name} />
        }
        {currentOperation!=='Cadastrar' &&
            <Span id='description'>Descrição</Span>
        }
        <Textarea placeholder="Descrição" 
            disabled={evalDisableField()}
            onChange={handleChange} 
            name="description" 
            value={product.description}>
        </Textarea>
        {currentOperation!=='Cadastrar' &&
            <Span id='price'>Preço de Venda</Span>
        }
        <Input placeholder="Preço de Venda" 
            disabled={evalDisableField()}
            onChange={(e) => { handlePrice(e); handleChange(e) } }
            name="price" 
            value={product.price} />
        {currentOperation!=='Cadastrar' &&
            <Span id='quantity'>Quantidade</Span>
        }
        <Input placeholder="Quantidade"
            disabled={evalDisableField()}
            type="number"
            min="0"
            onChange={handleChange}
            name="quantity"
            value={product.quantity} />
        {currentOperation!=='Cadastrar' &&
            <Span id='image'>Imagem</Span>
        }
        <Input placeholder="Imagem" 
            disabled={evalDisableField()}
            onChange={handleChange} 
            name="image" 
            value={product.image} />
        {currentOperation==='Visualizar' &&
            <div>
                <Button onClick={handleVoltar}>Voltar</Button> 
                <Button onClick={handleChangeOperation}>Editar</Button> 
                <Button onClick={handleChangeOperation}>Excluir</Button>
            </div>
        }
        {currentOperation!=='Visualizar' &&
            <div>
                <Button 
                    type="button"
                    onClick={handleVoltar}>Voltar</Button>
                <Button 
                    type="button"
                    onClick={handleConfirmar} default>Confirmar</Button>
            </div>
        }
    </Form>
);
}

export default Formulario;
