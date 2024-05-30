import React from 'react';
import './Kartica.css';

const Kartica = ({ event }) => {
    return (
        <div className="event-card">
            {event.image && <img src={event.image} alt={event.title} />}
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            {event.venue.name !== 'Unknown Venue' && (
                <p><strong>Venue:</strong> {event.venue.name}</p>
            )}
            <p><strong>Category:</strong> {event.category.name}</p>
            <p><strong>Source:</strong> {event.source.name}</p>
            <p><strong>Start Date:</strong> {event.start_date}</p>
            <p><strong>End Date:</strong> {event.end_date}</p>
        </div>
    );
};

export default Kartica;
