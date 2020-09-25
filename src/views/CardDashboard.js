import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { MDBIcon } from "mdbreact";
import { Row, Col, Card, CardBody, UncontrolledTooltip, Media, CardTitle, CardText, CardHeader } from "reactstrap";

class CardDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            modal_xlarge: false,
            row: [],
          };
          this.tog_xlarge = this.tog_xlarge.bind(this);
        }
        removeBodyCss() {
          document.body.classList.add("no_padding");
        }
        tog_xlarge() {
            this.setState(prevState => ({
              modal_xlarge: !prevState.modal_xlarge
            }));
            this.removeBodyCss();
          }

          show() {
            this.setState({ visible: true });
          }
          hide() {
            this.setState({ visible: false });
          }
          
    render() {
        return (
            <React.Fragment>
                <Col xl="4" sm="6">
                        <Card outline color="danger" className="border">
                            <CardBody>
                                <CardTitle className="mt-0">Total Valid Accounts</CardTitle>
                                <CardText>{this.props.validata[0]}</CardText>
                            </CardBody>
                            <CardBody>
                                <CardTitle className="mt-0">Total Non-Valid Accounts</CardTitle>
                                <CardText>{this.props.validata[1]}</CardText>
                            </CardBody>
                        </Card>
                    </Col>
                {
                    this.props.data.map((dashboardItem, key) =>
                        <Col xl="4" sm="6" key={"_project_" + key} >
                            <Card>
                                <CardBody>
                                    <Media>
                                    <div className="avatar-md mr-4">
                                            <span className="avatar-title rounded-circle bg-light text-danger font-size-16">
                                            {dashboardItem.key === 'accounts' ? <MDBIcon icon="user-circle" /> : <MDBIcon icon="address-card" />}
                                            </span>
                                        </div>

                                        <Media className="overflow-hidden" body>
                                            <h5 className="text-truncate font-size-15"><Link to="#" className="text-dark">{dashboardItem.key === 'accounts' ? 'Total Accounts' : 'Total Batches'}</Link></h5>
                                            <br></br> 
                                            <p className="text-muted mb-4">{dashboardItem.value}</p>
                                        </Media>
                                    </Media>
                                </CardBody>
                                <div className="px-4 py-3 border-top">
                                {dashboardItem.key === 'accounts' ? 
                                <Link
                                to="view-accounts"
                                style={{ cursor: "pointer", backgroundColor: "#e60000", color: "#ffffff" }}
                                className="btn mo-mb-2"
                            >
                                View Accounts
                                 </Link> 
                                 : 
                                 <Link
                                 to="batch-uploads"
                                 style={{ cursor: "pointer", backgroundColor: "#e60000", color: "#ffffff" }}
                                 className="btn mo-mb-2"
                             >
                                 View Batches
                                  </Link>}
                                
                                </div>
                            </Card>
                        </Col>
                        
                    )
                }
            </React.Fragment>
        );
    }
}

export default CardDashboard;