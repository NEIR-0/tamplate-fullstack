import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authStoreManagement from "../../../store/authStoreManagement";

function AuthForm() {
  const {login} = authStoreManagement()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async() => {
    console.log(formData, ">>");
    // const repsonse = await login(formData);
    // if(repsonse){
    //   localStorage.setItem("accessToken", repsonse?.accessToken)
    //   localStorage.setItem("role", repsonse?.role?.name)
    //   localStorage.setItem("photo", repsonse?.photo)
    //   localStorage.setItem("name", repsonse?.name)
    // }
    
    // if(!repsonse){
    //   toast.error("Username atau password tidak valid", {
    //     autoClose: 3000,
    //     closeButton: false,
    //     hideProgressBar: true,
    //     position: "bottom-right",
    //   })
    // }else{
    //   navigate("/");
    // }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <div className="p-10 w-full max-w-lg bg-white rounded-md flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-2xl font-bold mb-6">Selamat datang di Sistem <span className="text-green-500">LajuPAY</span></h1>

        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Kata Sandi
            </label>
            <div className="mt-1 w-full flex items-center border border-gray-300 rounded-md px-2">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 outline-none"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="text-gray-600 hover:text-gray-800"
              >
                <i className={showPassword ? "ri-eye-off-line" : "ri-eye-line"}></i>
              </button>
            </div>
          </div>

          <div className="mt-4">
            <button
              className="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              onClick={handleSubmit}
            >
              Masuk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;