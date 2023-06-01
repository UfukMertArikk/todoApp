import "./App.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { FaTrash, FaPlus } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDvckrIVGUYfsp7oHJgQ5VxUnC6-LmX_3s",
  authDomain: "todoapp-f3992.firebaseapp.com",
  projectId: "todoapp-f3992",
  storageBucket: "todoapp-f3992.appspot.com",
  messagingSenderId: "667708468475",
  appId: "1:667708468475:web:81c2af1ef241c7c263545e",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

function App() {
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    getData();
  }, []);

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

    postData(item);
  }
  
  // Verileri getirme işlemi
  const getData = () => {
    const dataRef = ref(database, "todos");

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemArray = Object.keys(data).map((key) => ({
          id: key,
          value: data[key].value,
        }));
        setItems(itemArray);
      } else {
        setItems([]);
      }
    });
  };

  // Veri gönderme işlemi
  const postData = (data) => {
    // Yeni bir eşsiz anahtar oluşturun
    const newKey = push(ref(database, "todos")).key;

    // Veriyi hazırlayın
    const newData = {
      key: newKey,
      ...data,
    };

    // Veriyi gönderin
    return set(ref(database, `todos/${newKey}`), newData)
      .then(() => {
        console.log("Veri başarıyla gönderildi!");
      })
      .catch((error) => {
        console.error("Veri gönderilirken bir hata oluştu:", error);
      });
  };

  // Veri silme işlemi
  const deleteData = (id) => {
    // Silinecek verinin referansını oluşturun
    const itemRef = ref(database, `todos/${id}`);

    // Veriyi silin
    return set(itemRef, null)
      .then(() => {
        console.log("Veri başarıyla silindi!");
      })
      .catch((error) => {
        console.error("Veri silinirken bir hata oluştu:", error);
      });
  };

  function deleteItem(id) {
    const newArray = items.filter((item) => item.id !== id);
    deleteData(id);
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
