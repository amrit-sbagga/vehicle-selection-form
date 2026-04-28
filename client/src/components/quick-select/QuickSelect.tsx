import styles from "./QuickSelect.module.css";

type Props = {
  onSelect: (
    make: string,
    model: string,
    badge: string
  ) => void;
};

function QuickSelect({ onSelect }: Props) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>Quick Select</p>

      <div className={styles.buttons}>
        <button
          className={styles.button}
          type="button"
          onClick={() =>
            onSelect("Tesla", "Model 3", "Performance")
          }
        >
          Tesla Model 3
        </button>

        <button
          className={styles.button}
          type="button"
          onClick={() =>
            onSelect("BMW", "130d", "xDrive 26d")
          }
        >
          BMW 130d
        </button>
      </div>
    </div>
  );
}

export default QuickSelect;