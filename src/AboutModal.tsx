import { GithubIcon } from "./assets/icons/GithubIcon";
import AboutProps from "./types/modalTypes";

export default function About({ isOpen, onClose }: AboutProps) {
    if (!isOpen) return null
  return (
    <div
      className={`select-none ${
        isOpen
          ? "fixed inset-0 flex items-center justify-center bg-black/30"
          : ""
      }`}
    >
      <dialog
        open={isOpen}
        className="flex flex-col w-4/12 h-fit bg-slate-200 p-6 rounded-2xl shadow-lg shadow-slate-900"
      >
        <div className="flex items-end justify-end w-full">
          <button
            className="w-10 h-10 bg-slate-600/30 justify-center items-center rounded-md font-black text-xl hover:bg-slate-400"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <h1>
          <b>
            [ Tool name ] <i>work in progress</i>
          </b>
        </h1>

        <div className="my-6">
          <b>License: </b> [ work in progress ]
        </div>
        <div className="flex pb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi voluptate provident officia nesciunt? Voluptate ducimus accusantium inventore, amet recusandae eos, tempora velit vel natus obcaecati dolor! Consectetur nisi at pariatur?</div>
        <a className="flex w-fit justify-start group py-2 align-middle items-center" href="https://github.com/JavierVidalM" target="_blank">
          <GithubIcon className="h-6 fill-[#89929b] group-hover:fill-[#161b22]" />
            <span className="text-[#89929b] group-hover:text-[#161b22] px-2">JavierVidalM</span>
        </a>
      </dialog>
    </div>
  );
}
