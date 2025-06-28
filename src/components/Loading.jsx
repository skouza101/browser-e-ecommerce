
const Loading = () => {
  return (
    <div className="flex min-w-64  flex-col gap-4">
      <div className="skeleton h-48 w-full"></div>
      <div className="skeleton h-4 w-28"></div>
      <div className="skeleton h-4 w-full"></div>
      <div className="skeleton h-4 w-full"></div>
    </div>
  );
}

export default Loading