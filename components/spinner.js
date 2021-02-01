import React from "react";
import Image from "next/image";

const Spinner = () => {
  return (
    <div className="spinner">
      <Image
        src="/img/spinner.gif"
        layout="fixed"
        width={96}
        height={96}
        loading="eager"
      />
    </div>
  );
};

export default Spinner;
