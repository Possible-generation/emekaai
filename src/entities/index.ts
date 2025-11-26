export interface WhyUs {
  title: string;
  info: string;
}

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export interface ChatHistory {
  title: string;
  //message? : Message[]
  timestamp: string;
}

// export interface SignupForm {
//   firstname: string;
//   lastname: string;
//   email: string;
//   role: string;
//   position: string;
//   about: string | null;
//   password: string;
//   password_confirmation: string;
//   letter: string | null;
//   memo: string | null;
// }

// export interface SignupForm {
//   firstname: string;
//   lastname: string;
//   email: string;
//   role: string;
//   position: string;
//   about: string;
//   password: string;
//   password_confirmation: string;
// }

export interface SignupForm {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  position: string;
  password: string;
  password_confirmation: string;
  about: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export type User = {
  email: string;
  name: string;
  id: number;
  role: string;
};

type UserLastMessage = {
  content: string;
  sender: string;
  created_at: string;
};

export interface UserConversations {
  id: string;
  title: string;
  last_updated: string;
  last_message: UserLastMessage;
}

export interface Messages {
  id: string | null;
  sender: string;
  content: string;
  type: string | null;
  media_url: string | null;
  media_type: "audio" | "image" | null;
  created_at: string | null;
}
