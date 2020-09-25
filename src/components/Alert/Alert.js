import React from 'react';
import { UncontrolledAlert } from "reactstrap";

const Alert = (props) => {
    return (
        <UncontrolledAlert color="success" className="alert-dismissible fade show" role="alert">
                                                <i className="mdi mdi-bullseye-arrow mr-2"></i>
                                                {props.message}
                                            </UncontrolledAlert>
    );
}
export default Alert;