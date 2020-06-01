
import axios from 'axios';

const ax = axios.create({
    baseURL: 'http://localhost:3004'
})

export const api = {
    online: function() {
        return ax.get('/produtos')
        .then(() => true)
        .catch(() => false);
    },
    getProducts: function() {
        return ax.get('/produtos')
        .then(response => {
            return response.data.map(({id, name, description, price, quantity, image}) => {
                return {
                    sku: id,
                    name,
                    description,
                    price,
                    quantity,
                    image
                };
            })
        })
        .catch(() => []);
    },
    setProducts: function(_, {product, currentOperation} ) {
        const {sku, name, description, price, quantity, image} = product;
        if(currentOperation === "Editar"){
            return ax.put('/produtos/' + sku, {
                id: sku,
                name,
                description,
                price,
                quantity,
                image
            });
        }
        if(currentOperation === "Excluir"){
            return ax.delete('/produtos/' + sku);
        }
    },
    addProduct: function({sku, name, description, price, quantity, image}) {
        return new Promise((resolve, reject) => {
            ax.get('/produtos/' + sku)
            .then(() => {
                reject("SKU já cadastrado!");
            })
            .catch((err) => {
                console.log(err);
                resolve(ax.post('/produtos', {
                    id: sku,
                    name,
                    description,
                    price,
                    quantity,
                    image
                }))
            });
        });
    }
};
