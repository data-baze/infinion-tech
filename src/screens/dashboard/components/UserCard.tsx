import type { User } from "../../../types/user";

interface Props {
  user: User;
  onClick?: () => void;
}

const UserCard = ({ user, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-background-secondary hover:bg-background-secondary/45 rounded-lg px-4 py-6 flex flex-col items-center text-center shadow space-y-6"
    >
      <img
        src={user.avatar}
        alt={user.name}
        className="w-20 h-20 rounded-full object-cover"
      />
      <h3 className="text-lg font-semibold text-white">{user.name}</h3>
      <p className="text-sm text-gray-400">{user.email}</p>
    </div>
  );
};

export default UserCard;
