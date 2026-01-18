import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../ui/Button';
import Section from '../../ui/Section';
import FormSection from '../../ui/FormSection';
import MainDiv from '../../ui/MainDiv';
import { globalApi } from '../../../services/apiClient';
import { Branch_API } from '../../../services/apiRoutes';

function BranchForm() {
    const navigate = useNavigate();
    const { state } = useLocation();

    const [form, setForm] = useState({
        name: "",
        location: "",
        contact: ""
    });

    useEffect(() => {
        if (state?.mode === "edit" || state?.mode === "view") {
            setForm({
                name: state?.data?.name,
                location: state?.data?.location,
                contact: state?.data?.contact
            });
        } else {
            setForm({
                name: "",
                location: "",
                contact: ""
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let payload = form;

            // If edit mode, include id in payload
            if (state?.mode === "edit") {
                payload.id = state?.data?._id;
            }

            const response = await globalApi(
                "POST",
                payload,
                Branch_API.ADD
            );

            console.log("response:", response);
            navigate("/branch");
        } catch (error) {
            console.log("error:", error);
        }
    };

    return (
        <MainDiv>
            <Section>
                <h2 className='text-2xl font-bold text-[#4c4c4c]'>
                    {state?.mode === 'add' && 'Add Branch'}
                    {state?.mode === 'edit' && 'Edit Branch'}
                    {state?.mode === 'view' && 'View Branch'}
                </h2>
                <Button onClick={() => navigate(-1)}>Back</Button>
            </Section>

            <FormSection>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-3'>
                        
                        <div className='my-2'>
                            <label className='text-lg font-medium'>Branch Name:</label>
                            <input
                                type="text"
                                className='bg-gray border border-gray-200 px-2 py-3 rounded-md focus:outline-indigo-600 block w-3/4'
                                name="name"
                                value={form.name}
                                readOnly={state?.mode === "view"}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='my-2'>
                            <label className='text-lg font-medium'>Location:</label>
                            <input
                                type="text"
                                className='bg-gray border border-gray-200 px-2 py-3 rounded-md focus:outline-indigo-600 block w-3/4'
                                name="location"
                                value={form.location}
                                readOnly={state?.mode === "view"}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='my-2'>
                            <label className='text-lg font-medium'>Contact:</label>
                            <input
                                type="text"
                                className='bg-gray border border-gray-200 px-2 py-3 rounded-md focus:outline-indigo-600 block w-3/4'
                                name="contact"
                                value={form.contact}
                                readOnly={state?.mode === "view"}
                                onChange={handleChange}
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

export default BranchForm;
