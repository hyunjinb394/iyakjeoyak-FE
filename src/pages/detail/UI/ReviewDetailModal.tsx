import * as _ from "lodash";

import { useMutation, useQuery } from "@tanstack/react-query";

import { FaShare } from "react-icons/fa";
import IconTag from "@/components/IconTag";
import { IoMdHeart } from "react-icons/io";
import ReviewPostModal from "./ReviewPostModal";
import TagCommon from "@/components/Tag";
import WriterTitle from "@/components/WriterTitle";
import copyToClipboard from "@/utils/copyToClipboard";
import postReviewLike from "@/api/review/postReviewLike";
import { queryClient } from "@/main";
import reviewQueryOptions from "@/api/review";
import styles from "../styles/ReviewDetailModal.module.scss";
import { useState } from "react";

export default function ReviewDetailModal({
	handleOpenConfirmDelete,
	reviewId,
}: {
	handleOpenConfirmDelete: () => void;
	reviewId: number;
}) {
	const [isEditing, setIsEditing] = useState(false);

	const {
		data: {
			content,
			title,
			createdBy,
			imageResult,
			createdDate,
			hashtagResult,
			star,
			isOwner,
		},
	} = useQuery(reviewQueryOptions.getReviewById({ reviewId }));

	const { mutate: likeMutate } = useMutation({
		mutationFn: postReviewLike,
		onSuccess: () => {
			queryClient.invalidateQueries(
				reviewQueryOptions.getReviewById({ reviewId }),
			);
		},
	});

	const handleLikeClick = () => {
		likeMutate(reviewId);
	};

	if (isEditing) {
		return <ReviewPostModal isEditing reviewId={reviewId} />;
	}

	return (
		<article className={styles.container}>
			<h2>{title}</h2>
			<WriterTitle
				userId={createdBy.userId}
				image={createdBy.image}
				nickname={createdBy.nickname}
				createdDate={createdDate}
				star={star}
			/>
			{hashtagResult.length !== 0 && (
				<div className={styles.tags}>
					{hashtagResult?.map((tag) => (
						<TagCommon key={tag.id} text={tag.name} />
					))}
				</div>
			)}
			<div className={styles.images}>
				{imageResult?.map((img) => (
					<img src={img.fullPath} key={img.id} alt="리뷰 이미지" />
				))}
			</div>
			<div className={styles.content}>{content}</div>
			{!isOwner && (
				<div className={styles["icons-container"]}>
					<div className={styles.left}>
						<IconTag
							icon={<IoMdHeart />}
							text="도움돼요"
							onClick={handleLikeClick}
						/>
						<IconTag
							icon={<FaShare />}
							text="공유하기"
							onClick={() => {
								const location = window.location.href;
								copyToClipboard(location);
							}}
						/>
					</div>
					<IconTag icon={<FaShare />} text="신고하기" onClick={() => {}} />
				</div>
			)}
			{isOwner && (
				<div className={styles["buttons-container"]}>
					<button className={styles.delete} onClick={handleOpenConfirmDelete}>
						삭제
					</button>
					<button
						className={styles.edit}
						onClick={() => {
							setIsEditing(true);
						}}
					>
						편집
					</button>
				</div>
			)}
		</article>
	);
}
