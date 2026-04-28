import { useState } from "react";
import useVehicleSelection from "../../hooks/useVehicleSelection";
import QuickSelect from "../quick-select/QuickSelect";
import ResponseCard from "../response-card/ResponseCard";
import styles from "./VehicleForm.module.css";

function VehicleForm() {
  const {
    make,
    model,
    badge,
    makes,
    models,
    badges,
    selectMake,
    selectModel,
    selectBadge,
    applyPreset
  } = useVehicleSelection();

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [response, setResponse] = useState("");

  const isFormValid = Boolean(
    make && model && badge && file
  );

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!isFormValid || loading) return;

    try {
      setLoading(true);
      setError("");
      setResponse("");

      const formData = new FormData();
      formData.append("make", make);
      formData.append("model", model);
      formData.append("badge", badge);

      if (file) {
        formData.append("logbook", file);
      }

      const res = await fetch(
        "http://localhost:5000/api/vehicle",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await res.json();

      setResponse(
        JSON.stringify(data, null, 2)
      );
    } catch {
      setError(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <QuickSelect onSelect={applyPreset} />

      <form onSubmit={handleSubmit}>
        <div className={styles.group}>
          <label className={styles.label}>
            Make
          </label>

          <select
            className={styles.input}
            value={make}
            onChange={(e) =>
              selectMake(e.target.value)
            }
          >
            <option value="">
              Select Make
            </option>

            {makes.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>
            Model
          </label>

          <select
            className={styles.input}
            value={model}
            disabled={!make}
            onChange={(e) =>
              selectModel(e.target.value)
            }
          >
            <option value="">
              Select Model
            </option>

            {models.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>
            Badge
          </label>

          <select
            className={styles.input}
            value={badge}
            disabled={!model}
            onChange={(e) =>
              selectBadge(e.target.value)
            }
          >
            <option value="">
              Select Badge
            </option>

            {badges.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.group}>
          <label className={styles.label}>
            Upload Logbook
          </label>

          <input
            className={styles.fileInput}
            type="file"
            accept=".txt"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] || null
              )
            }
          />
        </div>

        {!isFormValid && (
          <p className={styles.helper}>
            Please complete all fields
            and upload logbook.
          </p>
        )}

        <button
          className={styles.button}
          type="submit"
          disabled={
            !isFormValid || loading
          }
        >
          {loading
            ? "Submitting..."
            : "Submit"}
        </button>

        {error && (
          <p className={styles.error}>
            {error}
          </p>
        )}
      </form>

      <ResponseCard
        title="Server Response"
        content={response}
      />
    </>
  );
}

export default VehicleForm;