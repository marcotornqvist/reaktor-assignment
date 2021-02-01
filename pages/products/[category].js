import React from "react";
import Selectors from "../../components/selectors";
import Products from "../../components/products";

const Categories = () => {
  return (
    <div className="categories">
      <div className="container">
        <Selectors />
        <div className="dashboard">
          <Products />
        </div>
      </div>
    </div>
  );
};

export default Categories;
