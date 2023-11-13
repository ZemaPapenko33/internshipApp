import React, { useEffect } from 'react';
import Header from '../components/Header';
import useHomePage from '../hooks/use-home-page.hook';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useForm } from '../context';
import { useNavigate } from 'react-router-dom';

function HomePage(): JSX.Element {
  const blocks = ['Назначено', 'В процессе', 'Закончен'];
  const { email } = useForm();
  const {
    dragStartHandler,
    dragEndHandler,
    dragOverHandler,
    dragEnterHandler,
    dragLeaveHandler,
    dragDropHandler,
    createTodo,
    setCreateTodo,
    closeButtonHandler,
    selectValue,
    titleValue,
    textareaValue,
    titleInputChangeHandler,
    textareaChangeHandler,
    selectChangeHandler
  } = useHomePage();
  const navigateToLoginPage = useNavigate();
  const user = localStorage.getItem('user');

  const submitButtonHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    await addDoc(collection(db, 'todo'), {
      Title: `${titleValue}`,
      Description: `${textareaValue}`,
      Importance: `${selectValue}`,
      Email: `${email.toLocaleLowerCase()}`
    });
    if (setCreateTodo) {
      setCreateTodo(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigateToLoginPage('/login');
    }
  }, [user]);

  return (
    <>
      <Header />
      <div className="flex py-2 px-4 items-center justify-around overflow-hidden w-screen h-screen relative ">
        {blocks.map((item, index) => {
          return (
            <div
              key={index}
              className="rounded shadow-lg w-[300px] min-h-full bg-yellow-500 py-1 px-4"
              onDragEnter={dragEnterHandler}
              onDragOver={dragOverHandler}
              onDragLeave={dragLeaveHandler}
              onDrop={dragDropHandler}
            >
              <h1 className="bg-white mb-2 px-4">{item}</h1>
              <div
                className="flex flex-col py-2 px-4 w-full h-[150px] bg-white mb-2 "
                draggable={true}
                onDragStart={dragStartHandler}
                onDragEnd={dragEndHandler}
                id={`${index}`}
              >
                <h1>Title:{item}</h1>
                <p>description:</p>
                <p>importance:</p>
              </div>
            </div>
          );
        })}
        {createTodo && (
          <div className="flex items-center w-screen h-screen bg-black absolute justify-center bg-opacity-50">
            <div className="flex flex-col py-2 px-4 items-center justify-center bg-white w-[350px] h-[350px] rounded  ">
              <form className="flex flex-col items-start justify-center py-4 px-4 w-[350px] h-[350px]">
                <input
                  type="text"
                  placeholder="Title"
                  className="mb-2 shadow-lg rounded border-2 h-[30px] px-2 py-2"
                  onChange={titleInputChangeHandler}
                />
                <textarea
                  className="mb-2 shadow-lg rounded border-2"
                  style={{ resize: 'none' }}
                  cols={30}
                  rows={3}
                  placeholder="Description"
                  onChange={textareaChangeHandler}
                />
                <select
                  className="shadow-lg rounded border-2 mb-4"
                  onChange={selectChangeHandler}
                  value={selectValue}
                >
                  <option value="Low" selected>
                    Low
                  </option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <div>
                  <button
                    className=" mr-2 shadow-lg bg-red-500 text-white rounded border-2 w-[100px]"
                    onClick={closeButtonHandler}
                  >
                    Close
                  </button>
                  <button
                    className=" shadow-lg rounded border-2 w-[100px] bg-green-500 text-white"
                    onClick={submitButtonHandler}
                  >
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
