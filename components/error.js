import React from "react";
import { useRouter } from "next/router";

const Error = ({ error }) => {
  const router = useRouter();
  // console.log(error);
  return (
    <div className="error">
      <div className="wrapper">
        <h2>
          {error.status === 429
            ? "Too many requests try again later"
            : error.statusText}
        </h2>
        <button onClick={() => router.reload()}>Refresh Page</button>
      </div>
    </div>
  );
};

export default Error;
