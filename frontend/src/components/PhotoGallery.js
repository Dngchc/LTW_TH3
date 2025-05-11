import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PhotoGallery = () => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get('/api/photos');
                setPhotos(response.data);
            } catch (error) {
                console.error('Error fetching photos:', error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <div className="photo-gallery">
            {photos.length > 0 ? (
                photos.map(photo => (
                    <div key={photo._id} className="photo-item">
                        <img src={photo.url} alt={photo.description} />
                        <p>{photo.description}</p>
                    </div>
                ))
            ) : (
                <p>No photos available</p>
            )}
        </div>
    );
};

export default PhotoGallery;