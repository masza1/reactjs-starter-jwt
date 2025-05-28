import * as styles from "@src/assets/custom.css";
import InputField from "@src/components/forms/InputField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./Login.schema";
import PasswordIcon from "@src/components/forms/PasswordIcon";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginAction } from "@src/redux/actions/auth/authAction";
import MuiIcon from "@src/components/MuiIcon";

export const Login = () => {
	const dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(LoginSchema),
		mode: "onBlur",
		shouldUseNativeValidation: false,
		defaultValues: {
			email: "",
			password: "",
			rememberMe: false,
		},
	});

	const onSubmit = (data) => {
		toast.success(`Login successfully`, { autoClose: 2000 });
		dispatch(
			loginAction({ email: data.email, password: data.password })
				.unwrap()
				.then(() => {
					toast("Login successful", { type: "success" });
				})
				.catch((error) => {
					toast(error, { type: "error" });
				})
		);
	};

	const onSubmitError = (errors) => {
		if (errors.email) {
			toast(`${errors.email.message}`, { type: "error" });
			return;
		}

		if (errors.password) {
			toast(`${errors.password.message}`, { type: "error" });
			return;
		}
		console.log(errors); // Handle form errors here
	};

	return (
		<>
			<div className="h-screen flex">
				<div
					className={`hidden lg:flex w-full lg:w-1/2 login_img_section justify-around items-center ${styles.login_img_section}`}>
					<div className="bg-black opacity-20 inset-0 z-0" />
					<div className="w-full mx-auto px-20 flex-col items-center space-y-6">
						<h1 className="text-white font-bold text-4xl font-sans">
							Simple App
						</h1>
						<p className="text-white mt-1">
							The simplest app to use
						</p>
						<div className="flex justify-center lg:justify-start mt-6">
							<a
								href="#"
								className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">
								Get Started
							</a>
						</div>
					</div>
				</div>
				<div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
					<div className="w-full px-8 md:px-32 lg:px-24">
						<form
							className="bg-white rounded-md shadow-2xl p-5"
							onSubmit={handleSubmit(onSubmit, onSubmitError)}>
							<h1 className="text-gray-800 font-bold text-2xl mb-1">
								Hello Again!
							</h1>
							<p className="text-sm font-normal text-gray-600 mb-8">
								Welcome Back
							</p>
							<div className="space-y-4">
								<InputField
									label="Email"
									name="email"
									type="email"
									register={register}
									error={errors.email}
									size="md"
									append={
										<MuiIcon icnoName="email" />
									}
								/>

								<InputField
									label="Password"
									name="password"
									type="password"
									register={register}
									error={errors.password}
									size="md"
									append={<PasswordIcon />}
								/>
							</div>
							<button
								type="submit"
								className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
								Login
							</button>
							<div className="flex justify-between mt-4">
								<span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
									Forgot Password ?
								</span>
								<a
									href="#"
									className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
									Don't have an account yet?
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};
