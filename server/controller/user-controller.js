

// export const userLogIn = async (request, response) => {
//     try {
//         let user = await User.findOne({ username: request.body.username, password: request.body.password });
//         if(user) {
//             return response.status(200).json(`${request.body.username} login successfull`);
//         } else {
//             return response.status(401).json('Invalid Login');
//         }

//     } catch (error) {
//         response.json('Error: ', error.message);
//     }
// }

// export const userSignUp = async (request, response) => {
//     try {
//         const exist = await User.findOne({ username: request.body.username });
//         if(exist) {
//             return response.status(401).json({ message: 'User already exist'});
//         }
//         const user = request.body;
//         const newUser = new User(user);
//         await newUser.save();
//         response.status(200).json({ mesage: user });

//     } catch (error) {
//         response.status(500).json({ message: error.message });
//     }
// }



import User from '../model/userSchema.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';

// User Login
export const userLogIn = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  // Find user by username
  const user = await User.findOne({ username });

  // Check if user exists and password matches
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// User Signup
export const userSignUp = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, phone, password } = req.body;

  // Check if user already exists
  const exist = await User.findOne({ username });
  if (exist) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create new user
  const newUser = new User({
    username,
    email,
    phone,
    password,
  });

  // Save new user to the database
  const savedUser = await newUser.save();

  if (savedUser) {
    res.status(201).json({
      _id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      phone: savedUser.phone,
      isAdmin: savedUser.isAdmin,
      token: generateToken(savedUser._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
});

// export { userLogIn, userSignUp };




export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});




// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     if (req.body.password) {
//       user.password = req.body.password;
//     }

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: generateToken(updatedUser._id),
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });




export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});




// const deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (user) {
//     await user.remove();
//     res.json({ message: "User removed" });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });




export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});




// const updateUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id);

//   if (user) {
//     user.name = req.body.name || user.name;
//     user.email = req.body.email || user.email;
//     user.isAdmin = req.body.isAdmin;

//     const updatedUser = await user.save();

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// });

// export {
//   userLogIn,
//   userSignUp,
//   // getUserProfile,
//   // updateUserProfile,
//   getUsers
//   // deleteUser,
//   // getUserById,
//   // updateUser,
// };
