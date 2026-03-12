import React from "react";

const Dialog = ({
  open,
  title,
  children,
  onClose,
  footer,
  width = "500px",
}) => {
  if (!open) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={{ ...styles.dialog, width }}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div style={styles.header}>
            <h3>{title}</h3>
            <button onClick={onClose} style={styles.closeButton}>
              ✕
            </button>
          </div>
        )}

        <div style={styles.body}>{children}</div>

        {footer && <div style={styles.footer}>{footer}</div>}
      </div>
    </div>
  );
};

export default Dialog;

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dialog: {
    background: "#fff",
    borderRadius: "8px",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  body: {
    marginBottom: "10px",
  },
  footer: {
    textAlign: "right",
  },
  closeButton: {
    border: "none",
    background: "transparent",
    fontSize: "18px",
    cursor: "pointer",
    padding: "4px 8px",
    lineHeight: "1",
  },
};
