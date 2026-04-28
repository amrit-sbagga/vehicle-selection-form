import { useMemo, useState } from "react";
import { VEHICLES } from "./data/vehicles";

function App() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [badge, setBadge] = useState("");

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

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial",
        maxWidth: "600px",
        margin: "0 auto"
      }}
    >
      <h1>Vehicle Selection Form</h1>

      <div style={{ marginBottom: "1.5rem" }}>
        <p><strong>Quick Select</strong></p>

        <button
          onClick={() => applyPreset("Tesla", "Model 3", "Performance")}
          style={{ marginRight: "10px", padding: "8px 12px" }}
        >
          Tesla Model 3 Performance
        </button>

        <button
          onClick={() => applyPreset("BMW", "130d", "xDrive 26d")}
          style={{ padding: "8px 12px" }}
        >
          BMW 130d xDrive 26d
        </button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Make</label>
        <select
          value={make}
          onChange={(e) => handleMakeChange(e.target.value)}
          style={{ display: "block", width: "100%", padding: "8px" }}
        >
          <option value="">Select Make</option>
          {makes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Model</label>
        <select
          value={model}
          disabled={!make}
          onChange={(e) => handleModelChange(e.target.value)}
          style={{ display: "block", width: "100%", padding: "8px" }}
        >
          <option value="">Select Model</option>
          {models.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>Badge</label>
        <select
          value={badge}
          disabled={!model}
          onChange={(e) => setBadge(e.target.value)}
          style={{ display: "block", width: "100%", padding: "8px" }}
        >
          <option value="">Select Badge</option>
          {badges.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          background: "#f5f5f5",
          padding: "1rem",
          borderRadius: "8px",
          marginTop: "1rem"
        }}
      >
        <strong>Current Selection</strong>

        <pre>{JSON.stringify({ make, model, badge }, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;