// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { GiHamburgerMenu } from "react-icons/gi";
// import { useAppContext } from "../context";
// import { IoMdAttach } from "react-icons/io";
// import { GiSoundWaves } from "react-icons/gi";
// import { AiOutlineClose } from "react-icons/ai";
// import { validateInput } from "../validation";
// import { useNavigate } from "react-router-dom";
// import { FaUserLarge, FaCircleStop } from "react-icons/fa6";
// // import welcomeSpeech from "../assets/audio/intro-voice.wav";
// import RecordRTC from "recordrtc";
// import IntroMessage from "../components/chat/IntroSection";
// import Sidebar from "../components/chat/Sidebar";
// import { useEffect, useRef, useState } from "react";
// import { FiSend } from "react-icons/fi";
// import { FaMicrophone } from "react-icons/fa";
// import ChatBox from "../components/chat/Chat";
// import { getConversations } from "../api/conversation/getConversations";
// import { getConversation } from "../api/conversation/getConversation";
// import { toast } from "sonner";
// import type { Messages, UserConversations } from "../entities";
// import Loader from "../components/loader";
// import { postMessage } from "../api/conversation";

// export interface ConversationsController {
//   loader: boolean;
//   user_conversations: UserConversations[] | undefined;
// }

// export interface UserConversation {
//   loader: boolean;
//   msgs: Messages[] | undefined;
// }

// interface ImageHandler {
//   url: string;
//   file: File;
//   previewImage: string;
// }

// export default function Chat() {
//   const navigate = useNavigate();
//   const {
//     theme,
//     accessToken,
//     formatTimestamp,
//     user,
//     setAccessToken,
//     setUser,
//     thread,
//     setThread,
//   } = useAppContext();
//   const userMsgRef: any = useRef(null);
//   const [openAside, setOpenAside] = useState<boolean>(false);
//   // user convos variables begins
//   const [conversations, setConversations] = useState<ConversationsController>({
//     loader: false,
//     user_conversations: undefined,
//   });
//   const [messages, setMessages] = useState<UserConversation>({
//     loader: false,
//     msgs: undefined,
//   });
//   //user convos variables end

//   const [currConvId, setCurrConvId] = useState<string>();
//   const [refetchMsgs, setRefetchMsgs] = useState<boolean>(false);
//   const [isNewChat, setIsNewChat] = useState<boolean>(true);
//   const [userMsg, setUserMsg] = useState<string>("");
//   const [error, setError] = useState<boolean>(false);
//   const [isTyping, setIsTyping] = useState<boolean>(false);
//   const [chatTitle, setChatTitle] = useState<string>("New Query");
//   const [image, setImage] = useState<ImageHandler>();
//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   //speech recognition variables begins
//   const recorderRef = useRef<RecordRTC | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const [audioUrl, setAudioUrl] = useState<string | null>(null);
//   const [voiceNote, setVoiceNote] = useState<Blob>();
//   const [recording, setRecording] = useState<boolean>(false);
//   const [switchMediaUrl, setSwitchMediaUrl] = useState<boolean>(false);
//   const [newMediaUrl, setNewMediaUrl] = useState<string>();
//   //speech recognition variables ends

//   //search history
//   const [searchText, setSearchText] = useState<string>("");
//   const [queries, setQueries] = useState<UserConversations[]>();

//   const filterSearchText = (text: string) => {
//     const filteredArr = conversations.user_conversations?.filter((conv) =>
//       conv.title.toLowerCase().includes(text.toLowerCase())
//     );
//     return filteredArr ? filteredArr : [];
//   };

//   const updateMediaUrl = async (updatedUrl: string) => {
//     if (thread.length !== 1) {
//       const user_media_message = thread[thread.length - 2];
//       setThread((prev) =>
//         prev.map((item) =>
//           item === user_media_message
//             ? { ...item, media_url: updatedUrl }
//             : item
//         )
//       );
//     }
//   };

//   const setMedia = (): null | string => {
//     if (image?.url) return image.url;
//     if (audioUrl) return audioUrl;
//     return null;
//   };

//   const fetchPrevMsgs = async () => {
//     if (!accessToken) return toast.error("Unauthenticated");

//     setConversations((prevState) => {
//       return {
//         ...prevState,
//         loader: true,
//       };
//     });

//     await getConversations(accessToken)
//       .then((resp) => {
//         if (resp.data)
//           setConversations({
//             loader: false,
//             user_conversations: resp.data,
//           });
//         setQueries(resp.data);
//         if (refetchMsgs === true) setRefetchMsgs(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setConversations((prevState) => {
//           return {
//             ...prevState,
//             loader: false,
//           };
//         });
//       });
//   };

//   const setMediaType = (url: string): "image" | "audio" | null => {
//     if (!url) return null;
//     if (url.includes(".webm")) return "audio";
//     if (url.includes("image")) return "image";
//     return null;
//   };

//   const sendMessage = async () => {
//     if (userMsgRef.current) userMsgRef.current.value = "";
//     if (isNewChat) setIsNewChat(false);
//     setIsTyping(true);

//     if (accessToken) {
//       //data setup sent to the server
//       const data = {
//         id: currConvId ? currConvId : null,
//         message: userMsg ? userMsg : "",
//         file: image?.file ? image.file : null,
//         voice_note: voiceNote ? voiceNote : null,
//       };

//       //user message object added to thread array
//       const userMessage: Messages = {
//         id: currConvId ? currConvId : "",
//         sender: "user",
//         content: userMsg,
//         type: null,
//         media_url: setMedia(),
//         media_type: audioUrl ? "audio" : image?.url ? "image" : null,
//         created_at: null,
//       };

//       //push the object to thread array
//       setThread((prevState) => {
//         return [...prevState, userMessage];
//       });

//       postMessage(
//         data.id,
//         data.message,
//         data.file,
//         data.voice_note,
//         accessToken
//       )
//         .then((resp) => {
//           if (resp.status === "success" && resp.data) {
//             if (!currConvId) setRefetchMsgs(true);
//             //create assistant message object
//             const assistantMessage: Messages = {
//               id: resp.data.conversation_id,
//               sender: "ai",
//               content: resp.data.reply,
//               type: resp.data.type ? resp.data.type : null,
//               media_url: resp.data.media_url ? resp.data.media_url : null,
//               media_type: setMediaType(resp.data.media_url),
//               created_at: resp.data.created_at ? resp.data.created_at : null,
//             };
//             //set chat id
//             setCurrConvId(resp.data.conversation_id);
//             //push assistant message object to thread array
//             setThread((prevState) => {
//               return [...prevState, assistantMessage];
//             });
//             //update audio url
//             if (resp.data.voice_url) {
//               setSwitchMediaUrl(true);
//               setNewMediaUrl(resp.data.voice_url);
//             }
//             // //update image url
//             if (resp.data.file_url) {
//               setSwitchMediaUrl(true);
//               setNewMediaUrl(resp.data.file_url);
//             }
//             //reset other states
//             setIsTyping(false);
//             setUserMsg("");
//             if (audioUrl) setAudioUrl(null);
//             if (voiceNote) setVoiceNote(undefined);
//           }
//         })
//         .catch((error) => {
//           setIsTyping(false);
//           setUserMsg("");
//           if (audioUrl) setAudioUrl(null);
//           if (voiceNote) setVoiceNote(undefined);
//           toast.error(
//             error.response.data.message
//               ? error.response.data.message
//               : "Failed to send message"
//           );
//           // toast.error("Failed to send message");
//           // console.log(error);
//         });

//       if (image?.url || image?.file) setImage(undefined);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const validateMsg = validateInput(userMsg, "message");
//     if (validateMsg !== true) toast.error(validateMsg);
//     sendMessage();
//   };

//   const fetchConversation = async (e: string, title: string) => {
//     if (e === currConvId) return toast.warning("Already set to conversation.");

//     setChatTitle(title);

//     if (error) setError(false);

//     if (!accessToken) return toast.error("Unauthenticated");
//     setMessages((prevState) => {
//       return {
//         ...prevState,
//         loader: true,
//       };
//     });

//     await getConversation(e, accessToken)
//       .then((resp) => {
//         if (resp.data) {
//           setMessages({
//             loader: false,
//             msgs: resp.data.messages,
//           });
//           setCurrConvId(resp.data.conversation_id);
//         }
//         setIsNewChat(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setError(true);
//         setMessages((prevState) => {
//           return {
//             ...prevState,
//             loader: false,
//           };
//         });
//       });
//   };

//   const initiateLogout = () => {
//     setAccessToken(undefined);
//     setCurrConvId("");
//     setUser(undefined);
//     setThread([]);
//     navigate("/", { replace: true });
//   };

//   const initiateNewChat = () => {
//     //remove error display
//     if (error) setError(false);
//     //remove open sidebar
//     setOpenAside(false);
//     //reveal welcome chat interface
//     setIsNewChat(true);
//     //reset current chat ID
//     setCurrConvId(undefined);
//     //reset thread
//     if (thread.length > 1) setThread([]);
//     setChatTitle("New Query");
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const systemfile = e.target.files?.[0];
//     if (systemfile) {
//       if (isNewChat) setIsNewChat(false);
//       if (audioUrl) setAudioUrl(null);
//       const localURL = URL.createObjectURL(systemfile);
//       // setImageURL(localURL);
//       setImage({
//         url: "Processing figure...",
//         file: systemfile,
//         previewImage: localURL,
//       });
//     }
//   };

//   //RECORDING EVENTS
//   const startRecording = async () => {
//     if (userMsgRef.current) userMsgRef.current.value = "";
//     if (image?.url || image?.file) setImage(undefined);

//     if (switchMediaUrl) setSwitchMediaUrl(false);
//     if (newMediaUrl) setNewMediaUrl(undefined);

//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//     streamRef.current = stream;

//     const recorder = new RecordRTC(stream, {
//       type: "audio",
//       sampleRate: 48000,
//       checkForInactiveTracks: true,
//       mimeType: "audio/webm",
//       disableLogs: true,
//     });
//     recorder.startRecording();
//     recorderRef.current = recorder;
//     setRecording(true);
//   };

//   const stopRecording = async () => {
//     if (!recorderRef.current) return;
//     recorderRef.current.stopRecording(() => {
//       const blob = recorderRef.current?.getBlob();
//       if (blob) {
//         setVoiceNote(blob);
//         // const url = blob ? URL.createObjectURL(blob) : null;
//         // setAudioUrl(url);
//         setAudioUrl("Processing audio...");
//       }
//     });

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }
//     setRecording(false);
//   };

//   useEffect(() => {
//     //fetch all queries and focus on input text
//     fetchPrevMsgs();
//     userMsgRef.current.focus();

//     //welcome speech by Chidi
//     // const welcomeAudio = new Audio(welcomeSpeech);
//     // welcomeAudio.playbackRate = 0.8;
//     // welcomeAudio.play().catch(console.error);

//     // return () => {
//     //   welcomeAudio.pause();
//     //   welcomeAudio.src = "";
//     // };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (searchText === "") {
//       setQueries(conversations.user_conversations);
//     } else {
//       setQueries(filterSearchText(searchText));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchText]);

//   useEffect(() => {
//     //if a new query is started, fetch previous queries
//     if (refetchMsgs === true) {
//       fetchPrevMsgs();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [refetchMsgs]);

//   useEffect(() => {
//     if (audioUrl) {
//       sendMessage();
//       recorderRef.current = null;
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [audioUrl]);

//   useEffect(() => {
//     if (switchMediaUrl) {
//       if (newMediaUrl) updateMediaUrl(newMediaUrl);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [switchMediaUrl]);

//   useEffect(() => {
//     if (messages.msgs) setThread(messages.msgs);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [messages.msgs]);

//   useEffect(() => {
//     //smooth scroll to bottom of chat
//     bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
//   }, [thread]);

//   return (
//     <main
//       className={`h-screen relative md:flex ${
//         theme === "dark" ? "bg-[#1A1D18]" : "bg-white"
//       }`}
//     >
//       {/* sidebar */}
//       <Sidebar
//         initiateLogout={initiateLogout}
//         setOpenAside={setOpenAside}
//         fetchConversation={fetchConversation}
//         formatTimestamp={formatTimestamp}
//         conversations={conversations}
//         openAside={openAside}
//         theme={theme}
//         initiateNewChat={initiateNewChat}
//         currConvId={currConvId}
//         setSearchText={setSearchText}
//         queries={queries}
//       />
//       <div
//         onClick={() => setOpenAside(false)}
//         className={`absolute w-full h-full bg-[#0A1F0FBD] transition-all ease-in-out delay-75 z-10 md:hidden ${
//           openAside ? "left-0" : "-left-full"
//         }`}
//       />
//       <section
//         className={`flex flex-col h-full md:w-full transition ease-in-out delay-100 sm:overflow-hidden ${
//           theme === "dark" ? "text-white" : "text-[#333333]"
//         }`}
//       >
//         <header className="flex flex-row items-center justify-between p-5 lg:mb-2">
//           <div className="flex flex-row gap-x-3 items-center">
//             <button
//               onClick={() => setOpenAside(true)}
//               className="cursor-pointer md:hidden"
//             >
//               <GiHamburgerMenu size={20} />
//             </button>
//             <h2 className="text-lg font-bold">
//               {chatTitle.length > 15
//                 ? chatTitle.slice(0, 15).concat("...")
//                 : chatTitle}
//             </h2>
//           </div>
//           <div className="flex flex-row gap-x-2 items-center">
//             <div
//               draggable={false}
//               className={`min-w-[30px] max-w-[30px] h-[30px] rounded-full flex items-center justify-center ${
//                 theme === "dark"
//                   ? "bg-white text-[#1A1D18]"
//                   : "text-white bg-[#1A1D18]"
//               }`}
//             >
//               <FaUserLarge />
//             </div>
//             <div className="flex flex-col gap-y-0.5">
//               <h3 className="font-semibold">{user?.name}</h3>
//               <p className="text-xs capitalize">{user?.role}</p>
//             </div>
//             {/* <button className="cursor-pointer">
//               <BsChevronDown />
//             </button> */}
//           </div>
//         </header>
//         {/* chat box */}
//         <div className="relative flex flex-col items-center flex-grow">
//           {/* new chat welcome message */}
//           {isNewChat && !messages.loader && !error && (
//             <IntroMessage theme={theme} />
//           )}
//           {/* chat messages */}
//           {!isNewChat && !messages.loader && !error && (
//             <ChatBox
//               isTyping={isTyping}
//               bottomRef={bottomRef}
//               theme={theme}
//               messages={thread}
//             />
//           )}
//           {/* text input */}
//           {messages.loader && (
//             <div className="flex-1 w-full h-[300px] flex flex-col gap-y-1 text-sm items-center justify-center lg:text-lg">
//               <Loader
//                 color={theme === "dark" ? "white" : "#5c5c5c"}
//                 size={18}
//               />
//               <p>Loading messages...</p>
//             </div>
//           )}
//           {/* error in network */}
//           {error && (
//             <p className="text-red-700 text-xs text-center lg:text-sm px-5">
//               Error in getting messages. <br /> Please click on selected chat to
//               reload or check your network connection.
//             </p>
//           )}
//           <form
//             onSubmit={handleSubmit}
//             className={`rounded-xl h-fit flex flex-col gap-y-1 transition ease-in-out delay-100 ${
//               isNewChat
//                 ? "max-w-[382px] mt-10 w-full"
//                 : "absolute bottom-3 w-[90%] lg:bottom-5"
//             } ${
//               theme === "dark"
//                 ? "bg-[#292D25] text-white"
//                 : "bg-[#EBEBEB] text-[#333333]"
//             } ${messages.loader || error ? "hidden" : "flex"}`}
//           >
//             {/* image preview */}
//             {!isNewChat && image?.previewImage && (
//               <div className="w-[100px] h-auto p-3 relative lg:w-[150px]">
//                 <img
//                   className="w-full h-fit"
//                   src={image?.previewImage}
//                   draggable={false}
//                   alt="img"
//                   loading="lazy"
//                   decoding="async"
//                 />
//                 <button
//                   onClick={() => setImage(undefined)}
//                   className="absolute top-1 right-0 w-[20px] h-[20px] bg-red-800 rounded-full flex items-center justify-center cursor-pointer"
//                 >
//                   <AiOutlineClose size={14} />
//                 </button>
//               </div>
//             )}
//             <div className="flex items-center justify-center gap-x-0.5 h-[67px] py-2 px-5">
//               <div className="cursor-pointer relative">
//                 <IoMdAttach size={24} className="rotate-30" />
//                 <input
//                   type="file"
//                   accept="image/png, image/jpg, image/jpeg"
//                   className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 appearance-none opacity-0"
//                   maxLength={2 * 1024 * 1024}
//                   name="file"
//                   onChange={(e) => {
//                     if (voiceNote) setVoiceNote(undefined);
//                     if (audioUrl) setAudioUrl(null);
//                     if (switchMediaUrl) setSwitchMediaUrl(false);
//                     if (newMediaUrl) setNewMediaUrl(undefined);
//                     handleImageChange(e);
//                   }}
//                 />
//               </div>
//               {recording ? (
//                 <div className="flex flex-1 items-center justify-center">
//                   <GiSoundWaves size={40} />
//                 </div>
//               ) : (
//                 <input
//                   className="rounded-lg focus:outline-none h-full w-full px-3"
//                   placeholder="| Type message here..."
//                   name="userMsg"
//                   ref={userMsgRef}
//                   onChange={(e) => {
//                     if (voiceNote) setVoiceNote(undefined);
//                     if (audioUrl) setAudioUrl(null);
//                     if (switchMediaUrl) setSwitchMediaUrl(false);
//                     if (newMediaUrl) setNewMediaUrl(undefined);
//                     setUserMsg(e.target.value);
//                   }}
//                 />
//               )}
//               <div
//                 onClick={!recording ? startRecording : stopRecording}
//                 className="min-w-[30px] max-w-[30px] h-[30px] mr-1 rounded-full flex items-center justify-center text-inherit hover:cursor-pointer hover:bg-[#ffffff09] transition delay-100 ease-in-out"
//               >
//                 {!recording ? (
//                   <FaMicrophone size={20} />
//                 ) : (
//                   <FaCircleStop size={25} />
//                 )}
//               </div>
//               <button
//                 disabled={isTyping || !userMsg}
//                 className="rotate-45 cursor-pointer disabled:text-[#5c5c5c] disabled:cursor-not-allowed"
//               >
//                 <FiSend size={23} />
//               </button>
//             </div>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
// import { GiHamburgerMenu } from "react-icons/gi";
// import { useAppContext } from "../context";
// import { IoMdAttach } from "react-icons/io";
// import { GiSoundWaves } from "react-icons/gi";
// import { AiOutlineClose } from "react-icons/ai";
// import { validateInput } from "../validation";
// import { useNavigate } from "react-router-dom";
// import { FaUserLarge, FaCircleStop } from "react-icons/fa6";
// import RecordRTC from "recordrtc";
// import IntroMessage from "../components/chat/IntroSection";
// import Sidebar from "../components/chat/Sidebar";
// import { useEffect, useRef, useState } from "react";
// import { FiSend } from "react-icons/fi";
// import { FaMicrophone } from "react-icons/fa";
// import ChatBox from "../components/chat/Chat";
// import { getConversations } from "../api/conversation/getConversations";
// import { getConversation } from "../api/conversation/getConversation";
// import { toast } from "sonner";
// import type { Messages, UserConversations } from "../entities";
// import Loader from "../components/loader";
// import { postMessage } from "../api/conversation";

