import * as React from 'react';

import styled from 'styled-components';

// Define types for board item element properties
type SettingToggleProps = {
    onClick: any
}

// Create SettingToggle element properties
const ToggleEl = styled.div`
    height: 100%;
    width: 200%;
    background: #ecf0f3;
    border-radius: 15px;
    transform: translate3d(-75%, 0, 0);
    transition: transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35);
    box-shadow:
      -8px -4px 8px 0px #ffffff,
      8px 4px 12px 0px #d1d9e6;
`
const ToggleStateEl = styled.input`
    display: none;
    &:checked ~ .indicator {
        transform: translate3d(25%, 0, 0);
      }
`

const IndicatorEl = styled.div`
    height: 100%;
    width: 200%;
    background: #ecf0f3;
    border-radius: 15px;
    transform: translate3d(-75%, 0, 0);
    transition: transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35);
    box-shadow:
      -8px -4px 8px 0px #ffffff,
      8px 4px 12px 0px #d1d9e6;
`


export const SettingToggle: React.FC<SettingToggleProps> = (props) => {
    const { onClick } = props;
    return (
        <ToggleEl onClick={onClick}>
            <ToggleStateEl type="checkbox" name="check" value="check">
            </ToggleStateEl>
            <IndicatorEl className="indicator">
            </IndicatorEl>
        </ToggleEl>


    );


    //     <BoardItemEl

    //     >
    //       {props.item.content}
    //     </BoardItemEl>
    //   )}


};