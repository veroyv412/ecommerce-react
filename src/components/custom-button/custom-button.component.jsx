import React from 'react';

import './custom-button.styles.scss';

const CustomButton = ({ children, provider, ...otherProps }) => (
    <button className={`${provider} custom-button`} {...otherProps}>
        {children}
    </button>
);

export default CustomButton;