// export interface ConversationsController {
//   loader: boolean;
//   user_conversations: UserConversations[] | undefined;
// }

// export interface UserConversation {
//   loader: boolean;
//   msgs: Messages[] | undefined;
// }

// interface ImageHandler {
//   url: string;
//   file: File;
//   previewImage: string;
// }

// export default function Chat() {
//   const navigate = useNavigate();
//   const {
//     accessToken,
//     formatTimestamp,
//     user,
//     setAccessToken,
//     setUser,
//     thread,
//     setThread,
//   } = useAppContext();

//   const userMsgRef: any = useRef(null);
//   const [openAside, setOpenAside] = useState<boolean>(false);

//   // user conversations state
//   const [conversations, setConversations] = useState<ConversationsController>({
//     loader: false,
//     user_conversations: undefined,
//   });
//   const [messages, setMessages] = useState<UserConversation>({
//     loader: false,
//     msgs: undefined,
//   });

//   const [currConvId, setCurrConvId] = useState<string>();
//   const [refetchMsgs, setRefetchMsgs] = useState<boolean>(false);
//   const [isNewChat, setIsNewChat] = useState<boolean>(true);
//   const [userMsg, setUserMsg] = useState<string>("");
//   const [error, setError] = useState<boolean>(false);
//   const [isTyping, setIsTyping] = useState<boolean>(false);
//   const [chatTitle, setChatTitle] = useState<string>("New Query");
//   const [image, setImage] = useState<ImageHandler>();
//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   // voice recording state
//   const recorderRef = useRef<RecordRTC | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const [audioUrl, setAudioUrl] = useState<string | null>(null);
//   const [voiceNote, setVoiceNote] = useState<Blob>();
//   const [recording, setRecording] = useState<boolean>(false);
//   const [switchMediaUrl, setSwitchMediaUrl] = useState<boolean>(false);
//   const [newMediaUrl, setNewMediaUrl] = useState<string>();

//   // search history state
//   const [searchText, setSearchText] = useState<string>("");
//   const [queries, setQueries] = useState<UserConversations[]>();

//   const filterSearchText = (text: string) => {
//     const filteredArr = conversations.user_conversations?.filter((conv) =>
//       conv.title.toLowerCase().includes(text.toLowerCase())
//     );
//     return filteredArr ? filteredArr : [];
//   };

//   const updateMediaUrl = async (updatedUrl: string) => {
//     if (thread.length !== 1) {
//       const user_media_message = thread[thread.length - 2];
//       setThread((prev) =>
//         prev.map((item) =>
//           item === user_media_message ? { ...item, media_url: updatedUrl } : item
//         )
//       );
//     }
//   };

//   const setMedia = (): null | string => {
//     if (image?.url) return image.url;
//     if (audioUrl) return audioUrl;
//     return null;
//   };

//   const fetchPrevMsgs = async () => {
//     if (!accessToken) return toast.error("Unauthenticated");

//     setConversations((prevState) => ({ ...prevState, loader: true }));

//     await getConversations(accessToken)
//       .then((resp) => {
//         if (resp.data)
//           setConversations({ loader: false, user_conversations: resp.data });
//         setQueries(resp.data);
//         if (refetchMsgs === true) setRefetchMsgs(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setConversations((prevState) => ({ ...prevState, loader: false }));
//       });
//   };

//   const setMediaType = (url: string): "image" | "audio" | null => {
//     if (!url) return null;
//     if (url.includes(".webm")) return "audio";
//     if (url.includes("image")) return "image";
//     return null;
//   };

//   const sendMessage = async () => {
//     if (userMsgRef.current) userMsgRef.current.value = "";
//     if (isNewChat) setIsNewChat(false);
//     setIsTyping(true);

//     if (accessToken) {
//       // payload to server
//       const data = {
//         id: currConvId ? currConvId : null,
//         message: userMsg ? userMsg : "",
//         file: image?.file ? image.file : null,
//         voice_note: voiceNote ? voiceNote : null,
//       };

//       // optimistic user message into thread
//       const userMessage: Messages = {
//         id: currConvId ? currConvId : "",
//         sender: "user",
//         content: userMsg,
//         type: null,
//         media_url: setMedia(),
//         media_type: audioUrl ? "audio" : image?.url ? "image" : null,
//         created_at: null,
//       };

//       setThread((prevState) => [...prevState, userMessage]);

//       postMessage(data.id, data.message, data.file, data.voice_note, accessToken)
//         .then((resp) => {
//           if (resp.status === "success" && resp.data) {
//             if (!currConvId) setRefetchMsgs(true);

//             const assistantMessage: Messages = {
//               id: resp.data.conversation_id,
//               sender: "ai",
//               content: resp.data.reply,
//               type: resp.data.type ? resp.data.type : null,
//               media_url: resp.data.media_url ? resp.data.media_url : null,
//               media_type: setMediaType(resp.data.media_url),
//               created_at: resp.data.created_at ? resp.data.created_at : null,
//             };

//             setCurrConvId(resp.data.conversation_id);
//             setThread((prevState) => [...prevState, assistantMessage]);

//             if (resp.data.voice_url) {
//               setSwitchMediaUrl(true);
//               setNewMediaUrl(resp.data.voice_url);
//             }
//             if (resp.data.file_url) {
//               setSwitchMediaUrl(true);
//               setNewMediaUrl(resp.data.file_url);
//             }

//             setIsTyping(false);
//             setUserMsg("");
//             if (audioUrl) setAudioUrl(null);
//             if (voiceNote) setVoiceNote(undefined);
//           }
//         })
//         .catch((error) => {
//           setIsTyping(false);
//           setUserMsg("");
//           if (audioUrl) setAudioUrl(null);
//           if (voiceNote) setVoiceNote(undefined);
//           toast.error(
//             error.response?.data?.message
//               ? error.response.data.message
//               : "Failed to send message"
//           );
//         });

//       if (image?.url || image?.file) setImage(undefined);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const validateMsg = validateInput(userMsg, "message");
//     if (validateMsg !== true) toast.error(validateMsg);
//     sendMessage();
//   };

//   const fetchConversation = async (e: string, title: string) => {
//     if (e === currConvId) return toast.warning("Already set to conversation.");

//     setChatTitle(title);

//     if (error) setError(false);

//     if (!accessToken) return toast.error("Unauthenticated");

//     setMessages((prevState) => ({ ...prevState, loader: true }));

//     await getConversation(e, accessToken)
//       .then((resp) => {
//         if (resp.data) {
//           setMessages({ loader: false, msgs: resp.data.messages });
//           setCurrConvId(resp.data.conversation_id);
//         }
//         setIsNewChat(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setError(true);
//         setMessages((prevState) => ({ ...prevState, loader: false }));
//       });
//   };

//   const initiateLogout = () => {
//     setAccessToken(undefined);
//     setCurrConvId("");
//     setUser(undefined);
//     setThread([]);
//     navigate("/", { replace: true });
//   };

//   const initiateNewChat = () => {
//     if (error) setError(false);
//     setOpenAside(false);
//     setIsNewChat(true);
//     setCurrConvId(undefined);
//     if (thread.length > 1) setThread([]);
//     setChatTitle("New Query");
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const systemfile = e.target.files?.[0];
//     if (systemfile) {
//       if (isNewChat) setIsNewChat(false);
//       if (audioUrl) setAudioUrl(null);
//       const localURL = URL.createObjectURL(systemfile);
//       setImage({ url: "Processing figure...", file: systemfile, previewImage: localURL });
//     }
//   };

//   // Recording events
//   const startRecording = async () => {
//     if (userMsgRef.current) userMsgRef.current.value = "";
//     if (image?.url || image?.file) setImage(undefined);

//     if (switchMediaUrl) setSwitchMediaUrl(false);
//     if (newMediaUrl) setNewMediaUrl(undefined);

//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//     streamRef.current = stream;

//     const recorder = new RecordRTC(stream, {
//       type: "audio",
//       sampleRate: 48000,
//       checkForInactiveTracks: true,
//       mimeType: "audio/webm",
//       disableLogs: true,
//     });
//     recorder.startRecording();
//     recorderRef.current = recorder;
//     setRecording(true);
//   };

//   const stopRecording = async () => {
//     if (!recorderRef.current) return;
//     recorderRef.current.stopRecording(() => {
//       const blob = recorderRef.current?.getBlob();
//       if (blob) {
//         setVoiceNote(blob);
//         setAudioUrl("Processing audio...");
//       }
//     });

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }
//     setRecording(false);
//   };

//   useEffect(() => {
//     // fetch all queries and focus on input
//     fetchPrevMsgs();
//     try {
//       userMsgRef.current?.focus();
//     } catch {}
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (searchText === "") {
//       setQueries(conversations.user_conversations);
//     } else {
//       setQueries(filterSearchText(searchText));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchText]);

//   useEffect(() => {
//     if (refetchMsgs === true) {
//       fetchPrevMsgs();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [refetchMsgs]);

//   useEffect(() => {
//     if (audioUrl) {
//       sendMessage();
//       recorderRef.current = null;
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [audioUrl]);

//   useEffect(() => {
//     if (switchMediaUrl) {
//       if (newMediaUrl) updateMediaUrl(newMediaUrl);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [switchMediaUrl]);

//   useEffect(() => {
//     if (messages.msgs) setThread(messages.msgs);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [messages.msgs]);

//   useEffect(() => {
//     bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
//   }, [thread]);

//   return (
//     <main className="h-screen relative md:flex bg-white">
//       {/* sidebar */}
//       <Sidebar
//         initiateLogout={initiateLogout}
//         setOpenAside={setOpenAside}
//         fetchConversation={fetchConversation}
//         formatTimestamp={formatTimestamp}
//         conversations={conversations}
//         openAside={openAside}
//         theme="light"
//         initiateNewChat={initiateNewChat}
//         currConvId={currConvId}
//         setSearchText={setSearchText}
//         queries={queries}
//       />

//       {/* mobile overlay when sidebar is open */}
//       <div
//         onClick={() => setOpenAside(false)}
//         className={`absolute w-full h-full bg-[#0A1F0FBD] transition-all ease-in-out delay-75 z-10 md:hidden ${
//           openAside ? "left-0" : "-left-full"
//         }`}
//       />

//       <section className="flex flex-col h-full md:w-full transition ease-in-out delay-100 sm:overflow-hidden text-[#333333]">
//         <header className="flex flex-row items-center justify-between p-5 lg:mb-2">
//           <div className="flex flex-row gap-x-3 items-center">
//             <button onClick={() => setOpenAside(true)} className="cursor-pointer md:hidden">
//               <GiHamburgerMenu size={20} />
//             </button>
//             <h2 className="text-lg font-bold">
//               {chatTitle.length > 15 ? chatTitle.slice(0, 15).concat("...") : chatTitle}
//             </h2>
//           </div>
//           <div className="flex flex-row gap-x-2 items-center">
//             <div
//               draggable={false}
//               className="min-w-[30px] max-w-[30px] h-[30px] rounded-full flex items-center justify-center text-white bg-[#1A1D18]"
//             >
//               <FaUserLarge />
//             </div>
//             <div className="flex flex-col gap-y-0.5">
//               <h3 className="font-semibold">{user?.name}</h3>
//               <p className="text-xs capitalize">{user?.role}</p>
//             </div>
//           </div>
//         </header>

//         {/* chat box */}
//         <div className="relative flex flex-col items-center flex-grow">
//           {/* new chat welcome message */}
//           {isNewChat && !messages.loader && !error && <IntroMessage theme="light" />}

//           {/* chat messages */}
//           {!isNewChat && !messages.loader && !error && (
//             <ChatBox isTyping={isTyping} bottomRef={bottomRef} theme="light" messages={thread} />
//           )}

//           {/* loading state */}
//           {messages.loader && (
//             <div className="flex-1 w-full h-[300px] flex flex-col gap-y-1 text-sm items-center justify-center lg:text-lg">
//               <Loader color="#5c5c5c" size={18} />
//               <p>Loading messages...</p>
//             </div>
//           )}

//           {/* error state */}
//           {error && (
//             <p className="text-red-700 text-xs text-center lg:text-sm px-5">
//               Error in getting messages. <br /> Please click on selected chat to reload or check your
//               network connection.
//             </p>
//           )}

//           {/* input area */}
//           <form
//             onSubmit={handleSubmit}
//             className={`rounded-xl h-fit flex flex-col gap-y-1 transition ease-in-out delay-100 ${
//               isNewChat ? "max-w-[382px] mt-10 w-full" : "absolute bottom-3 w-[90%] lg:bottom-5"
//             } bg-[#EBEBEB] text-[#333333] ${messages.loader || error ? "hidden" : "flex"}`}
//           >
//             {/* image preview */}
//             {!isNewChat && image?.previewImage && (
//               <div className="w-[100px] h-auto p-3 relative lg:w-[150px]">
//                 <img className="w-full h-fit" src={image?.previewImage} draggable={false} alt="img" loading="lazy" decoding="async" />
//                 <button
//                   onClick={() => setImage(undefined)}
//                   className="absolute top-1 right-0 w-[20px] h-[20px] bg-red-800 rounded-full flex items-center justify-center cursor-pointer"
//                 >
//                   <AiOutlineClose size={14} />
//                 </button>
//               </div>
//             )}

//             <div className="flex items-center justify-center gap-x-0.5 h-[67px] py-2 px-5">
//               <div className="cursor-pointer relative">
//                 <IoMdAttach size={24} className="rotate-30" />
//                 <input
//                   type="file"
//                   accept="image/png, image/jpg, image/jpeg"
//                   className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 appearance-none opacity-0"
//                   maxLength={2 * 1024 * 1024}
//                   name="file"
//                   onChange={(e) => {
//                     if (voiceNote) setVoiceNote(undefined);
//                     if (audioUrl) setAudioUrl(null);
//                     if (switchMediaUrl) setSwitchMediaUrl(false);
//                     if (newMediaUrl) setNewMediaUrl(undefined);
//                     handleImageChange(e);
//                   }}
//                 />
//               </div>

