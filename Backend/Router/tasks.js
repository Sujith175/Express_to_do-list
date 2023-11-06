const express = require("express");
const {
  getAllTasks,
  createTasks,
  getTask,
  updateTask,
  DeleteTask,
} = require("../Controllers/tasks");

const router = express.Router();

router.route("/").get(getAllTasks).post(createTasks);
router.route("/:id").get(getTask).patch(updateTask).delete(DeleteTask);

module.exports = router;
