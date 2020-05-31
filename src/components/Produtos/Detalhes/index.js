import React from 'react';
import Formulario, {} from '../Formulario';

import { Modal } from './styles'

function Detalhes ({produto, select, update}) {

    const closeModal = () => {
        select(null);
    };

    const getValues = ({product, currentOperation}) => {
        return update({currentOperation, product});
    }

    return (
        <Modal>
            <Formulario 
                operation='Visualizar'
                initialValue={produto}
                backFunction={closeModal}
                callBack={getValues}
                />
        </Modal>
    );
}

export default Detalhes;