//               {recording ? (
//                 <div className="flex flex-1 items-center justify-center">
//                   <GiSoundWaves size={40} />
//                 </div>
//               ) : (
//                 <input
//                   className="rounded-lg focus:outline-none h-full w-full px-3"
//                   placeholder="| Type message here..."
//                   name="userMsg"
//                   ref={userMsgRef}
//                   onChange={(e) => {
//                     if (voiceNote) setVoiceNote(undefined);
//                     if (audioUrl) setAudioUrl(null);
//                     if (switchMediaUrl) setSwitchMediaUrl(false);
//                     if (newMediaUrl) setNewMediaUrl(undefined);
//                     setUserMsg(e.target.value);
//                   }}
//                 />
//               )}

//               <div
//                 onClick={!recording ? startRecording : stopRecording}
//                 className="min-w-[30px] max-w-[30px] h-[30px] mr-1 rounded-full flex items-center justify-center text-inherit hover:cursor-pointer hover:bg-[#ffffff09] transition delay-100 ease-in-out"
//               >
//                 {!recording ? <FaMicrophone size={20} /> : <FaCircleStop size={25} />}
//               </div>

//               <button
//                 disabled={isTyping || !userMsg}
//                 className="rotate-45 cursor-pointer disabled:text-[#5c5c5c] disabled:cursor-not-allowed"
//               >
//                 <FiSend size={23} />
//               </button>
//             </div>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// }
/* eslint-disable @typescript-eslint/no-explicit-any */

// origninal code--------------

// import { GiHamburgerMenu } from "react-icons/gi";
// import { useAppContext } from "../context";
// import { IoMdAttach } from "react-icons/io";
// import { GiSoundWaves } from "react-icons/gi";
// import { AiOutlineClose } from "react-icons/ai";
// import { validateInput } from "../validation";
// import { useNavigate } from "react-router-dom";
// import { FaUserLarge, FaCircleStop } from "react-icons/fa6";
// import RecordRTC from "recordrtc";
// import IntroMessage from "../components/chat/IntroSection";
// import Sidebar from "../components/chat/Sidebar";
// import { useEffect, useRef, useState } from "react";
// import { FiSend } from "react-icons/fi";
// import { FaMicrophone } from "react-icons/fa";
// import ChatBox from "../components/chat/Chat";
// import { getConversations } from "../api/conversation/getConversations";
// import { getConversation } from "../api/conversation/getConversation";
// import { toast } from "sonner";
// import type { Messages, UserConversations } from "../entities";
// import Loader from "../components/loader";
// import { postMessage } from "../api/conversation";
// import { emeka } from "../utils/assets";

// export interface ConversationsController {
//   loader: boolean;
//   user_conversations: UserConversations[] | undefined;
// }

// export interface UserConversation {
//   loader: boolean;
//   msgs: Messages[] | undefined;
// }

// interface ImageHandler {
//   url: string;
//   file: File;
//   previewImage: string;
// }

// export default function Chat() {
//   const navigate = useNavigate();
//   const {
//     accessToken,
//     formatTimestamp,
//     user,
//     setAccessToken,
//     setUser,
//     thread,
//     setThread,
//   } = useAppContext();

//   const userMsgRef: any = useRef(null);
//   const [openAside, setOpenAside] = useState<boolean>(false);

//   // user conversations state
//   const [conversations, setConversations] = useState<ConversationsController>({
//     loader: false,
//     user_conversations: undefined,
//   });
//   const [messages, setMessages] = useState<UserConversation>({
//     loader: false,
//     msgs: undefined,
//   });

//   const [currConvId, setCurrConvId] = useState<string>();
//   const [refetchMsgs, setRefetchMsgs] = useState<boolean>(false);
//   const [isNewChat, setIsNewChat] = useState<boolean>(true);
//   const [userMsg, setUserMsg] = useState<string>("");
//   const [error, setError] = useState<boolean>(false);
//   const [isTyping, setIsTyping] = useState<boolean>(false);
//   const [_chatTitle, setChatTitle] = useState<string>("New Chat");
//   const [image, setImage] = useState<ImageHandler>();
//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   // voice recording state
//   const recorderRef = useRef<RecordRTC | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const [audioUrl, setAudioUrl] = useState<string | null>(null);
//   const [voiceNote, setVoiceNote] = useState<Blob>();
//   const [recording, setRecording] = useState<boolean>(false);
//   const [switchMediaUrl, setSwitchMediaUrl] = useState<boolean>(false);
//   const [newMediaUrl, setNewMediaUrl] = useState<string>();

//   // search history state
//   const [searchText, setSearchText] = useState<string>("");
//   const [queries, setQueries] = useState<UserConversations[]>();

//   const filterSearchText = (text: string) => {
//     const filteredArr = conversations.user_conversations?.filter((conv) =>
//       conv.title.toLowerCase().includes(text.toLowerCase())
//     );
//     return filteredArr ? filteredArr : [];
//   };

//   const updateMediaUrl = async (updatedUrl: string) => {
//     if (thread.length !== 1) {
//       const user_media_message = thread[thread.length - 2];
//       setThread((prev) =>
//         prev.map((item) =>
//           item === user_media_message
//             ? { ...item, media_url: updatedUrl }
//             : item
//         )
//       );
//     }
//   };

//   const setMedia = (): null | string => {
//     if (image?.url) return image.url;
//     if (audioUrl) return audioUrl;
//     return null;
//   };

//   const fetchPrevMsgs = async () => {
//     if (!accessToken) return toast.error("Unauthenticated");

//     setConversations((prevState) => ({ ...prevState, loader: true }));

//     await getConversations(accessToken)
//       .then((resp) => {
//         if (resp.data)
//           setConversations({ loader: false, user_conversations: resp.data });
//         setQueries(resp.data);
//         if (refetchMsgs === true) setRefetchMsgs(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setConversations((prevState) => ({ ...prevState, loader: false }));
//       });
//   };

//   const setMediaType = (url: string): "image" | "audio" | null => {
//     if (!url) return null;
//     if (url.includes(".webm")) return "audio";
//     if (url.includes("image")) return "image";
//     return null;
//   };

//   const sendMessage = async () => {
//     if (userMsgRef.current) userMsgRef.current.value = "";
//     if (isNewChat) setIsNewChat(false);
//     setIsTyping(true);

//     if (accessToken) {
//       // payload to server
//       const data = {
//         id: currConvId ? currConvId : null,
//         message: userMsg ? userMsg : "",
//         file: image?.file ? image.file : null,
//         voice_note: voiceNote ? voiceNote : null,
//       };

//       // optimistic user message into thread
//       const userMessage: Messages = {
//         id: currConvId ? currConvId : "",
//         sender: "user",
//         content: userMsg,
//         type: null,
//         media_url: setMedia(),
//         media_type: audioUrl ? "audio" : image?.url ? "image" : null,
//         created_at: null,
//       };

//       setThread((prevState) => [...prevState, userMessage]);

//       postMessage(
//         data.id,
//         data.message,
//         data.file,
//         data.voice_note,
//         accessToken
//       )
//         .then((resp) => {
//           if (resp.status === "success" && resp.data) {
//             if (!currConvId) setRefetchMsgs(true);

//             const assistantMessage: Messages = {
//               id: resp.data.conversation_id,
//               sender: "ai",
//               content: resp.data.reply,
//               type: resp.data.type ? resp.data.type : null,
//               media_url: resp.data.media_url ? resp.data.media_url : null,
//               media_type: setMediaType(resp.data.media_url),
//               created_at: resp.data.created_at ? resp.data.created_at : null,
//             };

//             setCurrConvId(resp.data.conversation_id);
//             // localStorage.setItem("chat_id", resp.data.conversation_id); // <-- ADDED
//             setThread((prevState) => [...prevState, assistantMessage]);

//             if (resp.data.voice_url) {
//               setSwitchMediaUrl(true);
//               setNewMediaUrl(resp.data.voice_url);
//             }
//             if (resp.data.file_url) {
//               setSwitchMediaUrl(true);
//               setNewMediaUrl(resp.data.file_url);
//             }

//             setIsTyping(false);
//             setUserMsg("");
//             if (audioUrl) setAudioUrl(null);
//             if (voiceNote) setVoiceNote(undefined);
//           }
//         })
//         .catch((error) => {
//           setIsTyping(false);
//           setUserMsg("");
//           if (audioUrl) setAudioUrl(null);
//           if (voiceNote) setVoiceNote(undefined);
//           toast.error(
//             error.response?.data?.message
//               ? error.response.data.message
//               : "Failed to send message"
//           );
//         });

//       if (image?.url || image?.file) setImage(undefined);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const validateMsg = validateInput(userMsg, "message");
//     if (validateMsg !== true) toast.error(validateMsg);
//     sendMessage();
//   };

//   const fetchConversation = async (e: string, title: string) => {
//     if (e === currConvId) return toast.warning("Already set to conversation.");

//     setChatTitle(title);

//     if (error) setError(false);

//     if (!accessToken) return toast.error("Unauthenticated");

//     setMessages((prevState) => ({ ...prevState, loader: true }));

//     await getConversation(e, accessToken)
//       .then((resp) => {
//         if (resp.data) {
//           setMessages({ loader: false, msgs: resp.data.messages });
//           setCurrConvId(resp.data.conversation_id);
//           // localStorage.setItem("chat_id", resp.data.conversation_id); // <-- ADDED
//         }
//         setIsNewChat(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setError(true);
//         setMessages((prevState) => ({ ...prevState, loader: false }));
//       });
//   };

//   const initiateLogout = () => {
//     setAccessToken(undefined);
//     setCurrConvId("");
//     setUser(undefined);
//     setThread([]);
//     navigate("/", { replace: true });
//   };

//   const initiateNewChat = () => {
//     if (error) setError(false);
//     setOpenAside(false);
//     setIsNewChat(true);
//     setCurrConvId(undefined);
//     if (thread.length > 1) setThread([]);
//     setChatTitle("New Chat");
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const systemfile = e.target.files?.[0];
//     if (systemfile) {
//       if (isNewChat) setIsNewChat(false);
//       if (audioUrl) setAudioUrl(null);
//       const localURL = URL.createObjectURL(systemfile);
//       setImage({
//         url: "Processing figure...",
//         file: systemfile,
//         previewImage: localURL,
//       });
//     }
//   };

//   // Recording events
//   const startRecording = async () => {
//     if (userMsgRef.current) userMsgRef.current.value = "";
//     if (image?.url || image?.file) setImage(undefined);

//     if (switchMediaUrl) setSwitchMediaUrl(false);
//     if (newMediaUrl) setNewMediaUrl(undefined);

//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//     streamRef.current = stream;

//     const recorder = new RecordRTC(stream, {
//       type: "audio",
//       sampleRate: 48000,
//       checkForInactiveTracks: true,
//       mimeType: "audio/webm",
//       disableLogs: true,
//     });
//     recorder.startRecording();
//     recorderRef.current = recorder;
//     setRecording(true);
//   };

//   const stopRecording = async () => {
//     if (!recorderRef.current) return;
//     recorderRef.current.stopRecording(() => {
//       const blob = recorderRef.current?.getBlob();
//       if (blob) {
//         setVoiceNote(blob);
//         setAudioUrl("Processing audio...");
//       }
//     });

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }
//     setRecording(false);
//   };

//   useEffect(() => {
//     // fetch all queries and focus on input
//     fetchPrevMsgs();
//     try {
//       userMsgRef.current?.focus();
//     } catch {}
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // // ADDED: Load saved chat ID
//   // // -------------------------------
//   // useEffect(() => {
//   //   const savedId = localStorage.getItem("chat_id");
//   //   if (savedId && accessToken) {
//   //     // fetch messages for saved chat
//   //     const savedTitle = conversations.user_conversations?.find(
//   //       (c) => c.id === savedId
//   //     )?.title;
//   //     if (savedTitle) {
//   //       fetchConversation(savedId, savedTitle);
//   //     } else {
//   //       // If title not yet loaded, just set ID and wait until conversations are fetched
//   //       setCurrConvId(savedId);
//   //       setIsNewChat(false);
//   //     }
//   //   }
//   // }, [accessToken, conversations.user_conversations]);

//   useEffect(() => {
//     if (searchText === "") {
//       setQueries(conversations.user_conversations);
//     } else {
//       setQueries(filterSearchText(searchText));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchText]);

//   useEffect(() => {
//     if (refetchMsgs === true) {
//       fetchPrevMsgs();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [refetchMsgs]);

//   useEffect(() => {
//     if (audioUrl) {
//       sendMessage();
//       recorderRef.current = null;
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [audioUrl]);

//   useEffect(() => {
//     if (switchMediaUrl) {
//       if (newMediaUrl) updateMediaUrl(newMediaUrl);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [switchMediaUrl]);

//   useEffect(() => {
//     if (messages.msgs) setThread(messages.msgs);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [messages.msgs]);

//   useEffect(() => {
//     bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
//   }, [thread]);

//   return (
//     <main className="h-screen relative md:flex bg-white">
//       {/* sidebar */}
//       <Sidebar
//         initiateLogout={initiateLogout}
//         setOpenAside={setOpenAside}
//         fetchConversation={fetchConversation}
//         formatTimestamp={formatTimestamp}
//         conversations={conversations}
//         openAside={openAside}
//         // theme="light"
//         initiateNewChat={initiateNewChat}
//         currConvId={currConvId}
//         setSearchText={setSearchText}
//         queries={queries}
//       />

//       {/* mobile overlay when sidebar is open */}
//       <div
//         onClick={() => setOpenAside(false)}
//         className={`absolute w-full h-full bg-[#0A1F0FBD] transition-all ease-in-out delay-75 z-10 md:hidden ${
//           openAside ? "left-0" : "-left-full"
//         }`}
//       />

//       <section className="flex flex-col h-full md:w-full transition ease-in-out delay-100 sm:overflow-hidden text-[#333333]">
//         <header className="flex flex-row items-center justify-between p-5 lg:mb-2">
//           <div className="flex flex-row gap-x-3 items-center">
//             <button
//               onClick={() => setOpenAside(true)}
//               className="cursor-pointer md:hidden"
//             >
//               <GiHamburgerMenu size={20} />
//             </button>
//             {/* <h2 className="text-lg font-bold">
//               {chatTitle.length > 15
//                 ? chatTitle.slice(0, 15).concat("...")
//                 : chatTitle}
//             </h2> */}
//             <span>
//               <img
//                 src={emeka}
//                 alt="Logo"
//                 className="h-10 w-auto"
//                 draggable={false}
//               />
//             </span>
//           </div>
//           <div className="flex flex-row gap-x-2 items-center">
//             <div
//               draggable={false}
//               className="min-w-[30px] max-w-[30px] h-[30px] rounded-full flex items-center justify-center text-white bg-[#1A1D18]"
//             >
//               <FaUserLarge />
//             </div>
//             <div className="flex flex-col gap-y-0.5">
//               <h3 className="font-semibold">{user?.name}</h3>
//               {/* <p className="text-xs capitalize">{user?.role}</p> */}
//             </div>
//           </div>
//         </header>

//         {/* chat box */}
//         <div className="relative flex flex-col items-center flex-grow">
//           {/* new chat welcome message */}
//           {isNewChat && !messages.loader && !error && (
//             <IntroMessage theme="light" />
//           )}

//           {/* chat messages */}
//           {!isNewChat && !messages.loader && !error && (
//             <ChatBox
//               isTyping={isTyping}
//               bottomRef={bottomRef}
//               theme="light"
//               messages={thread}
//             />
//           )}

//           {/* loading state */}
//           {messages.loader && (
//             <div className="flex-1 w-full h-[300px] flex flex-col gap-y-1 text-sm items-center justify-center lg:text-lg">
//               <Loader color="#5c5c5c" size={18} />
//               <p>Loading messages...</p>
//             </div>
//           )}

//           {/* error state */}
//           {error && (
//             <p className="text-red-700 text-xs text-center lg:text-sm px-5">
//               Error in getting messages. <br /> Please click on selected chat to
//               reload or check your network connection.
//             </p>
//           )}

