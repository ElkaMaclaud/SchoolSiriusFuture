import React, { ReactElement, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/reduxHooks";
import MainPage from "./Pages/MainPage/MainPage";
import PrivateRoute from "./HOC/PrivateRoute";
import NotfoundPage from "./Pages/NotfoundPage/NotfoundPage";
import LoadingPage from "./Pages/LoadingPage/LoadingPage";
import Login from "./Pages/Login/Login";
import Profile from "./Pages/Profile/Profile";
import LessonСalendar from "./Pages/LessonСalendar/LessonСalendar";
import Registration from "./Pages/Registration/Registration";
import InaccessiblePage from "./Components/InaccessiblePage/InaccessiblePage";
import AuthPage from "./Pages/AuthPage/AuthPage";
import { SET_PAGE } from "./store/slice";

function App() {
    const { page, token } = useAppSelector((state) => state.page);
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(token) {
            dispatch(SET_PAGE("COMPLICATED"))
        }
        if (!token && page === "LOGIN") {
            navigate("/auth")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    interface Elements {
        [key: string]: ReactElement;
    }
    if (page === "COMPLICATED") {
        const routes: Elements = {
            lessonСalendar: <LessonСalendar />,
            profile: <Profile />
        };
        return (
            <PrivateRoute>
                <Routes>
                    <Route path={"/"} element={<MainPage />}>
                        {Object.keys(routes).map((route) => {
                            return (
                                <Route
                                    key={Math.random().toString(36)}
                                    path={route}
                                    element={routes[route]}
                                />
                            );
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
                <Route path="*" element={<InaccessiblePage />} />
            </Route>
        </Routes>
    );
}

export default App;
