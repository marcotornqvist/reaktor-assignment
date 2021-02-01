import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductItem from "./productItem";
import Spinner from "./spinner";
import axios from "axios";

// const headers = {
//   "x-force-error-mode": "all",
// };

const Products = () => {
  const router = useRouter();
  const [data, setData] = useState();
  const [names, setNames] = useState();
  const [makers, setMakers] = useState();
  const [merged, setMerged] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { category } = router.query;
    setLoading(true);
    // Requests that returns products by category
    const fetchData = async () => {
      const result = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://bad-api-assignment.reaktor.com/v2/products/${category}`
        // { headers: headers }
      );

      // Sets the response
      setData(result.data);
      setLoading(false);
    };

    if (
      category === "gloves" ||
      category === "facemasks" ||
      category === "beanies"
    ) {
      fetchData();
    }
  }, [router.query.category]); // Request based on

  // Sets the initial makers(manufacturers)
  // If we don't set the initial makers and instead
  // hardcode the makers the program will crash if there are more makers added in the backend
  useEffect(() => {
    if (data) {
      // "Set" only accepts unique values
      let nameSet = new Set([]);
      data?.forEach((item) => nameSet.add(item.manufacturer));
      // Converts set to array in order to be able sort
      const newNames = [...nameSet];
      newNames.sort();
      // Updates names if they are different from old names
      if (JSON.stringify(newNames) !== JSON.stringify(names)) {
        // Sets new set of names
        setNames(newNames);
      }
    }
  }, [data]);

  useEffect(() => {
    // If names have changed, make new requests to availability
    if (names) {
      const requests = [];

      // Makes a get request to availability dynamically based on name
      for (let i = 0; i < names.length; i++) {
        requests.push(
          axios.get(
            `https://cors-anywhere.herokuapp.com/https://bad-api-assignment.reaktor.com/v2/availability/${names[i]}`
          )
        );
      }

      // Axios .all makes it possible for us to request in pararrel from different recourses
      axios.all(requests).then(
        axios.spread((...args) => {
          const results = [];
          args.forEach((item) => {
            results.push(...item.data.response);
          });

          setMakers(results);
        })
      );
    }
  }, [names]);

  // Merges products with manufacturers
  useEffect(() => {
    if (data && makers) {
      setMerged();
      const results = [];

      for (let i = 0; i < data.length; i++) {
        results.push({
          ...data[i],
          ...makers.find((item) => item.id === data[i].id.toUpperCase()),
        });
      }

      setMerged(results);
    }
  }, [data, makers]);

  return (
    <Fragment>
      <table className="products">
        <thead>
          <tr>
            <th>
              <span>Product Name</span>
            </th>
            <th>
              <span>Manufacturer</span>
            </th>
            <th>
              <span>Price</span>
            </th>
            <th>
              <span>Status</span>
            </th>
            <th>
              <span>Colors</span>
            </th>
            <th>
              <span>Product no.</span>
            </th>
          </tr>
        </thead>
        {/* If loading is set to false render "ProductItem"'s */}
        {!loading && (
          <tbody>
            {merged
              ? // loops through all the products & manufacturers
                merged.map((item, index) => (
                  <ProductItem item={item} merged={true} key={index} />
                ))
              : // loops through all the products
                data?.map((item, index) => (
                  <ProductItem item={item} merged={false} key={index} />
                ))}
          </tbody>
        )}
      </table>
      {/* Renders a spinner component */}
      {loading && <Spinner />}
    </Fragment>
  );
};

export default Products;
