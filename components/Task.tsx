'use client'
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";

interface TaskRenderProps {
  title: string;
  description: string;
  _id: string;
  update: boolean;
  setUpdate: (arg: boolean) => void;
}

export const Task: React.FC<TaskRenderProps> = ({
  title,
  description,
  _id,
  update,
  setUpdate,
}) => {

  return (
    <div
      className={
        "w-[350px] h-[200px] p-5 rounded-lg border border-[#D8D8D8] flex flex-col items-start justify-start gap-2.5 break-all"
      }
    >
      <h4 className="font-medium text-base">
        {title?.length > 30 ? title.slice(0, 30) + " ..." : title}
      </h4>
      <p className={"font-normal text-sm"}>{description?.length > 175 ? description.slice(0, 175) + " ..." : description}</p>
      <div className={"w-full h-full flex items-end justify-end gap-1"}>
        <button onClick={() => { }} className={"cursor-pointer"}>
          <TbEdit size={22} color="blue" />
        </button>
        <button
          onClick={() => {
            const request = window.confirm(
              "Are u sure that I wanna delete this task"
            );
            if (request) {
              axios.delete('http://localhost:3000/api/tasks?id=' + _id)
                .then((res) => {
                  if (res.status !== 200 && res.status !== 201) {
                    console.log("Smth went wrong, try again please! ))");
                  } else {
                    alert("Done!!");
                    setUpdate(!update);
                  }
                });
            }
          }}
          className={"cursor-pointer"}
        >
          <RiDeleteBin6Line size={22} color="red" />
        </button>
      </div>
    </div>
  );
};
