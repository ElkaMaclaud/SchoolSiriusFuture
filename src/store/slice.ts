import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./Store";

type IAuthorization = {
    email: string;
    password: string;
};

export interface IInitialState {
    success: boolean;
    token: string | null;
    user: IAuthorization;
    page: "LOADING" | "COMPLICATED" | "LOGIN";
    language: "RU" | "EN"
    role: "STUDENT" | "TRAINER"
}
const state: IInitialState = {
    success: false,
    token: localStorage.getItem("access_token"),
    user: { email: "", password: "" },
    page: "COMPLICATED",
    language: "RU",
    role: "STUDENT"
};
export const REGISTR_USER = createAsyncThunk<
    { success: boolean; message: string },
    IAuthorization,
    {
        rejectValue: string;
    }
>("page/REGISTR_USER", async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await fetch(
            "http://localhost:5000/auth/registration",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );
        const data = await response.json();
        if (data.success) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        return rejectWithValue(`${error}`);
    }
});
export const AUTH_USER = createAsyncThunk<
    { success: boolean; message: string; token: string },
    IAuthorization,
    {
        rejectValue: string;
    }
>("page/AUTH_USER", async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await fetch(
            "http://localhost:5000/auth/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            }
        );
        const data = await response.json();
        if (data.token) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        return rejectWithValue(`${error}`);
    }
});
// export const FETCH_ALL_DATA = createAsyncThunk<
//     { success: boolean; message: string; data: IData[] },
//     undefined,
//     { rejectValue: string; state: RootState }
// >("page/FETCH_ALL_DATA", async (_, { rejectWithValue, getState }) => {
//     try {
//         const response = await fetch(
//             "http://localhost:5000/auth/get_data",
//             {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${getState().page.token}`,
//                 },
//             }
//         );
//         const data = await response.json();
//         if (data.success) {
//             return data;
//         } else {
//             throw new Error(data.message);
//         }
//     } catch (error) {
//         return rejectWithValue(`${error}`);
//     }
// });
export const FETCH_FILE = createAsyncThunk<
    any,
    undefined,
    { rejectValue: string; state: RootState }
>("page/FETCH_FILE", async (_, { rejectWithValue, getState }) => {
    try {
        const response = await fetch(
            "http://localhost:5000/auth/download_resume",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().page}`,
                },
            }
        );
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ResumeJohn.doc";
        a.click();
    } catch (error) {
        return rejectWithValue(`${error}`);
    }
});

const slice = createSlice({
    name: "Page",
    initialState: state,
    reducers: {
        SET_LANGUAGE: (state, action) => {
            state.language = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(AUTH_USER.fulfilled, (state, action) => {
            localStorage.setItem("access_token", action.payload.token);
            return {
                ...state,
                success: true,
                token: action.payload.token,
                message: "Success",
                showModal: true,
                page: "LOGIN",
            };
        });
        builder.addCase(AUTH_USER.rejected, (state, action) => {
            return {
                ...state,
                success: false,
                message: action.payload as string,
                showModal: true,
                page: "LOGIN",
            };
        });
        // builder.addCase(FETCH_ALL_DATA.rejected, (state, action) => {
        //     localStorage.setItem("access_token", "");
        //     return {
        //         ...state,
        //         success: false,
        //         showModal: true,
        //         message: action.payload as string,
        //         token: "",
        //         page: "LOGIN",
        //     };
        // });
    },
});

export const { SET_LANGUAGE } = slice.actions;
export default slice.reducer;
