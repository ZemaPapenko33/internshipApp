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
    createTodo
  } = useHomePage();

  return (
    <>
      <Header />
      <div className="flex py-2 px-4 items-center justify-around overflow-hidden w-screen h-screen ">
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
      </div>
      {createTodo && <div className="w-screen h-screen bg-black"></div>}
    </>
  );
}

export default HomePage;
