// src/store/slices/userSlice.ts
import { api } from "@/lib/api";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// =====================
// Types
// =====================
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  dob?: string | null;
  role: "admin" | "user";
  phone: string;
  country: string;
  isBlocked?: boolean;
  isDeleted?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sims?: any[];
  createdAt?: string;
  updatedAt?: string;
  profilePic?: string
  image: string;
}

interface UserState {
  user: User | null;
  isAuth: boolean | false,
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface AuthPayload {
  email: string;
  password: string;
}

// =====================
// Initial State
// =====================
const initialState: UserState = {
  user: null,
  isAuth: false,
  token: Cookies.get("token") || null,
  loading: true,
  error: null,
};

// =====================
// Async Thunks
// =====================

// Signup
export const signupUser = createAsyncThunk<
  { user: User; token: string },
  { firstName: string; lastName: string; email: string; password: string }
>("user/signup", async (payload, { rejectWithValue }) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await api({
      method: "POST",
      url: "/user/verify-otp",
      data: payload
    });

    return { user: res.data, token: res.token };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    toast.error(err.response?.data?.message || err.message);
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Login
export const loginUser = createAsyncThunk<
  { user: User; token: string },
  AuthPayload
>("user/login", async (payload, { rejectWithValue }) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await api({
      method: "POST",
      url: "/user/login",
      data: payload
    })

    // console.log("---- response in the  login ----", res);

    return { user: res?.data, token: res?.token };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    toast.error(err.response?.data?.message || err.message);
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// Fetch user details
export const fetchUserDetails = createAsyncThunk(
  "user/fetchDetails",
  async (_, { rejectWithValue }) => {

    // console.log("---- fetch user details ------");
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No token found");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/details`, // replace with your URL
        // `https://esim-backend-w7ox.onrender.com/api/user/details`, // replace with your URL
        {
          headers: {
            Authorization: `Bearer ${token}`, // or whatever header you want
          },
          timeout: 5000, // optional
        }
      );

      // console.log("----- res in the user details ----", res);

      return res?.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("--- error in the user details ----", err);
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Verify OTP
export const verifyOtp = createAsyncThunk<
  { user: User; token: string },
  { email: string; otp: string }
>("user/verifyOtp", async (payload, { rejectWithValue }) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await api({
      method: "POST",
      url: "/user/signup",
      data: payload,
    });

    return { user: res.data, token: res.data.token }; // make sure backend returns token after verification
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    toast.error(err.response?.data?.message || err.message);
    return rejectWithValue(err.response?.data?.message || err.message);
  }
});

// =====================
// Slice
// =====================
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      state.isAuth = false;
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    // Signup
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signupUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.loading = false;
      state.user = null;
      state.token = ""
      state.isAuth = false;
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    builder.addCase(signupUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuth = true;
      state.token = action.payload.token;
      Cookies.set("token", action.payload.token, { expires: 7 });
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Fetch user details
    builder.addCase(fetchUserDetails.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuth = true;
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    builder.addCase(fetchUserDetails.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Verify OTP
    builder.addCase(verifyOtp.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuth = true;
      Cookies.set("token", action.payload.token);
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    builder.addCase(verifyOtp.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
