import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { Col, Card, CardBody, Media, Badge, Modal } from "reactstrap";
import axios from 'axios';

class CardBatch extends Component {
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

          handleRemove = (id) => {
            let config = {
              headers: { 
                'content-type': 'multipart/form-data', 
              },
              params: {
                id: id
              }
            }
      
            axios.patch('http://10.233.217.73:8777/project/change/status', config)
              .then((response) => {
                if (response.data === 1) {
                  alert("Updated Successfully");
                } else {
                    alert("Unable to delete Item");
                }
                
              }).catch((error) => {
                console.log(error);
              });
      
          } 

    render() {

        return (
            <React.Fragment>
                
                {
                    this.props.ongoing.map((complete) =>
                        <Col xl="4" sm="6">
                            <Card>
                                <CardBody>
                                    <Media>
                                        <div className="avatar-md mr-4">
                                            <span className="avatar-title rounded-circle bg-light text-danger font-size-16">
                                                <span>{complete.id}</span>
                                            </span>
                                        </div>

                                        <Media className="overflow-hidden" body>
                                            <h5 className="text-truncate font-size-15"><Link to="#" className="text-dark">Project Name:</Link></h5> 
                                            <p className="text-muted mb-4">{complete.projectName}</p>
                                            <p className="text-muted mb-4"><strong>Product Owner: </strong> {complete.productOwners}</p>
                                                      <button
                                                        type="button"
                                                        onClick={this.tog_xlarge}
                                                        className="btn waves-effect waves-light"
                                                        style={{backgroundColor: "#e60000", color: "#ffffff"}}
                                                        data-toggle="modal"
                                                        data-target=".bs-example-modal-lg"
                                                      >
                                                        Description
                                                      </button>

                                              <Modal
                                                  size="xl"
                                              isOpen={this.state.modal_xlarge}
                                              toggle={this.tog_xlarge}
                                            >
                                              <div className="modal-header">
                                                <h5
                                                  className="modal-title mt-0"
                                                  id="myLargeModalLabel"
                                                >
                                                  View Project Description
                                              </h5>
                                                <button
                                                  onClick={() =>
                                                    this.setState({ modal_xlarge: false })
                                                  }
                                                  type="button"
                                                  className="close"
                                                  data-dismiss="modal"
                                                  aria-label="Close"
                                                >
                                                  <span aria-hidden="true">&times;</span>
                                                </button>
                                              </div>
                                              <div className="modal-body">
                                              {complete.description}
                                              </div>
                                            </Modal>
                                        </Media>
                                    </Media>
                                </CardBody>
                                <div className="px-4 py-3 border-top">
                                    <ul className="list-inline mb-0">
                                    <li className="list-inline-item mr-3" id="dueDate">
                                    <i className="bx bx-calendar mr-1"></i>{complete.projectDate}
                                        </li>
                                        <li className="list-inline-item mr-3" id="dueDate">
                                            Status: <Badge className={"font-size-12 badge-soft-" + 'warning'} color={'warning'} pill>{complete.status}</Badge>
                                        </li>
                                    </ul>
                                </div>
                            </Card>
                        </Col>
                    )
                }

            </React.Fragment>
        );
    }
}

export default CardBatch;