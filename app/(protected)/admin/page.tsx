'use client'

import { RoleGate } from "@/app/components/auth/role-gate"
import { addProductsStock } from "@/app/types";
import { userCurrentRole } from "@/hooks/use-current-role"
import { UserRole } from "@prisma/client"
import { ChangeEvent, useState } from "react";


const AdminPage = () => {

    const role = userCurrentRole();

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState<addProductsStock>({
        collection: '',
        files: [],
        productName: '',
        price: undefined,
        stock: undefined,
        description: '',
        discountPrice: undefined,
    });

    const handleChange = (event:

        ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>

    ) => {

        const { name, value, type } = event.target;

        if (type === 'file') {
            setFormData(prevState => ({
                ...prevState,
                [name]: Array.from((event.target as HTMLInputElement).files || [])
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        try {

            const formDataToSend = new FormData();

            formDataToSend.append('collection', formData.collection);
            formDataToSend.append('productName', String(formData.productName));
            formDataToSend.append('price', String(formData.price));
            formDataToSend.append('stock', String(formData.stock));
            formDataToSend.append('description', String(formData.description));
            formDataToSend.append('discountPrice', String(formData.discountPrice));

            formData.files.forEach((file) => {
                formDataToSend.append('file', file);
            });

            const res = await fetch('http://localhost:3000/api/addProductStock', {
                method: 'POST',
                body: formDataToSend,
            });

            const data = await res.json();

            if (data?.error) {

                setError(data.error);
            }
            else if (data?.success) {

                setSuccess(data.success);
            }

        } catch (error) {
            console.log(error);
            setError('Error! Try again later!');
        }

    }

    console.log(error);
    
    console.log(success);

    return (

        <section className="container w-100 text-center">

            <h3>Admin</h3>

            <RoleGate allowedRole={UserRole.ADMIN} >

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col w-2/4 mx-auto mt-10 space-y-8">

                    <label className="border rounded p-3">
                        <select
                            name="collection"
                            value={formData.collection}
                            onChange={handleChange}
                            className="w-full"
                        >
                            <option>Collection</option>
                            <option value="laptops">Laptops</option>
                            <option value="tablets">Tablets</option>
                            <option value="smartphones">Smartphones</option>
                            <option value="TV">TV</option>
                        </select>
                    </label>

                    <input
                        name="files"
                        onChange={handleChange}
                        multiple
                        type="file"
                    />

                    <input
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        placeholder="nume produs"
                        type="text"
                    />

                    <input
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="pret"
                        type="number"
                    />

                    <input
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="stock"
                        type="number"
                    />


                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Descrie produsul"

                    />


                    <input
                        name="discountPrice"
                        placeholder="pret discount"
                        type="number"
                        value={formData.discountPrice}
                        onChange={handleChange}
                    />

                    <button className="submit bg-emerald-950 font-black" type="submit">add</button>

                </form>

            </RoleGate>


        </section>
    )
}

export default AdminPage;