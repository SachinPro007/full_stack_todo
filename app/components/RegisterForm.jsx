"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/lib/schema/userSchema";
import z from "zod";
import { ragisterUser } from "@/app/actions/userAction";

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [serverResponse, setServerResponse] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "appliction/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await res.json();
    setServerResponse(data);
    setIsLoading(false);

    if (data.success) {
      router.push("/login");
    }
  };

  // form validate with zod and resigter new user with server action
  const handleFormAction = async (formData) => {
    const { success, data, error } = registerSchema.safeParse(
      Object.fromEntries(formData),
    );

    if (!success) {
      setErrors(z.flattenError(error).fieldErrors);
    } else {
      setIsLoading(true);
      const resData = await ragisterUser(data);
      setServerResponse(resData);
      setIsLoading(false);

      if (resData.success) {
        router.push("/login");
      }
    }
  };

  return (
    <form action={handleFormAction} className="p-6 pt-0 space-y-4">
      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`text-gray-600 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
            errors.name
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
          }`}
          placeholder="Enter your full name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`text-gray-600 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
            errors.email
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
          }`}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`text-gray-600 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
            errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
          }`}
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={`text-gray-600 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200 ${
            errors.confirmPassword
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
          }`}
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Creating Account...
          </div>
        ) : (
          "Create Account"
        )}
      </button>

      {/* Server Error Message */}
      {serverResponse.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-600 text-sm text-center">
            {serverResponse.error}
          </p>
        </div>
      )}

      {/* Server Success Message */}
      {serverResponse.success && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-green-600 text-sm text-center">
            {serverResponse.success}
          </p>
        </div>
      )}

      {/* Login Link */}
      <div className="text-center pt-4">
        <p className="text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
}

export default RegisterForm;
