import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import Section from '../../ui/Section';
import FormSection from '../../ui/FormSection';
import MainDiv from '../../ui/MainDiv';
import { globalApi } from '../../../services/apiClient';
import { Product_API } from '../../../services/apiRoutes';

function ProductForm() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [form, setForm] = useState({
        name: "",
        category: "",
        unit: "",
        gst: "",
        hsn: "",
        basePrice: ""
    });

    useEffect(() => {
        if (state?.mode === "edit" || state?.mode === "view") {
            setForm({
                name: state?.data?.name || "",
                category: state?.data?.category || "",
                unit: state?.data?.unit || "",
                gst: state?.data?.gst || "",
                hsn: state?.data?.hsn || "",
                basePrice: state?.data?.basePrice || ""
            });
        } else {
            setForm({
                name: "",
                category: "",
                unit: "",
                gst: "",
                hsn: "",
                basePrice: ""
            });
        }
    }, [state]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let payload = {
                ...form,
                gst: Number(form.gst),
                basePrice: Number(form.basePrice)
            };

            // edit mode
            if (state?.mode === "edit") {
                payload.id = state?.data?._id;
            }

            const response = await globalApi(
                "POST",
                payload,
                Product_API.ADD
            );

            console.log("response:", response);
            navigate("/product");
        } catch (error) {
            console.log("error:", error);
        }
    };

    return (
        <MainDiv>
            <Section>
                <h2 className='text-2xl font-bold text-[#4c4c4c]'>
                    {state?.mode === 'add' && 'Add Product'}
                    {state?.mode === 'edit' && 'Edit Product'}
                    {state?.mode === 'view' && 'View Product'}
                </h2>
                <Button onClick={() => navigate(-1)}>Back</Button>
            </Section>

            <FormSection>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-3 gap-4'>

                        {/* Product Name */}
                        <div className='my-2'>
                            <label className='text-lg font-medium'>Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                readOnly={state?.mode === "view"}
                                onChange={handleChange}
                                className='bg-gray border border-gray-200 px-2 py-3 rounded-md block w-3/4'
                            />
                        </div>

                        {/* Category */}
                        <div className='my-2'>
                            <label className='text-lg font-medium'>Category</label>
                            <input
                                type="text"
                                name="category"
                                value={form.category}
                                readOnly={state?.mode === "view"}
                                onChange={handleChange}
                                className='bg-gray border border-gray-200 px-2 py-3 rounded-md block w-3/4'
                            />
                        </div>

                        {/* Unit */}
                        <div className='my-2'>
                            <label className='text-lg font-medium'>Unit</label>
                            <input
                                type="text"
                                name="unit"
                                value={form.unit}
                                readOnly={state?.mode === "view"}
                                onChange={handleChange}
                                className='bg-gray border border-gray-200 px-2 py-3 rounded-md block w-3/4'
                            />
                        </div>

                        {/* GST */}
                        <div className='my-2'>
                            <label className='text-lg font-medium'>GST (%)</label>
                            <input
                                type="number"
                                name="gst"
                                value={form.gst}
                                readOnly={state?.mode === "view"}
                                onChange={handleChange}
                                className='bg-gray border border-gray-200 px-2 py-3 rounded-md block w-3/4'
                            />
                        </div>

                        {/* HSN */}
                        <div className='my-2'>
                            <label className='text-lg font-medium'>HSN Code</label>
                            <input
                                type="text"
                                name="hsn"
                                value={form.hsn}
                                readOnly={state?.mode === "view"}
                                onChange={handleChange}
                                className='bg-gray border border-gray-200 px-2 py-3 rounded-md block w-3/4'
                            />
                        </div>

                        {/* Base Price */}
                        <div className='my-2'>
                            <label className='text-lg font-medium'>Base Price</label>
                            <input
                                type="number"
                                name="basePrice"
                                value={form.basePrice}
                                readOnly={state?.mode === "view"}
                                onChange={handleChange}
                                className='bg-gray border border-gray-200 px-2 py-3 rounded-md block w-3/4'
                            />
                        </div>

                    </div>

                    {state?.mode !== "view" && (
                        <div className='mt-4'>
                            <Button type="submit">Submit</Button>
                        </div>
                    )}
                </form>
            </FormSection>
        </MainDiv>
    );
}

export default ProductForm;
