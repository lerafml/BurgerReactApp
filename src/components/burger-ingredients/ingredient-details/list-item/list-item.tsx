import React from 'react';
import styles from './list-item.module.css';

interface ListItemProps {
	name: string;
	value: number;
}
const ListItem = ({ name, value }: ListItemProps): React.JSX.Element => {
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

export default ListItem;
