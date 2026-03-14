import React, {useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { Loader } from "lucide-react";
import { useChatStore } from "@/stores/useChatStore";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
  const {initSocket,disconnectSocket} = useChatStore();

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
        if (!userId) return;
        initSocket(userId);
      } catch (error) {
        console.error("Error fetching auth token:", error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();

    return () => {
      disconnectSocket();
    };

  }, [getToken, userId,initSocket,disconnectSocket]);

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center">
        <Loader className="animate-spin text-emerald-500" size={100} />
    </div>;
  }
  return <>{children}</>;
};

export default AuthProvider;
