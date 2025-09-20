import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, Navigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader,
  Loader2,
  Mail,
  MessageSquare,
  User,
  UserLock,
} from "lucide-react";
import AuthImagePAttern from "../components/AuthImagePAttern";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setformData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate()

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("full name is required");
    if (!formData.email.trim()) return toast.error("email is required");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      return toast.error("Please enter a valid email address");
    }

    if (!formData.password.trim()) return toast.error("password is required");
    if (formData.password.length<6) return toast.error("password must be at least 6 characters");

    return true
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const success = validateForm();

  if (success === true) {
    const result = await signup(formData); // await is very important

    if (result?.success) {
      navigate('/'); // manual navigation after signup
    }
  }
};


  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bgc-primary/10 flex items-center justify-center group-hover:bgc-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-base-content/60">
                Get Start with your free Account
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute z-[999] inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="example"
                  value={formData.fullname}
                  onChange={(e) =>
                    setformData({ ...formData, fullname: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">E-mail</span>
              </label>
              <div className="relative">
                <div className="absolute z-[999] inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setformData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute z-[999] inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserLock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10"
                  placeholder="**********"
                  value={formData.password}
                  onChange={(e) =>
                    setformData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setshowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <Eye className="size-5 text-base-content/40" />
                  ) : (
                    <EyeOff className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-ping" />
                  Loading..
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Already have an acount? {""}
              <Link to="/login" className="link link-primary">
                login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right */}
      <AuthImagePAttern
        title="Join over comunity"
        subtitle="Connect with Friends, share moments ,and stay in touch with your friends"
      />
    </div>
  );
};

export default SignupPage;
