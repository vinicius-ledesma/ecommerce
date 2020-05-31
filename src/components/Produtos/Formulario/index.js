import React, { useCallback, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import useStyles from './styles';

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
    const classes = useStyles();
    const [product, setProduct] = useState(initialValue);
    const [responseError, setResponseError] = useState(null);
    const [invalidKeys, setInvalidKeys] = useState([]);
    const [currentOperation, setCurrentOperation] = useState(operation)
    const [message, setMessage] = useState(operation);
    
    const validEmptyFields = useCallback(() => {
        const keys = Object.keys(product).filter(key => !product[key]);
        setInvalidKeys(keys);
        if(keys.length > 0) {
            setResponseError('Campos não preenchidos marcados em vermelho!')
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
            setMessage(operation);
            return
        }
        if(backFunction){
            backFunction();
        }
    },[backFunction,currentOperation, operation, initialValue]);

    const handleChangeOperation = useCallback((e) => {
        e.preventDefault();
        setCurrentOperation(e.target.innerHTML);
        setMessage(e.target.innerHTML);
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
                        setTimeout(() => setMessage(message),5000);  
                        setMessage('Sucesso!');
                    }
                    if(currentOperation === 'Editar') {
                        setCurrentOperation('Visualizar');
                        setMessage('Visualizar');
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
        backFunction,
        message
    ]);

    const evalDisableField = useCallback((e) => {
        return currentOperation==='Visualizar' || currentOperation==='Excluir';
    },[currentOperation]);

    return (
        <form className={classes.root} noValidate autoComplete="off">
            {message &&
            <div><span className={classes.messageSpan}>{message}</span></div>
        }
            {responseError &&
            <div><span className={classes.errorSpan}>{responseError}</span></div>
        }
            <TextField 
                variant="outlined"
                label="SKU"
                name="sku"
                error={invalidKeys.includes("sku")} 
                disabled={currentOperation!=='Cadastrar'}
                onChange={handleChange} 
                value={product.sku} />
            <TextField 
                variant="outlined"
                label="Nome do Produto" 
                name="name" 
                error={invalidKeys.includes("name")} 
                disabled={evalDisableField()}
                onChange={handleChange} 
                value={product.name} />
            <TextField 
                multiline
                variant="outlined"
                label="Descrição" 
                name="description" 
                error={invalidKeys.includes("description")} 
                disabled={evalDisableField()}
                onChange={handleChange} 
                value={product.description} />
            <TextField 
                variant="outlined"
                label="Preço de Venda" 
                name="price" 
                error={invalidKeys.includes("price")} 
                disabled={evalDisableField()}
                onChange={(e) => { handlePrice(e); handleChange(e) } }
                value={product.price} />
            <TextField 
                variant="outlined"
                label="Quantidade"
                name="quantity"
                error={invalidKeys.includes("quantity")} 
                disabled={evalDisableField()}
                type="number"
                inputProps={{ min: "0"}}
                onChange={handleChange}
                value={product.quantity} />
            <TextField 
                variant="outlined"
                label="Imagem" 
                name="image"
                error={invalidKeys.includes("image")} 
                disabled={evalDisableField()}
                onChange={handleChange} 
                value={product.image} />
            {currentOperation==='Visualizar' &&
                <div>
                    <Button className={classes.button}
                        onClick={handleChangeOperation} 
                        color="primary"
                        >Editar</Button> 
                    <Button className={classes.button}
                        onClick={handleChangeOperation} 
                        color="primary"
                        >Excluir</Button>
                    <Button className={classes.button}
                        onClick={handleVoltar} 
                        color="secondary"
                        >Voltar</Button> 
                </div>
            }
            {currentOperation!=='Visualizar' &&
                <div>
                    <Button className={classes.button}
                        type="button"
                        color="secondary"
                        onClick={handleVoltar}>Voltar</Button>
                    <Button className={classes.button}
                        type="button"
                        color="primary"
                        onClick={handleConfirmar} default>Confirmar</Button>
                </div>
            }
        </form>
    );
}

export default Formulario;
