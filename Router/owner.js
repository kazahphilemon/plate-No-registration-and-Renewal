const express = require("express")
const ownerController = require("../controller/owner-Controller")
const oldCommercialCarController = require("../controller/old-commercial-car-Controller")
const newCarController = require("../controller/new-car-controller")
const oldPrivateCarController = require("../controller/old-private-car-Controller")
const newCarService = require("../services/new-car-service")
const oldCommercialCarService = require("../services/old-commercial-car-service")
const oldPrivateCarService = require("../services/old-private-car-service")
const upload = require("../middleware/uploadOwner")
const {requireAuth} = require("../middleware/authmiddleware")

const router = express.Router()



router.post("/oldcommercial", requireAuth, upload.fields([
    {name:"image_1", maxCount: 1},
    {name:"image_2", maxCount: 1},
    {name:"image_3", maxCount: 1},
    {name:"image_4", maxCount: 1},
    {name:"image_5", maxCount: 1},
]), oldCommercialCarController.uploadOldCommercial)

router.post("/newcar", requireAuth, upload.fields([
    {name:"image_1", maxCount: 1},
    {name:"image_2", maxCount: 1},
    {name:"image_3", maxCount: 1},
    {name:"image_4", maxCount: 1},
    {name:"image_5", maxCount: 1},
]), newCarController.uploadNew)

router.post("/oldprivate", requireAuth, upload.fields([
    {name:"image_1", maxCount: 1},
    {name:"image_2", maxCount: 1},
    {name:"image_3", maxCount: 1},
]), oldPrivateCarController.uploadOldPrivate)

router.post("/upload", requireAuth, upload.single("identity_card"),  ownerController.uploadOwnerProfile)
router.delete("/delete/newcar/:id", requireAuth,  newCarService.deleteNewCar)
router.delete("/delete/ownerprofile/:id", requireAuth,  ownerController.deleteOwnerProfile)
router.delete("/delete/oldprivate/:id", requireAuth,  oldPrivateCarService.deleteOldPrivateCar)
router.delete("/delete/oldcommercial/:id", requireAuth,  oldCommercialCarService.deleteOldCommercialCar)

router.put("/update/newcar/:id", requireAuth, upload.fields([
    {name:"image_1", maxCount: 1},
    {name:"image_2", maxCount: 1},
    {name:"image_3", maxCount: 1},
    {name:"image_4", maxCount: 1},
    {name:"image_5", maxCount: 1},
]), newCarController.updateNew)

router.put("/update/oldcommercial/:id", requireAuth, upload.fields([
    {name:"image_1", maxCount: 1},
    {name:"image_2", maxCount: 1},
    {name:"image_3", maxCount: 1},
    {name:"image_4", maxCount: 1},
    {name:"image_5", maxCount: 1},
]), oldCommercialCarController.updateOldCommercial)

router.put("/update/oldprivate/:id", requireAuth, upload.fields([
    {name:"image_1", maxCount: 1},
    {name:"image_2", maxCount: 1},
    {name:"image_3", maxCount: 1}
]), oldPrivateCarController.updateOldPrivate)

router.put("/update/ownerprofile/:id", requireAuth, upload.single("identity_card"),  ownerController.uploadOwnerProfile)
// router.put("/updatenewcar/:id", requireAuth,  newCarController.updateNewCar)
// router.post("/oldcomcar", requireAuth, upload.array("files"),  ownerController.uploadOwnerDetails )




module.exports = router