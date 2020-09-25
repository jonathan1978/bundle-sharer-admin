import React from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, Table } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../components/Common/Breadcrumb';
const Profile = () => {
    const role = localStorage.getItem('role');
    const displayName = localStorage.getItem('displayName');
    const department = localStorage.getItem('department');
    const email = localStorage.getItem('email');
    const username = localStorage.getItem('username');
    const mobile = localStorage.getItem('mobile');

        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumbs */}
                        <Breadcrumbs title="Profile" breadcrumbItem="Profile Details" />

                        <Row>
                            <Col xl="8">

                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4">Personal Information</CardTitle>

                                        <p className="text-muted mb-4">Hi, {username} Your personal details cannot be edited </p>
                                        <div className="table-responsive">
                                            <Table className="table-nowrap mb-0">
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">Role :</th>
                                                        <td>{role}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Full Name :</th>
                                                        <td>{displayName}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Department :</th>
                                                        <td>{department}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">E-mail :</th>
                                                        <td>{email}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Username :</th>
                                                        <td>{username}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Mobile :</th>
                                                        <td>{mobile}</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                    </Container>
                </div>
            </React.Fragment>
        );
}

export default Profile;