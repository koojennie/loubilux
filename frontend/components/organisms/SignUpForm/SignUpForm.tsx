"use client"

import Link from "next/link";
import React, { useRef, useState } from "react";
import { HiEyeOff } from "react-icons/hi";
import { HiEye } from "react-icons/hi2";

interface SignUpFormProps {
  onSubmit: (formdata: any) => void;
}

export default function SignUpForm({ onSubmit }: SignUpFormProps) {

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
      confirmPassword: confirmPassword.trim(),
      role: "user"
    }

    onSubmit(formData);
  }

  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
  
      if (passwordRef.current) {
        passwordRef.current.type = showPassword ? "password" : "text";
      }
  };

  const toggleConfPasswordVisibility = () => {
      setShowConfPassword((prev) => !prev);
  
      if (passwordRef.current) {
        passwordRef.current.type = showConfirmPassword ? "password" : "text";
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-4xl fw-bold color-palette-1 mb-10">Sign Up</h2>
      <p className="text-lg color-palette-1 m-0">
        Please sign up to purchase our products.
      </p>
      <div className="pt-50">
        <label
          htmlFor="name"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Full Name
        </label>
        <input
          type="text"
          className="form-control !rounded-lg text-lg"
          placeholder="Enter your full name"
          value={name}
          onChange={(e) => { setName(e.target.value) }}
        />
      </div>
      <div className="pt-30">
        <label
          htmlFor="username"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Username
        </label>
        <input
          type="text"
          className="form-control !rounded-lg text-lg"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => { setUsername(e.target.value) }}
        />
      </div>
      <div className="pt-30">
        <label
          htmlFor="email"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Email Address
        </label>
        <input
          type="email"
          className="form-control !rounded-lg text-lg"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
      </div>
      <div className="pt-30">
        <label
          htmlFor="password"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            ref={passwordRef}
            className="form-control !rounded-lg text-lg"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <span onClick={togglePasswordVisibility} className="absolute text-2xl top-1/2 right-4 -translate-y-1/2 text-gray-500 cursor-pointer">
            {showPassword ? <HiEyeOff /> : <HiEye />}
          </span>
        </div>
      </div>
      <div className="pt-30">
        <label
          htmlFor="password"
          className="form-label text-lg fw-medium color-palette-1 mb-10"
        >
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            ref={passwordRef}
            className="form-control !rounded-lg text-lg"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value) }}
          />
          <span onClick={toggleConfPasswordVisibility} className="absolute text-2xl top-1/2 right-4 -translate-y-1/2 text-gray-500 cursor-pointer">
            {showConfirmPassword ? <HiEyeOff /> : <HiEye />}
          </span>
        </div>
      </div>
      <div className="button-group d-flex flex-column mx-auto pt-50">
        <button
          className="btn btn-sign-up fw-medium text-lg text-white rounded-pill mb-16"
          type="submit"
        >
          Continue
        </button>
        <Link
          className="btn btn-sign-in fw-medium text-lg rounded-pill"
          href="../sign-in"
          role="button"
        >
          Sign In
        </Link>
      </div>
    </form>
  );
}
