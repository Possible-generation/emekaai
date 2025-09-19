// import { BsArrowRight } from "react-icons/bs";
// import {
//   smartservice,
//   logoCircle,
//   heroImage,
//   lightModeImg,
//   darkModeImg,
//   image1,
//   image2,
//   image3,
//   image4,
//   image5,
//   image6,
//   image7,
//   chidi,
// } from "../utils/assets";
// import { whySmartService } from "../utils";
// import { useAppContext } from "../context";
// import { Link } from "react-router-dom";
// import { MdDarkMode, MdLightMode } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import GetStartedBtn from "../components/homepage/GetStartedBtn";

// export default function Home() {
//   const { theme, setTheme, user } = useAppContext();
//   const navigate = useNavigate();
//   return (
//     <main
//       className={`transition ease-in-out delay-100 ${
//         theme === "dark" ? "bg-[#1B1B1B]" : "bg-[#FEFEFE]"
//       }`}
//     >
//       {/* header */}
//       <header
//         className={`p-3 fixed top-0 right-0 left-0 z-20 lg:flex lg:justify-center transition ease-in-out delay-100 ${
//           theme === "dark" ? "bg-[#1b1b1b]" : "bg-[#fefefe]"
//         }`}
//       >
//         <nav className="flex items-center justify-between w-full px-1 lg:max-w-[1440px] lg:px-10">
//           <div className="flex flex-row items-center gap-x-1 text-sm lg:text-base">
//             <img
//               src={smartservice}
//               alt="logo"
//               className="w-auto h-[47px] lg:h-[60px]"
//               draggable={false}
//               loading="lazy"
//               decoding="async"
//             />
//             {/* <p
//               className={`uppercase transition ease-in-out font-bold delay-100 ${
//                 theme === "dark" ? "text-[#fefefe]" : "text-[#154411F]"
//               }`}
//             >
//               chidi
//             </p> */}
//           </div>
//           <div className="flex items-center gap-x-3 text-sm lg:text-base lg:gap-x-5">
//             {/* desktop */}
//             <button
//               onClick={() => {
//                 if (theme === "dark") {
//                   setTheme("light");
//                 } else {
//                   setTheme("dark");
//                 }
//               }}
//               className={`capitalize font-semibold cursor-pointer transition ease-in-out delay-100 hidden sm:block focus:outline-none ${
//                 theme === "dark" ? "text-[#fefefe]" : "text-[#15411F]"
//               }`}
//             >
//               {theme === "dark" ? "light mode" : "dark mode"}
//             </button>
//             {/* mobile */}
//             <button
//               onClick={() => {
//                 if (theme === "dark") {
//                   setTheme("light");
//                 } else {
//                   setTheme("dark");
//                 }
//               }}
//               className={`capitalize font-semibold cursor-pointer transition ease-in-out delay-100 sm:hidden focus:outline-none ${
//                 theme === "dark" ? "text-[#fefefe]" : "text-[#15411F]"
//               }`}
//             >
//               {theme === "dark" ? (
//                 <MdLightMode size={22} />
//               ) : (
//                 <MdDarkMode size={22} />
//               )}
//             </button>
//             <button
//               onClick={() => navigate("/login")}
//               className={`flex-row items-center gap-x-1 text-white px-3 py-2 rounded-lg bg-[#15411F] cursor-pointer lg:px-4 ${
//                 user ? "hidden" : "flex"
//               }`}
//             >
//               <p>Sign in</p>
//               <BsArrowRight className="font-semibold" />
//             </button>
//             <Link
//               className={`${
//                 theme === "dark" ? "text-white" : "text-[#1b1b1b]"
//               } ${user ? "block" : "hidden"}`}
//               to={`/c/user${user?.id}`}
//             >
//               {/* <FaRobot size={30} /> */}
//               <img
//                 src={chidi}
//                 alt="img"
//                 draggable={false}
//                 decoding="async"
//                 loading="lazy"
//                 className="w-[35px] h-[35px] rounded-full lg:w-[40px] lg:h-[40px]"
//               />
//             </Link>
//           </div>
//         </nav>
//       </header>
//       {/* herosection */}
//       <section
//         className={`relative mt-16 px-5 pt-10 pb-10 flex flex-col items-center gap-y-2 text-sm lg:gap-y-4 transition ease-in-out delay-100 lg:pb-0 ${
//           theme === "dark"
//             ? "lg:mt-20 lg:bg-[linear-gradient(to_bottom,_#1b1b1b_0%,_#1b1b1b_50%,_#15411f46_100%)]"
//             : "lg:mt-24 lg:bg-[linear-gradient(to_bottom,_#fefefe_0%,_#fefefe_50%,_#15411f46_100%)]"
//         }`}
//       >
//         <h2
//           className={`uppercase font-semibold lg:text-base transition ease-in-out delay-100 ${
//             theme === "dark" ? "text-[#fefefe]" : "text-[#15411F]"
//           }`}
//         >
//           MEET ABIA SMARTSERVICE AI
//         </h2>
//         <h3
//           className={`font-bold text-2xl text-center lg:text-5xl lg:max-w-[563px] transition ease-in-out delay-100 ${
//             theme === "dark" ? "text-[#fefefe]" : "text-[#333333]"
//           }`}
//         >
//           Your intelligent public service assistant
//         </h3>
//         <div className="flex flex-col gap-4 items-center md:flex-row lg:gap-5">
//           <div
//             className={`h-[49px] w-[183px] text-[#C35114] text-sm rounded-full capitalize font-semibold flex items-center justify-center lg:w-[189px] lg:h-[41px] transition ease-in-out delay-100 ${
//               theme === "dark" ? "bg-[#353535]" : "bg-[#EFDED580]"
//             }`}
//           >
//             <p>transforming work</p>
//           </div>
//           <div
//             className={`h-[49px] w-[183px] text-[#5B8211] text-sm rounded-full capitalize font-semibold flex items-center justify-center lg:w-[189px] lg:h-[41px] transition ease-in-out delay-100 ${
//               theme === "dark" ? "bg-[#353535]" : "bg-[#DBEFD580]"
//             }`}
//           >
//             <p>empowering service</p>
//           </div>
//           <div
//             className={`h-[49px] w-[183px] text-[#1A35A3] text-sm rounded-full capitalize font-semibold flex items-center justify-center lg:w-[189px] lg:h-[41px] transition ease-in-out delay-100 ${
//               theme === "dark" ? "bg-[#353535]" : "bg-[#D5E1EF80]"
//             }`}
//           >
//             <p>enhancing productivity</p>
//           </div>
//         </div>
//         <p
//           className={`text-center text-sm mt-3 font-medium max-w-[698px] md:max-w-[500px] lg:max-w-[698px] lg:text-base lg:font-semibold transition ease-in-out delay-100 ${
//             theme === "dark" ? "text-[#fefefe]" : "text-[#333333]"
//           }`}
//         >
//           SMART SERVICE is a powerful AI-powered assistant purpose-built to
//           support Abia State public servants with their day-to-day
//           administrative tasks. Whether it’s drafting memos, generating
//           insightful reports, performing data analysis, or managing civil
//           service correspondence, SMARTSERVICE does it all — efficiently and
//           accurately.
//         </p>
//         <GetStartedBtn />
//         {/* hero floating image */}
//         <img
//           src={heroImage}
//           draggable={false}
//           alt="icon"
//           className="absolute right-0 top-24 w-[150px] sm:top-10 sm:w-[250px] lg:w-[380px] lg:-top-0 xl:w-[300px]"
//           loading="lazy"
//           decoding="async"
//         />
//         {/* hero image */}
//         <img
//           src={theme === "dark" ? darkModeImg : lightModeImg}
//           draggable={false}
//           alt="image"
//           className="w-[1000px] h-auto mt-10 hidden lg:block"
//           loading="lazy"
//           decoding="async"
//         />
//       </section>
//       {/* what we do */}
//       <section className="p-5 w-full flex flex-col items-center">
//         <h1
//           className={`font-bold text-center text-xl lg:my-10 md:text-2xl lg:text-4xl ${
//             theme === "dark" ? "text-[#fefefe]" : "text-[#333333]"
//           }`}
//         >
//           What SmartService can do.
//         </h1>
//         <div className="mt-5 w-fit xl:px-10">
//           {/* first two */}
//           <div className="flex flex-col gap-8 justify-center items-center md:flex-row md:gap-5 xl:gap-10">
//             <div
//               className={`transition ease-in-out delay-100 relative min-w-[320px] max-w-[350px] h-[310px] sm:h-[372px] rounded-2xl md:w-[318px] md:h-[400px] lg:max-w-max lg:w-[490px] lg:h-[572px] overflow-hidden ${
//                 theme === "dark" ? "bg-[#2D3135]" : "bg-[#E4F1FF]"
//               }`}
//             >
//               <div
//                 className={`transition ease-in-out delay-100 p-5 flex flex-col gap-y-1 items-center text-center md:p-10 lg:p-20 lg:gap-y-5 ${
//                   theme === "dark" ? "text-[#fefefe]" : "text-[#333333]"
//                 }`}
//               >
//                 <h4 className="text-lg font-semibold lg:text-3xl">
//                   Draft and respond to memos
//                 </h4>
//                 <p className="text-sm lg:text-base">
//                   Automatically generate well-structured memos, reply with the
//                   right tone and format, and ensure alignment with civil service
//                   standards.
//                 </p>
//               </div>
//               <img
//                 src={image1}
//                 alt="image"
//                 draggable={false}
//                 className="absolute -right-2 -bottom-7"
//               />
//             </div>
//             <div
//               className={`transition ease-in-out delay-100 relative min-w-[320px] max-w-[350px] h-[310px] sm:h-[372px] rounded-2xl md:w-[318px] md:h-[400px] lg:max-w-max lg:w-[490px] lg:h-[572px] overflow-hidden ${
//                 theme === "dark" ? "bg-[#28282C]" : "bg-[#E4E7FF]"
//               }`}
//             >
//               <div
//                 className={`transition ease-in-out delay-100 p-5 flex flex-col gap-y-1 items-center text-center md:p-10 lg:p-20 lg:gap-y-5 ${
//                   theme === "dark" ? "text-[#fefefe]" : "text-[#333333]"
//                 }`}
//               >
//                 <h4 className="text-lg font-semibold lg:text-3xl">
//                   Analyse documents and reports.
//                 </h4>
//                 <p className="text-sm lg:text-base">
//                   Upload any document - SmartService can analyze, summarize, and
//                   extract key insights instantly.
//                 </p>
//               </div>
//               <img
//                 src={image2}
//                 alt="image"
//                 draggable={false}
//                 className="absolute -right-2 -bottom-7 w-[250px] lg:-bottom-3 lg:right-0 lg:w-[400px]"
//               />
//             </div>
//           </div>
//           {/* middle */}
//           <div className="mt-5 flex justify-center w-full">
//             <div
//               className={`transition ease-in-out delay-100 relative min-w-[320px] max-w-[350px] h-[310px] sm:h-[372px] rounded-2xl md:h-[280px] md:max-w-[10000px] md:w-full lg:w-full overflow-hidden ${
//                 theme === "dark" ? "bg-[#383631]" : "bg-[#FAF1E3]"
//               }`}
//             >
//               <div
//                 className={`transition ease-in-out delay-100 p-5 flex flex-col gap-y-1 items-center text-center md:p-10 md:items-start md:text-left lg:p-20 lg:gap-y-5 ${
//                   theme === "dark" ? "text-[#fefefe]" : "text-[#333333]"
//                 }`}
//               >
//                 <h4 className="text-lg font-semibold lg:text-3xl md:w-[50%]">
//                   Generate Official letters
//                 </h4>
//                 <p className="text-sm lg:text-base md:w-[50%]">
//                   Need to request for approval, resources, or personnel?
//                   SmartService creates formal request letters in seconds.
//                 </p>
//               </div>
//               <img
//                 src={image3}
//                 alt="image"
//                 draggable={false}
//                 className="absolute -right-2 -bottom-7 md:w-[400px] lg:w-[500px]"
//                 loading="lazy"
//                 decoding="async"
//               />
//             </div>
//           </div>
//           {/* last two */}
//           <div className="mt-5 flex flex-col gap-8 justify-center items-center md:flex-row md:gap-5 xl:gap-10">
//             <div
//               className={`transition ease-in-out delay-100 relative min-w-[320px] max-w-[350px] h-[310px] sm:h-[372px] rounded-2xl md:w-[318px] md:h-[400px] lg:max-w-max lg:w-[490px] lg:h-[572px] overflow-hidden ${
//                 theme === "dark" ? "bg-[#2F2E30]" : "bg-[#F5E9FB]"
//               }`}
//             >
//               <div
//                 className={`transition ease-in-out delay-100 p-5 flex flex-col gap-y-1 items-center text-center md:p-10 lg:p-20 lg:gap-y-5 ${
//                   theme === "dark" ? "text-[#fefefe]" : "text-[#333333]"
//                 }`}
//               >
//                 <h4 className="text-lg font-semibold lg:text-4xl">
//                   Determine Officer Seniority
//                 </h4>
//                 <p className="text-sm lg:text-base">
//                   Input names and ranks, and ABIPA will instantly determine the
//                   seniority hierarchy across departments.
//                 </p>
//               </div>
//               <img
//                 src={image6}
//                 alt="image"
//                 draggable={false}
//                 className="absolute -right-2 -bottom-7"
//                 loading="lazy"
//                 decoding="async"
//               />
//             </div>
//             <div
//               className={`transition ease-in-out delay-100 relative min-w-[320px] max-w-[350px] h-[310px] sm:h-[372px] rounded-2xl md:w-[318px] md:h-[400px] lg:max-w-max lg:w-[490px] lg:h-[572px] overflow-hidden ${
//                 theme === "dark" ? "bg-[#241E1E]" : "bg-[#FFE4E4]"
//               }`}
//             >
//               <div
//                 className={`transition ease-in-out delay-100 p-5 flex flex-col gap-y-1 items-center text-center md:p-10 lg:p-20 lg:gap-y-5 ${
//                   theme === "dark" ? "text-[#fefefe]" : "text-[#333333]"
//                 }`}
//               >
//                 <h4 className="text-lg font-semibold lg:text-4xl">
//                   Automate Routine Admin Tasks
//                 </h4>
//                 <p className="text-sm lg:text-base">
//                   Schedule updates, draft circulars, format reports - all
//                   streamlined to save time and eliminate errors.
//                 </p>
//               </div>
//               <img
//                 src={image4}
//                 alt="image"
//                 draggable={false}
//                 className="absolute right-2 bottom-3 w-[300px] lg:-bottom-3 lg:right-0 lg:w-[500px]"
//               />
//             </div>
//           </div>
//         </div>
//         <div className="my-5">
//           <GetStartedBtn />
//         </div>
//       </section>
//       {/* why chidi section */}
//       <section
//         className={`transition ease-in-out delay-100 flex ${
//           theme === "dark"
//             ? "bg-[#1D211B] text-white"
//             : "bg-[#EDF0EC] text-[#333333]"
//         }`}
//       >
//         <img
//           src={image5}
//           draggable={false}
//           alt="img"
//           className="w-[450px] h-fit hidden animate-bounce mt-30 lg:block"
//           loading="lazy"
//           decoding="async"
//         />
//         <div className="flex flex-col gap-y-5 p-10 lg:max-w-[700px] xl:ml-24">
//           <div
//             className={`flex flex-col gap-y-3 items-center text-center p-3 lg:gap-y-5 lg:items-start lg:text-start`}
//           >
//             <h4 className="text-2xl font-semibold lg:text-4xl">
//               Why SmartService?
//             </h4>
//             <p className="text-base font-medium lg:text-lg">
//               CHIDI is a powerful AI-powered assistant purpose-built to support
//               Abia State public servants with their day-to-day administrative
//               tasks.
//             </p>
//           </div>
//           <div className="flex flex-col gap-y-5">
//             {whySmartService.map((item, index) => {
//               return (
//                 <div
//                   key={index}
//                   className={`border transition delay-100 ease-in-out rounded-lg p-4 text-inherit flex flex-col gap-y-2 ${
//                     theme === "dark"
//                       ? "bg-[#252A23] border-[#15411F]"
//                       : "bg-white border-[#DADADA]"
//                   }`}
//                 >
//                   <h3 className="font-semibold lg:text-xl">{item.title}</h3>
//                   <p className="text-sm lg:text-base">{item.info}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>
//       {/* footer */}
//       <footer>
//         <div
//           className={`transition ease-in-out delay-100 relative ${
//             theme === "dark" ? "bg-[#080D05]" : "bg-inherit"
//           }`}
//         >
//           <div
//             className={`flex flex-col gap-y-3 items-center text-center p-6 transition ease-in-out delay-100 md:absolute md:left-3 md:top-3 md:z-10 md:w-[466px] md:items-start md:text-start lg:w-[566px] lg:left-10 lg:top-10 ${
//               theme === "dark" ? "text-[#FFFFFF]" : "text-[#333333]"
//             }`}
//           >
//             <h4 className="text-xl font-semibold lg:text-4xl">
//               Build to empower every officer
//             </h4>
//             <p className="text-sm font-medium lg:text-lg">
//               Whether you're a senior director, head of department, or
//               administrative officer, Chidi is designed to make your work
//               smoother and more productive.
//             </p>
//             <GetStartedBtn />
//           </div>
//           <img
//             src={image7}
//             alt="img"
//             draggable={false}
//             className={`w-full h-auto transition ease-in-out delay-100 ${
//               theme === "dark" ? "opacity-20" : "opacity-100"
//             }`}
//           />
//         </div>
//         <div className="relative h-fit bg-[#102F17] px-5 text-xs flex items-center justify-between py-2 md:py-5 md:text-sm">
//           <p className="w-[135px] text-white text-center md:w-fit">
//             Copyright © 2025. All Rights Reserved.
//           </p>
//           <p className="w-1/2 text-white text-center lg:w-fit">
//             Brought to you by : The Office of the Head of Service, Abia State.
//           </p>
//           <img
//             src={logoCircle}
//             draggable={false}
//             alt="logo"
//             className="w-[49px] h-[49px] absolute left-[40%] -top-10 md:w-[80px] md:h-[80px] md:left-[30%] lg:w-[108px] lg:h-[108px] lg:-top-24 lg:left-auto lg:right-10 xl:right-32"
//             loading="lazy"
//             decoding="async"
//           />
//         </div>
//       </footer>
//     </main>
//   );
// }

