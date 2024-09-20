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
  paid: boolean;
  wasAbsent: boolean;
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
  lessonСalendar: ILesson[];
  listLessons: ICountLessons;
  loading: boolean;
  timeToNextLesson: ITimeToNextLesson;
  users: IAuthorization[],
  meetTheUser: boolean,
}
const state: IInitialState = {
  success: false,
  token: localStorage.getItem("access_token"),
  user: { email: "", password: "", name: "" },
  page: "LOADING",
  language: "RU",
  role: "STUDENT",
  lessons: [],
  lessonСalendar: [],
  listLessons: {},
  loading: false,
  timeToNextLesson: { days: 0, hours: 0, minutes: 0 },
  users: [],
  meetTheUser: true
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
    const response = await fetch("https://scool-server.vercel.app/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
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
>(
  "page/FETCH_LESSONS_NAME_AND_DATE",
  async (dto, { rejectWithValue, getState }) => {
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
  }
);

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
export const FETCH_USERS = createAsyncThunk<
  { success: boolean; message: string; data: IAuthorization[] },
  undefined,
  { rejectValue: string; state: RootState }
>("page/FETCH_USERS", async (_, { rejectWithValue, getState }) => {
  try {
    const response = await fetch(
      "https://scool-server.vercel.app/api/getUsers",
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
    SET_PAGE: (state, action) => {
      state.page = action.payload;
    },
    SET_LOADING: (state, action) => {
      state.loading = action.payload;
    },
    SET_MEET_THE_USER: (state, action) => {
      state.meetTheUser = action.payload;
    },
    SET_LANGUAGE: (state, action) => {
      state.language = action.payload;
    },
    SET_USER_DATA: (state, action) => {
      state.user = {
        email: action.payload.email,
        password: action.payload.password,
        name: action.payload.email.split("@")[0],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REGISTR_USER.fulfilled, (state, action) => {
      return {
        ...state,
        success: true,
        message: action.payload.message,
      };
    });
    builder.addCase(REGISTR_USER.rejected, (state, action) => {
      return {
        ...state,
        success: false,
        message: action.payload as string,
      };
    });
    builder.addCase(AUTH_USER.fulfilled, (state, action) => {
      localStorage.setItem("access_token", action.payload.token);
      return {
        ...state,
        success: true,
        token: action.payload.token,
        message: "Success",
        page: "LOADING",
      };
    });
    builder.addCase(AUTH_USER.rejected, (state, action) => {
      return {
        ...state,
        success: false,
        message: action.payload as string,
        page: "LOGIN",
      };
    });
    builder.addCase(FETCH_UPCOMING_LESSONS.fulfilled, (state, action) => {
      return {
        ...state,
        lessons: action.payload.data.lessons,
        timeToNextLesson: action.payload.data.timeToNextLesson,
        success: true,
      };
    });
    builder.addCase(FETCH_UPCOMING_LESSONS.rejected, (state, action) => {
      return {
        ...state,
        page: "LOGIN",
      };
    });
    builder.addCase(FETCH_LESSONS_COUNTS.fulfilled, (state, action) => {
      return {
        ...state,
        success: true,
        listLessons: action.payload.data,
        page: "COMPLICATED",
      };
    });
    builder.addCase(FETCH_LESSONS_COUNTS.rejected, (state, action) => {
      return {
        ...state,
        token: "",
        page: "LOGIN",
      };
    });
    builder.addCase(FETCH_LESSONS_NAME_AND_DATE.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        lessonСalendar: action.payload.data,
        success: true,
        page:"COMPLICATED"
      };
    });
    builder.addCase(FETCH_LESSONS_NAME_AND_DATE.rejected, (state, action) => {
      return {
        ...state,
        token: "",
        page: "LOGIN",
      };
    });
    builder.addCase(FETCH_USERS.fulfilled, (state, action) => {
      return {
        ...state,
        users: action.payload.data,
        success: true,
      };
    });
    builder.addCase(FETCH_USERS.rejected, (state, action) => {
      return {
        ...state,
      };
    });
  },
});

export const { SET_LANGUAGE, SET_LOADING,  SET_MEET_THE_USER, SET_PAGE, SET_USER_DATA } =
  slice.actions;
export default slice.reducer;
