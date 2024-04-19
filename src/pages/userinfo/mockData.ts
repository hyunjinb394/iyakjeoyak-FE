const userImage = "/images/no_profile_image?.jpg";

import {
	UserData,
	LikeRecordData,
	PointData,
	ReviewData,
	SupplementRecordData,
} from "./userInfoType";

export const userMockData: UserData = {
	gender: "female",
	age: 28,
	nickname: "ThisThat",
	email: "jane.doe@example.com",
	interests: ["Running", "Yoga", "Reading", "Traveling"],
	profileImage: userImage,
	introduce: "",
	points: 900,
	latestReviews: [
		{
			date: "2024-04-10",
			history: "후기 작성",
		},
		{
			date: "2024-04-10",
			history: "후기 작성2",
		},
		{
			date: "2024-04-10",
			history: "후기 작성3",
		},
	],

	favoriteSupplements: [
		{
			name: "비타민D",
			frequency: "매일 1회 섭취",
			rating: 3.2,
		},
		{
			name: "비타민D",
			frequency: "매일 1회 섭취",
			rating: 3.2,
		},
		{
			name: "비타민D",
			frequency: "매일 1회 섭취",
			rating: 3.2,
		},
		{
			name: "비타민D",
			frequency: "매일 1회 섭취",
			rating: 3.2,
		},
	],
};

export const reviewMockData: ReviewData = {
	reviews: [
		{
			date: "2024-04-10",
			itemName: "쏠라씨 틴틴",
			content: "너무 좋은 제품입니다",
			category: "후기 작성",
			reviewLike: 34,
			rating: 4.5,
			reviewTag: [
				{
					delivery: "좋아요",
					packaging: "꼼꼼해요",
					expiration: "넉넉해요",
					eating: "편해요",
				},
			],
			reviewImg: [{ userImage }, { userImage }, { userImage }],
		},
		{
			date: "2024-04-10",
			itemName: "쏠라씨 틴틴",
			content: "너무 좋은 제품입니다",
			category: "후기 좋아요",
			reviewLike: 14,
			rating: 4.5,
			reviewTag: [
				{
					delivery: "좋아요",
					packaging: "꼼꼼해요",
					expiration: "넉넉해요",
					eating: "편해요",
				},
			],
			reviewImg: [{ userImage }, { userImage }, { userImage }],
		},
		{
			date: "2024-04-10",
			itemName: "쏠라씨 틴틴",
			content: "너무 좋은 제품입니다",
			category: "후기 좋아요",
			reviewLike: 14,
			rating: 4.5,
			reviewTag: [
				{
					delivery: "좋아요",
					packaging: "꼼꼼해요",
					expiration: "넉넉해요",
					eating: "편해요",
				},
			],
			reviewImg: [{ userImage }, { userImage }, { userImage }],
		},
	],
};

export const pointMockData: PointData = {
	pointHistory: [{ date: "2024-05-11", category: "후기 작성" }],
	reviewMockData,
};

export const supplementRecordMockData: SupplementRecordData = {
	mySupplements: [
		{
			name: "비타민D",
			dosage: "1000 IU",
			dueDate: "2025.03.05",
			effect: ["감기"],
			memo: "1일 3회 복용",
		},

		{
			name: "비타민D",
			dosage: "1000  IU",
			dueDate: "2025.03.05",
			effect: ["감기"],
			memo: "아침 저녁 복용",
		},
	],
};

export const likeRecordMockData: LikeRecordData = {
	likedSupplement: [
		{
			itemName: "영양제1",
			effect: ["피로회복"],
			liked: true,
		},
		{
			itemName: "영양제2",
			effect: ["감기라고해야하나어쩌구", "아무래도 그런듯"],
			liked: true,
		},
	],
};