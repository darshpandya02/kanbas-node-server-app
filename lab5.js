// const assignment = {
//   id: 1,
//   title: "NodeJS Assignment",
//   description: "Create a NodeJS server with ExpressJS",
//   due: "2021-10-10",
//   completed: false,
//   score: 0,
// };
// const Lab5 = (app) => {
//   app.get("/a5/assignment", (req, res) => {
//     res.json(assignment);
//   });
//   app.get("/a5/assignment/title", (req, res) => {
//     res.json(assignment.title);
//   });
//   app.get("/a5/assignment/title/:newTitle", (req, res) => {
//     const { newTitle } = req.params;
//     assignment.title = newTitle;
//     res.json(assignment);
//   });
//   app.get("/a5/assignment/score/:newScore", (req, res) => {
//     const { newScore } = req.params;
//     assignment.score = newScore;
//     res.json(assignment);
//   });
//   app.get("/a5/assignment/completed/:newCompleted", (req, res) => {
//     const { newCompleted } = req.params;
//     assignment.completed = newCompleted;
//     res.json(assignment);
//   });
//   app.get("/a5/welcome", (req, res) => {
//     res.send("Welcome to Assignment 5");
//   });
//   app.get("/a5/add/:a/:b", (req, res) => {
//     const { a, b } = req.params;
//     const sum = parseInt(a) + parseInt(b);
//     res.send(sum.toString());
//   });
//   app.get("/a5/subtract/:a/:b", (req, res) => {
//     const { a, b } = req.params;
//     const sum = parseInt(a) - parseInt(b);
//     res.send(sum.toString());
//   });
//   app.get("/a5/calculator", (req, res) => {
//     const { a, b, operation } = req.query;
//     let result = 0;
//     switch (operation) {
//       case "add":
//         result = parseInt(a) + parseInt(b);
//         break;
//       case "subtract":
//         result = parseInt(a) - parseInt(b);
//         break;
//       default:
//         result = "Invalid operation";
//     }
//     res.send(result.toString());
//   });
// };
// export default Lab5;

import axios from "axios";

const todos = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
];

const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};

function Lab5(app) {
  app.get("/a5/assignment/score/:newScore", (req, res) => {
    const { newScore } = req.params;
    assignment.score = newScore;
    res.json(assignment);
  });
  app.get("/a5/assignment/completed/:completedValue", (req, res) => {
    const { completedValue } = req.params;
    assignment.completed = "true";
    res.json(assignment);
  });
  // app.get("/a5/assignment/completed/:newCompleted", (req, res) => {
  //   const { newCompleted } = req.params;
  //   assignment.completed = newCompleted;
  //   res.json(assignment);
  // });
  app.post("/a5/todos", (req, res) => {
    const newTodo = {
      ...req.body,
      id: new Date().getTime(),
    };
    todos.push(newTodo);
    res.json(newTodo);
  });

  app.put("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).json({ message: `Unable to update Todo with ID ${id}` });
      return;
    }
    todo.title = req.body.title;
    todo.description = req.body.description;
    todo.due = req.body.due;
    todo.completed = req.body.completed;
    res.sendStatus(200);
  });
  
  // app.get("/a5/todos/create", (req, res) => {
  //   const newTodo = {
  //     id: new Date().getTime(),
  //     title: "New Todo",
  //     completed: false,
  //   };
  //   todos.push(newTodo);
  //   res.json(todos);
  // });

  app.get("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((todo) => todo.id === parseInt(id));
    if (!todo) {
      res.status(404).send("Todo not found");
      return;
    }
    res.json(todo);
  });
  app.get("/a5/todos/:id/completed/:completed", (req, res) => {
    const { id, completed } = req.params;
    const todo = todos.find((todo) => todo.id === parseInt(id));
    if (!todo) {
      res.status(404).send("Todo not found");
      return;
    }
    todo.completed = true;
    res.json(todos);
  });
  app.get("/a5/todos/:id/description/:newDescription", (req, res) => {
    const { id, newDescription } = req.params;
    const todo = todos.find((todo) => todo.id === parseInt(id));
    if (!todo) {
      res.status(404).send("Todo not found");
      return;
    }
    todo.description = newDescription;
    res.json(todos);
  });
  app.get("/a5/todos/:id/title/:newTitle", (req, res) => {
    const { id, newTitle } = req.params;
    const todo = todos.find((todo) => todo.id === parseInt(id));
    if (!todo) {
      res.status(404).send("Todo not found");
      return;
    }
    todo.title = newTitle;
    res.json(todos);
  });
  app.delete("/a5/todos/:id", (req, res) => {
    const { id } = req.params;
    const todo = todos.find((t) => t.id === parseInt(id));
    if (!todo) {
      res.status(404).json({ message: `Unable to delete Todo with ID ${id}` });
      return;
    }
    todos.splice(todos.indexOf(todo), 1);
    res.sendStatus(200);
  });

  app.get("/a5/todos", (req, res) => {
    const { completed } = req.query;
    // if (completed === "true") {
    if (completed) {
      const comp = completed === "true";
      const t = todos.filter((todo) => todo.completed === comp);
      res.json(t);
      return;
    }
    res.json(todos);
  });

  app.get("/a5/assignment", (req, res) => {
    res.json(assignment);
  });
  app.get("/a5/assignment/title", (req, res) => {
    res.send(assignment.title);
  });
  app.get("/a5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.send(assignment);
  });

  const hello = (req, res) => {
    res.send("Welcome to Lab 5!");
  };
  // http://localhost:4000/a5/calculator?a=1&b=2&operation=add
  app.get("/a5/calculator", (req, res) => {
    const { a, b, operation } = req.query;
    let result = 0;
    if (operation === "add") {
      result = parseInt(a) + parseInt(b);
    } else if (operation === "subtract") {
      result = parseInt(a) - parseInt(b);
    } else {
      result = "Invalid operation";
    }
    res.send(result.toString());
  });

  app.get("/a5", hello);
  app.get("/a5/hello/:name", (req, res) => {
    const name = req.params.name;
    res.send(`Hello ${name}`);
  });
  app.get("/a5/add/:a/:b", (req, res) => {
    const a = parseInt(req.params.a);
    const b = parseInt(req.params.b);
    res.send(`${a} + ${b} = ${a + b}`);
  });
  app.get("/a5/subtract/:a/:b", (req, res) => {
    const { a, b } = req.params;
    // const a = parseInt(req.params.a);
    // const b = parseInt(req.params.b);
    res.send(`${a} - ${b} = ${parseInt(a) - parseInt(b)}`);
  });
  app.get("/a5/todos", (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
      const completedTodos = todos.filter((t) => t.completed === completed);
      res.json(completedTodos);
      return;
    }
    res.json(todos);
  });
}

export default Lab5;
