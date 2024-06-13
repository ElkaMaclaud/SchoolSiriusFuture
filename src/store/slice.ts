import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./Store";

type IAuthorization = {
    name: string;
    email: string;
    password: string;
};
export interface ICountLessons {
    [key: string]: number;
}
export interface IData {
    lessons: ILesson[];
    timeToNextLesson: ITimeToNextLesson;
}
export interface ILesson {
    lessonName: string;
    date: string;
    teacher: string;
}
export interface ITimeToNextLesson {
    days: number;
    hours: number;
    minutes: number;
}
export interface IInitialState {
    success: boolean;
    token: string | null;
    user: IAuthorization;
    page: "LOADING" | "COMPLICATED" | "LOGIN";
    language: "RU" | "EN";
    role: "STUDENT" | "TRAINER";
    lessons: ILesson[];
}
const state: IInitialState = {
    success: false,
    token: localStorage.getItem("access_token"),
    user: { email: "", password: "", name: "" },
    page: "COMPLICATED",
    language: "RU",
    role: "STUDENT",
    lessons: []
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
            "https://scool-server.vercel.app/api/registration",
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
            "https://scool-server.vercel.app/api/login",
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
export const FETCH_LESSONS_NAME_AND_DATE = createAsyncThunk<
  { success: boolean; message: string; data: ILesson[] },
  { name: string; startDate: string; endDate: string },
  { rejectValue: string; state: RootState }
>("page/FETCH_LESSONS_NAME_AND_DATE", async (dto, { rejectWithValue, getState }) => {
  const { name, startDate, endDate } = dto;

  try {
    const response = await fetch(
      "https://scool-server.vercel.app/api/lessonsDate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().page.token}`,
        },
        body: JSON.stringify({ name, startDate, endDate }),
      }
    );

    if (!response.ok) {
      throw new Error("Ошибка при получении данных");
    }

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

export const FETCH_UPCOMING_LESSONS = createAsyncThunk<
    { success: boolean; message: string; data: IData },
    undefined,
    { rejectValue: string; state: RootState }
>("page/FETCH_UPCOMING_LESSONS", async (_, { rejectWithValue, getState }) => {
    try {
        const response = await fetch(
            "https://scool-server.vercel.app/api/upcomingLessons",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().page.token}`,
                },
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
export const FETCH_LESSONS_COUNTS = createAsyncThunk<
{ success: boolean; message: string; data: ICountLessons },
    undefined,
    { rejectValue: string; state: RootState }
>("page/FETCH_LESSONS_COUNTS", async (_, { rejectWithValue, getState }) => {
    try {
        const response = await fetch(
            "https://scool-server.vercel.app/api/lessonCounts",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getState().page.token}`,
                },
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
        
    },
});

export const { SET_LANGUAGE } = slice.actions;
export default slice.reducer;
