import React from 'react';
import './Dogadjaji.css';
import useDogadjaji from '../Kuke/useDogadjaji';
import Kartica from './Kartica';

const Dogadjaji = () => {
    const { events, loading, error } = useDogadjaji();

    if (loading) return <p>Loading events...</p>;
    if (error) return <p>Error loading events: {error.message}</p>;

    return (
        <div className="dogadjaji">
            <h2>Events</h2>
            <div className="events-list">
                 {events.map((event) => (
                    <Kartica key={event.id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default Dogadjaji;
