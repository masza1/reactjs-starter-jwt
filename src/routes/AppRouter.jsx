// AppRouter.jsx
import { useRoutes, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import routeGroups from "./routes";

function applyMiddleware(route, user) {
    if (route.middleware) {
        // console.log(`Applying middleware for route: ${route.middleware}`);
        
        for (const guard of route.middleware) {
            // console.log(`Applying guard: ${guard.name} for user:`, user);
            
            const result = guard({ user });
            if (result) return result; // could be a <Navigate />
        }
    }
    return route.element;
}

function renderRoutes(routes, user) {
    // console.log(routes);
    
    return routes.map((route) => {
        const children = route.children ? renderRoutes(route.children, user) : undefined;

        return {
            path: route.path,
            element: applyMiddleware(route, user),
            children,
        };
    });
}

export default function AppRouter() {
    const user = useSelector(state => state.auth.user);
    return useRoutes(renderRoutes(routeGroups, user));
}
