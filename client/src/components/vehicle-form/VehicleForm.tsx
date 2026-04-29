import { useState } from "react";
import useVehicleSelection from "../../hooks/useVehicleSelection";

import QuickSelect from "../quick-select/QuickSelect";
import VehicleFormFields from "./form/VehicleFormFields";
import FileUploadField from "./form/fields/FileUploadField";

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

  const [file, setFile] = useState<File | null>(
    null
  );

  const showModel = Boolean(make);
  const showBadge = Boolean(
    make && model
  );
  const showUpload = Boolean(
    make && model && badge
  );

  const isFormValid = Boolean(
    make && model && badge && file
  );

  return (
    <>
      <form
        action="http://localhost:5000/api/upload"
        method="POST"
        encType="multipart/form-data"
      >
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
          <div
            className={
              styles.uploadSection
            }
          >
            <FileUploadField
              onChange={setFile}
            />

            <button
              className={
                styles.button
              }
              type="submit"
              disabled={
                !isFormValid
              }
            >
              Submit
            </button>
          </div>
        )}
      </form>

      <QuickSelect
        onSelect={applyPreset}
      />
    </>
  );
}

export default VehicleForm;