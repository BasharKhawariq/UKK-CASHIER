/** load model for table 'menu' */
const menuModel = require(`../models/index`).menu
/** load Operation from Sequelize */
const Op = require(`sequelize`).Op
/** load library 'path' and 'filestream' */
const path = require(`path`)
const fs = require(`fs`)

/** create function to read all data */
exports.getAllMenus = async (request, response) => {
    /** call findAll() to get all data */
    let menus = await menuModel.findAll()
    return response.json({
    success: true,
    data: menus,
    message: `All menus have been loaded`
    })
    }
    
