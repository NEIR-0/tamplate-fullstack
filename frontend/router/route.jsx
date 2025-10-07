import { createBrowserRouter, Navigate } from "react-router-dom";
import WildCard from "../src/view/wildCard";
import Layout from "../src/view/layout";
import HomePages from "../src/view/homePages";
import LoginPages from "../src/view/loginPages";

const isAuthenticated = () => {
    // return sessionStorage.getItem("accessToken") && sessionStorage.getItem("refreshToken");
};
const ProtectedRoute = ({ element }) => {
    // return isAuthenticated() ? element : <Navigate to="/login" replace />;
    return element;
};

const publicRoutes = [
    { path: "login", element: <LoginPages /> },
];

const privateRoutes = [
    { path: "home", element: <HomePages /> },
];

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            ...publicRoutes,
            ...privateRoutes.map(route => ({
                path: route.path,
                element: <ProtectedRoute element={route.element} />,
            })),
            { path: "*", element: <WildCard /> },
        ],
    },
]);

export default router;
