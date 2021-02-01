import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  // Redirets to /products/beanies when application is started
  useEffect(() => {
    router.push("/products/beanies");
  }, []);

  return null;
};

export default Home;
