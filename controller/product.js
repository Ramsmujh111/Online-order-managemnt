const Logger = require('../service/winston');
const {Product} = require('../models/product');
const {Category} = require('../models/category');

/**
 * @description Add Products 
 * @param {object} req 
 * @param {object} res 
 * @param {string} name name of the Product
 * @param {string} email email of the Product
 * @param {string} description description of the product
 * @param {string} imageUrl imageUrl of the Product
 * @param {string} brand brand of the Product
 * @param {string} price price of the Price
 * @param {object} Category category of the Product
 * @param {number} countStock countStock in Product
 * @returns {object} return the Product
 */
exports.AddProducts = async (req,res) =>{
    try {
        const category =await Category.findById(req.body.category);
        if(!category){
            return res.status(500).json({
                status:false,
                message:`Invalid Category`
            })
        }
        let product = new Product({
            name:req.body.name,
            email:req.body.email,
            description:req.body.description,
            imageUrl:req.body.imageUrl,
            brand:req.body.brand,
            price:req.body.price,
            category:category._id,
            countInStock:req.body.countInStock,
        })
        product = await product.save();
        if(!product){
            Logger.error(`Product is not save `)
            res.status(500).json({
                status:false,
                message:`Product is not save`
            })
        }
        Logger.info(`Product has been save`);
        res.status(200).json({
            status:true,
            product
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
 * @description product find by id
 * @param {object} req 
 * @param {object} res 
 * @param {string} paramId add the Product id as params URL
 * @returns {object} return the founded product
 */
exports.findById = async (req,res) =>{
    try {
        const paramId = req.params.id;
        const product = await Product.findById(paramId).populate('category');
        if(!product){
            Logger.error(`We did not any Product with this id`);
            return res.status(400).json({
                status:false,
                message:`we are not finding with this id`
            })
        }
        res.status(200).json({
            status:false,
            product,
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
 * @description Get the all Product from the Database
 * @param {object} req 
 * @param {object} res 
 * @returns {object} return the all data from database
 */
exports.allProduct = async (req,res)=>{
    try {
        const product = await Product.find();
        if(!product){
            Logger.error(`Product is unavailable`)
            return res.status(500).json({
                status:false,
                message:`Internal server Error`
            })
        }
        res.status(200).json({
            status:true,
            product,
        })
    } catch (error) {
        Logger.error(error.message);
        res.status(400).json({
            status:false,
            message:error.message
        })
        
    }
}