//           {/* input area */}
//           <form
//             onSubmit={handleSubmit}
//             className={`rounded-xl h-fit flex flex-col gap-y-1 transition ease-in-out delay-100 ${
//               isNewChat
//                 ? "max-w-[382px] mt-10 w-full"
//                 : "absolute bottom-3 w-[90%] lg:bottom-5"
//             } bg-[#EBEBEB] text-[#333333] ${
//               messages.loader || error ? "hidden" : "flex"
//             }`}
//           >
//             {/* image preview */}
//             {!isNewChat && image?.previewImage && (
//               <div className="w-[100px] h-auto p-3 relative lg:w-[150px]">
//                 <img
//                   className="w-full h-fit"
//                   src={image?.previewImage}
//                   draggable={false}
//                   alt="img"
//                   loading="lazy"
//                   decoding="async"
//                 />
//                 <button
//                   onClick={() => setImage(undefined)}
//                   className="absolute top-1 right-0 w-[20px] h-[20px] bg-red-800 rounded-full flex items-center justify-center cursor-pointer"
//                 >
//                   <AiOutlineClose size={14} />
//                 </button>
//               </div>
//             )}

//             <div className="flex items-center justify-center gap-x-0.5 h-[67px] py-2 px-5">
//               <div className="cursor-pointer relative">
//                 <IoMdAttach size={24} className="rotate-30" />
//                 <input
//                   type="file"
//                   accept="image/png, image/jpg, image/jpeg"
//                   className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 appearance-none opacity-0"
//                   maxLength={2 * 1024 * 1024}
//                   name="file"
//                   onChange={(e) => {
//                     if (voiceNote) setVoiceNote(undefined);
//                     if (audioUrl) setAudioUrl(null);
//                     if (switchMediaUrl) setSwitchMediaUrl(false);
//                     if (newMediaUrl) setNewMediaUrl(undefined);
//                     handleImageChange(e);
//                   }}
//                 />
//               </div>

//               {recording ? (
//                 <div className="flex flex-1 items-center justify-center">
//                   <GiSoundWaves size={40} />
//                 </div>
//               ) : (
//                 <input
//                   className="rounded-lg focus:outline-none h-full w-full px-3"
//                   placeholder="| Type message here..."
//                   name="userMsg"
//                   ref={userMsgRef}
//                   onChange={(e) => {
//                     if (voiceNote) setVoiceNote(undefined);
//                     if (audioUrl) setAudioUrl(null);
//                     if (switchMediaUrl) setSwitchMediaUrl(false);
//                     if (newMediaUrl) setNewMediaUrl(undefined);
//                     setUserMsg(e.target.value);
//                   }}
//                 />
//               )}

//               <div
//                 onClick={!recording ? startRecording : stopRecording}
//                 className="min-w-[30px] max-w-[30px] h-[30px] mr-1 rounded-full flex items-center justify-center text-inherit hover:cursor-pointer hover:bg-[#ffffff09] transition delay-100 ease-in-out"
//               >
//                 {!recording ? (
//                   <FaMicrophone size={20} />
//                 ) : (
//                   <FaCircleStop size={25} />
//                 )}
//               </div>

//               <button
//                 disabled={isTyping || !userMsg}
//                 className=" cursor-pointer disabled:text-[#5c5c5c] disabled:cursor-not-allowed"
//               >
//                 <FiSend size={23} />
//               </button>
//             </div>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// }

// original file
// import { GiHamburgerMenu } from "react-icons/gi";
// import { useAppContext } from "../context";
// import { IoMdAttach } from "react-icons/io";
// import { GiSoundWaves } from "react-icons/gi";
// import { AiOutlineClose } from "react-icons/ai";
// import { validateInput } from "../validation";
// import { useNavigate } from "react-router-dom";
// import { FaUserLarge, FaCircleStop } from "react-icons/fa6";
// import RecordRTC from "recordrtc";
// import IntroMessage from "../components/chat/IntroSection";
// import Sidebar from "../components/chat/Sidebar";
// import { useEffect, useRef, useState } from "react";
// import { FiSend } from "react-icons/fi";
// import { FaMicrophone } from "react-icons/fa";
// import ChatBox from "../components/chat/Chat";
// import { getConversations } from "../api/conversation/getConversations";
// import { getConversation } from "../api/conversation/getConversation";
// import { toast } from "sonner";
// import type { Messages, UserConversations } from "../entities";
// import Loader from "../components/loader";
// import { postMessage } from "../api/conversation";
// import { emeka } from "../utils/assets";

// export interface ConversationsController {
//   loader: boolean;
//   user_conversations: UserConversations[] | undefined;
// }

// export interface UserConversation {
//   loader: boolean;
//   msgs: Messages[] | undefined;
// }

// interface ImageHandler {
//   url: string;
//   file: File;
//   previewImage: string;
// }

// export default function Chat() {
//   const navigate = useNavigate();
//   const {
//     accessToken,
//     formatTimestamp,
//     user,
//     setAccessToken,
//     setUser,
//     thread,
//     setThread,
//   } = useAppContext();

//   const userMsgRef: any = useRef(null);
//   const [openAside, setOpenAside] = useState<boolean>(false);

//   // user conversations state
//   const [conversations, setConversations] = useState<ConversationsController>({
//     loader: false,
//     user_conversations: undefined,
//   });
//   const [messages, setMessages] = useState<UserConversation>({
//     loader: false,
//     msgs: undefined,
//   });

//   // Initialize states from localStorage
//   const [currConvId, setCurrConvId] = useState<string | undefined>(() => {
//     const stored = localStorage.getItem("currentConversationId");
//     return stored || undefined;
//   });

//   const [refetchMsgs, setRefetchMsgs] = useState<boolean>(false);

//   const [isNewChat, setIsNewChat] = useState<boolean>(() => {
//     const stored = localStorage.getItem("currentConversationId");
//     return !stored;
//   });

//   const [userMsg, setUserMsg] = useState<string>("");
//   const [error, setError] = useState<boolean>(false);
//   const [isTyping, setIsTyping] = useState<boolean>(false);

//   const [_chatTitle, setChatTitle] = useState<string>(() => {
//     const stored = localStorage.getItem("currentChatTitle");
//     return stored || "New Chat";
//   });

//   const [image, setImage] = useState<ImageHandler>();
//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   // voice recording state
//   const recorderRef = useRef<RecordRTC | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const [audioUrl, setAudioUrl] = useState<string | null>(null);
//   const [voiceNote, setVoiceNote] = useState<Blob>();
//   const [recording, setRecording] = useState<boolean>(false);
//   const [switchMediaUrl, setSwitchMediaUrl] = useState<boolean>(false);
//   const [newMediaUrl, setNewMediaUrl] = useState<string>();

//   // search history state
//   const [searchText, setSearchText] = useState<string>("");
//   const [queries, setQueries] = useState<UserConversations[]>();

//   const filterSearchText = (text: string) => {
//     const filteredArr = conversations.user_conversations?.filter((conv) =>
//       conv.title.toLowerCase().includes(text.toLowerCase())
//     );
//     return filteredArr ? filteredArr : [];
//   };

//   const updateMediaUrl = async (updatedUrl: string) => {
//     if (thread.length !== 1) {
//       const user_media_message = thread[thread.length - 2];
//       setThread((prev) =>
//         prev.map((item) =>
//           item === user_media_message
//             ? { ...item, media_url: updatedUrl }
//             : item
//         )
//       );
//     }
//   };

//   const setMedia = (): null | string => {
//     if (image?.url) return image.url;
//     if (audioUrl) return audioUrl;
//     return null;
//   };

//   const fetchPrevMsgs = async () => {
//     if (!accessToken) return toast.error("Unauthenticated");

//     setConversations((prevState) => ({ ...prevState, loader: true }));

//     await getConversations(accessToken)
//       .then((resp) => {
//         if (resp.data)
//           setConversations({ loader: false, user_conversations: resp.data });
//         setQueries(resp.data);
//         if (refetchMsgs === true) setRefetchMsgs(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setConversations((prevState) => ({ ...prevState, loader: false }));
//       });
//   };

//   const setMediaType = (url: string): "image" | "audio" | null => {
//     if (!url) return null;
//     if (url.includes(".webm")) return "audio";
//     if (url.includes("image")) return "image";
//     return null;
//   };

//   const sendMessage = async () => {
//     if (userMsgRef.current) userMsgRef.current.value = "";
//     if (isNewChat) setIsNewChat(false);
//     setIsTyping(true);

//     if (accessToken) {
//       // payload to server
//       const data = {
//         id: currConvId ? currConvId : null,
//         message: userMsg ? userMsg : "",
//         file: image?.file ? image.file : null,
//         voice_note: voiceNote ? voiceNote : null,
//       };

//       // optimistic user message into thread
//       const userMessage: Messages = {
//         id: currConvId ? currConvId : "",
//         sender: "user",
//         content: userMsg,
//         type: null,
//         media_url: setMedia(),
//         media_type: audioUrl ? "audio" : image?.url ? "image" : null,
//         created_at: null,
//       };

//       setThread((prevState) => [...prevState, userMessage]);

//       postMessage(
//         data.id,
//         data.message,
//         data.file,
//         data.voice_note,
//         accessToken
//       )
//         .then((resp) => {
//           if (resp.status === "success" && resp.data) {
//             if (!currConvId) setRefetchMsgs(true);

//             const assistantMessage: Messages = {
//               id: resp.data.conversation_id,
//               sender: "ai",
//               content: resp.data.reply,
//               type: resp.data.type ? resp.data.type : null,
//               media_url: resp.data.media_url ? resp.data.media_url : null,
//               media_type: setMediaType(resp.data.media_url),
//               created_at: resp.data.created_at ? resp.data.created_at : null,
//             };

//             setCurrConvId(resp.data.conversation_id);

//             // Save conversation ID to localStorage after first message
//             if (!currConvId && resp.data.conversation_id) {
//               localStorage.setItem(
//                 "currentConversationId",
//                 resp.data.conversation_id
//               );
//             }

//             setThread((prevState) => [...prevState, assistantMessage]);

//             if (resp.data.voice_url) {
//               setSwitchMediaUrl(true);
//               setNewMediaUrl(resp.data.voice_url);
//             }
//             if (resp.data.file_url) {
//               setSwitchMediaUrl(true);
//               setNewMediaUrl(resp.data.file_url);
//             }

//             setIsTyping(false);
//             setUserMsg("");
//             if (audioUrl) setAudioUrl(null);
//             if (voiceNote) setVoiceNote(undefined);
//           }
//         })
//         .catch((error) => {
//           setIsTyping(false);
//           setUserMsg("");
//           if (audioUrl) setAudioUrl(null);
//           if (voiceNote) setVoiceNote(undefined);
//           toast.error(
//             error.response?.data?.message
//               ? error.response.data.message
//               : "Failed to send message"
//           );
//         });

//       if (image?.url || image?.file) setImage(undefined);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const validateMsg = validateInput(userMsg, "message");
//     if (validateMsg !== true) toast.error(validateMsg);
//     sendMessage();
//   };

//   const fetchConversation = async (e: string, title: string) => {
//     if (e === currConvId) return toast.warning("Already set to conversation.");

//     setChatTitle(title);

//     if (error) setError(false);

//     if (!accessToken) return toast.error("Unauthenticated");

//     setMessages((prevState) => ({ ...prevState, loader: true }));

//     await getConversation(e, accessToken)
//       .then((resp) => {
//         if (resp.data) {
//           setMessages({ loader: false, msgs: resp.data.messages });
//           setCurrConvId(resp.data.conversation_id);
//         }
//         setIsNewChat(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setError(true);
//         setMessages((prevState) => ({ ...prevState, loader: false }));
//       });
//   };

//   const initiateLogout = () => {
//     // Clear all localStorage
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("user");
//     localStorage.removeItem("currentConversationId");
//     localStorage.removeItem("currentChatTitle");

//     // Clear state
//     setAccessToken(undefined);
//     setCurrConvId(undefined);
//     setUser(undefined);
//     setThread([]);

//     navigate("/", { replace: true });
//   };

//   const initiateNewChat = () => {
//     if (error) setError(false);
//     setOpenAside(false);
//     setIsNewChat(true);
//     setCurrConvId(undefined);
//     if (thread.length > 1) setThread([]);
//     setChatTitle("New Chat");

//     // Clear persisted conversation data
//     localStorage.removeItem("currentConversationId");
//     localStorage.removeItem("currentChatTitle");
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const systemfile = e.target.files?.[0];
//     if (systemfile) {
//       if (isNewChat) setIsNewChat(false);
//       if (audioUrl) setAudioUrl(null);
//       const localURL = URL.createObjectURL(systemfile);
//       setImage({
//         url: "Processing figure...",
//         file: systemfile,
//         previewImage: localURL,
//       });
//     }
//   };

//   // Recording events
//   const startRecording = async () => {
//     if (userMsgRef.current) userMsgRef.current.value = "";
//     if (image?.url || image?.file) setImage(undefined);

//     if (switchMediaUrl) setSwitchMediaUrl(false);
//     if (newMediaUrl) setNewMediaUrl(undefined);

//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//     streamRef.current = stream;

//     const recorder = new RecordRTC(stream, {
//       type: "audio",
//       sampleRate: 48000,
//       checkForInactiveTracks: true,
//       mimeType: "audio/webm",
//       disableLogs: true,
//     });
//     recorder.startRecording();
//     recorderRef.current = recorder;
//     setRecording(true);
//   };

//   const stopRecording = async () => {
//     if (!recorderRef.current) return;
//     recorderRef.current.stopRecording(() => {
//       const blob = recorderRef.current?.getBlob();
//       if (blob) {
//         setVoiceNote(blob);
//         setAudioUrl("Processing audio...");
//       }
//     });

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }
//     setRecording(false);
//   };

//   // Persist currConvId to localStorage
//   useEffect(() => {
//     if (currConvId) {
//       localStorage.setItem("currentConversationId", currConvId);
//     } else {
//       localStorage.removeItem("currentConversationId");
//     }
//   }, [currConvId]);

//   // Persist chatTitle to localStorage
//   useEffect(() => {
//     if (_chatTitle && _chatTitle !== "New Chat") {
//       localStorage.setItem("currentChatTitle", _chatTitle);
//     } else {
//       localStorage.removeItem("currentChatTitle");
//     }
//   }, [_chatTitle]);

//   // Initialize chat on component mount
//   useEffect(() => {
//     const initializeChat = async () => {
//       // Fetch all conversations first
//       await fetchPrevMsgs();

//       // Check if there's a stored conversation to restore
//       const storedConvId = localStorage.getItem("currentConversationId");

//       if (storedConvId && accessToken) {
//         // Restore the conversation
//         try {
//           setMessages((prevState) => ({ ...prevState, loader: true }));

//           const resp = await getConversation(storedConvId, accessToken);

//           if (resp.data) {
//             setMessages({ loader: false, msgs: resp.data.messages });
//             setCurrConvId(resp.data.conversation_id);
//             setIsNewChat(false);
//           }
//         } catch (error) {
//           console.log("Error restoring conversation:", error);
//           setMessages((prevState) => ({ ...prevState, loader: false }));
//           // If conversation can't be restored, start fresh
//           localStorage.removeItem("currentConversationId");
//           localStorage.removeItem("currentChatTitle");
//           setIsNewChat(true);
//         }
//       }

//       // Focus on input
//       try {
//         userMsgRef.current?.focus();
//       } catch {}
//     };

//     initializeChat();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (searchText === "") {
//       setQueries(conversations.user_conversations);
//     } else {
//       setQueries(filterSearchText(searchText));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchText]);

//   useEffect(() => {
//     if (refetchMsgs === true) {
//       fetchPrevMsgs();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [refetchMsgs]);

//   useEffect(() => {
//     if (audioUrl) {
//       sendMessage();
//       recorderRef.current = null;
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [audioUrl]);

//   useEffect(() => {
//     if (switchMediaUrl) {
//       if (newMediaUrl) updateMediaUrl(newMediaUrl);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [switchMediaUrl]);

//   useEffect(() => {
//     if (messages.msgs) setThread(messages.msgs);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [messages.msgs]);

//   useEffect(() => {
//     bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
//   }, [thread]);

//   return (
//     <main className="h-screen relative md:flex bg-white">
//       {/* sidebar */}
//       <Sidebar
//         initiateLogout={initiateLogout}
//         setOpenAside={setOpenAside}
//         fetchConversation={fetchConversation}
//         formatTimestamp={formatTimestamp}
//         conversations={conversations}
//         openAside={openAside}
//         initiateNewChat={initiateNewChat}
//         currConvId={currConvId}
//         setSearchText={setSearchText}
//         queries={queries}
//       />

//       {/* mobile overlay when sidebar is open */}
//       <div
//         onClick={() => setOpenAside(false)}
//         className={`absolute w-full h-full bg-[#0A1F0FBD] transition-all ease-in-out delay-75 z-10 md:hidden ${
//           openAside ? "left-0" : "-left-full"
//         }`}
//       />

