import SignIn from "@/components/auth/SignIn";
import React from "react";

const SignInPage = () => {
  return (
    <div className="bg-background w-full px-4 py-12 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-center">
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
