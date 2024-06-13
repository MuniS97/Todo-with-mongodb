"use client";

import axios from "axios";

export default function Home() {
  function postData() {
    const task = {
      title: "Web project",
    };

    axios
      .post("http://localhost:3001/api/tasks", task)
      .then((res) => console.log(res));
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button
        onClick={() => {
          postData();
        }}
      >
        Click
      </button>
    </main>
  );
}
