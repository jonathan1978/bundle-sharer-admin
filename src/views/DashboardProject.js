import React, { Component } from "react";

import { Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

import ApexRadial from "./ApexRadial";

class DashboardProject extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <React.Fragment> <Card>
                <CardBody>
                    <CardTitle className="mb-4">
                        Yearly Projects
                    </CardTitle>
                    <Row>
                        <Col sm="6">
                            <p className="text-muted">This year</p>
                            <h3>4</h3>
                            <p className="text-muted"><span className="text-success mr-2"> 12% <i className="mdi mdi-arrow-up"></i> </span> From previous period</p>
                            <div className="mt-4">
                                <Link to="" className="btn btn-primary waves-effect waves-light btn-sm">View More <i className="mdi mdi-arrow-right ml-1"></i></Link>
                            </div>
                        </Col>
                        <Col sm="6">
                            <div className="mt-4 mt-sm-0">
                                <ApexRadial />
                            </div>
                        </Col>
                    </Row>
                    <p className="text-muted mt-4 mb-3">We provide automation solution for departments</p>
                </CardBody>
            </Card>
            </React.Fragment>
        );
    }
}

export default DashboardProject;