const express = require('express')
const { CreateSingleImage, getImageShow, getUpdateRec } = require('../Controller/Homepage')
const { Logindata } = require('../Controller/loginController')
const { SingupData,findUserByEmail } = require('../Controller/singupContoller')

const { multerUpload } = require('../midlewere/multerUpload')

const router = express.Router()

router.post('/get/single/image/post', multerUpload.single("singleImage"), CreateSingleImage)
router.get('/get/image1/show', getImageShow)
router.get('/get/image2/show', getImageShow)
router.get('/get/image3/show', getImageShow)
router.get('/get/image4/show', getImageShow)
router.get('/get/image5/show', getImageShow)
router.get('/get/image6/show', getImageShow)
router.get('/get/image7/show', getImageShow)
router.get('/get/image8/show', getImageShow)
router.get('/get/image9/show', getImageShow)
router.get('/get/image10/show', getImageShow)
router.get('/get/image11/show', getImageShow)
router.get('/get/image12/show', getImageShow)
router.get('/get/image13/show', getImageShow)
router.get('/get/image14/show', getImageShow)
router.get('/get/image15/show', getImageShow)
router.get('/get/image16/show', getImageShow)
router.get('/get/image17/show', getImageShow)
router.get('/get/image18/show', getImageShow)
router.get('/get/image19/show', getImageShow)

// Our featured colection 
router.get('/get/image20/show', getImageShow)
router.get('/get/image21/show', getImageShow)
router.get('/get/image22/show', getImageShow)
router.get('/get/image23/show', getImageShow)
router.get('/get/image24/show', getImageShow)

router.get('/get/image25/show', getImageShow)
router.get('/get/image26/show', getImageShow)
router.get('/get/image27/show', getImageShow)



// Login
router.post('/login/data/post', Logindata)
// router.post('/find/email/login', registerUser)

//Singup query
router.post('/singup/data/post', SingupData)
router.post('/find/email/singup', findUserByEmail)

// router.get('/get/image4/show',getImageShow)


//image edit
// router.get('/get/record/edit/button/:userId', getEditRecord)
router.put('/image/data/updated/:userId', multerUpload.single("singleImage"), getUpdateRec)
// router.delete('/all/data/deleted/:userId', RecordDeleted) 


module.exports = router