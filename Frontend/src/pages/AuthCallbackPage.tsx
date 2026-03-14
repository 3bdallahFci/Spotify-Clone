import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import React, { use, useEffect } from "react";
import { Navigate, useNavigate } from "react-router";

const AuthCallbackPage = () => {
  const { isLoaded, user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    const syncUser = async () => {
      try {
        if (!isLoaded || !user) return;
        await axiosInstance.post("/auth/callback", {
          id: user.id,
          username: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          imageUrl: user.imageUrl,
        });
      } catch (error) {
        console.log("Error in Auth Callback", error);
      } finally {
        navigate("/");
      }
    };

    syncUser();
  }, [isLoaded, user]);
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-900">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <div className="flex flex-col items-center justify-center">
            <Loader className="size-6 animate-spin text-emerald-500" />
            <h3 className="text-white text-2xl font-semibold mt-4">
              Signing you in
            </h3>
            <p className="text-white mt-4">redirecting...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthCallbackPage;
