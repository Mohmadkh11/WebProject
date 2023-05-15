import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';

function Profile() {
  return(
<div className="gradient-custom-2" style={{ backgroundColor: '#3333' }}>
  <MDBContainer className="py-5 h-100">
    <MDBRow className="justify-content-center align-items-center h-100">
      <MDBCol lg="10" xl="15">
      <MDBCard style={{maxWidth: '1200px', margin: '0 auto'}}>
          <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
            <div className="ms-4 mt-5 position-relative" style={{ width: '150px' }}>
              <MDBCardImage src="https://www.kindpng.com/picc/m/81-813378_giancarlo-esposito-breaking-bad-gus-fring-png-transparent.png"
                alt="Generic placeholder image" className="mt-2 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} />
                <MDBBtn outline color="dark" className="position-absolute bottom-0" style={{height: '40px', overflow: 'visible', zIndex: '2', backgroundColor: 'blue',color:'whitesmoke' ,marginLeft:'10px',marginTop:'10px'}}>
                  Edit
                </MDBBtn>
            </div>
            <div className="ms-3" style={{ marginTop: '100px' }}>
              <MDBTypography tag="h3">Gus Fring</MDBTypography>
              <MDBCardText>Mexico</MDBCardText>
            </div>
          </div>
          <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="d-flex justify-content-end text-center py-1">
            </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-6">
                <MDBCard className="mb-5">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Gus Fring</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">example@example.com</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Phone</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(097) 234-5678</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">(098) 765-4321</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">Bay Area, San Francisco, CA</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                </div>
                <MDBRow>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}

export default Profile