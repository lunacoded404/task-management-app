import { useState, useEffect, useCallback } from 'react';
import { getViewSetting, updateViewSetting } from '../api/viewSettings';

const useViewSetting = (viewName = 'today', defaultColor = '#FCFCFC') => {
  const [bgColor, setBgColor] = useState(defaultColor);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchSetting = async () => {
      try {
        setLoading(true);
        const data = await getViewSetting(viewName);
        if (isMounted && data && data.background_color) {
          setBgColor(data.background_color);
        }
      } catch (err) {
        console.warn(`Lỗi lấy màu cho ${viewName}:`, err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSetting();
    return () => {
      isMounted = false;
    };
  }, [viewName]);

  const changeBgColor = useCallback(
    async (hexColor) => {
      setBgColor(hexColor); 
      try {
        await updateViewSetting(viewName, hexColor); 
      } catch (err) {
        console.error(`Lỗi cập nhật màu cho ${viewName} vào PostgreSQL:`, err);
      }
    },
    [viewName]
  );

  return {
    bgColor,
    changeBgColor,
    loading,
  };
};

export default useViewSetting;