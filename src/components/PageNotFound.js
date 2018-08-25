import React from 'react';

const PageNotFound = (props) => {
  return props.loading? null: (  
    <div className='center'>
      <h3>Oops... something is missing</h3>
      <p>The requested page is not found</p>
    </div>
  );
};

export default PageNotFound;