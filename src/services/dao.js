const dao = {
    getProducts: function() {
        return new Promise((resolve, reject) => {
            const produtos = JSON.parse(localStorage.getItem('produtos'));
            resolve(produtos || []);
        });
    },
    setProducts: function(produtos) {
        return new Promise((resolve, reject) => {
            if(produtos && produtos.length > 0){
                localStorage.setItem("produtos", JSON.stringify(produtos));
                resolve();
            } else {
                reject('Não foi possível cadastrar os produtos!');
            }
        });
    },
    setProduct: function(produto) {
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

export default dao;
