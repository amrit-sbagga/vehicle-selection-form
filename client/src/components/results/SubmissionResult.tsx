import type { VehicleUploadSuccess } from "../../types/vehicle";
import styles from "./SubmissionResult.module.css";

type Props = {
  data: VehicleUploadSuccess;
  onDismiss: () => void;
};

function SubmissionResult({ data, onDismiss }: Props) {
  return (
    <section className={styles.wrapper} aria-live="polite">
      <h2 className={styles.title}>Submission result</h2>
      <div className={styles.row}>
        <span className={styles.label}>Make:</span> {data.make}
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Model:</span> {data.model}
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Badge:</span> {data.badge}
      </div>
      <p className={styles.row}>
        <span className={styles.label}>Logbook</span>
      </p>
      <pre className={styles.logbook}>{data.logbook}</pre>
      <button
        type="button"
        className={styles.dismiss}
        onClick={onDismiss}
      >
        Back to form
      </button>
    </section>
  );
}

export default SubmissionResult;
