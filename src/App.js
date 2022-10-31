import { useEffect, useState } from "react";
import "./App.css";
import List from "./components/List";
import Alert from "./components/Alert";


const getLocalStorage=()=>{
  const list=localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  else{
    return []
  }
}

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, mesage: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setAlert({show:true,mesage:'plese enter value', type:'danger'})
    } else if (name && isEditing) {
       const newList= list.map((item)=>{
        if(item.id===editId) {
         return {...item, title: name}
        }
        return item
       }) 
      setList(newList)
      setName('')
      setEditId(null)
      setIsEditing(false)
      setAlert({show:true,mesage:'you edited the item', type:'success'})

    } else {
      setAlert({show:true,mesage:'succesful', type:'success'})
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const clearItems=()=>{
    setAlert({show:true,mesage:'all items deleted', type:'success'})
    setList([])
  }

  const removeItem=(id)=>{
    setAlert({show:true,mesage:'item removed', type:'success'})
    const newList=list.filter((item)=>item.id!==id)
    setList(newList)
  }

  const editItem=(id)=>{
    const item=list.find((item)=>item.id===id)
      setName(item.title)
      setIsEditing(true)
      setEditId(id)
  }

  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])



  return (
    <section className="section-center">
      <form className="form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} setAlert={setAlert} list={list}/>}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="gro-input"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container" >
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-items-btn" onClick={clearItems}>clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;
