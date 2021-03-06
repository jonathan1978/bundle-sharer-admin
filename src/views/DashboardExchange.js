import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Media, Table, CardTitle } from "reactstrap";
import { MDBDataTable } from "mdbreact";

//Import Images
import avatar1 from "../assets/images/users/avatar-1.jpg";
import axios from "axios";

const CardUser = () => {

    const [statusData, setStatusData] = useState([]);

    //data for my Material Table
    const data = {
        columns: [
          {
            label: "Exchange Name",
            field: "key",
            sort: "asc",
            width: 150
          },
          {
            label: "No. of Accounts",
            field: "value",
            sort: "asc", 
            width: 100
          },
        ],
        rows: statusData
      };

      const token = localStorage.getItem('token');
        const hashPassword = localStorage.getItem('password');

      useEffect(() => {


          console.log('token: ' + token);

    const config = {
      headers: { 
        'content-type': 'multipart/form-data', 
        'Authorization': `Bearer ${token}`,
        'rpa': hashPassword
      },
    };

    axios
      .get(
        'http://10.233.217.73:8777/user/account/exchange',
        config
      )
      .then((response) => {
          setStatusData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

      }, [token, hashPassword]);

        return (
          <React.Fragment>
            <Row>
            <Card>
                <CardBody>
                <CardTitle>Accounts by Exhange </CardTitle>
                <MDBDataTable entries={5} pagesAmount={4} responsive striped bordered data={data} />
                </CardBody>
            </Card>
            </Row>
          </React.Fragment>
        );
    }

export default CardUser;