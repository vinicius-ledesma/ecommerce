import React, { useEffect, useState, useCallback } from 'react';
import dao from '../../../services/dao';
import Detalhes from '../Detalhes';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

function Listagem() {
    const [produtos, setProdutos] = useState([]);
    const [currentProd, setCurrentProd] = useState(null);
    const [message, setMessage] = useState(null);
    const useStyles = makeStyles({
        table: {
          width: '65%',
        },
        button: {
            height: '30px',
            outline: 'none',
            background: '#999',
            borderRadius: '5px',
            marginTop: '10px',
            border: '1px solid #888',
        }
      });
    const setProdutosSorted = produtos => 
        setProdutos(produtos
            .sort((a, b) => a.sku.localeCompare(b.sku)));
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
                setProdutosSorted(refreshedProducts);
                    resolve();
                })
            .catch((message) => reject(message));
    });

    const renderProducts = useCallback((productsToRender) => {
        
        if(productsToRender){
            if(productsToRender.length > 0){
                setProdutosSorted(productsToRender);
            } else {
                setMessage('Não sobrou nenhum produto... =(');
            }
            return;
        }
        dao.getProducts()
        .then((prods) => {
            if(prods.length > 0) {
                setProdutosSorted(prods);
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
    const classes = useStyles();

    return <div>
        <h2>Listagem de Produtos</h2>
        { !message &&
        <TableContainer component={Paper}>
            <Table className={classes.table}  size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>SKU</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Preço</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {produtos.map(produto => (
                        <TableRow  key={produto.sku}>
                            <TableCell>{produto.sku}</TableCell>
                            <TableCell>{produto.name}</TableCell>
                            <TableCell>{produto.price}</TableCell>
                            <TableCell><Button className={classes.button} onClick={() => visualizarDetalhes(produto)} >...</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        }
        { message &&
            <p>{message}</p>
        }
        {currentProd && <Detalhes produto={currentProd} select={setCurrentProd} update={receiveProduct} />}
    </div>;
}

export default Listagem;
