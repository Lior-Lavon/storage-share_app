import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import googlePng from "../assets/google.png";

import React from "react";

const GoogleRegisterButton = ({ label, handleSuccess }) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // console.log("tokenResponse : ", tokenResponse);

      try {
        // You want to get the ID token, which you can do with userinfo API
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        // console.log("userInfo.data : ", userInfo.data);
        handleSuccess(userInfo.data.email, userInfo.data.sub);
      } catch (err) {
        console.error("Error authenticating user:", err);
      }
    },
    onError: (err) => {
      console.error("Google login failed:", err);
    },
    flow: "implicit", // default; use 'auth-code' if using code flow with backend exchange
  });

  //   return <button onClick={() => login()}>Register with Google</button>;
  return (
    <button
      className="w-full py-2 cursor-pointer border rounded-lg flex items-center justify-center gap-2"
      onClick={() => login()}
    >
      <img src={googlePng} alt="Google" className="w-5 h-5" />
      {`${label} with Google`}
    </button>
  );
};

export default GoogleRegisterButton;

// import { GoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import googlePng from "../assets/google.png";
// import React from "react";

// const GoogleRegisterButton = () => {
//   return (
//     <GoogleLogin
//       onSuccess={async (credentialResponse) => {
//         try {
//           const idToken = credentialResponse.credential;

//           // Send the ID token to your backend
//           const res = await axios.post(
//             "http://localhost:8000/api/auth/google",
//             {
//               id_token: idToken,
//             }
//           );

//           console.log("Backend response:", res.data);
//           localStorage.setItem("token", res.data.token);
//         } catch (err) {
//           console.error("Error authenticating user:", err);
//         }
//       }}
//       onError={() => {
//         console.error("Google login failed");
//       }}
//       useOneTap={false} // optional: set true to show One Tap popup
//       width="100%"
//       text="signin_with" // or "signup_with"
//       theme="outline"
//       shape="pill"
//       // Use render prop to style your own button
//       render={(renderProps) => (
//         <button
//           onClick={renderProps.onClick}
//           disabled={renderProps.disabled}
//           className="w-full py-2 border rounded-lg flex items-center justify-center gap-2"
//         >
//           <img src={googlePng} alt="Google" className="w-5 h-5" />
//           Register with Google
//         </button>
//       )}
//     />
//   );
// };

// export default GoogleRegisterButton;
