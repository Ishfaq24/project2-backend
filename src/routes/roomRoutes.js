import express from "express";
import {
  getAllRooms,
  getRoomById,
  seedRooms,
} from "../controllers/roomController.js";

const router = express.Router();

router.get("/", getAllRooms);
router.get("/:id", getRoomById);
router.post("/seed", seedRooms);

export default router;
