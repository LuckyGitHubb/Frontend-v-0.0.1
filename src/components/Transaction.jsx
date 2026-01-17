import React, { useEffect, useReducer, useState } from 'react'
import Section from './ui/Section'
import FormSection from './ui/FormSection'
import MainDiv from './ui/MainDiv'
import Button from './ui/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import { formattingDate } from '../utils/date/formatDate'
import { globalApi } from '../services/apiClient'
import { Transaction_API } from '../services/apiRoutes'

function Transaction() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [form, setForm] = useState({});

    useEffect(() => {
        if (state?.mode === 'edit' || state?.mode === 'view') {
            setForm({
                date: state?.data?.date ? formattingDate(state?.data?.date) : "",
                type: state?.data?.type,
                amount: state?.data?.amount,
                gstRate: state?.data?.gstRate,
                gstAmount: state?.data?.gstAmount,
                totalAmount: state?.data?.totalAmount,
                paymentMethod: state?.data?.paymentMethod,
                purpose: state?.data?.purpose,
            })
        }
        else {
            setForm({
                date: "",
                type: "",
                amount: "",
                gstRate: "",
                gstAmount: "",
                totalAmount: "",
                paymentMethod: "",
                purpose: ""
            })
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e?.preventDefault()
        try {
            const response = await globalApi('POST', form, Transaction_API.ADD)
            console.log('response: ', response)
            navigate('/expense')
        } catch (error) {
            console.log('error: ', error)
        }
    }
    return (
        <MainDiv>

            <Section>
                <h2 className='text-2xl font-bold text-[#4c4c4c]'>
                    {state?.mode === 'add' && 'Add Transaction'}
                    {state?.mode === 'edit' && 'Edit Transaction'}
                    {state?.mode === 'view' && 'View Transaction'}
                </h2>
                <Button onClick={() => navigate(-1)}>Back</Button>
            </Section>
            <div className='p-4 mt-2 mb-3'>
                <h2 className='text-2xl text-[#4c4c4c] font-bold border-b border-[#cdcdcd] pb-1'>
                    {state?.mode === 'add' && 'Add Expense'}
                    {state?.mode === 'edit' && 'Edit Expense'}
                    {state?.mode === 'view' && 'View Expense'}
                </h2>
            </div>
            <FormSection>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='grid grid-cols-3'>
                            <div className='my-2'>
                                <label className='text-lg font-medium' htmlFor="">Date: </label>
                                <input
                                    className='bg-gray border border-gray-200 px-2 py-3 rounded-md focus:outline-indigo-600 block w-3/4'
                                    type="date"
                                    name="date"
                                    readOnly={state?.mode === 'view'}
                                    value={form.date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='my-2'>
                                <label className='text-lg font-medium' htmlFor="">Type: </label>
                                <select
                                    className='bg-gray border border-gray-200 px-2 py-3 rounded-md focus:outline-indigo-600 block w-3/4'
                                    name="type"
                                    disabled={state?.mode === 'view'}
                                    value={form.type}
                                    onChange={handleChange}>
                                    <option disabled value="">Select Type</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Office">Office</option>
                                    <option value="Supplies">Supplies</option>
                                    <option value="Utilities">Utilities</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className='my-2'>
                                <label className='text-lg font-medium' htmlFor="">Amount: </label>
                                <input
                                    className='bg-gray border border-gray-200 px-2 py-3 rounded-md focus:outline-indigo-600 block w-3/4'
                                    type="number"
                                    name="amount"
                                    readOnly={state?.mode === 'view'}
                                    value={form.amount}
                                    onChange={handleChange} />
                            </div>
                            <div className='my-2'>
                                <label className='text-lg font-medium' htmlFor="">GST Rate(%): </label>
                                <select className='bg-gray border border-gray-200 px-2 py-3 rounded-md focus:outline-indigo-600 block w-3/4'
                                    name="gstRate"
                                    disabled={state?.mode === 'view'}
                                    value={form.gstRate}
                                    onChange={handleChange}>
                                    <option disabled value="">Select GST Rate</option>
                                    <option value="0">0%</option>
                                    <option value="5">5%</option>
                                    <option value="12">12%</option>
                                    <option value="18">18%</option>
                                </select>
                            </div>
                            <div className='my-2'>
                                <label className='text-lg font-medium' htmlFor="">GST Amount: </label>
                                <input className='bg-gray border border-gray-200 px-2 py-3 rounded-md focus:outline-indigo-600 block w-3/4'
                                    type="number"
                                    readOnly={state?.mode === 'view'}
                                    value={form.gstAmount}
                                    name="gstAmount"
                                    onChange={handleChange} />
                            </div>
                            <div className='my-2'>
                                <label className='text-lg font-medium' htmlFor="">Total Amount: </label>
                                <input className='bg-gray border border-gray-200 px-2 py-3 rounded-md focus:outline-indigo-600 block w-3/4'
                                    type="number"
                                    readOnly={state?.mode === 'view'}
                                    value={form.totalAmount}
                                    name="totalAmount"
                                    onChange={handleChange} />
                            </div>
                            <div className='my-2'>
                                <label className='text-lg font-medium' htmlFor="">Payment Method: </label>
                                <select className='bg-gray border border-gray-200 px-2 py-3 rounded-md focus:outline-indigo-600 block w-3/4'
                                    disabled={state?.mode === 'view'}
                                    value={form.paymentMethod}
                                    name="paymentMethod"
                                    onChange={handleChange}>
                                    <option disabled value="">Select Payment Method</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Card">Card</option>
                                    <option value="UPI">UPI</option>
                                    <option value="Bank Transfer">Bank Transfer</option>
                                </select>
                            </div>
                            <div className='my-2'>
                                <label className='text-lg font-medium' htmlFor="">Purpose: </label>
                                <input className='bg-gray border border-gray-200 px-2 py-3 rounded-md focus:outline-indigo-600 block w-3/4' type="text"
                                    readOnly={state?.mode === 'view'}
                                    value={form.purpose}
                                    name="purpose"
                                    onChange={handleChange} />
                            </div>
                        </div>
                        <div className='my-2'>
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </div>
            </FormSection>
        </MainDiv>
    )
}

export default Transaction