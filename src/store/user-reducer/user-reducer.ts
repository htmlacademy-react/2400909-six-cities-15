import { createSlice } from "@reduxjs/toolkit";
import { AuthorizationStatus } from "../../components/const/const";
import { Comment } from "../../types/comment";
import { UserData } from "../../types/user-data";
import { getComments, getUserData, requireAuthorization } from "../action";

const userInitialState: {
  comments: Comment[];
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
} = {
  comments: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
};

export const userReducer = createSlice({
  name: 'userReducer',
  initialState: userInitialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(getComments, (state, {payload}) => {
        state.comments = payload;
      })
      .addCase(getUserData, (state, {payload}) => {
        state.userData = payload;
      })
      .addCase(requireAuthorization, (state, {payload}) => {
        state.authorizationStatus = payload;
      });
  }
});
