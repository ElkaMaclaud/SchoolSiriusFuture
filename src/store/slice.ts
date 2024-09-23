import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./Store";

type IAuthorization = {
  name: string;
  email: string;
  password: string;
};
type RequestData = {
  success: boolean;
  message: string;
};
export interface ICountLessons {
  [key: string]: number;
}
export interface IData {
  lessons: ILesson[];
  timeToNextLesson: ITimeToNextLesson;
}
export interface ILesson {
  _id: string;
  lessonName: string;
  date: string;
  teacher: string;
  paid: boolean;
  wasAbsent: boolean;
  modified?: boolean;
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
  users: IAuthorization[];
  meetTheUser: boolean;
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
  meetTheUser: true,
};
async function fetchDataWithRetry<T>(
  url: string,
  options: RequestInit,
  responseType: "json" | "blob" | "text" | "document" = "json"
) {
  let retries = 0;
  while (retries < 3) {
    try {
      const response = await Promise.race([
        fetch(url, options),
        new Promise<Response>((_, reject) =>
          setTimeout(() => reject(new Error("Превышено время ожидания")), 3000)
        ),
      ]);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Что пошло не так");
      }
      if (responseType !== "json") {
        return response as T;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      retries++;
      if (retries === 3) {
        const errorMessage = (error as Error).message || "Что-то пошло не так!";
        throw new Error(`Ошибка после ${retries} попыток: ${errorMessage}`);
      }
    }
  }

  throw new Error("Не удалось получить ответ от сервера после всех попыток :(");
}
export const REGISTR_USER = createAsyncThunk<
  RequestData,
  IAuthorization,
  {
    rejectValue: string;
  }
>("page/REGISTR_USER", async ({ email, password }, { rejectWithValue }) => {
  try {
    const url = "https://scool-server.vercel.app/api/registration";
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };

    const data = await fetchDataWithRetry<RequestData>(url, option);
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
  RequestData & { token: string },
  IAuthorization,
  {
    rejectValue: string;
  }
>("page/AUTH_USER", async ({ email, password }, { rejectWithValue }) => {
  try {
    const url = "https://scool-server.vercel.app/api/login";
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    const data = await fetchDataWithRetry<RequestData & { token: string }>(
      url,
      option
    );
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
  RequestData & { data: ILesson[] },
  { name: string; startDate: string; endDate: string },
  { rejectValue: string; state: RootState }
>(
  "page/FETCH_LESSONS_NAME_AND_DATE",
  async (dto, { rejectWithValue, getState }) => {
    const { name, startDate, endDate } = dto;
    try {
      const url = "https://scool-server.vercel.app/api/lessonsByDate";
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getState().page.token}`,
        },
        body: JSON.stringify({ name, startDate, endDate }),
      };

      const data = await fetchDataWithRetry<RequestData & { data: ILesson[] }>(
        url,
        option
      );

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
  RequestData & { data: IData },
  undefined,
  { rejectValue: string; state: RootState }
>("page/FETCH_UPCOMING_LESSONS", async (_, { rejectWithValue, getState }) => {
  try {
    const url = "https://scool-server.vercel.app/api/upcomingLessons";
    const option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().page.token}`,
      },
    };

    const data = await fetchDataWithRetry<RequestData & { data: IData }>(
      url,
      option
    );
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
  RequestData & { data: ICountLessons },
  undefined,
  { rejectValue: string; state: RootState }
>("page/FETCH_LESSONS_COUNTS", async (_, { rejectWithValue, getState }) => {
  try {
    const url = "https://scool-server.vercel.app/api/lessonCounts";
    const option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().page.token}`,
      },
    };
    const data = await fetchDataWithRetry<
      RequestData & { data: ICountLessons }
    >(url, option);
    if (data.success) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    return rejectWithValue(`${error}`);
  }
});
export const UPDATE_LESSONS = createAsyncThunk<
  RequestData,
  undefined,
  { rejectValue: string; state: RootState }
>("page/UPDATE_LESSONS", async (_, { rejectWithValue, getState }) => {
  try {
    const url = "https://scool-server.vercel.app/api/updateLessons";
    const option = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().page.token}`,
      },
      body: JSON.stringify(getState().page.lessonСalendar),
    };

    const data = await fetchDataWithRetry<RequestData>(url, option);
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
  RequestData & { data: IAuthorization[] },
  undefined,
  { rejectValue: string; state: RootState }
>("page/FETCH_USERS", async (_, { rejectWithValue, getState }) => {
  try {
    const url = "https://scool-server.vercel.app/api/getUsers";
    const option = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().page.token}`,
      },
    };
    const data = await fetchDataWithRetry<
      RequestData & { data: IAuthorization[] }
    >(url, option);
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
    SET_CHANGE_LESSONS: (state, action) => {
      state.lessonСalendar = action.payload.sort(
        (a: ILesson, b: ILesson) =>
          new Date(a.date).getTime() - new Date(b.date).getTime()
      );
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
        page: "LOGIN",
      };
    });
    builder.addCase(FETCH_LESSONS_NAME_AND_DATE.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        lessonСalendar: action.payload.data.sort(
          (a: ILesson, b: ILesson) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        ),
        success: true,
        page: "COMPLICATED",
      };
    });
    builder.addCase(FETCH_LESSONS_NAME_AND_DATE.rejected, (state, action) => {
      return {
        ...state,
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

export const {
  SET_LANGUAGE,
  SET_LOADING,
  SET_CHANGE_LESSONS,
  SET_MEET_THE_USER,
  SET_PAGE,
  SET_USER_DATA,
} = slice.actions;
export default slice.reducer;
