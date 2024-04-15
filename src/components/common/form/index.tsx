import React, { useState } from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormContext } from "../../../hooks/useFormContext";
import { Input } from "./input";

interface FormProps {
	children: React.ReactNode;
	onSubmit: SubmitHandler<FieldValues>; // 폼 제출 핸들러
	schema?: yup.ObjectSchema<FieldValues>; // 폼 유효성 검사 스키마
}

export const Form = ({ children, onSubmit, schema }: FormProps) => {
	// 로딩 상태 변경 핸들러
	const [isLoading, setIsLoading] = useState(false);
	const loadingHandler = (boolean: boolean) => setIsLoading(boolean);

	// useForm 훅을 사용하여 폼 상태 및 유효성 검사 처리
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		resolver: schema ? yupResolver(schema) : undefined,
		mode: "onChange",
	});

	// 제출 핸들러 함수
	const submit: SubmitHandler<FieldValues> = async (data) => {
		setIsLoading(true);
		try {
			await onSubmit(data);
		} catch (error) {
			console.error("submit error", error);
		}
	};
	return (
		<FormContext.Provider
			value={{ isLoading, errors, register, loadingHandler }}
		>
			<form onSubmit={handleSubmit(submit)}>{children}</form>
		</FormContext.Provider>
	);
};
Form.Input = Input;
// Form.Button = Button;
