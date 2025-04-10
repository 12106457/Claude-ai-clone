import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailEntered, setEmailEntered] = useState(false);
  const [timer, setTimer] = useState(30);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [emailButtonClick,setEmailButtonClick]=useState(false);

//   useEffect(() => {
//     let interval;
//     if (emailEntered && timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);
//     } else if (timer === 0) {
//       setResendDisabled(false);
//     }
//     return () => clearInterval(interval);
//   }, [emailEntered, timer]);

//   const loginWithGoogle = () => {
//     window.open("http://localhost:3001/auth/google/callback", "_self");
//   };

//   const handleEmailSubmit = (e) => {
//     e.preventDefault();
//     setEmailEntered(true);
//     setTimer(30);
//     setResendDisabled(true);
//   };

//   const handleResendOtp = () => {
//     setTimer(30);
//     setResendDisabled(true);
//     console.log("Resending OTP to", email);
//   };

const handleLoginSuccess = (credentialResponse) => {
    // console.log("Google credential response", credentialResponse);
  
    if (credentialResponse?.credential) {
      const decoded = jwtDecode(credentialResponse.credential);
      localStorage.setItem("user", JSON.stringify(decoded));
      navigate("/dashboard");
    } else {
      console.error("No credential found in response");
    }
  };

  const handleEmailSubmit=(e)=>{
    e.preventDefault();
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 flex justify-center items-center gap-2">
            <img
                src="/logo.svg"
                alt="My Icon"
                width={38}
                height={38}
                className="transition-transform duration-200 ease-in-out hover:scale-75"
                // className="animate-scalePulse"
            />
            <span className="text-3xl">Claude</span> 
        </h2>

        <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.log("Login Failed")}
      />

        <div className="flex items-center my-4">
          <hr className="w-full border-gray-300" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="w-full border-gray-300" />
        </div>

        {emailEntered ? (
          <form className="space-y-4">
            <p className="text-center text-gray-600 mb-2">Enter the OTP sent to {email}</p>
            <input
              type="text"
              placeholder="Enter 6-digit OTP"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
            >
              Verify OTP
            </button>
            <button
              type="button"
              className={`w-full p-3 rounded-lg transition mt-2 ${resendDisabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
            //   onClick={handleResendOtp}
              disabled={resendDisabled}
            >
              {resendDisabled ? `Resend OTP in ${timer}s` : 'Resend OTP'}
            </button>
          </form>
        ) : (
          <form className="space-y-4" 
          onSubmit={handleEmailSubmit}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => {setEmail(e.target.value)}}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
              onClick={()=>setEmailButtonClick(true)}
            >
              Continue with email
            </button>
          </form>
        )}
        
        {email&&emailButtonClick&&<p className="text-red-600 text-sm font-bold text-center mt-2">
            Kindly continue with google
        </p>
        }

        {/* <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <button
            className="text-blue-500 font-semibold cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign up
          </button>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
