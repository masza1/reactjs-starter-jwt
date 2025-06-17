import * as styles from "@src/assets/custom.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./Login.schema";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
	Button,
	InputField,
	Link,
	MuiIcon,
	PasswordIcon,
} from "@src/components";
import { login } from "@src/redux/actions/auth/authAction";

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
		dispatch(login({ email: data.email, password: data.password }))
			.unwrap()
			.then(() => {
				toast("Login successful", { type: "success" });
			})
			.catch((error) => {
				toast(error, { type: "error" });
			});
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
					className={`hidden md:flex w-full md:w-2/4 lg:w-2/3 xl:w-3/5 login_img_section justify-around items-center ${styles.login_img_section}`}>
					<div className="bg-black opacity-20 inset-0 z-0" />
					<div className="w-full mx-auto px-20 flex-col items-center space-y-6">
						<h1 className="text-white font-bold text-4xl font-sans">
							Simple App
						</h1>
						<p className="text-white mt-1">
							The simplest app to use
						</p>
						{/* <div className="flex justify-center lg:justify-start mt-6">
							<a
								href="#"
								className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2">
								Get Started
							</a>
						</div> */}
					</div>
				</div>
				<div className="flex w-full md:w-2/4 lg:w-1/3 xl:w-2/5 justify-center items-center bg-white space-y-8">
					<div className="w-full px-8 md:px-10 lg:px-6 xl:px-20">
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
									append={<MuiIcon iconName="email" />}
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
							<Button
								type="submit"
								className="w-full mt-5"
								variant="brown">
								Login
							</Button>
							<div className="flex justify-between mt-4">
								<Link to={"#"}>Forgot Password?</Link>
								<Link to={"#"}>Don't have an account yet?</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};
