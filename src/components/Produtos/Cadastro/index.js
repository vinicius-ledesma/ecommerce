import React from 'react';
import Formulario from "../Formulario";
import dao from '../../../services/dao'
import  { useHistory } from 'react-router-dom'
import { Container } from './styles'

function Cadastro() {
    const history = useHistory();
    const voltar = () => {
        history.push('/listagem');
    };
    const persistProd = ({product}) => new Promise((resolve, reject) => {
        dao.setProduct(product)
            .then(() => resolve())
            .catch((message) => reject(message));
    });
    return <Container>
        <h3>Cadastro</h3>
        <Formulario 
            operation='Cadastrar'
            callBack={persistProd}
            backFunction={voltar}/>
    </Container>;
}

export default Cadastro;
