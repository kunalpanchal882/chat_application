import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
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
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result =await login(formData)

    if (result?.success) {
      navigate('/'); // manual navigation after signup
    }

  };

  return <div className="min-h-screen grid lg:grid-cols-2">
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
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-ping" />
                  Loading..
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              you don't have an acoount yet? {""}
              <Link to="/signup" className="link link-primary">
                sign in
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
    </div>;
};

export default LoginPage;
