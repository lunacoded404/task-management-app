// pages/category/CategoryPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import './categorypage.scss';
import CategoryTasks from '../../components/CategoryTasks/CategoryTasks';
import Sidebar from '../../components/sidebar/Sidebar';

const CategoryPage = ({ tags, onAddTag, onUpdateTag, onDeleteTag }) => {
    const { category } = useParams();

    return (
        <div className="category-page">
            <Sidebar 
                tags={tags}
                onAddTag={onAddTag}
                onUpdateTag={onUpdateTag}
                onDeleteTag={onDeleteTag}
            />
            <div className="categoryContainer">
                <div className="category-title">
                    <p>
                        {category
                            ? category.charAt(0).toUpperCase() + category.slice(1)
                            : "Category"}
                    </p>
                </div>
                <CategoryTasks category={category} />
            </div>
        </div>
    );
};

export default CategoryPage;