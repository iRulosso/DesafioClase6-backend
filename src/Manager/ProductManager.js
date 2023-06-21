import fs from 'fs'

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async GetProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const productsFile = await fs.promises.readFile(this.path, 'utf-8');
                const productsJS = JSON.parse(productsFile);
                return productsJS
            } else {
                return []
            }
        } catch (error) {
            console.log(error);
        }

    }

    async AddProduct(prod) {
        try {
            const pro = { ...prod }
            pro.id = await this.obtenerUltimoId() + 1;
            const products = await this.GetProducts();
            products.push(pro);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
        } catch (error) {
            console.log(error);
        }
    }

    async GetProductById(id) {
        try {
            const products = await this.GetProducts();
            const prod = products.find((p) => p.id === id);
            if (!prod) {
                console.log("Producto no encontrado.");
                return
            } else {
                return prod;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async DeleteProduct(id) {
        try {
            let products = await this.GetProducts();
            products = products.filter(prod => prod.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
        } catch (error) {
            console.log(error);
        }
    }

    async UpdateProduct(id, title, description, price, thumbnail, code, stock) {
        try {
            await this.DeleteProduct(id);
            const updatedProduct = {
                id: id,
                title:title,
                description:description,
                price:price,
                thumbnail:thumbnail,
                code:code,
                stock
            }
            const products = await this.GetProducts();
            products.push(updatedProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
            
        } catch (error) {
            console.log(error);
        }
    }

    async ObtenerLimiteProductos(limit){
        try {
            const prod = await this.GetProducts();
            let productosLimit = [];
            for(let i = 1; i<= limit; i++)
            {
                productosLimit.push(prod[i-1])
                if(i == limit)
                {
                    return productosLimit;
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async obtenerUltimoId() {
        try {
            const prod = await this.GetProducts();
            let ultimaID = 0;
            prod.map((p) => {
                if (p.id > ultimaID) {
                    ultimaID = p.id;
                }
            })
            return ultimaID;
        } catch (error) {
            console.log(error);
        }

    }
}