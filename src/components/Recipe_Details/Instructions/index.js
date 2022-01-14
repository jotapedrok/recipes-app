import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function Instructions({ instructionsText }) {
  return (
    <div className="instructions-container">
      <h2>Instructions</h2>
      <div className="instructions-content">
        <p
          data-testid="instructions"
        >
          {instructionsText}
        </p>
      </div>
    </div>
  );
}

Instructions.propTypes = {
  instructionsText: PropTypes.string,
};

Instructions.defaultProps = {
  instructionsText: '',
};
