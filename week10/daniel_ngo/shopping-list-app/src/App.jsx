import { useState } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import ShoppingList from './ShoppingList';

function App() {
  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://vite.dev" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.jsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )

  const [shoppingList, setShoppingList] = useState([]);
  const [budget] = useState(100);

  const [selectMonth, setMonth] = useState('');
  const [selectDay, setDay] = useState('');

  const months = {
    1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30,
    7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31
  };

  const monthChange = (e) => {
    const month = e.target.value;
    setMonth(month);
    setDay('');
  };

  const dayChange = (e) => {
    setDay(e.target.value);
  };

  const addItem = (event) => {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let formDataObj = Object.fromEntries(formData.entries());
    formDataObj.cost = parseFloat(formDataObj.cost || 0);
    formDataObj.date = `${selectMonth}-${selectDay}`;
    formDataObj.index = shoppingList.length;

    setShoppingList([...shoppingList, formDataObj]);
    form.reset();
    setMonth('');
    setDay('');
  };

  const removeItem = (event) => {
    const name = event.target.value;
    setShoppingList(shoppingList.filter(item => item.name !== name));
  }

  return (
    <>
      <h1> Shopping List Manager </h1>
      <div className='card'>
        <form onSubmit={addItem} className='flex-apart'>

          <input type="text" name="name" placeholder='Add item to list...' />
          
          <input type="number" name="cost" placeholder='Cost'/>

          <select name="category" required>
            <option value=""> Select category </option>
            <option value="grocery">Grocery</option>
            <option value="school">School</option>
            <option value="technology">Technology</option>
            <option value="home">Home</option>
            <option value="other">Other</option>
          </select>

          {/* Month Dropdown */}
          <select value={selectMonth} onChange={monthChange}>
            <option value="">Select Expiry Month</option>
            {[...Array(12)].map((_, index) => (
              <option key={index} value={index + 1}>{index + 1}</option>
            ))}
          </select>
          
          {/* Day Dropdown */}
          <select value={selectDay} onChange={dayChange} disabled={!selectMonth}>
            <option value="">Select Expiry Day</option>
            {selectMonth && [...Array(months[selectMonth])].map((_, dayIndex) => (
              <option key={dayIndex} value={dayIndex + 1}>{dayIndex + 1}</option>
            ))}
          </select>

          <button className='btn purple' type='submit'>Add</button>
        </form>
      </div>

      <ShoppingList
        shoppingList={shoppingList}
        removeItem={removeItem}
        budget={budget}
      />
    </>
  );
}

export default App;

// function ShoppingList({ shoppingList, removeItem}) {
//   // const totalSpent = shoppingList.reduce((acc, item) => acc + Number(item.cost), 0);
//   // const remainingBudget = ;

//   return (
//     <>
//       {/* <h2> Remaining Budget: ${remainingBudget.toFixed(2)} </h2> */}
//       {shoppingList.map((val, index) => (
//         <div
//           className={val.purchased ? 'card flex-apart green' : 'card flex-apart'}
//           key={index}
//         >
//           <span>{val.name}</span>
//           <span>
//             <button className='btn' onClick={removeItem}
//             value={val.name}>x</button>
//           </span>
//         </div>
//       ))}
//     </>
//   )
// }

// export default ShoppingList;
