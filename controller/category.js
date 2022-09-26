const { Category } = require("../models/category");
const Logger = require("../service/winston");

/**
 * @description Create the category
 * @param {object} req
 * @param {object} res
 * @param {string} name name of category
 * @param {string} icon icon of category
 * @param {string} color color of category
 * @return {object} return the object Status:false/true , message:error.message / category:details of category
 */
exports.AddCategory = async (req, res) => {
  try {
    let category = new Category({
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    });
    if (await category.save()) {
      Logger.info(`Created successfully...`);
      res.status(201).json({
        status: true,
        message: `Created successfully...`,
        category,
      });
    }
  } catch (error) {
    Logger.error(error.message);
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};
/**
 * @description delete Category find by id
 * @param {object} req
 * @param {object} res
 * @param {string} id category id
 * @returns deleted category details and status and message
 */
exports.deleteCategory = async (req, res) => {
  try {
    const paramId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(paramId);
    if (deletedCategory) {
      Logger.info("Category has been deleted");
      return res.status(200).json({
        status: true,
        message: "Category has been deleted",
        deletedCategory,
      });
    }
  } catch (error) {
    Logger.error(error.message);
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};
/**
 * @description find by id
 * @param {object} req
 * @param {object} res
 * @param {string} id add the id in params
 * @returns return the founded Category
 */
exports.findById = async (req, res) => {
  try {
    const paramId = req.params.id;
    const findCategoryByID = await Category.findById(paramId);
    if (findCategoryByID) {
      Logger.info(`Category has been find`);
      return res.status(200).json({
        status: true,
        message: "Category has been founded",
        Category: findCategoryByID,
      });
    }
  } catch (error) {
    Logger.error(error.message);
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};
/**
 * @description find all category from the database
 * @param {object} req
 * @param {object} res
 * @returns {object} all category return from the database
 */
exports.findAll = async (req, res) => {
  try {
    const findCategoryByID = await Category.find();
    if (findCategoryByID) {
      Logger.info(`All Category has been found`);
      return res.status(200).json({
        status: true,
        message: "All Category has been found",
        Category: findCategoryByID,
      });
    }
  } catch (error) {
    Logger.error(error.message);
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};
/**
 * @description find by id and delete
 * @param {object} req
 * @param {object} res
 * @param {object} add id by in params
 * @returns {object} return the updated users and the object
 */

exports.updateCategory = async (req, res) => {
  try {
    const paramId = req.params.id;
    const updatedCategory = await Category.findByIdAndUpdate(
      paramId,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    if (updatedCategory) {
      Logger.info(`Category has been updated`);
      return res.status(200).json({
        status: true,
        message: "Category has been updated",
        Category: updatedCategory,
      });
    }
  } catch (error) {
    Logger.error(error.message);
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};
