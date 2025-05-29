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

export const LoginV2 = () => {
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
		dispatch(loginAction({ email: data.email, password: data.password }))
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
			<div className="h-screen flex relative bg-light-background dark:bg-dark-background flex-col items-center justify-center p-4">
				<div className="absolute inset-0 top-0 left-0 w-full h-1/3 bg- to-brand-brown from-brand-olive"></div>
				<div className="relative z-10">
					<div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
						{/* Left Banner */}
						<div className="col-span-1 md:col-span-2 bg-light-surface dark:bg-dark-surface rounded-2xl p-6 shadow-md">
							<img
								src="https://via.placeholder.com/800x300.png?text=The+New+Gebyar+Hadiah+BCA"
								alt="Banner"
								className="rounded-xl w-full"
							/>

							<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<h3 className="font-bold text-brand-slate text-lg mb-1">
										EDUKATIPS
									</h3>
									<h4 className="font-semibold text-brand-brown text-md mb-1">
										8 tips menjaga Keamanan Data Internet
										Banking & Kartu Kredit
									</h4>
									<p className="text-sm text-brand-slate">
										Seiring dengan perkembangan informasi
										dan teknologi, keamanan data secara
										digital merupakan salah satu hal penting
										yang perlu kita perhatikan.
									</p>
								</div>
								<div>
									<h3 className="font-bold text-brand-slate text-lg mb-1">
										AWAS MODUS
									</h3>
									<h4 className="font-semibold text-brand-brown text-md mb-1">
										Awas Modus Penipuan Terkini Lakukan 3
										Hal Ini
									</h4>
									<p className="text-sm text-brand-slate">
										Keberadaan internet dan media sosial
										membuat kita semakin mudah membagikan
										informasi. Sayangnya, terkadang kita
										dengan sadar membagikan informasi yang
										bersifat pribadi.
									</p>
								</div>
							</div>
						</div>

						{/* Login Form */}
						<div className="bg-light-surface dark:bg-dark-surface rounded-2xl p-6 shadow-md space-y-4">
							<h2 className="text-xl font-semibold text-brand-slate">
								Halo,
							</h2>
							<p className="text-brand-slate">Selamat Datang!</p>

							<div className="space-y-2">
								<label className="text-sm font-medium text-brand-brown">
									BCA ID
								</label>
								<input
									type="text"
									className="w-full px-4 py-2 border border-brand-olive rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue"
								/>

								<label className="text-sm font-medium text-brand-brown">
									Password
								</label>
								<input
									type="password"
									className="w-full px-4 py-2 border border-brand-olive rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue"
								/>

								<div className="flex justify-between text-xs text-brand-slate">
									<a href="#" className="hover:underline">
										Lupa BCA ID
									</a>
									<a href="#" className="hover:underline">
										Reset Password
									</a>
								</div>

								<button className="w-full mt-2 py-2 bg-brand-olive text-white rounded-xl font-semibold hover:bg-brand-brown">
									Masuk
								</button>
							</div>

							<div className="text-sm text-brand-slate text-center">
								Belum punya BCA ID?{" "}
								<a
									href="#"
									className="text-brand-blue font-semibold hover:underline">
									Registrasi
								</a>
							</div>

							<div className="bg-warning/20 text-warning text-xs p-3 rounded-md">
								<strong>Perbarui Password BCA ID</strong> secara
								berkala untuk keamanan data dan transaksi Anda.{" "}
								<a href="#" className="underline text-warning">
									Lihat informasi selengkapnya
								</a>
							</div>
						</div>
					</div>

					{/* Footer */}
					<div className="mt-10 text-xs text-brand-slate text-center space-y-1">
						<div className="space-x-4">
							<a href="#" className="hover:underline">
								LOKASI BCA
							</a>
							<a href="#" className="hover:underline">
								INFORMASI KURS
							</a>
							<a href="#" className="hover:underline">
								MEDIA SOSIAL
							</a>
						</div>
						<p>
							© 2021 PT Bank Central Asia Tbk, All Rights
							Reserved.{" "}
							<a href="#" className="underline">
								Syarat & Ketentuan
							</a>
							,{" "}
							<a href="#" className="underline">
								Kebijakan Privasi
							</a>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
