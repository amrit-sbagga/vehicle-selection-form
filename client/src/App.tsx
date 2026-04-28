import { useMemo, useState } from "react";
import { VEHICLES } from "./data/vehicles";

function App() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [badge, setBadge] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState("");

  const makes = Object.keys(VEHICLES);

  const models = useMemo(() => {
    if (!make) return [];
    return Object.keys(VEHICLES[make as keyof typeof VEHICLES]);
  }, [make]);

  const badges = useMemo(() => {
    if (!make || !model) return [];

    return VEHICLES[make as keyof typeof VEHICLES][
      model as keyof (typeof VEHICLES)[keyof typeof VEHICLES]
    ];
  }, [make, model]);

  const handleMakeChange = (value: string) => {
    setMake(value);
    setModel("");
    setBadge("");
  };

  const handleModelChange = (value: string) => {
    setModel(value);
    setBadge("");
  };

  const applyPreset = (
    selectedMake: string,
    selectedModel: string,
    selectedBadge: string
  ) => {
    setMake(selectedMake);
    setModel(selectedModel);
    setBadge(selectedBadge);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("make", make);
    formData.append("model", model);
    formData.append("badge", badge);

    if (file) {
      formData.append("logbook", file);
    }

    const res = await fetch("http://localhost:5000/api/vehicle", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    setResponse(JSON.stringify(data, null, 2));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        padding: "40px 16px",
        fontFamily: "Arial"
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "32px",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
        }}
      >
        <h1 style={{ marginTop: 0 }}>Vehicle Selection Form</h1>

        <p style={{ color: "#666", marginBottom: "24px" }}>
          Select a vehicle and upload service logbook.
        </p>

        <div style={{ marginBottom: "20px" }}>
          <strong>Quick Select</strong>

          <div style={{ marginTop: "10px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => applyPreset("Tesla", "Model 3", "Performance")}
              style={secondaryButton}
            >
              Tesla Model 3
            </button>

            <button
              type="button"
              onClick={() => applyPreset("BMW", "130d", "xDrive 26d")}
              style={secondaryButton}
            >
              BMW 130d
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <FormField label="Make">
            <select
              value={make}
              onChange={(e) => handleMakeChange(e.target.value)}
              style={inputStyle}
            >
              <option value="">Select Make</option>
              {makes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Model">
            <select
              value={model}
              disabled={!make}
              onChange={(e) => handleModelChange(e.target.value)}
              style={inputStyle}
            >
              <option value="">Select Model</option>
              {models.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Badge">
            <select
              value={badge}
              disabled={!model}
              onChange={(e) => setBadge(e.target.value)}
              style={inputStyle}
            >
              <option value="">Select Badge</option>
              {badges.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </FormField>

          <FormField label="Upload Logbook">
            <input
              type="file"
              accept=".txt"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </FormField>

          <button type="submit" style={primaryButton}>
            Submit
          </button>
        </form>

        <div
          style={{
            marginTop: "24px",
            background: "#f8f8f8",
            padding: "12px",
            borderRadius: "8px",
            fontSize: "14px"
          }}
        >
          <strong>Current Selection</strong>
          <pre style={{ marginBottom: 0 }}>
            {JSON.stringify(
              {
                make,
                model,
                badge,
                fileName: file?.name || ""
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>

      {response && (
        <div
          style={{
            marginTop: "20px",
            background: "#eef6ff",
            padding: "12px",
            borderRadius: "8px"
          }}
        >
          <strong>Server Response</strong>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}

type FormFieldProps = {
  label: string;
  children: React.ReactNode;
};

function FormField({ label, children }: FormFieldProps) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "6px",
          fontWeight: 600
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #d1d5db"
};

const primaryButton = {
  width: "100%",
  background: "#2563eb",
  color: "#fff",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 600
};

const secondaryButton = {
  border: "1px solid #d1d5db",
  background: "#fff",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer"
};

export default App;