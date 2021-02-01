import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Selectors = () => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="selectors">
      <h2>{category}</h2>
      <div className="wrapper">
        <Link href="/products/gloves">
          <button
            className={`selector${category === "gloves" ? " active" : ""}`}
          >
            <a>Gloves</a>
          </button>
        </Link>
        <Link href="/products/facemasks">
          <button
            className={`selector${category === "facemasks" ? " active" : ""}`}
          >
            <a>Facemasks</a>
          </button>
        </Link>
        <Link href="/products/beanies">
          <button
            className={`selector${category === "beanies" ? " active" : ""}`}
          >
            <a>Beanies</a>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Selectors;
