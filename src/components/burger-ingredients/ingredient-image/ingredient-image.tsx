import React from 'react';

interface IngredientImageProps {
	image: string;
	name: string;
}
const IngredientImage = ({
	image,
	name,
}: IngredientImageProps): React.JSX.Element => {
	return <img src={image} alt={name} />;
};

export default IngredientImage;
