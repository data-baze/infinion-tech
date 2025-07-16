import type { User } from "../../../types/user";

interface Props {
  user: User;
  onClick?: () => void;
}

const UserCard = ({ user, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-background-secondary hover:bg-background-secondary/45 rounded-lg p-4 flex flex-col items-center text-center shadow"
    >
      <img
        src={user.avatar}
        alt={user.name}
        className="w-20 h-20 rounded-full object-cover mb-3"
      />
      <h3 className="text-lg font-semibold text-white">{user.name}</h3>
      <p className="text-sm text-gray-400">{user.email}</p>
    </div>
  );
};

export default UserCard;
