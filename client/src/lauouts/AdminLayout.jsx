import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto bg-gray-100">
        <main className="flex-1 p-6 h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
