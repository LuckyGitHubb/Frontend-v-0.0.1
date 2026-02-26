import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Button from '../../ui/Button';
import Section from '../../ui/Section';
import FormSection from '../../ui/FormSection';
import MainDiv from '../../ui/MainDiv';
import { globalApi } from '../../../services/apiClient';
import { Invoice_API } from '../../../services/apiRoutes';
import { PAYMENT_METHODS } from '../../../constants/constants';

function InvoiceForm() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const {saleId} = useParams()

    const [form, setForm] = useState({
        customerName: "",
        customerMobile: "",
        paymentMode: ""
    });

    useEffect(() => {
        if (state?.mode === "edit" || state?.mode === "view") {
            setForm({
                customerName: state?.data?.customerName,
                customerMobile: state?.data?.customerMobile,
                paymentMode: state?.data?.paymentMode
            });
        } else {
            setForm({
                customerName: "",
                customerMobile: "",
                paymentMode: ""
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
            let payload = {...form,saleId:saleId};
            console.log('payload: ',payload)

            // If edit mode, include id in payload
            if (state?.mode === "edit") {
                payload.id = state?.data?._id;
            }

            const response = await globalApi(
                "POST",
                payload,
                Invoice_API.ADD(saleId),
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
                    {state?.mode === 'add' && 'Add Invoice'}
                    {state?.mode === 'edit' && 'Edit Invoice'}
                    {state?.mode === 'view' && 'View Invoice'}
                </h2>
                <Button onClick={() => navigate(-1)}>Back</Button>
            </Section>

            <FormSection>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-3'>

                        <div className='my-2'>
                            <label className='text-lg font-medium'>Customer Name:</label>
                            <input
                                type="text"
                                className='bg-gray border border-gray-200 px-2 py-3 rounded-md focus:outline-indigo-600 block w-3/4'
                                name="customerName"
                                value={form.customerName}
                                readOnly={state?.mode === "view"}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='my-2'>
                            <label className='text-lg font-medium'>Customer Mobile:</label>
                            <input
                                type="text"
                                className='bg-gray border border-gray-200 px-2 py-3 rounded-md focus:outline-indigo-600 block w-3/4'
                                name="customerMobile"
                                value={form.customerMobile}
                                readOnly={state?.mode === "view"}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='my-2'>
                            <label className='text-lg font-medium'>Payment Mode:</label>
                            <select
                                name="paymentMode"
                                value={form.paymentMode}
                                onChange={handleChange}
                                disabled={state?.mode === "view"}
                                className="bg-gray border border-gray-200 px-2 py-3 rounded-md w-3/4"
                            >
                                <option value="">Select Payment Method</option>

                                {PAYMENT_METHODS.map((item) => (
                                    <option key={item?.value} value={item?.value}>
                                        {item?.label}
                                    </option>
                                ))}
                            </select>
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

export default InvoiceForm;
