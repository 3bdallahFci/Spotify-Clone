import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import SigninOAuthButton from "../ui/SigninOAuthButton";
import React from "react";
import { Link } from "react-router-dom";

const Topbar = () => {
  const isAdmin = false;

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 z-50 bg-zinc-900/75 backdrop-blur-md">
      <div className="gap-2 items-center flex">Spotify</div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <Link to={"/admin"}>
            <LayoutDashboardIcon className="text-emerald-500 size-4 mr-2" />
            Admin Panel
          </Link>
        )}

        <SignedIn>
          <SignOutButton />
        </SignedIn>

        <SignedOut>
            <SigninOAuthButton />
        </SignedOut>
      </div>
    </div>
  );
};

export default Topbar;
