import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';


DateFilter.propTypes = {
    onSorting: PropTypes.func,
};

function DateFilter(props) {

    const { onSorting } = props;

    const options = [
        { value: "createDate desc", label: 'Latest to oldest' },
        { value: "createDate asc", label: 'Oldest to latest' },
    ];

    const handleChange = (selectedOption) => {
        console.log(selectedOption.value);
        onSorting(selectedOption.value);
    };

    return (
        <Select
            options={options}
            onChange={handleChange}
            placeholder="Created Date"
        />
    );
}

export default DateFilter;