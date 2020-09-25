import React, { Component } from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

// reactstrap
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";

import megamenuImg from "../../assets/images/megamenu-img.png";
import logo from "../../assets/images/vodafone_logo.png";

// Redux Store
import { toggleRightSidebar } from "../../store/actions";

//i18n
import { withNamespaces } from "react-i18next";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { isSearch: false };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleRightbar = this.toggleRightbar.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  toggleSearch = () => {
    this.setState({ isSearch: !this.state.isSearch });
  };
  /**
   * Toggle sidebar
   */
  toggleMenu() {
    this.props.openLeftMenuCallBack();
  }

  /**
   * Toggles the sidebar
   */
  toggleRightbar() {
    this.props.toggleRightSidebar();
  }

  toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <header id="page-topbar">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box">
                <Link to="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logo} alt="" height="22" />
                    <span style={{ color: "white" }}>Bundle Sharer Admin</span>
                  </span>
                  <span className="logo-lg">
                    <img src={logo} alt="" height="17" />
                    <span style={{ color: "white" }}>Bundle Sharer Admin</span>
                  </span>
                </Link>

                <Link to="/" className="logo logo-light">
                  <span className="logo-sm">
                    <img src={logo} alt="" height="22" />
                    <span style={{ color: "white" }}>Bundle Sharer Admin</span>
                  </span>
                  <span className="logo-lg">
                    <img src={logo} alt="" height="19" />
                    <span style={{ color: "white" }}>Bundle Sharer Admin</span>
                  </span>
                </Link>
              </div>

              <button
                type="button"
                className="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light"
                data-toggle="collapse"
                onClick={this.toggleMenu}
                data-target="#topnav-menu-content"
              >
                <i className="fa fa-fw fa-bars"></i>
              </button>

              <form className="app-search d-none d-lg-block">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={this.props.t("Search") + "..."}
                  />
                  <span className="bx bx-search-alt"></span>
                </div>
              </form>
              <div className="dropdown d-none d-lg-inline-block ml-1">
                <Link to="/dashboard">
                  <button
                    type="button"
                    className="btn header-item noti-icon waves-effect"
                    data-toggle="fullscreen"
                  >
                    Home
                  </button>
                </Link>
              </div>
              <div className="dropdown d-none d-lg-inline-block ml-1">
                <Link to="/new-user">
                  <button
                    type="button"
                    className="btn header-item noti-icon waves-effect"
                    data-toggle="fullscreen"
                  >
                    Add Customer
                  </button>
                </Link>
              </div>
              <div className="dropdown d-none d-lg-inline-block ml-1">
                <Link to="/all-requests">
                  <button
                    type="button"
                    className="btn header-item noti-icon waves-effect"
                  >
                    All Requests
                  </button>
                </Link>
              </div>
              {/* <div className="dropdown d-none d-lg-inline-block ml-1">
              <Link to='/pending-requests' >
                <button
                  type="button"
                  className="btn header-item noti-icon waves-effect"
                >
                   Pending Requests
                </button>
                </Link>
              </div>
              <div className="dropdown d-none d-lg-inline-block ml-1">
              <Link to='/approved-requests' >
                <button
                  type="button"
                  className="btn header-item noti-icon waves-effect"
                >
                   Approved Requests
                </button>
                </Link>
              </div> */}
            </div>

            <div className="d-flex">
              <div className="dropdown d-inline-block d-lg-none ml-2">
                <button
                  type="button"
                  className="btn header-item noti-icon waves-effect"
                  id="page-header-search-dropdown"
                  onClick={() => {
                    this.setState({ isSearch: !this.state.isSearch });
                  }}
                >
                  <i className="mdi mdi-magnify"></i>
                </button>
                <div
                  className={
                    this.state.isSearch
                      ? "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0 show"
                      : "dropdown-menu dropdown-menu-lg dropdown-menu-right p-0"
                  }
                  aria-labelledby="page-header-search-dropdown"
                >
                  <form className="p-3">
                    <div className="form-group m-0">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={this.props.t("Search") + "..."}
                          aria-label="Recipient's username"
                        />
                        <div className="input-group-append">
                          <button className="btn btn-primary" type="submit">
                            <i className="mdi mdi-magnify"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <ProfileMenu />
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = (state) => {
  const { layoutType } = state.Layout;
  return { layoutType };
};

export default connect(mapStatetoProps, { toggleRightSidebar })(
  withNamespaces()(Header)
);
