import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $api from "../axios";

export type TUser = {
    _id: string;
    name: string;
    secondName: string;
    email: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    friends: Array<TUser>;
    outgoing: Array<TUser>;
    requests: Array<TUser>;
    university: string;
    age: number;
};

type TInitialState = {
    user: TUser | null;
    people: Array<TUser>;
    status: {
        isLoading: boolean;
        isError: boolean;
    };
};

const initialState: TInitialState = {
    user: null,
    people: [],
    status: {
        isLoading: false,
        isError: false,
    },
};

export type TUpdateUser = {
    avatarUrl: string;
    name: string;
    secondName: string;
    university: string;
    age: number;
};

export type TRegister = {
    name: string;
    secondName: string;
    email: string;
    password: string | number;
};

export type TLogin = {
    email: string;
    password: string | number;
};

export const register = createAsyncThunk<TUser, TRegister, { rejectValue: string }>(
    "userReducer/register",
    async function (form, { rejectWithValue }) {
        try {
            const { data } = await $api.post<TUser & { token: string }>("/register", form);
            const { token, ...user } = data;
            localStorage.setItem("accessToken", token);
            return user;
        } catch (e) {
            return rejectWithValue("Пользователь уже зарегестрирован");
        }
    }
);

export const login = createAsyncThunk<TUser, TLogin, { rejectValue: string }>(
    "userReducer/login",
    async function (form, { rejectWithValue }) {
        try {
            const { data } = await $api.post<TUser & { token: string }>("/login", form);
            const { token, ...user } = data;
            localStorage.setItem("accessToken", token);
            return user;
        } catch (e) {
            return rejectWithValue("Не удалось авторизоваться");
        }
    }
);

export const getMe = createAsyncThunk<TUser, undefined, { rejectValue: string }>(
    "userReducer/getMe",
    async function (_, { rejectWithValue }) {
        try {
            const { data } = await $api.get<TUser & { token: string }>("/get-me");
            return data;
        } catch (e) {
            return rejectWithValue("Не удалось авторизоваться");
        }
    }
);

export const update = createAsyncThunk<TUser, TUpdateUser, { rejectValue: string }>(
    "userReducer/update",
    async function (form, { rejectWithValue }) {
        try {
            const { data } = await $api.patch<TUser & { token: string }>("/update", form);
            return data;
        } catch (e) {
            return rejectWithValue("Не удалось обновить пользователя");
        }
    }
);

export const getPeople = createAsyncThunk<Array<TUser>, undefined, { rejectValue: string }>(
    "userReducer/getPeople",
    async function (_, { rejectWithValue }) {
        try {
            const { data } = await $api.get<Array<TUser>>("/users");
            return data;
        } catch (e) {
            return rejectWithValue("Не удалось получить пользователей");
        }
    }
);

export const addFriend = createAsyncThunk<TUser, { _id: string }, { rejectValue: string }>(
    "userReducer/addFriend",
    async function (_id, { rejectWithValue }) {
        try {
            const { data } = await $api.post<TUser>("/add-friend", _id);
            return data;
        } catch (e) {
            return rejectWithValue("Не удалось добавить в друзья");
        }
    }
);

export const deleteFriend = createAsyncThunk<TUser, { _id: string }, { rejectValue: string }>(
    "userReducer/deleteFriend",
    async function (_id, { rejectWithValue }) {
        try {
            const { data } = await $api.post<TUser>("/delete-friend", _id);
            return data;
        } catch (e) {
            return rejectWithValue("Не удалось удалить из друзей");
        }
    }
);

const userSlice = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        clearUser(state) {
            state.user = null;
            state.status = {
                isLoading: false,
                isError: false,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = false;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state) => {
                state.status.isLoading = false;
                state.status.isError = true;
            })
            .addCase(login.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state) => {
                state.status.isLoading = false;
                state.status.isError = true;
            })
            .addCase(getMe.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(getMe.fulfilled, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = false;
                state.user = action.payload;
            })
            .addCase(getMe.rejected, (state) => {
                state.status.isLoading = false;
                state.status.isError = true;
            })
            .addCase(update.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(update.fulfilled, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = false;
                state.user = action.payload;
            })
            .addCase(update.rejected, (state) => {
                state.status.isLoading = false;
                state.status.isError = true;
            })
            .addCase(getPeople.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(getPeople.fulfilled, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = false;
                state.people = action.payload;
            })
            .addCase(getPeople.rejected, (state) => {
                state.status.isLoading = false;
                state.status.isError = true;
            })
            .addCase(addFriend.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(addFriend.fulfilled, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = false;
                state.user = action.payload;
            })
            .addCase(addFriend.rejected, (state) => {
                state.status.isLoading = false;
                state.status.isError = true;
            })
            .addCase(deleteFriend.pending, (state) => {
                state.status.isLoading = true;
            })
            .addCase(deleteFriend.fulfilled, (state, action) => {
                state.status.isLoading = false;
                state.status.isError = false;
                state.user = action.payload;
            })
            .addCase(deleteFriend.rejected, (state) => {
                state.status.isLoading = false;
                state.status.isError = true;
            });
    },
});

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
