import * as React from 'react';

import styled from 'styled-components';

// Define types for board item element properties
type AddButtonProps = {
    id: any
    onClick: any
}

// Create styles board element properties
const AddButtonEl = styled.button`
    right:0;
    width:20px;
    height:20px;
    display:flex;
    justify-content: space-between;
    background-color:green;
    color:white;
`
export const AddButton: React.FC<AddButtonProps> = (props) => {
    const { id, onClick } = props;
    return (

        <AddButtonEl id={id} onClick={onClick} type="button">

            {/* <button id={id} onClick={onClick} style={{width:'20px',height:'20px',backgroundColor:'green'}} type="button">
            </button> */}
            {/* <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="backward"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                >
                    <path
                        fill="currentColor"
                        d="M11.5 280.6l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2zm256 0l192 160c20.6 17.2 52.5 2.8 52.5-24.6V96c0-27.4-31.9-41.8-52.5-24.6l-192 160c-15.3 12.8-15.3 36.4 0 49.2z"
                    >
                    </path>
                </svg> */}
     
        </AddButtonEl>


    );




};