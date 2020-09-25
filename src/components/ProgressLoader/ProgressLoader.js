import React from "react";
import { Spinner } from 'reactstrap';


const ProgressLoader = (props) => {
    return (
      <div>
        <Spinner style={{ width: '3rem', height: '3rem' }} color="primary" />
      </div>
    );
  }

  export default ProgressLoader;

