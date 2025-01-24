import { useEffect, useState } from "react";
import UserFeedComponent from "../component/feed/User.feed.component";
import { getDataApiService } from "../../common/services/get.data.api.service";
import { FeedConfig } from "../../common/constants/feed.config";
import { FaPlus } from "react-icons/fa6";
import ModalWrapper from "../../common/component/ModalWrapper/ModalWrapper";
import NewPostComponent from "../component/feed/User.new.post.component";
import PostItemSkeleton from "../../common/component/Skeleton/Post.item.skeleton.component";

const FeedPage = () => {
	const [feeds, setFeeds] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [fetchFeed, setFetchFeed] = useState(true); //true for fetching all task on page load
	const [addPostModalOpen, setAddPostModalOpen] = useState(false);

	const getAllPost = async () => {
		setIsLoading(true);
		const [result, error] = await getDataApiService(
			FeedConfig.API_ROUTE.GET_ALL_FEED
		);
		setIsLoading(false);

		if (result.success) {
			setFeeds(result.data);
		} else {
			const errorMessage =
				error.response?.data?.message ||
				error.message ||
				"Something went wrong";
			toast.error(errorMessage);
		}
	};

	const addNewPost = async () => {
		setAddPostModalOpen(true);
	};

	useEffect(() => {
		//only when fetch is triggered
		if (fetchFeed) {
			getAllPost();
			setFetchFeed(false);
		}
	}, [fetchFeed]);
	return (
		<div className="flex items-center justify-center">
			<div className="w-[762px] min-h-screen">
				{/* new post section  */}
				<div className="my-4 bg-white  rounded-lg">
					<h2 className="font-bold text-2xl text-center py-4">
						Your Feeds
					</h2>
					<div className="p-4">
						<div className="p-4 rounded-md flex items-center justify-between bg-slate-100">
							<div>
								Have something to express ?<br /> Write it here
								. . .
							</div>
							<button
								title="Add new post"
								className="flex items-center justify-center gap-2 text-[14px] bg-blue-500 text-white py-1  px-3 rounded active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400"
								onClick={addNewPost}>
								New Post <FaPlus />{" "}
							</button>
						</div>
					</div>
				</div>

				<ModalWrapper
					isOpen={addPostModalOpen}
					setIsOpen={setAddPostModalOpen}>
					<NewPostComponent
						setFetchFeed={setFetchFeed}
						closeModal={() => setAddPostModalOpen(false)}
					/>
				</ModalWrapper>

				{/* post container  */}
				<div>
					{isLoading ? (
						<PostItemSkeleton />
					) : (
						feeds &&
						feeds?.map((feed, i) => (
							<UserFeedComponent
								setFetchFeed={setFetchFeed}
								setIsLoading={setIsLoading}
								feed={feed}
								key={i}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default FeedPage;
