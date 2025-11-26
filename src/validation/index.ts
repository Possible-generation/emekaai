// //email
// export const validateEmail = (email: string): string | true => {
//   const hasSpeChar1 = /[@]/.test(email);
//   const hasSpeChar2 = /[.]/.test(email);
//   const hasNoSpaces = !/\s/.test(email);
//   if (!hasNoSpaces) {
//     const err = "Email should contain no spaces";
//     return err;
//   }
//   if (!hasSpeChar1 || !hasSpeChar2) {
//     const err = "Not a valid email";
//     return err;
//   }
//   return true;
// };

// //normal strings
// export const validateNames = (name: string): string | true => {
//   const minLength = 2;
//   const hasNoSpaces = !/\s/.test(name);

//   if (!hasNoSpaces) {
//     const err = "Name cannot contain spaces";
//     return err;
//   }
//   if (name.length < minLength) {
//     const err = "Name characters too short";
//     return err;
//   }
//   return true;
// };

// //password
// export const validatePassword = (password: string): string | true => {
//   //
//   const minLength = 8; // Optional: Enforce a minimum length
//   const hasUpperCase = /[A-Z]/.test(password);
//   const hasLowerCase = /[a-z]/.test(password);
//   const hasNumber = /[0-9]/.test(password);
//   const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
//   const hasNoSpaces = !/\s/.test(password);

//   if (password.length < minLength) {
//     const err = `Password must be at least ${minLength} characters long`;
//     return err;
//   }
//   if (!hasUpperCase) {
//     const err = "Password must contain at least one uppercase letter";
//     return err;
//   }
//   if (!hasLowerCase) {
//     const err = "Password must contain at least one lowercase letter";
//     return err;
//   }
//   if (!hasNumber) {
//     const err = "Password must contain at least one number";
//     return err;
//   }
//   if (!hasNoSpaces) {
//     const err = "Password must not contain spaces";
//     return err;
//   }
//   if (!hasSpecialChar) {
//     const err = "Password must contain at least one special character";
//     return err;
//   }

//   return true;
// };

// export const validateInput = (text: string, name: string): string | true => {
//   const minLength = 2;
//   const hasAlphabets = /[a-zA-Z0-9]/.test(text);

//   if (!hasAlphabets) {
//     const err = `${name} is invalid.`;
//     return err;
//   }

//   if (minLength > text.length) {
//     const err = "Input is too short.";
//     return err;
//   }
//   return true;
// };

//email
export const validateEmail = (email: string): string | true => {
  const hasSpeChar1 = /[@]/.test(email);
  const hasSpeChar2 = /[.]/.test(email);
  const hasNoSpaces = !/\s/.test(email);
  if (!hasNoSpaces) {
    const err = "Email should contain no spaces";
    return err;
  }
  if (!hasSpeChar1 || !hasSpeChar2) {
    const err = "Not a valid email";
    return err;
  }
  return true;
};

//normal strings - UPDATED to allow spaces for compound names
export const validateNames = (name: string): string | true => {
  const minLength = 2;

  // Trim to remove leading/trailing spaces
  const trimmedName = name.trim();

  // Check if name is too short
  if (trimmedName.length < minLength) {
    const err = "Name characters too short";
    return err;
  }

  // Check if name contains only letters and spaces
  const hasValidChars = /^[a-zA-Z\s]+$/.test(trimmedName);
  if (!hasValidChars) {
    const err = "Name should contain only letters";
    return err;
  }

  return true;
};

//password
export const validatePassword = (password: string): string | true => {
  //
  const minLength = 8; // Optional: Enforce a minimum length
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNoSpaces = !/\s/.test(password);

  if (password.length < minLength) {
    const err = `Password must be at least ${minLength} characters long`;
    return err;
  }
  if (!hasUpperCase) {
    const err = "Password must contain at least one uppercase letter";
    return err;
  }
  if (!hasLowerCase) {
    const err = "Password must contain at least one lowercase letter";
    return err;
  }
  if (!hasNumber) {
    const err = "Password must contain at least one number";
    return err;
  }
  if (!hasNoSpaces) {
    const err = "Password must not contain spaces";
    return err;
  }
  if (!hasSpecialChar) {
    const err = "Password must contain at least one special character";
    return err;
  }

  return true;
};

export const validateInput = (text: string, name: string): string | true => {
  const minLength = 2;
  const hasAlphabets = /[a-zA-Z0-9]/.test(text);

  if (!hasAlphabets) {
    const err = `${name} is invalid.`;
    return err;
  }

  if (minLength > text.length) {
    const err = "Input is too short.";
    return err;
  }
  return true;
};

// NEW: Validate position/role fields
export const validatePosition = (position: string): string | true => {
  const minLength = 2;

  // Trim to remove leading/trailing spaces
  const trimmedPosition = position.trim();

  // Check if position is too short
  if (trimmedPosition.length < minLength) {
    const err = "Position is too short";
    return err;
  }

  // Allow letters, numbers, spaces, and common punctuation
  const hasValidChars = /^[a-zA-Z0-9\s,.\-/]+$/.test(trimmedPosition);
  if (!hasValidChars) {
    const err = "Position contains invalid characters";
    return err;
  }

  return true;
};
