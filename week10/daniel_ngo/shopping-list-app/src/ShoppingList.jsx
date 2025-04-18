import { useState } from 'react';

function ShoppingList({ shoppingList, removeItem, budget}) {
    const [sortConfig, setSort] = useState({ key: null, direction: null});

    const totalSpent = shoppingList.reduce((acc, item) => acc + Number(item.cost), 0);
    const remainingBudget = budget - totalSpent;

    const sortedList = [...shoppingList].sort((a, b) => {
      const { key, direction } = sortConfig;
      if (!key || !direction) {
        return a.index - b.index;
      }
      let aValue = a[key];
      let bValue = b[key];

      if (key == 'cost') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else {
        aValue = aValue?.toString().toLowerCase();
        bValue = bValue?.toString().toLowerCase();
      }

      if (aValue < bValue) {
        if (sortConfig.direction == 'asc') {
          return -1;
        } else {
          return 1;
        }
      }

      if (aValue > bValue) {
        if (sortConfig.direction == 'asc') {
          return 1;
        } else {
          return -1;
        }
      }

      return 0;
    });

    const requestSort = (key) => {
      setSort(prev => {
        if (prev.key != key) return { key, direction: 'asc'};
        if (prev.direction == 'asc') return { key, direction: 'desc'};
        if (prev.direction == 'desc') return { key: null, direction: null };
        return {key, direction: 'asc'};
      });
    }

    const sortIndicator = (key) => {
      if (sortConfig.key != key) return '';
      return sortConfig.direction == 'asc' ? '▲' : sortConfig.direction == 'desc' ? '▼' : '';
    };
  
    // return (
    //   <>
    //     <h2> Remaining Budget: ${remainingBudget.toFixed(2)} </h2>
    //     {shoppingList.map((val, index) => (
    //       <div
    //         className={val.purchased ? 'card flex-apart green' : 'card flex-apart'}
    //         key={index}
    //       >
    //         <span>{val.name}: ${Number(val.cost).toFixed(2)}</span>
    //         <span>
    //           <button className='btn' onClick={removeItem}
    //           value={val.name}> x </button>
    //         </span>
    //       </div>
    //     ))}
    //   </>
    // )
    return (
      <>
        <h2> Remaining Budget: ${remainingBudget.toFixed(2)} </h2>
        <table className='shopping-table'>
          <thead>
            <tr>
              <th onClick={() => requestSort('name')}>Name {sortIndicator('name')}</th>
              <th onClick={() => requestSort('cost')}>Cost {sortIndicator('cost')}</th>
              <th onClick={() => requestSort('category')}>Category {sortIndicator('category')}</th>
              <th onClick={() => requestSort('date')}>Expiry Date {sortIndicator('date')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sortedList.map((val, index) => (
              <tr key={index} className={val.purchased ? 'green' : ''}>
                <td>{val.name}</td>
                <td>{Number(val.cost).toFixed(2)}</td>
                <td>{val.category}</td>
                <td>{val.date}</td>
                <td>
                  <button className='btn' onClick={removeItem} value={val.name}>x</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  }
  
  export default ShoppingList;