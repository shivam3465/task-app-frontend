import { useState } from "react";
import profilePicture from "../../../../assets/profile.png";
import ConfirmationModal from "../../../common/component/Confirmation.modal";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { FeedConfig } from "../../../common/constants/feed.config";
import { deleteDataApiService } from "../../../common/services/delete.data.api.service";
import { toast } from "react-toastify";

const UserFeedComponent = ({ feed, setIsLoading, setFetchFeed }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { media, content, userId, updatedAt } = feed;
	const { name } = userId;
	const { user } = useSelector((state) => state.user);

	const handleDeleteConfirmation = () => {
		if (!user || !userId) return;
		if (userId?._id == user?._id) setIsModalOpen(true);
	};

	const deleteTaskConfirmed = async () => {
		//if post owner is not viewing the post
		if (userId._id != user?._id) return;
		setIsLoading(true);

		const [result, error] = await deleteDataApiService(
			FeedConfig.API_ROUTE.DELETE_FEED,
			{ postId: feed._id }
		);
		setIsLoading(false);

		if (result) {
			toast.success(result.message);
			setFetchFeed(true);
		} else {
			const errorMessage =
				error.response.data.message ||
				error?.message ||
				"Something went wrong";
			toast.error(errorMessage);
		}
	};

	return (
		<div className="bg-white shadow-md border-[1px] border-[#dbdbdb] my-4 rounded-lg p-4 w-full ">
			{/* Header */}
			<div className="flex items-center justify-between pb-4 mb-4 border-b-[1px] border-[#d8d7d7] ">
				<div className="flex items-center justify-between">
					<img
						src={profilePicture}
						alt="User Profile"
						className="w-12 h-12 rounded-full object-cover"
					/>
					<div className="ml-3">
						<h3 className="font-bold text-lg">
							{name || "Anonymous User"}
						</h3>
						<p className="text-sm text-gray-500">
							{new Date(updatedAt).toDateString()}
						</p>
					</div>
				</div>

				{userId._id == user?._id && (
					<button
						onClick={handleDeleteConfirmation}
						className=" border-[1px] text-red-400 hover:text-red-500  hover:border-red-500 border-transparent rounded-full p-1 active:scale-[0.98]">
						<MdDelete className="text-[24px] cursor-pointer" />
					</button>
				)}
			</div>

			{/* for taking confirmation for deletion  */}
			<ConfirmationModal
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
				onClose={() => setIsModalOpen(false)}
				onConfirm={() => deleteTaskConfirmed()}
				title={"Confirmation"}
				message={"Are you sure want to delete the post ?"}
			/>

			{/* Feed/Caption */}
			<div>
				<p className="text-gray-700 mb-3">
					{content || "No caption provided."}
				</p>
				{media && (
					<img
						src={media.url || ""}
						alt="Post"
						className="w-full h-auto  object-contain"
					/>
				)}
			</div>
		</div>
	);
};

export default UserFeedComponent;
