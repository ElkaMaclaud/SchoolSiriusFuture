import React, { ReactElement, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/reduxHooks";
import MainPage from "./Pages/MainPage/MainPage";
import PrivateRoute from "./HOC/PrivateRoute";
import NotfoundPage from "./Pages/NotfoundPage/NotfoundPage";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import LessonСalendar from "./Pages/LessonCalendar/LessonCalendar";
import Registration from "./Pages/Registration/Registration";
import AuthPage from "./Pages/AuthPage/AuthPage";
import {
  FETCH_LESSONS_COUNTS,
  FETCH_UPCOMING_LESSONS,
} from "./store/slice";
import LoadingPage from "./Pages/LoadingPage/LoadingPage";

function App() {
  const { page, token } = useAppSelector((state) => state.page);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (token) {
      dispatch(FETCH_LESSONS_COUNTS());
      dispatch(FETCH_UPCOMING_LESSONS());
    } else if (page === "LOGIN") {
      navigate("/auth");
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  interface Elements {
    [key: string]: ReactElement;
  }
  if (page === "COMPLICATED") {
    const routes: Elements = {
      lessonCalendar: <LessonСalendar />,
      profile: <Profile />,
    };
    return (
      <PrivateRoute>
        <Routes>
          <Route path={"/"} element={<MainPage />}>
            {Object.keys(routes).map((route) => {
              return <Route key={route} path={route} element={routes[route]} />;
            })}
            <Route path="*" element={<NotfoundPage />} />
          </Route>
        </Routes>
      </PrivateRoute>
    );
  }
  if (page === "LOADING") {
    return <LoadingPage />;
  }
  return (
    <Routes>
      <Route path={"/"} element={<AuthPage />}>
        <Route
          key={Math.random().toString(36)}
          path={"/auth"}
          element={<Login />}
        />
        <Route
          key={Math.random().toString(36)}
          path={"/registration"}
          element={<Registration />}
        />
        <Route path="*" element={<NotfoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
