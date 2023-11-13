import React, { useEffect } from 'react';
import Header from '../components/Header';
import useHomePage from '../hooks/use-home-page.hook';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function HomePage(): JSX.Element {
  const blocks = ['Назначено', 'В процессе', 'Закончен'];
  const email = localStorage.getItem('email');
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
    selectChangeHandler,
    isLoaded,
    setIsLoaded
  } = useHomePage();
  const navigateToLoginPage = useNavigate();
  const user = localStorage.getItem('user');

  const submitButtonHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    await addDoc(collection(db, 'todo'), {
      Title: `${titleValue}`,
      Description: `${textareaValue}`,
      Importance: `${selectValue}`,
      Email: `${email?.toLocaleLowerCase()}`
    });
    if (setCreateTodo) {
      setCreateTodo(false);
    }
  };
  const getDataHandler = async () => {
    const todoRef = collection(db, 'todo');
    const q = query(todoRef, where('Email', '==', 'papenko03@mail.ru'));
    const Snapshot = await getDocs(q);
    setIsLoaded(false);
    Snapshot.forEach((doc) => {
      const { Title, Description, Importance } = doc.data();
      // console.log(`${JSON.stringify(doc.data())}`);
      console.log(Title, Description, Importance);
    });
  };

  useEffect(() => {
    if (!user) {
      navigateToLoginPage('/login');
    }
  }, [user]);

  useEffect(() => {
    getDataHandler();
  }, []);

  return (
    <>
      <Header />
      <div className="flex py-2 px-4 items-center justify-around overflow-hidden w-screen h-screen relative ">
        {isLoaded && (
          <div
            role="status"
            className="w-screen h-screen absolute bg-white flex items-center justify-center"
          >
            <svg
              aria-hidden="true"
              className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
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
                    onClick={() => {
                      if (setCreateTodo) {
                        setCreateTodo(false);
                      }
                    }}
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
