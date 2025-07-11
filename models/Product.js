import mongoose from "mongoose";

const productScheam = new mongoose.Schema({
    
    productId : {
        type : String,
        unique : true,
        required : true
    },

    name : {
        type : String,
        required : true,
    },

    altNames : {
        type : [String],
        default : []
    },

    price : {
        type : Number,
        required : true
    },

    labeledPrice : {
        type : Number,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    images : {
        type : [String],
        default : ["https://www.mon-site-bug.fr/uploads/products/default-product.png"]
    },

    stock : {
        type : Number,
        required : true
    }

});

const Product = mongoose.model("products",productScheam);

export default Product;