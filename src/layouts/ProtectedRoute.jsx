import { Navigate, Outlet } from "react-router-dom";
import { authTokenAtom } from "../atoms/Persistent";
import { useAtomValue } from 'jotai';

export const ProtectedRoute = () => {
  const authToken = useAtomValue(authTokenAtom);
  if (!authToken) {
    return <Navigate to={"/login"} />
  }
  return <Outlet />;
};
