import express from "express";
import { User } from "../models/user.js";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { verifyToken } from "../functions/verifytoken.js";

const AUTH_TOKEN_KEY = '398GGD54DFDG6235EA0RFFGSGG732';


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
  console.log(req.body)
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
userRouter.get("/users", verifyToken, async (req, res) => {
  const name = req.query.name;
  try {
    let users;
    if (name) {
      // Find all users that match the name
      users = await User.find({ name });
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
    const authToken = jwt.sign(user[0].toJSON() , AUTH_TOKEN_KEY, jwtOptions);
    
    return res.status(200).send({...user, authToken});
  } catch (err) {
    console.log(err)
    return res.status(500).send(err);
  }
});

/**
 * Delete para eliminar un usuario en específico mediante query
 */
userRouter.delete("/users", async (req, res) => {
  const name = req.query.name;
  try {
    const user = await User.findOne({ name });
    //const user = await User.findOneAndDelete({ name });
    if (!user) {
      return res.status(404).send();
    }
    await User.findOneAndDelete({ name });
    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});


// /**
//  * Get para un usuario en específico mediante ID
//  */
// userRouter.get("/users/:id", async (req, res) => {
//   const userID = req.params.id;
//   try {
//     const user = await User.findById(userID)
//       .populate({ path: "friends", select: "name" })
//       .populate({ path: "groups", select: "name" })
//       .populate({ path: "activeChallenges", select: "name" })
//       .populate({ path: "favouriteTracks", select: "name" })
//       .populate({ path: "tracksHistory.track", select: "name" });
//     if (!user) {
//       return res.status(404).send();
//     }
//     return res.send(user);
//   } catch (err) {
//     return res.status(500).send();
//   }
// });



// /**
//  * Patch para actualizar un usuario en específico mediante ID y los datos en el body
//  */
// userRouter.patch("/users/:id", async (req, res) => {
//   //actualizar un usaurio por su id
//   const userID = req.params.id;
//   const updates = Object.keys(req.body);
//   const allowedUpdates = [
//     "name",
//     "activity",
//     "friends",
//     "groups",
//     "favouriteTracks",
//     "activeChallenges",
//     "tracksHistory",
//     "trainingStatistics",
//   ];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update)
//   );
//   if (!isValidOperation) {
//     return res.status(400).send({ error: "Invalid updates!" });
//   }
//   try {
//     const user = await User.findByIdAndUpdate(userID, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!user) {
//       return res.status(404).send();
//     }
//     // recorrer updates y actualizar las demas cosas en cada caso
//     for (const update of updates) {
//       switch (update) {
//         case "groups":
//           // borrar de los grupos en los que es participante
//           await Group.updateMany(
//             { members: user._id },
//             { $pull: { members: user._id } }
//           );
//           for (const groupID of req.body.groups) {
//             await Group.findByIdAndUpdate(
//               groupID,
//               { $push: { members: user._id } },
//               { new: true, runValidators: true }
//             );
//           }
//           break;
//         case "activeChallenges":
//           // borrar de los challenge en los que es participante
//           await Challenge.updateMany(
//             { users: user._id },
//             { $pull: { users: user._id } }
//           );
//           for (const challengeID of req.body.activeChallenges) {
//             await Challenge.findByIdAndUpdate(
//               challengeID,
//               { $push: { users: user._id } },
//               { new: true, runValidators: true }
//             );
//           }
//           break;
//         case "tracksHistory":
//           // borrar de los tracks en los que es participante
//           await Track.updateMany(
//             { users: user._id },
//             { $pull: { users: user._id } }
//           );
//           for (const track of req.body.tracksHistory) {
//             const trackID = track.track;
//             await Track.findByIdAndUpdate(
//               trackID,
//               { $push: { users: user._id } },
//               { new: true, runValidators: true }
//             );
//           }
//           break;
//         default:
//           break;
//       }
//     }
//     return res.status(200).send(user);
//   } catch (err) {
//     return res.status(400).send(err);
//   }
// });

// /**
//  * Delete para eliminar un usuario en específico mediante query
//  */
// userRouter.delete("/users", async (req, res) => {
//   const name = req.query.name;
//   try {
//     const user = await User.findOne({ name });
//     //const user = await User.findOneAndDelete({ name });
//     if (!user) {
//       return res.status(404).send();
//     }
//     await User.findOneAndDelete({ name });
//     return res.status(200).send(user);
//   } catch (error) {
//     return res.status(400).send(error);
//   }
// });
