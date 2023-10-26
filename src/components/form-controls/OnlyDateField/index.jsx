import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

OnlyDateField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
    errors: PropTypes.object,
};

function OnlyDateField(props) {
    const { form, name, label, disabled, errors } = props;
    const hasError = errors[name];

    return (
        <Controller
            name={name}
            control={form.control}
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
                    type="date"
                />
            )}
        />
    );
}

export default OnlyDateField;