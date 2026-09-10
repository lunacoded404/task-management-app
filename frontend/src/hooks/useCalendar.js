import { useMemo, useState } from 'react';
import {
    format,
    parse,
    isValid,
    addDays,
} from 'date-fns';

import useTasks from './useTasks';
import isDarkColor from '../utils/IsDarkColor';

const DEFAULT_EVENT = {
    title: '',
    description: '',
    due_date: '',
    start_time: '',
    end_time: '',
    background_color: '#7C3AED',
    is_calendar_event: true,
};

const parseTaskDate = (dateString, timeString = null) => {
    if (!dateString) {
        return new Date();
    }

    if (timeString) {
        const parsed = parse(
            `${dateString} ${timeString.slice(0, 5)}`,
            'yyyy-MM-dd HH:mm',
            new Date()
        );

        return isValid(parsed) ? parsed : new Date();
    }

    const parsed = parse(
        dateString,
        'yyyy-MM-dd',
        new Date()
    );

    return isValid(parsed) ? parsed : new Date();
};

const useCalendar = () => {
    const {
        taskList,
        loading,
        error,
        handleSaveTask,
    } = useTasks('');

    const [date, setDate] = useState(new Date());
    const [currentView, setCurrentView] = useState('month');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newEvent, setNewEvent] = useState(DEFAULT_EVENT);
    const [selectedTask, setSelectedTask] = useState(null);

    const events = useMemo(() => {
        return taskList.map((task) => {
            const hasTime =
                Boolean(task.start_time) &&
                Boolean(task.end_time);

            const start = parseTaskDate(
                task.due_date,
                hasTime ? task.start_time : null
            );

            const end = hasTime
                ? parseTaskDate(
                    task.due_date,
                    task.end_time
                )
                : addDays(start, 1);

            return {
                id: task.id,
                title: task.title,
                start,
                end,
                allDay: !hasTime,
                resource: task,
            };
        });
    }, [taskList]);

    const handleSelectSlot = ({ start }) => {
        setNewEvent({
            ...DEFAULT_EVENT,
            due_date: format(
                start,
                'yyyy-MM-dd'
            ),
        });
        setShowAddModal(true);
    };

    const handleEventChange = (e) => {
        const {
            name,
            value,
        } = e.target;

        setNewEvent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCreateEvent = async (e) => {
        e.preventDefault();

        try {
            const savedTask = await handleSaveTask(
                {
                    title: newEvent.title.trim(),
                    description: newEvent.description,
                    due_date: newEvent.due_date,
                    start_time: newEvent.start_time || null,
                    end_time: newEvent.end_time || null,
                    background_color: newEvent.background_color,
                    is_calendar_event: true,
                },
                null
            );

            if (savedTask) {
                setShowAddModal(false);
                setNewEvent(DEFAULT_EVENT);
            }
        } catch (err) {
            console.error(
                'Failed to create calendar event:',
                err
            );
        }
    };

    const handleSelectEvent = (event) => {
        setSelectedTask(event.resource);
    };

    const closeTaskDetail = () => {
        setSelectedTask(null);
    };

    const eventStyleGetter = (event) => {
        const task = event.resource;
        const backgroundColor = task?.background_color || '#7C3AED';
        const darkBackground = isDarkColor(backgroundColor);

        return {
            style: {
                backgroundColor,
                color: darkBackground ? '#FFFFFF' : '#111827',
                border: 'none',
                borderRadius: '8px',
                padding: '4px 8px',
                fontSize: '13px',
                fontWeight: 600,
                textAlign: "center",
                opacity:task?.is_completed ? 0.55 : 1,
                textDecoration:task?.is_completed ? 'line-through' : 'none',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.12)',
                overflow: 'hidden',
            },
        };
    };


    return {
        events,
        loading,
        error,
        date,
        setDate,
        currentView,
        setCurrentView,
        showAddModal,
        setShowAddModal,
        newEvent,
        handleEventChange,
        handleSelectSlot,
        handleCreateEvent,
        selectedTask,
        handleSelectEvent,
        closeTaskDetail,
        eventStyleGetter,
    };
};

export default useCalendar;