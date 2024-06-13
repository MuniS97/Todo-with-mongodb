'use client'
import { RiDeleteBin6Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";

interface TaskRenderProps {
  title: string;
  description: string;
  id: string;
  update: boolean;
  setUpdate: (arg: boolean) => void;
}

export const Task: React.FC<TaskRenderProps> = ({
  title,
  description,
  id,
  update,
  setUpdate,
}) => {

  return (
    <div
      className={
        "w-[300px] h-[120px] p-[10px] rounded-lg border border-black shadow-sm flex flex-col items-start justify-start"
      }
    >
      {title?.length > 15 ? (
        <h4
          className="font-medium text-base"
        >
          {title.slice(0, 15)}...
        </h4>
      ) : (
        <h4
          className="font-medium text-base"
        >
          {title}
        </h4>
      )}
      {description?.length > 80 ? (
        <p className={"font-normal text-sm"}>{description.slice(0, 80)}...</p>
      ) : (
        <p className={"font-normal text-sm"}>{description}</p>
      )}
      <div className={"w-full h-full flex items-end justify-end gap-1"}>
        <button onClick={() => {}} className={"cursor-pointer"}>
          <TbEdit size={22} color="blue" />
        </button>
        <button
        //   onClick={() => {
        //     const request = window.confirm(
        //       "Are u sure that I wanna delete this task"
        //     );
        //     if (request) {
        //       fetch(baseUrl + "/tasks/" + Id, {
        //         method: "DELETE",
        //       }).then((res) => {
        //         if (res.status !== 200 && res.status !== 201) {
        //           console.log("Smth went wrong, try again please! ))");
        //         } else {
        //           alert("Done!!");
        //           setUpdate(!update);
        //         }
        //       });
        //     }
        //   }}
          className={"cursor-pointer"}
        >
          <RiDeleteBin6Line size={22} color="red" />
        </button>
      </div>
    </div>
  );
};
