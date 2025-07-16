import DobIcon from "../../../components/svgs/DobIcon";
import LocationIcon from "../../../components/svgs/LocationIcon";
import PhoneIcon from "../../../components/svgs/PhoneIcon";
import XIcon from "../../../components/svgs/XIcon";
import type { User } from "../../../types/user";

interface Props {
  user: User | null;
  onClose: () => void;
}

const UserDetailsModal = ({ user, onClose }: Props) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/90 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-background-secondary text-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-semibold">User Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <XIcon />
          </button>
        </div>
        <div className="flex flex-col items-center text-center">
          <img src={user.avatar} className="w-24 h-24 rounded-full mb-4" />
          <h3 className="text-xl font-semibold p-1.5 bg-gradient-to-r from-gradient-start to-gradient-end">
            {user.name}
          </h3>
          <p className="text-sm text-gray-400 mb-5">{user.email}</p>
        </div>
        <div className="space-y-4 items-start w-full">
          {user.phone && (
            <div className="flex items-center gap-2 mb-4">
              <div className="self-start">
                <PhoneIcon />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-text-primary">Phone</p>
                <p className="text-sm  text-white"> {user.phone}</p>
              </div>
            </div>
          )}
          {user.location && (
            <div className="flex items-center gap-2 mb-4">
              <div className="self-start">
                <LocationIcon />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-text-primary">Location</p>
                <p className="text-sm  text-white"> {user.location}</p>
              </div>
            </div>
          )}
          {user.dob && (
            <div className="flex items-center gap-2 mb-4">
              <div className="self-start">
                <DobIcon />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-text-primary">DOB</p>
                <p className="text-sm  text-white"> {user.dob}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;
