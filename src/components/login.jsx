import { useState, useEffect, useContext } from 'react';
import DatabaseContext from '../db/dbContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const { setUser, getUser } = useContext(DatabaseContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Watchlists | Home';
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.setItem('user', e.target.email.value);
        const user = await getUser(email)
        if(user === null) setUser(email)
        navigate('home');
    }

    return (
        <div className="container min-h-screen mx-auto">
            <div className="flex flex-col w-11/12 lg:w-4/12 mx-auto space-y-5 items-center justify-center">
                <h1 className="font-extrabold tracking-tight text-5xl text-red-600">Watchlists</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-3 items-center justify-center">
                    <label className='w-full' htmlFor='email'>Email Address</label>
                    <input name='email' value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-gray-400 shadow-md py-2 px-3 rounded" type="email" autoComplete="email" placeholder="" />
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Sign in with Email</button>
                </form>
            </div>
        </div>
    );
}
