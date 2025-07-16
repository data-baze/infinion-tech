const CardLoading = () => {
  return (
    <div className="bg-background-secondary rounded-lg p-4 flex flex-col items-center text-center shadow animate-pulse">
      <div className="w-20 h-20 rounded-full animate-pulse bg-gray-600 mb-3" />
      <div className="h-4 w-24 animate-pulse bg-gray-600 rounded mb-2" />
      <div className="h-3 w-32 animate-pulse bg-gray-600 rounded" />
    </div>
  );
};

export default CardLoading;
