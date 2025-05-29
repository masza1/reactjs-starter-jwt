import * as styles from "@src/assets/custom.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "./Login.schema";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginAction } from "@src/redux/actions/auth/authAction";
import {
	Button,
	InputField,
	Link,
	MuiIcon,
	PasswordIcon,
} from "@src/components";
import moment from "@src/utils/moment-locale-id";
import { useNavigate } from "react-router-dom";
import { route } from "@src/routes/routeHelper";

export const LoginV2 = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

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
		dispatch(loginAction({ email: data.email, password: data.password }))
			.unwrap()
			.then(() => {
				toast("Login successful", { type: "success" });
				navigate(route("admin.dashboard"), { replace: true });
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
			<div className="h-screen flex relative bg-light-background dark:bg-dark-background flex-col items-center justify-center p-4">
				<div className="absolute inset-0 top-0 left-0 w-full h-1/3 bg-radial-[at_50%_200%] to-brand-brown from-brand-olive"></div>
				<div className="relative z-10">
					<div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
						<div className="col-span-1 md:col-span-2 bg-light-surface dark:bg-dark-surface rounded-2xl p-6 shadow-md">
							<img
								src="https://images.unsplash.com/photo-1650825556125-060e52d40bd0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
								alt="Banner"
								className="rounded-xl w-full h-52 object-center"
							/>

							<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h3 className="font-bold text-brand-slate text-lg mb-1">
										Lorem ipsum
									</h3>
									<h4 className="font-semibold text-brand-brown text-md mb-1">
										lorem ipsum dolor sit amet
									</h4>
									<p className="text-sm text-brand-slate">
										Lorem ipsum dolor sit amet consectetur
										adipisicing elit. Temporibus, enim natus
										totam ullam recusandae explicabo eum
										nihil pariatur! Ratione veniam,
										consequuntur vitae sed similique
										consequatur sunt nemo illo sapiente
										quasi.
									</p>
								</div>
								<div>
									<h3 className="font-bold text-brand-slate text-lg mb-1">
										Lorem ipsum
									</h3>
									<h4 className="font-semibold text-brand-brown text-md mb-1">
										lorem ipsum dolor sit amet
									</h4>
									<p className="text-sm text-brand-slate">
										Lorem ipsum dolor sit amet consectetur
										adipisicing elit. Temporibus, enim natus
										totam ullam recusandae explicabo eum
										nihil pariatur! Ratione veniam,
										consequuntur vitae sed similique
										consequatur sunt nemo illo sapiente
										quasi.
									</p>
								</div>
							</div>
						</div>

						{/* Login Form */}
						<form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
							<div className="bg-light-surface dark:bg-dark-surface rounded-2xl p-6 shadow-md space-y-4">
								<div className="space-y-1 ">
									<h2 className="text-xl font-semibold text-brand-slate">
										Halo,
									</h2>
									<p className="text-brand-slate">
										Selamat Datang!
									</p>
								</div>

								<div className="space-y-2">
									<InputField
										label="Email"
										name="email"
										type="email"
										register={register}
										error={errors.email}
										size="md"
										append={<MuiIcon icnoName="email" />}
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

									<div className="flex justify-between text-sm text-brand-slate">
										<Link to={"#"}>Forgot Password?</Link>
									</div>

									<Button
										type="submit"
										className="w-full mt-5"
										variant="brown">
										Masuk
									</Button>
								</div>

								<div className="text-sm text-brand-slate text-center">
									Belum punya Akun ? &nbsp;
									<Link to={"#"} className="font-semibold">
										Daftar Sekarang
									</Link>
								</div>
							</div>
						</form>
					</div>

					{/* Footer */}
					<div className="mt-10 text-xs text-brand-slate text-center space-y-1">
						{/* <div className="space-x-4">
							<a href="#" className="hover:underline">
								LOKASI BCA
							</a>
							<a href="#" className="hover:underline">
								INFORMASI KURS
							</a>
							<a href="#" className="hover:underline">
								MEDIA SOSIAL
							</a>
						</div> */}
						<p>
							© {moment().format("Y")} YKKA, All Rights Reserved.
							&nbsp;
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
