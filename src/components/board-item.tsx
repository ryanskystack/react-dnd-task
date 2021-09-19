import * as React from 'react';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
// Import BoardItem component
import { Button } from './button';

// Define types for board item element properties
type BoardItemProps = {
  index: number,
  item: any,
  editState: any,
  setEditState: any,
  confirmState: any,
  setConfirmState: any
}

// Define types for board item element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
type BoardItemStylesProps = {
  isDragging: boolean
}

// Create style for board item element
const BoardItemEl = styled.div<BoardItemStylesProps>`

  background-color: ${(props) => props.isDragging ? '#d3e4ee' : '#ecf0f3'};
  border-radius: 4px;
  box-shadow: 9px 9px 15px #d1d9e6, -9px -9px 15px #fff;
  margin-bottom:12px;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: -0.2px;
  font-size: 18px;
  padding: 16px;
  background-color: #EBECF0;
  text-shadow: 1px 1px 0 #FFF;
  color: #61677C;
  font-weight: bold;
  font-size:  
  transition: all 0.2s ease-in-out;
  cursor: move;
  

  &:hover {
    box-shadow: -2px -2px 5px #FFF, 2px 2px 5px #BABECC;
  }sdfsdfds

  & + & {
    margin-top: 4px;
  }
`

// Create style for input item element
const InputWrapperEl = styled.div`
 display:flex;
 justify-content: space-between; 
 align-items: center;

 box-sizing: border-box;
 transition: all 0.2s ease-in-out;
 height:21px;
`

// Create style for input item element
const InputEl = styled.input`

  margin-right: 8px;
  background: #d0f6ec;
  border-width:0; 
  box-shadow:  inset 2px 2px 5px #87a099, inset -5px -5px 10px #ffffff;
  color: #61677C;
  font-weight: bold;  
  font-weight: 400;
  width: 200px;
  height:28px  

  &:focus {
    outline: none;
    color: #61677C;
    font-weight: bold;  
    font-weight: 400;
    box-shadow:  inset 1px 1px 2px #BABECC, inset -1px -1px 2px #FFF;
  }

`
// Create and export the BoardItem component
export const BoardItem = (props: BoardItemProps) => {
  const { item, index, editState, setEditState, confirmState, setConfirmState } = props;
  const [inputState, setInputState] = useState<any>(item.content);
  // Create handler for update the input content of item 
  const changeHanddler = (e: any) => {
    setInputState(e.target.value);
  }
  // Create handler for confirming the input content of item 
  const confirmHandler = (e: any) => {
    item.content = inputState;
    item['isActive'] = !item['isActive'];
    item === editState && setEditState('');
    setConfirmState(item);
  }

  //Create handler for editting the item by click the item itself
  const editHanddler = (e: any) => {
    item['isActive'] = true;
    item === confirmState && setConfirmState('');
    setEditState(item);
  }

  return <Draggable draggableId={item.id} index={index}>
    {(provided, snapshot) => (
      <BoardItemEl
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
      >
        {
          item.isActive ?
            (<InputWrapperEl>
                <InputEl autoFocus type="text" onChange={changeHanddler} value={inputState} />
              <Button variant='confirm' key={item.id} id={item.id} onClick={confirmHandler} />
            </InputWrapperEl>
            )
            :
            <div id={item.id} onClick={editHanddler}>
              {item.content}
            </div>
        }


        {/* */}
      </BoardItemEl>
    )}
  </Draggable>
}