//       <section className="flex flex-col h-full md:w-full transition ease-in-out delay-100 sm:overflow-hidden text-[#333333]">
//         <header className="flex flex-row items-center justify-between p-5 lg:mb-2">
//           <div className="flex flex-row gap-x-3 items-center">
//             <button
//               onClick={() => setOpenAside(true)}
//               className="cursor-pointer md:hidden"
//             >
//               <GiHamburgerMenu size={20} />
//             </button>
//             <span>
//               <img
//                 onClick={() => navigate("/")}
//                 src={emeka}
//                 alt="Logo"
//                 className="h-10 w-auto cursor-pointer"
//                 draggable={false}
//               />
//             </span>
//           </div>
//           <div className="flex flex-row gap-x-2 items-center">
//             <div
//               draggable={false}
//               className="min-w-[30px] max-w-[30px] h-[30px] rounded-full flex items-center justify-center text-white bg-[#1A1D18]"
//             >
//               <FaUserLarge />
//             </div>
//             <div className="flex flex-col gap-y-0.5">
//               <h3 className="font-semibold">{user?.name}</h3>
//             </div>
//           </div>
//         </header>

//         {/* chat box */}
//         <div className="relative flex flex-col items-center flex-grow">
//           {/* new chat welcome message */}
//           {isNewChat && !messages.loader && !error && (
//             <IntroMessage theme="light" />
//           )}

//           {/* chat messages */}
//           {!isNewChat && !messages.loader && !error && (
//             <ChatBox
//               isTyping={isTyping}
//               bottomRef={bottomRef}
//               theme="light"
//               messages={thread}
//             />
//           )}

//           {/* loading state */}
//           {messages.loader && (
//             <div className="flex-1 w-full h-[300px] flex flex-col gap-y-1 text-sm items-center justify-center lg:text-lg">
//               <Loader color="#5c5c5c" size={18} />
//               <p>Loading messages...</p>
//             </div>
//           )}

//           {/* error state */}
//           {error && (
//             <p className="text-red-700 text-xs text-center lg:text-sm px-5">
//               Error in getting messages. <br /> Please click on selected chat to
//               reload or check your network connection.
//             </p>
//           )}

//           {/* input area */}
//           <form
//             onSubmit={handleSubmit}
//             className={`rounded-xl h-fit flex flex-col gap-y-1 transition ease-in-out delay-100 ${
//               isNewChat
//                 ? "max-w-[382px] mt-10 w-full"
//                 : "absolute bottom-3 w-[90%] lg:bottom-5"
//             } bg-[#EBEBEB] text-[#333333] ${
//               messages.loader || error ? "hidden" : "flex"
//             }`}
//           >
//             {/* image preview */}
//             {!isNewChat && image?.previewImage && (
//               <div className="w-[100px] h-auto p-3 relative lg:w-[150px]">
//                 <img
//                   className="w-full h-fit"
//                   src={image?.previewImage}
//                   draggable={false}
//                   alt="img"
//                   loading="lazy"
//                   decoding="async"
//                 />
//                 <button
//                   onClick={() => setImage(undefined)}
//                   className="absolute top-1 right-0 w-[20px] h-[20px] bg-red-800 rounded-full flex items-center justify-center cursor-pointer"
//                 >
//                   <AiOutlineClose size={14} />
//                 </button>
//               </div>
//             )}

//             <div className="flex items-center justify-center gap-x-0.5 h-[67px] py-2 px-5">
//               <div className="cursor-pointer relative">
//                 <IoMdAttach size={24} className="rotate-30" />
//                 <input
//                   type="file"
//                   accept="image/png, image/jpg, image/jpeg"
//                   className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 appearance-none opacity-0"
//                   maxLength={2 * 1024 * 1024}
//                   name="file"
//                   onChange={(e) => {
//                     if (voiceNote) setVoiceNote(undefined);
//                     if (audioUrl) setAudioUrl(null);
//                     if (switchMediaUrl) setSwitchMediaUrl(false);
//                     if (newMediaUrl) setNewMediaUrl(undefined);
//                     handleImageChange(e);
//                   }}
//                 />
//               </div>

//               {recording ? (
//                 <div className="flex flex-1 items-center justify-center">
//                   <GiSoundWaves size={40} />
//                 </div>
//               ) : (
//                 <input
//                   className="rounded-lg focus:outline-none h-full w-full px-3"
//                   placeholder="| Type message here..."
//                   name="userMsg"
//                   ref={userMsgRef}
//                   onChange={(e) => {
//                     if (voiceNote) setVoiceNote(undefined);
//                     if (audioUrl) setAudioUrl(null);
//                     if (switchMediaUrl) setSwitchMediaUrl(false);
//                     if (newMediaUrl) setNewMediaUrl(undefined);
//                     setUserMsg(e.target.value);
//                   }}
//                 />
//               )}

//               <div
//                 onClick={!recording ? startRecording : stopRecording}
//                 className="min-w-[30px] max-w-[30px] h-[30px] mr-1 rounded-full flex items-center justify-center text-inherit hover:cursor-pointer hover:bg-[#ffffff09] transition delay-100 ease-in-out"
//               >
//                 {!recording ? (
//                   <FaMicrophone size={20} />
//                 ) : (
//                   <FaCircleStop size={25} />
//                 )}
//               </div>

//               <button
//                 disabled={isTyping || !userMsg}
//                 className=" cursor-pointer disabled:text-[#5c5c5c] disabled:cursor-not-allowed"
//               >
//                 <FiSend size={23} />
//               </button>
//             </div>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// }

// import { GiHamburgerMenu } from "react-icons/gi";
// import { useAppContext } from "../context";
// import { IoMdAttach } from "react-icons/io";
// import { GiSoundWaves } from "react-icons/gi";
// import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
// import { validateInput } from "../validation";
// import { useNavigate } from "react-router-dom";
// import { FaUserLarge, FaCircleStop } from "react-icons/fa6";
// import { HiOutlineDocumentText } from "react-icons/hi";
// import { MdOutlineEmail } from "react-icons/md";
// import RecordRTC from "recordrtc";
// import IntroMessage from "../components/chat/IntroSection";
// import Sidebar from "../components/chat/Sidebar";
// import { useEffect, useRef, useState } from "react";
// import { FiSend } from "react-icons/fi";
// import { FaMicrophone } from "react-icons/fa";
// import ChatBox from "../components/chat/Chat";
// import { getConversations } from "../api/conversation/getConversations";
// import { getConversation } from "../api/conversation/getConversation";
// import { toast } from "sonner";
// import type { Messages, UserConversations } from "../entities";
// import Loader from "../components/loader";
// import { postMessage } from "../api/conversation";
// import { emeka } from "../utils/assets";

// export interface ConversationsController {
//   loader: boolean;
//   user_conversations: UserConversations[] | undefined;
// }

// export interface UserConversation {
//   loader: boolean;
//   msgs: Messages[] | undefined;
// }

// interface ImageHandler {
//   url: string;
//   file: File;
//   previewImage: string;
// }

// type ModelType = "letter" | "memo" | null;

// export default function Chat() {
//   const navigate = useNavigate();
//   const {
//     accessToken,
//     formatTimestamp,
//     user,
//     setAccessToken,
//     setUser,
//     thread,
//     setThread,
//   } = useAppContext();

//   const userMsgRef: any = useRef(null);
//   const [openAside, setOpenAside] = useState<boolean>(false);

//   // user conversations state
//   const [conversations, setConversations] = useState<ConversationsController>({
//     loader: false,
//     user_conversations: undefined,
//   });
//   const [messages, setMessages] = useState<UserConversation>({
//     loader: false,
//     msgs: undefined,
//   });

//   // Initialize states from localStorage
//   const [currConvId, setCurrConvId] = useState<string | undefined>(() => {
//     const stored = localStorage.getItem("currentConversationId");
//     return stored || undefined;
//   });

//   const [refetchMsgs, setRefetchMsgs] = useState<boolean>(false);

//   const [isNewChat, setIsNewChat] = useState<boolean>(() => {
//     const stored = localStorage.getItem("currentConversationId");
//     return !stored;
//   });

//   const [userMsg, setUserMsg] = useState<string>("");
//   const [error, setError] = useState<boolean>(false);
//   const [isTyping, setIsTyping] = useState<boolean>(false);

//   const [_chatTitle, setChatTitle] = useState<string>(() => {
//     const stored = localStorage.getItem("currentChatTitle");
//     return stored || "New Chat";
//   });

//   const [image, setImage] = useState<ImageHandler>();
//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   // voice recording state
//   const recorderRef = useRef<RecordRTC | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const [audioUrl, setAudioUrl] = useState<string | null>(null);
//   const [voiceNote, setVoiceNote] = useState<Blob>();
//   const [recording, setRecording] = useState<boolean>(false);
//   const [switchMediaUrl, setSwitchMediaUrl] = useState<boolean>(false);
//   const [newMediaUrl, setNewMediaUrl] = useState<string>();

//   // Model selection state
//   const [showModelPopup, setShowModelPopup] = useState<boolean>(false);
//   const [selectedModel, setSelectedModel] = useState<ModelType>(null);
//   const modelPopupRef = useRef<HTMLDivElement>(null);

//   // search history state
//   const [searchText, setSearchText] = useState<string>("");
//   const [queries, setQueries] = useState<UserConversations[]>();

//   const filterSearchText = (text: string) => {
//     const filteredArr = conversations.user_conversations?.filter((conv) =>
//       conv.title.toLowerCase().includes(text.toLowerCase())
//     );
//     return filteredArr ? filteredArr : [];
//   };

//   const updateMediaUrl = async (updatedUrl: string) => {
//     if (thread.length !== 1) {
//       const user_media_message = thread[thread.length - 2];
//       setThread((prev) =>
//         prev.map((item) =>
//           item === user_media_message
//             ? { ...item, media_url: updatedUrl }
//             : item
//         )
//       );
//     }
//   };

//   const setMedia = (): null | string => {
//     if (image?.url) return image.url;
//     if (audioUrl) return audioUrl;
//     return null;
//   };

//   const fetchPrevMsgs = async () => {
//     if (!accessToken) return toast.error("Unauthenticated");

//     setConversations((prevState) => ({ ...prevState, loader: true }));

//     await getConversations(accessToken)
//       .then((resp) => {
//         if (resp.data)
//           setConversations({ loader: false, user_conversations: resp.data });
//         setQueries(resp.data);
//         if (refetchMsgs === true) setRefetchMsgs(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setConversations((prevState) => ({ ...prevState, loader: false }));
//       });
//   };

//   const setMediaType = (url: string): "image" | "audio" | null => {
//     if (!url) return null;
//     if (url.includes(".webm")) return "audio";
//     if (url.includes("image")) return "image";
//     return null;
//   };

//   const handleModelSelect = (model: ModelType) => {
//     setSelectedModel(model);
//     setShowModelPopup(false);
//   };

//   const sendMessage = async () => {
//     if (userMsgRef.current) userMsgRef.current.value = "";
//     if (isNewChat) setIsNewChat(false);
//     setIsTyping(true);

//     if (accessToken) {
//       // payload to server
//       const data = {
//         id: currConvId ? currConvId : null,
//         message: userMsg ? userMsg : "",
//         file: image?.file ? image.file : null,
//         voice_note: voiceNote ? voiceNote : null,
//         model: selectedModel, // Add model to payload
//       };

//       // optimistic user message into thread
//       const userMessage: Messages = {
//         id: currConvId ? currConvId : "",
//         sender: "user",
//         content: userMsg,
//         type: null,
//         media_url: setMedia(),
//         media_type: audioUrl ? "audio" : image?.url ? "image" : null,
//         created_at: null,
//       };

//       setThread((prevState) => [...prevState, userMessage]);

//       postMessage(
//         data.id,
//         data.message,
//         data.file,
//         data.voice_note,
//         data.model,
//         accessToken
//       )
//         .then((resp) => {
//           if (resp.status === "success" && resp.data) {
//             if (!currConvId) setRefetchMsgs(true);

//             const assistantMessage: Messages = {
//               id: resp.data.conversation_id,
//               sender: "ai",
//               content: resp.data.reply,
//               type: resp.data.type ? resp.data.type : null,
//               media_url: resp.data.media_url ? resp.data.media_url : null,
//               media_type: setMediaType(resp.data.media_url),
//               created_at: resp.data.created_at ? resp.data.created_at : null,
//             };

//             setCurrConvId(resp.data.conversation_id);

//             // Save conversation ID to localStorage after first message
//             if (!currConvId && resp.data.conversation_id) {
//               localStorage.setItem(
//                 "currentConversationId",
//                 resp.data.conversation_id
//               );
//             }

//             setThread((prevState) => [...prevState, assistantMessage]);

//             if (resp.data.voice_url) {
//               setSwitchMediaUrl(true);
//               setNewMediaUrl(resp.data.voice_url);
//             }
//             if (resp.data.file_url) {
//               setSwitchMediaUrl(true);
//               setNewMediaUrl(resp.data.file_url);
//             }

//             setIsTyping(false);
//             setUserMsg("");
//             if (audioUrl) setAudioUrl(null);
//             if (voiceNote) setVoiceNote(undefined);
//             setSelectedModel(null); // Reset model after sending
//           }
//         })
//         .catch((error) => {
//           setIsTyping(false);
//           setUserMsg("");
//           if (audioUrl) setAudioUrl(null);
//           if (voiceNote) setVoiceNote(undefined);
//           toast.error(
//             error.response?.data?.message
//               ? error.response.data.message
//               : "Failed to send message"
//           );
//         });

//       if (image?.url || image?.file) setImage(undefined);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const validateMsg = validateInput(userMsg, "message");
//     if (validateMsg !== true) toast.error(validateMsg);
//     sendMessage();
//   };

//   const fetchConversation = async (e: string, title: string) => {
//     if (e === currConvId) return toast.warning("Already set to conversation.");

//     setChatTitle(title);

//     if (error) setError(false);

//     if (!accessToken) return toast.error("Unauthenticated");

//     setMessages((prevState) => ({ ...prevState, loader: true }));

//     await getConversation(e, accessToken)
//       .then((resp) => {
//         if (resp.data) {
//           setMessages({ loader: false, msgs: resp.data.messages });
//           setCurrConvId(resp.data.conversation_id);
//         }
//         setIsNewChat(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setError(true);
//         setMessages((prevState) => ({ ...prevState, loader: false }));
//       });
//   };

//   const initiateLogout = () => {
//     // Clear all localStorage
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("user");
//     localStorage.removeItem("currentConversationId");
//     localStorage.removeItem("currentChatTitle");

//     // Clear state
//     setAccessToken(undefined);
//     setCurrConvId(undefined);
//     setUser(undefined);
//     setThread([]);

//     navigate("/", { replace: true });
//   };

//   const initiateNewChat = () => {
//     if (error) setError(false);
//     setOpenAside(false);
//     setIsNewChat(true);
//     setCurrConvId(undefined);
//     if (thread.length > 1) setThread([]);
//     setChatTitle("New Chat");

//     // Clear persisted conversation data
//     localStorage.removeItem("currentConversationId");
//     localStorage.removeItem("currentChatTitle");
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const systemfile = e.target.files?.[0];
//     if (systemfile) {
//       if (isNewChat) setIsNewChat(false);
//       if (audioUrl) setAudioUrl(null);
//       const localURL = URL.createObjectURL(systemfile);
//       setImage({
//         url: "Processing figure...",
//         file: systemfile,
//         previewImage: localURL,
//       });
//     }
//   };

//   // Recording events
//   const startRecording = async () => {
//     if (userMsgRef.current) userMsgRef.current.value = "";
//     if (image?.url || image?.file) setImage(undefined);

//     if (switchMediaUrl) setSwitchMediaUrl(false);
//     if (newMediaUrl) setNewMediaUrl(undefined);

//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//     streamRef.current = stream;

//     const recorder = new RecordRTC(stream, {
//       type: "audio",
//       sampleRate: 48000,
//       checkForInactiveTracks: true,
//       mimeType: "audio/webm",
//       disableLogs: true,
//     });
//     recorder.startRecording();
//     recorderRef.current = recorder;
//     setRecording(true);
//   };

//   const stopRecording = async () => {
//     if (!recorderRef.current) return;
//     recorderRef.current.stopRecording(() => {
//       const blob = recorderRef.current?.getBlob();
//       if (blob) {
//         setVoiceNote(blob);
//         setAudioUrl("Processing audio...");
//       }
//     });

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }
//     setRecording(false);
//   };

//   // Close popup when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         modelPopupRef.current &&
//         !modelPopupRef.current.contains(event.target as Node)
//       ) {
//         setShowModelPopup(false);
//       }
//     };

//     if (showModelPopup) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showModelPopup]);

