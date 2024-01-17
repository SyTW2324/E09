import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import { Data, MatrixOfCardsProps, BasicExampleProps } from '../pages/interfaces/data_interfaces';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';import axios from 'axios';
import {url} from '../slices/api';
import { UserDocumentInterface } from './interfaces/user_interface';
import PlaceCarousel from '../components/carousel'; 
import backgroundimage from '../imgs/background.jpg';
import userImage from '../imgs/user.png';

export default function ProfilePlace() {
  const [user, setUser] = useState<UserDocumentInterface | null>(null);
  const { id } = useParams();
  const [placeData, setPlaceData] = useState<Data | null>(null);

  const fetchUser = async (ownerDNI: string) => {
    try {
      console.log("llamo al usuario")
      const response = await axios.get<UserDocumentInterface>(`${url}/users/${ownerDNI}`);
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchPlaceData = async () => {
    try {
      const response = await axios.get<Data>(`${url}/places/${id}`);

      // Actualizar el estado con los datos de la vivienda
      setPlaceData(response.data);

      // Llamar a fetchUser solo si ownerDNI está definido
      if (response.data.ownerDni) {
        await fetchUser(response.data.ownerDni);
      }
    } catch (error) {
      console.error('Error al obtener los datos de la vivienda:', error);
    }
  };

  useEffect(() => {
    // Llamar a la función de obtención de datos
    fetchPlaceData();
  }, [id]);

  console.log(placeData);

  const sectionStyle = {
    backgroundImage: `url(${backgroundimage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: '#ED8B01',
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <section style={sectionStyle} >
          <MDBContainer className="py-5">
            <MDBRow>
              <MDBCol>
                <MDBContainer className="bg-light rounded-3 p-3 mb-4">
                    <MDBCol>
                      <PlaceCarousel images={placeData?.images} />
                    </MDBCol>
                </MDBContainer>
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4 h-100">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src={userImage}
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: '150px' }}
                      fluid />
                    <p className="text-muted mb-1">{user?.name}</p>
                    <p className="text-muted mb-4">{user?.surname}</p>
                    <div className="d-flex justify-content-center mb-2">
                      <MDBBtn>Book</MDBBtn>
                      <a
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${user?.email}`}
                        className="btn btn-outline-secondary ms-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Message
                      </a>
                    </div>
                  </MDBCardBody>
                </MDBCard>
    
              </MDBCol>
              <MDBCol lg="8">
                <MDBCard className="mb-4 h-100">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText>{placeData?.country}, {placeData?.address} </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Owner email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{user ? user.email : 'Loading...'}</MDBCardText>                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Square meters</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{placeData?.squareFeet}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Bedroom/s</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{placeData?.bedrooms}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Bathroom/s</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{placeData?.bathrooms}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Price</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{placeData?.rentAmount}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}