import { FormEvent, useState } from "react";
import useVehicleSelection from "../../hooks/useVehicleSelection";
import { getVehicleUploadEndpoint } from "../../config/uploadEndpoint";
import type { VehicleValidationErrorBody } from "../../types";

import QuickSelect from "../quick-select/QuickSelect";
import VehicleFormFields from "./form/VehicleFormFields";
import FileUploadField from "./form/fields/FileUploadField";

import styles from "./VehicleForm.module.css";
import {
  isVehicleUploadSuccess,
  saveVehicleUploadResult,
} from "../../utils/vehicleUploadResult";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

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
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    null
  );

  const showModel = Boolean(make);
  const showBadge = Boolean(make && model);
  const showUpload = Boolean(make && model && badge);

  const isFormValid = Boolean(
    make && model && badge && file
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file || !make || !model || !badge) return;

    setSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("make", make);
    formData.append("model", model);
    formData.append("badge", badge);
    formData.append("logbook", file);

    try {
      const res = await fetch(getVehicleUploadEndpoint(), {
        method: "POST",
        body: formData,
      });

      let body: unknown;
      try {
        body = await res.json();
      } catch {
        setErrorMessage("Server returned a non-JSON response.");
        return;
      }

      if (res.ok && isVehicleUploadSuccess(body)) {
        saveVehicleUploadResult(body);
        window.location.assign(
          `${window.location.origin}/result`
        );
        return;
      }

      if (
        res.status === 400 &&
        isRecord(body) &&
        body.error === "validation_failed"
      ) {
        const v = body as VehicleValidationErrorBody;
        setErrorMessage(
          JSON.stringify(v.fieldErrors, null, 2)
        );
        return;
      }

      if (isRecord(body) && typeof body.message === "string") {
        setErrorMessage(body.message as string);
        return;
      }

      setErrorMessage(`Request failed (${res.status}).`);
    } catch {
      setErrorMessage("Network error — is the API running?");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <VehicleFormFields
          make={make}
          model={model}
          badge={badge}
          makes={makes}
          models={models}
          badges={badges}
          selectMake={selectMake}
          selectModel={selectModel}
          selectBadge={selectBadge}
          showModel={showModel}
          showBadge={showBadge}
        />

        {showUpload && (
          <div className={styles.uploadSection}>
            <FileUploadField onChange={setFile} />

            <button
              className={styles.button}
              type="submit"
              disabled={!isFormValid || submitting}
            >
              {submitting ? "Submitting…" : "Submit"}
            </button>
          </div>
        )}
      </form>

      {errorMessage && (
        <pre className={styles.error}>{errorMessage}</pre>
      )}

      <QuickSelect onSelect={applyPreset} />
    </>
  );
}

export default VehicleForm;
