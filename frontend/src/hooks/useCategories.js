import { useCallback, useEffect, useState } from "react";
import { getCategories } from "../api/categories";

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadCategories = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getCategories();

            setCategories(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (err) {
            console.error(
                "Failed to load categories:",
                err
            );

            setError(
                "Failed to load categories."
            );

        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCategories();
    }, [loadCategories]);

    return {
        categories,
        loading,
        error,
        loadCategories,
    };
};

export default useCategories;