const {deleteBYID,deleteAll,update,findAllCostlyProducts,create,findAll,findOne,} = require("../controller/product.controller")

const express = require("express");
const router = express.Router();


//create a new product

router.post("/",create);

//retrieve all products
router.get("/",findAll);

//Retrieve all costly products

router.get("/price",findAllCostlyProducts);

//Retrieve a single product

router.get("/:id",findOne);

//Update a single product with id
router.put("/:id",update);

//Delete a single product with id

router.delete("/:id",deleteBYID); 


//Delete all products
router.delete("/:id",deleteAll)


module.exports=router;

