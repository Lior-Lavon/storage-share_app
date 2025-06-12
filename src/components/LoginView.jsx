import React from "react";
import InputField from "./SharedComponents/InputField";
import PrimaryButton from "./SharedComponents/PrimaryButton";
import AuthCard from "./SharedComponents/AuthCard";

import googlePng from "../assets/google.png";

const LoginView = () => {
  const handleSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    console.log("handleSubmit");
    console.log("Password:", password);
    // You can now send this to your backend or process it further
  };

  return (
    <AuthCard>
      <p className="text-center text-base mb-4">Log in or create new account</p>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 mb-4">
          <InputField
            label="Your email"
            type="email"
            placeholder="email"
            id="email"
            autoComplete="username"
          />
          <InputField
            label="Your password"
            type="password"
            placeholder="Password"
            id="password"
            autoComplete="current-password"
          />
        </div>
        <div className="mt-8">
          <PrimaryButton>Log in</PrimaryButton>
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gray-400" />
            </div>
            <div className="relative z-10 bg-white px-6 text-center text-xs mx-auto w-fit text-gray-400">
              Or
            </div>
          </div>
          <button className="w-full py-2 border rounded-lg flex items-center justify-center gap-2">
            <img src={googlePng} alt="Google" className="w-5 h-5" />
            Log in with Google
          </button>
        </div>
      </form>
      <div className="mt-4 text-base text-center space-y-2 ">
        <div className="flex gap-2 items-center justify-center">
          <p>Don’t have an account? </p>
          <a href="#" className="text-violet-600">
            Sign up
          </a>
        </div>

        <div className="flex gap-2 items-center justify-center">
          <p>Forgot your password? </p>
          <a href="#" className="text-violet-600">
            Click here
          </a>
        </div>
      </div>
    </AuthCard>
  );
};

export default LoginView;

// // const LoginView = () => {
// const handleSubmit = (e) => {
//   e.preventDefault(); // prevent page refresh
//   console.log("handleSubmit");
//   console.log("Password:", password);
//   // You can now send this to your backend or process it further
// };

// <AuthCard>
//   <p className="text-center text-base mb-4">Log in or create new account</p>
//   {/* <form onSubmit={handleSubmit}> */}
//   <div className="flex flex-col gap-4 mb-4">
//     <InputField label="Your email" type="email" placeholder="email" />
//     <InputField label="Your password" type="password" placeholder="Password" />
//   </div>
//   <div className="mt-8">
//     <PrimaryButton>Log in</PrimaryButton>
//     <div className="relative my-4">
//       <div className="absolute inset-0 flex items-center">
//         <div className="w-full h-px bg-gray-400" />
//       </div>
//       <div className="relative z-10 bg-white px-6 text-center text-xs mx-auto w-fit text-gray-400">
//         Or
//       </div>
//     </div>
//     <button className="w-full py-2 border rounded-lg flex items-center justify-center gap-2">
//       <img src={googlePng} alt="Google" className="w-5 h-5" />
//       Log in with Google
//     </button>
//   </div>
//   {/* </form> */}
//   <div className="mt-4 text-base text-center space-y-2 ">
//     <div className="flex gap-2 items-center justify-center">
//       <p>Don’t have an account? </p>
//       <a href="#" className="text-violet-600">
//         Sign up
//       </a>
//     </div>

//     <div className="flex gap-2 items-center justify-center">
//       <p>Forgot your password? </p>
//       <a href="#" className="text-violet-600">
//         Click here
//       </a>
//     </div>
//   </div>
// </AuthCard>;
// // };

// // export default LoginView;
