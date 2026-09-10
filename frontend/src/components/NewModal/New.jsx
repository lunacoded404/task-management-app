// src/components/NewModal/New.jsx
import React from 'react';
import useTaskForm from '../../hooks/useTaskForm';
import './new.scss';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const New = ({ 
  onClose, 
  tags = [], 
  taskToEdit, 
  onSave, 
  onDelete, 
  defaultDueDate = "", 
  dateLockMode = "", // 'today', 'tomorrow', 'week' hoặc ''
  minDate = "",
  maxDate = ""
}) => {
  const {
    categories,
    categoryId,
    title,
    description,
    dueDate,
    startTime,
    endTime,
    backgroundColor,
    selectedTagIds,
    selectedTagNames,
    subtasks,

    setCategoryId,
    setTitle,
    setDescription,
    setDueDate,
    setStartTime,
    setEndTime,

    error,
    loading,

    handleTagChange,
    handleSubtaskTitleChange,
    handleAddSubtask,
    handleDeleteSubtask,
    handleBackgroundColorChange,
    handleSubmit: validateAndBuildTask,
    PRESET_BG_COLORS,
  } = useTaskForm({
    taskToEdit,
    tags,
    defaultDueDate,
  });

  const handleSubmit = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();
    const taskData = await validateAndBuildTask(e);
    if (!taskData) return;
    if (onSave) await onSave(taskData);
  };

  const handleDelete = (e) => {
    if (taskToEdit && onDelete) {
      onDelete(e, taskToEdit.id);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>

        {error && (
          <p style={{ color: '#ef4444', marginBottom: '10px', fontSize: '14px' }}>
            {error}
          </p>
        )}

        <div className="new">
          <div className="top">
            <input
              type="text"
              placeholder="Enter a Task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br /> <br />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="center">
            <ul>
              <li>
                <p>Category</p>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id} style={{ textTransform: 'capitalize' }}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </li>

              <li>
                <p>Due Date</p>
                <input
                  type="date"
                  value={dueDate}
                  disabled={dateLockMode === 'today' || dateLockMode === 'tomorrow'}
                  min={dateLockMode === 'week' ? minDate : undefined}
                  max={dateLockMode === 'week' ? maxDate : undefined}
                  onChange={(e) => {
                    if (dateLockMode !== 'today' && dateLockMode !== 'tomorrow') {
                      setDueDate(e.target.value);
                    }
                  }}
                />
              </li>

              <li>
                <p>Start Time</p>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </li>

              <li>
                <p>End Time</p>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </li>

              <li>
                <p>Task Color</p>
                <div className="task-color-picker">
                  {PRESET_BG_COLORS.map((color) => (
                    <span
                      key={color.hex}
                      className={backgroundColor === color.hex ? "color-dot selected" : "color-dot"}
                      style={{
                        backgroundColor: color.hex,
                        width: "28px",
                        height: "28px",
                        display: "inline-block",
                        borderRadius: "50%",
                        cursor: "pointer",
                        border: backgroundColor === color.hex ? "3px solid #000" : "2px solid transparent",
                      }}
                      onClick={() => handleBackgroundColorChange(color.hex)}
                    />
                  ))}
                </div>
              </li>

              <li className="tag-list">
                <p>Tags</p>
                <div className="tags">
                  <select
                    multiple
                    value={selectedTagIds}
                    onChange={handleTagChange}
                    className="native-multi-select"
                  >
                    {tags && tags.length > 0 ? (
                      tags.map((tag) => (
                        <option key={tag.id} value={String(tag.id)}>
                          {tag.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>Chưa có thẻ nào từ cơ sở dữ liệu</option>
                    )}
                  </select>

                  <div className="select-tag-name">
                    <strong>Selected: </strong>
                    {selectedTagNames || 'None'}
                  </div>
                </div>
                <p className="note">
                  <strong>Note: </strong> You can select multiple tags by holding Ctrl (Cmd on Mac).
                </p>
              </li>
              
            </ul>

            <div className="subtasks-editor">
              <p className="sub-header">Subtasks ({subtasks.length}):</p>
              <div className="subtask-inputs">
                {subtasks.map((sub, index) => (
                  <div key={sub.id || `subtask-${index}`} className="subtask-input-row">
                    <input
                      type="text"
                      placeholder={`Subtask ${index + 1}`}
                      value={sub.title}
                      onChange={(e) => handleSubtaskTitleChange(sub.id, e.target.value)}
                    />
                    <CloseIcon
                      className="remove-subtask-btn"
                      onClick={() => handleDeleteSubtask(sub.id)}
                    />
                  </div>
                ))}
              </div>
              <button type="button" className="add-subtask-btn" onClick={handleAddSubtask}>
                <AddIcon className="icon" />
                <span>Add Subtask</span>
              </button>
            </div>
          </div>

          <div className="bottom">
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
            {taskToEdit && (
              <button type="button" className="delete" onClick={handleDelete}>
                Delete
              </button>
            )}
            <button type="button" className="save" onClick={handleSubmit} disabled={loading}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;