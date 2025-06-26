import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { validateAddressWithGoogleThunk } from "./listingThunk";

export const validateAddressWithGoogle = createAsyncThunk(
  "listing/validateAddressWithGoogle",
  async (body, thunkAPI) => {
    return validateAddressWithGoogleThunk(
      "/listings/validate_address",
      body,
      thunkAPI
    );
  }
);

const initialState = {
  isLoading: false,
  listing: null,
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    setListing: (state, { payload }) => {
      state.listing = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateAddressWithGoogle.pending, (state) => {
        state.isLoading = true;
        console.log("validateAddressWithGoogle - pending");
      })
      .addCase(validateAddressWithGoogle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log("validateAddressWithGoogle - fulfilled : ", payload);
      })
      .addCase(validateAddressWithGoogle.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log("validateAddressWithGoogle - rejected : ", payload);
      });
  },
});

export const { setListing } = listingSlice.actions;
export default listingSlice.reducer;
