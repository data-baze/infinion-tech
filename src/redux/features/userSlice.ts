import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../../types/user";
import { getErrorMessage } from "../../utils/get-error-message";
import { showerror, showsuccess } from "../../utils/toast-actions";

const BASE_URL = "https://687124747ca4d06b34b97d3d.mockapi.io/api/userId";

// Get all the users from the API
export const getAllUsers = createAsyncThunk(
  "users/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get<User[]>(BASE_URL);
      return data;
    } catch (error: unknown) {
      const errorMsg = getErrorMessage(error);
      showerror(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

// get single user by ID
export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id: string, thunkAPI) => {
    try {
      const { data } = await axios.get<User>(`${BASE_URL}/${id}`);
      return data;
    } catch (error: unknown) {
      const errorMsg = getErrorMessage(error);
      showerror(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

// create a new user function
export const createUser = createAsyncThunk(
  "users/createUser",
  async (
    newUser: { name: string; location: string; dob: string },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.post<User>(BASE_URL, newUser);
      showsuccess("User created successfully");
      return data;
    } catch (error: unknown) {
      const errorMsg = getErrorMessage(error);
      showerror(errorMsg);
      return thunkAPI.rejectWithValue(errorMsg);
    }
  }
);

interface UsersState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  isSuccess: boolean;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  isSuccess: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // all users
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch users";
      })

      // get user by ID
      .addCase(getUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })

      // create user
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
      })
      .addCase(createUser.fulfilled, (state) => {
        state.loading = false;
        state.isSuccess = true;
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false;
        state.isSuccess = false;
      });
  },
});

export const { clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
