function RealtimeStatus({ connectionLabel, userLabel, lastEvent }) {
  return (
    <section className="card status-card">
      <div className="section-header">
        <div>
          <p className="eyebrow">Realtime Demo Panel</p>
          <h2>Connection Status</h2>
        </div>
      </div>

      <div className="status-grid">
        <div className="status-box">
          <span className="status-label">Current User</span>
          <strong>{userLabel}</strong>
        </div>

        <div className="status-box">
          <span className="status-label">Listener</span>
          <strong>{connectionLabel}</strong>
        </div>

        <div className="status-box">
          <span className="status-label">Last Event</span>
          <strong>{lastEvent || "Waiting for activity..."}</strong>
        </div>
      </div>
    </section>
  );
}

export default RealtimeStatus;
