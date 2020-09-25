import React from "react";
import { Redirect } from "react-router-dom";

//Tables

// Forms
import FormUpload from "../pages/Forms/FormUpload";

const authProtectedRoutes = [

	// Tables

	// Forms
	{ path: "/form-uploads", component: FormUpload },

	// this route should be at the end of all other routes
	{ path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
];

const publicRoutes = [
];

export { authProtectedRoutes, publicRoutes };
