import React, {useEffect, useState} from "react";
import { MDBDataTable, MDBBtn } from "mdbreact";
import { Link } from "react-router-dom";
import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Button, Table, UncontrolledTooltip, Badge, Modal, ModalHeader, ModalBody, ModalFooter,} from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from '../components/Common/Breadcrumb';
import "./datatables.scss";
import axios from "axios";
//SweetAlert
import SweetAlert from "react-bootstrap-sweetalert";
import Http from "../helpers/Http";
import { reloadPage } from '../helpers/helpers';



const PendingRequests = () => {
    const [row, setRow] = useState([]);
    const [modal, setModal] = useState(false);
    const [usModal, setUsModal] = useState(false);
    const [dataRow, setDataRow] = useState([]);
    const [usDataRow, setUsDataRow] = useState([])
    const [successMsg, setSuccessMsg] = useState(false);
    const [decision, setDecision] = useState("");
    const [customerId, setCustomerId] = useState();

    const handleInputChange = (event) => {
      setDecision(event.target.value);
    }

    const data = {
      columns: [
        {
          label: "Customer Number",
          field: "customerNumber",
          sort: "asc",
          width: 150
        },
        {
          label: "Customer Name",
          field: "customerName",
          sort: "asc", 
          width: 100
        },
        {
          label: "customer Address",
          field: "customerAddress",
          sort: "asc",
          width: 50
        },
        {
          label: "Customer Type",
          field: "customerType",
          sort: "asc",
          width: 270
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
          width: 150
        },
        {
          label: "Phone Number",
          field: "telephone",
          sort: "asc",
          width: 100
        },
        {
          label: "Business Certificate",
          field: "businessCertificate",
          sort: "asc",
          width: 100
        },
        {
          field: 'action',
          label: 'Action',
          width: 200
        }
      ],
      rows: row
    };

    const toggle = React.useCallback(
      (id) => setModal(!modal),
      [modal, setModal],

    );

    const usToggle = React.useCallback(
      (id) => setUsModal(!usModal),
      [usModal, setUsModal],

    );

    const token = localStorage.getItem('token');
    const hashPassword = localStorage.getItem('password');

    const handleActivate = (id) => {

      let formData = new FormData();

    formData.append('decision', 'approved');
    formData.append('customer', id);

    Http.patch('customer/approval', formData)
      .then((response) => {
        console.log(response);
        reloadPage();
      
      }).catch((error) => {
          console.log(error);
        });

    } 

    useEffect(() => {
      Http.get('customers/pending/approval')
        .then((response) => {
          let data = [];
          response.forEach(item => data.push({
            customerNumber: item.customerNumber,
            customerType: item.customerType,
            customerName: item.customerName,
            customerAddress: item.streetAddress,
            email: item.email,
            status: <Badge className={"font-size-12 badge-soft-" + item.status === 'ACTIVE' ? 'success' : 'danger'} color={item.status === 'ACTIVE' ? 'success' : 'warning'} pill>{item.status}</Badge>,
            telephone: item.telephone,
            businessCertificate: item.businessCertificate,
            action: <Button type="button" style={{backgroundColor: "#e60000", borderColor: "#e60000", color: "#ffffff"}} className="btn-sm btn-rounded" onClick={() => handleActivate(item.id)} >Activate</Button>
          }));
          console.log(data);
          setRow(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    return (
      <React.Fragment>
        <div className="page-content">
          <div className="container-fluid">

            <Breadcrumbs title="Requests" breadcrumbItem="View Pending Requests" />

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <CardTitle>View All Pending Requests </CardTitle>
                    <CardSubtitle className="mb-3">
                      View All Pending Customer Requests{" "}
                  </CardSubtitle>

                    <MDBDataTable responsive striped bordered data={data} exportToCSV/>

                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </div>

        {successMsg ? (
											<SweetAlert
												title="Good job!"
												success
												showCancel
												confirmBtnBsStyle="success"
												cancelBtnBsStyle="danger"
												onConfirm={() => window.location.reload(true)}
												onCancel={() => setSuccessMsg(false)}
											>
												You clicked the button!
											</SweetAlert>
										) : null}

<Modal isOpen={modal} role="dialog" autoFocus={true} centered={true} className="exampleModal" tabindex="-1" toggle={toggle}>
                    <div className="modal-content">
                        <ModalHeader toggle={toggle}>
                            Enter Decision for Customer
                            </ModalHeader >
                        <ModalBody>

                            <div className="table-responsive">
                            <div className="form-group row">
                                                <label htmlFor="example-text-input" className="col-md-2 col-form-label">Decision</label>
                                                <div className="col-md-8">
                                                    <input className="form-control" onChange={handleInputChange} name="decision" type="text" placeholder="Decision" />
                                                </div>
                                            </div>
                            
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="primary" onClick={handleActivate}>Activate</Button>
                            <Button type="button" color="secondary" onClick={toggle}>Close</Button>
                        </ModalFooter>
                    </div>
                </Modal>
      </React.Fragment>
    );
  }

export default PendingRequests;
