import React from 'react';
import Header from '../components/Header';
import useHomePage from '../hooks/use-home-page.hook';

function HomePage(): JSX.Element {
  const {
    dragStartHandler,
    dragEndHandler,
    dragOverHandler,
    dragEnterHandler,
    dragLeaveHandler,
    dragDropHandler,
    createTodo,
    closeButtonHandler
  } = useHomePage();

  return (
    <>
      <Header />
      <div className="flex py-2 px-4 items-center justify-around overflow-hidden w-screen h-screen relative ">
        <div
          className="rounded shadow-lg w-[300px] min-h-full bg-yellow-500  py-1 px-4"
          onDragEnter={dragEnterHandler}
          onDragOver={dragOverHandler}
          onDragLeave={dragLeaveHandler}
          onDrop={dragDropHandler}
        >
          <div
            className="flex flex-col py-2 px-4 w-full h-[150px] bg-white mb-2 "
            draggable={true}
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            id="3"
          >
            <h1>Title:1</h1>
            <p>description:</p>
            <p>importance:</p>
          </div>
          <div
            className="flex flex-col py-2 px-4 w-full h-[150px] bg-white mb-2 "
            draggable={true}
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            id="1"
          >
            <h1>Title:3</h1>
            <p>description:</p>
            <p>importance:</p>
          </div>
          <div
            className="flex flex-col py-2 px-4 w-full h-[150px] bg-white mb-2 "
            draggable={true}
            onDragStart={dragStartHandler}
            onDragEnd={dragEndHandler}
            id="2"
          >
            <h1>Title:2</h1>
            <p>description:</p>
            <p>importance:</p>
          </div>
        </div>
        <div
          className="rounded shadow-lg w-[300px] min-h-full bg-yellow-500  py-1 px-4"
          onDragEnter={dragEnterHandler}
          onDragOver={dragOverHandler}
          onDragLeave={dragLeaveHandler}
          onDrop={dragDropHandler}
        >
          2
        </div>
        <div
          className="rounded shadow-lg w-[300px] min-h-full bg-yellow-500  py-1 px-4"
          onDragEnter={dragEnterHandler}
          onDragOver={dragOverHandler}
          onDragLeave={dragLeaveHandler}
          onDrop={dragDropHandler}
        >
          3
        </div>
        {createTodo && (
          <div className="flex items-center w-screen h-screen bg-black absolute justify-center bg-opacity-50">
            <div className="flex flex-col py-2 px-4 items-center justify-center bg-white w-[350px] h-[350px] rounded  ">
              <form className="flex flex-col items-start justify-center py-4 px-4 w-[350px] h-[350px]">
                <input
                  type="text"
                  placeholder="Title"
                  className="mb-2 shadow-lg rounded border-2 h-[30px] px-2 py-2"
                />
                <textarea
                  className="mb-2 shadow-lg rounded border-2"
                  style={{ resize: 'none' }}
                  cols={30}
                  rows={3}
                />
                <select className="shadow-lg rounded border-2 mb-4">
                  <option className="shadow-lg rounded border-2">Low</option>
                  <option className="shadow-lg rounded border-2">Medium</option>
                  <option className="shadow-lg rounded border-2">High</option>
                </select>
                <div>
                  <button
                    className=" mr-2 shadow-lg bg-red-500 text-white rounded border-2 w-[100px]"
                    onClick={closeButtonHandler}
                  >
                    Close
                  </button>
                  <button className=" shadow-lg rounded border-2 w-[100px] bg-green-500 text-white">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default HomePage;
