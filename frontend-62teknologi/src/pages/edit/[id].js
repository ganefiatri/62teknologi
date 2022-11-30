import AppLayout from "@/components/Layouts/AppLayout";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps({ params }) {
    const req = await axios.get(`http://127.0.0.1:8000/api/restaurants/${params.id}`);
    const res  = await req.data.data;
    console.log(res)
  
    return {
        props: {
            restaurant: res
        },
    }
  }


function updateRestaurant(props){
    //destruct
    const { restaurant } = props;
    const router = useRouter()
    //state
    const [name, setName] = useState(restaurant.name);
    const [email, setEmail] = useState(restaurant.email);
    const [phone, setPhone] = useState(restaurant.phone);
    const [address, setAddress] = useState(restaurant.address);
    const [city, setCity] = useState(restaurant.city);

    //state validation
    const [validation, setValidation] = useState({});

     //method "updatePost"
     const updatePost = async (e) => {
        e.preventDefault();

        //define formData
        const formData = new FormData();

        //append data to "formData"
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('city', city);
        formData.append('_method', 'PUT');
        
        //send data to server
        await axios.post(`http://localhost:8000/api/restaurants/${restaurant.id}`, formData)
        .then(() => {
            //redirect
            router.push('/dashboard')
        })
        .catch((error) => {

            //assign validation on state
            setValidation(error.response?.data);
        })
        
    };

    return (
        <AppLayout
        header={
            <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                Create
            </h2>
        }>
    
        <Head>
            <title>Create Restaurant</title>
        </Head>
    
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {/* All Restaurant */}
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        {/* <Restaurant/> */}
                        <form className="bg-white flex rounded-lg w-1/2" onSubmit={updatePost}>
                            <div className="flex-1 text-gray-700 p-20">
                                <h1 className="text-3xl pb-2 font-bold">Let's get started</h1>
                                <p className="text-lg text-gray-500">
                                    Update Restaurants by insert your new data...
                                </p>
                                <div className="mt-6">
                                    {/* name input field */}
                                    <div className="pb-4">
                                        <label className="block font-bold text-sm pb-2" htmlFor="name">Name</label>
                                        <input className="border-2 p-2 rounded-md w-full border-teal-400" type="text" name="name" placeholder="Enter Your Restaurants Name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    
                                    {
                                        validation?.name &&
                                            <div className="alert alert-danger">
                                                {validation.name}
                                            </div>
                                    }

                                    {/* email input field */}
                                    <div className="pb-4">
                                        <label className="block font-bold text-sm pb-2" htmlFor="email">Email</label>
                                        <input className="border-2 p-2 rounded-md w-full border-teal-400" type="email" name="email" placeholder="Enter Your email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    
                                    {
                                        validation?.email &&
                                            <div className="alert alert-danger">
                                                {validation.email}
                                            </div>
                                    }

                                     {/* phone number input field */}
                                     <div className="pb-4">
                                        <label className="block font-bold text-sm pb-2" htmlFor="phone">Phone Number</label>
                                        <input className="border-2 p-2 rounded-md w-full border-teal-400" type="number" name="phone" placeholder="Enter Your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                    </div>

                                    {
                                        validation?.phone &&
                                            <div className="alert alert-danger">
                                                {validation.phone}
                                            </div>
                                    }

                                     {/* city input field */}
                                     <div className="pb-4">
                                        <label className="block font-bold text-sm pb-2" htmlFor="city">City</label>
                                        <input className="border-2 p-2 rounded-md w-full border-teal-400" type="text" name="city" placeholder="Enter Your city" value={city} onChange={(e) => setCity(e.target.value)}/>
                                    </div>

                                    {
                                        validation?.city &&
                                            <div className="alert alert-danger">
                                                {validation.city}
                                            </div>
                                    }

                                    {/* Address input field */}
                                    <div className="pb-4">
                                        <label className="block font-bold text-sm pb-2" htmlFor="address">Address</label>
                                        <textarea className="border-2 p-2 rounded-md w-full border-teal-400" type="text" name="address" placeholder="Enter Your address" value={address} onChange={(e) => setAddress(e.target.value)}/>
                                    </div>
                                    
                                    {
                                        validation?.address &&
                                            <div className="alert alert-danger">
                                                {validation.address}
                                            </div>
                                    }

                                    {/* term input field */}
                                    <div className="pb-4">
                                        <label className="block font-bold text-sm pb-2" htmlFor="terms">Terms of Service</label>
                                        <div className="flex items-center gap-2">
                                            <input type="checkbox" name="terms" value="checked" className="h-5 w-5 text-teal-500 border-2 focus:border-teal-500" />
                                            <p className="text-sm text-gray-500">agree with term and condition.</p>
                                        </div>
                                    </div>
                                    <button type="submit" className="bg-teal-500 text-sm text-white py-3 mt-6 rounded-lg w-full">Start Update Form</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </AppLayout>
    )
}


export default updateRestaurant;