import PropTypes from 'prop-types';
import React from 'react';
import monitorNewItemsOptions from 'Utilities/Artist/monitorNewItemsOptions';
import translate from 'Utilities/String/translate';
import SelectInput from './SelectInput';

function MonitorNewItemsSelectInput(props) {
  const {
    includeNoChange,
    includeMixed,
    ...otherProps
  } = props;

  const values = [...monitorNewItemsOptions];

  if (includeNoChange) {
    values.unshift({
      key: 'noChange',
      value: translate('NoChange'),
      disabled: true
    });
  }

  if (includeMixed) {
    values.unshift({
      key: 'mixed',
      value: '(Mixed)',
      disabled: true
    });
  }

  return (
    <SelectInput
      values={values}
      {...otherProps}
    />
  );
}

MonitorNewItemsSelectInput.propTypes = {
  includeNoChange: PropTypes.bool.isRequired,
  includeMixed: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

MonitorNewItemsSelectInput.defaultProps = {
  includeNoChange: false,
  includeMixed: false
};

export default MonitorNewItemsSelectInput;
