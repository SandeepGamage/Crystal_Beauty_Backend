import Product from "../models/Product.js"

export function createProduct(req,res){
    if(req.User == null){
        res.status(403).json({
            message : "You nedd login first"
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
        console,log(err)
        res.ststus(500).json({
            message : "Product not saved"
        })
    })

}