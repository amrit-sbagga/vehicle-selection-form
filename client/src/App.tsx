import { Route, Routes } from "react-router-dom";
import VehicleForm from "./components/vehicle-form/VehicleForm";
import SubmissionResultPage from "./pages/SubmissionResultPage";
import styles from "./App.module.css";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className={styles.page}>
            <div className={styles.card}>
              <h1 className={styles.title}>
                Drill Down Form
              </h1>
              <VehicleForm />
            </div>
          </div>
        }
      />
      <Route path="/result" element={<SubmissionResultPage />} />
    </Routes>
  );
}

export default App;