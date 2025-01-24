import React from "react";

const TaskItemSkeleton = () => {
	return [1, 2, 3].map((c) => (
		<div
			key={c}
			className="flex flex-col p-4 rounded shadow h-[80px] bg-[#f4f4f4] shimmer-container">
			<div className="h-[24px] rounded-[4px]  w-[50%] my-2 shimmer"></div>
			<div className="h-[24px] rounded-[4px] w-[70%] shimmer"></div>
		</div>
	));
};

export default TaskItemSkeleton;
