import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setProfileImage(file);
    }
  };

  return (
    <section className="flex flex-col justify-center m-0 ml-0 px-5 py-4 pt-20 lg:pl-[320px] w-full h-fit min-h-screen">
      <div className="flex flex-col justify-center items-center gap-4 bg-white mx-auto px-2 py-4 rounded-md w-full h-auto sm:w-[600px]">
        <h1 className="text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
          Register
        </h1>
        <form className="flex flex-col gap-5 w-full" onSubmit={handleRegister}>
          <p className="font-semibold text-xl md:text-2xl">Personal Details</p>
          <div className="flex sm:flex-row flex-col gap-4">
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Full Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="bg-transparent py-2 border-b-[1px] border-b-stone-500 text-[16px] focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent py-2 border-b-[1px] border-b-stone-500 text-[16px] focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col gap-4">
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Phone</label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-transparent py-2 border-b-[1px] border-b-stone-500 text-[16px] focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="flex sm:flex-row flex-col gap-4">
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-transparent py-2 border-b-[1px] border-b-stone-500 text-[16px] focus:outline-none"
                required
              >
                <option value="">Select Role</option>
                <option value="Auctioneer">Auctioneer</option>
                <option value="Bidder">Bidder</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-1">
              <label className="text-[16px] text-stone-600">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent py-2 border-b-[1px] border-b-stone-500 text-[16px] focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-1 gap-2">
            <label className="text-[16px] text-stone-600">Profile Image</label>
            <div className="flex items-center gap-3">
              <img
                src={profileImagePreview || "/imageHolder.jpg"}
                alt="profileImagePreview"
                className="rounded-full w-14 h-14"
              />
              <input
                type="file"
                onChange={imageHandler}
                accept="image/*"
                required
              />
            </div>
          </div>
          <button
            className="bg-[#d6482b] hover:bg-[#b8381e] mx-auto my-4 px-4 py-2 rounded-md w-full sm:w-[420px] lg:w-[640px] font-semibold text-white text-xl transition-all duration-300"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUp;