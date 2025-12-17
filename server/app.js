const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const UserModel = require('./user');

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("Error connecting to MongoDB", err);
});

app.post("/createUser", async(req,res) => {
    try{
        await UserModel.create(req.body);
        res.status(201).json({message: "User created successfully"});
    }
    catch(err){
        res.status(500).json({message: "Error creating user", error: err.message});
    }
})

app.get("/", async(req, res) => {
    try {
        const users = await UserModel.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "Error fetching users", error: error.message});
    }
})

app.get("/getUser/:id", async(req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({message: "Error fetching user", error: error.message});
    }       
})

app.put("/updateUser/:id", async(req, res) => {
    try {
        await UserModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json({message: "User updated successfully"});
    }   
    catch (error) {
        res.status(500).json({message: "Error updating user", error: error.message});
    }
})

app.delete("/deleteUser/:id", async(req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "User deleted successfully"});
    }
    catch (error) {
        res.status(500).json({message: "Error deleting user", error: error.message});
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);  
})