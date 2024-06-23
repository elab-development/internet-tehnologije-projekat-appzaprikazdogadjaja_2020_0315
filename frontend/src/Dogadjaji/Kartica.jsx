import React from 'react';
import axios from 'axios';
import './Kartica.css';

const Kartica = ({ event, onDelete, onEdit, viewMode }) => {
    const handleDelete = async () => {
        const token = sessionStorage.getItem('access_token');
        try {
            await axios.delete(`http://127.0.0.1:8000/api/events/${event.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            onDelete(event.id);
        } catch (err) {
            console.error('Error deleting event:', err);
        }
    };

    return (
        <div className={`event-card ${viewMode}`}>
            {event.image && <img src={event.image} alt={event.title} />}
            <div className="event-details">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                {event.venue.name !== 'Unknown Venue' && (
                    <p><strong>Venue:</strong> {event.venue.name}</p>
                )}
                <p><strong>Category:</strong> {event.category.name}</p>
                <p><strong>Source:</strong> {event.source.name}</p>
                <p><strong>Start Date:</strong> {event.start_date}</p>
                <p><strong>End Date:</strong> {event.end_date}</p>
                <button onClick={() => onEdit(event.id)} className="edit-button">Edit</button>
                <button onClick={handleDelete} className="delete-button">Delete</button>
            </div>
        </div>
    );
};

export default Kartica;
