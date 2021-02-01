const ProductItem = ({ item, merged }) => {
  const { DATAPAYLOAD, id, name, color, price, manufacturer } = item;

  const getStock = (availability) => {
    // Separates stock value from the rest of the string
    const value = availability?.match(
      new RegExp("<INSTOCKVALUE>" + "(.*)" + "</INSTOCKVALUE>")
    )[1];

    // Return "loading..." incase availability & products haven't merged
    if (!merged) {
      return <span>Loading...</span>;
    } else {
      if (value === "INSTOCK") {
        return <span className="green">In Stock</span>;
      } else if (value === "LESSTHAN10") {
        return <span className="yellow">Less Than 10</span>;
      } else if (value === "OUTOFSTOCK") {
        return <span className="red">Out Of Stock</span>;
      } else {
        return <span>Undefined...</span>;
      }
    }
  };

  return (
    <tr className="row">
      <td className="product-name">
        <span>{name}</span>
      </td>
      <td>
        <span>{manufacturer}</span>
      </td>
      <td>
        <span>{price.toFixed(2)}€</span>
      </td>
      <td className="stock">{getStock(DATAPAYLOAD)}</td>
      <td className="colors">
        {color.map((el, index) => (
          <div className="color" key={index}>
            <div className={`color-circle ${el}`}></div>
            <span>{el}</span>
          </div>
        ))}
      </td>
      <td className="product-number">
        <span>{id}</span>
      </td>
    </tr>
  );
};

export default ProductItem;
