import React from 'react';
import Draggable from 'react-draggable';
import './App.css';
import {useEffect, useState} from "react";
import {v4} from "uuid";
import {randomColor} from 'randomcolor'

function App() {
    const [item, setItem] = useState('')
    const [items, setItems] = useState(
        JSON.parse(localStorage.getItem('items'))  || [])

    useEffect(()=>{
        localStorage.setItem('items', JSON.stringify(items))
    },[items])

    function newItem() {
        if(item.trim() !== '') {
            const newItem = {
                id: v4(),
                item: item,
                color: randomColor({
                    luminosity: 'light'
                }),
                defaultPos: {
                    x: -200,
                    y: -200,
                }
            }
            setItems((items) => [...items, newItem])
            setItem('')
        } else {
            setItem('')
        }
    }

    function deleteNode(id) {
        setItems(items.filter((item) => item.id !== id))
    }

    function updatePos(data, index) {
        let newArray = [...items]
        newArray[index].defaultPos = {x: data.x, y: data.y}
        setItems(newArray)
    }

    function keyPress(e) {
        const code = e.keyCode || e.which
        if(code === 13){newItem()}
    }

    return (
        <div className="App">
            <div className="wrapper">
                <input
                    type="text"
                    placeholder='Enter task...'
                    name=""
                    id=""
                    className="inp"
                    value={item}
                    onKeyPress={(e)=> keyPress(e)}
                    onChange={(e)=> setItem(e.target.value)}/>
                <button className="enter" onClick={newItem}>Enter</button>

                {items.map((item, index) => {
                    return (
                        <Draggable
                            onStop ={(_,data)=> {
                                updatePos(data, index)
                            }}
                            key ={index}
                            defaultPosition = {item.defaultPos}
                        >
                        <div>
                            <div className="todo__item" style={{background: item.color}}>{`${item.item}`}
                            <button className='delete'
                            onClick={()=>deleteNode(item.id)}>X</button>
                            </div>
                        </div>
                    </Draggable>)
                })
                }



                </div>
            </div>
    );
}

export default App;