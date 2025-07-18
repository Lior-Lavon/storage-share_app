// features/user/authThunks.js
import customFetch from "../../utils/customFetch";

export const createListingThunk = async (url, body, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, body);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const updateListingThunk = async (url, body, thunkAPI) => {
  try {
    const resp = await customFetch.put(url, body);
    return resp.data;
  } catch (error) {
    console.log(error);

    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const updateListingsImageThunk = async (url, body, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, body);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const deleteListingsImageThunk = async (url, body, thunkAPI) => {
  try {
    const resp = await customFetch.delete(url, {
      data: body,
    });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const getMyListingsThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};
