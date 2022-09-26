const Logger = require('../service/winston');
/**
 * @description Error Routes => routes not found
 * @param {object} req 
 * @param {object} res 
 * @return {object} @status false @message routes not found
 */
exports.error = (req,res)=>{
    Logger.error(`Routes not founds`);
    res.status(404).json({
        status:false,
        message:`Routes not founds`
    })
}