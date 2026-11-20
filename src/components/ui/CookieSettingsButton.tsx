"use client";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="btn btn--small"
      style={{ marginTop: 16 }}
      onClick={() => window.dispatchEvent(new Event("ln:cookie-settings"))}
    >
      <span className="btn__label">
        <span>Modifier mes préférences</span>
        <span aria-hidden="true">Modifier mes préférences</span>
      </span>
    </button>
  );
}
