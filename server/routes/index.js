const express=require('express');
const router=express.Router();
const Controller=require('../Controller/index')

router.post('/login',Controller.login);
router.post('/sign_up',Controller.signUp);
router.post('/add_product',Controller.addProduct);
router.get('/all_order',Controller.allOrder);
router.post('/place_order',Controller.placeOrder);
router.delete('/delete_order/:id',Controller.deleteOrder);
router.get('/get_product/:id',Controller.getProduct);
router.put('/update_product/:id',Controller.updateProduct);





module.exports=router;

