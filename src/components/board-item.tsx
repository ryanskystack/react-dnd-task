import * as React from 'react';
import { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
// Import BoardItem component
import { Button } from './button';

// Define types for board item element properties
type BoardItemProps = {
  item: any,
  index: any,
  column: any,
  editState: any,
  setEditState: any,
  confirmState: any,
  setConfirmState: any,
  dataState: any,
  setDataState: any
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
    cursor: pointer;
  }

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
  const { item, index, column, editState, setEditState, confirmState, setConfirmState, dataState, setDataState } = props;
  const [inputState, setInputState] = useState<any>(item.content);
  console.log('Item,Props:', props);
  // Create handler for update the input content of item 
  const changeHanddler = (e: any) => {
    console.log('change:e:', e.target.value)
    console.log('change:item:', item)
    if (!e.target.value || e.target.value === null || e.target.value === '') {
      setInputState(item.content);
    } else { setInputState(e.target.value); }
  }
  // Create handler for confirming the input content of item 
  const confirmHandler = (e: any) => {
    console.log('confirm,e:', e.target);
    item.content = inputState;
    item['isActive'] = !item['isActive'];
    console.log('confirm,editState:', editState)
    console.log('confirm,confirmState:', confirmState)
    item === editState && setEditState('');
    console.log('confirm,item:', item)
    setConfirmState(item);
  }

  // Create handler for deleting the item 
  const deleteHandler = (e: any) => {
    console.log('e.target:', e.target);
    let columnId: string = e.target.id.substr(6, 8);

    let itemId = e.target.id.substring(14);
    console.log('delete columnId', columnId);
    console.log('delete itemId', itemId);
    console.log('dataState', dataState);
    console.log(dataState.items[`${itemId}`]);
    delete dataState.items[`${itemId}`];
    let itemsIds = dataState.columns[`${columnId}`].itemsIds;
    console.log('column:', dataState.columns[`${columnId}`]);
    console.log('old itemsIds:', itemsIds);
    for (let i = 0; i < itemsIds.length; i++) {
      if (itemsIds[i] === itemId) {
        itemsIds.splice(i, 1);
        i--;
      }
    }
    console.log('New itemsIds:', itemsIds);

    console.log('dataState:', dataState);
    //       console.log('Object.values(itemsIds):',column.columnId);


    // // Create new Item to update Items 
    // let newItem = {
    //   id: newItemId,
    //   content: '',
    //   isActive: true
    // };
    // itemList[`${newItemId}`] = newItem;

    // // update dataState (update items list as well)
    // const newDataState = {
    //   ...dataState,
    //   items: itemList
    // }
    // setDataState(newDataState);



    setDataState(dataState);


  }


  //Create handler for editting the item by click the item itself
  const editHandler = (e: any) => {
    console.log('edit,e:', e.target);
    item['isActive'] = true;
    console.log('edit,editState:', editState);
    console.log('edit,confirmState:', confirmState);
    item === confirmState && setConfirmState('');
    console.log('edit: item', item);
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
              {item.content !== '' ?
                <InputEl autoFocus type="text" onChange={changeHanddler} placeholder={item.content} value={inputState} />
                :
                <InputEl autoFocus type="text" onChange={changeHanddler} placeholder='New content of item' value={inputState} />
              }
              <Button variant='confirm' key={`confirm${item.id}`} id={`confirm${column.id}${item.id}`} onClick={confirmHandler} />
              <Button variant='delete' key={`delete${item.id}`} id={`delete${column.id}${item.id}`} onClick={deleteHandler} />
            </InputWrapperEl>

            )
            :
            <div id={item.id} key={item.id} onClick={editHandler}>
              {item.content}
            </div>
        }
      </BoardItemEl>
    )}
  </Draggable>
}