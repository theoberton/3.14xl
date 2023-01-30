import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import Landing from './../features/Landing'

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Landing />,
        children: [
            {path: 'not-found', element: <div/>},
            {path: '*', element: <Navigate replace to='/not-found' />},
        ]
    }
]

export const router = createBrowserRouter(routes);