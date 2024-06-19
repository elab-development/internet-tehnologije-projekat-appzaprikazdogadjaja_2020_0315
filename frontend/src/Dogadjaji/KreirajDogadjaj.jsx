import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './KreirajDogadjaj.css';
import useKategorije from '../Kuke/useKategorije';
import useVenues from '../Kuke/useVenues';

const KreirajDogadjaj = () => {
    const { categories, loading: loadingCategories, error: errorCategories } = useKategorije();
    const { venues, loading: loadingVenues, error: errorVenues } = useVenues();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [venueId, setVenueId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [url, setUrl] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    useEffect(() => {
        if (isEditing) {
            const fetchEvent = async () => {
                const token = sessionStorage.getItem('access_token');
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/api/events/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    const event = response.data;
                    setTitle(event.title);
                    setDescription(event.description);
                    setStartDate(event.start_date);
                    setEndDate(event.end_date);
                    setVenueId(event.venue.id);
                    setCategoryId(event.category.id);
                    setUrl(event.url);
                    setImage(event.image);
                } catch (error) {
                    setError('Error fetching event data.');
                    console.error(error);
                }
            };
            fetchEvent();
        }
    }, [id, isEditing]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('access_token');

        const eventData = {
            title,
            description,
            start_date: startDate,
            end_date: endDate,
            venue_id: venueId,
            category_id: categoryId,
            source_id: 1,  // Default source ID
            url,
            image
        };

        try {
            if (isEditing) {
                await axios.put(`http://127.0.0.1:8000/api/events/${id}`, eventData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Event updated successfully');
            } else {
                await axios.post('http://127.0.0.1:8000/api/events', eventData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('Event created successfully');
            }
            navigate('/events');
        } catch (err) {
            setError('Error submitting event.');
            console.error(err);
        }
    };

    if (loadingCategories || loadingVenues) return <p>Loading data...</p>;
    if (errorCategories) return <p>Error loading categories: {errorCategories.message}</p>;
    if (errorVenues) return <p>Error loading venues: {errorVenues.message}</p>;

    return (
        <div className="create-event-page">
            <div className="create-event-container">
                <h2>{isEditing ? 'Edit Event' : 'Create Event'}</h2>
                {error && <p className="error">{error}</p>}
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
                    <button type="submit">{isEditing ? 'Update Event' : 'Create Event'}</button>
                </form>
            </div>
        </div>
    );
};

export default KreirajDogadjaj;
