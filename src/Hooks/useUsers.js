import { useSelector, useDispatch } from "react-redux";
import { setLoginUser } from "../features/users/usersSlice";

export function useUsers() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.availableUsers);
  const loginUser = useSelector((state) => state.users.loginUserId);
  const userName = users.find((user) => user.id === loginUser).name;

  const setUser = (userId) => {
    dispatch(setLoginUser({ userId: userId }));
  };

  const getUserName = (userId) => {
    return users.find((user) => user.id === userId).name;
  };

  return [users, setUser, loginUser, userName, getUserName];
}
