import { useCallback, useEffect, useState } from "react";

import {
    getStickyNotes,
    createStickyNote,
    updateStickyNote,
    deleteStickyNote,
} from "../api/stickyNotes";


const useStickyNotes = () => {

    const [stickyNotes, setStickyNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const loadStickyNotes = useCallback(async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getStickyNotes();

            setStickyNotes(
                Array.isArray(data) ? data : []
            );

        } catch (err) {

            console.error(
                "Failed to load sticky notes:",
                err
            );

            setError(
                "Failed to load sticky notes."
            );

        } finally {

            setLoading(false);

        }

    }, []);


    useEffect(() => {
        loadStickyNotes();
    }, [loadStickyNotes]);


    const handleAddStickyNote = async (data) => {

        try {

            const newNote =
                await createStickyNote(data);

            setStickyNotes((prev) => [
                newNote,
                ...prev,
            ]);

            return newNote;

        } catch (err) {

            console.error(
                "Failed to create sticky note:",
                err
            );

            throw err;
        }
    };


    const handleUpdateStickyNote = async (
        id,
        data
    ) => {

        try {

            const updatedNote =
                await updateStickyNote(id, data);

            setStickyNotes((prev) =>
                prev.map((note) =>
                    note.id === id
                        ? updatedNote
                        : note
                )
            );

            return updatedNote;

        } catch (err) {

            console.error(
                "Failed to update sticky note:",
                err
            );

            throw err;
        }
    };


    const handleDeleteStickyNote = async (id) => {

        try {

            await deleteStickyNote(id);

            setStickyNotes((prev) =>
                prev.filter(
                    (note) => note.id !== id
                )
            );

        } catch (err) {

            console.error(
                "Failed to delete sticky note:",
                err
            );

            throw err;
        }
    };


    return {
        stickyNotes,
        loading,
        error,
        loadStickyNotes,
        handleAddStickyNote,
        handleUpdateStickyNote,
        handleDeleteStickyNote,
    };
};


export default useStickyNotes;