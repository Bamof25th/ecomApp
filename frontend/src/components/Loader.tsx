const Loader = () => {
  return <div>Loading...</div>;
};

interface SkeletonProps {
  width?: string;
  length?: number;
}

export default Loader;

export const Skeleton = ({ width = "unset", length = 3 }: SkeletonProps) => {
  const skeletons = Array.from({ length }, (_, idx) => (
    <div className="skeleton-shape" key={idx}></div>
  ));
  return (
    <div className="skeleton-loader" style={{ width }}>
      {skeletons}
    </div>
  );
};
