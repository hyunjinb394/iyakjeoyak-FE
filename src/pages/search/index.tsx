import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { KeywordResultItemType } from "../main";
import { MedicineCardList } from "@/pages/search/UI";
import SearchBar from "@/components/SearchBar";
import TagsModal from "./UI/TagsModal";
import getAutoCompleteResult from "@/api/common/getAutoCompleteResult";
import qs from "qs";
import { queryClient } from "@/main";

export default function MedicineSearch() {
	const [currentTapValue, setCurrentTapValue] = useState("");
	const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);
	const [keywordSearchResult, setKeywordSearchResult] = useState<
		KeywordResultItemType[]
	>([]);

	const navigate = useNavigate();
	const { search } = useLocation();

	const handleKeywordCompletedClick = (keyword: string) => {
		const currentQueryString = location.search;
		const currentQueryParams = qs.parse(currentQueryString, {
			ignoreQueryPrefix: true,
		});

		const updatedQueryParams = {
			...currentQueryParams,
			keyword,
		};

		const newQueryString = qs.stringify(updatedQueryParams, {
			addQueryPrefix: true,
		});

		navigate(`/search${newQueryString}`);
	};

	const handleGetAutoCompleteResults = async (keyword: string) => {
		if (keyword.length <= 2) {
			return;
		}
		const response = await getAutoCompleteResult({ keyword });
		setKeywordSearchResult(response);
	};

	const toggleIsTagsModalOpen = () => {
		setIsTagsModalOpen((prev) => !prev);
		// 모달이 닫힐때만 데이터를 비워줌
		if (isTagsModalOpen)
			queryClient.resetQueries({ queryKey: ["medicine", "medicines"] });
	};

	const handleCurrentTab = (tapValue: string) => {
		setCurrentTapValue(tapValue);
	};

	useEffect(() => {
		setKeywordSearchResult([]);
	}, [search]);

	return (
		<>
			{isTagsModalOpen && (
				<TagsModal
					currentTapValue={currentTapValue}
					toggleIsTagsModalOpen={toggleIsTagsModalOpen}
				/>
			)}
			<section>
				<SearchBar>
					<SearchBar.KeywordInput
						placeholder="검색어를 입력해주세요"
						onClick={handleKeywordCompletedClick}
						onChange={handleGetAutoCompleteResults}
					/>
					<SearchBar.SearchResultList
						keywordSearchResult={keywordSearchResult}
					/>
					<SearchBar.SelectedKeywordTagsList />
				</SearchBar>
				<MedicineCardList
					handleCurrentTab={handleCurrentTab}
					toggleIsTagsModalOpen={toggleIsTagsModalOpen}
				/>
			</section>
		</>
	);
}
