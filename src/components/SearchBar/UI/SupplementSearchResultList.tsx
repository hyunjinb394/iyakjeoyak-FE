import { useEffect, useState } from "react";

import { KeywordResultItemType } from "@/pages/main";
import styles from "../styles/SearchResultList.module.scss";
import { useSelect } from "../hooks/useSelect";

export default function SupplementSearchResultList({
	keywordSearchResult,
	handleKeywordSelected,
}: {
	keywordSearchResult?: KeywordResultItemType[];
	handleKeywordSelected: (keyword: string) => void;
}) {
	const [activeKeywordIndex, setActiveKeywordIndex] = useState<number>(-1);
	const { currentKeyword, handleCurrentKeyword } = useSelect();

	if (!currentKeyword) return;

	const [currentActiveKeyword, setCurrentActiveKeyword] =
		useState<KeywordResultItemType>({ id: 0, name: "" });

	const handleSearchKeywordSelected = (
		selectedKeyword: KeywordResultItemType,
	) => {
		handleCurrentKeyword({ id: 0, name: "" });
		handleKeywordSelected(selectedKeyword.name);
		// 검색 api로 요청 한 뒤에 그 데이터를 form에 넣어주고
		// onsubmmit할때도 넣어서 post 해야함
	};

	const handleMouseEnter = (keyword: KeywordResultItemType) => {
		setCurrentActiveKeyword(keyword);
	};

	function handleKeyDown(this: Window, ev: KeyboardEvent) {
		if (!keywordSearchResult) return;
		if (ev.key === "ArrowDown") {
			if (keywordSearchResult.length === activeKeywordIndex + 1) {
				return;
			}
			setActiveKeywordIndex((prevIndex) => prevIndex + 1);
			return;
		}
		if (ev.key === "ArrowUp") {
			if (activeKeywordIndex === 0) {
				return;
			}
			setActiveKeywordIndex((prevIndex) => prevIndex - 1);
			return;
		}
		if (activeKeywordIndex === -1) {
			setActiveKeywordIndex(0);
		}
		if (ev.key === "Enter") {
			handleSearchKeywordSelected(keywordSearchResult[activeKeywordIndex]);
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [activeKeywordIndex, keywordSearchResult]);

	return (
		<div className={styles.container}>
			{keywordSearchResult &&
				keywordSearchResult?.length !== 0 &&
				keywordSearchResult?.map((keyword) => {
					return (
						<div
							tabIndex={0}
							key={keyword.id}
							className={`${styles.option} ${(keywordSearchResult[activeKeywordIndex].id === keyword.id || currentActiveKeyword.id === keyword.id) && styles.active}`}
							onClick={() => {
								handleSearchKeywordSelected(currentActiveKeyword);
							}}
							onMouseOut={() => {
								handleMouseEnter({ id: 0, name: "" });
							}}
							onMouseEnter={() => {
								handleMouseEnter(keyword);
							}}
						>
							{keyword.name.split(currentKeyword.name)[0]}
							<span>{currentKeyword.name}</span>
							{keyword.name.split(currentKeyword.name)[1]}
						</div>
					);
				})}
		</div>
	);
}
