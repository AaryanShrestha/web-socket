const express = require("express");
const {
  getData,
  postData,
  updateData,
  deleteData,
} = require("../controller/dataController");
const router = express.Router();

router.route("/getData").get(getData);
router.route("/postData").post(postData);
router.route("/updateData").patch(updateData);
router.route("/deleteData").delete(deleteData);

module.exports = router;