import { BsArrowRight } from "react-icons/bs";
import {
  emekalogo,
  logoCircle,
  emeka,
  bgline,
  bgimage,
  slide1,
  slide2,
  slide3,
  image10,
} from "../utils/assets";
import { FaUserLarge } from "react-icons/fa6";

import { useKeenSlider } from "keen-slider/react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {
  FaCheckSquare,
  FaHeadset,
  FaClipboardCheck,
  FaClock,
  FaStar,
  FaUserTie,
} from "react-icons/fa";

import { useAppContext } from "../context";
import { Link, useNavigate } from "react-router-dom";
import GetStartedBtn from "../components/homepage/GetStartedBtn";
import { useState } from "react";

const cards = [
  {
    img: { src: slide1, alt: "Image 1" },
    text: "Drafting and delivering political speeches, policy briefs, and official addresses.",
  },
  {
    img: { src: slide2, alt: "Image 2" },
    text: "Providing advice on governance, politics, and administration.",
  },
  {
    img: { src: slide3, alt: "Image 3" },
    text: "Supporting project implementation, monitoring, evaluation, and impact assessment.",
  },
];

const features = [
  {
    icon: <FaCheckSquare size={28} className="text-white" />,
    title: "Instant Expertise",
    desc: "Get real-time advice on governance, policy, and communication without delays.",
  },
  {
    icon: <FaHeadset size={28} className="text-white" />,
    title: "Versatile Support",
    desc: "From speeches to compliance, one platform covers every leadership need.",
  },
  {
    icon: <FaClipboardCheck size={28} className="text-white" />,
    title: "Fact-Checked Insights",
    desc: "Access transparent, source-backed answers you can trust.",
  },
  {
    icon: <FaClock size={28} className="text-white" />,
    title: "Cost & Time Efficient",
    desc: "Save hours of research and drafting with AI-powered outputs.",
  },
  {
    icon: <FaStar size={28} className="text-white" />,
    title: "Always Available",
    desc: "24/7 assistance for urgent tasks, crises, or last-minute requests.",
  },
  {
    icon: <FaUserTie size={28} className="text-white" />,
    title: "Customizable Personas",
    desc: "Switch between roles like Speechwriter, Policy Strategist, or Compliance Advisor to match your need.",
  },
];

