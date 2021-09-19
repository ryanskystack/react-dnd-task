import * as React from 'react';
import { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';


// Import BoardItem component
import { BoardItem } from './board-item';
// Import BoardItem component
import { Button } from './button';
// Import BoardItem component
import { SettingToggle } from './setting-toggle';
// Define types for board column element properties
type BoardColumnProps = {
  column: any,
  dataState: any,
  items: any,
  setDataState: any
}

// Define types for board column content style properties
// This is necessary for TypeScript to accept the 'isDraggingOver' prop.
type BoardColumnContentStylesProps = {
  isDraggingOver: boolean
}

// // Define types for add-button element properties
// type AddButtonProps = {
//   key: string,
//   onClick: any,
// }


// Create styles for BoardColumnWrapper element
const BoardColumnWrapper = styled.div`
  flex: 1;
  width: 270px;
  padding: 15px;
  background-color:#ecf0f3;
  border-radius: 4px;
  box-shadow: inset 9px 9px 15px #d1d9e6, inset -9px -9px 15px #fff;  
  transition: all 0.2s ease-in-out; 
  & + & {
    margin-left: 12px;
  }
`
// Create styles for BoardColumnHeader element
const BoardColumnHeader = styled.div`
  display:flex;
  padding: 15px;
  justify-content:space-between;
  align-items: center;

`

// Create styles for BoardColumnTitle element
const BoardColumnTitle = styled.h2`
  font: 16px sans-serif;
  color: #61677C;
  letter-spacing: -0.2px;
  text-shadow: 1px 1px 0 #FFF;
`
// // Create styles for AddButton element
// const AddButtonDiv = styled.div`
//   margin: 10px;

//   right:0;
//   display:flex;
//   justify-content: space-between;
//   background-color:green;
//   color:white;
//   cursor: pointer;
//   &:hover {
//     box-shadow: -2px -2px 5px #FFF, 2px 2px 5px #BABECC;
//   }

//  `
//  const SettingToggleDiv = styled.div`
//   margin: 10px;

//   right:0;
//   left:auto;
//   display:flex;
//   cursor: pointer;


// `
// Create styles for BoardColumnContent element
const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 20px;
  background-color: ${props => props.isDraggingOver ? '#d1d9e6' : null};
  border-radius: 4px;
`



// Create and export the BoardColumn component
export const BoardColumn: React.FC<BoardColumnProps> = (props) => {
  //refactor the props
  console.log("props:", props);
  const { dataState, items, column, setDataState } = props;
  const itemList = dataState.items;
  const columns = dataState.columns;

  // Create handler for button to add item 
  const addItemHandler = (e: any) => {
    console.log("e:", e);
    console.log("e.target:", e.target);
    //Check out the clicked button and define its column
    let targetKey = (e.target as any).id;
    console.log("targetKey:", targetKey);
    //Check out the number of the keys and name the added item
    let count = Object.keys(itemList).length;

    let lastId = Object.keys(itemList)[count - 1];

    console.log(" Object.keys(itemList):", Object.keys(itemList));
    console.log("count:", count);
    console.log("lastId:", lastId);
    let largestIndex = parseInt(lastId.substring(5));

    let newIndex = largestIndex + 1;
    let newItemId: string = 'item-' + newIndex;
    let newItemContent: string = `Content of New item.`;

    console.log("newItemId:", newItemId);
    console.log("newItemContent:", newItemContent);
    console.log("columns[targetKey].itemsIds:", columns[targetKey].itemsIds);
    // update the current column list with the new added item    
    let newItemsIds = columns[targetKey].itemsIds;
    newItemsIds.unshift(newItemId);

    console.log("newItemsIds:", newItemsIds);

    // Create new Item to update Items 
    let newItem = {
      id: newItemId,
      content: newItemContent,
      isActive: true
    };
    itemList[`${newItemId}`] = newItem;

    console.log("new-itemList:", itemList);

    // update dataState (update items list as well)
    const newDataState = {
      ...dataState,
      items: itemList
    }
    console.log("newDataState:", newDataState);
    setDataState(newDataState);
  }

  // Create handler for uplift the edited item state to its parent component
  const [editState, setEditState] = useState<any>('');

  // Create handler for update the dataState based on the input result
  const editItemHandler = (e: any) => {
    let itemKey = editState.id;
    itemList[`${itemKey}`]=editState;
    // update dataState (update items list as well)
    const newDataState = {
      ...dataState,
      items: itemList
    }
    console.log("newDataState:", newDataState);
    setDataState(newDataState);
  }
  return (
    <BoardColumnWrapper>
      <BoardColumnHeader>
        <BoardColumnTitle>
          {column.title}
        </BoardColumnTitle>
        {/* <AddButtonDiv> */}

        {/* <SettingToggle key={column.id} onClick={onClickAdder} /> */}

        <Button variant='add' key={column.id} id={column.id} onClick={addItemHandler} />
        {/* </AddButtonDiv> */}
      </BoardColumnHeader>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <BoardColumnContent
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {items.map((item: any, index: number) => <BoardItem key={item.id} item={item} index={index} setEditState={setEditState} />)}
            {provided.placeholder}
          </BoardColumnContent>
        )}
      </Droppable>
    </BoardColumnWrapper>
  )
}