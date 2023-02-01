/** load model for table 'menu' */
const menuModel = require(`../models/index`).menu
/** load Operation from Sequelize */
const Op = require(`sequelize`).Op
/** load library 'path' and 'filestream' */
const path = require(`path`)
const fs = require(`fs`)

/** create function to read all data */
exports.getAllMenu = async (request, response) => {
    /** call findAll() to get all data */
    let menu = await menuModel.findAll()
    return response.json({
        success: true,
        data: menu,
        message: `All Menus have been loaded`
    })
}

/** create function for filter */
exports.findMenu = async (request, response) => {
    /** define keyword to find data */
    let keyword = request.body.keyword
    /** call findAll() within where clause and operation
    * to find data based on keyword */
    let menu = await menuModel.findAll({
        where: {
            [Op.or]: [
                { nama_menu: { [Op.substring]: keyword } },
                { jenis: { [Op.substring]: keyword } },
                { deskripsi: { [Op.substring]: keyword } },
            ]
        }
    })
    return response.json({
        success: true,
        data: menu,
        message: `All Menu have been loaded`
    })
}

/** load function from `upload-cover`
* single(`cover`) means just upload one file
* with request name `cover`
*/
const upload = require(`./upload-cover`).single(`cover`)

/** create function to add new menu */

exports.addMenu = (request, response) => {
    /** run function upload */
    upload(request, response, async error => {
        /** check if there are errorwhen upload */
        if (error) {
            return response.json({ message: error })
        }
        /** check if file is empty */
        if (!request.file) {
            return response.json({
                message: `Nothing to Upload`
            })
        }
        /** prepare data from request */
        let newMenu = {
            nama_menu: request.body.nama_menu,
            jenis: request.body.jenis,
            deskripsi: request.body.deskripsi,
            cover: request.file.filename
        }
        /** execute inserting data to menu's table */
        menuModel.create(newMenu)
            .then(result => {
                /** if insert's process success */
                return response.json({
                    success: true,
                    data: result,
                    message: `New Menu has been inserted`
                })
            })
            .catch(error => {
                /** if insert's process failed */
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}

/** create function to update menu */
exports.updateMenu = async (request, response) => {
    /** run upload function */
    upload(request, response, async error => {
        /** check if there are error when upload */
        if (error) {
            return response.json({ message: error })
        }
        /** store selected menu ID that will update */
        let id = request.params.id
        /** prepare menu's data that will update */
        let menu = {
            nama_menu: request.body.nama_menu,
            jenis: request.body.jenis,
            deskripsi: request.body.deskripsi,
        }
        /** check if file is not empty,
        * it means update data within reupload file
        */
        if (request.file) {
            /** get selected menu's data */
            const selectedMenu = await menuModel.findOne({
                where: { id: id_menu }
            })
            /** get old filename of cover file */
            const oldCoverMenu = selectedMenu.cover
            /** prepare path of old cover to delete file */
            const pathCover = path.join(__dirname, `../cover`,
                oldCoverMenu)
            /** check file existence */
            if (fs.existsSync(pathCover)) {
                /** delete old cover file */
                fs.unlink(pathCover, error =>
                    console.log(error))
            }

            /** add new cover filename to menu object */
            menu.cover = request.file.filename
        }
        /** execute update data based on defined id menu */
        menuModel.update(menu, { where: { id: id_menu } })
            .then(result => {
                /** if update's process success */
                return response.json({
                    success: true,
                    message: `Data menu has been updated`
                })
            })
            .catch(error => {
                /** if update's process fail */
                return response.json({
                })
            })
    })
}

/** create function to delete menu */
exports.deleteMenu = async (request, response) => {
    /** store selected menu's ID that will be delete */
    const id = request.params.id
    /** -- delete cover file -- */
    /** get selected menu's data */
    const menu = await menuModel.findOne({ where: { id: id } })
    /** get old filename of cover file */
    const oldCoverMenu = menu.cover
    /** prepare path of old cover to delete file */
    const pathCover = path.join(__dirname, `../cover`,
        oldCoverMenu)
    /** check file existence */
    if (fs.existsSync(pathCover)) {
        /** delete old cover file */
        fs.unlink(pathCover, error => console.log(error))
    }
    /** -- end of delete cover file -- */

    /** execute delete data based on defined id menu */
    menuModel.destroy({ where: { id: id } })
        .then(result => {
            /** if update's process success */
            return response.json({
                success: true,
                message: `Data menu has been deleted`
            })
        })
        .catch(error => {
            /** if update's process fail */
            return response.json({
                success: false,
                message: error.message
            })
        })
}