export default function Home() {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeArrow, setActiveArrow] = useState<"left" | "right">("left");
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: { perView: 1, spacing: 15 },
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3, spacing: 20 },
      },
    },
  });

  return (
    <main className="transition ease-in-out delay-100 bg-[#FEFEFE]">
      {/* header */}
      <header className="p-3 fixed top-0 right-0 left-0 z-20 lg:flex lg:justify-center transition ease-in-out delay-100 bg-[#fefefe]">
        <nav className="flex items-center justify-between w-full px-1 lg:max-w-[1440px] lg:px-10">
          <div className="flex flex-row items-center gap-x-1 text-sm lg:text-base">
            <img
              src={emeka}
              alt="logo"
              className="w-auto h-[30px] lg:h-[50px]"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="flex items-center gap-x-3 text-sm lg:text-base lg:gap-x-5">
            <button
              onClick={() => navigate("/login")}
              className={`flex-row items-center gap-x-1 text-white px-3 py-2 rounded-lg bg-[#15411F] cursor-pointer lg:px-4 ${
                user ? "hidden" : "flex"
              }`}
            >
              <p>Sign in</p>
              <BsArrowRight className="font-semibold" />
            </button>
            <Link
              className={`${user ? "block" : "hidden"} text-[#1b1b1b]`}
              to={`/c/user${user?.id}`}
            >
              {/* <img
                src={chidi}
                alt="img"
                draggable={false}
                decoding="async"
                loading="lazy"
                className="w-[35px] h-[35px] rounded-full lg:w-[40px] lg:h-[40px]"
              /> */}
              <div
                draggable={false}
                className="min-w-[30px] max-w-[30px] h-[30px] rounded-full flex items-center justify-center text-white bg-[#1A1D18]"
              >
                <FaUserLarge />
              </div>
            </Link>
          </div>
        </nav>
      </header>

      {/* herosection */}
      <section className="relative mt-16 px-5 pt-10 pb-10 flex flex-col items-center gap-y-2 text-sm lg:gap-y-4 transition ease-in-out delay-100 lg:pb-0 lg:mt-24 lg:bg-[linear-gradient(to_bottom,_#fefefe_0%,_#fefefe_30%,_#15411f46_100%)]">
        {/* Content wrapper with higher z-index */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex flex-row items-center gap-x-2">
            <h2 className="uppercase font-semibold lg:text-[20px] text-[#15411F]">
              MEET
            </h2>
            <img
              src={emeka}
              alt="logo"
              className="w-auto h-[25px] lg:h-[35px]"
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          </div>

          <h3 className="font-bold text-2xl text-center lg:text-5xl lg:max-w-[763px] text-[#333333]">
            AI-Powered Political Advisory for Smarter Leadership
          </h3>

          <p className="text-center text-sm mt-3 font-medium max-w-[698px] md:max-w-[500px] lg:max-w-[698px] lg:text-base lg:font-semibold text-[#333333]">
            Emeka is an AI-powered advisory platform that helps leaders craft
            speeches, shape policy, manage crises, and drive smarter governance
            across every sector
          </p>

          <GetStartedBtn />
        </div>

        {/* Background line image with lower z-index */}
        <img
          src={bgline}
          draggable={false}
          alt="icon"
          className="absolute inset-0 z-0"
          loading="lazy"
          decoding="async"
        />

        <img
          src={bgimage}
          draggable={false}
          alt="image"
          className="w-[1000px] h-auto mt-10 hidden lg:block relative z-10"
          loading="lazy"
          decoding="async"
        />
      </section>
      <section className="relative bg-white py-16 px-6 lg:px-20">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-900 mb-12">
          What Emeka can do.
        </h2>

        {/* Slider */}
        <div ref={sliderRef} className="keen-slider">
          {cards.map((card, i) => (
            <div
              key={i}
              className="keen-slider__slide bg-white rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={card.img.src}
                alt={card.img.alt}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-gray-800 font-medium">{card.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls wrapper */}
        <div className="flex items-center justify-center relative mt-6">
          {/* Dots (centered) */}
          <div className="flex gap-2">
            {cards.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  currentSlide === idx ? "bg-[#15411F]" : "bg-gray-300"
                }`}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
              />
            ))}
          </div>

          {/* Arrows (absolute right) */}
          <div className="absolute mt-25 lg:mt-0 lg:right-0 flex gap-2">
            {/* Left Arrow */}
            <button
              onClick={() => {
                instanceRef.current?.prev();
                setActiveArrow("left");
              }}
              className={`p-2 rounded-full ${
                activeArrow === "left"
                  ? "bg-[#15411F] text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              <AiOutlineLeft size={20} />
            </button>

            {/* Right Arrow */}
            <button
              onClick={() => {
                instanceRef.current?.next();
                setActiveArrow("right");
              }}
              className={`p-2 rounded-full ${
                activeArrow === "right"
                  ? "bg-[#15411F] text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              <AiOutlineRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F5F5] py-16 px-6 lg:px-50">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Why Choose Emeka?
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
            Emeka is an AI-powered advisory for speeches, policy, and governance
            — all in one platform.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
            >
              {/* Icon container */}
              <div className="bg-[linear-gradient(180deg,_#F4C163_23.56%,_#C99127_99.52%)] p-3 rounded-lg mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* what we do */}
      {/* ... keep rest same but only light mode classes (removed theme checks) ... */}

      {/* footer */}
      <footer>
        <div className="transition ease-in-out delay-100 relative bg-inherit">
          <div className="flex flex-col gap-y-3 items-center text-center p-6 md:absolute md:left-3 md:top-3 md:z-10 md:w-[466px] md:items-start md:text-start lg:w-[566px] lg:left-20 lg:top-60 text-black md:text-white">
            <h4 className="text-xl font-semibold lg:text-4xl">
              Built to guide every leader
            </h4>
            <p className="text-sm font-normal ">
              From drafting speeches to shaping policy and managing crises,
              Emeka AI helps leaders make confident decisions at every level.
            </p>
            <GetStartedBtn />
          </div>
          <img
            src={image10}
            alt="img"
            draggable={false}
            className="w-full h-auto transition ease-in-out delay-100 opacity-100"
          />
        </div>
        <div className="relative h-fit bg-[#102F17] px-5 text-xs flex items-center justify-between py-2 md:py-5 md:text-sm">
          <p className="w-[135px] text-white text-center md:w-fit">
            Copyright © 2025. All Rights Reserved.
          </p>
          <p className="w-1/2 text-white text-center lg:w-fit">
            Brought to you by : The Office of the Head of Service, Abia State.
          </p>
          <img
            src={logoCircle}
            draggable={false}
            alt="logo"
            className="w-[49px] h-[49px] absolute left-[40%] -top-10 md:w-[80px] md:h-[80px] md:left-[30%] lg:w-[108px] lg:h-[108px] lg:-top-24 lg:left-auto lg:right-10 xl:right-32"
            loading="lazy"
            decoding="async"
          />
        </div>
      </footer>
    </main>
  );
}
