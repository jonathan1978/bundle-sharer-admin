import React, { Component } from "react";

import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import profileImg from "../assets/images/profile-img.png";

class WelcomeComp extends Component {
    constructor(props) {
        super(props);
        this.state = {complete: 0, ongoing: 0};
    }

    render() {
        return (
            <React.Fragment>
                <Card className="overflow-hidden">
                    <div className="bg-soft-primary">
                        <Row>
                            <Col xs="7">
                                <div className="text-primary p-3">
                                    <h5 className="text-primary">Welcome Back !</h5>
                                    <p>Vodafone RPA Hub</p>
                                </div>
                            </Col>
                            <Col xs="5" className="align-self-end">
                            <img src={profileImg} alt="" className="img-fluid" /> 
                            </Col>
                        </Row>
                    </div>
                    <CardBody className="pt-0">
                        <Row>
                        <Col sm="12">
                                <div className="pt-4">
                                    <Row>
                                    {
                    this.props.welcomeData.map((dashboardItem, key) =>
                                        <Col xs="4" key={key}>
                                            <h5 className="font-size-15">{dashboardItem.value}</h5>
                                            <p className="text-muted mb-0">{dashboardItem.key}</p>
                                        </Col>
                                        )}
                                    </Row>
                                    <div className="mt-4">
                                        <Link to="" className="btn btn-primary waves-effect waves-light btn-sm">View Project <i className="mdi mdi-arrow-right ml-1"></i></Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </React.Fragment>
        );
    }
}

export default WelcomeComp;