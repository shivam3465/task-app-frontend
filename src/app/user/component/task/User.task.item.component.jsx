import { MdDelete } from "react-icons/md";
import { useDrag } from "react-dnd";
import ModalWrapper from "../../../common/component/ModalWrapper/ModalWrapper";
import ConfirmationModal from "../../../common/component/Confirmation.modal";
import { useState } from "react";
import { deleteDataApiService } from "../../../common/services/delete.data.api.service";
import { TaskConfig } from "../../../common/constants/task.config";
import { toast } from "react-toastify";

// Define the item type for drag-and-drop
const ItemTypes = {
	CARD: "card",
};

const TaskItem = ({ task, setIsLoading, setFetchTask }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { title, desc, _id: id, status } = task;

	const [{ isDragging }, dragRef] = useDrag(() => ({
		type: ItemTypes.CARD, // The type of the item being dragged
		item: { id, title, desc, status }, // The data being dragged (task data)
		collect: (monitor) => ({
			isDragging: !!monitor.isDragging(), // Adjust opacity while dragging
		}),
		options: { dragPreviewOptions: { isDragging: 1 } },
	}));

	const handleDeleteConfirmation = (id) => {
		setIsModalOpen(true);
	};

	const deleteTaskConfirmed = async () => {
		setIsLoading(true);
		const [result, error] = await deleteDataApiService(
			TaskConfig.TASK_API_ROUTE.DELETE_TASK,
			{ taskId: id }
		);
		setIsLoading(false);

		if (result.success) {
			toast.success(result.message);
			setFetchTask(true);
		} else {
			const errorMessage =
				result.message || error.message || "Something went wrong";
			toast.error(errorMessage);
		}
	};

	return (
		<div
			ref={dragRef}
			style={{
				opacity: `1 !important`,
			}}
			className="bg-white p-4 rounded shadow flex justify-between items-center hover:cursor-grab active:cursor-grabbing  ">
			<div className="flex flex-col flex-1 overflow-hidden ">
				<h3
					title={title}
					className="font-bold text-ellipsis overflow-hidden whitespace-nowrap">
					{title}
				</h3>
				<div
					title={desc}
					className="max-h-[150px] text-gray-600 text-ellipsis overflow-hidden whitespace-nowrap">
					{desc}
				</div>
			</div>

			<button
				onClick={handleDeleteConfirmation}
				className=" border-[1px] text-red-400 hover:text-red-500  hover:border-red-500 border-transparent rounded-full p-1 active:scale-[0.98]">
				<MdDelete className="text-[24px] cursor-pointer" />
			</button>

			{/* for taking confirmation for deletion  */}
			<ConfirmationModal
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={() => deleteTaskConfirmed()}
				title={"Confirmation"}
				message={"Are you sure want to delete the task ?"}
				data={title}
			/>
		</div>
	);
};

export default TaskItem;
