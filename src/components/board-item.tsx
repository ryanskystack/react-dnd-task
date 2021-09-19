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
  setEditState: any
}

// Define types for board item element style properties
// This is necessary for TypeScript to accept the 'isDragging' prop.
type BoardItemStylesProps = {
  isDragging: boolean
}

// Create style for board item element
const BoardItemEl = styled.div<BoardItemStylesProps>`
  padding: 8px;
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
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    box-shadow: -2px -2px 5px #FFF, 2px 2px 5px #BABECC;
  }

  & + & {
    margin-top: 4px;
  }
`

// Create and export the BoardItem component
export const BoardItem = (props: BoardItemProps) => {
  const { item, index, setEditState } = props;
  const [inputState, setInputState] = useState<any>(item.content);

  // Create handler for update the input content of item 
  const changeHanddler = (e: any) => {
    console.log('e.target.value:', e.target.value);
    setInputState(e.target.value);
  }
  // Create handler for confirming the input content of item 
  const confirmHandler = (e: any) => {
    item.content = inputState;
    item.isActive=!item['isActive'];
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
            (<div>
              <input autoFocus type="text" onChange={changeHanddler} value={inputState} />
              <Button variant='confirm' key={item.id} id={item.id} onClick={confirmHandler} />
            </div>
            )
            :
            item.content
          // (<input type="button" value={item.content} />)
        }


        {/* */}
      </BoardItemEl>
    )}
  </Draggable>
}