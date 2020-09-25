import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import AddUser from "../views/AddUser";
import Layout from "../components/HorizontalLayout/index";
import RouteWithLayout from "../components/RouteWithLayout/RouteWithLayout";
import Profile from "../views/Profile";
import CompletedProjects from "../views/CompletedProjects";
import OngoingProjects from "../views/OngoingProjects";
import Dashboard from "../views/Dashboard";
import AllRequests from '../views/AllRequests';
import PendingRequests from '../views/PendingRequests';
import ApprovedRequests from '../views/ApprovedRequests';
import Team from "../views/Team";
import Login from "../views/Login";

const AppRoute = () => {

	return (
		<Switch>
			<Route
        	component={Login}
        	exact
        	path={`/login`}
      	/>
		  <Route
			component={Login}
			exact
			path={`/`}
		  />
		  <RouteWithLayout
			component={Dashboard}
			layout={Layout}
			exact
			path={`/dashboard`}
		  />
		  <RouteWithLayout
			component={AllRequests}
			layout={Layout}
			exact
			path={`/all-requests`}
		  />
		  <RouteWithLayout
			component={PendingRequests}
			layout={Layout}
			exact
			path={`/pending-requests`}
		  />
		  <RouteWithLayout
			component={ApprovedRequests}
			layout={Layout}
			exact
			path={`/approved-requests`}
		  />
		  <RouteWithLayout
			component={Profile}
			exact
			layout={Layout}
			path={`/profile`}
		  />
		  <RouteWithLayout
			component={AddUser}
			exact
			layout={Layout}
			path={`/new-user`}
		  />
		  <RouteWithLayout
			component={CompletedProjects}
			exact
			layout={Layout}
			path={`/completed`}
		  />
		  <RouteWithLayout
			component={OngoingProjects}
			exact
			layout={Layout}
			path={`/ongoing`}
		  />
		  <RouteWithLayout
			component={Team}
			exact
			layout={Layout}
			path={`/team`}
		  />
		  </Switch>
		  );
		
}

/**const AppRoute = ({
	component: Component,
	layout: Layout,
	isAuthProtected,
	...rest
}) => (
		<Route
			{...rest}
			render={props => {

				if (isAuthProtected && !sessionStorage.getItem("authUser")) {
					return (
						<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
					);
				}

				return (
					<Layout>
						<Component {...props} />
					</Layout>
				);
			}}
		/>
	);
	**/

export default AppRoute;

