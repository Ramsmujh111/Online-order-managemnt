const { User } = require('../models/users');
const Logger = require('../service/winston');
const ValidateSchema = require('../middleware/validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/**
 * @description register user
 * @param {object} req 
 * @param {object} res 
 * @param {string} username enter username 
 * @param {string} email users email
 * @param {string} password users password
 * @param {Number} phone users phone
 * @param {string} address users address
 * @param {string} country users country
 * @returns {object} return the users details 
 */
exports.registration = async (req,res)=>{
    try {
        const validate = await ValidateSchema.validateAsync(req.body);
        if(!validate){
            Logger.error(`validation error`)
            return  res.status(400).json({
                status:false,
                message:`validation error`
            })
        }
        // if user already exist 
        const exist = await User.findOne({email:validate.email});
        if(exist){
            Logger.info(`User already exist`)
            return res.status(402).json({
                status:false,
                message:`User already exist`
            })
        }
        // hashing the password
        const salt  =bcrypt.genSaltSync(10);
        const hashPass =bcrypt.hashSync(validate.password, salt);
        if(!hashPass){
            Logger.error(`password is not hashing`);
            res.status(400).json({
                status:false,
                message:`something wrong with hashing the password`
            })
        }
        let CreateUser = new User({
            username:validate.username,
            email:validate.email,
            password:hashPass,
            phone:validate.phone,
            Address:validate.Address,
            country:validate.country,
        })
        if(await CreateUser.save()){
            Logger.info(`Thank you for the Registration`);
            res.status(201).json({
                status:true,
                message:`Thank you for the Registration`,
                userDetails: CreateUser
            })
        }

    } catch (error) {
        Logger.error(error.message);
        res.status(400).json({
            status:false,
            message:error.message
        })
        
    }

}
/**
 * @description user login 
 * @param {object} req 
 * @param {object} res 
 * @param {string} email user email for the validate the user
 * @param {string} password user password for the verified the user
 * @returns user details and token
 */
exports.login =async (req,res)=>{
    try {
        const users = await User.findOne({email:req.body.email});
        // if not user so return 404 user is not found
        if(!users){
            Logger.error('User is not found');
            return res.status(404).json({
                status:false,
                message:'User is not found'
            })
        }
        // compare the password
        const passwordCompare = await bcrypt.compareSync(req.body.password,users.password);
        if(!passwordCompare){
            Logger.error('unauthorized');
            return res.status(400).json({
                status:false,
                message:"unauthorized"
            })
        }
        // Generate the token
        const token = jwt.sign(
            {
                user:users._id
            },
            process.env.JWT_TOKEN,
            {
                expiresIn : '1d'
            }
        )
        res.status(200).json({
            status:true,
            message:'User details',
            users,
            token,
        })
        
    } catch (error) {
        Logger.error(error.message);
        res.status(400).json({
            status:false,
            message:error.message
        })
        
    }

}

