import React, { use, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { Loader } from "lucide-react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = React.useState(true);

  const updateAuthState = async (token: string) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        if (!token) return;
        updateAuthState(token);
        console.log("User ID:", userId);
        console.log("Token:", token);
      } catch (error) {
        console.error("Error fetching auth token:", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [getToken]);

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center">
        <Loader className="animate-spin text-emerald-500" size={100} />
    </div>;
  }
  return <>{children}</>;
};

export default AuthProvider;
