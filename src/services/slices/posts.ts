import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../axios";
import { TUser } from "./user";

export type TPost = {
    _id: string;
    desc: string;
    title: string;
    text: string;
    imageUrl: string;
    likes: Array<string>;
    user: TUser;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

type TCreatePost = {
    title: string;
    desc: string;
    text: string;
    imageUrl?: string;
};

type TInitialState = {
    userPosts: Array<TPost>;
    peoplePosts: Array<TPost>;
    status: {
        isLoading: boolean;
        isError: boolean;
    };
};

const initialState: TInitialState = {
    userPosts: [],
    peoplePosts: [],
    status: {
        isLoading: false,
        isError: false,
    },
};

export const getFriendPosts = createAsyncThunk<Array<TPost>, undefined, { rejectValue: string }>(
    "postsReducer/getFriendPosts",
    async function (_, { rejectWithValue }) {
        try {
            const { data } = await $api.get<Array<TPost>>("/posts");
            return data;
        } catch (e) {
            return rejectWithValue("Не удалось авторизоваться");
        }
    }
);

export const create = createAsyncThunk<TPost, TCreatePost, { rejectValue: string }>(
    "postsReducer/createPosts",
    async function (form, { rejectWithValue }) {
        try {
            const { data } = await $api.post<TPost>("/posts", form);
            return data;
        } catch (e) {
            return rejectWithValue("Не удалось авторизоваться");
        }
    }
);

export const getUserPosts = createAsyncThunk<Array<TPost>, { _id: string }, { rejectValue: string }>(
    "postsReducer/getMyPosts",
    async function (form, { rejectWithValue }) {
        try {
            const { data } = await $api.post<Array<TPost>>("/user-posts", form);
            return data;
        } catch (e) {
            return rejectWithValue("Не удалось авторизоваться");
        }
    }
);

export const updatePost = createAsyncThunk<TPost, TCreatePost & { _id: string }, { rejectValue: string }>(
    "postsReducer/updatePost",
    async function (form, { rejectWithValue }) {
        try {
            const { data } = await $api.patch<TPost>("/post", form);
            return data;
        } catch (e) {
            return rejectWithValue("Не удалось авторизоваться");
        }
    }
);

const postsSlice = createSlice({
    name: "postsReducer",
    initialState,
    reducers: {
        likePost(state, action) {
            if (state.peoplePosts.filter((post) => post._id === action.payload._id).length > 0) {
                const index = state.peoplePosts.findIndex((element) => element._id === action.payload._id);
                const posts = [...state.peoplePosts];
                posts[index].likes = action.payload.likes;
                state.peoplePosts = posts;
            } else if (state.userPosts.filter((post) => post._id === action.payload._id).length > 0) {
                const index = state.userPosts.findIndex((element) => element._id === action.payload._id);
                const posts = [...state.userPosts];
                posts[index].likes = action.payload.likes;
                state.userPosts = posts;
            }
        },
        deletePost(state, action) {
            const index = state.userPosts.findIndex((element) => element._id === action.payload);
            const posts = [...state.userPosts];
            posts.splice(index);
            state.userPosts = posts;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFriendPosts.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(getFriendPosts.fulfilled, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = false;
                state.peoplePosts = action.payload;
            })
            .addCase(getFriendPosts.rejected, (state) => {
                state.status.isLoading = false;
                state.status.isError = true;
            })
            .addCase(create.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(create.fulfilled, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = false;
                state.userPosts = [...state.userPosts, action.payload];
            })
            .addCase(create.rejected, (state) => {
                state.status.isLoading = false;
                state.status.isError = true;
            })
            .addCase(getUserPosts.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = false;
                state.userPosts = action.payload;
            })
            .addCase(getUserPosts.rejected, (state) => {
                state.status.isLoading = false;
                state.status.isError = true;
            })
            .addCase(updatePost.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = false;
                const index = state.userPosts.findIndex((post) => post._id === action.payload._id);
                const posts = [...state.userPosts];
                if (posts) {
                    posts[index] = action.payload;
                }
                state.userPosts = posts;
            })
            .addCase(updatePost.rejected, (state) => {
                state.status.isLoading = false;
                state.status.isError = true;
            });
    },
});

export const { likePost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
