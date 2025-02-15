import { useState } from "react";
import OtpInput from "react-otp-input";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

const InputComponent = ({
	label = "",
	tag = "input-tag" + +Date.now(),
	type = "text",
	placeholder = "Enter here",
	handleInputChange,
	value = "",
	error = false,
	autoComplete,
	inputClass = "",
	labelClass = "",
	disabled = false,
}) => {
	const [inputType, setInputType] = useState(type);
	const [hidePassword, setHidePassword] = useState(true);

	const togglePasswordView = () => {
		setHidePassword(!hidePassword);

		!hidePassword ? setInputType("password") : setInputType("text");
	};

	return (
		<div
			className={`flex ${
				type === "otp"
					? "flex-row gap-2 justify-center items-center"
					: " flex-col"
			} items-start justify-center w-full mt-[12px]`}>
			<label
				htmlFor={tag}
				className={`text-[#696969] text-[15px] font-semibold mb-1 ${labelClass}`}>
				{label}
			</label>
			{type === "otp" ? (
				<OtpInput
					containerStyle={"flex items-center justify-center gap-2"}
					inputStyle={`${
						error ? "border-[red]" : " border-[#dddddd]"
					} shadow-shadowCard border-[1px] rounded-[3px] text-[#3b3b3b] flex items-center justify-between outline-none !w-[25px] ${inputClass}`}
					value={value}
					onChange={(otp) => handleInputChange(tag, otp)}
					numInputs={4}
					renderInput={(props) => <input {...props} />}
				/>
			) : type === "textarea" ? (
				<textarea
					type={inputType}
					id={tag}
					placeholder={placeholder}
					value={value}
					onChange={(e) => handleInputChange(tag, e.target.value)}
					autoComplete={autoComplete}
					disabled={disabled}
					className={` ${
						error ? "border-[red]" : " border-[#dddddd]"
					} my-1 outline-none border-[1px] py-1 px-2 w-full rounded-[8px] overflow-hidden text-[#3b3b3b] resize-none flex items-center justify-between ${inputClass}`}
				/>
			) : (
				<div
					className={` ${
						error ? "border-[red]" : " border-[#dddddd]"
					} my-1 shadow-shadowCard border-[1px] w-full rounded-[8px] overflow-hidden text-[#3b3b3b] flex items-center justify-between ${inputClass}`}>
					<input
						type={inputType}
						id={tag}
						placeholder={placeholder}
						value={value}
						onChange={(e) => handleInputChange(tag, e.target.value)}
						autoComplete={autoComplete}
						disabled={disabled}
						className="py-[6px] px-2 w-full outline-none "
					/>
					{type === "password" ? (
						hidePassword ? (
							<IoIosEyeOff
								className="text-[18px] mr-1 cursor-pointer active:scale-[0.97]"
								onClick={togglePasswordView}
							/>
						) : (
							<IoMdEye
								className="text-[18px] mr-1 cursor-pointer active:scale-[0.97]"
								onClick={togglePasswordView}
							/>
						)
					) : (
						<></>
					)}
				</div>
			)}
		</div>
	);
};

export default InputComponent;
