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
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";

interface ITask {
  _id: string;
  title: string;
  description: string;
  update: boolean;
  setUpdate: (arg: boolean) => void;
}

export default function Home() {
  const userId = useUser().user?.id as string
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

          <div className="flex items-center justify-center gap-2.5">
            <Dialog>
              <DialogTrigger>
                <span className=" bg-red-700 hover:opacity-90 text-base font-normal text-white w-[11rem] rounded-lg h-[3rem] flex items-center justify-center">Add Task</span>
              </DialogTrigger>
              <DialogContent className="w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add Task</DialogTitle>
                  <DialogDescription>
                    {<TaskForm update={update} setUpdate={setUpdate} userId={userId} />}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <SignedOut>
              <Button className="bg-blue-700 hover:opacity-90 text-base font-normal text-white w-[11rem] rounded-lg h-[3rem] flex items-center justify-center">
                <SignInButton />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
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
            <span>There is no task</span>
          )}
        </div>
      </div>
    </main>
  );
}
