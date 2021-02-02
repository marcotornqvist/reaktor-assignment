import Link from "next/link";

const Error = () => {
  return (
    <div className="error">
      <div className="container">
        <span className="error-code">404</span>
        <Link href="/products/beanies">Go Back</Link>
      </div>
    </div>
  );
};

export default Error;
