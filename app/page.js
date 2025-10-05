"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import UserProfile from './components/UserProfile';
import Loading from './components/Loading';

const TodoApp = () => {
  const route = useRouter()
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null); // Track which todo is being edited
  const [editInput, setEditInput] = useState(""); // Store the edited text
  const [serverResponse, setServerResponse] = useState({})
  
  const [loading, setLoading] = useState(true)


  /////////////////// functions ///////////   

  const fetchTodos = async () => {
    setLoading(true)
    const res = await fetch("/api/todos")
    const data = await res.json()

    if (data.error) {
      setServerResponse(data)
      route.push("/login")
    } else {
      setTodos(data)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async () => {
    if (inputValue.trim() !== '') {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify({ text: inputValue })
      })
      const data = await res.json()
      if (data.error) {
        setServerResponse(data)
        route.push("/login")

      } else {
        setTodos([data, ...todos])
        setInputValue('');
      }
    }
  };

  const toggleTodo = async (id, completed) => {
    const res = await fetch(`/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ completed: !completed })
    })

    const updatedTodo = await res.json()
    setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
  };

  const deleteTodo = async (id) => {
    await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })
    setTodos(todos.filter(todo => todo.id !== id))
  };

  // Start editing a todo
  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditInput(todo.text);
  };

  // Save the edited todo
  const saveEdit = async (id) => {
    if (editInput.trim() !== '') {
      const res = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: editInput })
      })

      const updatedTodo = await res.json()
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo))
      setEditingId(null);
      setEditInput("");
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditInput("");
  };


  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  if(loading) return <Loading />

  return (
    <div className=" flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="container md:w-[60%] mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white text-center">Todo App</h1>
              <p className="text-blue-200 text-center mt-2">
                {completedCount} of {totalCount} tasks completed
              </p>
            </div>

            {/* User Profile Dropdown */}
            <UserProfile />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        {/* Add Todo Form */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={addTodo}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>

        {/* Server Error Message */}
        {serverResponse.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm text-center">{serverResponse.error}</p>
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex border-b border-gray-200">
          {['all', 'active', 'completed'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`flex-1 py-3 text-sm font-medium transition-colors duration-200 cursor-pointer ${filter === filterType
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        {/* Todo List */}
        <div className="max-h-96 overflow-y-auto">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <svg className="w-16 h-16 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="mt-2">{loading ? "Loading todos..." : "No tasks found"}</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredTodos.map((todo) => (
                <li key={todo.id} className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <button
                        onClick={() => toggleTodo(todo.id, todo.completed)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 cursor-pointer ${todo.completed
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-green-500'
                          }`}
                      >
                        {todo.completed && (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>

                      {/* Edit Mode vs View Mode */}
                      {editingId === todo.id ? (
                        <div className="flex-1 flex gap-2">
                          <input
                            value={editInput}
                            onChange={(e) => setEditInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && saveEdit(todo.id)}
                            className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                          />
                          <div className="flex gap-1">
                            <button
                              onClick={() => saveEdit(todo.id)}
                              className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 cursor-pointer"
                            >
                              Save
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600 cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span
                          className={`text-lg flex-1 ${todo.completed
                              ? 'line-through text-gray-400'
                              : 'text-gray-700'
                            }`}
                        >
                          {todo.text}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      {editingId !== todo.id && (
                        <button
                          onClick={() => startEdit(todo)}
                          disabled={todo.completed}
                          className={`p-1 rounded transition-colors duration-200 cursor-pointer ${todo.completed
                              ? 'text-gray-300 cursor-not-allowed'
                              : 'text-gray-400 hover:text-blue-500'
                            }`}
                          title={todo.completed ? "Cannot edit completed todo" : "Edit todo"}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1 rounded cursor-pointer"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Stats */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total: {totalCount}</span>
            <span>Completed: {completedCount}</span>
            <span>Remaining: {totalCount - completedCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;