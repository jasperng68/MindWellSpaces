import React, { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { useLocation } from "wouter";

type AuthFormData = {
  username: string;
  password: string;
};

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const loginForm = useForm<AuthFormData>({
    defaultValues: {
      username: "",
      password: ""
    }
  });
  const registerForm = useForm<AuthFormData>({
    defaultValues: {
      username: "",
      password: ""
    }
  });

  // Additional console logging for debugging
  console.log("Auth page rendered, user:", user ? "logged in" : "not logged in");

  // Use useEffect for redirection to avoid race conditions
  useEffect(() => {
    if (user) {
      console.log("User is logged in, redirecting to home");
      window.location.href = "/home";
    }
  }, [user]);

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 p-8 flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Welcome to MindfulMe
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form
                  onSubmit={loginForm.handleSubmit((data) =>
                    loginMutation.mutate(data)
                  )}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="login-username">Username</Label>
                    <Input
                      id="login-username"
                      {...loginForm.register("username")}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      {...loginForm.register("password")}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form
                  onSubmit={registerForm.handleSubmit((data) =>
                    registerMutation.mutate(data)
                  )}
                  className="space-y-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="register-username">Username</Label>
                    <Input
                      id="register-username"
                      {...registerForm.register("username")}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      {...registerForm.register("password")}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? "Creating account..." : "Register"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div
        className="hidden lg:flex flex-1 bg-cover bg-center"
        style={{
          backgroundColor: "#F0F9FF",
        }}
      >
        <div className="w-full h-full bg-primary/40 backdrop-blur-sm flex items-center justify-center p-12">
          <div className="max-w-md text-white">
            <h1 className="text-4xl font-bold mb-4">Your Journey to Wellness</h1>
            <p className="text-lg">
              Track your moods, practice mindfulness, and take care of your mental
              health with our comprehensive wellness tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}