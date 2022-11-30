import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import form_validate from '@/lib/validate'
import { useFormik } from 'formik'
import Head from 'next/head'
import { useRouter } from 'next/router'

function EditRestaurant({restaurantUpdateData}) {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            city: '',
            address: '',
        },
        validate: form_validate,
        onSubmit
    });

    async function onSubmit(values) {
        console.log(values)
         //send post data
       await axios.put(`http://localhost:8000/api/restaurants/${restaurantUpdateData[0].id}`, values, {
            "headers": {
                "content-type": "application/json",
            }
        }).then(function (response) {
            console.log(response);
            router.push('http://localhost:3000/dashboard')
        }).catch(function (error) {
                console.log(error.response);
        });

    }
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
                    <form className="bg-white flex rounded-lg w-1/2" onSubmit={formik.handleSubmit}>
                        <div className="flex-1 text-gray-700 p-20">
                            <h1 className="text-3xl pb-2 font-bold">Let's get started</h1>
                            <p className="text-lg text-gray-500">
                                Create Your Restaurants by insert your data...
                            </p>
                            <div className="mt-6">
                                {/* name input field */}
                                <div className="pb-4">
                                    <label className="block font-bold text-sm pb-2" htmlFor="name">Name</label>
                                    <input className="border-2 p-2 rounded-md w-full border-teal-400" type="text" name="name" placeholder="Enter Your Restaurants Name" {...formik.getFieldProps('name')}/>
                                </div>
                                {formik.errors.name && formik.touched.name ? <span className="text-rose-500">{formik.errors.name}</span> : <></>}
                                {/* email input field */}
                                <div className="pb-4">
                                    <label className="block font-bold text-sm pb-2" htmlFor="email">Email</label>
                                    <input className="border-2 p-2 rounded-md w-full border-teal-400" type="email" name="email" placeholder="Enter Your email" {...formik.getFieldProps('email')}/>
                                </div>
                                {formik.errors.email && formik.touched.email ? <span className="text-rose-500">{formik.errors.email}</span> : <></>}
                                 {/* phone number input field */}
                                 <div className="pb-4">
                                    <label className="block font-bold text-sm pb-2" htmlFor="phone">Phone Number</label>
                                    <input className="border-2 p-2 rounded-md w-full border-teal-400" type="number" name="phone" placeholder="Enter Your phone number" {...formik.getFieldProps('phone')} />
                                </div>
                                 {/* city input field */}
                                 <div className="pb-4">
                                    <label className="block font-bold text-sm pb-2" htmlFor="city">City</label>
                                    <input className="border-2 p-2 rounded-md w-full border-teal-400" type="text" name="city" placeholder="Enter Your city" {...formik.getFieldProps('city')}/>
                                </div>
                                {/* Address input field */}
                                <div className="pb-4">
                                    <label className="block font-bold text-sm pb-2" htmlFor="address">Address</label>
                                    <textarea className="border-2 p-2 rounded-md w-full border-teal-400" type="text" name="address" placeholder="Enter Your address" {...formik.getFieldProps('address')}/>
                                </div>
                                
                                {/* term input field */}
                                <div className="pb-4">
                                    <label className="block font-bold text-sm pb-2" htmlFor="terms">Terms of Service</label>
                                    <div className="flex items-center gap-2">
                                        <input type="checkbox" name="terms" value="checked" className="h-5 w-5 text-teal-500 border-2 focus:border-teal-500" />
                                        <p className="text-sm text-gray-500">agree with term and condition.</p>
                                    </div>
                                </div>
                                <button type="submit" className="bg-teal-500 text-sm text-white py-3 mt-6 rounded-lg w-full">Start Make Form</button>
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

export default EditRestaurant