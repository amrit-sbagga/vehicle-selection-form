import styles from "./SelectField.module.css";

type Props = {
    label: string;
    name: string;
    value: string;
    options: string[];
    onChange: (value: string) => void;
};

function SelectField({
    label,
    name,
    value,
    options,
    onChange
}: Props) {
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