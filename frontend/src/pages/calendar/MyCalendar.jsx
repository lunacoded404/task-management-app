import React from 'react';
import './calendar.scss';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Sidebar from '../../components/sidebar/Sidebar';

import {
    Calendar,
    dateFnsLocalizer,
} from 'react-big-calendar';

import {
    format,
    parse,
    getDay,
    startOfWeek,
} from 'date-fns';

import enUS from 'date-fns/locale/en-US';
import useCalendar from '../../hooks/useCalendar';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

const CalendarEvent = ({ event }) => {
    const task = event.resource;

    return (
        <div className="calendar-event-content">
            {task?.is_calendar_event && (
                <span className="calendar-event-emoji">
                    📌{' '}
                </span>
            )}

            <span className="calendar-event-title">
                {event.title}
            </span>
        </div>
    );
};

const MyCalendar = ({
    tags = [],
    onAddTag,
    onUpdateTag,
    onDeleteTag,
}) => {
    const {
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
    } = useCalendar();

    return (
        <div className="calendar">
            <Sidebar
                tags={tags}
                onAddTag={onAddTag}
                onUpdateTag={onUpdateTag}
                onDeleteTag={onDeleteTag}
            />

            <div className="mycalendar">
                <h1>Calendar</h1>

                {loading && (
                    <p>Loading calendar tasks...</p>
                )}

                {error && (
                    <p style={{ color: 'red' }}>
                        Error: {error}
                    </p>
                )}

                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    selectable
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    eventPropGetter={eventStyleGetter}
                    components={{ event: CalendarEvent }}
                    views={[
                        'month',
                        'week',
                        'day',
                        'agenda',
                    ]}
                    view={currentView}
                    onView={setCurrentView}
                    onNavigate={setDate}
                    date={date}
                />
                
            </div>

            {showAddModal && (
                <div
                    className="calendar-modal-overlay"
                    onClick={() => setShowAddModal(false)}
                >
                    <div
                        className="calendar-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h2>Add Event</h2>
                            <button
                                type="button"
                                onClick={() => setShowAddModal(false)}
                            >
                                ×
                            </button>
                        </div>

                        <form
                            onSubmit={handleCreateEvent}
                        >
                            <div className="form-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newEvent.title}
                                    onChange={handleEventChange}
                                    placeholder="Enter event title"
                                    autoFocus
                                />
                            </div>

                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={newEvent.description}
                                    onChange={handleEventChange}
                                    placeholder="Enter description"
                                    rows="4"
                                />
                            </div>

                            <div className="form-group">
                                <label>Due date</label>
                                <input
                                    type="date"
                                    name="due_date"
                                    value={newEvent.due_date}
                                    onChange={handleEventChange}
                                />
                            </div>

                            <div className="time-row">
                                <div className="form-group">
                                    <label>Start time</label>
                                    <input
                                        type="time"
                                        name="start_time"
                                        value={newEvent.start_time}
                                        onChange={handleEventChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>End time</label>
                                    <input
                                        type="time"
                                        name="end_time"
                                        value={newEvent.end_time}
                                        onChange={handleEventChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Event color</label>
                                <div className="color-picker">
                                    <input
                                        type="color"
                                        name="background_color"
                                        value={newEvent.background_color}
                                        onChange={handleEventChange}
                                    />
                                    <span>{newEvent.background_color}</span>
                                </div>
                            </div>

                            <div className="modal-actions">
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => setShowAddModal(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="save-btn"
                                >
                                    Add Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {selectedTask && (
                <div
                    className="calendar-modal-overlay"
                    onClick={closeTaskDetail}
                >
                    <div
                        className="calendar-modal task-detail-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h2>Task Details</h2>
                            <button
                                type="button"
                                onClick={closeTaskDetail}
                            >
                                ×
                            </button>
                        </div>

                        <div className="task-detail">
                            <div className="task-title">
                                <span
                                    className="task-color"
                                    style={{backgroundColor:selectedTask.background_color || '#7C3AED',
                                    }}
                                />
                                <h3>{selectedTask.title}</h3>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">Description</span>
                                <p>{selectedTask.description || 'No description'}</p>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">Due date</span>
                                <p>{selectedTask.due_date || 'Not specified'}</p>
                            </div>

                            <div className="detail-time-row">
                                <div className="detail-item">
                                    <span className="detail-label">Start time</span>
                                    <p>{selectedTask.start_time || 'All day'}</p>
                                </div>

                                <div className="detail-item">
                                    <span className="detail-label">End time</span>
                                    <p>{selectedTask.end_time || 'All day'}</p>
                                </div>
                            </div>

                            <div className="detail-item">
                                <span className="detail-label">Status</span>
                                <span
                                    className={selectedTask.is_completed ? 'status completed' : 'status pending'}
                                >
                                    {selectedTask.is_completed ? 'Completed' : 'Pending'}
                                </span>
                            </div>

                            {selectedTask.category && (
                                <div className="detail-item">
                                    <span className="detail-label">Category</span>
                                    <p>{selectedTask.category.name}</p>
                                </div>
                            )}
                        </div>

                        <div className="modal-actions">
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={closeTaskDetail}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyCalendar;