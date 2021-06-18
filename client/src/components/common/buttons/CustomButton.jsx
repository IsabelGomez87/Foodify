/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CustomButton = ({
  className, text, handleClick, dataIconSpan, secondClassSpan, route, elementId,
}) => {
  const thisSpan = <span className={`iconify ${secondClassSpan}`} data-icon={dataIconSpan} data-inline="false" />;
  return (
    <button data-testId={`button-${className}`} className={className} type="button" onClick={handleClick}>
      {(route && elementId) && (
        <Link to={`/${route}/${elementId}`}>
          {text || (thisSpan)}
        </Link>
      )}
      {(route && !elementId) ? (
        <Link to={`/${route}`}>
          {text || (thisSpan)}
        </Link>
      ) : (
        null
      )}
      {!route && text ? `${text}` : null}
      {!route && dataIconSpan ? thisSpan : null}
    </button>
  );
};

CustomButton.propTypes = {
  className: PropTypes.string.isRequired,
  text: PropTypes.string,
  handleClick: PropTypes.func,
  dataIconSpan: PropTypes.string,
  secondClassSpan: PropTypes.string,
  route: PropTypes.string,
  elementId: PropTypes.string,
};

export default (CustomButton);
