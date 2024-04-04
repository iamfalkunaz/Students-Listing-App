import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddStudentForm from "./components/AddStudentForm";
import ListingPage from "./components/ListingPage";
import EditStudentForm from "./components/EditStudentForm";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListingPage />} />
        <Route path="/add" element={<AddStudentForm/>} />
        <Route path="/edit/:id" element={<EditStudentForm/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
