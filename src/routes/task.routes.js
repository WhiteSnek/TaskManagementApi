const { Router } = require("express");
const {
  addTask,
  deleteTask,
  updateTask,
  getUserTasks,
} = require("../controllers/task.controller.js");
const {verifyJWT} = require('../middlewares/auth.middleware.js')

const router = Router();
router.use(verifyJWT);

router.route("/").post(addTask).get(getUserTasks);
router.route("/task/:id").patch(updateTask).delete(deleteTask);

module.exports = router
