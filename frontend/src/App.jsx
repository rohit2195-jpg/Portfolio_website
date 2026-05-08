import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import Miscellaneous from "./pages/Miscellaneous";
import PhotoAlbumPage from "./pages/PhotoAlbumPage";
import PhotosPage from "./pages/PhotosPage";
import ProjectsPage from "./pages/ProjectsPage";
import Time from "./pages/Time";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/miscellaneous">

          <Route index element={<Miscellaneous />}/>

          <Route path="photos" element={<PhotosPage />} />
          <Route path="photos/:albumSlug" element={<PhotoAlbumPage />} />
          <Route path="time" element={<Time/>} />
        </Route>
      </Route>
    </Routes>
  );
}
