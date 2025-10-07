import ChatContainer from "@/componets/ChatContainer";
import Sidebar from "@/componets/Sidebar";

export default function Home() {

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex">
      <Sidebar />
      <ChatContainer />
    </div>
  );
}
