import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function Video({ link }) {
  if (link) {
    const url = link.replace('watch?v=', 'embed/');
    return (
      <div className="video-container">
        <h2>Video</h2>
        <div className="video-content">
          <iframe
            title="recipe video"
            width="320"
            height="240"
            src={ url }
            data-testid="video"
          />
        </div>
      </div>
    );
  }
  return (
    <div className="video-container">
      <h2>Video</h2>
      <div className="video-content">
        <iframe
          title="recipe video"
          width="320"
          height="240"
          src={ link }
          data-testid="video"
        />
      </div>
    </div>
  );
}

Video.propTypes = {
  link: PropTypes.string,
};

Video.defaultProps = {
  link: '',
};
