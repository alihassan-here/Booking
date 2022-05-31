import express from 'express';
const router = express.Router();
import { createRoom, updateRoom, deleteRoom, getRoom, getRooms, updateRoomAvailability } from '../controllers/room.js';
import { verifyAdmin } from "../utils/verifyToken.js";

//CREATE
router.post('/:hotelId', verifyAdmin, createRoom);

//UPDATE
router.put('/:id', verifyAdmin, updateRoom);
router.put('/availability/:id', updateRoomAvailability);

//DELETE
router.delete('/:id/:hotelId', verifyAdmin, deleteRoom);

//GET ROOM
router.get('/:id', getRoom);

//GET ALL ROOMS
router.get('/', getRooms);


export default router;