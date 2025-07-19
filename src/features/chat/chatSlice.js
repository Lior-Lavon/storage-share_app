import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  listChatsThunk,
  markChatAsViewedThunk,
  sendChatMessageThunk,
} from "./chatThunk";

export const listChats = createAsyncThunk(
  "chat/listChats",
  async (thunkAPI) => {
    return listChatsThunk("/chats", thunkAPI);
  }
);

export const sendChatMessage = createAsyncThunk(
  "chat/sendChatMessage",
  async (body, thunkAPI) => {
    return sendChatMessageThunk("/chats", body, thunkAPI);
  }
);

export const markChatAsViewed = createAsyncThunk(
  "chat/markChatAsViewed",
  async (body, thunkAPI) => {
    return markChatAsViewedThunk("/chats/viewed", body, thunkAPI);
  }
);

const initialState = {
  isLoading: false,
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listChats.pending, (state) => {
        state.isLoading = true;
        console.log("listChats - pending");
      })
      .addCase(listChats.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        state.chats = payload.chats || [];

        console.log("listChats - fulfilled : ", payload);
      })
      .addCase(listChats.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log("listChats - rejected : ", payload);
      })

      .addCase(sendChatMessage.pending, (state) => {
        state.isLoading = true;
        console.log("sendChatMessage - pending");
      })
      .addCase(sendChatMessage.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        const chats = state.chats.map((chat) =>
          chat.chat_id === payload.chat_id
            ? {
                ...chat,
                messages: payload.messages, // example: append a new message
              }
            : chat
        );

        state.chats = chats || [];
        console.log("sendChatMessage - fulfilled : ", payload);
      })
      .addCase(sendChatMessage.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log("sendChatMessage - rejected : ", payload);
      })

      .addCase(markChatAsViewed.pending, (state) => {
        state.isLoading = true;
        console.log("markChatAsViewed - pending");
      })
      .addCase(markChatAsViewed.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log("markChatAsViewed - fulfilled : ", payload);

        const chats = state.chats.map((chat) =>
          chat.chat_id === payload.chat_id
            ? {
                ...chat,
                host_last_viewed: payload.host_last_viewed, // example: append a new message
                renter_last_viewed: payload.renter_last_viewed, // example: append a new message
              }
            : chat
        );

        state.chats = chats || [];
      })
      .addCase(markChatAsViewed.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log("markChatAsViewed - rejected : ", payload);
      });
  },
});

export const {} = chatSlice.actions;
export default chatSlice.reducer;
