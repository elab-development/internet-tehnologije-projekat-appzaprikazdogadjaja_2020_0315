
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css';
import EventCard from './EventCard';
import CategoryCard from './CategoryCard';

const HomePage = () => {
    const [eventImages, setEventImages] = useState([]);
    const [categoryImages, setCategoryImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const eventKeywords = ['concert', 'art exhibition', 'sports event'];
            const categoryKeywords = ['music', 'art', 'sports'];

            const fetchEventImages = eventKeywords.map((keyword, index) =>
                axios.get(`https://picsum.photos/400/300?random=${index}`)
            );
            const fetchCategoryImages = categoryKeywords.map((keyword, index) =>
                axios.get(`https://picsum.photos/200/200?random=${index}`)
            );

            try {
                const eventResponses = await Promise.all(fetchEventImages);
                const categoryResponses = await Promise.all(fetchCategoryImages);

                setEventImages(eventResponses.map(response => response.request.responseURL));
                setCategoryImages(categoryResponses.map(response => response.request.responseURL));
            } catch (error) {
                console.error('Error fetching images from Lorem Picsum API', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="homepage">
            <header className="header">
                <h1>Welcome to Belgrade Events</h1>
                <p>Discover the best events happening in Belgrade</p>
            </header>
            <section className="events-highlight">
                <h2>Upcoming Events</h2>
                <div className="event-cards">
                    {eventImages.map((image, index) => (
                        <EventCard
                            key={index}
                            image={image}
                            title={`Event Title ${index + 1}`}
                            description="Event description goes here."
                        />
                    ))}
                </div>
            </section>
            <section className="categories">
                <h2>Categories</h2>
                <div className="category-cards">
                    {categoryImages.map((image, index) => (
                        <CategoryCard
                            key={index}
                            image={image}
                            title={['Music', 'Art', 'Sports'][index]}
                        />
                    ))}
                </div>
            </section>
            <footer className="footer">
                <p>© 2024 Belgrade Events. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;