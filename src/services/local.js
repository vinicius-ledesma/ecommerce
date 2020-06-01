export const local = {
    online: function() {
        return new Promise((resolve, _) => {
            resolve(true);
        });
    },
    getProducts: function() {
        return new Promise((resolve, reject) => {
            const produtos = JSON.parse(localStorage.getItem('produtos'));
            resolve(produtos || []);
        });
    },
    setProducts: function(produtos,sku) {
        return new Promise((resolve, reject) => {
            if(produtos){
                localStorage.setItem("produtos", JSON.stringify(produtos));
                resolve();
            } else {
                reject('Não foi possível cadastrar os produtos!');
            }
        });
    },
    addProduct: function(produto) {
        return new Promise((resolve, reject) => {
            this.getProducts()
                .then((produtos) => {
                    if(produtos.find((prod) => prod.sku === produto.sku)) {
                        reject("SKU já cadastrado!");
                        return;
                    }
                    if(produtos){
                        localStorage.setItem("produtos", JSON.stringify([...produtos, produto]));
                        resolve();
                    } else {
                        reject('Não foi possível cadastrar o produto!');
                    }
                }).catch((message) => {
                    reject(message);
                })
        });
    },
};
