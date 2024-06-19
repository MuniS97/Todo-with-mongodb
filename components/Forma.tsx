"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { RiErrorWarningFill } from "react-icons/ri";
import axios from "axios";
import { Button } from "./ui/button";


type Inputs = {
  title: string;
  description: string;
  userId: string
};

interface TaskFormProps {
  setUpdate: (arg: boolean) => void;
  update: boolean;
  userId: string
}

export const TaskForm: React.FC<TaskFormProps> = ({ setUpdate, update, userId }) => {
  const base_url = "http://localhost:3000/api/tasks";

  const {
    register,
    handleSubmit,
    reset,
    // watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);

    axios.post(base_url, data).then((res) => {
      if (res.status === 200 || res.status === 201) {
        alert("Done!!");
        reset();
        setUpdate(!update);
      } else {
        console.log("Smth went wrong");
      }
    });
  };

  //   console.log(watch("task"));
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={"flex justify-center flex-col items-center gap-2.5 py-5"}
    >
      <div
        className={"w-full flex items-start justify-center flex-col gap-[2px]"}
      >
        <label
          className={"font-medium text-base cursor-pointer"}
          htmlFor="title"
        >
        </label>
        <div className={"w-full flex items-center gap-1"}>
          <input
            placeholder="Title name"
            id="title"
            className={
              "w-full h-[40px] px-[10px] font-normal text-sm rounded-md border border-black"
            }
            {...register("title", { required: true })}
          />
          {errors.title && <RiErrorWarningFill size={24} color="red" />}
        </div>
      </div>
      <div
        className={"w-full flex items-start justify-center flex-col gap-[2px]"}
      >
        <label
          className={"font-medium text-base cursor-pointer"}
          htmlFor="description"
        >
        </label>
        <div className={"w-full flex items-center gap-1"}>
          <input
            id="description"
            placeholder="Description"
            className={
              "w-full h-[40px] px-[10px] font-normal text-sm rounded-md border border-black"
            }
            {...register("description", { required: true })}
          />
          {errors.description && <RiErrorWarningFill size={24} color="red" />}
        </div>
        <input type="text" id="userId" hidden value={userId} defaultValue={userId}
          {...register('userId', { required: true })}
        />
      </div>

      <Button
        className="w-full px-5 h-[40px] rounded-md border border-black cursor-pointer"
        type="submit"
      >ADD</Button>
    </form>
  );
};
