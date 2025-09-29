
export default function Loader() {
  return (
    <div
      className="loading-icon-container"
      role="status"
      aria-live="polite"
      aria-label="Loading..."
      style={{
        display: 'grid',
        placeItems: 'center',
        minHeight: '100dvh',
    }}>
      <div className="loading-icon" />
      <span
        className="sr-only"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: '0',
        }}
      >
        Loading...
      </span>
    </div>
  );
}