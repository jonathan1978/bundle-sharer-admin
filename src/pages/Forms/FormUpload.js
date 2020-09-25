import React, { Component } from "react";
import { Row, Col, Card, Form, CardBody, CardTitle, CardSubtitle,Container } from "reactstrap";
import Dropzone from "react-dropzone";

// Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Axios from "axios";
import ProgressLoader from "../../components/ProgressLoader/ProgressLoader";
import { UncontrolledAlert } from "reactstrap";

class FormUpload extends Component {
  constructor(props) {
    super(props);
    this.handleAcceptedFiles = this.handleAcceptedFiles.bind(this);
    this.handleSubmitFile = this.handleSubmitFile.bind(this);
    this.state = { selectedFiles: [], selectedFile: '', loading: false, alert: false, message: '', code: 0,  };
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

  token = localStorage.getItem('token');
  hashPassword = localStorage.getItem('password');

  config = {
    headers: { 
      'content-type': 'multipart/form-data', 
      'Authorization': `Bearer ${this.token}`,
      'rpa': this.hashPassword
    },
  };

  downloadFile = () => {

    const config = {
      headers: { 
        'content-type': 'multipart/form-data', 
        'Authorization': `Bearer ${this.token}`,
        'rpa': this.hashPassword
      },
      params: {
        fileName: 'template.xlsx'
      }
    };
    Axios
      .get(
        'http://10.233.217.73:8777/v1/api/downloadFile',
        config
      )
      .then((response) => {
        this.setState({
          loading: false, 
          alert: true, 
          message: response.data.message, 
          alertColor: 'success'
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmitFile = () => {
    
    const chosenItem = this.state.selectedFile;
    this.setState({loading: true});
    try {
      
      let formData = new FormData();

    formData.append('file', chosenItem);
    
      Axios.post('http://10.233.217.73:8777/save/accounts', formData, this.config)
      .then((response) => {
        console.log(response);
        if (response.data.code === 1) {
          this.setState({
            loading: false, 
            alert: true, 
            message: response.data.message, 
            alertColor: 'success'
          });
        }else {
          console.log(response.message);
        }
        
      })
      .catch((error) => {
        /**this.setState({loading: false, alert: true, 
          message: error.response, 
          alertColor: 'error'});**/
          console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
    
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

            <Breadcrumbs title="Account" breadcrumbItem="Account File Upload" />


            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <CardTitle>Download Excel File  <i className="mdi mdi-download" onClick={this.downloadFile}></i></CardTitle>
                    <CardSubtitle className="mb-3">Click on 'Download Excel File' Icon and data before Dropping File or Click to Upload Excel File of User Accounts
                    </CardSubtitle>
                    <Form>
                    {this.state.alert ? <UncontrolledAlert color="success" className="alert-dismissible fade show" role="alert">
                                                  <i className="mdi mdi-bullseye-arrow mr-2"></i>
                                                 {this.state.message}
                                              </UncontrolledAlert> :
                                              null }
                      <Dropzone
                        onDrop={acceptedFiles =>
                          this.handleAcceptedFiles(acceptedFiles)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <div className="dropzone">
                            <div
                              className="dz-message needsclick mt-2"
                              {...getRootProps()}
                            >
                              <input {...getInputProps()} />
                              <div className="mb-3">
                                <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                              </div>
                              <h4>Drop files here or click to upload.</h4>
                            </div>
                          </div>
                        )}
                      </Dropzone>
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
                    </Form>

                    <div className="text-center mt-4">
                      {this.state.loading ? <ProgressLoader /> : null}
                      <button type="button" onClick={this.handleSubmitFile} className="btn waves-effect waves-light" style={{backgroundColor: "#e60000", color: "#ffffff"}}>Send Files</button>
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
}

export default FormUpload;
