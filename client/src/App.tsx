import VehicleForm from "./components/vehicle-form/VehicleForm";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          Drill Down Form
        </h1>
        <VehicleForm />
      </div>
    </div>
  );
}

export default App;