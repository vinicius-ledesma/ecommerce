import React, { useState } from 'react';
import Formulario from "../Formulario";
import daoFactory from '../../../services/dao'
import  { useHistory } from 'react-router-dom'
import { Container } from './styles'

function Cadastro() {
    const history = useHistory();
    const [dao, setDAO] = useState();
    daoFactory().then((dao) => setDAO(dao));

    const voltar = () => {
        history.push('/listagem');
    };
    const persistProd = ({product}) => new Promise((resolve, reject) => {
        dao.addProduct(product)
            .then(() => resolve())
            .catch((message) => reject(message));
    });
    return <Container>
        <Formulario 
            operation='Cadastrar'
            callBack={persistProd}
            backFunction={voltar}/>
    </Container>;
}

export default Cadastro;
