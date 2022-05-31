import express from 'express';
const router = express.Router();
import Hotel from "../models/Hotel.js";
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, updateHotel } from '../controllers/hotel.js';
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);
//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/find/:id", getHotel);

//GET ALL
router.get("/", getHotels);

//COUNT BY CITY
router.get("/countByCity", countByCity);

//COUNT BY TYPE
router.get("/countByType", countByType);

//GET ROOMS BY HOTEL ID
router.get("/rooms/:id", getHotelRooms);

export default router;