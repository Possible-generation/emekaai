// import api from "../axios";

// export const signup = async (
//   firstName: string,
//   lastName: string,
//   email: string,
//   role: string,
//   position: string,
//   password: string,
//   password_confirmation: string
// ) => {
//   const formData = {
//     full_name: `${firstName} ${lastName}`,
//     email: email,
//     password: password,
//     role: role,
//     position: position,
//     password_confirmation: password_confirmation,
//   };

//   const response = await api.post(`/v1/auth/register`, formData, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   return response.data;
// };

// night------------------
// import api from "../axios";

// export const signup = async (
//   firstName: string,
//   lastName: string,
//   email: string,
//   role: string,
//   position: string,
//   password: string,
//   password_confirmation: string
// ) => {
//   try {
//     const formData = {
//       full_name: `${firstName} ${lastName}`,
//       email: email,
//       password: password,
//       role: role,
//       position: position,
//       password_confirmation: password_confirmation,
//     };

//     // 👉 Log exactly what you are sending to backend
//     console.log("FORM DATA SENT TO BACKEND:", formData);

//     const response = await api.post(`/v1/auth/register`, formData, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     return response.data;
//   } catch (error: any) {
//     if (error.response && error.response.data) {
//       throw new Error(
//         (error.response.data.message && error.response.data.errors) ||
//           "Signup failed"
//       );
//     }

//     throw new Error("Network error. Please try again.");
//   }
// };

// import api from "../axios";

// export const signup = async (
//   firstName: string,
//   lastName: string,
//   email: string,
//   role: string,
//   position: string,
//   password: string,
//   password_confirmation: string,
//   about: string,
//   letterFile?: File | null,
//   memoFile?: File | null
// ) => {
//   // Create FormData to handle file uploads
//   const formData = new FormData();

//   formData.append("full_name", `${firstName} ${lastName}`);
//   formData.append("email", email);
//   formData.append("password", password);
//   formData.append("password_confirmation", password_confirmation);
//   formData.append("role", role);
//   formData.append("position", position);

//   // Add optional about field
//   if (about) {
//     formData.append("about", about);
//   }

//   // Add optional letter file
//   if (letterFile) {
//     formData.append("letter", letterFile);
//   }

//   // Add optional memo file
//   if (memoFile) {
//     formData.append("memo", memoFile);
//   }
//   console.log("Sending formData:");
//   const response = await api.post(`/v1/auth/register`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data;
// };

// import api from "../axios";

// export const signup = async (
//   firstName: string,
//   lastName: string,
//   email: string,
//   role: string,
//   position: string,
//   password: string,
//   password_confirmation: string,
//   about: string,
//   letter: string,
//   memo: string
// ) => {
//   // Create FormData to handle file uploads
//   const formData = new FormData();

//   formData.append("full_name", `${firstName} ${lastName}`);
//   formData.append("email", email);
//   formData.append("password", password);
//   formData.append("password_confirmation", password_confirmation);
//   formData.append("role", role);
//   formData.append("position", position);

//   // Add optional about field - only if it has a value
//   if (about && about.trim()) {
//     formData.append("about", about);
//   }

//   // Add optional letter file
//   if (letter) {
//     formData.append("letter", letter);
//   }

//   // Add optional memo file
//   if (memo) {
//     formData.append("memo", memo);
//   }

//   // Log what we're sending for debugging
//   console.log("Sending FormData:");
//   for (let [key, value] of formData.entries()) {
//     if (value instanceof File) {
//       console.log(`${key}: File - ${value.name} (${value.size} bytes)`);
//     } else {
//       console.log(`${key}: ${value}`);
//     }
//   }

//   const response = await api.post(`/v1/auth/register`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data;
// };

// import api from "../axios";

// export const signup = async (
//   firstName: string,
//   lastName: string,
//   email: string,
//   role: string,
//   position: string,
//   password: string,
//   password_confirmation: string,
//   about: string,
//   letter: File | null,
//   memo: File | null
// ) => {
//   const formData = new FormData();

//   formData.append("full_name", `${firstName} ${lastName}`);
//   formData.append("email", email);
//   formData.append("password", password);
//   formData.append("password_confirmation", password_confirmation);
//   formData.append("role", role);
//   formData.append("position", position);

//   if (about.trim()) formData.append("about", about);

//   if (letter) formData.append("letter", letter);
//   if (memo) formData.append("memo", memo);

//   const response = await api.post(`/v1/auth/register`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

//   return response.data;
// };

// import api from "../axios";

// export const signup = async (
//   firstName: string,
//   lastName: string,
//   email: string,
//   role: string,
//   position: string,
//   password: string,
//   password_confirmation: string,
//   about: string,
//   letterFile?: File | null,
//   memoFile?: File | null
// ) => {
//   // Create FormData to handle file uploads
//   const formData = new FormData();

