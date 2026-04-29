import styles from "./FileUploadField.module.css";
import { useRef, useState } from "react";

type Props = {
  onChange: (file: File | null) => void;
};

function FileUploadField({ onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>
        Upload Logbook
      </p>

      <input
        ref={inputRef}
        type="file"
        name="logbook"
        accept=".txt"
        className={styles.hiddenInput}
        onChange={(e) => {
          const file =
            e.target.files?.[0] || null;

          setFileName(file?.name || "");
          onChange(file);
        }}
      />

      <div className={styles.row}>
        <button
          type="button"
          className={styles.button}
          onClick={handleClick}
        >
          Choose File
        </button>

        <span className={styles.fileName}>
          {fileName || "No file chosen"}
        </span>
      </div>
    </div>
  );
}

export default FileUploadField;