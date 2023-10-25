import { Route, Routes } from "react-router-dom"
import PhotoShoot from "../pages/Photo/PhotoShoot"
import PhotoDetail from "../pages/Photo/PhotoDetail"
import PhotoArrival from "../pages/Photo/PhotoArrival"
import PhotoList from "../pages/Photo/PhotoList"
import PhotoEdit from "../pages/Photo/PhotoEdit"
import Navigation from "../components/layout/Navigation"

const MainRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/shoot" element={
        <>
          <Navigation />
          <PhotoShoot />
        </>
        }/>
        <Route path="/edit" element={
        <>
          <Navigation />
          <PhotoEdit />
        </>
        }/>
        <Route path="/arrival" element={
        <>
          <Navigation />
          <PhotoArrival />
        </>
        }/>
        <Route path="/lists" element={
          <>
            <Navigation />
            <PhotoList />
          </>}>
          <Route path=":id" element={<PhotoDetail />}/>
        </Route>
      </Routes>
    </>
  )
}

export default MainRouter