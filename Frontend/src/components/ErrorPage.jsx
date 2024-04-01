import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
    <div className="custom-bg flex justify-center items-center flex-col gap-4 h-[83.9vh] md:h-[80%]">
      <div className="text-9xl md:text-6xl">404</div>
      <div className="text-4xl md:text-2xl">Page Not Found</div>
    </div>
    </>
  );
}