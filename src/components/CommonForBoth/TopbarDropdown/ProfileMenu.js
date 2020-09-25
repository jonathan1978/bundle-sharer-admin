
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter, Link, useHistory } from 'react-router-dom';
import { logout } from '../../../helpers/Auth';

//i18n
import { withNamespaces } from 'react-i18next';

// users

class ProfileMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: false,
            username: "Henry"
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            menu: !prevState.menu
        }));
    }

    

    render() {
        const { location, history } = this.props

        const handleLogout = (e) => {
            e.preventDefault();
            logout();
            history.push(`/`);
          };

        return (
            <React.Fragment>
                <Dropdown isOpen={this.state.menu} toggle={this.toggle} className="d-inline-block" >
                    <DropdownToggle className="btn header-item waves-effect" id="page-header-user-dropdown" tag="button">
                        <span className="d-none d-xl-inline-block ml-2 mr-1">{localStorage.getItem('username')}</span>
                        <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem tag="a" onClick={handleLogout}>
                            <i className="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>
                            {this.props.t('Logout')}
                        </DropdownItem>
                        
                    </DropdownMenu>
                </Dropdown>
            </React.Fragment>
        );
    }
}

export default withRouter(withNamespaces()(ProfileMenu));
