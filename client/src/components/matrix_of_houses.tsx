import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface BasicExampleProps {
  data: Data;
}

const BasicExample: React.FC<BasicExampleProps> = ({ data }) => {
  // Ahora puedes usar `data` dentro de este componente
  // Por ejemplo, puedes reemplazar "Card Title" con `data.ownerDni`
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img
        variant="top"
        src={data.images?.[0]}
        style={{ width: '286px', height: '160px', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title>{data.ownerDni}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};


interface Data {
  ownerDni: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  rentAmount: number;
  isAvailable: boolean;
  location: {
    latitude: number;
    longitude: number;
  };
  country: string;
  images?: string[];
}

interface MatrixOfCardsProps {
  dataArray: Data[];
}


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
