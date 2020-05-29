import React, { useEffect, useState, useCallback } from 'react';

import Detalhes from '../Detalhes'

function Listagem() {
    const [produtos, setProdutos] = useState([]);
    const [currentProd, setCurrentProd] = useState(null);

    useEffect(() => {
        const prods = JSON.parse(localStorage.getItem('produtos'));
        console.log(prods);
        setProdutos(prods);
    }, []);

    const visualizarDetalhes = useCallback((produto) => {
        setCurrentProd(produto);
    },[])

    return <div>
        <h2>Listagem de Produtos</h2>

        <table>
            <thead>
                <tr>
                    <th>SKU</th>
                    <th>Nome</th>
                    <th>Preço</th>
                </tr>
            </thead>
            <tbody>
                {produtos.map(produto => (
                    <tr key={produto.sku}>
                        <td>{produto.sku}</td>
                        <td>{produto.name}</td>
                        <td>{produto.price}</td>
                        <td><button onClick={() => visualizarDetalhes(produto)} >Visualizar detalhes</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        {currentProd && <Detalhes produto={currentProd}/>}
    </div>;
}

export default Listagem;
