import React, { useState, useEffect } from 'react'
import './home.scss';
import Sidebar from '../../components/sidebar/Sidebar'
import Today from '../../components/today/Today';
import Tomorrow from '../../components/tomorrow/Tomorrow';
import Week from '../../components/week/Week';
import { getTasks } from '../../api/tasks';
import { useSearchParams } from "react-router-dom";


const Home = ({ tags, onAddTag, onUpdateTag, onDeleteTag }) => {

  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "";

  const [upcomingCount, setUpcomingCount] = useState(0);

  useEffect(() => {
    const fetchUpcomingCount = async () => {
      try {
        const data = await getTasks('?status=active');
        if (Array.isArray(data)) {
          setUpcomingCount(data.length);
        }
      } catch (error) {
        console.error('Failed to fetch upcoming task count:', error);
      }
    };

    fetchUpcomingCount();
  }, []);

  return (
    <div className='home'>
      <Sidebar 
        tags={tags}
        onAddTag={onAddTag}
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
      />
      <div className="homeContainer">
        <div className="upcoming-title">
          <p>Upcoming</p>
          <span>{upcomingCount}</span>
        </div>

        <div className="home-top">
          <Today tags={tags}/>
        </div>
        <div className="home-bottom">
          <div className="home-left">
            <Tomorrow tags={tags}/>
          </div>
          <div className="home-right">
            <Week tags={tags}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
