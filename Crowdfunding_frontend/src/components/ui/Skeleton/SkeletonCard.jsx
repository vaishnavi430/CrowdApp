const SkeletonCard = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">
      <div className="h-60 w-full bg-gray-200" />

      <div className="space-y-4 p-6">
        <div className="h-5 w-24 rounded bg-gray-200" />

        <div className="h-7 w-3/4 rounded bg-gray-200" />

        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-5/6 rounded bg-gray-200" />

        <div className="h-3 w-full rounded bg-gray-200" />

        <div className="mt-6 h-11 rounded-xl bg-gray-200" />
      </div>
    </div>
  );
};

export default SkeletonCard;