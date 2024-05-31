 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './KreirajDogadjaj.css';
import useKategorije from '../Kuke/useKategorije';
import useVenues from '../Kuke/useVenues';

const KreirajDogadjaj = () => {
    const { categories, loading: loadingCategories, error: errorCategories } = useKategorije();
    const { venues, loading: loadingVenues, error: errorVenues } = useVenues();
    const [title, setTitle] = useState('Sample Event Title');
    const [description, setDescription] = useState('Sample description for the event.');
    const [startDate, setStartDate] = useState('2023-05-01');
    const [endDate, setEndDate] = useState('2023-05-02');
    const [venueId, setVenueId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [url, setUrl] = useState('https://example.com/event');
    const [image, setImage] = useState('https://example.com/image.jpg');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('access_token');

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/events', {
                title,
                description,
                start_date: startDate,
                end_date: endDate,
                venue_id: venueId,
                category_id: categoryId,
                source_id: 1,  // Default source ID
                url,
                image
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('Event created successfully:', response.data);
            navigate('/events');
        } catch (err) {
            console.error('Error creating event:', err.response.data);
        }
    };

    if (loadingCategories || loadingVenues) return <p>Loading data...</p>;
    if (errorCategories) return <p>Error loading categories: {errorCategories.message}</p>;
    if (errorVenues) return <p>Error loading venues: {errorVenues.message}</p>;

    return (
        <div className="create-event-page">
            <div className="create-event-container">
                <h2>Create Event ()</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="endDate">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="venueId">Venue</label>
                        <select
                            id="venueId"
                            value={venueId}
                            onChange={(e) => setVenueId(e.target.value)}
                            required
                        >
                            <option value="">Select Venue</option>
                            {venues.map((venue) => (
                                <option key={venue.id} value={venue.id}>
                                    {venue.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="categoryId">Category</label>
                        <select
                            id="categoryId"
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="url">URL</label>
                        <input
                            type="url"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image URL</label>
                        <input
                            type="url"
                            id="image"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </div>
                    <button type="submit">Create Event</button>
                </form>
            </div>
        </div>
    );
};

export default KreirajDogadjaj;
