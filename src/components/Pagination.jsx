import React from "react";

function Pagination({ len, currentPage, setCurrentPage }) {
  const totalButtons = Math.ceil(len / 10); // Total number of buttons to display
  const buttons = [];
  for (let i = 1; i <= totalButtons; i++) {
    buttons.push(
      <button key={i} onClick={() => handleButtonClick(i)}>
        {i}
      </button>
    );
  }
  function handleButtonClick(i) {
    setCurrentPage(i);
    // console.log(i);
  }

  function firstClick(){

  } 

  return (
    <>
      <div></div>  
      <div>
        <button onClick={() => setCurrentPage(1)}>First</button>
        {buttons}
        <button onClick={() => setCurrentPage(totalButtons)}>Last</button>
        </div>
    </>
  );
}

export default Pagination;
