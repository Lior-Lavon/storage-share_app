import customFetch from "../../utils/customFetch";

export const registerUserThunk = async (url, user, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const loginUserThunk = async (url, body, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, body);
    return resp.data;
  } catch (error) {
    console.log("loginUserThunk : ", error.response?.data?.msg);

    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const logoutUserThunk = async (url, body, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, body);
    return resp.data;
  } catch (error) {
    console.log("logoutUserThunk : ", error);
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const updateUserThunk = async (url, user, thunkAPI) => {
  // console.log(user);
  try {
    const resp = await customFetch.put(url, user);
    return { user: resp.data };
  } catch (error) {
    console.log("error : ", error);

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

export const deleteAvatarThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.delete(url);
    return { user: resp.data };
  } catch (error) {
    console.log(error);

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

export const pingThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return { token: resp.data };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const validateResetPasswordThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return { data: resp.data };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const resetPasswordThunk = async (url, body, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, body);
    return { data: resp.data };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const hardDeleteUserThunk = async (url, body, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, body);
    return { data: resp.data };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const softDeleteUserThunk = async (url, body, thunkAPI) => {
  try {
    const resp = await customFetch.delete(url, {
      data: body,
    });
    return { data: resp.data };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const verifyEmailThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return { data: resp.data };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const updateSettingsThunk = async (url, body, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, body);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const getSettingsThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};
