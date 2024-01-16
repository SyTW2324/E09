import express from "express";
import { User } from "../models/user.js";
import { HouseModel } from "../models/place.js";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from "../functions/verifytoken.js";
import dotenv from 'dotenv';
import { ReserveModel } from "../models/reserve.js";

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
placeRouter.post("/places", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ dni: req.body.ownerDni });
    if (!user) {
      return res.status(404).send("No se encuentra el propietario");
    }
    if (req.body.ownerDni != req.body.loggedUser.dni) {
      return res.status(404).send("El propietario y el usuario no coinciden");
    }
    const house = new HouseModel(req.body);
    await house.save();
    console.log("Vivienda creada");
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
  const placeToAuth = await HouseModel.findById(id)
  if (placeToAuth) {
    if (placeToAuth.ownerDni != req.body.loggedUser.dni) {
      return res.status(404).send("El propietario y el usuario no coinciden");
    }
  } else {
    return res.status(404).send("No existe la vivienda a actualizar");
  }
  
  delete req.body.loggedUser
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
placeRouter.delete("/places/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    const place = await HouseModel.findById(id);
    if (place) {
      if (place.ownerDni != req.body.loggedUser.dni) {
        return res.status(404).send("El propietario y el usuario no coinciden");
      }
    }
    if (!place) {
      return res.status(404).send("No se encuentra la vivienda");
    }
    const reserves = await ReserveModel.find({ houseId: id });
      for (let r of reserves) {
        const date = new Date(r.exitDate.toString());
        if (date > new Date()) {
          return res.status(404).send("No se puede eliminar la vivienda aun, existen reservas activas");
        }
      }
    await HouseModel.findByIdAndDelete(id);
    return res.status(200).send(place);
  } catch (error) {
    return res.status(400).send(error);
  }
});

