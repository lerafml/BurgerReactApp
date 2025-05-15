import React from 'react';
import PropTypes from 'prop-types';
import styles from './list-item.module.css';

const ListItem = ({ name, value }) => {
	return (
		<li className={styles.li}>
			<span className='text text_type_main-default text_color_inactive'>
				{name}
			</span>
			<span className='text text_type_main-default text_color_inactive text_type_digits-default'>
				{value}
			</span>
		</li>
	);
};

ListItem.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
};

export default ListItem;
