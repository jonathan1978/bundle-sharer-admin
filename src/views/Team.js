import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../components/Common/Breadcrumb';

//Import Card
import TeamCard from "./TeamCard";

class ContactsGrid extends Component {
    state = {
        users: [
            {
                id: 1, img: "Null", name: "Victoria Aidoo", designation: "Digital Transformation", color: "primary",
                skills: [
                    { name: "Management" }
                ]
            },
            {
                id: 2, img: "Null", name: "Nicholas Arkaah", designation: "Application Developer Specialist",
                skills: [
                    { name: "Java" },
                    { name: "Python" },
                    { name: "React" },
                ]
            },
            {
                id: 3, img: "Null", name: "Dot", designation: "Scrum Master",
                skills: [
                    { name: "Agile" },
                    { name: "Java" }
                ]
            },
            {
                id: 4, img: "Null", name: "James Armah", designation: "Scrum Lead", color: "success",
                skills: [
                    { name: "Agile" },
                    { name: "React" },
                ]
            },
            {
                id: 5, img: "Null", name: "Bryan Laryea", designation: "Application Developer",
                skills: [
                    { name: "Java" },
                    { name: "Python" },
                    { name: "Angular" },
                ]
            },
            {
                id: 6, img: "Null", name: "John Tanko", designation: "Application Developer",
                skills: [
                    { name: "Java" },
                    { name: "React" }
                ]
            },
            {
                id: 7, img: "Null", name: "Jonathan Lawerh", designation: "Application Developer", color: "info",
                skills: [
                    { name: "Java" },
                    { name: "React" },
                    { name: "Python" },
                ]
            },
            {
                id: 8, img: "Null", name: "Seidu Bashiru", designation: "Scrum Lead", color: "",
                skills: [
                    { name: "Agile" },
                ]
            },
        ]
    }
    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumbs */}
                        <Breadcrumbs title="Team" breadcrumbItem="Team Details" />

                        <Row>
                            {
                                this.state.users.map((user, key) =>
                                    <TeamCard user={user} key={"_user_" + key} />
                                )
                            }

                        </Row>

                        <Row>
                            <Col xs="12">
                                <div className="text-center my-3">
                                    <Link to="#" className="text-success"><i className="bx bx-hourglass bx-spin mr-2"></i> Load more </Link>
                                </div>
                            </Col>
                        </Row>

                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default ContactsGrid;