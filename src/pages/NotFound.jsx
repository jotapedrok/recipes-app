import React from 'react';
import Footer from '../components/Footer';

export default function NotFound() {
  const style = {
    color: 'red',
    margin: '45px 25px',
  };
  return (
    <div>
      <h1 style={ style }>Ops...</h1>
      <h1 style={ style }>Page Not Found!</h1>
      <p style={ style }>Please go back to a valid page</p>
      <Footer />
    </div>
  );
}
