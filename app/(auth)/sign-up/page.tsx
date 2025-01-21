"use client";

import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations";
import React from "react";

const SignUp = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      fullName: "",
      email: "",
      phoneNumber: "",
      idNumber: 0,
      idCard: "",
      kraPin: "",
      password: "",
    }}
    onSubmit={signUp}
  />
);

export default SignUp;
