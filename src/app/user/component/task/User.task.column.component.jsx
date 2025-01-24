import { useDrop } from "react-dnd";
import TaskItem from "./User.task.item.component";
import { TaskConfig } from "../../../common/constants/task.config";
import { FaPlus } from "react-icons/fa6";
import { putDataApiService } from "../../../common/services/put.data.api.service";
import TaskItemSkeleton from "../../../common/component/Skeleton/Task.item.skeleton.component";
import ModalWrapper from "../../../common/component/ModalWrapper/ModalWrapper";
import TaskForm from "./User.task.form.component";
import { useState } from "react";

// Define the item type to be dropped
const ItemTypes = {
	CARD: "card",
};

const TaskColumn = ({
	status,
	tasks,
	setFetchTask,
	setIsLoading,
	isLoading,
}) => {
	const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);

	const updateTaskStatus = async (id, status) => {
		setIsLoading(true);
		const [result, error] = await putDataApiService(
			TaskConfig.TASK_API_ROUTE.UPDATE_TASK,
			{ taskId: id, status }
		);
		setIsLoading(false);

		if (result.success) {
			setFetchTask(true);
		} else {
			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				"Something went wrong";
			toast.error(errorMessage);
		}
	};

	const [, dropRef] = useDrop(() => ({
		accept: ItemTypes.CARD, // Accept only tasks of type 'card'
		drop: (item) => {
			if (isLoading) return;
			// Call the function to move the task
			updateTaskStatus(item.id, status);
		},
	}));

	const addNewTask = () => {
		setAddTaskModalOpen(true);
	};

	return (
		<div
			ref={dropRef}
			className="flex-1 bg-[#fbfcff40] rounded-md shadow overflow-y-auto">
			<div className="flex items-center justify-between bg-white p-3">
				<h2 className="text-xl font-bold mb-3 rounded-t-md text-center">
					{status}
				</h2>
				<ModalWrapper
					isOpen={addTaskModalOpen}
					setIsOpen={setAddTaskModalOpen}>
					<TaskForm
						setFetchTask={setFetchTask}
						status={status}
						closeModal={() => setAddTaskModalOpen(false)}
					/>
				</ModalWrapper>

				<button
					title="Add new task"
					className="flex items-center justify-center gap-2 text-[14px] bg-blue-500 text-white py-1  px-3 rounded active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400"
					onClick={addNewTask}>
					Add <FaPlus />{" "}
				</button>
			</div>
			<div className="flex flex-col gap-2 p-4 min-h-[250px]">
				{isLoading ? (
					<TaskItemSkeleton />
				) : (
					tasks &&
					tasks.map((task, i) => (
						<TaskItem
							key={task._id}
							task={task}
							setIsLoading={setIsLoading}
							setFetchTask={setFetchTask}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default TaskColumn;
