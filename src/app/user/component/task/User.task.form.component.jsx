import { useState } from "react";
import InputComponent from "../../../common/component/InputComponent/InputComponent";
import { postDataApiService } from "../../../common/services/post.data.api.service";
import { toast } from "react-toastify";
import { TaskConfig } from "../../../common/constants/task.config";
import { IoIosClose } from "react-icons/io";
import loaderImage from "../../../../assets/loader.gif";

const TaskForm = ({ setFetchTask, status, closeModal }) => {
	const [data, setData] = useState({});
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);

	const handleInputChange = (key, value) => {
		const newData = { ...data, [key]: value };
		setData(newData);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (data.title && data.desc) {
			setIsLoading(true);
			const [result, error] = await postDataApiService(
				TaskConfig.TASK_API_ROUTE.CREATE_TASK,
				{ ...data, status }
			);
			setIsLoading(false);

			if (result.success) {
				toast.success(result.message);
				setFetchTask(true);
				closeModal();
			} else {
				const errorMessage =
					error.response?.data?.message ||
					error.message ||
					"Something went wrong";
				toast.error(errorMessage);
			}
			setData({ name: "", desc: "" });
		}
	};

	return (
		<div className="flex items-center flex-col justify-center relative">
			{/* header  */}
			<div className="p-4 flex items-center justify-between bg-[#c7cdd7] rounded-t-[10px] w-full ">
				<h2 className="font-bold text-[20px]">Add New Task</h2>
				<IoIosClose
					onClick={closeModal}
					className="absolute top-4 right-4 cursor-pointer active:scale-[0.98] text-[24px] "
				/>
			</div>

			<form
				onSubmit={handleSubmit}
				className="flex flex-col w-[576px] gap-4 bg-[#f4f4f4] p-4 rounded-md shadow">
				<InputComponent
					placeholder="Enter task name"
					type="text"
					tag="status"
					label="Task Status"
					inputClass="!shadow-none"
					labelClass="!text-15px"
					value={status}
					disabled={true}
					handleInputChange={() => {}}
				/>

				<InputComponent
					placeholder="Enter task name"
					type="text"
					tag="title"
					label="Task Name"
					inputClass="!shadow-none"
					labelClass="!text-15px"
					value={data?.title || ""}
					error={error.title}
					handleInputChange={handleInputChange}
				/>

				<InputComponent
					placeholder="Enter task description"
					type="textarea"
					tag="desc"
					label="Task description"
					inputClass="!h-[120px] shadow-none"
					labelClass=""
					value={data?.desc || ""}
					error={error.desc}
					handleInputChange={handleInputChange}
				/>

				<div className="flex items-center justify-end border-t-[1px] border-[#c8c8c8] p-4 rounded-b-[10px] w-full gap-4">
					<button
						type="submit"
						disabled={!data.title || !data.desc}
						className="flex items-center justify-center gap-3 bg-blue-500 text-white py-2 px-4 rounded active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400 ">
						{isLoading && (
							<img
								src={loaderImage}
								alt="Loader"
								className="h-full w-[25px]"
							/>
						)}
						Add Task
					</button>

					<button
						type="button"
						onClick={closeModal}
						className="flex items-center justify-center gap-3 bg-gray-500 text-white rounded active:scale-[0.98] cursor-pointer py-2 px-4">
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default TaskForm;
