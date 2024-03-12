import {
  healthHandler,
  addUserHandler,
  deleteUserHandler,
  authenticateHandler,
  getUserByIdHandler,
  updateUserHandler,
  userExistsHandler,
} from "../handlers";

const express = require("express");
const router = express.Router();

router.get("/health", healthHandler);
router.get("/:id", getUserByIdHandler);
router.get("/exists/:email", userExistsHandler);
router.post("/authenticate", authenticateHandler);
router.post("/", addUserHandler);
router.put("/:id", updateUserHandler);
router.delete("/:id", deleteUserHandler);

export default router;
