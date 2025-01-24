import { useRef, useState } from "react";
import InputComponent from "../../../common/component/InputComponent/InputComponent";
import { postDataApiService } from "../../../common/services/post.data.api.service";
import { toast } from "react-toastify";

import { FeedConfig } from "../../../common/constants/feed.config";
import { IoIosClose } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import loaderImage from "../../../../assets/loader.gif";

const NewPostComponent = ({ setFetchFeed, closeModal }) => {
	const [data, setData] = useState({});
	const [error, setError] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [previewImageUrl, setPreviewImageUrl] = useState(false);
	const imageInputRef = useRef(null);

	const handleInputChange = (key, value) => {
		setData((prevData) => ({
			...prevData,
			[key]: value,
		}));
	};

	// Function to handle file input change
	const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			// Convert image file to base64
			const reader = new FileReader();
			reader.onloadend = () => {
				handleInputChange("image", reader.result);
				setPreviewImageUrl(reader.result);
			};
			reader.onerror = (error) => {
				toast.error(error.message || "Error reading file ");
				console.error("Error reading file: ", error); // Log errors
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (data.content && data.image) {
			setIsLoading(true);
			const [result, error] = await postDataApiService(
				FeedConfig.API_ROUTE.CREATE_NEW_FEED,
				data
			);
			setIsLoading(false);

			if (result.success) {
				toast.success(result.message);
				setFetchFeed(true);
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
				<h2 className="font-bold text-[20px]">Add Post</h2>
				<IoIosClose
					onClick={closeModal}
					className="absolute top-4 right-4 cursor-pointer active:scale-[0.98] text-[24px] "
				/>
			</div>

			<form
				onSubmit={handleSubmit}
				className="flex flex-col w-[576px] gap-4 bg-[#f4f4f4] p-4 rounded-md shadow">
				<InputComponent
					placeholder="Write caption here . . ."
					type="textarea"
					tag="content"
					label=""
					inputClass="!shadow-none !h-[140px]"
					labelClass="!text-15px"
					value={data?.content || ""}
					error={error.content}
					handleInputChange={handleInputChange}
				/>
				{data.image ? (
					<img
						src={previewImageUrl}
						alt="preview"
						className="w-full h-[260px] object-contain"
					/>
				) : (
					<div
						className="p-4 rounded-md flex items-center justify-center bg-slate-200 h-[80px] w-full text-gray-500 cursor-pointer"
						onClick={() => imageInputRef.current.click()}>
						<GrAttachment />
						Select Image to upload in post
					</div>
				)}

				<input
					type="file"
					name="image"
					accept="image/*"
					onChange={handleFileChange}
					style={{ display: "none" }}
					ref={imageInputRef}
				/>

				<div className="flex items-center justify-end border-t-[1px] border-[#c8c8c8] p-4 rounded-b-[10px] w-full gap-4">
					<button
						type="submit"
						disabled={!data.content || !data.image || isLoading}
						className="flex items-center justify-center gap-3 bg-blue-500 text-white py-2 px-4 rounded active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400 ">
						{isLoading && (
							<img
								src={loaderImage}
								alt="Loader"
								className="h-full w-[25px]"
							/>
						)}
						Add Post
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

export default NewPostComponent;
