import React, { useEffect } from 'react';
import Header from '../components/Header';
import useHomePage from '../hooks/use-home-page.hook';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { EnumImportance } from '../shared/consts/enum';
import TodoSection from '../components/TodoSection';
import Loader from '../components/Loader';
import { useDispatch } from 'react-redux';
import { addTodo, setTodo } from '../store/slices/todoSlice';

// import Todo from '../components/Todo';

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
  const dispatch = useDispatch();

  const getDataHandler = async () => {
    dispatch(setTodo([]));
    const todoRef = collection(db, 'todo');
    const q = query(todoRef, where('Email', '==', `${email?.toLocaleLowerCase()}`));
    const Snapshot = await getDocs(q);
    Snapshot.forEach((doc) => {
      const { Title, Description, Importance, Status } = doc.data();
      const todo = {
        title: Title,
        description: Description,
        importance: Importance,
        status: Status,
        id: doc.id
      };
      dispatch(addTodo(todo));
    });
    setIsLoaded(false);
  };

  const submitButtonHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    await addDoc(collection(db, 'todo'), {
      Title: `${titleValue}`,
      Description: `${textareaValue}`,
      Importance: `${selectValue}`,
      Email: `${email?.toLocaleLowerCase()}`,
      Status: 'Назначено'
    });
    getDataHandler();
    setIsLoaded(true);
    if (setCreateTodo) {
      setCreateTodo(false);
    }
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
      <div className="flex py-2 px-4 items-center justify-center overflow-hidden w-screen h-screen relative ">
        {isLoaded && <Loader />}
        {blocks.map((item, index) => {
          return (
            <TodoSection
              key={index}
              item={item}
              index={index}
              dragEnterHandler={dragEnterHandler}
              dragOverHandler={dragOverHandler}
              dragLeaveHandler={dragLeaveHandler}
              dragDropHandler={dragDropHandler}
              dragStartHandler={dragStartHandler}
              dragEndHandler={dragEndHandler}
            />
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
                  defaultValue={EnumImportance.LOW}
                >
                  <option value={EnumImportance.LOW}>Low</option>
                  <option value={EnumImportance.MEDIUM}>Medium</option>
                  <option value={EnumImportance.HIGH}>High</option>
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
