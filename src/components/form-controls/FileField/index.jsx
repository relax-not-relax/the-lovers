import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';

FileField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
    errors: PropTypes.object,
};

function FileField(props) {
    const { form, name, label, disabled, errors } = props;
    const hasError = errors[name];

    return (
        <Controller
            name={name}
            control={form.control}
            defaultValue=''
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
                    type="file"
                    focused
                />
            )}
        />
    );
}

export default FileField;