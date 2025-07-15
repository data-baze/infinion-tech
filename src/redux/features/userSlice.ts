import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { User } from "../../types/user";

const BASE_URL = "https://687124747ca4d06b34b97d3d.mockapi.io/api/userId";

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  const response = await axios.get<User[]>(BASE_URL);
  return response.data;
});

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (id: string) => {
    const response = await axios.get<User>(`${BASE_URL}/${id}`);
    return response.data;
  }
);

interface UsersState {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
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
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch users.";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      });
  },
});

export const { clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
