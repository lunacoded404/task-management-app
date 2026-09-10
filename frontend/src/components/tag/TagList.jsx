import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import './tagList.scss'

const PRESET_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const TagList = ({ tags = [], onUpdateTag, onDeleteTag }) => {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('');

  const handleStartEdit = (tag) => {
    setEditingId(tag.id);
    setEditName(tag.name);
    setEditColor(tag.background_color);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditColor('');
  };

  const handleSaveEdit = (id) => {
    if (!editName.trim()) return;
    onUpdateTag({
      id,
      name: editName.trim(),
      background_color: editColor,
    });
    handleCancelEdit();
  };

  return (
    <div className="tag-list-container">
      {tags.map((tag) => {
        const isEditing = editingId === tag.id;

        if (isEditing) {
          return (
            <div key={tag.id} className="tag-edit-box">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                autoFocus
              />
              <div className="color-dots">
                {PRESET_COLORS.map((c) => (
                  <span
                    key={c}
                    className={`dot ${editColor === c ? 'selected' : ''}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setEditColor(c)}
                  />
                ))}
              </div>
              <div className="actions">
                <CheckIcon className="btn-icon save" onClick={() => handleSaveEdit(tag.id)} />
                <CloseIcon className="btn-icon cancel" onClick={handleCancelEdit} />
              </div>
            </div>
          );
        }

        return (
          <div key={tag.id} className="tag-chip" style={{ backgroundColor: tag.background_color }}>
            <span className="tag-name">{tag.name}</span>
            <div className="tag-actions">
              <EditIcon className="action-icon" onClick={() => handleStartEdit(tag)} />
              <DeleteIcon className="action-icon" onClick={() => onDeleteTag(tag.id)} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TagList;