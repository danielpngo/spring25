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

  const addItem = (event) => {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let formDataObj = Object.fromEntries(formData.entries());
    formDataObj.cost = parseFloat(formDataObj.cost || 0);

    setShoppingList([...shoppingList, formDataObj]);
    form.reset();
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
