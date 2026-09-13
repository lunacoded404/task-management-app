import { useState, useEffect } from 'react';
import { getTags, createTag, updateTag, deleteTag } from '../api/tags';
import { auth } from '../firebase/config';

const useTags = () => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          setLoading(true);
          const data = await getTags();
          setTags(Array.isArray(data) ? data : []);
        } catch (err) {
          setError(err.message);
          console.error("Lỗi khi tải tags:", err);
        } finally {
          setLoading(false);
        }
      } else {
        setTags([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddTag = async (newTagData) => {
    try {
      const createdTag = await createTag(newTagData);
      setTags((prev) => [...prev, createdTag]);
    } catch (err) {
      console.error("Lỗi khi thêm tag:", err);
    }
  };

  const handleUpdateTag = async (updatedTagData) => {
    try {
      const updatedTag = await updateTag(updatedTagData.id, updatedTagData);
      setTags((prev) =>
        prev.map((tag) => (tag.id === updatedTag.id ? updatedTag : tag))
      );
    } catch (err) {
      console.error("Lỗi khi cập nhật tag:", err);
    }
  };

  const handleDeleteTag = async (tagId) => {
    try {
      await deleteTag(tagId);
      setTags((prev) => prev.filter((tag) => tag.id !== tagId));
    } catch (err) {
      console.error("Lỗi khi xóa tag:", err);
    }
  };

  return {
    tags,
    loading,
    error,
    handleAddTag,
    handleUpdateTag,
    handleDeleteTag,
  };
};

export default useTags;