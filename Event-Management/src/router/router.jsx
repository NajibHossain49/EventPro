import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import ErrorPage from "../components/ErrorPage";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import EventCreation from "../pages/EventCreation";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [

            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/registration",
                element: <Register />,
            },
            {
                path: "/Event-Creation",
                element: <EventCreation />,
            }


        ],
    },
    // Catch-all route for unmatched paths
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

export default router;
