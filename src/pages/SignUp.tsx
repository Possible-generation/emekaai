// import { Link } from "react-router-dom";
// import { useAppContext } from "../context";
// import { useNavigate } from "react-router-dom";
// import { emeka, image5, bottomImage } from "../utils/assets";
// import { validateEmail, validateNames, validatePassword } from "../validation";
// import { useState } from "react";
// import type { SignupForm } from "../entities";
// import { toast } from "sonner";
// import { signup } from "../api/onboarding";
// import Loader from "../components/loader";

// export default function SignUp() {
//   const { theme } = useAppContext();
//   const navigate = useNavigate();

//   const [signUpForm, setSignUpForm] = useState<SignupForm>({
//     firstname: "",
//     lastname: "",
//     email: "",
//     role: "",
//     position: "",
//     password: "",
//     password_confirmation: "",
//   });
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setSignUpForm((pV) => {
//       return {
//         ...pV,
//         [name]: value,
//       };
//     });
//   };

//   const signUpUser = async () => {
//     setLoading(true);
//     signup(
//       signUpForm.firstname,
//       signUpForm.lastname,
//       signUpForm.email,
//       signUpForm.role,
//       signUpForm.position,
//       signUpForm.password,
//       signUpForm.password_confirmation
//     )
//       .then((resp) => {
//         toast.success(resp.message ? resp.message : "Signup successful");
//         setLoading(false);
//         navigate("/login", { replace: true });
//       })
//       .catch((error) => {
//         setLoading(false);
//         console.log(error);
//         toast.error(error.message ? error.message : "Signup failed");
//       });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     //validate email, first name, last name and password
//     if (signUpForm.password !== signUpForm.password_confirmation) {
//       return toast.error("Password mismatched");
//     }

//     const checkEmail = validateEmail(signUpForm.email);
//     if (checkEmail !== true) return toast.error(checkEmail);

//     const checkfirstname = validateNames(signUpForm.firstname);
//     if (checkfirstname !== true) return toast.error(checkfirstname);

//     const checklastname = validateNames(signUpForm.lastname);
//     if (checklastname !== true) return toast.error(checklastname);

//     const checkPassword = validatePassword(signUpForm.password);
//     if (checkPassword !== true) return toast.error(checkPassword);

//     // console.log(signUpForm);
//     signUpUser();
//   };

//   return (
//     <main className="h-fit transition ease-in-out delay-100 bg-white ">
//       <div className="relative flex flex-col w-full h-full">
//         {/* white cartoon */}
//         <div className="absolute left-0 top-28">
//           <img
//             src={image5}
//             draggable={false}
//             alt="img"
//             className="w-[100px] h-auto md:w-[250px] lg:w-[350px]"
//           />
//         </div>
//         {/* form */}
//         <div className="h-full flex flex-col justify-between py-10 items-center">
//           <div className="flex flex-col gap-y-0.5 items-center">
//             <img
//               src={emeka}
//               draggable={false}
//               alt="logo"
//               className="w-[80px] h-auto lg:w-[130px]"
//               loading="lazy"
//               decoding="async"
//             />
//             <p className="uppercase text-lg transition ease-in-out text-[#15411F] delay-100 lg:text-xl "></p>
//           </div>
//           <form
//             onSubmit={handleSubmit}
//             className="z-10 flex flex-col gap-y-5 w-full text-center p-6 md:max-w-[461px] lg:max-w-[600px]"
//           >
//             <h2 className="text-lg transition ease-in-out delay-100 text-[#333333] font-semibold ">
//               Signup to Emeka
//             </h2>
//             {/* firstname and lastname */}
//             <div className="flex flex-row gap-x-3 w-full">
//               {/* firstname */}
//               <input
//                 className="border border-[#B9B9B9] h-[50px] px-3 w-full placeholder:text-[#5C5C5C] text-[#333333] rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//                 type="text"
//                 name="firstname"
//                 placeholder="Firstname"
//                 onChange={handleChange}
//               />
//               {/* lastname */}
//               <input
//                 className="border border-[#B9B9B9] h-[50px] px-3 w-full placeholder:text-[#5C5C5C] text-[#333333] rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//                 type="text"
//                 name="lastname"
//                 placeholder="Lastname"
//                 onChange={handleChange}
//               />
//             </div>
//             {/* email */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={handleChange}
//             />
//             {/* role */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="text"
//               name="role"
//               placeholder="Position/Office"
//               onChange={handleChange}
//             />
//             {/* position*/}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="text"
//               name="position"
//               placeholder="Position/Office"
//               onChange={handleChange}
//             />
//             {/* password */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={handleChange}
//             />
//             {/* confirm pass */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="password"
//               name="password_confirmation"
//               placeholder="Confirm Password"
//               onChange={handleChange}
//             />
//             <button
//               disabled={
//                 !signUpForm.email ||
//                 !signUpForm.firstname ||
//                 !signUpForm.lastname ||
//                 !signUpForm.password ||
//                 !signUpForm.password_confirmation ||
//                 !signUpForm.role ||
//                 loading
//               }
//               className="bg-[#15411F] rounded-lg h-[50px] text-white font-semibold w-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed flex flex-row items-center justify-center gap-x-2 lg:h-[64px]"
//             >
//               {loading && <Loader size={20} color="white" />}
//               <p>{loading ? "Registering..." : "Sign Up"}</p>
//             </button>
//             <div className="text-center">
//               <p className="text-sm transition ease-in-out delay-100 text-[#2B2B2B] font-semibold lg:text-base ">
//                 Already have an account?{" "}
//                 <Link className="hover:underline text-[#15411F] " to={"/login"}>
//                   Login
//                 </Link>
//               </p>
//             </div>
//           </form>
//           <p
//             className={`text-sm text-center font-medium ${
//               theme === "dark" ? "text-white" : "text-[#2A2A2A]"
//             }`}
//           >
//             Copyright © 2025. All Rights Reserved.
//           </p>
//         </div>
//         {/* colorful dots */}
//         <div className="absolute right-0 bottom-0">
//           <img
//             src={bottomImage}
//             draggable={false}
//             alt="img"
//             className="w-[200px] h-auto md:w-[350px] lg:w-[500px]"
//           />
//         </div>
//       </div>
//     </main>
//   );
// }

// import { Link } from "react-router-dom";
// import { useAppContext } from "../context";
// import { useNavigate } from "react-router-dom";
// import { emeka, image5, bottomImage } from "../utils/assets";
// import { validateEmail, validateNames, validatePassword } from "../validation";
// import { useState } from "react";
// import type { SignupForm } from "../entities";
// import { toast } from "sonner";
// import { signup } from "../api/onboarding";
// import Loader from "../components/loader";

// export default function SignUp() {
//   const { theme } = useAppContext();
//   const navigate = useNavigate();

//   const [signUpForm, setSignUpForm] = useState<SignupForm>({
//     firstname: "",
//     lastname: "",
//     email: "",
//     role: "",
//     password: "",
//     password_confirmation: "",
//     description: "", // Added description field
//   });
//   const [files, setFiles] = useState<File[]>([]); // State for multiple files
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setSignUpForm((pV) => {
//       return {
//         ...pV,
//         [name]: value,
//       };
//     });
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const selectedFiles = Array.from(e.target.files);
//       setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
//     }
//   };

//   const removeFile = (index: number) => {
//     setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   const signUpUser = async () => {
//     setLoading(true);

//     // Create FormData to handle file uploads
//     const formData = new FormData();
//     formData.append("firstname", signUpForm.firstname);
//     formData.append("lastname", signUpForm.lastname);
//     formData.append("email", signUpForm.email);
//     formData.append("role", signUpForm.role);
//     formData.append("password", signUpForm.password);
//     formData.append("password_confirmation", signUpForm.password_confirmation);
//     formData.append("description", signUpForm.description);

//     // Append all files
//     files.forEach((file, index) => {
//       formData.append(`files[${index}]`, file);
//     });

//     // You'll need to update your signup API function to accept FormData
//     signup(
//       signUpForm.firstname,
//       signUpForm.lastname,
//       signUpForm.email,
//       signUpForm.role,
//       signUpForm.password,
//       signUpForm.password_confirmation,
//       signUpForm.description,
//       formData // Pass formData if your API supports it
//     )
//       .then((resp) => {
//         toast.success(resp.message ? resp.message : "Signup successful");
//         setLoading(false);
//         navigate("/login", { replace: true });
//       })
//       .catch((error) => {
//         setLoading(false);
//         console.log(error);
//         toast.error(error.message ? error.message : "Signup failed");
//       });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     //validate email, first name, last name and password
//     if (signUpForm.password !== signUpForm.password_confirmation) {
//       return toast.error("Password mismatched");
//     }

//     const checkEmail = validateEmail(signUpForm.email);
//     if (checkEmail !== true) return toast.error(checkEmail);

//     const checkfirstname = validateNames(signUpForm.firstname);
//     if (checkfirstname !== true) return toast.error(checkfirstname);

//     const checklastname = validateNames(signUpForm.lastname);
//     if (checklastname !== true) return toast.error(checklastname);

//     const checkPassword = validatePassword(signUpForm.password);
//     if (checkPassword !== true) return toast.error(checkPassword);

//     if (!signUpForm.description.trim()) {
//       return toast.error("Description is required");
//     }

//     signUpUser();
//   };

//   return (
//     <main className="h-fit transition ease-in-out delay-100 bg-white ">
//       <div className="relative flex flex-col w-full h-full">
//         {/* white cartoon */}
//         <div className="absolute left-0 top-28">
//           <img
//             src={image5}
//             draggable={false}
//             alt="img"
//             className="w-[100px] h-auto md:w-[250px] lg:w-[350px]"
//           />
//         </div>
//         {/* form */}
//         <div className="h-full flex flex-col justify-between py-10 items-center">
//           <div className="flex flex-col gap-y-0.5 items-center">
//             <img
//               src={emeka}
//               draggable={false}
//               alt="logo"
//               className="w-[80px] h-auto lg:w-[130px]"
//               loading="lazy"
//               decoding="async"
//             />
//             <p className="uppercase text-lg transition ease-in-out text-[#15411F] delay-100 lg:text-xl "></p>
//           </div>
//           <form
//             onSubmit={handleSubmit}
//             className="z-10 flex flex-col gap-y-5 w-full text-center p-6 md:max-w-[461px] lg:max-w-[600px]"
//           >
//             <h2 className="text-lg transition ease-in-out delay-100 text-[#333333] font-semibold ">
//               Signup to Emeka
//             </h2>
//             {/* firstname and lastname */}
//             <div className="flex flex-row gap-x-3 w-full">
//               {/* firstname */}
//               <input
//                 className="border border-[#B9B9B9] h-[50px] px-3 w-full placeholder:text-[#5C5C5C] text-[#333333] rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//                 type="text"
//                 name="firstname"
//                 placeholder="Firstname"
//                 onChange={handleChange}
//               />
//               {/* lastname */}
//               <input
//                 className="border border-[#B9B9B9] h-[50px] px-3 w-full placeholder:text-[#5C5C5C] text-[#333333] rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//                 type="text"
//                 name="lastname"
//                 placeholder="Lastname"
//                 onChange={handleChange}
//               />
//             </div>
//             {/* email */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={handleChange}
//             />
//             {/* role */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="text"
//               name="role"
//               placeholder="Position/Office"
//               onChange={handleChange}
//             />
//             {/* description textarea */}
//             <div className="w-full text-left">
//               <label className="text-sm font-medium text-[#333333] mb-1 block">
//                 Description about yourself
//               </label>
//               <textarea
//                 className="border border-[#B9B9B9] min-h-[100px] px-3 py-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 resize-y lg:px-5 lg:min-h-[120px]"
//                 name="description"
//                 placeholder="Tell us about yourself..."
//                 onChange={handleChange}
//                 rows={4}
//               />
//             </div>
//             {/* file upload */}

//             {/* password */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={handleChange}
//             />
//             {/* confirm pass */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="password"
//               name="password_confirmation"
//               placeholder="Confirm Password"
//               onChange={handleChange}
//             />
//             <div className="w-full text-left">
//               <label className="text-sm font-medium text-[#333333] mb-1 block">
//                 Upload Files like letter, memo, speech(Multiple files supported)
//               </label>
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleFileChange}
//                 className=" h-[50px] px-3 w-full rounded-lg text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#15411F] file:text-white hover:file:bg-[#1a5228] file:cursor-pointer"
//               />
//               {/* Display selected files */}
//               {files.length > 0 && (
//                 <div className="mt-3 space-y-2">
//                   {files.map((file, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
//                     >
//                       <span className="text-sm text-[#333333] truncate flex-1">
//                         {file.name}
//                       </span>
//                       <button
//                         type="button"
//                         onClick={() => removeFile(index)}
//                         className="ml-2 text-red-500 hover:text-red-700 text-sm font-medium"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//             <button
//               disabled={
//                 !signUpForm.email ||
//                 !signUpForm.firstname ||
//                 !signUpForm.lastname ||
//                 !signUpForm.password ||
//                 !signUpForm.password_confirmation ||
//                 !signUpForm.role ||
//                 !signUpForm.description ||
//                 loading
//               }
//               className="bg-[#15411F] rounded-lg h-[50px] text-white font-semibold w-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed flex flex-row items-center justify-center gap-x-2 lg:h-[64px]"
//             >
//               {loading && <Loader size={20} color="white" />}
//               <p>{loading ? "Registering..." : "Sign Up"}</p>
//             </button>
//             <div className="text-center">
//               <p className="text-sm transition ease-in-out delay-100 text-[#2B2B2B] font-semibold lg:text-base ">
//                 Already have an account?{" "}
//                 <Link className="hover:underline text-[#15411F] " to={"/login"}>
//                   Login
//                 </Link>
//               </p>
//             </div>
//           </form>
//           <p
//             className={`text-sm text-center font-medium ${
//               theme === "dark" ? "text-white" : "text-[#2A2A2A]"
//             }`}
//           >
//             Copyright © 2025. All Rights Reserved.
//           </p>
//         </div>
//         {/* colorful dots */}
//         <div className="absolute right-0 bottom-0">
//           <img
//             src={bottomImage}
//             draggable={false}
//             alt="img"
//             className="w-[200px] h-auto md:w-[350px] lg:w-[500px]"
//           />
//         </div>
//       </div>
//     </main>
//   );
// }

//today changes---

// import { Link } from "react-router-dom";
// import { useAppContext } from "../context";
// import { useNavigate } from "react-router-dom";
// import { emeka, image5, bottomImage } from "../utils/assets";
// import { validateEmail, validateNames, validatePassword } from "../validation";
// import { useState } from "react";
// import type { SignupForm } from "../entities";
// import { toast } from "sonner";
// import { signup } from "../api/onboarding";
// import Loader from "../components/loader";

// export default function SignUp() {
//   const { theme } = useAppContext();
//   const navigate = useNavigate();

//   const [signUpForm, setSignUpForm] = useState<SignupForm>({
//     firstname: "",
//     lastname: "",
//     email: "",
//     role: "",
//     position: "",
//     password: "",
//     password_confirmation: "",
//     about: "",
//   });
//   const [letter, setLetter] = useState<File | null>(null);
//   const [memo, setMemo] = useState<File | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setSignUpForm((pV) => {
//       return {
//         ...pV,
//         [name]: value,
//       };
//     });
//   };

//   const handleLetterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setLetter(e.target.files[0]);
//     }
//   };

//   const handleMemoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setMemo(e.target.files[0]);
//     }
//   };

//   const removeLetterFile = () => {
//     setLetter(null);
//   };

//   const removeMemoFile = () => {
//     setMemo(null);
//   };

//   const signUpUser = async () => {
//     setLoading(true);

//     try {
//       const resp = await signup(
//         signUpForm.firstname,
//         signUpForm.lastname,
//         signUpForm.email,
//         signUpForm.role,
//         signUpForm.position,
//         signUpForm.password,
//         signUpForm.password_confirmation,
//         signUpForm.about,
//         letter,
//         memo
//       );

//       toast.success(resp.message ? resp.message : "Signup successful");
//       setLoading(false);
//       navigate("/login", { replace: true });
//     } catch (error: any) {
//       setLoading(false);
//       console.error("Signup error:", error);
//       toast.error(
//         error.response?.data?.message || error.message || "Signup failed"
//       );
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     //validate email, first name, last name and password
//     if (signUpForm.password !== signUpForm.password_confirmation) {
//       return toast.error("Password mismatched");
//     }

//     const checkEmail = validateEmail(signUpForm.email);
//     if (checkEmail !== true) return toast.error(checkEmail);

//     const checkfirstname = validateNames(signUpForm.firstname);
//     if (checkfirstname !== true) return toast.error(checkfirstname);

//     const checklastname = validateNames(signUpForm.lastname);
//     if (checklastname !== true) return toast.error(checklastname);

//     const checkPassword = validatePassword(signUpForm.password);
//     if (checkPassword !== true) return toast.error(checkPassword);

//     if (!signUpForm.role.trim()) {
//       return toast.error("Role is required");
//     }

//     if (!signUpForm.position.trim()) {
//       return toast.error("Position is required");
//     }

//     signUpUser();
//   };

//   return (
//     <main className="h-fit transition ease-in-out delay-100 bg-white ">
//       <div className="relative flex flex-col w-full h-full">
//         {/* white cartoon */}
//         <div className="absolute left-0 top-28">
//           <img
//             src={image5}
//             draggable={false}
//             alt="img"
//             className="w-[100px] h-auto md:w-[250px] lg:w-[350px]"
//           />
//         </div>
//         {/* form */}
//         <div className="h-full flex flex-col justify-between py-10 items-center">
//           <div className="flex flex-col gap-y-0.5 items-center">
//             <img
//               src={emeka}
//               draggable={false}
//               alt="logo"
//               className="w-[80px] h-auto lg:w-[130px]"
//               loading="lazy"
//               decoding="async"
//             />
//             <p className="uppercase text-lg transition ease-in-out text-[#15411F] delay-100 lg:text-xl "></p>
//           </div>
//           <form
//             onSubmit={handleSubmit}
//             className="z-10 flex flex-col gap-y-5 w-full text-center p-6 md:max-w-[461px] lg:max-w-[600px]"
//           >
//             <h2 className="text-lg transition ease-in-out delay-100 text-[#333333] font-semibold ">
//               Signup to Emeka
//             </h2>
//             {/* firstname and lastname */}
//             <div className="flex flex-row gap-x-3 w-full">
//               {/* firstname */}
//               <input
//                 className="border border-[#B9B9B9] h-[50px] px-3 w-full placeholder:text-[#5C5C5C] text-[#333333] rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//                 type="text"
//                 name="firstname"
//                 placeholder="Firstname"
//                 onChange={handleChange}
//                 value={signUpForm.firstname}
//               />
//               {/* lastname */}
//               <input
//                 className="border border-[#B9B9B9] h-[50px] px-3 w-full placeholder:text-[#5C5C5C] text-[#333333] rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//                 type="text"
//                 name="lastname"
//                 placeholder="Lastname"
//                 onChange={handleChange}
//                 value={signUpForm.lastname}
//               />
//             </div>
//             {/* email */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={handleChange}
//               value={signUpForm.email}
//             />
//             {/* role */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="text"
//               name="role"
//               placeholder="Role (e.g., Staff, Admin)"
//               onChange={handleChange}
//               value={signUpForm.role}
//             />
//             {/* position */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="text"
//               name="position"
//               placeholder="Position/Office"
//               onChange={handleChange}
//               value={signUpForm.position}
//             />
//             {/* about textarea */}
//             <div className="w-full text-left">
//               <label className="text-sm font-medium text-[#333333] mb-1 block">
//                 About yourself (optional)
//               </label>
//               <textarea
//                 className="border border-[#B9B9B9] min-h-[100px] px-3 py-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 resize-y lg:px-5 lg:min-h-[120px]"
//                 name="about"
//                 placeholder="Tell us about yourself..."
//                 onChange={handleChange}
//                 value={signUpForm.about}
//                 rows={4}
//               />
//             </div>

//             {/* password */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={handleChange}
//               value={signUpForm.password}
//             />
//             {/* confirm pass */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="password"
//               name="password_confirmation"
//               placeholder="Confirm Password"
//               onChange={handleChange}
//               value={signUpForm.password_confirmation}
//             />

//             {/* Letter file upload */}
//             <div className="w-full text-left">
//               <label className="text-sm font-medium text-[#333333] mb-1 block">
//                 Upload Letter (optional)
//               </label>
//               <input
//                 type="file"
//                 onChange={handleLetterFileChange}
//                 accept=".pdf,.doc,.docx,.txt"
//                 className="h-[50px] px-3 w-full rounded-lg text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#15411F] file:text-white hover:file:bg-[#1a5228] file:cursor-pointer"
//               />
//               {/* Display selected letter file */}
//               {letter && (
//                 <div className="mt-3">
//                   <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
//                     <span className="text-sm text-[#333333] truncate flex-1">
//                       {letter.name}
//                     </span>
//                     <button
//                       type="button"
//                       onClick={removeLetterFile}
//                       className="ml-2 text-red-500 hover:text-red-700 text-sm font-medium"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Memo file upload */}
//             <div className="w-full text-left">
//               <label className="text-sm font-medium text-[#333333] mb-1 block">
//                 Upload Memo (optional)
//               </label>
//               <input
//                 type="file"
//                 onChange={handleMemoFileChange}
//                 accept=".pdf,.doc,.docx,.txt"
//                 className="h-[50px] px-3 w-full rounded-lg text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#15411F] file:text-white hover:file:bg-[#1a5228] file:cursor-pointer"
//               />
//               {/* Display selected memo file */}
//               {memo && (
//                 <div className="mt-3">
//                   <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
//                     <span className="text-sm text-[#333333] truncate flex-1">
//                       {memo.name}
//                     </span>
//                     <button
//                       type="button"
//                       onClick={removeMemoFile}
//                       className="ml-2 text-red-500 hover:text-red-700 text-sm font-medium"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <button
//               disabled={
//                 !signUpForm.email ||
//                 !signUpForm.firstname ||
//                 !signUpForm.lastname ||
//                 !signUpForm.password ||
//                 !signUpForm.password_confirmation ||
//                 !signUpForm.role ||
//                 !signUpForm.position ||
//                 loading
//               }
//               className="bg-[#15411F] rounded-lg h-[50px] text-white font-semibold w-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed flex flex-row items-center justify-center gap-x-2 lg:h-[64px]"
//             >
//               {loading && <Loader size={20} color="white" />}
//               <p>{loading ? "Registering..." : "Sign Up"}</p>
//             </button>
//             <div className="text-center">
//               <p className="text-sm transition ease-in-out delay-100 text-[#2B2B2B] font-semibold lg:text-base ">
//                 Already have an account?{" "}
//                 <Link className="hover:underline text-[#15411F] " to={"/login"}>
//                   Login
//                 </Link>
//               </p>
//             </div>
//           </form>
//           <p
//             className={`text-sm text-center font-medium ${
//               theme === "dark" ? "text-white" : "text-[#2A2A2A]"
//             }`}
//           >
//             Copyright © 2025. All Rights Reserved.
//           </p>
//         </div>
//         {/* colorful dots */}
//         <div className="absolute right-0 bottom-0">
//           <img
//             src={bottomImage}
//             draggable={false}
//             alt="img"
//             className="w-[200px] h-auto md:w-[350px] lg:w-[500px]"
//           />
//         </div>
//       </div>
//     </main>
//   );
// }

//---------------------------------------------------------
// import { Link } from "react-router-dom";
// import { useAppContext } from "../context";
// import { useNavigate } from "react-router-dom";
// import { emeka, image5, bottomImage } from "../utils/assets";
// import { validateEmail, validateNames, validatePassword } from "../validation";
// import { useState } from "react";
// import type { SignupForm } from "../entities";
// import { toast } from "sonner";
// import { signup } from "../api/onboarding";
// import Loader from "../components/loader";

// export default function SignUp() {
//   const { theme } = useAppContext();
//   const navigate = useNavigate();

//   const [signUpForm, setSignUpForm] = useState<SignupForm>({
//     firstname: "",
//     lastname: "",
//     email: "",
//     role: "",
//     position: "",
//     password: "",
//     password_confirmation: "",
//     about: "",
//     letter: null,
//     memo: null,
//   });
//   const [letterFileName, setLetterFileName] = useState<string>("");
//   const [memoFileName, setMemoFileName] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setSignUpForm((pV) => {
//       return {
//         ...pV,
//         [name]: value,
//       };
//     });
//   };

//   const convertFileToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
//         const base64String = reader.result as string;
//         const base64Content = base64String.split(",")[1];
//         resolve(base64Content);
//       };
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   const handleLetterFileChange = async (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       try {
//         const base64String = await convertFileToBase64(file);
//         setLetterFileName(file.name);
//         setSignUpForm((pV) => ({
//           ...pV,
//           letter: base64String,
//         }));
//       } catch (error) {
//         toast.error("Failed to process letter file");
//         console.error("Error converting letter to base64:", error);
//       }
//     }
//   };

//   const handleMemoFileChange = async (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       try {
//         const base64String = await convertFileToBase64(file);
//         setMemoFileName(file.name);
//         setSignUpForm((pV) => ({
//           ...pV,
//           memo: base64String,
//         }));
//       } catch (error) {
//         toast.error("Failed to process memo file");
//         console.error("Error converting memo to base64:", error);
//       }
//     }
//   };

//   const removeLetterFile = () => {
//     setLetterFileName("");
//     setSignUpForm((pV) => ({
//       ...pV,
//       letter: null,
//     }));
//   };

//   const removeMemoFile = () => {
//     setMemoFileName("");
//     setSignUpForm((pV) => ({
//       ...pV,
//       memo: null,
//     }));
//   };

//   const signUpUser = async () => {
//     setLoading(true);

//     try {
//       const resp = await signup(signUpForm);

//       toast.success(resp.message ? resp.message : "Signup successful");
//       setLoading(false);
//       navigate("/login", { replace: true });
//     } catch (error: any) {
//       setLoading(false);
//       console.error("Signup error:", error);
//       toast.error(
//         error.response?.data?.message || error.message || "Signup failed"
//       );
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     //validate email, first name, last name and password
//     if (signUpForm.password !== signUpForm.password_confirmation) {
//       return toast.error("Password mismatched");
//     }

//     const checkEmail = validateEmail(signUpForm.email);
//     if (checkEmail !== true) return toast.error(checkEmail);

//     const checkfirstname = validateNames(signUpForm.firstname);
//     if (checkfirstname !== true) return toast.error(checkfirstname);

//     const checklastname = validateNames(signUpForm.lastname);
//     if (checklastname !== true) return toast.error(checklastname);

//     const checkPassword = validatePassword(signUpForm.password);
//     if (checkPassword !== true) return toast.error(checkPassword);

//     if (!signUpForm.role.trim()) {
//       return toast.error("Role is required");
//     }

//     if (!signUpForm.position.trim()) {
//       return toast.error("Position is required");
//     }

//     signUpUser();
//   };

//   return (
//     <main className="h-fit transition ease-in-out delay-100 bg-white ">
//       <div className="relative flex flex-col w-full h-full">
//         {/* white cartoon */}
//         <div className="absolute left-0 top-28">
//           <img
//             src={image5}
//             draggable={false}
//             alt="img"
//             className="w-[100px] h-auto md:w-[250px] lg:w-[350px]"
//           />
//         </div>
//         {/* form */}
//         <div className="h-full flex flex-col justify-between py-10 items-center">
//           <div className="flex flex-col gap-y-0.5 items-center">
//             <img
//               src={emeka}
//               draggable={false}
//               alt="logo"
//               className="w-[80px] h-auto lg:w-[130px]"
//               loading="lazy"
//               decoding="async"
//             />
//             <p className="uppercase text-lg transition ease-in-out text-[#15411F] delay-100 lg:text-xl "></p>
//           </div>
//           <form
//             onSubmit={handleSubmit}
//             className="z-10 flex flex-col gap-y-5 w-full text-center p-6 md:max-w-[461px] lg:max-w-[600px]"
//           >
//             <h2 className="text-lg transition ease-in-out delay-100 text-[#333333] font-semibold ">
//               Signup to Emeka
//             </h2>
//             {/* firstname and lastname */}
//             <div className="flex flex-row gap-x-3 w-full">
//               {/* firstname */}
//               <input
//                 className="border border-[#B9B9B9] h-[50px] px-3 w-full placeholder:text-[#5C5C5C] text-[#333333] rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//                 type="text"
//                 name="firstname"
//                 placeholder="Firstname"
//                 onChange={handleChange}
//                 value={signUpForm.firstname}
//               />
//               {/* lastname */}
//               <input
//                 className="border border-[#B9B9B9] h-[50px] px-3 w-full placeholder:text-[#5C5C5C] text-[#333333] rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//                 type="text"
//                 name="lastname"
//                 placeholder="Lastname"
//                 onChange={handleChange}
//                 value={signUpForm.lastname}
//               />
//             </div>
//             {/* email */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={handleChange}
//               value={signUpForm.email}
//             />
//             {/* role */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="text"
//               name="role"
//               placeholder="Role (e.g., Staff, Admin)"
//               onChange={handleChange}
//               value={signUpForm.role}
//             />
//             {/* position */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="text"
//               name="position"
//               placeholder="Position/Office"
//               onChange={handleChange}
//               value={signUpForm.position}
//             />
//             {/* about textarea */}
//             <div className="w-full text-left">
//               <label className="text-sm font-medium text-[#333333] mb-1 block">
//                 About yourself (optional)
//               </label>
//               <textarea
//                 className="border border-[#B9B9B9] min-h-[100px] px-3 py-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 resize-y lg:px-5 lg:min-h-[120px]"
//                 name="about"
//                 placeholder="Tell us about yourself..."
//                 onChange={handleChange}
//                 value={signUpForm.about}
//                 rows={4}
//               />
//             </div>

//             {/* password */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={handleChange}
//               value={signUpForm.password}
//             />
//             {/* confirm pass */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="password"
//               name="password_confirmation"
//               placeholder="Confirm Password"
//               onChange={handleChange}
//               value={signUpForm.password_confirmation}
//             />

//             {/* Letter file upload */}
//             <div className="w-full text-left">
//               <label className="text-sm font-medium text-[#333333] mb-1 block">
//                 Upload Letter (optional)
//               </label>
//               <input
//                 type="file"
//                 onChange={handleLetterFileChange}
//                 accept=".pdf,.doc,.docx,.txt"
//                 className="h-[50px] px-3 w-full rounded-lg text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#15411F] file:text-white hover:file:bg-[#1a5228] file:cursor-pointer"
//               />
//               {/* Display selected letter file */}
//               {letterFileName && (
//                 <div className="mt-3">
//                   <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
//                     <span className="text-sm text-[#333333] truncate flex-1">
//                       {letterFileName}
//                     </span>
//                     <button
//                       type="button"
//                       onClick={removeLetterFile}
//                       className="ml-2 text-red-500 hover:text-red-700 text-sm font-medium"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Memo file upload */}
//             <div className="w-full text-left">
//               <label className="text-sm font-medium text-[#333333] mb-1 block">
//                 Upload Memo (optional)
//               </label>
//               <input
//                 type="file"
//                 onChange={handleMemoFileChange}
//                 accept=".pdf,.doc,.docx,.txt"
//                 className="h-[50px] px-3 w-full rounded-lg text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#15411F] file:text-white hover:file:bg-[#1a5228] file:cursor-pointer"
//               />
//               {/* Display selected memo file */}
//               {memoFileName && (
//                 <div className="mt-3">
//                   <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
//                     <span className="text-sm text-[#333333] truncate flex-1">
//                       {memoFileName}
//                     </span>
//                     <button
//                       type="button"
//                       onClick={removeMemoFile}
//                       className="ml-2 text-red-500 hover:text-red-700 text-sm font-medium"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <button
//               disabled={
//                 !signUpForm.email ||
//                 !signUpForm.firstname ||
//                 !signUpForm.lastname ||
//                 !signUpForm.password ||
//                 !signUpForm.password_confirmation ||
//                 !signUpForm.role ||
//                 !signUpForm.position ||
//                 loading
//               }
//               className="bg-[#15411F] rounded-lg h-[50px] text-white font-semibold w-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed flex flex-row items-center justify-center gap-x-2 lg:h-[64px]"
//             >
//               {loading && <Loader size={20} color="white" />}
//               <p>{loading ? "Registering..." : "Sign Up"}</p>
//             </button>
//             <div className="text-center">
//               <p className="text-sm transition ease-in-out delay-100 text-[#2B2B2B] font-semibold lg:text-base ">
//                 Already have an account?{" "}
//                 <Link className="hover:underline text-[#15411F] " to={"/login"}>
//                   Login
//                 </Link>
//               </p>
//             </div>
//           </form>
//           <p
//             className={`text-sm text-center font-medium ${
//               theme === "dark" ? "text-white" : "text-[#2A2A2A]"
//             }`}
//           >
//             Copyright © 2025. All Rights Reserved.
//           </p>
//         </div>
//         {/* colorful dots */}
//         <div className="absolute right-0 bottom-0">
//           <img
//             src={bottomImage}
//             draggable={false}
//             alt="img"
//             className="w-[200px] h-auto md:w-[350px] lg:w-[500px]"
//           />
//         </div>
//       </div>
//     </main>
//   );
// }

//---

// import { Link } from "react-router-dom";
// import { useAppContext } from "../context";
// import { useNavigate } from "react-router-dom";
// import { emeka, image5, bottomImage } from "../utils/assets";
// import {
//   validateEmail,
//   validateNames,
//   validatePassword,
//   validatePosition,
// } from "../validation";
// import { useState } from "react";
// import type { SignupForm } from "../entities";
// import { toast } from "sonner";
// import { signup } from "../api/onboarding";
// import Loader from "../components/loader";

// export default function SignUp() {
//   const { theme } = useAppContext();
//   const navigate = useNavigate();

//   const [signUpForm, setSignUpForm] = useState<SignupForm>({
//     firstname: "",
//     lastname: "",
//     email: "",
//     role: "",
//     position: "",
//     password: "",
//     password_confirmation: "",
//     about: "",
//   });
//   const [letterFile, setLetterFile] = useState<File | null>(null);
//   const [memoFile, setMemoFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setSignUpForm((pV) => {
//       return {
//         ...pV,
//         [name]: value,
//       };
//     });
//   };

//   const handleLetterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setLetterFile(e.target.files[0]);
//     }
//   };

//   const handleMemoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setMemoFile(e.target.files[0]);
//     }
//   };

//   const removeLetterFile = () => {
//     setLetterFile(null);
//   };

//   const removeMemoFile = () => {
//     setMemoFile(null);
//   };

//   const signUpUser = async () => {
//     setLoading(true);

//     try {
//       const resp = await signup(
//         signUpForm.firstname,
//         signUpForm.lastname,
//         signUpForm.email,
//         signUpForm.role,
//         signUpForm.position,
//         signUpForm.password,
//         signUpForm.password_confirmation,
//         signUpForm.about,
//         letterFile,
//         memoFile
//       );

//       toast.success(resp.message ? resp.message : "Signup successful");
//       setLoading(false);
//       navigate("/login", { replace: true });
//     } catch (error: any) {
//       setLoading(false);
//       console.error("Signup error:", error);
//       toast.error(
//         error.response?.data?.message || error.message || "Signup failed"
//       );
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     //validate email, first name, last name and password
//     if (signUpForm.password !== signUpForm.password_confirmation) {
//       return toast.error("Password mismatched");
//     }

//     const checkEmail = validateEmail(signUpForm.email);
//     if (checkEmail !== true) return toast.error(checkEmail);

//     const checkfirstname = validateNames(signUpForm.firstname);
//     if (checkfirstname !== true) return toast.error(checkfirstname);

//     const checklastname = validateNames(signUpForm.lastname);
//     if (checklastname !== true) return toast.error(checklastname);

//     const checkPassword = validatePassword(signUpForm.password);
//     if (checkPassword !== true) return toast.error(checkPassword);

//     if (!signUpForm.role.trim()) {
//       return toast.error("Role is required");
//     }

//     if (!signUpForm.position.trim()) {
//       return toast.error("Position is required");
//     }

//     const checkPosition = validatePosition(signUpForm.position);
//     if (checkPosition !== true) return toast.error(checkPosition);

//     const checkRole = validatePosition(signUpForm.role);
//     if (checkRole !== true) return toast.error(checkRole);

//     signUpUser();
//   };

//   return (
//     <main className="h-fit transition ease-in-out delay-100 bg-white ">
//       <div className="relative flex flex-col w-full h-full">
//         {/* white cartoon */}
//         <div className="absolute left-0 top-28">
//           <img
//             src={image5}
//             draggable={false}
//             alt="img"
//             className="w-[100px] h-auto md:w-[250px] lg:w-[350px]"
//           />
//         </div>
//         {/* form */}
//         <div className="h-full flex flex-col justify-between py-10 items-center">
//           <div className="flex flex-col gap-y-0.5 items-center">
//             <img
//               src={emeka}
//               draggable={false}
//               alt="logo"
//               className="w-[80px] h-auto lg:w-[130px]"
//               loading="lazy"
//               decoding="async"
//             />
//             <p className="uppercase text-lg transition ease-in-out text-[#15411F] delay-100 lg:text-xl "></p>
//           </div>
//           <form
//             onSubmit={handleSubmit}
//             className="z-10 flex flex-col gap-y-5 w-full text-center p-6 md:max-w-[461px] lg:max-w-[600px]"
//           >
//             <h2 className="text-lg transition ease-in-out delay-100 text-[#333333] font-semibold ">
//               Signup to Emeka
//             </h2>
//             {/* firstname and lastname */}
//             <div className="flex flex-row gap-x-3 w-full">
//               {/* firstname */}
//               <input
//                 className="border border-[#B9B9B9] h-[50px] px-3 w-full placeholder:text-[#5C5C5C] text-[#333333] rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//                 type="text"
//                 name="firstname"
//                 placeholder="Firstname"
//                 onChange={handleChange}
//                 value={signUpForm.firstname}
//               />
//               {/* lastname */}
//               <input
//                 className="border border-[#B9B9B9] h-[50px] px-3 w-full placeholder:text-[#5C5C5C] text-[#333333] rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//                 type="text"
//                 name="lastname"
//                 placeholder="Lastname"
//                 onChange={handleChange}
//                 value={signUpForm.lastname}
//               />
//             </div>
//             {/* email */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={handleChange}
//               value={signUpForm.email}
//             />
//             {/* role */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="text"
//               name="role"
//               placeholder="Role (e.g., Staff, Admin)"
//               onChange={handleChange}
//               value={signUpForm.role}
//             />
//             {/* position */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="text"
//               name="position"
//               placeholder="Position/Office"
//               onChange={handleChange}
//               value={signUpForm.position}
//             />
//             {/* about textarea */}
//             <div className="w-full text-left">
//               <label className="text-sm font-medium text-[#333333] mb-1 block">
//                 About yourself (optional)
//               </label>
//               <textarea
//                 className="border border-[#B9B9B9] min-h-[100px] px-3 py-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 resize-y lg:px-5 lg:min-h-[120px]"
//                 name="about"
//                 placeholder="Tell us about yourself..."
//                 onChange={handleChange}
//                 value={signUpForm.about}
//                 rows={4}
//               />
//             </div>

//             {/* password */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={handleChange}
//               value={signUpForm.password}
//             />
//             {/* confirm pass */}
//             <input
//               className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
//               type="password"
//               name="password_confirmation"
//               placeholder="Confirm Password"
//               onChange={handleChange}
//               value={signUpForm.password_confirmation}
//             />

//             {/* Letter file upload */}
//             <div className="w-full text-left">
//               <label className="text-sm font-medium text-[#333333] mb-1 block">
//                 Upload Letter (optional)
//               </label>
//               <input
//                 type="file"
//                 onChange={handleLetterFileChange}
//                 accept=".pdf,.doc,.docx,.txt"
//                 className="h-[50px] px-3 w-full rounded-lg text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#15411F] file:text-white hover:file:bg-[#1a5228] file:cursor-pointer"
//               />
//               {/* Display selected letter file */}
//               {letterFile && (
//                 <div className="mt-3">
//                   <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
//                     <span className="text-sm text-[#333333] truncate flex-1">
//                       {letterFile.name}
//                     </span>
//                     <button
//                       type="button"
//                       onClick={removeLetterFile}
//                       className="ml-2 text-red-500 hover:text-red-700 text-sm font-medium"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Memo file upload */}
//             <div className="w-full text-left">
//               <label className="text-sm font-medium text-[#333333] mb-1 block">
//                 Upload Memo (optional)
//               </label>
//               <input
//                 type="file"
//                 onChange={handleMemoFileChange}
//                 accept=".pdf,.doc,.docx,.txt"
//                 className="h-[50px] px-3 w-full rounded-lg text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#15411F] file:text-white hover:file:bg-[#1a5228] file:cursor-pointer"
//               />
//               {/* Display selected memo file */}
//               {memoFile && (
//                 <div className="mt-3">
//                   <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
//                     <span className="text-sm text-[#333333] truncate flex-1">
//                       {memoFile.name}
//                     </span>
//                     <button
//                       type="button"
//                       onClick={removeMemoFile}
//                       className="ml-2 text-red-500 hover:text-red-700 text-sm font-medium"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <button
//               disabled={
//                 !signUpForm.email ||
//                 !signUpForm.firstname ||
//                 !signUpForm.lastname ||
//                 !signUpForm.password ||
//                 !signUpForm.password_confirmation ||
//                 !signUpForm.role ||
//                 !signUpForm.position ||
//                 loading
//               }
//               className="bg-[#15411F] rounded-lg h-[50px] text-white font-semibold w-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed flex flex-row items-center justify-center gap-x-2 lg:h-[64px]"
//             >
//               {loading && <Loader size={20} color="white" />}
//               <p>{loading ? "Registering..." : "Sign Up"}</p>
//             </button>
//             <div className="text-center">
//               <p className="text-sm transition ease-in-out delay-100 text-[#2B2B2B] font-semibold lg:text-base ">
//                 Already have an account?{" "}
//                 <Link className="hover:underline text-[#15411F] " to={"/login"}>
//                   Login
//                 </Link>
//               </p>
//             </div>
//           </form>
//           <p
//             className={`text-sm text-center font-medium ${
//               theme === "dark" ? "text-white" : "text-[#2A2A2A]"
//             }`}
//           >
//             Copyright © 2025. All Rights Reserved.
//           </p>
//         </div>
//         {/* colorful dots */}
//         <div className="absolute right-0 bottom-0">
//           <img
//             src={bottomImage}
//             draggable={false}
//             alt="img"
//             className="w-[200px] h-auto md:w-[350px] lg:w-[500px]"
//           />
//         </div>
//       </div>
//     </main>
//   );
// }

import { Link } from "react-router-dom";
import { useAppContext } from "../context";
import { useNavigate } from "react-router-dom";
import { emeka, image5, bottomImage } from "../utils/assets";
import {
  validateEmail,
  validateNames,
  validatePassword,
  validatePosition,
} from "../validation";
import { useState } from "react";
import type { SignupForm } from "../entities";
import { toast } from "sonner";
import { signup } from "../api/onboarding";
import Loader from "../components/loader";

export default function SignUp() {
  const { theme } = useAppContext();
  const navigate = useNavigate();

  const [signUpForm, setSignUpForm] = useState<SignupForm>({
    firstname: "",
    lastname: "",
    email: "",
    role: "",
    position: "",
    password: "",
    password_confirmation: "",
    about: "",
  });
  const [letterFiles, setLetterFiles] = useState<File[]>([]);
  const [memoFiles, setMemoFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setSignUpForm((pV) => {
      return {
        ...pV,
        [name]: value,
      };
    });
  };

  const handleLetterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setLetterFiles((prev) => [...prev, ...newFiles]);
      e.target.value = ""; // Reset input to allow selecting same file again
    }
  };

  const handleMemoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setMemoFiles((prev) => [...prev, ...newFiles]);
      e.target.value = ""; // Reset input to allow selecting same file again
    }
  };

  const removeLetterFile = (index: number) => {
    setLetterFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeMemoFile = (index: number) => {
    setMemoFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const signUpUser = async () => {
    setLoading(true);

    try {
      const resp = await signup(
        signUpForm.firstname,
        signUpForm.lastname,
        signUpForm.email,
        signUpForm.role,
        signUpForm.position,
        signUpForm.password,
        signUpForm.password_confirmation,
        signUpForm.about,
        letterFiles,
        memoFiles
      );

      toast.success(resp.message ? resp.message : "Signup successful");
      setLoading(false);
      navigate("/login", { replace: true });
    } catch (error: any) {
      setLoading(false);
      console.error("Signup error:", error);
      toast.error(
        error.response?.data?.message || error.message || "Signup failed"
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //validate email, first name, last name and password
    if (signUpForm.password !== signUpForm.password_confirmation) {
      return toast.error("Password mismatched");
    }

    const checkEmail = validateEmail(signUpForm.email);
    if (checkEmail !== true) return toast.error(checkEmail);

    const checkfirstname = validateNames(signUpForm.firstname);
    if (checkfirstname !== true) return toast.error(checkfirstname);

    const checklastname = validateNames(signUpForm.lastname);
    if (checklastname !== true) return toast.error(checklastname);

    const checkPassword = validatePassword(signUpForm.password);
    if (checkPassword !== true) return toast.error(checkPassword);

    if (!signUpForm.role.trim()) {
      return toast.error("Role is required");
    }

    if (!signUpForm.position.trim()) {
      return toast.error("Position is required");
    }

    const checkPosition = validatePosition(signUpForm.position);
    if (checkPosition !== true) return toast.error(checkPosition);

    const checkRole = validatePosition(signUpForm.role);
    if (checkRole !== true) return toast.error(checkRole);

    signUpUser();
  };

  return (
    <main className="h-fit transition ease-in-out delay-100 bg-white ">
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
        <div className="h-full flex flex-col justify-between py-10 items-center">
          <div className="flex flex-col gap-y-0.5 items-center">
            <img
              src={emeka}
              draggable={false}
              alt="logo"
              className="w-[80px] h-auto lg:w-[130px]"
              loading="lazy"
              decoding="async"
            />
            <p className="uppercase text-lg transition ease-in-out text-[#15411F] delay-100 lg:text-xl "></p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="z-10 flex flex-col gap-y-5 w-full text-center p-6 md:max-w-[461px] lg:max-w-[600px]"
          >
            <h2 className="text-lg transition ease-in-out delay-100 text-[#333333] font-semibold ">
              Signup to Emeka
            </h2>
            {/* firstname and lastname */}
            <div className="flex flex-row gap-x-3 w-full">
              {/* firstname */}
              <input
                className="border border-[#B9B9B9] h-[50px] px-3 w-full placeholder:text-[#5C5C5C] text-[#333333] rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
                type="text"
                name="firstname"
                placeholder="Firstname"
                onChange={handleChange}
                value={signUpForm.firstname}
              />
              {/* lastname */}
              <input
                className="border border-[#B9B9B9] h-[50px] px-3 w-full placeholder:text-[#5C5C5C] text-[#333333] rounded-lg focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
                type="text"
                name="lastname"
                placeholder="Lastname"
                onChange={handleChange}
                value={signUpForm.lastname}
              />
            </div>
            {/* email */}
            <input
              className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={signUpForm.email}
            />
            {/* role */}
            <input
              className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
              type="text"
              name="role"
              placeholder="Role (e.g., Staff, Admin)"
              onChange={handleChange}
              value={signUpForm.role}
            />
            {/* position */}
            <input
              className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
              type="text"
              name="position"
              placeholder="Position/Office"
              onChange={handleChange}
              value={signUpForm.position}
            />
            {/* about textarea */}
            <div className="w-full text-left">
              <label className="text-sm font-medium text-[#333333] mb-1 block">
                About yourself (optional)
              </label>
              <textarea
                className="border border-[#B9B9B9] min-h-[100px] px-3 py-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 resize-y lg:px-5 lg:min-h-[120px]"
                name="about"
                placeholder="Tell us about yourself..."
                onChange={handleChange}
                value={signUpForm.about}
                rows={4}
              />
            </div>

            {/* password */}
            <input
              className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={signUpForm.password}
            />
            {/* confirm pass */}
            <input
              className="border border-[#B9B9B9] h-[50px] px-3 w-full rounded-lg placeholder:text-[#5C5C5C] text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px]"
              type="password"
              name="password_confirmation"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={signUpForm.password_confirmation}
            />

            {/* Letter file upload */}
            <div className="w-full text-left">
              <label className="text-sm font-medium text-[#333333] mb-1 block">
                Upload Letters (optional - multiple files supported)
              </label>
              <input
                type="file"
                multiple
                onChange={handleLetterFileChange}
                accept=".pdf,.doc,.docx,.txt, image/png, image/jpg, image/jpeg"
                className="h-[50px] px-3 w-full rounded-lg text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#15411F] file:text-white hover:file:bg-[#1a5228] file:cursor-pointer"
              />
              {/* Display selected letter files */}
              {letterFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {letterFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
                    >
                      <span className="text-sm text-[#333333] truncate flex-1">
                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      </span>
                      <button
                        type="button"
                        onClick={() => removeLetterFile(index)}
                        className="ml-2 text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Memo file upload */}
            <div className="w-full text-left">
              <label className="text-sm font-medium text-[#333333] mb-1 block">
                Upload Memos (optional - multiple files supported)
              </label>
              <input
                type="file"
                multiple
                onChange={handleMemoFileChange}
                accept=".pdf,.doc,.docx,.txt, image/png, image/jpg, image/jpeg"
                className="h-[50px] px-3 w-full rounded-lg text-[#333333] focus:outline-none transition ease-in-out delay-100 lg:px-5 lg:h-[64px] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#15411F] file:text-white hover:file:bg-[#1a5228] file:cursor-pointer"
              />
              {/* Display selected memo files */}
              {memoFiles.length > 0 && (
                <div className="mt-3 space-y-2">
                  {memoFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 p-2 rounded-lg"
                    >
                      <span className="text-sm text-[#333333] truncate flex-1">
                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      </span>
                      <button
                        type="button"
                        onClick={() => removeMemoFile(index)}
                        className="ml-2 text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              disabled={
                !signUpForm.email ||
                !signUpForm.firstname ||
                !signUpForm.lastname ||
                !signUpForm.password ||
                !signUpForm.password_confirmation ||
                !signUpForm.role ||
                !signUpForm.position ||
                loading
              }
              className="bg-[#15411F] rounded-lg h-[50px] text-white font-semibold w-full cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed flex flex-row items-center justify-center gap-x-2 lg:h-[64px]"
            >
              {loading && <Loader size={20} color="white" />}
              <p>{loading ? "Registering..." : "Sign Up"}</p>
            </button>
            <div className="text-center">
              <p className="text-sm transition ease-in-out delay-100 text-[#2B2B2B] font-semibold lg:text-base ">
                Already have an account?{" "}
                <Link className="hover:underline text-[#15411F] " to={"/login"}>
                  Login
                </Link>
              </p>
            </div>
          </form>
          <p
            className={`text-sm text-center font-medium ${
              theme === "dark" ? "text-white" : "text-[#2A2A2A]"
            }`}
          >
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
