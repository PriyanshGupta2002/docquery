import SignUp from "@/components/auth/SignUp";

const SignUpPage = () => {
  return (
    <div className="bg-background w-full px-4 py-12 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-center">
        <SignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
