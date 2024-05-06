import { IoSearch } from "react-icons/io5";
import styles from "../styles/KeywordInput.module.scss";
import { useSelect } from "../hooks/useSelect";

interface KeywordInputProps {
	placeholder: string;
	onChange: (keyword: string) => Promise<void> | string[];
	onClick: (keyword: string) => void;
}

export default function KeywordInput({
	placeholder,
	onChange,
	onClick,
}: KeywordInputProps) {
	const { currentKeyword, handleCurrentKeyword } = useSelect();

	return (
		<div className={styles.container}>
			<input
				value={currentKeyword.name}
				onChange={(e) => {
					handleCurrentKeyword({ id: 0, name: e.target.value });
					onChange(e.target.value);
				}}
				placeholder={placeholder}
			/>
			<button
				onClick={() => {
					onClick(currentKeyword.name);
				}}
			>
				<IoSearch />
			</button>
		</div>
	);
}
