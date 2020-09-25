import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from "reactstrap";
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

class PieChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [56,38,26],
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
            piedata: [],
            seriesData: [],
            
            
        };
    }

    fullData = [];
    
    render() {
        this.fullData = this.props.data;
        return (
            <React.Fragment>
                            <Col xl="12">
                                <Card>
                                    <CardBody>

                                        <div>
                                            <div id="donut-chart" className="apex-charts">
                                                <ReactApexChart options={this.props.options} series={this.props.series} type="donut" height={240} />
                                            </div>
                                        </div>
                                        <div className="text-center text-muted">
                                            <Row>
                                            {this.props.data.map((person, index) => (
                                                        <Col>
                                                        <div className="mt-4">
                                                        <p className="mb-2 text-truncate"><i className="mdi mdi-circle mr-1" style={{color: "#e60000"}}></i> {person.key}</p>
                                                                    <h5>{person.value}</h5>
                                                                </div>
                                                                </Col>
                                                    ))}
                                            </Row>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
            </React.Fragment>
        );
    }
}

export default PieChart;