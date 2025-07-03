import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createListingThunk,
  deleteListingsImageThunk,
  getMyListingsThunk,
  updateListingThunk,
} from "./listingThunk";

export const createListing = createAsyncThunk(
  "user/createListing",
  async (body, thunkAPI) => {
    console.log("createListing : ", body);

    return createListingThunk("/listings", body, thunkAPI);
  }
);

export const updateListing = createAsyncThunk(
  "user/updateListing",
  async (body, thunkAPI) => {
    return updateListingThunk("/listings", body, thunkAPI);
  }
);

export const deleteListingImage = createAsyncThunk(
  "user/deleteListingImage",
  async (body, thunkAPI) => {
    return deleteListingsImageThunk("/listings/delete_image", body, thunkAPI);
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
  myListings: [],
};

const listingSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    setListing: (state, { payload }) => {
      state.listing = payload;
    },
    clearListing: (state) => {
      state.listing = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createListing.pending, (state) => {
        state.isLoading = true;
        console.log("createListing - pending");
      })
      .addCase(createListing.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log("createListing - fulfilled : ", payload);
      })
      .addCase(createListing.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log("createListing - rejected : ", payload);
      })
      // ------------------------------------------------------------------
      .addCase(updateListing.pending, (state) => {
        state.isLoading = true;
        console.log("updateListing - pending");
      })
      .addCase(updateListing.fulfilled, (state, { payload }) => {
        console.log("updateListing - fulfilled : ", payload);

        return {
          ...state,
          isLoading: false,
          myListings: state.myListings?.map((item) =>
            item.id === payload.id ? { ...item, ...payload } : item
          ),
        };
      })
      .addCase(updateListing.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log("updateListing - rejected : ", payload);
      })

      // ------------------------------------------------------------------
      .addCase(deleteListingImage.pending, (state) => {
        state.isLoading = true;
        console.log("deleteListingImage - pending");
      })
      .addCase(deleteListingImage.fulfilled, (state, { payload }) => {
        console.log("deleteListingImage - fulfilled : ", payload);

        return {
          ...state,
          isLoading: false,
          myListings: state.myListings.map((item) =>
            item.objId === payload.listing_id
              ? { ...item, images: payload }
              : item
          ),
        };
      })
      .addCase(deleteListingImage.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log("deleteListingImage - rejected : ", payload);
      })

      // ------------------------------------------------------------------
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

export const { setListing, clearListing } = listingSlice.actions;
export default listingSlice.reducer;
