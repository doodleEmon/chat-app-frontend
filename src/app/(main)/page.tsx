import Image from "next/image";
import { BiMessage } from "react-icons/bi";
import { TiMessages } from "react-icons/ti";

export default function Home() {

  const messages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex">
      <div className="w-[25%] py-5 pl-5 pr-0.5 bg-[#1D232A] border-r border-gray-700">
        <p className="flex items-center gap-x-2 pl-4">
          <TiMessages size={24} /> <span className="font-bold text-lg">Chats</span>
        </p>
        <div className="h-full overflow-hidden overflow-y-scroll mt-4 mb-24 space-y-2 scrollbar-thin">
          {
            messages.map((m, index) => (
              <div className="flex items-center gap-x-4 py-2 px-3 hover:bg-slate-700 cursor-pointer">
                <div className="size-9 object-cover border rounded-full">
                  <Image className="size-full rounded-full" src={'/avatar.png'} alt="User 1" height={1000} width={1000} />
                </div>
                <div className="flex flex-col justify-center tracking-tight">
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm">Online</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="w-[80%] h-full flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-3">
          <div className="p-4 bg-blue-500 rounded-lg">
            <BiMessage size={32} className="text-white" />
          </div>
          <p className="text-lg font-semibold">Chat with ChattyFy</p>
          <p className="text-sm">Send and receive message without keeping your phone online.</p>
        </div>
      </div>
    </div>
  );
}
