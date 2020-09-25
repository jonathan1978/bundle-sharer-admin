import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Col, Card, CardBody, CardFooter, UncontrolledTooltip } from "reactstrap";

class TeamCard extends Component {

    render() {
        const user = this.props.user;
        return (
            <React.Fragment>
                <Col xl="3" sm="6">
                    <Card className="text-center">
                        <CardBody>
                            {
                                user.img === "Null" ?
                                    <div className="avatar-sm mx-auto mb-4">
                                        <span className={"avatar-title rounded-circle bg-soft-" + user.color + " text-" + user.color + " font-size-16"}>
                                            {user.name.charAt(0)}
                                        </span>
                                    </div>
                                    :
                                    <div className="mb-4">
                                        <img className="rounded-circle avatar-sm" src={user.img} alt="" />
                                    </div>
                            }

                            <h5 className="font-size-15"><Link to="#" className="text-dark">{user.name}</Link></h5>
                            <p className="text-muted">{user.designation}</p>

                            <div>
                                {
                                    this.props.user.skills.map((skill, key) =>
                                        <Link to="#" className="badge badge-primary font-size-11 m-1" key={"_skill_" + key}>
                                            {skill.name}
                                        </Link>
                                    )
                                }
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </React.Fragment>
        );
    }
}

export default TeamCard;