import type { SelectFieldProps } from "../../../../types";
import styles from "./SelectField.module.css";

function SelectField({
    label,
    name,
    value,
    options,
    onChange
}: SelectFieldProps) {
    return (
        <div className={styles.field}>
            <label className={styles.label}>{label}</label>

            <select
                name={name}
                value={value}
                className={styles.select}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="" disabled>Select {label}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectField;