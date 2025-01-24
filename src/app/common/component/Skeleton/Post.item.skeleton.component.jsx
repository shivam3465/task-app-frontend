import React from "react";

const PostItemSkeleton = () => {
	return [1, 2, 3].map((c) => (
		<div
			key={c}
			className="flex flex-col p-4 rounded-md shadow my-4 bg-[#f4f4f4]">
			{/* header  */}
			<div className="flex items-start justify-start py-4 border-b-[1px] border-[#d8d7d7]">
				<div className="h-[65px] rounded-full bg-[#f4f4f4]  w-[65px] shimmer"></div>
				<div className="w-full ml-4">
					<div className="h-[18px] rounded-[4px] my-2  w-[40%] shimmer"></div>
					<div className="h-[18px] rounded-[4px] my-2 w-[20%] shimmer"></div>
				</div>
			</div>

            {/* caption  */}
			<div className="mt-6">
				<div className="h-[18px] rounded-[4px] w-[70%] my-2 shimmer"></div>
				<div className="h-[18px] rounded-[4px] w-[70%] my-2 shimmer"></div>
				<div className="h-[18px] rounded-[4px]  w-[50%] my-2 shimmer"></div>
			</div>

			{/* image skeleton */}
			<div>
				<div className="h-[250px] rounded-[4px]  w-full my-2 shimmer"></div>
			</div>
		</div>
	));
};

export default PostItemSkeleton;
