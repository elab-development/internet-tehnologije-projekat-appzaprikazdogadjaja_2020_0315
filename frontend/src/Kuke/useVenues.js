
import { useState, useEffect } from 'react';
import axios from 'axios';

const useVenues = () => {
    const [venues, setVenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVenues = async () => {
            const token = sessionStorage.getItem('access_token');
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/venues', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setVenues(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchVenues();
    }, []);

    return { venues, loading, error };
};

export default useVenues;
