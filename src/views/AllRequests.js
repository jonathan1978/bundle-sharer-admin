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



const AllRequests = () => {
    const [row, setRow] = useState([]);
    const [modal, setModal] = useState(false);
    const [usModal, setUsModal] = useState(false);
    const [dataRow, setDataRow] = useState([]);
    const [usDataRow, setUsDataRow] = useState([])
    const [successMsg, setSuccessMsg] = useState(false);
    const [customerId, setCustomerId] = useState("");
    const [billingAccount, setBillingAccount] = useState("");
    const [billingAccounts, setBillingAccounts] = useState([]);

    const [state, setState] = React.useState({
      account: "",
      email: "",
      name: "",
      telephone: "",
      username: ""
    })

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
          field: 'account',
          label: 'Add Account',
          width: 200
        },
        {
          field: 'contact',
          label: 'Add Contact',
          width: 200
        }
      ],
      rows: row
    };

    function handleChange(evt) {
      const value = evt.target.value;
      setState({
        ...state,
        [evt.target.name]: value
      });
    }

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

    const handleBillingAccountChange = (event) => {
      setBillingAccount(event.target.value);
    }

    const handleAddBillingAccountModal = (id) => {
      setCustomerId(id);
      toggle();
    }

    const handleAddBillingAccount = () => {

      let formData = new FormData();

    formData.append('id', customerId);
    formData.append('billingAccount', billingAccount);

    Http.post('billingaccount', formData)
      .then((response) => {
        if(response.code === 1) {
          console.log(response);
          alert(response);
        } else{
          alert(response);
        }
        
      
      }).catch((error) => {
          console.log(error);
        });

    } 

    const handleAddContactPerson = (id) => {

      Http.get('customer/billing/accounts', {
        params: {
          customerId: id
        }})
        .then((response) => {
          setBillingAccounts(['Please Select...' , ...response]);
          console.log(billingAccounts);
          setCustomerId(id);
          usToggle();
        
        }).catch((error) => {
          console.log(error);
        });
        
    }

    const submitContactPerson = (event) => {

      try {

        const obj = {
          billingAccount: state.account,
          customerId: customerId,
          email: state.email,
          name: state.name,
          telephone: state.telephone,
          username: state.username,
        };
    
    Http.post('contactperson', obj)
      .then((response) => {
        console.log(response);
        if (response.code === 1) {
          alert(response.message);
        }else {
          console.log(response.message);
        }
        
      })
      .catch((error) => {
          console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  event.preventDefault();
    }

    useEffect(() => {
      Promise.all([
        Http.get('customers'),
      ])
      .then(([result1]) => {
          let data = [];
          result1.forEach(item => data.push({
            customerNumber: item.customerNumber,
            customerType: item.customerType,
            customerName: item.customerName,
            customerAddress: item.streetAddress,
            email: item.email,
            status: <Badge className={"font-size-12 badge-soft-" + item.status === 'approved' ? 'success' : 'warning'} color={item.status === 'approved' ? 'success' : 'warning'} pill>{item.status}</Badge>,
            telephone: item.telephone,
            businessCertificate: item.businessCertificate,
            account: <Button type="button" style={{backgroundColor: "#e60000", borderColor: "#e60000", color: "#ffffff"}} className="btn-sm btn-rounded" onClick={() => handleAddBillingAccountModal(item.id)} >Add Account</Button>,
            contact: <Button type="button" style={{ color: "#ffffff"}} className="btn-sm btn-rounded" onClick={() => handleAddContactPerson(item.id)} >Add Contact</Button>
          }));
          console.log('data: ' + data);
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

            <Breadcrumbs title="Requests" breadcrumbItem="View All Requests" />

            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <CardTitle>View All Requests </CardTitle>
                    <CardSubtitle className="mb-3">
                      View All Customer Requests{" "}
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
                            Add Billing Account
                            </ModalHeader >
                        <ModalBody>

                            <div className="table-responsive">
                            <Table className="table-nowrap mb-0">
                            <div className="form-group row">
                                <label htmlFor="example-text-input" className="col-md-2 col-form-label">Billing Account </label>
                                    <div className="col-md-10">
                                        <input className="form-control" name="billingAccount" onChange={handleBillingAccountChange} type="text" placeholder="Billing Account" />
                                    </div>
                                </div>
                              </Table>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button type="button" color="primary" onClick={handleAddBillingAccount}>Add Account</Button>
                            <Button type="button" color="secondary" onClick={toggle}>Close</Button>
                        </ModalFooter>
                    </div>
                </Modal>
                <Modal size="xl" isOpen={usModal} role="dialog" autoFocus={true} centered={true} className="exampleModal" tabindex="-1" toggle={usToggle}>
                    <div className="modal-content">
                        <ModalHeader toggle={usToggle}>
                            Add Contact Person
                            </ModalHeader >
                        <ModalBody>
                        <div className="form-group row">
                          <label className="col-md-2 col-form-label">Billing Account</label>
                          <div className="col-md-10">
                              <select className="form-control" name="account" onChange={handleChange}>
                              {billingAccounts.map(account => (
                                  <option key={account} value={account}>
                                    {account}
                                  </option>
                                ))}
                              </select>
                          </div>
                          </div>
                        <div className="form-group row">
                          <label htmlFor="example-text-input" className="col-md-2 col-form-label">Contact Name</label>
                              <div className="col-md-10">
                                  <input className="form-control" onChange={handleChange} name="name" type="text" placeholder="Contact Name" />
                              </div>
                          </div>
                          <div className="form-group row">
                          <label htmlFor="example-text-input" className="col-md-2 col-form-label">Email</label>
                              <div className="col-md-10">
                                  <input className="form-control" onChange={handleChange} name="email" type="text" placeholder="Email" />
                              </div>
                          </div>
                          <div className="form-group row">
                          <label htmlFor="example-text-input" className="col-md-2 col-form-label">Telephone</label>
                              <div className="col-md-10">
                                  <input className="form-control" name="telephone" onChange={handleChange} type="text" placeholder="Telephone" />
                              </div>
                          </div>
                          <div className="form-group row">
                              <label htmlFor="example-date-input" className="col-md-2 col-form-label">Username</label>
                              <div className="col-md-10">
                                  <input className="form-control" name="username" onChange={handleChange} type="text" placeholder="Username" />
                              </div>
                          </div>
                        </ModalBody>
                        <ModalFooter>
                        <Button type="button" color="primary" onClick={submitContactPerson}>Add Account</Button>
                            <Button type="button" color="secondary" onClick={usToggle}>Close</Button>
                        </ModalFooter>
                    </div>
                </Modal>
      </React.Fragment>
    );
  }

export default AllRequests;
