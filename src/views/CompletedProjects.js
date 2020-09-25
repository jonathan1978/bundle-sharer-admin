import React, { Component } from 'react';
import { Container, Row, Col, Pagination, PaginationItem, PaginationLink, Badge, Button, UncontrolledTooltip } from "reactstrap";
import axios from 'axios';
import { Link } from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from '../components/Common/Breadcrumb';

import img1 from "../assets/images/companies/img-1.png";
import avatar2 from "../assets/images/users/avatar-2.jpg";

//Import Cards
import CardCompleted from "./CardCompleted";

class CompletedProjects extends Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: [],
            row: [],
            dataRow: [],
            visible: false,
            modal_standard: false,
            success_message: '',
        }
        this.tog_standard = this.tog_standard.bind(this);
    }

    tog_standard() {
        this.setState(prevState => ({
          modal_standard: !prevState.modal_standard
        }));
        this.removeBodyCss();
      }

      removeBodyCss() {
        document.body.classList.add("no_padding");
      } 

    componentDidMount() {
        let data = [];

    const config = {
      headers: { 
        'content-type': 'multipart/form-data'
      },
    };

    axios
      .get(
        'http://10.233.217.73:9090/project/completed',
        config
      )
      .then((response) => {
        this.setState({ completed: response.data})
      })
      .catch((error) => {
        console.log(error);
      });
      }

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                        {/* Render Breadcrumbs */}
                        <Breadcrumbs title="Project" breadcrumbItem="Project Completed" />

                        <Row>
                            {/* Import Cards */}
                            <CardCompleted completed={this.state.completed}/>
                        </Row>

                        <Row>
                            <Col lg="12">
                                <Pagination className="pagination pagination-rounded justify-content-center mt-2 mb-5">
                                    <PaginationItem disabled>
                                        <PaginationLink previous href="#" />
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">
                                            1
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem active>
                                        <PaginationLink href="#">
                                            2
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">
                                            3
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">
                                            4
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink href="#">
                                            5
                                        </PaginationLink>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink next href="#" />
                                    </PaginationItem>
                                </Pagination>
                            </Col>
                        </Row>

                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default CompletedProjects;