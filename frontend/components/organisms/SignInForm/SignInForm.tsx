"use client"

import Link from "next/link";
import React, { useState } from "react";

interface SignInFormProps{
  onSubmit: (formData: any) => void;
}

export default function SignInForm({onSubmit}: SignInFormProps) {
  // state form 
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      username: username.trim(),
      password: password.trim(),
    }

    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign In</h2>
      <p className="text-lg color-palette-1 m-0">
        Please sign in to purchase our products.
      </p>
      <div className="pt-50">
        <label
          htmlFor="username"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Username
        </label>
        <input
          type="text"
          className="form-control !rounded-lg text-lg"
          id="username"
          name="username"
          aria-describedby="username"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => {setUsername(e.target.value)}}
          required
        />
      </div>
      <div className="pt-30">
        <label
          htmlFor="password"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Password
        </label>
        <input
          type="password"
          className="form-control !rounded-lg text-lg"
          id="password"
          name="password"
          aria-describedby="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {setPassword(e.target.value)}}
          required
        />
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button
          className="btn btn-sign-in fw-medium text-lg text-white rounded-pill mb-16"
          type="submit"
        >
          Continue to Sign In
        </button>
        <Link href="../sign-up" className="btn btn-sign-up fw-medium text-lg rounded-pill" role="button">
          Sign Up
        </Link>
      </div>
    </form>
  );
}
