// features/user/authThunks.js
import customFetch from "../../utils/customFetch";

export const listChatsThunk = async (url, thunkAPI) => {
  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const sendChatMessageThunk = async (url, body, thunkAPI) => {
  try {
    const resp = await customFetch.put(url, body);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};

export const markChatAsViewedThunk = async (url, body, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, body);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};
