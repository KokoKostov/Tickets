const express = require('express');
const Ticket = require('../models/ticket.model'); 
const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const { generateAccessToken, generateRefreshToken, verifyToken,  } = require('../helpers/helpers');
const authenticateToken = require('../middleware/Authenticate');

const router = express.Router();

router.post('/tickets',authenticateToken, async (req, res) => {
    
    // try {
    //     const newTicket = new Ticket(req.body);
    //     await newTicket.save();
    //     console.log('Ticket created:', newTicket); 
    //     res.status(201).json(newTicket);
    // } catch (err) {
    //     console.error('Error saving ticket:', err.message); 
    //     res.status(400).json({ error: err.message });
    // }
  
    try {
        
        
        const userId= req.user.userId
        console.log(userId);
        
        const newTicket = new Ticket({
            ...req.body,
            user:userId
        });
        await newTicket.save();
        console.log('Ticket created:', newTicket); 
        res.status(201).json(newTicket);
    } catch (err) {
        console.error('Error saving ticket:', err.message); 
        res.status(400).json({ error: err.message });
    }
    }
);
router.post('/tickets/:id/purchase',authenticateToken, async(req,res)=>{
    try{
        const ticketId= req.params.id
        const userId = req.user.userId
        
        const ticket = await Ticket.findById(ticketId)

        
        if(!ticket){
            return res.status(404).json({message:'Ticket not Found'})
        }

        if(ticket.buyer.includes(userId)){
            return res.status(400).json({message:'You have already purchased this ticket'})
        }
        ticket.buyer.push(userId)
        await ticket.save();
        res.status(200).json({message: 'Purchase is succesful'})
    }catch(err){
        console.error(`Error Purchasing Ticket`)
        res.status(500).json({Message: 'Internal error'})
    }
})
router.get('/tickets/bought',authenticateToken, async(req,res)=>{
    try{
        const userId= req.user.userId
        const tickets = await Ticket.find({buyer:userId})
        res.status(200).json(tickets)
    }catch(err){
        res.status(500).json({message:'Internal Server Error'})
    }
})


router.get('/tickets', async(req,res)=>{
    console.log('GET request received');
    try{
        const tickets= await Ticket.find();
      
        res.status(200).json(tickets);
    }catch(err){
        console.error("Error", err.message);
        res.status(500).json({error: `Server error`})
        
    }
    
})
router.get('/tickets/:_id', async (req, res) => {

    try {
        const id = req.params._id;
        console.log(id);
        
        const ticket = await Ticket.findById(id);

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json(ticket);
    } catch (err) {
        console.error('Error fetching ticket:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
// router.get('/users/:id',async(req,res)=>{
//     try{
        
        
//         const id = req.params.id;
//         const user= await User.findById(id)
//         if(!user){
//             return res.status(404).json({
//                 message: 'User not found'
//             })
//         }
//         console.log(user);
        
//         res.status(200).json(user)
//     }
//     catch(err){
//         constole.error(err)
//         res.status(500).json({err:"Internal Server Error"})
//     }
// })
router.post('/users', async (req, res) => {
    console.log('Received POST request with data:', req.body);

    const { username, password, email } = req.body;



    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });
        
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this username or email.' });
        }
        
      
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        console.log('User created:', newUser);

        const accessToken = await generateAccessToken({ userId: newUser._id });
        const refreshToken = await generateRefreshToken({ userId: newUser._id });

        res.status(201).json({ user: newUser, accessToken, refreshToken });
    } catch (err) {
        console.error('Error saving user:', err.message);
        res.status(400).json({ error: err.message });
    }
});
router.post('/login', async(req,res)=>{
    const {username,password} = req.body
    if(!username || !password){
        return res.status(400).json({error: 'Username and Password are required'})
    }

    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({error:'Invalid Username or Password'});


        }
        const isPasswordValid= await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return res.status(400).json({error: 'Invalid Username or Password'})
        }
        const accessToken= await generateAccessToken({userId: user._id})
        const refreshToken = await generateRefreshToken({userId: user._id});
        res.status(201).json({user,accessToken,refreshToken})

    }
    catch(err){
        console.error('Error during login:' , err.message);
        res.status(500).json({error: 'Internat Error'})
        
    }
    
})
router.get('/me',authenticateToken,async(req,res)=>{
   
    
    try{
        const userId = req.user.userId;
       
        const user= await User.findById(userId);
        
        console.log(user);
        
        if(!user){
            return res.status(404).json({error:'User not Found'});
        }
        res.json(user)
    }catch(err){
       res.status(500).json({error:'internal server error'})
    }
})

router.post('/refreshToken',async (req,res)=>{
   
    const refreshToken= req.headers['authorization'].split(' ')[1]
    console.log("refresh token++++++++",refreshToken);
    
    if(!refreshToken){
        return res.status(401).json({message: 'No Refresh Token provided'})

    }
    try{
        const payload = await verifyToken(refreshToken)
        console.log(payload+`PAYLOAAAAAAAD`);
        
        if (!payload) {
            return res.status(403).json({ message: 'Invalid or expired refresh token' });
        }
        const newAccessToken = await generateAccessToken({ userId: payload.data.userId });
        res.json({accessToken:newAccessToken})
    }catch (err) {
        console.error('Error refreshing token:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})
router.put('/tickets/:id',async (req,res)=>{
    try {
        const ticketId = req.params.id
        const updatedData= req.body
        console.log(updatedData);
        const updatedTicket = await Ticket.findByIdAndUpdate(ticketId,updatedData,{new:true})
        if(!updatedTicket){
            return res.status(404).json({message: 'Ticket not Found'});
        }
        res.status(200).json(updatedTicket)
        
    }catch(error){
        console.error(error);
        res.status(500).json({message:'Internal Server Error'})
        
    }
})
router.delete('/tickets/:id',async (req,res)=>{
    try{
        const {id}=req.params
        await Ticket.findByIdAndDelete(id)
        res.status(200).json({message:'Ticket deleted'
        })
    }catch(err){
        console.error('Failed to delete Ticket',err)
        res.status(500).json({message:'Internal server Error'})
        
    }
})
router.get('/search/:key', async (req,res)=>{
    try{
       
        
    
    let data = await Ticket.find({
       "$or":[
        {name:{$regex:req.params.key, $options: 'i'}},
        {location:{$regex:req.params.key, $options: 'i'}}
       ]
    })
    console.log(data);
    res.send(data);
}catch(err){
    res.status(500).send({ message:'Error occured while searching'})
}

})




module.exports = router;
