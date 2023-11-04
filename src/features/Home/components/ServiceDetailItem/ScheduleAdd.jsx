import React from 'react';
import PropTypes from 'prop-types';
import { ShoppingCart } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../Cart/cartSlice';

ScheduleAdd.propTypes = {
    schedule: PropTypes.object
};

function ScheduleAdd(props) {

    const { schedule } = props;

    const dispatch = useDispatch();

    const handleAddToCart = async () => {
        const action = addToCart({
            id: schedule.ItemId,
            cartItem: schedule,
            type: "scheduler"
        });
        await dispatch(action);
    }

    return (
        <div style={{ cursor: 'pointer' }} onClick={handleAddToCart}>
            <ShoppingCart />
        </div>
    );
}

export default ScheduleAdd;