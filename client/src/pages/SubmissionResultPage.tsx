import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import SubmissionResult from "../components/results/SubmissionResult";
import styles from "../App.module.css";
import {
  clearVehicleUploadResult,
  readVehicleUploadResult,
} from "../utils/vehicleUploadResult";

function SubmissionResultPage() {
  const navigate = useNavigate();
  const data = useMemo(() => readVehicleUploadResult(), []);

  if (!data) {
    return (
      <div className={styles.page}>
        <div className={styles.card}>
          <h1 className={styles.title}>No submission to show</h1>
          <p className={styles.subtitle}>
            Upload a log file from the home page, or use your browser’s
            Back button if you just submitted.
          </p>
          <p>
            <Link to="/">Return to form</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <SubmissionResult
          data={data}
          onDismiss={() => {
            clearVehicleUploadResult();
            navigate("/");
          }}
        />
      </div>
    </div>
  );
}

export default SubmissionResultPage;
