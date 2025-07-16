import React, { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { createUser } from "../../../redux/features/userSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddUserModal = ({ isOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [dob, setDob] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createUser({ name, location, dob }));
    setName("");
    setLocation("");
    setDob("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-background-primary text-white rounded-lg p-6 w-full max-w-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Enter User Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-sm">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-background-secondary text-white border border-gray-600 rounded-md focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 bg-background-secondary text-white border border-gray-600 rounded-md focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-4 py-2 bg-background-secondary text-white border border-gray-600 rounded-md focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 w-full py-2 bg-white text-black rounded-md font-medium hover:bg-gray-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
