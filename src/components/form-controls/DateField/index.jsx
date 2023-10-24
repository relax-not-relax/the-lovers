import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import dateFormat, { masks } from "dateformat";

DateField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
    errors: PropTypes.object,
};

function DateField(props) {

    const { form, name, label, disabled, errors } = props;
    const hasError = errors[name];
    const now = new Date();

    masks.hammerTime = 'yyyy-mm-dd"T"HH:MM';
    const formatNow = dateFormat(now, "hammerTime");

    return (
        <Controller
            name={name}
            control={form.control}
            defaultValue={formatNow}
            render={({ field }) => (
                <TextField
                    {...field}
                    fullWidth
                    label={label}
                    disabled={disabled}
                    error={Boolean(hasError)}
                    helperText={hasError?.message}
                    margin="normal"
                    variant="outlined"
                    type="datetime-local"
                />
            )}
        />
    );
}

export default DateField;