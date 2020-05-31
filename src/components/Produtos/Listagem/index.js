import React, { useEffect, useState, useCallback } from 'react';
import dao from '../../../services/dao';
import Detalhes from '../Detalhes';

function Listagem() {
    const [produtos, setProdutos] = useState([]);
    const [currentProd, setCurrentProd] = useState(null);
    const [message, setMessage] = useState(null);

    const receiveProduct = ({product, currentOperation}) => new Promise((resolve, reject) => {
        let refreshedProducts;
        if(currentOperation === 'Excluir') {
            refreshedProducts = produtos.filter(prod => prod.sku !== product.sku);
        }
        if(currentOperation === 'Editar') {
            const otherProducts = produtos.filter(prod => prod.sku !== product.sku);
            refreshedProducts = [...otherProducts, product];
        }
        dao.setProducts(refreshedProducts)
            .then(() => {
                    setProdutos(refreshedProducts);
                    resolve();
                })
            .catch((message) => reject(message));
    });

    const renderProducts = useCallback((productsToRender) => {
        
        if(productsToRender){
            if(productsToRender.length > 0){
                setProdutos(productsToRender);
            } else {
                setMessage('Não sobrou nenhum produto... =(');
            }
            return;
        }
        dao.getProducts()
        .then((prods) => {
            if(prods.length > 0) {
                setProdutos(prods);
            } else {
                setMessage('A lista de produtos está vazia. Vamos começar?');
            }
        })
        .catch((message) => {
            setMessage(message);
        });
    },[]);

    useEffect(() => {
        renderProducts();
    }, [renderProducts]);

    const visualizarDetalhes = useCallback((produto) => {
        setCurrentProd(produto);
    },[])

    return <div>
        <h2>Listagem de Produtos</h2>
        { !message && 
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
        }
        { message &&
            <p>{message}</p>
        }
        {currentProd && <Detalhes produto={currentProd} select={setCurrentProd} update={receiveProduct} />}
    </div>;
}

export default Listagem;
