import React from 'react';



export default ({ children, onClick, tip, btnClassName, tipClassName }) => (
    <Tooltip title={tip} className={tipClassName} >
        <IconButton onClick={onClick} className={btnClassName}>
            {children}
        </IconButton>

    </Tooltip>
);