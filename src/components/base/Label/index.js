import React from 'react'

const Label = ({ fontWeight, ...props }) => {
    return (
        <label style={{ fontWeight: fontWeight }} htmlFor="">
            Account
        </label>
    )
}

Label.defaultProps = {
    fontWeight: "bold"
};

export default Label