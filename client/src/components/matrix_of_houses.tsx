import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { Data, MatrixOfCardsProps, BasicExampleProps } from '../pages/interfaces/data_interfaces';

const BasicExample: React.FC<BasicExampleProps> = ({ data }) => {
  const navigate = useNavigate();

  const handleMoreInfoClick = () => {
    navigate(`/place/${data._id}`);
  };

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
          {data.country}, {data.squareFeet} square meters
          , {data.bedrooms} bedrooms, {data.bathrooms} bathrooms
        </Card.Text>
        <Button variant="primary" onClick={handleMoreInfoClick}>
          More info
        </Button>
      </Card.Body>
    </Card>
  );
};




const MatrixOfCards: React.FC<MatrixOfCardsProps> = ({ dataArray }) => {
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
            <BasicExample data={data} />
          </div>
        ))}
      </div>
    ));
  };

  return <div className="card-matrix">{renderMatrix()}</div>;
}

export default MatrixOfCards;
