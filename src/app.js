import express from 'express'
import ProductManager from './Manager/ProductManager.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager("./products.json");


app.get('/products', async (req, res) => {
    try {
        const {limit} = req.query;
        if(limit > 0)
        {
            const products = await productManager.ObtenerLimiteProductos(limit);
            res.status(200).json(products);
        }else{
            const products = await productManager.GetProducts();
            res.status(200).json(products);
        }     
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

app.get('/products/:idProduct', async (req, res) => {
    try {
        const { idProduct } = req.params;
        const product = await productManager.GetProductById(Number(idProduct));
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product Not Found" });
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

app.listen(8080, () => {
    console.log("Server OK on port 8080.");
});