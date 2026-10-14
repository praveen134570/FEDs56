import { useState } from "react";

function Home(props) {
  return (
    <>
      <h2>{props.title}</h2>
      <p>Welcome, {props.name}!</p>
    </>
  );
}

function About(props) {
  return (
    <>
      <h2>{props.title}</h2>
      <p>{props.description}</p>
    </>
  );
}

function StudentDetails(props) {
  return (
    <>
      <h2>Student Details</h2>
      <p>Name: {props.name}</p>
      <p>Roll No: {props.rollNo}</p>
      <p>Age: {props.age}</p>
      <p>Marks: {props.marks}</p>
    </>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>State Demonstration</h2>

      <p style={{ textAlign: "center" }}>Count: {count}</p>

      <div style={{ textAlign: "center" }}>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            margin: "5px",
            backgroundColor: "green",
            color: "white",
            width: "500px"
          }}
        >
          Increase
        </button>

        <button
          onClick={() => setCount(count - 1)}
          style={{
            margin: "5px",
            backgroundColor: "red",
            color: "white",
            width: "500px"
          }}
        >
          Decrease
        </button>

        <button
          onClick={() => setCount(0)}
          style={{
            margin: "5px",
            backgroundColor: "blue",
            color: "white",
            width: "500px"
          }}
        >
          Reset
        </button>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <h1 style={{ color: "red" }}>Welcome to React JS</h1>

      <Home title="Home Page" name="Praveen" />

      <About
        title="About Page"
        description="This is the about page of our application."
      />

      <StudentDetails
        name="Praveen"
        rollNo="2500030713"
        age={18}
        marks={90}
      />

      <Counter />
    </>
  );
}

export default App;