import VehicleForm from "./components/vehicle-form/VehicleForm";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          Vehicle Selection Form
        </h1>

        <p className={styles.subtitle}>
          Select a vehicle and upload service logbook.
        </p>

        <VehicleForm />
      </div>
    </div>
  );
}

export default App;