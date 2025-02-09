import { useEffect } from "react";
import instance from "../../api";

const Home = () => {
  useEffect(() => {
    const fetchApi = async () => {
      const res = await instance.get("/dashboard");
      console.log(res);
    };

    fetchApi();
  }, []);
  return <div>Home</div>;
};

export default Home;