//   // Persist currConvId to localStorage
//   useEffect(() => {
//     if (currConvId) {
//       localStorage.setItem("currentConversationId", currConvId);
//     } else {
//       localStorage.removeItem("currentConversationId");
//     }
//   }, [currConvId]);

//   // Persist chatTitle to localStorage
//   useEffect(() => {
//     if (_chatTitle && _chatTitle !== "New Chat") {
//       localStorage.setItem("currentChatTitle", _chatTitle);
//     } else {
//       localStorage.removeItem("currentChatTitle");
//     }
//   }, [_chatTitle]);

//   // Initialize chat on component mount
//   useEffect(() => {
//     const initializeChat = async () => {
//       // Fetch all conversations first
//       await fetchPrevMsgs();

//       // Check if there's a stored conversation to restore
//       const storedConvId = localStorage.getItem("currentConversationId");

//       if (storedConvId && accessToken) {
//         // Restore the conversation
//         try {
//           setMessages((prevState) => ({ ...prevState, loader: true }));

//           const resp = await getConversation(storedConvId, accessToken);

//           if (resp.data) {
//             setMessages({ loader: false, msgs: resp.data.messages });
//             setCurrConvId(resp.data.conversation_id);
//             setIsNewChat(false);
//           }
//         } catch (error) {
//           console.log("Error restoring conversation:", error);
//           setMessages((prevState) => ({ ...prevState, loader: false }));
//           // If conversation can't be restored, start fresh
//           localStorage.removeItem("currentConversationId");
//           localStorage.removeItem("currentChatTitle");
//           setIsNewChat(true);
//         }
//       }

//       // Focus on input
//       try {
//         userMsgRef.current?.focus();
//       } catch {}
//     };

//     initializeChat();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (searchText === "") {
//       setQueries(conversations.user_conversations);
//     } else {
//       setQueries(filterSearchText(searchText));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchText]);

//   useEffect(() => {
//     if (refetchMsgs === true) {
//       fetchPrevMsgs();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [refetchMsgs]);

//   useEffect(() => {
//     if (audioUrl) {
//       sendMessage();
//       recorderRef.current = null;
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [audioUrl]);

//   useEffect(() => {
//     if (switchMediaUrl) {
//       if (newMediaUrl) updateMediaUrl(newMediaUrl);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [switchMediaUrl]);

//   useEffect(() => {
//     if (messages.msgs) setThread(messages.msgs);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [messages.msgs]);

//   useEffect(() => {
//     bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
//   }, [thread]);

//   return (
//     <main className="h-screen relative md:flex bg-white">
//       {/* sidebar */}
//       <Sidebar
//         initiateLogout={initiateLogout}
//         setOpenAside={setOpenAside}
//         fetchConversation={fetchConversation}
//         formatTimestamp={formatTimestamp}
//         conversations={conversations}
//         openAside={openAside}
//         initiateNewChat={initiateNewChat}
//         currConvId={currConvId}
//         setSearchText={setSearchText}
//         queries={queries}
//       />

//       {/* mobile overlay when sidebar is open */}
//       <div
//         onClick={() => setOpenAside(false)}
//         className={`absolute w-full h-full bg-[#0A1F0FBD] transition-all ease-in-out delay-75 z-10 md:hidden ${
//           openAside ? "left-0" : "-left-full"
//         }`}
//       />

//       <section className="flex flex-col h-full md:w-full transition ease-in-out delay-100 sm:overflow-hidden text-[#333333]">
//         <header className="flex flex-row items-center justify-between p-5 lg:mb-2">
//           <div className="flex flex-row gap-x-3 items-center">
//             <button
//               onClick={() => setOpenAside(true)}
//               className="cursor-pointer md:hidden"
//             >
//               <GiHamburgerMenu size={20} />
//             </button>
//             <span>
//               <img
//                 onClick={() => navigate("/")}
//                 src={emeka}
//                 alt="Logo"
//                 className="h-10 w-auto cursor-pointer"
//                 draggable={false}
//               />
//             </span>
//           </div>
//           <div className="flex flex-row gap-x-2 items-center">
//             <div
//               draggable={false}
//               className="min-w-[30px] max-w-[30px] h-[30px] rounded-full flex items-center justify-center text-white bg-[#1A1D18]"
//             >
//               <FaUserLarge />
//             </div>
//             <div className="flex flex-col gap-y-0.5">
//               <h3 className="font-semibold">{user?.name}</h3>
//             </div>
//           </div>
//         </header>

//         {/* chat box */}
//         <div className="relative flex flex-col items-center flex-grow">
//           {/* new chat welcome message */}
//           {isNewChat && !messages.loader && !error && (
//             <IntroMessage theme="light" />
//           )}

//           {/* chat messages */}
//           {!isNewChat && !messages.loader && !error && (
//             <ChatBox
//               isTyping={isTyping}
//               bottomRef={bottomRef}
//               theme="light"
//               messages={thread}
//             />
//           )}

//           {/* loading state */}
//           {messages.loader && (
//             <div className="flex-1 w-full h-[300px] flex flex-col gap-y-1 text-sm items-center justify-center lg:text-lg">
//               <Loader color="#5c5c5c" size={18} />
//               <p>Loading messages...</p>
//             </div>
//           )}

//           {/* error state */}
//           {error && (
//             <p className="text-red-700 text-xs text-center lg:text-sm px-5">
//               Error in getting messages. <br /> Please click on selected chat to
//               reload or check your network connection.
//             </p>
//           )}

//           {/* input area */}
//           <form
//             onSubmit={handleSubmit}
//             className={`rounded-xl h-fit flex flex-col gap-y-1 transition ease-in-out delay-100 ${
//               isNewChat
//                 ? "max-w-[382px] mt-10 w-full"
//                 : "absolute bottom-3 w-[90%] lg:bottom-5"
//             } bg-[#EBEBEB] text-[#333333] ${
//               messages.loader || error ? "hidden" : "flex"
//             }`}
//           >
//             {/* Model selection indicator */}
//             {selectedModel && (
//               <div className="px-5 pt-2 flex items-center gap-x-2">
//                 <div className="inline-flex items-center gap-x-1.5 bg-[#1A1D18] text-white px-3 py-1 rounded-full text-xs">
//                   {selectedModel === "letter" ? (
//                     <>
//                       <MdOutlineEmail size={14} />
//                       <span>Letter</span>
//                     </>
//                   ) : (
//                     <>
//                       <HiOutlineDocumentText size={14} />
//                       <span>Memo</span>
//                     </>
//                   )}
//                   <button
//                     type="button"
//                     onClick={() => setSelectedModel(null)}
//                     className="ml-1 hover:bg-white/20 rounded-full p-0.5"
//                   >
//                     <AiOutlineClose size={12} />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* image preview */}
//             {!isNewChat && image?.previewImage && (
//               <div className="w-[100px] h-auto p-3 relative lg:w-[150px]">
//                 <img
//                   className="w-full h-fit"
//                   src={image?.previewImage}
//                   draggable={false}
//                   alt="img"
//                   loading="lazy"
//                   decoding="async"
//                 />
//                 <button
//                   onClick={() => setImage(undefined)}
//                   className="absolute top-1 right-0 w-[20px] h-[20px] bg-red-800 rounded-full flex items-center justify-center cursor-pointer"
//                 >
//                   <AiOutlineClose size={14} />
//                 </button>
//               </div>
//             )}

//             <div className="flex items-center justify-center gap-x-0.5 h-[67px] py-2 px-5 relative">
//               {/* Plus button with popup */}
//               <div className="relative" ref={modelPopupRef}>
//                 <button
//                   type="button"
//                   onClick={() => setShowModelPopup(!showModelPopup)}
//                   className={`cursor-pointer min-w-[30px] max-w-[30px] h-[30px] rounded-full flex items-center justify-center transition-colors ${
//                     selectedModel
//                       ? "bg-[#1A1D18] text-white"
//                       : "hover:bg-[#d4d4d4]"
//                   }`}
//                 >
//                   <AiOutlinePlus size={20} />
//                 </button>

//                 {/* Popup menu */}
//                 {showModelPopup && (
//                   <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 w-40">
//                     <button
//                       type="button"
//                       onClick={() => handleModelSelect("letter")}
//                       className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-x-2 text-sm transition-colors"
//                     >
//                       <MdOutlineEmail size={18} />
//                       <span>Letter</span>
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => handleModelSelect("memo")}
//                       className="w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-x-2 text-sm transition-colors border-t border-gray-100"
//                     >
//                       <HiOutlineDocumentText size={18} />
//                       <span>Memo</span>
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="cursor-pointer relative">
//                 <IoMdAttach size={24} className="rotate-30" />
//                 <input
//                   type="file"
//                   accept="image/png, image/jpg, image/jpeg"
//                   className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 appearance-none opacity-0"
//                   maxLength={2 * 1024 * 1024}
//                   name="file"
//                   onChange={(e) => {
//                     if (voiceNote) setVoiceNote(undefined);
//                     if (audioUrl) setAudioUrl(null);
//                     if (switchMediaUrl) setSwitchMediaUrl(false);
//                     if (newMediaUrl) setNewMediaUrl(undefined);
//                     handleImageChange(e);
//                   }}
//                 />
//               </div>

//               {recording ? (
//                 <div className="flex flex-1 items-center justify-center">
//                   <GiSoundWaves size={40} />
//                 </div>
//               ) : (
//                 <input
//                   className="rounded-lg focus:outline-none h-full w-full px-3"
//                   placeholder="| Type message here..."
//                   name="userMsg"
//                   ref={userMsgRef}
//                   onChange={(e) => {
//                     if (voiceNote) setVoiceNote(undefined);
//                     if (audioUrl) setAudioUrl(null);
//                     if (switchMediaUrl) setSwitchMediaUrl(false);
//                     if (newMediaUrl) setNewMediaUrl(undefined);
//                     setUserMsg(e.target.value);
//                   }}
//                 />
//               )}

//               <div
//                 onClick={!recording ? startRecording : stopRecording}
//                 className="min-w-[30px] max-w-[30px] h-[30px] mr-1 rounded-full flex items-center justify-center text-inherit hover:cursor-pointer hover:bg-[#ffffff09] transition delay-100 ease-in-out"
//               >
//                 {!recording ? (
//                   <FaMicrophone size={20} />
//                 ) : (
//                   <FaCircleStop size={25} />
//                 )}
//               </div>

//               <button
//                 disabled={isTyping || !userMsg}
//                 className=" cursor-pointer disabled:text-[#5c5c5c] disabled:cursor-not-allowed"
//               >
//                 <FiSend size={23} />
//               </button>
//             </div>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// }

// import { GiHamburgerMenu } from "react-icons/gi";
// import { useAppContext } from "../context";
// import { IoMdAttach } from "react-icons/io";
// import { GiSoundWaves } from "react-icons/gi";
// import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
// import { validateInput } from "../validation";
// import { useNavigate } from "react-router-dom";
// import { FaUserLarge, FaCircleStop } from "react-icons/fa6";
// import { HiOutlineDocumentText } from "react-icons/hi";
// import { MdOutlineEmail } from "react-icons/md";
// import { BiMessageSquareDetail } from "react-icons/bi";
// import RecordRTC from "recordrtc";
// import IntroMessage from "../components/chat/IntroSection";
// import Sidebar from "../components/chat/Sidebar";
// import { useEffect, useRef, useState } from "react";
// import { FiSend } from "react-icons/fi";
// import { FaMicrophone } from "react-icons/fa";
// import ChatBox from "../components/chat/Chat";
// import { getConversations } from "../api/conversation/getConversations";
// import { getConversation } from "../api/conversation/getConversation";
// import { toast } from "sonner";
// import type { Messages, UserConversations } from "../entities";
// import Loader from "../components/loader";
// import { postMessage } from "../api/conversation";
// import { emeka } from "../utils/assets";

// export interface ConversationsController {
//   loader: boolean;
//   user_conversations: UserConversations[] | undefined;
// }

// export interface UserConversation {
//   loader: boolean;
//   msgs: Messages[] | undefined;
// }

// interface ImageHandler {
//   url: string;
//   file: File;
//   previewImage: string;
// }

// type ModelType = "general" | "letter" | "memo";

// export default function Chat() {
//   const navigate = useNavigate();
//   const {
//     accessToken,
//     formatTimestamp,
//     user,
//     setAccessToken,
//     setUser,
//     thread,
//     setThread,
//   } = useAppContext();

//   const userMsgRef: any = useRef(null);
//   const [openAside, setOpenAside] = useState<boolean>(false);

//   // user conversations state
//   const [conversations, setConversations] = useState<ConversationsController>({
//     loader: false,
//     user_conversations: undefined,
//   });
//   const [messages, setMessages] = useState<UserConversation>({
//     loader: false,
//     msgs: undefined,
//   });

//   // Initialize states from memory (not localStorage)
//   const [currConvId, setCurrConvId] = useState<string | undefined>(undefined);
//   const [refetchMsgs, setRefetchMsgs] = useState<boolean>(false);
//   const [isNewChat, setIsNewChat] = useState<boolean>(true);

//   const [userMsg, setUserMsg] = useState<string>("");
//   const [error, setError] = useState<boolean>(false);
//   const [isTyping, setIsTyping] = useState<boolean>(false);

//   const [_chatTitle, setChatTitle] = useState<string>("New Chat");

//   const [image, setImage] = useState<ImageHandler>();
//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   // voice recording state
//   const recorderRef = useRef<RecordRTC | null>(null);
//   const streamRef = useRef<MediaStream | null>(null);
//   const [audioUrl, setAudioUrl] = useState<string | null>(null);
//   const [voiceNote, setVoiceNote] = useState<Blob>();
//   const [recording, setRecording] = useState<boolean>(false);
//   const [switchMediaUrl, setSwitchMediaUrl] = useState<boolean>(false);
//   const [newMediaUrl, setNewMediaUrl] = useState<string>();

//   // Model selection state - default to "general"
//   const [showModelPopup, setShowModelPopup] = useState<boolean>(false);
//   const [selectedModel, setSelectedModel] = useState<ModelType>("general");
//   const modelPopupRef = useRef<HTMLDivElement>(null);

//   // search history state
//   const [searchText, setSearchText] = useState<string>("");
//   const [queries, setQueries] = useState<UserConversations[]>();

//   const filterSearchText = (text: string) => {
//     const filteredArr = conversations.user_conversations?.filter((conv) =>
//       conv.title.toLowerCase().includes(text.toLowerCase())
//     );
//     return filteredArr ? filteredArr : [];
//   };

//   const updateMediaUrl = async (updatedUrl: string) => {
//     if (thread.length !== 1) {
//       const user_media_message = thread[thread.length - 2];
//       setThread((prev) =>
//         prev.map((item) =>
//           item === user_media_message
//             ? { ...item, media_url: updatedUrl }
//             : item
//         )
//       );
//     }
//   };

//   const setMedia = (): null | string => {
//     if (image?.url) return image.url;
//     if (audioUrl) return audioUrl;
//     return null;
//   };

//   const fetchPrevMsgs = async () => {
//     if (!accessToken) return toast.error("Unauthenticated");

//     setConversations((prevState) => ({ ...prevState, loader: true }));

//     await getConversations(accessToken)
//       .then((resp) => {
//         if (resp.data)
//           setConversations({ loader: false, user_conversations: resp.data });
//         setQueries(resp.data);
//         if (refetchMsgs === true) setRefetchMsgs(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setConversations((prevState) => ({ ...prevState, loader: false }));
//       });
//   };

//   const setMediaType = (url: string): "image" | "audio" | null => {
//     if (!url) return null;
//     if (url.includes(".webm")) return "audio";
//     if (url.includes("image")) return "image";
//     return null;
//   };

//   const handleModelSelect = (model: ModelType) => {
//     setSelectedModel(model);
//     setShowModelPopup(false);
//   };

//   const sendMessage = async () => {
//     if (userMsgRef.current) userMsgRef.current.value = "";
//     if (isNewChat) setIsNewChat(false);
//     setIsTyping(true);

//     if (accessToken) {
//       // payload to server - always send the selected model (defaults to "general")
//       const data = {
//         id: currConvId ? currConvId : null,
//         message: userMsg ? userMsg : "",
//         file: image?.file ? image.file : null,
//         voice_note: voiceNote ? voiceNote : null,
//         model: selectedModel, // Will always have a value (defaults to "general")
//       };

//       // optimistic user message into thread
//       const userMessage: Messages = {
//         id: currConvId ? currConvId : "",
//         sender: "user",
//         content: userMsg,
//         type: null,
//         media_url: setMedia(),
//         media_type: audioUrl ? "audio" : image?.url ? "image" : null,
//         created_at: null,
//       };

//       setThread((prevState) => [...prevState, userMessage]);

