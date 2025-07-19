import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createListingThunk,
  deleteListingsImageThunk,
  getMyListingsThunk,
  updateListingsImageThunk,
  updateListingThunk,
} from "./listingThunk";

export const createListing = createAsyncThunk(
  "user/createListing",
  async (body, thunkAPI) => {
    return createListingThunk("/listings", body, thunkAPI);
  }
);

export const updateListing = createAsyncThunk(
  "user/updateListing",
  async (body, thunkAPI) => {
    return updateListingThunk("/listings", body, thunkAPI);
  }
);

export const updateListingImage = createAsyncThunk(
  "user/updateListingImage",
  async (body, thunkAPI) => {
    return updateListingsImageThunk("/listings/image", body, thunkAPI);
  }
);

export const deleteListingImage = createAsyncThunk(
  "user/deleteListingImage",
  async (body, thunkAPI) => {
    return deleteListingsImageThunk("/listings/image", body, thunkAPI);
  }
);

export const getMyListings = createAsyncThunk(
  "user/getMyListings",
  async (userId, thunkAPI) => {
    return getMyListingsThunk(
      `/listings/?user_id=${userId}&page_size=10&page_id=0`,
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
      .addCase(updateListingImage.pending, (state) => {
        state.isLoading = true;
        console.log("updateListingImage - pending");
      })
      .addCase(updateListingImage.fulfilled, (state, { payload }) => {
        console.log("updateListingImage - fulfilled : ", payload);

        return {
          ...state,
          isLoading: false,
          listing: { ...state.listing, images: payload.images },
          myListings: state.myListings?.map((item) =>
            item.id === payload?.listing_id
              ? { ...item, images: payload.images }
              : item
          ),
        };
      })
      .addCase(updateListingImage.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log("updateListingImage - rejected : ", payload);
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
          listing: { ...state.listing, images: payload.images },
          myListings: state.myListings?.map((item) =>
            item.id === payload?.listing_id
              ? { ...item, images: payload.images }
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
        // console.log("getMyListings - pending");
      })
      .addCase(getMyListings.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.myListings = payload.listings;

        // console.log("getMyListings - fulfilled : ", payload);
      })
      .addCase(getMyListings.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log("getMyListings - rejected : ", payload);
      });
  },
});

export const { setListing, clearListing } = listingSlice.actions;
export default listingSlice.reducer;
