import React, { useState } from "react";
import useTasks from "../../hooks/useTasks";
import isDarkColor from "../../utils/IsDarkColor";
import TodayOutlinedIcon from "@mui/icons-material/TodayOutlined";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import New from "../NewModal/New";
import "./categorytasks.scss";

const CATEGORY_COLORS = {
    personal: "#1B2CC1",
    work: "#7692FF",
    order: "#ABD2FA",
};

const CategoryTasks = ({ category, tags = [] }) => {

    const [openTask, setOpenTask] = useState(null);
    const [showEditor, setShowEditor] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const {
        taskList,
        loading,
        error,
        filter,
        loadTasks,
        handleSaveTask,
        handleDeleteTask,
    } = useTasks("", category);

    const getCategoryColor = (category) => {
        return CATEGORY_COLORS[category?.name] || "#1B2CC1";
    };

    const toggleDetails = (id) => {
        setOpenTask(
            openTask === id
                ? null
                : id
        );
    };

    const handleOpenEdit = (e, task) => {
        e.stopPropagation();

        setEditingTask(task);
        setShowEditor(true);
    };

    const handleCloseEditor = () => {
        setShowEditor(false);
        setEditingTask(null);
    };

    const handleSave = async (taskData) => {
        try {

            const savedTask = await handleSaveTask(
                taskData,
                editingTask
            );

            if (savedTask) {
                handleCloseEditor();
            }

        } catch (err) {
            console.error(
                "Failed to save task in CategoryTasks:",
                err
            );
            handleCloseEditor();
            await loadTasks(filter);
        }
    };

    if (loading) {
        return (
            <div className="category-tasks">
                <p>Loading tasks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="category-tasks">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="category-tasks">

            {taskList.length === 0 ? (
                <p>No tasks in this category.</p>
            ) : (
                <ul className="task-list">
                    {taskList.map((task) => {

                        const totalSubCount = task.subtasks?.length || 0;
                        const completedSubCount = task.subtasks?.filter((sub) => sub.is_completed).length || 0;
                        const isOpen = openTask === task.id;
                        const backgroundColor = task.background_color || "#ffffff";
                        const isDark = isDarkColor(backgroundColor);
                        const taskTextColor = isDark ? "#ffffff" : "#0f172a";
                        const metaTextColor = isDark ? "rgba(255, 255, 255, 0.75)" : "#64748b";
                        const iconColor = isDark ? "rgba(255, 255, 255, 0.85)" : "#94a3b8";
                        const subtaskBg = isDark ? "rgba(255, 255, 255, 0.12)" : "#f8fafc";
                        
                        return (
                            <li
                                key={task.id}
                                className={`task-row ${
                                    task.is_completed
                                        ? "is-completed"
                                        : ""
                                }`}
                                style={{
                                    backgroundColor:backgroundColor,
                                    color:taskTextColor,
                                    boxShadow:isDark ? "0 2px 8px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0,0,0,0.04)",
                                }}
                            >
                                <div className="task-body">
                                    <div
                                        className="task-title-wrapper"
                                        onClick={() => toggleDetails(task.id)}
                                    >
                                        <span
                                            className="task-text"
                                            style={{
                                                color:taskTextColor,
                                                textDecoration:task.is_completed ? "line-through" : "none",
                                                opacity:task.is_completed ? 0.6 : 1,
                                            }}
                                        >
                                            {task.title}
                                        </span>
                                    </div>

                                    {isOpen && (
                                        <div
                                            className="details-expanded"
                                            onClick={(e) => e.stopPropagation()}
                                            style={{ borderTop:`1px solid ${isDark ? "rgba(255,255,255,0.2)" : "#f1f5f9"}` }}
                                        >
                                            {task.description && (
                                                <div
                                                    className="meta-des"
                                                    style={{
                                                        color:metaTextColor,
                                                        marginBottom:"6px",
                                                    }}
                                                >
                                                    <p
                                                        style={{ margin: 0, color:metaTextColor }}
                                                    >
                                                        {task.description}
                                                    </p>
                                                </div>
                                            )}

                                            <div
                                                className="meta-info"
                                                style={{ color:metaTextColor }}
                                            >
                                                <div className="meta-item">
                                                    <TodayOutlinedIcon
                                                        className="icon"
                                                        style={{ color:iconColor }}
                                                    />
                                                    <p
                                                        style={{ color:metaTextColor }}
                                                    >
                                                        {task.due_date}
                                                    </p>
                                                </div>

                                                <div className="meta-item">
                                                    <TaskAltIcon
                                                        className="icon"
                                                        style={{ color:iconColor }}
                                                    />
                                                    <span
                                                        style={{ color:metaTextColor }}
                                                    >
                                                        {completedSubCount}/
                                                        {totalSubCount}{" "}
                                                        Subtasks
                                                    </span>
                                                </div>

                                                {task.category && (
                                                    <div className="meta-item">
                                                        <span
                                                            className="category-dot"
                                                            style={{ backgroundColor:getCategoryColor(task.category) }}
                                                        />
                                                        <p style={{ color:metaTextColor }}>
                                                            {task.category?.name}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {totalSubCount > 0 ? (
                                                <div className="subtask-list-view">
                                                    {task.subtasks.map(
                                                        (sub) => (
                                                            <div
                                                                key={sub.id}
                                                                className={`subtask-item ${sub.is_completed ? "sub-done" : ""}`}
                                                                style={{
                                                                    backgroundColor:subtaskBg,
                                                                    color:taskTextColor,
                                                                }}
                                                            >
                                                                <span
                                                                    style={{
                                                                        color:taskTextColor,
                                                                        textDecoration:sub.is_completed ? "line-through" : "none",
                                                                        opacity:sub.is_completed ? 0.6 : 1,
                                                                    }}
                                                                >
                                                                    {sub.title}
                                                                </span>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            ) : (
                                                <p
                                                    className="no-subtasks"
                                                    style={{ color:metaTextColor }}
                                                >
                                                    No subtasks created
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="row-actions">
                                    <EditIcon
                                        className="edit-icon"
                                        onClick={(e) => handleOpenEdit(e, task)}
                                        titleAccess="Edit task"
                                        style={{ color:iconColor }}
                                    />
                                    <DeleteIcon
                                        className="delete-icon"
                                        titleAccess="Delete task"
                                        onClick={(e) => handleDeleteTask(e, task.id)
                                        }
                                    />
                                    <NavigateNextIcon
                                        className={`icon ${isOpen ? "rotate" : ""}`}
                                        onClick={() => toggleDetails(task.id)}
                                        style={{ color:iconColor }}
                                    />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            {showEditor && (
                <New
                    onClose={handleCloseEditor}
                    tags={tags}
                    taskToEdit={editingTask}
                    onSave={handleSave}
                    onDelete={handleDeleteTask}
                />
            )}
        </div>
    );
};

export default CategoryTasks;
