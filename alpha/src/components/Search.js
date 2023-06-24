import { BiCaretDown, BiSearch, BiCheck } from 'react-icons/bi';
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
        <form className="flex divide-x w-96 justify-between"> 

                {/* DROPDOWN BUTTON */}
                <div className="bg-gray-200 hover:bg-gray-400 hover:text-white">
                    <button onClick={() => {setToggleSort(!toggleSort)}} type="button" className="flex m-1 mx-2" id="options-menu">
                        Sort by
                        <BiCaretDown className="mt-1" />
                    </button>
                </div>

                {/* TOGGLE SORT BY ON CLICK */}
                { 
                    toggleSort &&

                    <div className="absolute mt-9 py-1 shadow-lg bg-white">
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
                    <input  onChange={(event) => {onQueryChange(event.target.value)}} value={query} type="text" placeholder="Search..." required 
                    className="outline-none p-1 border-2 w-64" />
                </div>

                {/* SUBMIT SEARCH BUTTON */}
                <div className="bg-gray-200">
                    <BiSearch className="text-xl mx-1.5 m-2" />
                </div>      
        </form> 

    );
}

export default Search;