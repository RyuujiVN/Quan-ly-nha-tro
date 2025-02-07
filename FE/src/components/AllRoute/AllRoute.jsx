import { useRoutes } from "react-router-dom";
import { route } from "../../routes/route";

const AllRoute = () => {
  const elements = useRoutes(route);
  return <>{elements}</>;
};

export default AllRoute;
