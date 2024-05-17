import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./router/Home";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Notfound from "./router/Notfound";
import IntroSumok from "./router/IntroSumok";
import StampPage from "./router/StampPage";
import MyPage from "./router/MyPage";
import IndoorInfo from "./router/IndoorInfo";
import { ThemeProvider } from "./context/themeProvider";
import { GlobalStyle } from "./theme/GlobalStyle.js";
import MapPage from "./router/MapPage.jsx";
import QrPage from "./router/QrPage.jsx";
import Login from "./router/Login.jsx";
import SignUp from "./router/SignUp.jsx";
import Kakao from "./router/Kakao.jsx";
import Google from "./router/Google.jsx";
import IndoorInfo2 from "./router/IndoorInfo2.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    errorElement: <Notfound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/introsumok",
        element: <IntroSumok />,
      },
      {
        path: "/stamp",
        element: <StampPage />,
      },
      {
        path: "/mypage",
        element: <MyPage />,
      },
      {
        path: "/indoorinfo",
        element: <IndoorInfo />,
      },
      {
        path: "/indoorinfo2",
        element: <IndoorInfo2 />,
      },
      // {
      //   path: "/shelterinfo",
      //   element: <Shelter />,
      // },
      {
        path: "/map",
        element: <MapPage />,
      },
      {
        path: "/qr",
        element: <QrPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "socials/kakao",
        element: <Kakao />,
      },
      {
        path: "socials/google",
        element: <Google />,
      },
    ],
  },
]);

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <GlobalStyle />
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </ThemeProvider>
);
