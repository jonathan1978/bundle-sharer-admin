import React, { Component } from "react";
import { Container, Row, Col, Badge, Card, CardBody, CardTitle, Media} from "reactstrap";
import {Link} from "react-router-dom";

//Import Breadcrumb
import Breadcrumbs from '../components/Common/Breadcrumb';
import axios from 'axios';

//Import Components
import StackedColumnChart from './StackedColumnChart';
import WelcomeComp from './WelcomeComp';
import DashboardProject from "./DashboardProject";
import PieChart from "./PieChart";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dashboarddata: [],
            dashboardsummary: [],
            piedata: [],
            seriesdata: [],
            reports: [
                { title: "Ongoing Projects", iconClass: "bx-copy-alt", description: "1" },
                { title: "Completed Projects", iconClass: "bx-archive-in", description: "1" },
                { title: "Backlog ", iconClass: "bx-purchase-tag-alt", description: "0" }
            ],
          email: [
            { title: "Week", linkto: "#", isActive: false },
            { title: "Month", linkto: "#", isActive: false },
            { title: "Year", linkto: "#", isActive: true }
        ],
          series: [
              {name:"series1",data:[31,40,36,51,49,72,69,56,68,82,68,76]}
          ],
          options:{
            labels:["Series A","Series B","Series C"],
            colors:["#556ee6","#34c38f","#f46a6a","#bbbbbb"],
            legend:{show:!1},
            plotOptions:{
                pie: {
                    donut: { 
                        size:"70%"
                    }
                },
            }
        },
      };
    }

    componentDidMount() {

    const config = {
      headers: { 
        'content-type': 'multipart/form-data', 
      },
    };

    Promise.all([
      axios
      .get(
        'http://10.233.217.73:9090/project/summary',
        config
      )
    ]).then(([result1]) => {
        let data = [];
        let inputData = [];
        let labelsData = [];
    result1.data.forEach(item => {
        inputData.push(item.value)
        labelsData.push(item.key)
        data.push({
        title: item.key,
        value: item.value,
        icon: "bx-copy-alt",
      })});
      var options = {...this.state.options}
    options.labels = labelsData;
    this.setState({options});
      this.setState({ 
        dashboarddata: result1.data,
        piedata: result1.data,
        seriesdata: inputData,
        dashboardsummary: data
      });

    })
      }


    render() {
        return (
            <React.Fragment>
                <div className="page-content">
                 <Container fluid>

                        {/* Render Breadcrumb */}
                        <Breadcrumbs title="Dashboard" breadcrumbItem="Items" />
                        <Row>
                            <Col xl="4">
                                <WelcomeComp welcomeData={this.state.dashboarddata}/>
                                <DashboardProject />
                            </Col>
                            <Col xl="8">
                                <Row>
                                    {/* Reports Render */}
                                    {
                                        this.state.dashboardsummary.map((report, key) =>
                                            <Col md="4" key={"_col_" + key}>
                                                <Card className="mini-stats-wid">
                                                    <CardBody>
                                                        <Media>
                                                            <Media body>
                                                                <p className="text-muted font-weight-medium">{report.title}</p>
                                                                <h4 className="mb-0">{report.value}</h4>
                                                            </Media>
                                                            <div className="mini-stat-icon avatar-sm rounded-circle bg-primary align-self-center">
                                                                <span className="avatar-title">
                                                                    <i className={"bx " + report.icon + " font-size-24"}></i>
                                                                </span>
                                                            </div>
                                                        </Media>
                                                    </CardBody>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                </Row>

                                <Card>
                                    <CardBody>
                                        <CardTitle className="mb-4 float-sm-left">
                                            Projects Data
                                        </CardTitle>
                                        <div className="clearfix"></div>
                                        <PieChart 
                                            data={this.state.piedata}
                                            series={this.state.seriesdata}
                                            options={this.state.options}/>
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

export default Dashboard;
