import { useEffect, useState } from "react";
import { getCategories } from "../api/categories";


const PRESET_BG_COLORS = [
    { hex: "#12544F" },
    { hex: "#FFCB56" },
    { hex: "#722F99" },
    { hex: "#3368A0" },
    { hex: "#8B2626" },
    { hex: "#F5788B" },
    { hex: "#EEEEEE" },
];

const useTaskForm = ({ taskToEdit, tags = [], defaultDueDate = "" }) => {

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState(defaultDueDate);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
    const [selectedTagIds, setSelectedTagIds] = useState([]);
    const [subtasks, setSubtasks] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(
                    Array.isArray(data)
                        ? data
                        : []
                );
            } catch (error) {
                console.error(
                    "Failed to load categories:",
                    error
                );
                setError(
                    "Failed to load categories."
                );
            }
        };
        loadCategories();
    }, []);

    useEffect(() => {
        if (taskToEdit) {
            setTitle(taskToEdit.title || "");
            setDescription(taskToEdit.description || "");
            setDueDate(taskToEdit.due_date || defaultDueDate);
            setStartTime(taskToEdit.start_time || "");
            setEndTime(taskToEdit.end_time || "");
            setBackgroundColor(taskToEdit.background_color || "#FFFFFF");

            if (taskToEdit.category) {
                const id =
                    typeof taskToEdit.category === "object" 
                                                ? taskToEdit.category.id 
                                                : taskToEdit.category;
                setCategoryId(String(id));
            } else {
                setCategoryId("");
            }
            setSelectedTagIds(
                (taskToEdit.tags || []).map(
                    (tag) =>
                        String(
                            typeof tag === "object"
                                        ? tag.id
                                        : tag
                        )
                )
            );

            setSubtasks(
                (taskToEdit.subtasks || []).map(
                    (sub) => ({
                        ...sub,
                        is_completed:
                            sub.is_completed ??
                            sub.completed ??
                            false,
                    })
                )
            );
        } else {
            setTitle("");
            setDescription("");
            setDueDate(defaultDueDate); 
            setCategoryId("");
            setStartTime("");
            setEndTime("");
            setBackgroundColor("#FFFFFF");
            setSelectedTagIds([]);
            setSubtasks([]);
        }
        setError("");
    }, [taskToEdit, defaultDueDate]);

    const handleTagChange = (e) => {
        const selectedIds =
            Array.from(
                e.target.selectedOptions,
                (option) => option.value
            );
        setSelectedTagIds(
            selectedIds
        );
    };

    const selectedTagNames =
        tags
            .filter((tag) =>
                selectedTagIds.includes(
                    String(tag.id)
                )
            )
            .map((tag) => tag.name)
            .join(", ");

    const handleSubtaskTitleChange = (id, newTitle) => {
        setSubtasks((prev) =>
            prev.map((sub) =>
                sub.id === id
                    ? {
                        ...sub,
                        title: newTitle,
                    }
                    : sub
            )
        );
    };

    const handleAddSubtask = () => {
        setSubtasks((prev) => [
            ...prev,
            {
                id: `new_${Date.now()}_${Math.random()
                    .toString(36)
                    .slice(2, 7)}`,
                title: "",
                is_completed: false,
            },
        ]);
    };

    const handleDeleteSubtask = (id) => {
        setSubtasks((prev) =>
            prev.filter(
                (sub) =>
                    sub.id !== id
            )
        );
    };

    const validateForm = () => {
        if (!title.trim()) {
            return "Task title is required.";
        }
        if (!dueDate) {
            return "Due date is required.";
        }
        if (
            (startTime && !endTime) ||
            (!startTime && endTime)
        ) {
            return (
                "Start time and end time " +
                "must be provided together."
            );
        }
        if (
            startTime &&
            endTime &&
            startTime >= endTime
        ) {
            return (
                "End time must be later " +
                "than start time."
            );
        }
        if (!categoryId) {
            return "Please select a category.";
        }
        return null;
    };

    const getValidSubtasks = () => {
        return subtasks
            .filter(
                (sub) =>
                    sub.title?.trim()
            )
            .map((sub) => {
                const result = {
                    title:
                        sub.title.trim(),

                    is_completed:
                        sub.is_completed ??
                        false,
                };
                if (
                    typeof sub.id === "number"
                ) {
                    result.id = sub.id;
                }
                return result;
            });
    };

    const buildTaskData = () => {
        return {
            title:title.trim(),
            description:description.trim(),
            category:Number(categoryId),
            due_date:dueDate,
            start_time:startTime || null,
            end_time:endTime || null,
            is_completed:taskToEdit?.is_completed ??false,
            background_color:backgroundColor,
            tags:selectedTagIds.map((id) => Number(id)),
            subtasks:getValidSubtasks(),
        };
    };

    const handleSubmit = (e) => {
        if (e && typeof e.preventDefault === "function") {
            e.preventDefault();
        }
        setError("");

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return null;
        }

        const taskData = buildTaskData();
        return taskData;
    };


    const handleBackgroundColorChange = (color) => {
        setBackgroundColor(color);
    };

    return {
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
        setError,
        loading,
        setLoading,

        buildTaskData,
        validateForm,
        getValidSubtasks,
        handleTagChange,
        handleSubtaskTitleChange,
        handleAddSubtask,
        handleDeleteSubtask,
        handleBackgroundColorChange,
        handleSubmit,

        PRESET_BG_COLORS,
    };
};

export default useTaskForm;