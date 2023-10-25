import { Route, Routes } from "react-router-dom"
import Main from "../pages/Main"
import UserJoin from "../pages/Login/UserJoin"
import UserAccount from "../pages/Login/UserAccount"

const LoginRouter = () => {
  return (
      <Routes>
        <Route path="/" element={<Main  />} />
        <Route path="/join" element={<UserJoin />} />
        <Route path="/account" element={<UserAccount />} />
      </Routes>
  )
}

export default LoginRouter
