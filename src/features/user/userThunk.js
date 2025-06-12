import customFetch from "../../utils/customFetch";

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const loginUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  // console.log(user);
  try {
    const resp = await customFetch.put(url, user);
    return { user: resp.data };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const uploadAvatarThunk = async (url, avatar, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, avatar);
    return { user: resp.data };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const refreshTokenThunk = async (url, avatar, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, avatar);
    return { token: resp.data };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};
