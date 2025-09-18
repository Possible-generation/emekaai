import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function GetStartedBtn() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/login")}
      className="flex flex-row items-center gap-x-1 text-white px-3 py-3 rounded-lg bg-[#15411F] cursor-pointer mt-5 focus:outline-none hover:animate-none lg:text-lg lg:py-2 lg:px-6"
    >
      <p>Get started today!</p>
      <BsArrowRight className="font-semibold" />
    </button>
  );
}
