import Order from "../models/order.js";
import Order from "../models/order.js";

export function createOrder(req, res){

    if(request.user == null){
        res.status(404).json({
            message : "Unauthorized"
        })
    }

    const body = request.body;

    const orderData = {
        orderId : "",
        email: req.user.email,
		name: body.name,
		address: body.address,
		phoneNumber: body.phoneNumber,
		billItems: [],
		total: 0,
    };

    Order.find().sort({
        date : -1
    }).limit(1).then((lastBill) => {

         if(lastBill.length == 0){
        orderData.orderId = "ORD0001"
    }else{
        const lastBill = lastBill[0];

        const lastOrderId = lastBill.orderId;
        const lastOrderNumber = parseInt(lastOrderId.replace("ORD", ""));
        const newOrderNumberInt = lastOrderId + 1;
        const newOrderNumberStr = newOrderNumberInt.toString().padStart(4, "0");//ensure 4 digits
        orderData.orderId = "ORD" + newOrderNumberStr;
    }

    const order = new Order(orderData);

    order.save().then(() => {
        res.json({
            message: "Order created successfully",
            orderId: orderData.orderId
        });
    }).catch((err) => {
        res.status(500).json({
            message: "Error creating order",
            error: err.message
        });
    });

    });

}

export function getOrders(req, res){
    if(req.user == null){
        res.status(404).json({
            message : "Unauthorized"
        });
        return;
    }

    if(req.user.role == "Admin"){
        Order.find().then((orders) => {
            res.json(orders);
        }).catch((err) => {
            res.status(500).json({
                message: "Error fetching orders",
                error: err.message
            });
        });
    }else{
        Order.find({
            email: req.user.email
        }).then((orders) => {
            res.json(orders);
        }).catch((err) => {
            res.status(500).json({
                message: "Error fetching orders",
                error: err.message
            });
        });
    }

}