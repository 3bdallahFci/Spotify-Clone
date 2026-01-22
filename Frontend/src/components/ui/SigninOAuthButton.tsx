import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./button";
import React from "react";

const SigninOAuthButton = () => {
  const { signIn, isLoaded } = useSignIn();

  const SigninWithGoogle = async () => {
    await signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: `/sso-callback`,
      redirectUrlComplete: "/auth-callback",
    });
  };

  if (!isLoaded) return null;
  return (
    <Button
      variant={"secondary"}
      className="w-full text-white border-zinc-200 h-11"
      onClick={SigninWithGoogle}
    >
      Continue with Google
    </Button>
  );
};

export default SigninOAuthButton;
