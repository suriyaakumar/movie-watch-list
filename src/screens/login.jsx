import { useState, useEffect, useContext } from 'react';
import DatabaseContext from '../contexts/dbContext';
import { useNavigate } from 'react-router-dom';
import { SignIn } from '@phosphor-icons/react';
import { toast } from 'react-toastify';

export default function Login() {
	const [email, setEmail] = useState('');
	const { setUser, getUser } = useContext(DatabaseContext);
	const navigate = useNavigate();

	useEffect(() => {
		document.title = 'Watchlists | Login';
	}, []);

	const handleLogin = async (e) => {
		try {
			e.preventDefault();
			localStorage.setItem('user', e.target.email.value);
			const user = await getUser(email);
			if (!user)
				await setUser(email, {
					name: '',
					email,
					image: '',
					watchlists: [],
				});
			navigate('home');
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div className='container min-h-screen m-auto'>
			<div className='flex flex-col w-11/12 lg:w-4/12 mx-auto space-y-5 items-center justify-center'>
				<h1 className='font-extrabold tracking-tight text-5xl text-red-600'>
					Watchlists
				</h1>
				<form
					onSubmit={handleLogin}
					className='w-full flex flex-col space-y-3 items-center justify-center'
				>
					<label className='w-full' htmlFor='email'>
						Email Address
					</label>
					<input
						name='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='w-full focus:outline-none border-2 py-2 px-3 rounded'
						type='email'
						autoComplete='email'
						placeholder=''
					/>
					<button className='w-full flex justify-center space-x-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
						<SignIn className='h-6 w-6' />
						<span>Sign in with Email</span>
					</button>
				</form>
			</div>
		</div>
	);
}
