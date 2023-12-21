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
export const userRouter = express.Router();

/**
 * El body de las peticiones se parsea a JSON por defecto
 */
userRouter.use(express.json());

/**
 * Post para crear un usuario
 */
userRouter.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(201).send(user);
  } catch (err) {
    console.log(err)
    return res.status(400).send(err);
  }
});

/**
 * Get para todos los usuarios o para un usuario en específico mediante nombre usando query
 */
userRouter.get("/users", async (req, res) => {
  const username = req.query.username;
  try {
    let users;
    if (username) {
      // Find all users that match the username
      users = await User.find({ username: username });
    } else {
      // Find all users
      users = await User.find();
    }
    if (users.length === 0) {
      return res.status(404).send();
    }
    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(err);
  }
});

/**
 * Get para un usuario en específico mediante DNI
 */
userRouter.get("/users/:dni", async (req, res) => {
  const dni = req.params.dni;
  try {
    const user = await User.findOne({ dni: dni });
    if (!user) {
      return res.status(404).send();
    }
    return res.send(user);
  } catch (err) {
    return res.status(500).send();
  }
});

/**
 * Post para validar un usuario 
 */
userRouter.post("/users/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    let user;
    if (!email) {
      return res.status(404).send("No hay email");
    }
    user = await User.find({ email: email, password: password });
    if(user.length === 0) {
      return res.status(404).send("El email o la contraseña son incorrectos");
    }
    const jwtOptions = { expiresIn: '2h'};
    const authToken = jwt.sign(user[0].toJSON() , process.env.AUTH_TOKEN_KEY!, jwtOptions);
    
    return res.status(200).send({user: {
      username: user[0].username,
      name:user[0].name,
      surname:user[0].surname,
      email:user[0].email,
      dni:user[0].dni,
      image:user[0].image,
    }, authToken});
  } catch (err) {
    console.log(err)
    return res.status(500).send(err);
  }
});

/**
 * Patch para actualizar un usuario en específico mediante DNI y los datos en el body
 */
userRouter.patch("/users/:dni", async (req, res) => {
  const dni = req.params.dni;
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "password",
    "username",
    "email", 
    "image",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }
  try {
    const user = await User.findOneAndUpdate({ dni: dni }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    return res.status(200).send(user);
  } catch (err) {
    return res.status(400).send(err);
  }
});

/**
 * Delete para eliminar un usuario en específico mediante dni
 */
userRouter.delete("/users/:dni", async (req, res) => {
  const dni = req.params.dni;
  try {
    const user = await User.findOne({ dni: dni });
    //const user = await User.findOneAndDelete({ name });
    if (!user) {
      return res.status(404).send("No se encuentra el usuario");
    }
    await HouseModel.findOneAndDelete({ ownerDni: dni });
    await User.findOneAndDelete({ dni: dni });
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

