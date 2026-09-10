import React, { useState } from 'react';
import './sticky.scss';
import Sidebar from "../../components/sidebar/Sidebar";
import StickyNote from '../../components/StickyNote/StickyNote';
import StickyModal from '../../components/StickyModal/StickyModal';
import StickyViewModal from '../../components/StickyModal/StickyViewModal';
import AddIcon from '@mui/icons-material/Add';
import useStickyNotes from '../../hooks/useStickyNotes';


const Sticky = () => {
    const [viewingNote, setViewingNote] = useState(null);

    const {
        stickyNotes,
        loading,
        error,
        handleAddStickyNote,
        handleUpdateStickyNote,
        handleDeleteStickyNote,
    } = useStickyNotes();

    const [modalOpen, setModalOpen] = useState(false);
    const [editingNote, setEditingNote] = useState(null);

    const openAddModal = () => {
        setEditingNote(null);
        setModalOpen(true);
    };

    const openEditModal = (note) => {
        setEditingNote(note);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditingNote(null);
    };

    const openViewModal = (note) => {
        setViewingNote(note);
    };

    const closeViewModal = () => {
        setViewingNote(null);
    };

    const handleSubmit = async (data) => {
        try {
            if (editingNote) {
                await handleUpdateStickyNote(
                    editingNote.id,
                    data
                );
            } else {
                await handleAddStickyNote(data);
            }

            closeModal();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        if (
            window.confirm(
                "Are you sure you want to delete this sticky note?"
            )
        ) {
            try {
                await handleDeleteStickyNote(id);
            } catch (error) {
                console.error(error);
            }
        }
    };


    return (
        <div className="sticky">
            <Sidebar />
            <div className="stickyContainer">
                <p className="title">Sticky Wall</p>

                {loading && (
                    <p>Loading sticky notes...</p>
                )}

                {error && (
                    <p>{error}</p>
                )}

                {!loading && !error && (
                    <div className="row">
                        {stickyNotes.map((note) => (
                            <StickyNote
                                key={note.id}
                                title={note.title}
                                content={note.content}
                                color={note.color}
                                onEdit={() => openEditModal(note)}
                                onDelete={() => handleDelete(note.id)}
                                onView={() => openViewModal(note)}
                            />
                        ))}

                        <div
                            className="stickyNote addNote"
                            onClick={openAddModal}
                            style={{
                                cursor: "pointer",
                                backgroundColor: "lightgrey"
                            }}
                        >
                            <AddIcon className="icon" />
                        </div>
                    </div>
                )}
            </div>

            <StickyModal
                open={modalOpen}
                onClose={closeModal}
                onSubmit={handleSubmit}
                initialData={editingNote}
            />

            <StickyViewModal
                open={Boolean(viewingNote)}
                note={viewingNote}
                onClose={closeViewModal}
            />
        </div>
    );
};

export default Sticky;
