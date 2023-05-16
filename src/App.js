import Button from 'react-bootstrap/Button';
import './App.css';
import { useState } from 'react';

function App() {
const [newItem , setNewItem] = useState("");
const[items,setItems]=useState([]);

function addItem(){
  if(!newItem){
    alert("Enter an item..")
    return;
  }

const item = {
  id: Math.floor(Math.random()*1000),
  value: newItem
}
setItems(oldItems => [...oldItems,item])
setNewItem("");
}
function deleteItem(id){
  const newArray = items.filter(item => item.id !== id );
  setItems(newArray);
}

  return (
    <div className="App">
     <h1>Todo List App</h1>


     <input
     type="text"
     placeholder="Add an item"
     value={newItem}
     onChange={e => setNewItem(e.target.value)}
     />

<button onClick={()=> addItem()}> Add </button>
<ul>
{items.map(item =>{
return(
  <li key={item.id}>{item.value}
  <button onClick={()=>deleteItem(item.id)} >X</button>
  </li>
)

})}

</ul>
      
    </div>
  );
}

export default App;
