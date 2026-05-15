import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import FlapBoard from "./pages/FlapBoard";
import HomePage from "./pages/HomePage";
import Miscellaneous from "./pages/Miscellaneous";
import PhotoAlbumPage from "./pages/PhotoAlbumPage";
import PhotosPage from "./pages/PhotosPage";
import Time from "./pages/Time";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/about"    element={<HomePage initialSection="about" />} />
        <Route path="/projects" element={<HomePage initialSection="projects" />} />
        <Route path="/timeline" element={<HomePage initialSection="timeline" />} />
        <Route path="/contact"  element={<HomePage initialSection="contact" />} />
        <Route path="/miscellaneous">
          <Route index element={<Miscellaneous />} />
          <Route path="photos" element={<PhotosPage />} />
          <Route path="photos/:albumSlug" element={<PhotoAlbumPage />} />
          <Route path="time" element={<Time />} />
          <Route path="board" element={<FlapBoard />} />
        </Route>
      </Route>
    </Routes>
  );
}
