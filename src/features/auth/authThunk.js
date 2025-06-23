// features/user/authThunks.js
import customFetch from "../../utils/customFetch"; // Adjust path as needed

export const refreshTokenThunk = async (url, body, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, body);
    return { token: resp.data };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};
