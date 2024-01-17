import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

type PlaceCarouselProps = {
  images?: string[];
};

const PlaceCarousel: React.FC<PlaceCarouselProps> = ({ images }) => {
  return (
    <Carousel fade>
      {images &&
        images.map((imageUrl, index) => (
          <Carousel.Item key={index}>
            <div style={{ maxWidth: '100%', overflow: 'hidden' }}>
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

export default PlaceCarousel;
