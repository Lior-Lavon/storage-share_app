import { Home, Archive, MessageCircle, Bell } from "lucide-react";

export const tabs = [
  { name: "Home", icon: <Home size={20} />, id: "home" },
  { name: "MyStorage", icon: <Archive size={20} />, id: "my_storage" },
  { name: "Activity", icon: <Bell size={20} />, id: "activity" },
  { name: "Chat", icon: <MessageCircle size={20} />, id: "chat" },
];
