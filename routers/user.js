const express = require('express');
const router = express.Router();

const user = require('../models/user');

router.get('/', async(req, res)=>{
    try{
        const users = await user.find();
        res.status(200).json({'success': true, 'data': users});
    }catch(err){
        res.status(404).json({'success': false, 'msg': err});
    }
});
// get a single user by id 
router.get('/:id', async(req, res)=>{
    const userId = req.params.id;
    try {
        const finedUser = await user.findById(userId);
        if(!finedUser){
            return res.status(404).json({success: false, msg: "No user found with this id"});
        }

        res.status(200).json({success: true, data: finedUser});
        
    } catch (error) {
        res.status(404).json({success: false, msg: `Internal error: ${error}`});
    }
});

router.post('/', async(req, res)=>{
    const {name, phoneNumber, isMaried} = req.body;
    const newUser = new user({
        "name" : name,
        "phoneNumber" : phoneNumber,
        "isMaried" : isMaried
    });
    try {
        const savedNewUser = await newUser.save();
        res.status(200).json({success: true, data: savedNewUser});
        
    } catch (error) {
        res.status(404).json({success: false, mag: error });
    }

})
// PUT route to update a user by ID
router.put('/:id', async (req, res) => {
    const { name, phoneNumber, isMarried } = req.body;
    const userId = req.params.id;
    // const {userId} = req.params;

    try {
        const userToUpdate = await user.findByIdAndUpdate(
            userId,
            {
                name,
                phoneNumber,
                isMarried,
            },
            { new: true } // To return the updated user document
        );

        if (!userToUpdate) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        res.status(200).json({ success: true, data: userToUpdate });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error', error });
    }
});
// DELETE route to delete a user by ID
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const userToDelete = await user.findByIdAndDelete(userId);

        if (!userToDelete) {
            return res.status(404).json({ success: false, msg: 'User not found' });
        }

        res.status(200).json({ success: true, msg: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, msg: 'Internal server error', error });
    }
});

module.exports = router;