// React is imported to define React components
import React from 'react';
// Carousel component from react-bootstrap library is imported
import Carousel from 'react-bootstrap/Carousel';

// Define the prop types for the PlaceCarousel component
type PlaceCarouselProps = {
  images?: string[];
};

// Functional component for a carousel of place images
const PlaceCarousel: React.FC<PlaceCarouselProps> = ({ images }) => {
  return (
    // Use the Carousel component from react-bootstrap with fade effect
    <Carousel fade>
      {/* Check if images array is provided */}
      {images &&
        // Map through the images array and create Carousel.Item for each image
        images.map((imageUrl, index) => (
          <Carousel.Item key={index}>
            {/* Set a container with max width and hidden overflow for the image */}
            <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
              {/* Display the image with responsive styling */}
              <img
                className="d-block w-100"
                src={imageUrl}
                alt={`Slide ${index + 1}`}
                style={{maxHeight: '400px', objectFit: 'cover'}}
              />
            </div>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

// Export the PlaceCarousel component
export default PlaceCarousel;
