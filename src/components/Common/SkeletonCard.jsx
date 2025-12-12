export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl shadow-card overflow-hidden">
      {/* Image Skeleton */}
      <div className="aspect-square skeleton" />
      
      {/* Content Skeleton */}
      <div className="p-4">
        {/* Brand */}
        <div className="h-3 w-16 skeleton rounded mb-2" />
        
        {/* Title */}
        <div className="h-5 w-3/4 skeleton rounded mb-2" />
        <div className="h-5 w-1/2 skeleton rounded mb-3" />
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="h-4 w-20 skeleton rounded" />
          <div className="h-3 w-8 skeleton rounded ml-2" />
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-6 w-24 skeleton rounded" />
        </div>
        
        {/* Button */}
        <div className="h-10 w-full skeleton rounded" />
      </div>
    </div>
  );
}