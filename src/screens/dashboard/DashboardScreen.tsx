import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAllUsers, getUserById } from "../../redux/features/userSlice";
import type { User } from "../../types/user";
import SearchBar from "./components/SearchBar";
import UserCard from "./components/UserCard";
import UserDetailsModal from "./components/UserDetailsModal";
import AddUserModal from "./components/AddUserModal";
import SpotlightIcon from "../../components/svgs/SpotlightIcon";
import AnalyticsIcon from "../../components/svgs/AnalyticsIcon";
import VouchersIcon from "../../components/svgs/VouchersIcon";
import UsersIcon from "../../components/svgs/UsersIcon";
import DashboardIcon from "../../components/svgs/DashboardIcon";
import BellIcon from "../../components/svgs/BellIcon";
import SmallSearchBar from "./components/SmallSearch";
import PlusIcon from "../../components/svgs/PlusIcon";
import AvatarImage from "/avartar-image.png";
import CardLoading from "./components/CardLoading";
import HamburgerIcon from "../../components/svgs/HamburgerIcon";
import XIcon from "../../components/svgs/XIcon";

const DashboardScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, selectedUser, loading, error } = useAppSelector(
    (state) => state.users
  );

  const [search, setSearch] = useState("");
  const [modalUser, setModalUser] = useState<User | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCardClick = (user: User) => {
    dispatch(getUserById(user.id));
    setModalUser(user);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background-primary text-white relative">
      <aside
        className={`fixed sm:static z-50 h-full sm:h-auto w-64 sm:w-70 bg-background-secondary space-y-14 font transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        <div className="flex justify-between items-center px-6 pt-6 sm:hidden">
          <div className="text-purple-400 font-extrabold text-3xl">useID</div>
          <button
            className="text-white text-2xl"
            onClick={() => setSidebarOpen(false)}
          >
            <XIcon />
          </button>
        </div>

        <nav className="space-y-6">
          <a
            href="#"
            className="flex px-6 items-center gap-4  text-base text-gray-400 "
          >
            <DashboardIcon />
            <h3>Dashboard</h3>
          </a>
          <a
            href="#"
            className="flex px-6 items-center gap-4  text-base text-white font-medium"
          >
            <UsersIcon />
            <h3>Users</h3>
          </a>
          <a
            href="#"
            className="flex px-6 items-center gap-4  text-base text-gray-400 hover:text-white"
          >
            <VouchersIcon />
            <h3>Vouchers</h3>
          </a>
          <a
            href="#"
            className="flex px-6 items-center gap-4  text-base text-gray-400 hover:text-white"
          >
            <AnalyticsIcon />
            <h3>Analytics</h3>
          </a>
          <a
            href="#"
            className="flex px-6 items-center gap-4  text-base text-gray-400 hover:text-white"
          >
            <SpotlightIcon />
            <h3> Spotlight</h3>
          </a>
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-auto">
        <div className="space-y-14">
          <div className="md:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white"
            >
              <HamburgerIcon />
            </button>
          </div>
          <div className="md:flex hidden justify-between items-center ">
            <SmallSearchBar search="" setSearch={setSearch} />
            <div className="flex items-center gap-2 px-2">
              <BellIcon />{" "}
              <img
                alt="Profile avatar Image"
                className="h-10 w-10"
                src={AvatarImage}
              />
            </div>
          </div>
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">User Directory</h1>
              <p className="text-sm  text-text-primary">
                Find a list of users below
              </p>
            </div>
            <button
              onClick={() => setAddModalOpen(true)}
              className="bg-white hidden md:flex items-center gap-2 text-black font-medium px-3.5 py-3.5 rounded-xl hover:bg-gray-200"
            >
              <span>
                <PlusIcon />
              </span>{" "}
              Add User
            </button>
          </div>
        </div>
        <SearchBar search={search} setSearch={setSearch} />

        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && filteredUsers.length === 0 && (
          <p className="text-gray-400">No users found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => <CardLoading key={i} />)
            : filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onClick={() => handleCardClick(user)}
                />
              ))}
        </div>
      </main>
      {modalUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setModalUser(null)}
        />
      )}
      {addModalOpen && (
        <AddUserModal
          isOpen={addModalOpen}
          onClose={() => setAddModalOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardScreen;
