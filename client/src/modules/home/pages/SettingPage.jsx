import React, { useState } from "react";
import {
  Bot,
  FileSpreadsheet,
  LogOut,
  Moon,
  Sun,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../../../context/AuthContext";

const Settings = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [settings, setSettings] = useState({
    darkMode: false,
    compactMode: false,
    aiSuggestions: true,
    showSources: true,
    autoAnalyzeCsv: true,
    saveConversations: true,
  });

  const toggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const changeTheme = (dark) => {
    setSettings((prev) => ({
      ...prev,
      darkMode: dark,
    }));

    document.documentElement.classList.toggle("dark", dark);
  };

  const handleLogout = async () => {
    try {
      await logout();

      toast.success("Signed out successfully");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      toast.error("Unable to sign out");
    }
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5">
      {/* HEADER */}
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
          Preferences
        </p>

        <h1 className="mt-1 text-2xl font-semibold text-foreground">
          Settings
        </h1>

        <p className="mt-1 text-xs text-muted">
          Customize your Hank experience.
        </p>
      </div>

      {/* SETTINGS GRID */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* APPEARANCE */}
        <section className="card">
          <SectionTitle
            icon={<Sun size={16} />}
            title="Appearance"
          />

          <div className="p-5">
            <p className="mb-2 text-[10px] text-muted">
              Theme
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => changeTheme(false)}
                className={`flex h-10 items-center justify-center gap-2 rounded-lg border text-xs ${
                  !settings.darkMode
                    ? "border-primary bg-primary-muted text-primary"
                    : "border-border text-secondary hover:bg-card-secondary"
                }`}
              >
                <Sun size={15} />
                Light
              </button>

              <button
                type="button"
                onClick={() => changeTheme(true)}
                className={`flex h-10 items-center justify-center gap-2 rounded-lg border text-xs ${
                  settings.darkMode
                    ? "border-primary bg-primary-muted text-primary"
                    : "border-border text-secondary hover:bg-card-secondary"
                }`}
              >
                <Moon size={15} />
                Dark
              </button>
            </div>
          </div>

          <SettingRow
            title="Compact Mode"
            description="Use a smaller interface."
            enabled={settings.compactMode}
            onClick={() => toggle("compactMode")}
          />
        </section>

        {/* AI */}
        <section className="card">
          <SectionTitle
            icon={<Bot size={16} />}
            title="AI Assistant"
          />

          <SettingRow
            title="AI Suggestions"
            description="Show helpful AI suggestions."
            enabled={settings.aiSuggestions}
            onClick={() => toggle("aiSuggestions")}
          />

          <SettingRow
            title="Show Sources"
            description="Show sources used by Hank."
            enabled={settings.showSources}
            onClick={() => toggle("showSources")}
          />
        </section>

        {/* TICKETS */}
        <section className="card">
          <SectionTitle
            icon={<FileSpreadsheet size={16} />}
            title="Tickets"
          />

          <SettingRow
            title="Auto Analyze CSV"
            description="Automatically analyze uploaded CSV files."
            enabled={settings.autoAnalyzeCsv}
            onClick={() => toggle("autoAnalyzeCsv")}
          />

          <SettingRow
            title="Save Conversations"
            description="Save previous AI conversations."
            enabled={settings.saveConversations}
            onClick={() => toggle("saveConversations")}
          />
        </section>

        {/* ACCOUNT */}
        <section className="card">
          <SectionTitle
            icon={<User size={16} />}
            title="Account"
          />

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-5 py-4 text-left transition hover:bg-card-secondary"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-danger/10 text-danger">
              <LogOut size={16} />
            </div>

            <div className="flex-1">
              <p className="text-xs font-medium text-foreground">
                Sign Out
              </p>

              <p className="mt-0.5 text-[10px] text-muted">
                Sign out from your account.
              </p>
            </div>
          </button>
        </section>
      </div>
    </div>
  );
};

const SectionTitle = ({ icon, title }) => (
  <div className="flex items-center gap-3 border-b border-border px-5 py-4">
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-muted text-primary">
      {icon}
    </div>

    <h2 className="text-sm font-semibold text-foreground">
      {title}
    </h2>
  </div>
);

const SettingRow = ({
  title,
  description,
  enabled,
  onClick,
}) => (
  <button
    type="button"
    onClick={onClick}
    className="flex w-full items-center gap-4 border-b border-border px-5 py-4 text-left last:border-b-0 transition hover:bg-card-secondary"
  >
    <div className="flex-1">
      <p className="text-xs font-medium text-foreground">
        {title}
      </p>

      <p className="mt-0.5 text-[10px] text-muted">
        {description}
      </p>
    </div>

    <Toggle enabled={enabled} />
  </button>
);

const Toggle = ({ enabled }) => (
  <span
    className={`relative h-5 w-9 shrink-0 rounded-full transition ${
      enabled ? "bg-primary" : "bg-border"
    }`}
  >
    <span
      className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${
        enabled ? "left-[18px]" : "left-0.5"
      }`}
    />
  </span>
);

export default Settings;