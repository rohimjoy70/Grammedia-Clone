"use client";

import { useSearchParams } from "next/navigation";

const ClientError = () => {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");
  const successMessage = searchParams.get("message");

  return (
    <>
      {errorMessage && (
        <p className="animate-pulse text-center text-red-600 italic">
          {`"`}
          {errorMessage}
          {`"`}
        </p>
      )}
      {successMessage && (
        <p className="animate-pulse text-center text-sky-600 text-xl italic">
          {`"`}
          {successMessage}
          {`"`}
        </p>
      )}
    </>
  );
};

export default ClientError;
