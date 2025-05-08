import React from 'react';
import PropTypes from 'prop-types';

const IngredientImage = ({ image, name }) => {
	return <img src={image} alt={name} />;
};

IngredientImage.propTypes = {
	image: PropTypes.string.isRequired,
	name: PropTypes.string,
};

export default IngredientImage;
