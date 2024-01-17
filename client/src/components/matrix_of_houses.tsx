// Import React and necessary Bootstrap components
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

// Import useNavigate hook from react-router-dom and data interfaces
import { useNavigate } from 'react-router-dom';
import { Data, MatrixOfCardsProps, BasicExampleProps } from '../pages/interfaces/data_interfaces';

// Functional component for individual place card
const BasicExample: React.FC<BasicExampleProps> = ({ data }) => {
  // Use the useNavigate hook for navigation
  const navigate = useNavigate();

  // Event handler for 'More Info' button click, navigates to detailed place page
  const handleMoreInfoClick = () => {
    navigate(`/place/${data._id}`);
  };

  // Return a Bootstrap Card component displaying place information
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src={data.images?.[0]}
        style={{ width: '286px', height: '160px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title>{data.address}</Card.Title>
        <Card.Title>{data.rentAmount}$</Card.Title>
        <Card.Text>
          {data.country}, {data.squareFeet} square meters,
          {data.bedrooms} bedrooms, {data.bathrooms} bathrooms
        </Card.Text>
        <Button variant="primary" onClick={handleMoreInfoClick}>
          More info
        </Button>
      </Card.Body>
    </Card>
  );
};

// Functional component for a matrix of place cards
const MatrixOfCards: React.FC<MatrixOfCardsProps> = ({ dataArray }) => {
  // Function to render a matrix of cards with a maximum of 4 columns
  const renderMatrix = () => {
    const matrix: Data[][] = [];
    const maxCols = 4;

    for (let i = 0; i < dataArray.length; i += maxCols) {
      const row = dataArray.slice(i, i + maxCols);
      matrix.push(row);
    }

    return matrix.map((row, rowIndex) => (
      <div key={rowIndex} className="card-row">
        {row.map((data, colIndex) => (
          <div key={colIndex} className="card-col">
            {/* Embed BasicExample component with place data */}
            <BasicExample data={data} />
          </div>
        ))}
      </div>
    ));
  };

  // Return a div containing the matrix of place cards
  return <div className="card-matrix">{renderMatrix()}</div>;
}

// Export the MatrixOfCards component
export default MatrixOfCards;
