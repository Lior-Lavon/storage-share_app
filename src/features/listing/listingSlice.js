import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createListingThunk, getMyListingsThunk } from "./listingThunk";

export const createListing = createAsyncThunk(
  "user/createListing",
  async (body, thunkAPI) => {
    return createListingThunk("/listings", body, thunkAPI);
  }
);

export const getMyListings = createAsyncThunk(
  "user/getMyListings",
  async (body, thunkAPI) => {
    return getMyListingsThunk(
      "/listings/?page_size=10&page_id=0",
      body,
      thunkAPI
    );
  }
);

const initialState = {
  isLoading: false,
  listing: null,
  myListings: null,
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
      .addCase(createListing.pending, (state) => {
        state.isLoading = true;
        console.log("validatecreateListingAddressWithGoogle - pending");
      })
      .addCase(createListing.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log("createListing - fulfilled : ", payload);
      })
      .addCase(createListing.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log("createListing - rejected : ", payload);
      })

      .addCase(getMyListings.pending, (state) => {
        state.isLoading = true;
        console.log("getMyListings - pending");
      })
      .addCase(getMyListings.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.myListings = payload.listings;
        console.log("getMyListings - fulfilled : ", payload);
      })
      .addCase(getMyListings.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log("getMyListings - rejected : ", payload);
      });
  },
});

export const { setListing } = listingSlice.actions;
export default listingSlice.reducer;
