import React, { useRef } from 'react';
import styles from './list-item.module.css';
import { constructorIngredientPropType } from '@utils/prop-types.js';
import {
	DragIcon,
	ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
	moveIngredient,
	removeIngredient,
} from '../../../../services/constructor/reducer';

export const ListItem = ({ item, index }) => {
	const dispatch = useDispatch();
	const [{ isDragging }, dragRef] = useDrag({
		type: 'item',
		item: () => {
			const ikey = item.key;
			return { ikey, index };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const ref = useRef(null);

	const [, dropRef] = useDrop({
		accept: 'item',
		hover: (item, monitor) => {
			if (!ref.current) return;
			const dragIndex = item.index;
			if (dragIndex === index) return;
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			if (dragIndex < index && hoverClientY < hoverMiddleY) return;
			if (dragIndex > index && hoverClientY > hoverMiddleY) return;
			dispatch(moveIngredient([dragIndex, index]));
			item.index = index;
		},
	});

	const opacity = isDragging ? 0 : 1;
	dragRef(dropRef(ref));
	return (
		<li ref={ref} className={styles.item} key={item.key} style={{ opacity }}>
			<DragIcon type='primary' className={styles.dragicon} />
			<ConstructorElement
				isLocked={false}
				text={item.item.name}
				price={item.item.price}
				thumbnail={item.item.image}
				handleClose={() => dispatch(removeIngredient(item.key))}
			/>
		</li>
	);
};

ListItem.propTypes = {
	item: constructorIngredientPropType.isRequired,
	index: PropTypes.number.isRequired,
};