//       postMessage(
//         data.id,
//         data.message,
//         data.file,
//         data.voice_note,
//         data.model,
//         accessToken
//       )
//         .then((resp) => {
//           if (resp.status === "success" && resp.data) {
//             if (!currConvId) setRefetchMsgs(true);

//             const assistantMessage: Messages = {
//               id: resp.data.conversation_id,
//               sender: "ai",
//               content: resp.data.reply,
//               type: resp.data.type ? resp.data.type : null,
//               media_url: resp.data.media_url ? resp.data.media_url : null,
//               media_type: setMediaType(resp.data.media_url),
//               created_at: resp.data.created_at ? resp.data.created_at : null,
//             };

//             setCurrConvId(resp.data.conversation_id);

//             setThread((prevState) => [...prevState, assistantMessage]);

//             if (resp.data.voice_url) {
//               setSwitchMediaUrl(true);
//               setNewMediaUrl(resp.data.voice_url);
//             }
//             if (resp.data.file_url) {
//               setSwitchMediaUrl(true);
//               setNewMediaUrl(resp.data.file_url);
//             }

//             setIsTyping(false);
//             setUserMsg("");
//             if (audioUrl) setAudioUrl(null);
//             if (voiceNote) setVoiceNote(undefined);
//             // Keep the selected model - don't reset
//           }
//         })
//         .catch((error) => {
//           setIsTyping(false);
//           setUserMsg("");
//           if (audioUrl) setAudioUrl(null);
//           if (voiceNote) setVoiceNote(undefined);
//           toast.error(
//             error.response?.data?.message
//               ? error.response.data.message
//               : "Failed to send message"
//           );
//         });

//       if (image?.url || image?.file) setImage(undefined);
//     }
//   };

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const validateMsg = validateInput(userMsg, "message");
//     if (validateMsg !== true) toast.error(validateMsg);
//     sendMessage();
//   };

//   const fetchConversation = async (e: string, title: string) => {
//     if (e === currConvId) return toast.warning("Already set to conversation.");

//     setChatTitle(title);

//     if (error) setError(false);

//     if (!accessToken) return toast.error("Unauthenticated");

//     setMessages((prevState) => ({ ...prevState, loader: true }));

//     await getConversation(e, accessToken)
//       .then((resp) => {
//         if (resp.data) {
//           setMessages({ loader: false, msgs: resp.data.messages });
//           setCurrConvId(resp.data.conversation_id);
//         }
//         setIsNewChat(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setError(true);
//         setMessages((prevState) => ({ ...prevState, loader: false }));
//       });
//   };

//   const initiateLogout = () => {
//     // Clear state
//     setAccessToken(undefined);
//     setCurrConvId(undefined);
//     setUser(undefined);
//     setThread([]);

//     navigate("/", { replace: true });
//   };

//   const initiateNewChat = () => {
//     if (error) setError(false);
//     setOpenAside(false);
//     setIsNewChat(true);
//     setCurrConvId(undefined);
//     if (thread.length > 1) setThread([]);
//     setChatTitle("New Chat");

//     // Reset model to default "general" on new chat
//     setSelectedModel("general");
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const systemfile = e.target.files?.[0];
//     if (systemfile) {
//       if (isNewChat) setIsNewChat(false);
//       if (audioUrl) setAudioUrl(null);
//       const localURL = URL.createObjectURL(systemfile);
//       setImage({
//         url: "Processing figure...",
//         file: systemfile,
//         previewImage: localURL,
//       });
//     }
//   };

//   // Recording events
//   const startRecording = async () => {
//     if (userMsgRef.current) userMsgRef.current.value = "";
//     if (image?.url || image?.file) setImage(undefined);

//     if (switchMediaUrl) setSwitchMediaUrl(false);
//     if (newMediaUrl) setNewMediaUrl(undefined);

//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//     streamRef.current = stream;

//     const recorder = new RecordRTC(stream, {
//       type: "audio",
//       sampleRate: 48000,
//       checkForInactiveTracks: true,
//       mimeType: "audio/webm",
//       disableLogs: true,
//     });
//     recorder.startRecording();
//     recorderRef.current = recorder;
//     setRecording(true);
//   };

//   const stopRecording = async () => {
//     if (!recorderRef.current) return;
//     recorderRef.current.stopRecording(() => {
//       const blob = recorderRef.current?.getBlob();
//       if (blob) {
//         setVoiceNote(blob);
//         setAudioUrl("Processing audio...");
//       }
//     });

//     if (streamRef.current) {
//       streamRef.current.getTracks().forEach((track) => track.stop());
//       streamRef.current = null;
//     }
//     setRecording(false);
//   };

//   // Close popup when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         modelPopupRef.current &&
//         !modelPopupRef.current.contains(event.target as Node)
//       ) {
//         setShowModelPopup(false);
//       }
//     };

//     if (showModelPopup) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showModelPopup]);

//   // Initialize chat on component mount
//   useEffect(() => {
//     const initializeChat = async () => {
//       // Fetch all conversations
//       await fetchPrevMsgs();

//       // Focus on input
//       try {
//         userMsgRef.current?.focus();
//       } catch {}
//     };

//     initializeChat();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (searchText === "") {
//       setQueries(conversations.user_conversations);
//     } else {
//       setQueries(filterSearchText(searchText));
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchText]);

//   useEffect(() => {
//     if (refetchMsgs === true) {
//       fetchPrevMsgs();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [refetchMsgs]);

//   useEffect(() => {
//     if (audioUrl) {
//       sendMessage();
//       recorderRef.current = null;
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [audioUrl]);

//   useEffect(() => {
//     if (switchMediaUrl) {
//       if (newMediaUrl) updateMediaUrl(newMediaUrl);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [switchMediaUrl]);

//   useEffect(() => {
//     if (messages.msgs) setThread(messages.msgs);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [messages.msgs]);

//   useEffect(() => {
//     bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
//   }, [thread]);

//   const getModelIcon = (model: ModelType) => {
//     switch (model) {
//       case "general":
//         return <BiMessageSquareDetail size={14} />;
//       case "letter":
//         return <MdOutlineEmail size={14} />;
//       case "memo":
//         return <HiOutlineDocumentText size={14} />;
//     }
//   };

//   const getModelLabel = (model: ModelType) => {
//     switch (model) {
//       case "general":
//         return "General";
//       case "letter":
//         return "Letter";
//       case "memo":
//         return "Memo";
//     }
//   };

//   return (
//     <main className="h-screen relative md:flex bg-white">
//       {/* sidebar */}
//       <Sidebar
//         initiateLogout={initiateLogout}
//         setOpenAside={setOpenAside}
//         fetchConversation={fetchConversation}
//         formatTimestamp={formatTimestamp}
//         conversations={conversations}
//         openAside={openAside}
//         initiateNewChat={initiateNewChat}
//         currConvId={currConvId}
//         setSearchText={setSearchText}
//         queries={queries}
//       />

//       {/* mobile overlay when sidebar is open */}
//       <div
//         onClick={() => setOpenAside(false)}
//         className={`absolute w-full h-full bg-[#0A1F0FBD] transition-all ease-in-out delay-75 z-10 md:hidden ${
//           openAside ? "left-0" : "-left-full"
//         }`}
//       />

//       <section className="flex flex-col h-full md:w-full transition ease-in-out delay-100 sm:overflow-hidden text-[#333333]">
//         <header className="flex flex-row items-center justify-between p-5 lg:mb-2">
//           <div className="flex flex-row gap-x-3 items-center">
//             <button
//               onClick={() => setOpenAside(true)}
//               className="cursor-pointer md:hidden"
//             >
//               <GiHamburgerMenu size={20} />
//             </button>
//             <span>
//               <img
//                 onClick={() => navigate("/")}
//                 src={emeka}
//                 alt="Logo"
//                 className="h-10 w-auto cursor-pointer"
//                 draggable={false}
//               />
//             </span>
//           </div>
//           <div className="flex flex-row gap-x-2 items-center">
//             <div
//               draggable={false}
//               className="min-w-[30px] max-w-[30px] h-[30px] rounded-full flex items-center justify-center text-white bg-[#1A1D18]"
//             >
//               <FaUserLarge />
//             </div>
//             <div className="flex flex-col gap-y-0.5">
//               <h3 className="font-semibold">{user?.name}</h3>
//             </div>
//           </div>
//         </header>

//         {/* chat box */}
//         <div className="relative flex flex-col items-center flex-grow">
//           {/* new chat welcome message */}
//           {isNewChat && !messages.loader && !error && (
//             <IntroMessage theme="light" />
//           )}

//           {/* chat messages */}
//           {!isNewChat && !messages.loader && !error && (
//             <ChatBox
//               isTyping={isTyping}
//               bottomRef={bottomRef}
//               theme="light"
//               messages={thread}
//             />
//           )}

//           {/* loading state */}
//           {messages.loader && (
//             <div className="flex-1 w-full h-[300px] flex flex-col gap-y-1 text-sm items-center justify-center lg:text-lg">
//               <Loader color="#5c5c5c" size={18} />
//               <p>Loading messages...</p>
//             </div>
//           )}

//           {/* error state */}
//           {error && (
//             <p className="text-red-700 text-xs text-center lg:text-sm px-5">
//               Error in getting messages. <br /> Please click on selected chat to
//               reload or check your network connection.
//             </p>
//           )}

//           {/* input area */}
//           <form
//             onSubmit={handleSubmit}
//             className={`rounded-xl h-fit flex flex-col gap-y-1 transition ease-in-out delay-100 ${
//               isNewChat
//                 ? "max-w-[382px] mt-10 w-full"
//                 : "absolute bottom-3 w-[90%] lg:bottom-5"
//             } bg-[#EBEBEB] text-[#333333] ${
//               messages.loader || error ? "hidden" : "flex"
//             }`}
//           >
//             {/* Model selection indicator - always show current model */}
//             {selectedModel && (
//               <div className="px-5 pt-2 flex items-center gap-x-2">
//                 <div className="inline-flex items-center gap-x-1.5 bg-[#1A1D18] text-white px-3 py-1 rounded-full text-xs">
//                   {getModelIcon(selectedModel)}
//                   <span>{getModelLabel(selectedModel)}</span>
//                 </div>
//               </div>
//             )}

//             {/* image preview */}
//             {!isNewChat && image?.previewImage && (
//               <div className="w-[100px] h-auto p-3 relative lg:w-[150px]">
//                 <img
//                   className="w-full h-fit"
//                   src={image?.previewImage}
//                   draggable={false}
//                   alt="img"
//                   loading="lazy"
//                   decoding="async"
//                 />
//                 <button
//                   onClick={() => setImage(undefined)}
//                   className="absolute top-1 right-0 w-[20px] h-[20px] bg-red-800 rounded-full flex items-center justify-center cursor-pointer"
//                 >
//                   <AiOutlineClose size={14} />
//                 </button>
//               </div>
//             )}

//             <div className="flex items-center justify-center gap-x-0.5 h-[67px] py-2 px-5 relative">
//               {/* Plus button with popup */}
//               <div className="relative" ref={modelPopupRef}>
//                 <button
//                   type="button"
//                   onClick={() => setShowModelPopup(!showModelPopup)}
//                   className={`cursor-pointer min-w-[30px] max-w-[30px] h-[30px] rounded-full flex items-center justify-center transition-colors ${
//                     selectedModel !== "general"
//                       ? "bg-[#1A1D18] text-white"
//                       : "hover:bg-[#d4d4d4]"
//                   }`}
//                   title="Select model"
//                 >
//                   <AiOutlinePlus size={20} />
//                 </button>

//                 {/* Popup menu */}
//                 {showModelPopup && (
//                   <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 w-40">
//                     <button
//                       type="button"
//                       onClick={() => handleModelSelect("general")}
//                       className={`w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-x-2 text-sm transition-colors ${
//                         selectedModel === "general" ? "bg-gray-50" : ""
//                       }`}
//                     >
//                       <BiMessageSquareDetail size={18} />
//                       <span>General</span>
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => handleModelSelect("letter")}
//                       className={`w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-x-2 text-sm transition-colors border-t border-gray-100 ${
//                         selectedModel === "letter" ? "bg-gray-50" : ""
//                       }`}
//                     >
//                       <MdOutlineEmail size={18} />
//                       <span>Letter</span>
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => handleModelSelect("memo")}
//                       className={`w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-x-2 text-sm transition-colors border-t border-gray-100 ${
//                         selectedModel === "memo" ? "bg-gray-50" : ""
//                       }`}
//                     >
//                       <HiOutlineDocumentText size={18} />
//                       <span>Memo</span>
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <div className="cursor-pointer relative">
//                 <IoMdAttach size={24} className="rotate-30" />
//                 <input
//                   type="file"
//                   accept="image/png, image/jpg, image/jpeg"
//                   className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 appearance-none opacity-0"
//                   maxLength={2 * 1024 * 1024}
//                   name="file"
//                   onChange={(e) => {
//                     if (voiceNote) setVoiceNote(undefined);
//                     if (audioUrl) setAudioUrl(null);
//                     if (switchMediaUrl) setSwitchMediaUrl(false);
//                     if (newMediaUrl) setNewMediaUrl(undefined);
//                     handleImageChange(e);
//                   }}
//                 />
//               </div>

//               {recording ? (
//                 <div className="flex flex-1 items-center justify-center">
//                   <GiSoundWaves size={40} />
//                 </div>
//               ) : (
//                 <input
//                   className="rounded-lg focus:outline-none h-full w-full px-3"
//                   placeholder="| Type message here..."
//                   name="userMsg"
//                   ref={userMsgRef}
//                   onChange={(e) => {
//                     if (voiceNote) setVoiceNote(undefined);
//                     if (audioUrl) setAudioUrl(null);
//                     if (switchMediaUrl) setSwitchMediaUrl(false);
//                     if (newMediaUrl) setNewMediaUrl(undefined);
//                     setUserMsg(e.target.value);
//                   }}
//                 />
//               )}

//               <div
//                 onClick={!recording ? startRecording : stopRecording}
//                 className="min-w-[30px] max-w-[30px] h-[30px] mr-1 rounded-full flex items-center justify-center text-inherit hover:cursor-pointer hover:bg-[#ffffff09] transition delay-100 ease-in-out"
//               >
//                 {!recording ? (
//                   <FaMicrophone size={20} />
//                 ) : (
//                   <FaCircleStop size={25} />
//                 )}
//               </div>

//               <button
//                 disabled={isTyping || !userMsg}
//                 className=" cursor-pointer disabled:text-[#5c5c5c] disabled:cursor-not-allowed"
//               >
//                 <FiSend size={23} />
//               </button>
//             </div>
//           </form>
//         </div>
//       </section>
//     </main>
//   );
// }