//   // Add required fields
//   formData.append("full_name", `${firstName} ${lastName}`);
//   formData.append("email", email);
//   formData.append("password", password);
//   formData.append("password_confirmation", password_confirmation);
//   formData.append("role", role);
//   formData.append("position", position);

//   // Add optional about field - send empty string if not provided (backend expects string | null)
//   formData.append("about", about || "");

//   // Add optional letter file - don't append if null
//   if (letterFile) {
//     formData.append("letter", letterFile);
//   }

//   // Add optional memo file - don't append if null
//   if (memoFile) {
//     formData.append("memo", memoFile);
//   }

//   // Console log what we're sending to backend
//   console.log("Sending to backend:");
//   for (let [key, value] of formData.entries()) {
//     if (value instanceof File) {
//       console.log(
//         `${key}:`,
//         `[FILE: ${value.name}, ${(value.size / 1024).toFixed(2)} KB]`
//       );
//     } else {
//       console.log(`${key}:`, value);
//     }
//   }

//   try {
//     // Let the browser set Content-Type automatically with boundary
//     const response = await api.post(`/v1/auth/register`, formData);
//     return response.data;
//   } catch (error: any) {
//     console.error("Backend error:", error.response?.data);
//     throw error;
//   }
// };

// import api from "../axios";

// export const signup = async (
//   firstName: string,
//   lastName: string,
//   email: string,
//   role: string,
//   position: string,
//   password: string,
//   password_confirmation: string,
//   about: string,
//   letterFiles?: File[],
//   memoFiles?: File[]
// ) => {
//   // Create FormData to handle file uploads
//   const formData = new FormData();

//   // Add required fields
//   formData.append("full_name", `${firstName} ${lastName}`);
//   formData.append("email", email);
//   formData.append("password", password);
//   formData.append("password_confirmation", password_confirmation);
//   formData.append("role", role);
//   formData.append("position", position);

//   // Add optional about field - send empty string if not provided (backend expects string | null)
//   formData.append("about", about || "");

//   // Add multiple letter files if provided
//   if (letterFiles && letterFiles.length > 0) {
//     letterFiles.forEach((file, index) => {
//       formData.append(`letter[${index}]`, file);
//     });
//   }

//   // Add multiple memo files if provided
//   if (memoFiles && memoFiles.length > 0) {
//     memoFiles.forEach((file, index) => {
//       formData.append(`memo[${index}]`, file);
//     });
//   }

//   // Console log what we're sending to backend
//   console.log("Sending to backend:");
//   for (let [key, value] of formData.entries()) {
//     if (value instanceof File) {
//       console.log(
//         `${key}:`,
//         `[FILE: ${value.name}, ${(value.size / 1024).toFixed(2)} KB]`
//       );
//     } else {
//       console.log(`${key}:`, value);
//     }
//   }

//   try {
//     // Let the browser set Content-Type automatically with boundary
//     const response = await api.post(`/v1/auth/register`, formData);

//     return response.data;
//   } catch (error: any) {
//     console.error("Backend error:", error.response?.data.errors);
//     throw error;
//   }
// };

import api from "../axios";

export const signup = async (
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  position: string,
  password: string,
  password_confirmation: string,
  about: string,
  letterFiles?: File[],
  memoFiles?: File[]
) => {
  // Create FormData to handle file uploads
  const formData = new FormData();

  // Add required fields
  formData.append("full_name", `${firstName} ${lastName}`);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("password_confirmation", password_confirmation);
  formData.append("role", role);
  formData.append("position", position);

  // Add optional about field - send empty string if not provided (backend expects string | null)
  formData.append("about", about || "");

  // Add multiple letter files if provided - use the same key name for multiple files
  if (letterFiles && letterFiles.length > 0) {
    letterFiles.forEach((file) => {
      formData.append("letter", file); // Use the same key "letter" for all files
    });
  }

  // Add multiple memo files if provided - use the same key name for multiple files
  if (memoFiles && memoFiles.length > 0) {
    memoFiles.forEach((file) => {
      formData.append("memo", file); // Use the same key "memo" for all files
    });
  }

  // Console log what we're sending to backend
  console.log("Sending to backend:");
  for (let [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(
        `${key}:`,
        `[FILE: ${value.name}, ${(value.size / 1024).toFixed(2)} KB]`
      );
    } else {
      console.log(`${key}:`, value);
    }
  }

  try {
    // Let the browser set Content-Type automatically with boundary
    const response = await api.post(`/v1/auth/register`, formData);

    return response.data;
  } catch (error: any) {
    console.error("Backend error:", error.response?.data.errors);
    throw error;
  }
};
