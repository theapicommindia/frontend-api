import { ArrowUpRight } from "lucide-react";

/**
 * ButtonWithIcon
 * @param {string} href - The external URL this button should link to
 * @param {string} label - Button label text (default: "Let's Collaborate")
 * @param {string} target - Link target (default: "_blank")
 */
const ButtonWithIcon = ({ href = "#", label = "Let's Collaborate", target = "_blank" }) => {
  return (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      className="
        relative inline-flex items-center text-sm font-semibold rounded-full h-10
        pl-5 pr-12 group transition-all duration-500
        hover:pl-12 hover:pr-5
        w-fit overflow-hidden cursor-pointer no-underline
        bg-gradient-to-r from-[#0A7294] to-[#22B3AD]
        text-white shadow-[0_4px_14px_rgba(10,114,148,0.35)]
        hover:shadow-[0_6px_20px_rgba(10,114,148,0.5)]
        hover:-translate-y-0.5
      "
    >
      <span className="relative z-10 transition-all duration-500 whitespace-nowrap">
        {label}
      </span>
      <div
        className="
          absolute right-1 w-8 h-8
          bg-white text-[#0A7294] rounded-full
          flex items-center justify-center
          transition-all duration-500
          group-hover:right-[calc(100%-36px)]
          group-hover:rotate-45
          shadow-sm
        "
      >
        <ArrowUpRight size={15} />
      </div>
    </a>
  );
};

export default ButtonWithIcon;
