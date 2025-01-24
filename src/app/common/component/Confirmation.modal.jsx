import ModalWrapper from "./ModalWrapper/ModalWrapper";
import { IoIosClose } from "react-icons/io";

const ConfirmationModal = ({
	isOpen,
	setIsOpen,
	title,
	message,
	data,
	onClose,
	onConfirm,
}) => {
	return (
		<ModalWrapper isOpen={isOpen} setIsOpen={setIsOpen}>
			<div className="flex flex-col min-w-[450px] min-h-[270px] relative">
				{/* header  */}
				<div className="p-4 flex items-center justify-between bg-[#c7cdd7] rounded-t-[10px] ">
					<h2 className="font-bold text-[20px]">{title}</h2>
					<IoIosClose
						className="absolute top-4 right-4 cursor-pointer active:scale-[0.98] text-[24px]"
						onClick={() => setIsOpen(false)}
					/>
				</div>

				{/* body  */}
				<div className="p-6 h-full flex flex-1 items-center justify-center flex-col text-[17px]">
					<div className="text-gray-600 font-semibold">{message}</div>
					<div className="text-black">{data}</div>
				</div>

				{/* footer  */}
				<div className="border-t-[1px] border-[#c8c8c8] w-full flex items-center justify-end gap-4 p-4 rounded-b-[10px]">
					<button
						onClick={onConfirm}
						className="text-center bg-blue-500 text-white py-1 px-4 rounded active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400">
						Confirm
					</button>
					<button
						onClick={onClose}
						className="text-center bg-gray-400 text-white py-1 px-4 rounded active:scale-[0.98] cursor-pointer">
						Close
					</button>
				</div>
			</div>
		</ModalWrapper>
	);
};

export default ConfirmationModal;
