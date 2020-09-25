import React, { Component } from "react";
import { Card, CardBody, Col, Row, CardTitle, CardSubtitle,Container, Form } from "reactstrap";
import Axios from "axios";
import ProgressLoader from "../components/ProgressLoader/ProgressLoader";
import { UncontrolledAlert } from "reactstrap";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import Http from "../helpers/Http";

//Import Breadcrumb
import Breadcrumbs from '../components/Common/Breadcrumb';

class AddUser extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            selectedFiles: [], selectedFile: '',
            loading: false, 
            alert: false, 
            message: '', 
            code: 0,
            customchk: true, 
            toggleSwitch: true,
            customerName: "",
            businessCertificate: "",
            sector: "",
            customerAddress: "",
            streetAddress: "",
            customerType: "",
            accountManager: "",
            alternativeContact: "",
            name: "",
            email: "",
            telephone: ""
         };
         this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
         this.handleInputChange = this.handleInputChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAcceptedFiles = files => {
        files.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
            formattedSize: this.formatBytes(file.size)
          }),
        );
    
        this.setState({selectedFile: files[0]})
        this.setState({ selectedFiles: files });
      };

    config = {
        headers: { 
          'content-type': 'multipart/form-data', 
        },
      };

    contactData = [];

    handleSubmit(event) {
        //console.log(this.state.customerType);

        try {

              const obj = {
                customerName: this.state.customerName,
                businessCertificate: this.state.businessCertificate,
                sector: this.state.sector,
                customerAddress: this.state.customerAddress,
                streetAddress: this.state.streetAddress,
                customerType: this.state.customerType,
                accountManager: this.state.accountManager,
                alternativeContact: this.state.alternativeContact
              };
          
          Http.post('new/customer', obj)
            .then((response) => {
              console.log(response);
              if (response.code === 1) {
                this.setState({
                  loading: false, 
                  alert: true, 
                  message: response.message, 
                  alertColor: 'success'
                });
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

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
      }

      /**
   * Formats the size
   */
  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                    <Container fluid={true}>

                        <Breadcrumbs title="User" breadcrumbItem="Add User" />

                        <Row>
                            <Col>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Save New User</CardTitle>
                                        <CardSubtitle className="mb-3">Fill the records below to save a new user to the database.</CardSubtitle>
                                        <Form>
                                        {this.state.alert ? <UncontrolledAlert color="success" className="alert-dismissible fade show" role="alert">
                                                  <i className="mdi mdi-bullseye-arrow mr-2"></i>
                                                 {this.state.message}
                                              </UncontrolledAlert> :
                                              null }
                                            <div
                                                className="dropzone-previews mt-3"
                                                id="file-previews"
                                            >
                                                {this.state.selectedFiles.map((f, i) => {
                                                return (
                                                    <Card
                                                    className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                    key={i + "-file"}
                                                    >
                                                    <div className="p-2">
                                                        <Row className="align-items-center">
                                                        <Col className="col-auto">
                                                        <i className="fas fa-file-excel"></i>
                                                        </Col>
                                                        <Col>
                                                            <Link
                                                            to="#"
                                                            className="text-muted font-weight-bold"
                                                            >
                                                            {f.name}
                                                            </Link>
                                                            <p className="mb-0">
                                                            <strong>{f.formattedSize}</strong>
                                                            </p>
                                                        </Col>
                                                        </Row>
                                                    </div>
                                                    </Card>
                                                );
                                                })}
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="example-text-input" className="col-md-2 col-form-label">Company Name</label>
                                                <div className="col-md-10">
                                                    <input className="form-control" onChange={this.handleInputChange} name="customerName" type="text" placeholder="Company Name" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                            <label htmlFor="example-text-input" className="col-md-2 col-form-label">Business Reg. Number</label>
                                                <div className="col-md-10">
                                                    <input className="form-control" onChange={this.handleInputChange} name="businessCertificate" type="text" placeholder="Business Registration Number" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                            <label htmlFor="example-text-input" className="col-md-2 col-form-label">Nature of Business</label>
                                                <div className="col-md-10">
                                                    <input className="form-control" onChange={this.handleInputChange} name="sector" type="text" placeholder="Nature of Business" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                            <label htmlFor="example-text-input" className="col-md-2 col-form-label">Postal Address</label>
                                                <div className="col-md-10">
                                                    <input className="form-control" name="customerAddress" onChange={this.handleInputChange} type="text" placeholder="Postal Address" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="example-date-input" className="col-md-2 col-form-label">Street Address</label>
                                                <div className="col-md-10">
                                                    <input className="form-control" name="streetAddress" onChange={this.handleInputChange} type="text" placeholder="Street Address/House No/Floor" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                            <label className="col-md-2 col-form-label">Customer Type</label>
                                            <div className="col-md-10">
                                                <select className="form-control" name="customerType" onChange={this.handleInputChange}>
                                                    <option>Select Customer Type</option>
                                                    <option>Postpaid</option>
                                                    <option>Prepaid</option>
                                                    <option>Hybrid</option>
                                                </select>
                                            </div>
                                            </div>
                                            <div className="form-group row">
                                            <label htmlFor="example-text-input" className="col-md-2 col-form-label">Account Manager</label>
                                                <div className="col-md-10">
                                                    <input className="form-control" name="accountManager" onChange={this.handleInputChange} type="text" placeholder="Account Manager" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                            <label htmlFor="example-text-input" className="col-md-2 col-form-label">Phone Number</label>
                                                <div className="col-md-10">
                                                    <input className="form-control" name="customerNumber" onChange={this.handleInputChange} type="text" placeholder="Phone Number" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                            <label htmlFor="example-text-input" className="col-md-2 col-form-label">Alt. Phone Number</label>
                                                <div className="col-md-10">
                                                    <input className="form-control" name="alternativeContact" onChange={this.handleInputChange} type="text" placeholder="Phone Number" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                            <div className="col-md-10">
                                            <button type="button" onClick={this.handleSubmit} className="btn waves-effect waves-light" style={{backgroundColor: "#e60000", color: "#ffffff"}}>Save User</button>
                                            </div>
                                            </div>
                                            
                                            </Form>
                                            {this.state.loading ? <ProgressLoader /> : null}
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default AddUser;
