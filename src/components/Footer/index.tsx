"use client";

const Footer = () => {
  return (
    <footer
      className={`flex  "pr-0 justify-center items-center fixed bottom-0 left-0 z-2 w-[100%] bg-popover dark:bg-popover dark:border-secondary`}
    >
      <p className=" font-custom text-[14px] pr-2">Powered by</p>

      <span className="self-center text-[18PX] font-bold whitespace-nowrap dark:text-white">CARLOS MARIN</span>
    </footer>
  );
};

export default Footer;
