// import React, { useState } from "react";

// const Otp = ({ email }) => {
//   const [otp, setOtp] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch(
//       `http://localhost:8080/api/auth/verify-otp?otp=${otp}&email=${email}`,
//       {
//         method: "POST",
//       }
//     );
//     if (res.ok) {
//       console.log("OTP verified successfully.");
//     } else {
//       console.error("OTP verification failed.");
//     }
//   };
//   return (
//     <div>
//       <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
//         <div className="relative bg-white px-6 pt-10 pb-9 shadow-lg mx-auto w-full max-w-sm rounded-2xl">
//           <div className="mx-auto flex w-full max-w-sm flex-col space-y-16">
//             <div className="flex flex-col items-center justify-center text-center space-y-2">
//               <div className="font-semibold text-xl">
//                 <p>Email Verification</p>
//               </div>
//               <div className="flex flex-row text-sm font-medium text-gray-400">
//                 <p>We have sent a code to your email ****@gmail.com</p>
//               </div>
//             </div>

//             <div>
//               <form onSubmit={handleSubmit}>
//                 <input
//                   type="number"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                 />
//                 {/* <div className="flex flex-col space-y-16">
//                   <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs gap-2">
//                     <div className="w-16 h-16 ">
//                       <input
//                         className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
//                         type="text"
//                       />
//                     </div>
//                     <div className="w-16 h-16 ">
//                       <input
//                         className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
//                         type="text"
//                       />
//                     </div>
//                     <div className="w-16 h-16 ">
//                       <input
//                         className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
//                         type="text"
//                       />
//                     </div>
//                     <div className="w-16 h-16 ">
//                       <input
//                         className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
//                         type="text"
//                       />
//                     </div>
//                     <div className="w-16 h-16 ">
//                       <input
//                         className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
//                         type="text"
//                       />
//                     </div>
//                     <div className="w-16 h-16 ">
//                       <input
//                         className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
//                         type="text"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex flex-col space-y-5">
//                     <div>
//                       <button
//                         type="submit"
//                         className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
//                       >
//                         Verify Account
//                       </button>
//                     </div>

//                     <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
//                       <p>Didn't recieve code?</p>{" "}
//                       <a
//                         className="flex flex-row items-center text-blue-600"
//                         href="http://"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                       >
//                         Resend
//                       </a>
//                     </div>
//                   </div>
//                 </div> */}
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Otp;

"use client";

import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useState } from "react";

import React from "react";

const Otp = () => {
  const [openModal, setOpenModal] = useState(true);
  const [email, setEmail] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  return (
    <>
      <Button onClick={() => setOpenModal(true)}>Toggle modal</Button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                placeholder="name@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Your password" />
              </div>
              <TextInput id="password" type="password" required />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a
                href="#"
                className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Lost Password?
              </a>
            </div>
            <div className="w-full">
              <Button>Log in to your account</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a
                href="#"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
              >
                Create account
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Otp;
