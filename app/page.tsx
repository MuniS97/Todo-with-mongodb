"use client";

import { TaskForm } from "@/components/Forma";
import { Task } from "@/components/Task";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";

interface ITask {
  _id: string;
  title: string;
  description: string;
  update: boolean;
  setUpdate: (arg: boolean) => void;
}

export default function Home() {
  const base_url = "http://localhost:3000/api/tasks";
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    axios.get(base_url).then((res) => setTasks(res.data.data));
  }, [update]);

  return (
    <main className="w-full h-screen pt-[5rem] flex items-start justify-center">
      <div className="w-full max-w-[1240px] flex items-start justify-center flex-col gap-6">
        <div className="w-full flex items-center justify-between">
          <h1 className="text-5xl font-semibold">Dashboard</h1>

          <Dialog>
            <DialogTrigger>
              <Button className="w-[11rem] h-[3rem]">Add Task</Button>
            </DialogTrigger>
            <DialogContent className="w-[600px]">
              <DialogHeader>
                <DialogTitle>Add Task</DialogTitle>
                <DialogDescription>
                  {<TaskForm update={update} setUpdate={setUpdate} />}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

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
                _id={task._id}
                key={task._id}
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
//     .post("http://localhost:3000/api/tasks", task)
//     .then((res) => console.log(res));
// }
