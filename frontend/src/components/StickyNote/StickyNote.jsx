import React from "react";
import "./stickyNote.scss";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const StickyNote = ({
    title,
    content,
    color,
    onEdit,
    onDelete,
    onView,
}) => {
    const handleEdit = (e) => {
        e.stopPropagation();
        onEdit();
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        onDelete();
    };

    return (
        <article
            className="stickyNote"
            style={{ backgroundColor: color }}
            onClick={onView}
        >
            <div className="stickyNote-header">
                <h3 className="stickyNote-title">
                    {title}
                </h3>

                <div className="stickyNote-icons">
                    <button
                        type="button"
                        className="stickyNote-action"
                        onClick={handleEdit}
                        aria-label="Edit note"
                        title="Edit"
                    >
                        <EditIcon />
                    </button>

                    <button
                        type="button"
                        className="stickyNote-action delete"
                        onClick={handleDelete}
                        aria-label="Delete note"
                        title="Delete"
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </div>

            <div className="stickyNote-body">
                <div
                    className="stickyNote-content"
                    dangerouslySetInnerHTML={{
                        __html: content,
                    }}
                />
            </div>
        </article>
    );
};

export default StickyNote;


