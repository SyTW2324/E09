import express from "express";
import { User } from "../models/user.js";
import { HouseModel } from "../models/place.js";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from "../functions/verifytoken.js";
import dotenv from 'dotenv';
import { ReserveModel } from "../models/reserve.js";
import { placeRouter } from "./place.js";

dotenv.config();

/**
 * Se exporta el router para poder ser usado en app.ts
 */
export const reserveRouter = express.Router();

/**
 * El body de las peticiones se parsea a JSON por defecto
 */
reserveRouter.use(express.json());

/**
 * Post para crear una reserva
 */
reserveRouter.post("/reserves", verifyToken, async (req, res) => {
  const reserve = new ReserveModel(req.body);
  try {
    const user = await User.findOne({ dni: req.body.userDni });
    if (!user) {
      return res.status(404).send("No se encuentra el usuario que realiza la reserva");
    }
    if (reserve.userDni != req.body.loggedUser.dni) {
      return res.status(404).send("El usuario loggeado y el usuario que realiza la reserva no coinciden");
    }
    const place = await HouseModel.findById(reserve.houseId);
    if (!place) {
      return res.status(404).send("No se encuentra la vivienda sobre la que se realiza la reserva");
    }
    await reserve.save();
    console.log("Reserva creada");
    return res.status(201).send(reserve);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

/**
 * Get para todos las reservas o las reservas realizadas por un usuario específico o para una vivienda especifica
 */
reserveRouter.get("/reserves", async (req, res) => {
  const userDni = req.query.userDni;
  const placeId = req.query.placeId;
  try {
    let reserves;
    if (userDni) {
      // Find all reserves that match the userDni
      reserves = await ReserveModel.find({ userDni: userDni });
    } else if (placeId) {
      reserves = await ReserveModel.find({ houseId: placeId });
    } else {
      // Find all reserves
      reserves = await ReserveModel.find();
    }
    if (reserves.length === 0) {
      return res.status(404).send();
    }
    for (let r of reserves) {
      r.userDni = "";
    }
    return res.status(200).send(reserves);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Get de una reserva específica
 */
reserveRouter.get("/reserves/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  try {
    const reserve = await ReserveModel.findById( id );
    if (!reserve) {
      return res.status(404).send("No existe un usuario con ese DNI");
    }
    const place = await HouseModel.findById(reserve.houseId)
    if (!place) {
      return res.status(404).send("No existe la vivienda de la reserva");
    }
    if (place.ownerDni != req.body.loggedUser.dni) {
      return res.status(404).send("El usuario loggeado y el usuario propietario de la reserva no coinciden");
    }
    return res.send(reserve);
  } catch (err) {
    return res.status(500).send();
  }
});

/**
 * Patch para actualizar ua reserva en específico mediante su id y los datos en el body
 */
/*reserveRouter.patch("/reserves/:id", async (req, res) => {
  const id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "enterDate",
    "exitDate",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const reserve = await ReserveModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!reserve) {
      return res.status(404).send("No se encuentra la reserva");
    }
    return res.status(200).send(reserve);
  } catch (err) {
    return res.status(400).send(err);
  }
});*/

/**
 * Delete para eliminar una reserva en específico mediante su id
 */
reserveRouter.delete("/reserves/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const reserve = await ReserveModel.findById(id);
    if (!reserve) {
      return res.status(404).send("No se encuentra la reserva");
    }
    if (reserve.userDni != req.body.loggedUser.dni) {
      return res.status(404).send("El usuario loggeado y el usuario que elimina la reserva no coinciden");
    }
    await ReserveModel.findByIdAndDelete(id);
    return res.status(200).send(reserve);
  } catch (error) {
    return res.status(400).send(error);
  }
});

