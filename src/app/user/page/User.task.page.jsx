import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "../component/task/User.task.column.component";
import { TaskConfig } from "../../common/constants/task.config";
import { getDataApiService } from "../../common/services/get.data.api.service";

const TaskPage = () => {
	const [tasks, setTasks] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [fetchTask, setFetchTask] = useState(true); //true for fetching all task on page load

	const getAllTask = async () => {
		setIsLoading(true);
		const [result, error] = await getDataApiService(
			TaskConfig.TASK_API_ROUTE.GET_ALL_TASK
		);
		setIsLoading(false);

		if (result.success) {
			setTasks(result.data);
		} else {
			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				"Something went wrong";
			toast.error(errorMessage);
		}
	};

	useEffect(() => {
		//only when fetch is triggered
		if (fetchTask) {
			getAllTask();
			setFetchTask(false);
		}
	}, [fetchTask]);

	return (
		<DndProvider backend={HTML5Backend}>
			<div className="p-4 min-h-screen">
				<h1 className="text-center text-2xl font-bold mb-4">
					Task Management
				</h1>

				<div className="flex gap-4 mt-6">
					{TaskConfig?.TASK_STATUS_TYPE?.map((status) => {
						return (
							<TaskColumn
								key={status}
								status={status}
								tasks={tasks[status] || []}
								setFetchTask={setFetchTask}
								setIsLoading={setIsLoading}
								isLoading={isLoading}
							/>
						);
					})}
				</div>
			</div>
		</DndProvider>
	);
};

export default TaskPage;
