import { BiAddToQueue } from 'react-icons/bi';
import { useState } from 'react';

const AddItem = ({onSendInfo, lastId}) => {
    const clearData = {
            title: '', 
            date: '', 
            time: '', 
            notes: ''
    }
    let [toggleForm, setToggleForm] = useState(false);
    let [formData, setFormData] = useState(clearData);

    function formDataPublish() {
        const itemInfo = {
            id: lastId + 1,
            title: formData.title, 
            date: formData.date + ' ' + formData.time, 
            notes: formData.notes
        }
        onSendInfo(itemInfo);
        setFormData(clearData);
        setToggleForm(!toggleForm);
    }

    return (
        /* ADD ITEM FORM */
        <form className={`flex-col ${toggleForm ? '' : 'border-b-2 rounded'}`}>

            {/* HEADER BUTTON SECTION */}
            <div className='flex bg-gray-200 items-center hover:bg-gray-400 hover:text-white'>
                <button onClick={() => setToggleForm(!toggleForm)} type="button" className="flex mt-2"><BiAddToQueue className="mt-1 mx-1 mb-3 ml-2" />Add Item</button>
            </div>

            {/* TOGGLE ADD ITEM FORM ON CLICK */}
            {
                !toggleForm && 
                
                <div className="mr-2">
                    {/* TITLE */}
                    <div className="flex mt-2 justify-between mb-2">
                        <label className="mr-6 ml-2">Title</label>
                        <input onChange={(event) => {setFormData({...formData, title: event.target.value})}} 
                            value={formData.title} type="text" 
                            className="w-full border-2 border-gray-100 outline-none ml-1" />
                    </div>

                    {/* DATE */}
                    <div className="flex mt-2 justify-between mb-2">
                        <label className="mr-6 ml-2">Date</label>
                        <input onChange={(event) => {setFormData({...formData, date: event.target.value})}} 
                            value={formData.date} type="date" 
                            className="w-full border-2 border-gray-100 outline-none" />
                    </div>

                    {/* TIME */}
                    <div className="flex mt-2 justify-between mb-2">
                        <label className="mr-6 ml-2">Time</label>
                        <input onChange={(event) => {setFormData({...formData, time: event.target.value})}} 
                            value={formData.time} type="time" 
                            className="w-full border-2 border-gray-100 outline-none" />
                    </div>

                    {/* NOTES */}
                    <div className="flex mt-2 justify-between mb-2">
                        <label className="mr-4 ml-2">Notes</label>
                        <textarea onChange={(event) => {setFormData({...formData, notes: event.target.value})}}  
                            value={formData.notes} className="w-full border-2 border-gray-100 outline-none" />
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="flex mt-4 justify-end mb-4 mr-1">
                        <button type="submit" onClick={formDataPublish}
                            className="bg-gray-200 hover:bg-gray-400 hover:text-white p-1">Submit</button>
                    </div>
                </div>
            }

        </form>
    );
}

export default AddItem;