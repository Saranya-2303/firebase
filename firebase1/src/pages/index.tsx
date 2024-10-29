import { useState } from "react";
import {auth, db} from '../styles/firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
// import Header from "@/Components/Header";
import { addDoc, collection } from "firebase/firestore";
import Link from "next/link";
// import Footer from "@/Components/SubComponents/Footer";
 
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
 
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try{
     
      const userCredential = await createUserWithEmailAndPassword(auth,email,password);
      const  user = userCredential.user;
      const token = await user.getIdToken();
      console.log("Token:", token);
      const foodId =  await addDoc(collection(db,"Users"),{email})
      localStorage.setItem('Mytoken', token);
      localStorage.setItem('MytokenUserId', foodId.id);
      console.log("UserData:",foodId)
      router.push("/GetFoodItems")
 
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
 
    }catch(e){
      console.error(e);
    }
       
    // Handle login logic here
    console.log("Login attempt with:", { email, password });
  };
 
  console.log("Email:",email);
  console.log("Pass:",password);
 
  return (
    <>
    <div className="flex items-center justify-center min-h-screen bg-violet-600">
      <div className="w-full max-w-md bg-blend-multiply shadow-md rounded-md p-6  border border-t-4 border-b-4 border-r-4 border-l-4  border-gray-950">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-black">Register</h2>
          <p className="text-black">Enter your credentials to access your account</p>
        </div>
     
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="bg-red-100 text-red-700 p-2 rounded-md">
                {error}
              </div>
            )}
          </div>
          <div className="mt-6">
          <p><Link href="/Login " className="text-black font-bold hover:text-red-600 underline">SignUp</Link></p>
         
            <button
              type="submit"
              className="w-full bg-black font-extrabold text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:ring-4 focus:ring-blue-500">
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};