import Product from "../models/Product.js"

export function createProduct(req,res){
    if(req.User == null){
        res.status(403).json({
            message : "You need login first"
        })

        return

    }

    if(req.User.role != "admin"){
        res.status(403).json({
            message : "You cannot add products"
        })
        return
    }

    const product = new Product(req.body);

    product.save().then(
        () => {res.json({
                message : "Product saved successfully"
            })
        }
    ).catch((err) => {
        console.log(err)
        res.status(500).json({
            message : "Product not saved"
        })
    })

}

export function getProducts(req, res){
    Product.find().then((products) => {
        res.json(products)
    }).catch((err) => {
        console.log(err)
        res.status(500).json({
            message: "Product not found"
        })
    })
}

export function deleteProduct(req, res) {

    console.log(req.params.id);

    if (req.User == null) {
        res.status(403).json({
            message: "You need to login first"
        });
        return;
    }

    if (req.User.role != "admin") {
        res.status(403).json({
            message: "You cannot delete products"
        });
        return;
    }

    Product.findByIdAndDelete(req.params.id).then(() => {
        res.json({
            message: "Product deleted successfully"
        });
    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            message: "Product not found"
        });
    });
}