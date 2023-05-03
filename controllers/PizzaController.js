const express = require('express');
const router = express.Router();
var _ = require("underscore");
let PizzaData = require('../models/PizzaData');
let Cart = require('../models/Cart');


module.exports = function () {

    router.post('/add-pizza', function (req, res) {
        console.log(req.body)
        let PizzaDataJSON = new PizzaData(req.body);
        PizzaDataJSON.save()
            .then(Course => {
                var data = {
                    Status: "Sucess",
                    Message: "Successfully Added A New Pizza"
                }
                res.status(201).send(data);
            }).catch(err => {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            });

    })

    router.get('/get-user-cart/:id', function (req, res) {
        const id = req.params.id;
        console.log(id)
        Cart.findById(req.params.id, function (err, cart) {
            if (!err) {
                var data = {
                    Status: "Pass",
                    Message: "Unexpected Error PLease Contact System Admin",
                    Data: cart.CartDetails
                }
                res.status(200).send(data);

            }

        });

    })
    router.post('/remove-item/:id', function (req, res) {
        console.log(req.params.id,"Bodyy")
        Cart.updateOne(
            { _id: "64524983766b780eb43d0edf" },
            { $pull: { CartDetails: { _id: req.params.id } } },
            (err, result) => {
                if (err) {
                    // Handle the error
                    console.error(err);
                } else {
                    // The item was removed successfully
                    console.log("Doneeeee");
                    console.log(result);
                    var data = {
                        Status: "Done",
                        Message: "Removed"
                    }
                    res.status(200).send(data);
                }
            }
        );


    })

    router.post('/update-cart', function (req, res) {
        Cart.findById("64524983766b780eb43d0edf", function (err, cart) {
            console.log(req.body.CartDetails)
            if (err) throw err;

            // Create a new item to add to the CartDetails array
            const newItem = {
                PizzaID: '123',
                PizzaName: 'Pepperoni Pizza',
                // ... add the rest of the fields here
            };

            // Add the new item to the CartDetails array
            cart.CartDetails.push(req.body.CartDetails[0]);

            // Save the updated cart document
            cart.save(function (err) {
                if (err) throw err;

                console.log('Item added to cart successfully');
            });
        });

    })

    router.post('/add-to-cart', function (req, res) {
        console.log(req.body)
        let CartJSON = new Cart(req.body);
        CartJSON.save()
            .then(Course => {
                var data = {
                    Status: "Sucess",
                    Message: "Successfully Added A New Pizza"
                }
                res.status(201).send(data);
            }).catch(err => {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            });

    })


    router.get('/get-all-pizza-data', function (req, res) {
        var found = false;
        const Data = []

        PizzaData.find(function (err, data) {
            if (!err) {

                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin",
                    Data: data
                }
                res.status(200).send(data);





            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })


    router.get('/get-pizza-data-by-ID/:id', function (req, res) {
        var found = false;
        const Data = []
        const id = req.params.id;
        console.log(id)
        PizzaData.find(function (err, data) {
            if (!err) {
                data.forEach(element => {

                    if (element._id == id) {


                        Data.push(element)
                        found = true;


                    }

                })
                if (found == false) {
                    var data = {
                        Status: "Fail",
                        Message: "Unauthorized Acess"
                    }
                    res.status(200).send(data);

                } else {
                    res.status(200).send(Data);
                }




            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })





    return router;
}