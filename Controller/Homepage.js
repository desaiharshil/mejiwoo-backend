const Homepage = require('../model/HomePage')
const errorHandler = require('../midlewere/errorhandler')

const { StatusCodes } = require('http-status-codes')
const FileStoreToFirabse = require('../midlewere/multerUpload')

exports.CreateSingleImage = async (req, res, next) => {
    try {
        console.log(req.file)

        const singleImage = req.file
        const imagePath = await FileStoreToFirabse.uploadFileToFirebase(singleImage, "web", "Images")
        
        const webpage = await Homepage.create({
            singleImage: imagePath
        })

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "business Add successfully",
            data: webpage
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR));
    }
}

exports.getImageShow = async (req, res, next) => {
    try {
        const image = await Homepage.find()
        res.status(StatusCodes.OK).json({
            success: true,
            message: "category Add successfully",
            data: image
        });
    } catch (error) {
        return next(new errorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))

    }
}

exports.getUpdateRec = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const singleImage = req.file;

        const homepage = await Homepage.findById(userId)
        console.log(homepage)

        if (!homepage) {
            return next(new errorHandler("data not found", StatusCodes.NOT_FOUND))
        }

        if (singleImage) {
            if (homepage.singleImage) {
                await FileStoreToFirabse.deleteFileFromFirebase(homepage.singleImage)
            }

            const newData = await FileStoreToFirabse.uploadFileToFirebase(singleImage, "web", "Images")

            homepage.singleImage = newData
        }

        const UpdatedData = await homepage.save()

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Record updated succssfully",
            data: UpdatedData
        })
    } catch (error) {
        console.log(error)
        return next(new errorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))

    }
}

exports.getHomepageImgs = async (req, res, next) => {
    try {
        const homepage = await Homepage.find()

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Record updated succssfully",
            data: homepage
        })
    } catch (error) {
        console.log(error)
        return next(new errorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR))

    }
}