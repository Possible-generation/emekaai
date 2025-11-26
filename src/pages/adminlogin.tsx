import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emeka, image5, bottomImage } from "../utils/assets";
import { toast } from "sonner";
import { useAdminStore } from "../store/adminStore";
import Loader from "../components/loader";

export default function AdminLogin() {
  const navigate = useNavigate();
  const login = useAdminStore((state) => state.login);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      return toast.error("Please fill all fields");
    }

    setLoading(true);

    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      login(loginForm.email, loginForm.password);
      toast.success("Login successful");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen transition ease-in-out delay-100 bg-white">
      <div className="relative flex flex-col w-full h-full">
        {/* white cartoon */}
        <div className="absolute left-0 top-28">
          <img
            src={image5}
            draggable={false}
            alt="img"
            className="w-[100px] h-auto md:w-[250px] lg:w-[350px]"
          />
        </div>
        {/* form */}
        <div className="h-full flex flex-col justify-center items-center">
          <div className="flex flex-col gap-y-0.5 items-center mb-8">
            <img
              src={emeka}
              draggable={false}
              alt="logo"
              className="w-[80px] h-auto lg:w-[130px]"
              loading="lazy"
              decoding="async"
            />
            <p className="uppercase text-lg transition ease-in-out text-[#15411F] delay-100 lg:text-xl"></p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="z-10 flex flex-col gap-y-5 w-full text-center p-6 md:max-w-[461px] lg:max-w-[600px]"
          >
            <h2 className="text-2xl transition ease-in-out delay-100 text-[#333333] font-semibold">
              Admin Login
            </h2>
            <p className="text-sm text-[#5C5C5C] -mt-3">
              Access the admin dashboard
            </p>
            {/* email */}
            <input
              className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
              type="email"
              name="email"
              placeholder="Admin Email"
              onChange={handleChange}
              value={loginForm.email}
            />
            {/* password */}
            <input
              className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={loginForm.password}
            />
            <button
              disabled={!loginForm.email || !loginForm.password || loading}
              className="bg-[#15411F] rounded-lg h-[50px] text-white font-semibold w-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed flex flex-row items-center justify-center gap-x-2 lg:h-[64px]"
            >
              {loading && <Loader size={20} color="white" />}
              <p>{loading ? "Logging in..." : "Login"}</p>
            </button>
          </form>
          <p className="text-sm text-center font-medium text-[#2A2A2A] mt-8">
            Copyright © 2025. All Rights Reserved.
          </p>
        </div>
        {/* colorful dots */}
        <div className="absolute right-0 bottom-0">
          <img
            src={bottomImage}
            draggable={false}
            alt="img"
            className="w-[200px] h-auto md:w-[350px] lg:w-[500px]"
          />
        </div>
      </div>
    </main>
  );
}
