export default async function GetTodoDetails() {
  // using static url to fetch data
    const postData = await fetch("https://jsonplaceholder.typicode.com/todos/1") 
    .then((response) => response.json())
  
    return (
      <div className="center">
        <h1>Title: {postData.title}</h1>
        <p>ID: {postData.id}</p>
        <p>Status: {postData.completed ? "Done" : "Yet to complete"}</p>
      </div>
    );
  }
