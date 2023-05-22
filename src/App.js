import "./App.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { FaTrash, FaPlus } from "react-icons/fa";
import Form from "react-bootstrap/Form";

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  function addItem() {
    if (!newItem) {
      alert("Enter an item..");
      return;
    }

    const item = {
      id: Math.floor(Math.random() * 1000),
      value: newItem,
    };
    setItems((oldItems) => [...oldItems, item]);
    setNewItem("");
  }
  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    setItems(newArray);
  }

  return (
    <>
      <div className="container">
        <h1>Todo List App</h1>
        <div className="row">
          <Form>
            <div className="col-9">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Bugün ne yapılacak?"
                  onChange={(e) => setNewItem(e.target.value)}
                  value={newItem}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-3">
              <Button
                variant="success"
                className="btn-sm" 
                onClick={() => addItem()}
              >
                <FaPlus />
              </Button>
            </div>
            <div className="col-12">
              <ul>
                {items.map((item) => {
                  return (
                    <li key={item.id}>
                      {item.value}
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteItem(item.id)}
                      >
                        <FaTrash />
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default App;
