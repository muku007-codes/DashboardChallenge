import React from "react";

function Pagination({ len, currentPage, setCurrentPage }) {
  const totalButtons = Math.ceil(len / 10); // Total number of buttons to display
  const buttons = [];
  for (let i = 1; i <= totalButtons; i++) {
    buttons.push(
      <button className={i==currentPage ?'page-hold page-btn': 'page-btn'} key={i} onClick={() => handleButtonClick(i)}>
        {i}
      </button>
    );
  }

  function handleButtonClick(i) {
    setCurrentPage(i);
  }

  function nextbtn(){
    if(currentPage < totalButtons)
      setCurrentPage(currentPage + 1);
  }

  function prevbtn(){
    if(currentPage  > 1)
      setCurrentPage(currentPage - 1);
  }

  return (
    <>
      <div className="pagebtn-container">
        <button className="page-btn" onClick={() => setCurrentPage(1)}>
          First
        </button>
        <button className="page-btn" onClick={prevbtn}>
          Previous
        </button>
        {buttons}
        <button className="page-btn" onClick={nextbtn}>
          Next
        </button>
        <button
          className="page-btn"
          onClick={() => setCurrentPage(totalButtons)}
        >
          Last
        </button>
      </div>
    </>
  );
}

export default Pagination;
