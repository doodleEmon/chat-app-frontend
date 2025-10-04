import Image from "next/image";
import { FiUsers } from "react-icons/fi";

export default function Home() {

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex">
      <div className="w-[20%] p-4">
        <p className="flex items-center gap-x-2">
          <FiUsers /> <span>Contacts</span>
        </p>
        <hr className="mt-2 mb-3" />
        <div className="h-[calc(90vh-4rem)] overflow-hidden overflow-y-scroll bg-blue-500 mb-24">
          <div className="flex items-center gap-x-3 bg-slate-700 py-1 px-2">
            <div className="size-8 object-cover border rounded-full">
              <Image className="size-full rounded-full" src={'/avatar.png'} alt="User 1" height={1000} width={1000} />
            </div>
            <div className="flex flex-col justify-center tracking-tight">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-x-3 bg-slate-700 py-1 px-2">
            <div className="size-8 object-cover border rounded-full">
              <Image className="size-full rounded-full" src={'/avatar.png'} alt="User 1" height={1000} width={1000} />
            </div>
            <div className="flex flex-col justify-center tracking-tight">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-x-3 bg-slate-700 py-1 px-2">
            <div className="size-8 object-cover border rounded-full">
              <Image className="size-full rounded-full" src={'/avatar.png'} alt="User 1" height={1000} width={1000} />
            </div>
            <div className="flex flex-col justify-center tracking-tight">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-x-3 bg-slate-700 py-1 px-2">
            <div className="size-8 object-cover border rounded-full">
              <Image className="size-full rounded-full" src={'/avatar.png'} alt="User 1" height={1000} width={1000} />
            </div>
            <div className="flex flex-col justify-center tracking-tight">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-x-3 bg-slate-700 py-1 px-2">
            <div className="size-8 object-cover border rounded-full">
              <Image className="size-full rounded-full" src={'/avatar.png'} alt="User 1" height={1000} width={1000} />
            </div>
            <div className="flex flex-col justify-center tracking-tight">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-x-3 bg-slate-700 py-1 px-2">
            <div className="size-8 object-cover border rounded-full">
              <Image className="size-full rounded-full" src={'/avatar.png'} alt="User 1" height={1000} width={1000} />
            </div>
            <div className="flex flex-col justify-center tracking-tight">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-x-3 bg-slate-700 py-1 px-2">
            <div className="size-8 object-cover border rounded-full">
              <Image className="size-full rounded-full" src={'/avatar.png'} alt="User 1" height={1000} width={1000} />
            </div>
            <div className="flex flex-col justify-center tracking-tight">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-x-3 bg-slate-700 py-1 px-2">
            <div className="size-8 object-cover border rounded-full">
              <Image className="size-full rounded-full" src={'/avatar.png'} alt="User 1" height={1000} width={1000} />
            </div>
            <div className="flex flex-col justify-center tracking-tight">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-x-3 bg-slate-700 py-1 px-2">
            <div className="size-8 object-cover border rounded-full">
              <Image className="size-full rounded-full" src={'/avatar.png'} alt="User 1" height={1000} width={1000} />
            </div>
            <div className="flex flex-col justify-center tracking-tight">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-x-3 bg-slate-700 py-1 px-2">
            <div className="size-8 object-cover border rounded-full">
              <Image className="size-full rounded-full" src={'/avatar.png'} alt="User 1" height={1000} width={1000} />
            </div>
            <div className="flex flex-col justify-center tracking-tight">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-x-3 bg-slate-700 py-1 px-2">
            <div className="size-8 object-cover border rounded-full">
              <Image className="size-full rounded-full" src={'/avatar.png'} alt="User 1" height={1000} width={1000} />
            </div>
            <div className="flex flex-col justify-center tracking-tight">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm">Online</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[80%] h-full p-4">
        messages area
      </div>
    </div>
  );
}
