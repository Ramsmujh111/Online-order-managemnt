const {User} = require('../models/users');
const Logger = require('../service/winston');
/**
 * @description Home route for the admin routes
 * @param {object} req is the request Https routes
 * @param {object} rea is request Https routes
 * @return the data is @description 
 */
exports.HomePage = (req,res) =>{
    res.status(200).json({
        status:true,
        message:`Welcome the Home page`
    })
}
/**
 * @description get all users from server
 * @param {object} req 
 * @param {object} res 
 * @returns {object} return all users from server 
 */
exports.users = async (req,res)=>{
    try {
        const users = await User.find();
        if(!users){
            Logger.error(`user not fetch`);
            return res.status(400).json({
                status:false,
                message:`user is not fetch some server issue`
            })
        }
        Logger.info(`Fetch all users`);
        res.status(200).json({
            status:true,
            message:`All users`,
            users,
        })
    } catch (error) {
        Logger.error(error.message);
        res.status(400).json({
            status:false,
            message:error.message
        })
        
    }
}
/**
 * @description find user by id
 * @param {object} req 
 * @param {object} res 
 * @param {object} id user id in params
 * @returns {object} return the user details
 */
exports.findById = async (req,res) =>{
    try {
        const paramId = req.params.id;
        const user = await User.findById(paramId);
        if(!user){
            Logger.error(`user not found with this id: ${paramId}`);
            return res.status(404).json({
                status:false,
                message:`user not found with this id: ${paramId}`
            })
        }
        Logger.info(`User find with this id`);
        res.status(200).json({
            status:true,
            user,
        })
    } catch (error) {
        Logger.info(`Error with ${error.message}`);
        res.status(400).json({
            status:false,
            message:`Error with ${error.message}`
        })
        
    }
}
