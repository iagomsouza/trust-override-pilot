import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

type ProtectedRouteProps = {
    children: React.ReactNode;
    redirectTo?: string;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    redirectTo = "/login",
}) => {
    const [isAuth, setIsAuth] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data, error } = await supabase.auth.getSession();

                if (error) {
                    console.error("Auth check error in ProtectedRoute:", error);
                    setIsAuth(false);
                } else {
                    setIsAuth(!!data.session);
                }
            } catch (error) {
                console.error("Unexpected auth error in ProtectedRoute:", error);
                setIsAuth(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!isAuth) {
        return <Navigate to={redirectTo} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute; 