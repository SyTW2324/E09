
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setHeaders, url } from "./api";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface MyToken extends JwtPayload {
  username: string;
  email: string;
  _id: string;

  name: string;
  surname: string;
  dni: string;
  image: string;
}

interface AuthState {
  token: string;
  username: string;
  email: string;
  password: string;
  _id: string;
  registerStatus: string;
  registerError: string;
  loginStatus: string;
  loginError: string;
  userLoaded: boolean;

  name: string;
  surname: string;
  dni: string;
  image: string;
}

const initialState: AuthState = {
  token: localStorage.getItem('token') || '',
  username: "",
  email: "",
  password: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
  
  name: "",
  surname: "",
  dni: "",
  image: localStorage.getItem('profileImage') || '', // Carga la foto de perfil
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user: any, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${url}/users`, {
        name: user.name,
        surname: user.surname,
        username: user.username,
        email: user.email,
        dni: user.dni,
        password: user.password,
      });

    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return rejectWithValue(error.message);
      } else {
        console.log(error);
        return rejectWithValue(error);
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/users/login`, {
        email: user.email,
        password: user.password,
      });
      
      const token: string = response.data.authToken;

      if (typeof token === 'string') {
        localStorage.setItem("token", token);
        const decodedUser: MyToken = jwtDecode(token);
        localStorage.setItem("user", JSON.stringify(decodedUser));
        localStorage.setItem("profileImage", decodedUser.image); // Almacena la foto de perfil
        return token;
      } else {
        throw new Error('Token is not a string');
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return rejectWithValue(error.message);
      } else {
        console.log(error);
        return rejectWithValue(error);
      }
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (id, { rejectWithValue }) => {
    try {
      const token = await axios.get(
        `${url}/user/${id}`,
        setHeaders()
      );

      localStorage.setItem("token", token.data);

      return token.data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        return rejectWithValue(error.message);
      } else {
        console.log(error);
        return rejectWithValue(error);
      }
    }
  }
);
 
 const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
    loadUser(state) {
      const token = state.token;
    
      if (token) {
        const user: any = jwtDecode<MyToken>(token);
        return {
          ...state,
          token,
          username: user.username,
          email: user.email,
          _id: user._id,
          userLoaded: true,
          name: user.name,
          surname: user.surname,
          dni: user.dni,
          // image: user.image,
        };
      } else return { ...state, userLoaded: false };
    },
     logoutUser(state) {
       localStorage.removeItem("token");
 
       return {
         ...state,
         token: "",
         username: "",
         email: "",
         _id: "",
         registerStatus: "",
         registerError: "",
         loginStatus: "",
         loginError: "",
       };
     },
   },
   extraReducers: (builder) => {
     builder.addCase(registerUser.pending, (state, action) => {
       return { ...state, registerStatus: "pending" };
     });
     builder.addCase(registerUser.fulfilled, (state, action) => {
       if (action.payload) {
         const user = jwtDecode<MyToken>(action.payload);
         return {
           ...state,
           token: action.payload,
           username: user.username,
           email: user.email,
           _id: user._id,
           registerStatus: "success",
         };
       } else return state;
     });
     builder.addCase(registerUser.rejected, (state, action) => {
       if (typeof action.payload === "string") {
         return {
           ...state,
           registerStatus: "rejected",
           registerError: action.payload,
         };
       } else return state;
     });
     builder.addCase(loginUser.pending, (state, action) => {
       return { ...state, loginStatus: "pending" };
     });
     builder.addCase(loginUser.fulfilled, (state, action) => {
       if (action.payload) {
         const user = jwtDecode<MyToken>(action.payload);
         let img_fixer;
         if (img_fixer === undefined) {
           img_fixer = "../imgs/user.png";
         }
         return {
           ...state,
           token: action.payload,
           username: user.username,
           email: user.email,
           _id: user._id,
           loginStatus: "success",
 
           name: user.name,
           surname: user.surname,
           dni: user.dni,
           image: img_fixer,
         };
       } else return state;
     });
     builder.addCase(loginUser.rejected, (state, action) => {
       if (typeof action.payload === "string") {
         return {
           ...state,
           loginStatus: "rejected",
           loginError: action.payload,
         };
       } else return state;
     });
     builder.addCase(getUser.pending, (state, action) => {
       return {
         ...state,
         getUserStatus: "pending",
       };
     });
     builder.addCase(getUser.fulfilled, (state, action) => {
       if (action.payload) {
         const user = jwtDecode<MyToken>(action.payload);
         return {
           ...state,
           token: action.payload,
           username: user.username,
           email: user.email,
           _id: user._id,
           getUserStatus: "success",
         };
       } else return state;
     });
     builder.addCase(getUser.rejected, (state, action) => {
       return {
         ...state,
         getUserStatus: "rejected",
         getUserError: action.payload,
       };
     });
   },
 });
 
 export const { loadUser, logoutUser } = authSlice.actions;
 
 export default authSlice.reducer;
 