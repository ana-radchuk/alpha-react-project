import { BiCaretDown, BiCheck } from 'react-icons/bi';
import { useState } from 'react';

/* DROPDOWN SORT BY MENU SECTION */
const Dropdown = ({sortBy, onSortByChange, orderBy, onOrderByChange}) => {
    return (
        <div className="divide-y">

            {/* TITLE/DATE SORTING */}
            <div>
                <div onClick={() => onSortByChange('title')}
                    className="px-4 flex justify-between hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                    Title 
                    {(sortBy === 'title') && <BiCheck />}
                </div>

                <div onClick={() => onSortByChange('date')}
                    className="px-4 flex justify-between hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                    Date 
                    {(sortBy === 'date') && <BiCheck />}
                </div>
            </div>

            {/* ASC/DESC SORTING */}
            <div>
                <div onClick={() => onOrderByChange('asc')}
                    className="px-4 flex justify-between hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                    Asc 
                    {(orderBy === 'asc') && <BiCheck />}
                </div>
            
                <div onClick={() => onOrderByChange('desc')}
                    className="px-4 flex justify-between hover:bg-gray-100 hover:text-gray-900 cursor-pointer">
                    Desc  
                    {(orderBy === 'desc') && <BiCheck />}
                </div>
            </div>
        </div>
    );      
}

/* SEARCH BAR */
const Search = ({query, onQueryChange, sortBy, onSortByChange, orderBy, onOrderByChange}) => {
    let [toggleSort, setToggleSort] = useState(false); 
    return (

        /* SEARCH FORM */
        <form className="flex w-96 justify-between"> 

                {/* DROPDOWN BUTTON */}
                <div className="border-b hover:bg-gray-400 hover:text-white ml-7">
                    <button onClick={() => {setToggleSort(!toggleSort)}} type="button" className="flex m-1 mx-2" id="options-menu">
                        Sort by
                        <BiCaretDown className="mt-1 ml-1" />
                    </button>
                </div>

                {/* TOGGLE SORT BY ON CLICK */}
                { 
                    toggleSort &&

                    <div className="absolute mt-9 py-1 ml-8 shadow-lg bg-white">
                        <Dropdown toggle={toggleSort}
                            sortBy={sortBy}
                            onSortByChange={mySort => onSortByChange(mySort)}

                            orderBy={orderBy}
                            onOrderByChange={myOrder => onOrderByChange(myOrder)}
                        />
                    </div>
                } 

                {/* SEARCH INPUT */}
                <div>
                    <input onChange={(event) => {onQueryChange(event.target.value)}} value={query} type="text" placeholder="Search..." required 
                    className="outline-none p-1 border-b w-64 placeholder:text-black" />
                </div>
     
        </form> 

    );
}

export default Search;