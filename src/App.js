import React, { useState } from 'react';
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import { nanoid } from "nanoid";

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [tasks, setTasks] = useState(props.tasks);

  const [filter, setFliter] = useState("All");

  const fliterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFliter={setFliter}
    />
  ));

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };

    // add newTask to the tasks list.
    setTasks([...tasks, newTask]);
  }

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        id={task.id}
        name={task.name}
        completed={task.completed}
        key={task.id}
        toggleTaskCompleted={toggleTaskCompleted}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    ));

  const tasksNoun = taskList.length > 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  // to change the status if the checkbox is selected
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  // to delete a task by id
  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);

    setTasks(remainingTasks);
  }

  // to edit task (change name)
  function editTask(id, newName) {
    const editedTasks = tasks.map((task) => {
      if (id === task.id) {
        //
        return { ...task, name: newName };
      }
      return task;
    });

    setTasks(editedTasks);
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>

      <Form addTask={addTask} />

      <div className="filters btn-group stack-exception">
        {fliterList}
      </div>


      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">

        {/* <Todo name="Eat" complete={true} id="todo-0" />
        <Todo name="PTE" complete={false} id="todo-1" />
        <Todo name="Running" complete={false} id="todo-2" /> */}

        {taskList}

      </ul>
    </div>
  );
}

export default App;
