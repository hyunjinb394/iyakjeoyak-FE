import styles from "@/components/Form/TagButton/index.module.scss";
import { useState } from "react";

interface TagButtonProps {
	text: string;
	size?: "small" | "medium";
	backgroundColor?: "green" | "midgreen" | "lightgreen" | "white";
	value?: number;
	isSelected?: boolean;
	onClick?: () => void;
}

const TagButton = ({
	text,
	size = "medium",
	backgroundColor = "white",
	value,
	isSelected = false,
	onClick,
}: TagButtonProps) => {
	const [selected, setSelected] = useState(isSelected);
	const sizeClass = styles[`tag-${size}`] || "";
	const backgroundClass = styles[`background-${backgroundColor}`] || "";
	const buttonClass = `${sizeClass} ${backgroundClass} ${selected ? styles.selected : ""}`;

	const handleClick = () => {
		if (onClick) {
			onClick();
		}
		setSelected((prev) => !prev);
	};

	return (
		<span className={buttonClass} onClick={handleClick}>
			{text}
			<input type="hidden" value={value} />
		</span>
	);
};

export default TagButton;
