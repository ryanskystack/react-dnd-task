import * as React from 'react';
// import { MouseEvent } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';


// Import BoardItem component
import { BoardItem } from './board-item';
// Import BoardItem component
import { AddButton } from './add-button';

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
  padding: 15px;
  background-color:#ecf0f3;
  border-radius: 4px;
  box-shadow: inset 9px 9px 15px #d1d9e6, inset -9px -9px 15px #fff;  
  transition: all 0.2s ease-in-out; 
  & + & {
    margin-left: 12px;
  }
`

// Create styles for BoardColumnTitle element
const BoardColumnTitle = styled.h2`
  font: 16px sans-serif;
  color: #61677C;
  letter-spacing: -0.2px;
  text-shadow: 1px 1px 0 #FFF;
`
// Create styles for AddButton element
const AddButtonDiv = styled.div`
  margin: 10px;
  width: 20px;
  height:20px;
  right:0;
  display:flex;
  background-color:green;
  color:white;
  cursor: pointer;
  &:hover {
    box-shadow: -2px -2px 5px #FFF, 2px 2px 5px #BABECC;
  }
  
`

// Create styles for BoardColumnContent element
const BoardColumnContent = styled.div<BoardColumnContentStylesProps>`
  min-height: 20px;
  background-color: ${props => props.isDraggingOver ? '#d1d9e6' : null};
  border-radius: 4px;
`



// Create and export the BoardColumn component
export const BoardColumn: React.FC<BoardColumnProps> = (props) => {
  console.log("props:", props);
  const { dataState, column, setDataState } = props;
  console.log("dataState:", dataState);
  let itemList = dataState.items;
  console.log("itemList:", itemList);
  let columns = dataState.columns;
  console.log("columns:", columns);

  const onClickAdder = (e: any) => {
    console.log("e:", e);
    console.log("e.target:", e.target);
    let targetKey = (e.target as any).key;
    console.log("targetKey:", targetKey);
    let count = Object.keys(itemList).length;
    console.log("count:", count);
    let newItemId: string = `item-${count + 1}`;
    let newItemContent: string = `Content of item ${count + 1}.`;
    let newItemsIdsArr = columns[targetKey].itemsIds.unshift(newItemId);
    console.log("newItemsIdsArr:", newItemsIdsArr);
    // Create new Item to update Items 
    const newItemList = {
      ...itemList,
      [itemList.newItemId.id]: newItemId,
      [itemList.newItemId.content]: newItemContent
    }
    console.log("newItemList:", newItemList);
    // Create new Item to update columns
    const newColumns = {
      ...columns,
      [columns[targetKey].itemsIds]: newItemsIdsArr
    }
    console.log("newColumns:", newColumns);
    // update dataState 
    const newDataState = {
      ...dataState,
      items: newItemList,
      columns: newColumns
    }
    console.log("newDataState:", newDataState);
    setDataState(newDataState);
  }

  return (
    <BoardColumnWrapper>
      <BoardColumnTitle>
        {props.column.title}
      </BoardColumnTitle>
      <AddButtonDiv>
        <AddButton key={column.id} onClick={onClickAdder} />
      </AddButtonDiv>

      <Droppable droppableId={props.column.id}>
        {(provided, snapshot) => (

          <BoardColumnContent
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {props.items.map((item: any, index: number) => <BoardItem key={item.id} item={item} index={index} />)}
            {provided.placeholder}
          </BoardColumnContent>
        )}
      </Droppable>
    </BoardColumnWrapper>
  )
}