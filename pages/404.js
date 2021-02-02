import Link from "next/link";

const Error = () => {
  return (
    <div className="error">
      <div className="container">
        <div className="wrapper">
          <h1 className="error-code">404</h1>
          <Link href="/products/beanies">
            <button>Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
