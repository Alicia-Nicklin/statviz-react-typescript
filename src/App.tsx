import { useState } from "react";
import { DistributionExplorer } from "./components/DistributionExplorer";
import { ZTestPanel } from "./components/ZTestPanel";
import "./App.css";

type Tab = "explorer" | "ztest";

const TABS: { id: Tab; label: string }[] = [
  { id: "explorer", label: "Distribution explorer" },
  { id: "ztest", label: "Z-test calculator" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("explorer");

  return (
    <div className="app">
      <header className="app-header">
        <p className="eyebrow">React + TypeScript prototype</p>
        <h1>StatViz</h1>
        <p>
          Interactive tools for exploring normal distributions and hypothesis
          testing.
        </p>
      </header>

      <nav className="tab-nav" role="tablist" aria-label="StatViz tools">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={activeTab === tab.id ? "tab active" : "tab"}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="app-main">
        {activeTab === "explorer" && <DistributionExplorer />}
        {activeTab === "ztest" && <ZTestPanel />}
      </main>

      <footer className="app-footer">
        Built with React + TypeScript. Core statistics implemented without
        external maths libraries.
      </footer>
    </div>
  );
}
