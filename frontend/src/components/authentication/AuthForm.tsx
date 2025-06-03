"use client";
import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { Button } from "../ui/button";
import SignUpForm from "./SignUpForm";
import ResetPassword from "./ResetPassword";
import { Link } from "lucide-react";

const AuthForm = () => {
  const [mode, setMode] = useState("login");
  return (
    <div className="space-y-6 w-full">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {mode === "reset"
            ? "Reset Password"
            : mode === "login"
            ? "Login"
            : "Sign Up"}
        </h1>
        <h1 className="text-sm text-muted-foreground">
          {mode === "reset"
            ? "Enter your mail below to reset your password"
            : mode === "login"
            ? "Enter your mail below to login into your account"
            : "Sign Up"}
        </h1>
      </div>
      {mode === "login" && (
        <>
          {" "}
          <LoginForm />
          <div className="text-center flex justify-between">
            <Button
              variant={"link"}
              className="p-0"
              onClick={() => setMode("signup")}
            >
              Need an account? Sign Up
            </Button>
            <Button
              variant={"link"}
              className="p-0"
              onClick={() => setMode("reset")}
            >
              Forgot Password?
            </Button>
          </div>
        </>
      )}
      {mode === "signup" && (
        <>
          {" "}
          <SignUpForm />
          <div className="text-center items-center flex justify-center">
            <Button
              variant={"link"}
              className="p-0"
              onClick={() => setMode("login")}
            >
              Already have account? Sign in
            </Button>
            {/* <Button variant={"link"} className="p-0" onClick={()=>setMode("reset")}>Forgot Password?</Button> */}
          </div>
        </>
      )}
      {mode === "reset" && (
        <div className="flex justify-center items-center flex-col gap-5">
          <ResetPassword />
           <Button
              variant={"link"}
              className="p-0"
              onClick={() => setMode("login")}
            >
              Back to Login
            </Button>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
