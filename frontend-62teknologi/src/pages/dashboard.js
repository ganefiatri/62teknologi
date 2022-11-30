import AppLayout from '@/components/Layouts/AppLayout'
import Restaurant from '@/components/Restaurant'
import Head from 'next/head'
import axios from '@/lib/axios'
import { useEffect, useMemo, useState } from 'react'
import DataTable from 'react-data-table-component';
import FilterComponent from '@/components/FilterComponent'
import  Link  from 'next/link'


function Dashboard() {
    const [restaurants, setRestaurants] = useState([])
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = restaurants.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
    );

    const fetchRestaurant = async () => {
        const data = await axios.get("http://localhost:8000/api/restaurants");
        setRestaurants(data.data.data.data)
    }

    const handleButtonClick = async (e, id) => {
        e.preventDefault();
        try {
            await axios.delete("http://localhost:8000/api/restaurants/"+id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    };

    const subHeaderComponent = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);

    const column = [

        {
            name: "Name",
            selector: row => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: row => row.email
        },
        {
            name: "Phone",
            selector: row => row.phone
        },
        {
            name: "address",
            selector: row => row.address
        },
        {
            name: "City",
            selector: row => row.city
        },
        {
            name: "Buttons",
            button: true,
            cell: row =>
                 (
                    <>
                        <button
                            className="p-2 mr-1 rounded-md bg-green-500 text-white"
                        >
                            <Link href={`/edit/${row.id}`}>Edit</Link>
                        </button>
                        <button 
                        onClick={(e) => handleButtonClick(e, row.id)}
                        className="p-2 rounded-md bg-red-500 text-white"
                        >Delete</button>
                    </>
                )
        }
    ]

    useEffect(() => {
        fetchRestaurant()
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }>

            <Head>
                <title>Restaurant Location</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* All Restaurant */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* <Restaurant/> */}
                            <DataTable
                                title="Restaurant List"
                                columns={column}
                                data={filteredItems}
                                defaultSortField="name"
                                striped
                                pagination
                                subHeader
                                subHeaderComponent={subHeaderComponent}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default Dashboard


