import React from 'react';
import { Link } from 'react-router';
import { Helmet } from "react-helmet";

export default class NotFoundPage extends React.Component {
  render() {
    return (
      <div className="not-found">
        <Helmet>
          <title>Page Not Found</title>
        </Helmet>
        <h1>404</h1>
        <h2>Page not found!</h2>
        <p>
          <Link to="/">Go back to the main page</Link>
        </p>
      </div>
    );
  }
}
