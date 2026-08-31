import SkeletonCard from "../../../components/ui/Skeleton/SkeletonCard";

const CampaignGridSkeleton = () => {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default CampaignGridSkeleton;