import { GiHamburgerMenu } from "react-icons/gi";
import { useAppContext } from "../context";
import { IoMdAttach } from "react-icons/io";
import { GiSoundWaves } from "react-icons/gi";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { validateInput } from "../validation";
import { useNavigate } from "react-router-dom";
import { FaUserLarge, FaCircleStop } from "react-icons/fa6";
import { HiOutlineDocumentText } from "react-icons/hi";
import { MdOutlineEmail } from "react-icons/md";
import { BiMessageSquareDetail } from "react-icons/bi";
import RecordRTC from "recordrtc";
import IntroMessage from "../components/chat/IntroSection";
import Sidebar from "../components/chat/Sidebar";
import { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { FaMicrophone } from "react-icons/fa";
import ChatBox from "../components/chat/Chat";
import { getConversations } from "../api/conversation/getConversations";
import { getConversation } from "../api/conversation/getConversation";
import { toast } from "sonner";
import type { Messages, UserConversations } from "../entities";
import Loader from "../components/loader";
import { postMessage } from "../api/conversation";
import { emeka } from "../utils/assets";

export interface ConversationsController {
  loader: boolean;
  user_conversations: UserConversations[] | undefined;
}

export interface UserConversation {
  loader: boolean;
  msgs: Messages[] | undefined;
}

interface ImageHandler {
  url: string;
  file: File;
  previewImage: string;
}

type ModelType = "general" | "letter" | "memo";

export default function Chat() {
  const navigate = useNavigate();
  const {
    accessToken,
    formatTimestamp,
    user,
    setAccessToken,
    setUser,
    thread,
    setThread,
  } = useAppContext();

  const userMsgRef: any = useRef(null);
  const [openAside, setOpenAside] = useState<boolean>(false);

  // user conversations state
  const [conversations, setConversations] = useState<ConversationsController>({
    loader: false,
    user_conversations: undefined,
  });
  const [messages, setMessages] = useState<UserConversation>({
    loader: false,
    msgs: undefined,
  });

  // Initialize states from memory (not localStorage)
  const [currConvId, setCurrConvId] = useState<string | undefined>(undefined);
  const [refetchMsgs, setRefetchMsgs] = useState<boolean>(false);
  const [isNewChat, setIsNewChat] = useState<boolean>(true);

  const [userMsg, setUserMsg] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const [_chatTitle, setChatTitle] = useState<string>("New Chat");

  const [image, setImage] = useState<ImageHandler>();
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // voice recording state
  const recorderRef = useRef<RecordRTC | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [voiceNote, setVoiceNote] = useState<Blob>();
  const [recording, setRecording] = useState<boolean>(false);
  const [switchMediaUrl, setSwitchMediaUrl] = useState<boolean>(false);
  const [newMediaUrl, setNewMediaUrl] = useState<string>();

  // Model selection state - default to "general"
  const [showModelPopup, setShowModelPopup] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<ModelType>("general");
  const modelPopupRef = useRef<HTMLDivElement>(null);

  // search history state
  const [searchText, setSearchText] = useState<string>("");
  const [queries, setQueries] = useState<UserConversations[]>();

  const filterSearchText = (text: string) => {
    const filteredArr = conversations.user_conversations?.filter((conv) =>
      conv.title.toLowerCase().includes(text.toLowerCase())
    );
    return filteredArr ? filteredArr : [];
  };

  const updateMediaUrl = async (updatedUrl: string) => {
    if (thread.length !== 1) {
      const user_media_message = thread[thread.length - 2];
      setThread((prev) =>
        prev.map((item) =>
          item === user_media_message
            ? { ...item, media_url: updatedUrl }
            : item
        )
      );
    }
  };

  const setMedia = (): null | string => {
    if (image?.url) return image.url;
    if (audioUrl) return audioUrl;
    return null;
  };

  const fetchPrevMsgs = async () => {
    if (!accessToken) return toast.error("Unauthenticated");

    setConversations((prevState) => ({ ...prevState, loader: true }));

    await getConversations(accessToken)
      .then((resp) => {
        if (resp.data)
          setConversations({ loader: false, user_conversations: resp.data });
        setQueries(resp.data);
        if (refetchMsgs === true) setRefetchMsgs(false);
      })
      .catch((error) => {
        console.log(error);
        setConversations((prevState) => ({ ...prevState, loader: false }));
      });
  };

  const setMediaType = (url: string): "image" | "audio" | null => {
    if (!url) return null;
    if (url.includes(".webm")) return "audio";
    if (url.includes("image")) return "image";
    return null;
  };

  const handleModelSelect = (model: ModelType) => {
    setSelectedModel(model);
    setShowModelPopup(false);
  };

  const sendMessage = async () => {
    if (userMsgRef.current) userMsgRef.current.value = "";
    if (isNewChat) setIsNewChat(false);
    setIsTyping(true);

    if (accessToken) {
      // payload to server - always send the selected model (defaults to "general")
      const data = {
        id: currConvId ? currConvId : null,
        message: userMsg ? userMsg : "",
        file: image?.file ? image.file : null,
        voice_note: voiceNote ? voiceNote : null,
        model: selectedModel, // Will always have a value (defaults to "general")
      };

      // optimistic user message into thread
      const userMessage: Messages = {
        id: currConvId ? currConvId : "",
        sender: "user",
        content: userMsg,
        type: null,
        media_url: setMedia(),
        media_type: audioUrl ? "audio" : image?.url ? "image" : null,
        created_at: null,
      };

      setThread((prevState) => [...prevState, userMessage]);

      postMessage(
        data.id,
        data.message,
        data.file,
        data.voice_note,
        data.model,
        accessToken
      )
        .then((resp) => {
          if (resp.status === "success" && resp.data) {
            if (!currConvId) setRefetchMsgs(true);

            const assistantMessage: Messages = {
              id: resp.data.conversation_id,
              sender: "ai",
              content: resp.data.reply,
              type: resp.data.type ? resp.data.type : null,
              media_url: resp.data.media_url ? resp.data.media_url : null,
              media_type: setMediaType(resp.data.media_url),
              created_at: resp.data.created_at ? resp.data.created_at : null,
            };

            setCurrConvId(resp.data.conversation_id);

            setThread((prevState) => [...prevState, assistantMessage]);

            if (resp.data.voice_url) {
              setSwitchMediaUrl(true);
              setNewMediaUrl(resp.data.voice_url);
            }
            if (resp.data.file_url) {
              setSwitchMediaUrl(true);
              setNewMediaUrl(resp.data.file_url);
            }

            setIsTyping(false);
            setUserMsg("");
            if (audioUrl) setAudioUrl(null);
            if (voiceNote) setVoiceNote(undefined);
            // Keep the selected model - don't reset
          }
        })
        .catch((error) => {
          setIsTyping(false);
          setUserMsg("");
          if (audioUrl) setAudioUrl(null);
          if (voiceNote) setVoiceNote(undefined);
          toast.error(
            error.response?.data?.message
              ? error.response.data.message
              : "Failed to send message"
          );
        });

      if (image?.url || image?.file) setImage(undefined);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validateMsg = validateInput(userMsg, "message");
    if (validateMsg !== true) toast.error(validateMsg);
    sendMessage();
  };

  const fetchConversation = async (e: string, title: string) => {
    if (e === currConvId) return toast.warning("Already set to conversation.");

    setChatTitle(title);

    if (error) setError(false);

    if (!accessToken) return toast.error("Unauthenticated");

    setMessages((prevState) => ({ ...prevState, loader: true }));

    await getConversation(e, accessToken)
      .then((resp) => {
        if (resp.data) {
          setMessages({ loader: false, msgs: resp.data.messages });
          setCurrConvId(resp.data.conversation_id);
        }
        setIsNewChat(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
        setMessages((prevState) => ({ ...prevState, loader: false }));
      });
  };

  const initiateLogout = () => {
    // Clear state
    setAccessToken(undefined);
    setCurrConvId(undefined);
    setUser(undefined);
    setThread([]);

    navigate("/", { replace: true });
  };

  const initiateNewChat = () => {
    if (error) setError(false);
    setOpenAside(false);
    setIsNewChat(true);
    setCurrConvId(undefined);
    if (thread.length > 1) setThread([]);
    setChatTitle("New Chat");

    // Reset model to default "general" on new chat
    setSelectedModel("general");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const systemfile = e.target.files?.[0];
    if (systemfile) {
      if (isNewChat) setIsNewChat(false);
      if (audioUrl) setAudioUrl(null);
      const localURL = URL.createObjectURL(systemfile);
      setImage({
        url: "Processing figure...",
        file: systemfile,
        previewImage: localURL,
      });
    }
  };

  // Recording events
  const startRecording = async () => {
    if (userMsgRef.current) userMsgRef.current.value = "";
    if (image?.url || image?.file) setImage(undefined);

    if (switchMediaUrl) setSwitchMediaUrl(false);
    if (newMediaUrl) setNewMediaUrl(undefined);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    streamRef.current = stream;

    const recorder = new RecordRTC(stream, {
      type: "audio",
      sampleRate: 48000,
      checkForInactiveTracks: true,
      mimeType: "audio/webm",
      disableLogs: true,
    });
    recorder.startRecording();
    recorderRef.current = recorder;
    setRecording(true);
  };

  const stopRecording = async () => {
    if (!recorderRef.current) return;
    recorderRef.current.stopRecording(() => {
      const blob = recorderRef.current?.getBlob();
      if (blob) {
        setVoiceNote(blob);
        setAudioUrl("Processing audio...");
      }
    });

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setRecording(false);
  };

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modelPopupRef.current &&
        !modelPopupRef.current.contains(event.target as Node)
      ) {
        setShowModelPopup(false);
      }
    };

    if (showModelPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModelPopup]);

  // Initialize chat on component mount
  useEffect(() => {
    const initializeChat = async () => {
      // Fetch all conversations
      await fetchPrevMsgs();

      // Focus on input
      try {
        userMsgRef.current?.focus();
      } catch {}
    };

    initializeChat();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (searchText === "") {
      setQueries(conversations.user_conversations);
    } else {
      setQueries(filterSearchText(searchText));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    if (refetchMsgs === true) {
      fetchPrevMsgs();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchMsgs]);

  useEffect(() => {
    if (audioUrl) {
      sendMessage();
      recorderRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]);

  useEffect(() => {
    if (switchMediaUrl) {
      if (newMediaUrl) updateMediaUrl(newMediaUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchMediaUrl]);

  useEffect(() => {
    if (messages.msgs) setThread(messages.msgs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.msgs]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread]);

  const getModelIcon = (model: ModelType) => {
    switch (model) {
      case "general":
        return <BiMessageSquareDetail size={14} />;
      case "letter":
        return <MdOutlineEmail size={14} />;
      case "memo":
        return <HiOutlineDocumentText size={14} />;
    }
  };

  const getModelLabel = (model: ModelType) => {
    switch (model) {
      case "general":
        return "General";
      case "letter":
        return "Letter";
      case "memo":
        return "Memo";
    }
  };

  return (
    <main className="h-screen relative md:flex bg-white">
      {/* sidebar */}
      <Sidebar
        initiateLogout={initiateLogout}
        setOpenAside={setOpenAside}
        fetchConversation={fetchConversation}
        formatTimestamp={formatTimestamp}
        conversations={conversations}
        openAside={openAside}
        initiateNewChat={initiateNewChat}
        currConvId={currConvId}
        setSearchText={setSearchText}
        queries={queries}
      />

      {/* mobile overlay when sidebar is open */}
      <div
        onClick={() => setOpenAside(false)}
        className={`absolute w-full h-full bg-[#0A1F0FBD] transition-all ease-in-out delay-75 z-10 md:hidden ${
          openAside ? "left-0" : "-left-full"
        }`}
      />

      <section className="flex flex-col h-full md:w-full transition ease-in-out delay-100 sm:overflow-hidden text-[#333333]">
        <header className="flex flex-row items-center justify-between p-5 lg:mb-2">
          <div className="flex flex-row gap-x-3 items-center">
            <button
              onClick={() => setOpenAside(true)}
              className="cursor-pointer md:hidden"
            >
              <GiHamburgerMenu size={20} />
            </button>
            <span>
              <img
                onClick={() => navigate("/")}
                src={emeka}
                alt="Logo"
                className="h-10 w-auto cursor-pointer"
                draggable={false}
              />
            </span>
          </div>
          <div className="flex flex-row gap-x-2 items-center">
            <div
              draggable={false}
              className="min-w-[30px] max-w-[30px] h-[30px] rounded-full flex items-center justify-center text-white bg-[#1A1D18]"
            >
              <FaUserLarge />
            </div>
            <div className="flex flex-col gap-y-0.5">
              <h3 className="font-semibold">{user?.name}</h3>
            </div>
          </div>
        </header>

        {/* chat box */}
        <div className="relative flex flex-col items-center flex-grow">
          {/* new chat welcome message */}
          {isNewChat && !messages.loader && !error && (
            <IntroMessage theme="light" />
          )}

          {/* chat messages */}
          {!isNewChat && !messages.loader && !error && (
            <ChatBox
              isTyping={isTyping}
              bottomRef={bottomRef}
              theme="light"
              messages={thread}
            />
          )}

          {/* loading state */}
          {messages.loader && (
            <div className="flex-1 w-full h-[300px] flex flex-col gap-y-1 text-sm items-center justify-center lg:text-lg">
              <Loader color="#5c5c5c" size={18} />
              <p>Loading messages...</p>
            </div>
          )}

          {/* error state */}
          {error && (
            <p className="text-red-700 text-xs text-center lg:text-sm px-5">
              Error in getting messages. <br /> Please click on selected chat to
              reload or check your network connection.
            </p>
          )}

          {/* input area */}
          <form
            onSubmit={handleSubmit}
            className={`rounded-xl h-fit flex flex-col gap-y-1 transition ease-in-out delay-100 ${
              isNewChat
                ? "max-w-[382px] mt-10 w-full"
                : "absolute bottom-3 w-[90%] lg:bottom-5"
            } bg-[#EBEBEB] text-[#333333] ${
              messages.loader || error ? "hidden" : "flex"
            }`}
          >
            {/* Model selection indicator - show only if not general */}
            {selectedModel !== "general" && (
              <div className="px-5 pt-2 flex items-center gap-x-2">
                <div className="inline-flex items-center gap-x-1.5 bg-[#1A1D18] text-white px-3 py-1 rounded-full text-xs">
                  {getModelIcon(selectedModel)}
                  <span>{getModelLabel(selectedModel)}</span>
                  <button
                    type="button"
                    onClick={() => setSelectedModel("general")}
                    className="ml-1 hover:bg-white/20 rounded-full p-0.5"
                    title="Cancel and switch back to General"
                  >
                    <AiOutlineClose size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* image preview */}
            {!isNewChat && image?.previewImage && (
              <div className="w-[100px] h-auto p-3 relative lg:w-[150px]">
                <img
                  className="w-full h-fit"
                  src={image?.previewImage}
                  draggable={false}
                  alt="img"
                  loading="lazy"
                  decoding="async"
                />
                <button
                  onClick={() => setImage(undefined)}
                  className="absolute top-1 right-0 w-[20px] h-[20px] bg-red-800 rounded-full flex items-center justify-center cursor-pointer"
                >
                  <AiOutlineClose size={14} />
                </button>
              </div>
            )}

            <div className="flex items-center justify-center gap-x-0.5 h-[67px] py-2 px-5 relative">
              {/* Plus button with popup */}
              <div className="relative" ref={modelPopupRef}>
                <button
                  type="button"
                  onClick={() => setShowModelPopup(!showModelPopup)}
                  className={`cursor-pointer min-w-[30px] max-w-[30px] h-[30px] rounded-full flex items-center justify-center transition-colors ${
                    selectedModel !== "general"
                      ? "bg-[#1A1D18] text-white"
                      : "hover:bg-[#d4d4d4]"
                  }`}
                  title="Select model"
                >
                  <AiOutlinePlus size={20} />
                </button>

                {/* Popup menu */}
                {showModelPopup && (
                  <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 w-40">
                    {/* <button
                      type="button"
                      onClick={() => handleModelSelect("general")}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-x-2 text-sm transition-colors ${
                        selectedModel === "general" ? "bg-gray-50" : ""
                      }`}
                    >
                      <BiMessageSquareDetail size={18} />
                      <span>General</span>
                    </button> */}
                    <button
                      type="button"
                      onClick={() => handleModelSelect("letter")}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-x-2 text-sm transition-colors border-t border-gray-100 ${
                        selectedModel === "letter" ? "bg-gray-50" : ""
                      }`}
                    >
                      <MdOutlineEmail size={18} />
                      <span>Letter</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleModelSelect("memo")}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-100 flex items-center gap-x-2 text-sm transition-colors border-t border-gray-100 ${
                        selectedModel === "memo" ? "bg-gray-50" : ""
                      }`}
                    >
                      <HiOutlineDocumentText size={18} />
                      <span>Memo</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="cursor-pointer relative">
                <IoMdAttach size={24} className="rotate-30" />
                <input
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 appearance-none opacity-0"
                  maxLength={2 * 1024 * 1024}
                  name="file"
                  onChange={(e) => {
                    if (voiceNote) setVoiceNote(undefined);
                    if (audioUrl) setAudioUrl(null);
                    if (switchMediaUrl) setSwitchMediaUrl(false);
                    if (newMediaUrl) setNewMediaUrl(undefined);
                    handleImageChange(e);
                  }}
                />
              </div>

              {recording ? (
                <div className="flex flex-1 items-center justify-center">
                  <GiSoundWaves size={40} />
                </div>
              ) : (
                <input
                  className="rounded-lg focus:outline-none h-full w-full px-3"
                  placeholder="| Type message here..."
                  name="userMsg"
                  ref={userMsgRef}
                  onChange={(e) => {
                    if (voiceNote) setVoiceNote(undefined);
                    if (audioUrl) setAudioUrl(null);
                    if (switchMediaUrl) setSwitchMediaUrl(false);
                    if (newMediaUrl) setNewMediaUrl(undefined);
                    setUserMsg(e.target.value);
                  }}
                />
              )}

              <div
                onClick={!recording ? startRecording : stopRecording}
                className="min-w-[30px] max-w-[30px] h-[30px] mr-1 rounded-full flex items-center justify-center text-inherit hover:cursor-pointer hover:bg-[#ffffff09] transition delay-100 ease-in-out"
              >
                {!recording ? (
                  <FaMicrophone size={20} />
                ) : (
                  <FaCircleStop size={25} />
                )}
              </div>

              <button
                disabled={isTyping || !userMsg}
                className=" cursor-pointer disabled:text-[#5c5c5c] disabled:cursor-not-allowed"
              >
                <FiSend size={23} />
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
