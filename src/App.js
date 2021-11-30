import "./App.css";
import contacts from './contacts.json'
import React, {useState} from "react";

let rest = contacts.slice(5)

function App() {
  const [contactArr, setNewContact] = useState(contacts.slice(0,5))
  
  const addRandom = () => {
    if (rest.length !== 0){
      const randomNum =  Math.floor(Math.random()*rest.length)
      const randomContact = rest[randomNum]
      rest.splice(randomNum, 1) 
      console.log(rest)
    setNewContact(contactArr => [...contactArr, randomContact])
    } 
  }

  const sortName = () => {    
    setNewContact(contactArr => {
      const newArr = contactArr.sort((a,b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
      return [...newArr]
    })
  }

  const sortPopularity = () => {
    setNewContact(contactArr => {
      const newArr = contactArr.sort((a,b) => b.popularity - a.popularity)
      return [...newArr]
    })
  }
  
  const deleteContact = id => {
    const newArr = contactArr.filter((contact) => id !== contact.id)
   setNewContact([...newArr])
  }

  const list = contactArr.map((contact) => {
    const {id, name, pictureUrl, popularity, wonEmmy, wonOscar} = contact
    return ( 
      <tr key={id}>
        <td> <img src={pictureUrl} alt={name} className='picture'/></td>
        <td>{name}</td>
        <td>{parseFloat(popularity).toFixed(2)}</td>
        <td>{wonEmmy ? '🏆' : ''}</td>
        <td>{wonOscar ? '✨' : ''}</td>
        <td><button onClick={() => deleteContact(id)}>Delete</button></td>
      </tr>
    )
  })


  return (
    <div className="App">
    <button onClick={addRandom}>Add random</button>
    <button onClick={sortName}>Sort by Name</button>
    <button onClick={sortPopularity}>Sort by Popularity</button>
      <table className='list'>
        <thead>          
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Emmy</th> 
            <th>Oscar</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list}
        </tbody>
      </table>
    </div>
  );
}
export default App;