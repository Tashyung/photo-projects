import { Route, Routes } from "react-router-dom"
import Main from "../pages/Main"
import UserJoin from "../pages/Login/UserJoin"
import UserAccount from "../pages/Login/UserAccount"
import UserInfo from "../pages/Login/UserInfo"

const LoginRouter = () => {
  return (
      <Routes>
        <Route path="/" element={<Main  />} />
        <Route path="/join" element={<UserJoin />} />
        <Route path="/account" element={<UserAccount />} />
        <Route path="/mypage" element={<UserInfo />} />
      </Routes>
  )
}

export default LoginRouter
