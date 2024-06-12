import React, { ReactElement, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store/reduxHooks";
import MainPage from "./Pages/MainPage/MainPage";
import PrivateRoute from "./HOC/PrivateRoute";
import NotfoundPage from "./Pages/NotfoundPage/NotfoundPage";
import LoadingPage from "./Pages/LoadingPage/LoadingPage";
import InaccessiblePage from "./Components/InaccessiblePage/InaccessiblePage";
import Login from "./Pages/Login/Login";

function App() {
    const { page, token } = useAppSelector((state) => state.page);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // useEffect(() => {
    //     if (page === "LOGIN") {
    //         navigate("/auth")
    //     } else if (page === "LOADING") {
    //         // dispatch(FETCH_ALL_DATA());
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [page, dispatch]);
    interface Elements {
        [key: string]: ReactElement;
    }
    if (page === "COMPLICATED") {
        const routes: Elements = {
            listOfLesson: <MainPage />,
            
        };
        return (
            <PrivateRoute>
                <Routes>
                    <Route path={"/"} element={<MainPage />}>
                        <Route path="/" element={<NotfoundPage />} />
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
            <Route path={"/"} element={<Login />} />
            <Route path="*" element={<InaccessiblePage />} />
        </Routes>
    );
}

export default App;
