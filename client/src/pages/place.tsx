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

  return (
    <body>
      <header>
        <Header />
      </header>
      <main>
        <section style={{ backgroundColor: '#eee' }}>
          <MDBContainer className="py-5">
            <MDBRow>
              <MDBCol>
                <PlaceCarousel images={placeData?.images} />
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                      alt="avatar"
                      className="rounded-circle"
                      style={{ width: '150px' }}
                      fluid />
                    <p className="text-muted mb-1">Full Stack Developer</p>
                    <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                    <div className="d-flex justify-content-center mb-2">
                      <MDBBtn>Follow</MDBBtn>
                      <MDBBtn outline className="ms-1">Message</MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
    
                <MDBCard className="mb-4 mb-lg-0">
                  <MDBCardBody className="p-0">
                    <MDBListGroup flush className="rounded-3">
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fas icon="globe fa-lg text-warning" />
                        <MDBCardText>https://mdbootstrap.com</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="github fa-lg" style={{ color: '#333333' }} />
                        <MDBCardText>mdbootstrap</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="twitter fa-lg" style={{ color: '#55acee' }} />
                        <MDBCardText>@mdbootstrap</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="instagram fa-lg" style={{ color: '#ac2bac' }} />
                        <MDBCardText>mdbootstrap</MDBCardText>
                      </MDBListGroupItem>
                      <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                        <MDBIcon fab icon="facebook fa-lg" style={{ color: '#3b5998' }} />
                        <MDBCardText>mdbootstrap</MDBCardText>
                      </MDBListGroupItem>
                    </MDBListGroup>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="8">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText>{placeData ? placeData.address : 'Loading...'}</MDBCardText>
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
                  </MDBCardBody>
                </MDBCard>
    
                <MDBRow>
                  <MDBCol md="6">
                    <MDBCard className="mb-4 mb-md-0">
                      <MDBCardBody>
                        <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                        <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                        </MDBProgress>
    
                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                        </MDBProgress>
    
                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                        </MDBProgress>
    
                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                        </MDBProgress>
    
                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                        </MDBProgress>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
    
                  <MDBCol md="6">
                    <MDBCard className="mb-4 mb-md-0">
                      <MDBCardBody>
                        <MDBCardText className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</MDBCardText>
                        <MDBCardText className="mb-1" style={{ fontSize: '.77rem' }}>Web Design</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={80} valuemin={0} valuemax={100} />
                        </MDBProgress>
    
                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Website Markup</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={72} valuemin={0} valuemax={100} />
                        </MDBProgress>
    
                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>One Page</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={89} valuemin={0} valuemax={100} />
                        </MDBProgress>
    
                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Mobile Template</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={55} valuemin={0} valuemax={100} />
                        </MDBProgress>
    
                        <MDBCardText className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>Backend API</MDBCardText>
                        <MDBProgress className="rounded">
                          <MDBProgressBar width={66} valuemin={0} valuemax={100} />
                        </MDBProgress>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </body>
  );
}