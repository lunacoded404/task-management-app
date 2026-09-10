import React, { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import "./stickyViewModal.scss";

const StickyViewModal = ({
    open,
    note,
    onClose,
}) => {
    useEffect(() => {
        if (!open) {
            return;
        }

        const handleEscape = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [open, onClose]);

    if (!open || !note) {
        return null;
    }

    return (
        <div
            className="stickyViewModal-overlay"
            onClick={onClose}
        >
            <div
                className="stickyViewModal"
                style={{
                    backgroundColor: note.color,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="stickyViewModal-header">
                    <h2 className="stickyViewModal-title">
                        {note.title}
                    </h2>

                    <button
                        type="button"
                        className="stickyViewModal-close"
                        onClick={onClose}
                        aria-label="Close"
                        title="Close"
                    >
                        <CloseIcon />
                    </button>
                </div>

                {/* Content */}
                <div className="stickyViewModal-body">
                    <div
                        className="stickyViewModal-content"
                        dangerouslySetInnerHTML={{
                            __html: note.content,
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default StickyViewModal;

