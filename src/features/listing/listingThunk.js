// features/user/authThunks.js
import customFetch from "../../utils/customFetch";

export const validateAddressWithGoogleThunk = async (url, body, thunkAPI) => {
  try {
    const resp = await customFetch.post(url, body);
    return { data: resp.data };
  } catch (error) {
    console.log("error : ", error);

    return thunkAPI.rejectWithValue(error.response?.data?.msg);
  }
};
