"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { registerFormSchema } from "@/schema/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRegister } from "@/services/auth/auth.query";

type SignUpFormValues = z.infer<typeof registerFormSchema>;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: registerUser } = useRegister();

  const onSubmit = async (data: SignUpFormValues) => {
    console.log("Sign up data:", data);
    await registerUser(data);
    // TODO: replace this with the actual registration request
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Sign up with your email to start using DocQuery in a clean, minimal
          workspace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-muted-foreground"
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Jane Doe"
              autoComplete="name"
              {...register("name")}
              className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
            {errors.name ? (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Enter the name you want to show across your workspace.
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-muted-foreground"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="jane@example.com"
              autoComplete="email"
              {...register("email")}
              className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
            {errors.email ? (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Use an email you check regularly so you can recover your account
                if needed.
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-muted-foreground"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a strong password"
              autoComplete="new-password"
              {...register("password")}
              className="h-11 rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
            {errors.password ? (
              <p className="text-xs text-destructive">
                {errors.password.message}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Choose a password that helps keep your account secure.
              </p>
            )}
          </div>

          <CardFooter className="justify-end gap-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating account…" : "Create account"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
