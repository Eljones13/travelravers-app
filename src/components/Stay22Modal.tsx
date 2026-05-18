// TRAVEL RAVERS: Stay22 embed modal
// Widget ID: 69c70abc0b667df475d14877
import "./Stay22Modal.css";

const STAY22_WIDGET_ID = "69c70abc0b667df475d14877";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function Stay22Modal({ open, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="tr-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Find accommodation">
      {/* Stop click propagation so clicking the modal body doesn't close it */}
      <div className="tr-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="tr-modal-close"
          onClick={onClose}
          aria-label="Close accommodation search"
        >
          ✕
        </button>
        <p className="tr-modal-eyebrow">Find Accommodation</p>
        <iframe
          id="stay22-widget"
          width="100%"
          height="428"
          src={`https://www.stay22.com/embed/${STAY22_WIDGET_ID}`}
          frameBorder="0"
          loading="lazy"
          title="Stay22 accommodation search"
        />
      </div>
    </div>
  );
}
