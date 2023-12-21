import express from "express";
import { User } from "../models/user.js";
import { HouseModel } from "../models/place.js";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from "../functions/verifytoken.js";
import dotenv from 'dotenv';

dotenv.config();

/**
 * Se exporta el router para poder ser usado en app.ts
 */
export const placeRouter = express.Router();

/**
 * El body de las peticiones se parsea a JSON por defecto
 */
placeRouter.use(express.json());

/**
 * Post para crear una vivienda
 */
placeRouter.post("/places", async (req, res) => {
  try {
    const user = await User.findOne({ dni: req.body.ownerDni });
    if (!user) {
      return res.status(404).send("No se encuentra el propietario");
    }
    const house = new HouseModel(req.body);
    await house.save();
    return res.status(201).send(house);
  } catch (err) {
    console.log(err)
    return res.status(400).send(err);
  }
});

/**
 * Get para todas las viviendas o las de un usuario específico
 */
placeRouter.get("/places", async (req, res) => {
  const ownerDni = req.query.ownerDni;
  try {
    let places;
    if (ownerDni) {
      // Las viviendas de un user especifico
      places = await HouseModel.find({ ownerDni: ownerDni });
    } else {
      // Todas las viviendas
      places = await HouseModel.find();
    }
    if (places.length === 0) {
      return res.status(404).send();
    }
    return res.status(200).send(places);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Get para viviendas especificas
 */
placeRouter.get("/places/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const places = await HouseModel.findById(id);
    if (!places) {
      return res.status(404).send();
    }
    return res.send(places);
  } catch (err) {
    return res.status(500).send();
  }
});

placeRouter.patch("/places/:id", async (req, res) => {
  const id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "address",
    "bedrooms",
    "bathrooms",
    "squareFeet",
    "rentAmount",
    "isAvailable",
    "location",
    "country",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const place = await HouseModel.findByIdAndUpdate({ id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!place) {
      return res.status(404).send();
    }
    return res.status(200).send(place);
  } catch (err) {
    return res.status(400).send(err);
  }
});

/**
 * Delete para eliminar una vivienda en específico mediante parámetros
 */
placeRouter.delete("/places/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const place = await HouseModel.findById(id);
    if (!place) {
      return res.status(404).send("No se encuentra la vivienda");
    }
    await HouseModel.findByIdAndDelete(id);
    return res.status(200).send(place);
  } catch (error) {
    return res.status(400).send(error);
  }
});

