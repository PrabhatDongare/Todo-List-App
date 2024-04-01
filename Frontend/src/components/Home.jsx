import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';
import { showTodoType, fetchShowTodoData, fetchAddTodoData, fetchDeleteTodoData, fetchEditTodoData } from '../redux/storeTodos/storeTodosSlice';

const Home = () => {
    const storeTodos = useSelector((state) => state.storeTodos.todos)
    const { todoType } = useSelector((state) => state.storeTodos)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const inputRef = useRef(null);

    const filteredTodos = storeTodos.filter((todo) => {
        if (todoType === 1) {
            return !todo.completed
        }
        else if (todoType === 2) {
            return todo.completed
        }
        else {
            return todo.completed || !todo.completed
        }
    })

    function handleEditTodo(todo) {
        inputRef.current.value = todo.text;
        dispatch(fetchDeleteTodoData({ id: todo.id }))
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            dispatch(fetchShowTodoData())
        }
        else {
            navigate('/login')
        }
    }, []);    

    return (
        <>
            <div className='w-[100%] custom-bg py-10 md:py-5 min-h-[83.9vh]'>
                <div className=" border-2 mx-auto 2xl:w-[45%] xl:w-[70%] md:w-[95%] rounded-xl  px-7 py-7 md:py-3 text-lg sm:text-base">
                    <div>
                        <h1 className='text-center text-2xl font-medium underline mb-5 md:mb-2 md:text-xl sm:text-lg '>Your Todos</h1>
                        <h1 className='mb-3 font-bold '>Add a Todo</h1>

                        {/* Take Todo Input */}
                        <div className='mb-5 text-center flex lg:flex-wrap lg:justify-center'>
                            <input ref={inputRef} type="text" id='todoText' className='rounded-md py-1 w-[84%] lg:w-[100%] lg:mb-3 px-3 opacity-70' maxLength={60} />
                            <button onClick={() => {
                                if (inputRef.current.value.length > 1) {
                                    dispatch(fetchAddTodoData({ text: inputRef.current.value, completed: false }))
                                }
                                else {
                                    toast.error("2 to 60 characters allowed in todo")
                                }
                                inputRef.current.value = null
                            }} className="btn ml-5 bg-purple-600 border-purple-900 text-white font-semibold rounded-md px-5 h-8">Save</button>
                        </div>

                        {/* Radio Buttons */}
                        <div className='flex justify-evenly gap-x-3 gap-y-1 flex-wrap md:text-base sm:justify-center'>
                            <label htmlFor="rb1" className='cursor-pointer'>
                                <input type="radio" name="rb" id="rb1" value="1" checked={todoType == 1 ? true : false} onChange={() => dispatch(showTodoType(1))} /> <span className='pl-1 '>Active Todos</span>
                            </label>

                            <label htmlFor="rb2" className='cursor-pointer'>
                                <input type="radio" name="rb" id="rb2" value="2" checked={todoType == 2 ? true : false} onChange={() => dispatch(showTodoType(2))} /> <span className='pl-1'>Completed Todos</span>
                            </label>

                            <label htmlFor="rb3" className='cursor-pointer'>
                                <input type="radio" name="rb" id="rb3" value="3" checked={todoType == 3 ? true : false} onChange={() => dispatch(showTodoType(3))} /> <span className='pl-1'>Full Todo List</span>
                            </label>
                        </div>

                        <div className="line border-b-2 m-5 w-[90%] mx-auto"></div>

                        {/* Displaying Todos */}
                        <div>
                            <h1 className='mb-2 font-bold'>Your Todos</h1>

                            {!storeTodos.length && <div className="text-xs font-bold drop-shadow-md text-center">no Todos to display </div>}
 
                            <div>
                                {filteredTodos.map((todo) => {
                                    return (
                                        <div className='todo flex justify-between my-2 flex-wrap sm:flex-col' key={todo.id}>
                                            <div>
                                                <label >
                                                    <input type="checkbox" name="todoCheckbox" id={todo.id} className="mr-5" checked={todo.completed ? true : false} onChange={() => { dispatch(fetchEditTodoData({ id: todo.id, completed: todo.completed })) }} />
                                                    <span className={`${todo.completed ? 'line-through' : ''} overflow-hidden`} >{todo.text}</span>
                                                </label>
                                            </div>

                                            <div className="flex gap-4 ">
                                                <button className='bg-purple-700 text-white rounded-md p-1 text-lg' onClick={async () => { handleEditTodo(todo) }}> <FaEdit /> </button>
                                                <button className='bg-purple-700 text-white rounded-md p-1 text-lg' onClick={async () => { dispatch(fetchDeleteTodoData({ id: todo.id })) }}> <MdDelete /> </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home








