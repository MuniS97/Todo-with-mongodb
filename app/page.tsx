"use client";

import { TaskForm } from "@/components/Forma";
import { Task } from "@/components/Task";
import axios from "axios";
import { useEffect, useState } from "react";

interface ITask {
  id: string;
  title: string;
  description: string;
  update: boolean;
  setUpdate: (arg: boolean) => void;
}

export default function Home() {
  const base_url = "http://localhost:3001/api/tasks";
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    axios.get(base_url).then((res) => setTasks(res.data.data));
  }, [update]);

  return (
    <main className="w-full h-screen pt-[5rem] flex items-start justify-center">
      <div className="w-full max-w-[1360px] flex items-start justify-center flex-col gap-6">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-5xl font-semibold">Dashboard</h1>

          {<TaskForm update={update} setUpdate={setUpdate}/>}
        </div>
        <div className="text-base font-semibold">
          Количество задач:{" "}
          <span className="font-bold text-xl text-blue-700">{tasks?.length || 0}</span> task(s)
        </div>
        <div className="w-full h-full flex flex-wrap justify-center items-start gap-5 p-5">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <Task
                update={update}
                setUpdate={setUpdate}
                description={task.description}
                title={task.title}
                id={task.id}
                key={task.id}
              />
            ))
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>
    </main>
  );
}

// function postData() {
//   const task = {
//     title: "Web project",
//   };

//   axios
//     .post("http://localhost:3001/api/tasks", task)
//     .then((res) => console.log(res));
// }
