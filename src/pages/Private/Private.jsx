import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Private = () => {
  const { currentUser } = useContext(userContext);
  if (currentUser) {
    return <Outlet />;
  } else {
    return <Navigate to="/sign-in" />;
  }
};
export default Private;
