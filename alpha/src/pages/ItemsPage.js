import { useState, useEffect, useCallback } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import Search from '../components/Search';
import ItemInfo from '../components/ItemInfo';
import { BiAddToQueue } from 'react-icons/bi';
import { AiOutlineDoubleRight } from 'react-icons/ai';
import { BsCalendarDate } from 'react-icons/bs';
import { FaRegStickyNote } from 'react-icons/fa';

function ItemsPage() {
  const clearData = {
    title: '', 
    date: '', 
    time: '', 
    notes: ''
  }

  let[items, setItems] = useState([]);
  let[query, setQuery] = useState("");
  let[sortBy, setSortBy] = useState("title");
  let[orderBy, setOrderBy] = useState("asc");
  let[toggleList, setToggleList] = useState(false);
  let[toggleCreate, setToggleCreate] = useState(false);
  let[formData, setFormData] = useState(clearData);
  let[displayOutput, setDisplayOutput] = useState(false);

  const lastId = () => {
    items.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)
  }

  const onSendInfo = (myItem) => {
    setItems([...items, myItem])
  }

  function formDataPublish() {
    const itemInfo = {
        id: lastId + 1,
        title: formData.title, 
        date: formData.date + ' ' + formData.time, 
        notes: formData.notes
    }
    onSendInfo(itemInfo);
    setFormData(clearData);
    setToggleCreate(!toggleCreate);
    setToggleList(!toggleList);
    setDisplayOutput(true);
}

  const filteredItems = items.filter(
    item => {
      return (
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.date.toLowerCase().includes(query.toLowerCase()) ||
        item.notes.toLowerCase().includes(query.toLowerCase())
      )
    }
  ).sort((a, b) => {
    let order = (orderBy === 'asc') ? 1 : -1;
    return (
      a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order : 1 * order
    )
  });

  const fetchData = useCallback(() => {
      fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        setItems(data)
      })
  }, []);

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  const Output = () => {
    return (
      <div className="flex justify-center">
        <label className="text-green-800">New entry successfully added.</label>
      </div>
    );
  }

  return (
    <div className="w-96 space-y-4 mt-5">

      {/* NOTES PAGE HEADER SECTION*/}
      <div>
          <div className="flex text-4xl place-content-center ">
            <div>
              <h1 className="text-3xl">Notes</h1>
            </div>
          </div>
      </div>

      {/* NOTES PAGE NAVBAR SECTION */}
      <div className="flex place-content-around">

      <div className={`px-12 pb-2 pt-2 hover:bg-gray-400 hover:text-white ${toggleList ? 'bg-gray-200' : ''} ${toggleCreate ? 'border-b-2' : ''}`}>
          <button type="button" className="flex px-5" 
            onClick={() => {
                setToggleList(true);
                setDisplayOutput(false);
                setToggleCreate(false);
              }
            }>
            <AiOutlineUnorderedList className="mt-1 mr-1" />
            List
          </button>
      </div>

        <div className={`px-10 pb-2 pt-2 hover:bg-gray-400 hover:text-white ${toggleCreate ? 'bg-gray-200' : ''} ${toggleList ? 'border-b-2' : ''}`}>
            <button type="button" className="flex px-5" 
              onClick={() => {
                  setToggleCreate(true);
                  setDisplayOutput(false);
                  setToggleList(false);
                }
              }>
              <BiAddToQueue className="mt-1 mr-1" />
              Create
            </button>
        </div>

      </div>

      {/* LIST NOTES SECTION */}
      <div>

        <div>
        {
          toggleList===true && 

          <div className="w-96">

          { displayOutput ? <Output /> : null }

          {/* SEARCH SECTION */}
          <div className="mt-2">
            <Search
              query={query}
              onQueryChange={myQuery => setQuery(myQuery)}
              orderBy={orderBy}
              onOrderByChange={mySort => setOrderBy(mySort)}
              sortBy={sortBy}
              onSortByChange={mySort => setSortBy(mySort)}
            />
          </div>

          {/* LIST ITEMS SECTION */}
          <ul className="divide-y divide-gray-200 ml-2 mt-2">
            {
              filteredItems.map(item => (
                <ItemInfo key={item.id} 
                  item={item} 

                  onDeleteItem={itemId => 
                    setItems(items.filter(
                      item => 
                        item.id !== itemId
                    ))
                  }
                />
              ))
            }
          </ul>

          </div>
        }

        </div>

      </div> 

      {/* ADD ITEM SECTION */}  
      <div>
        {
          toggleCreate && 

          <div>
            <form className="flex-col">
              
              <div className="mr-2">
                  {/* TITLE */}
                  <div className="flex mt-2 justify-between mb-2">
                      <label className="mr-6 ml-2 mt-1">
                          <AiOutlineDoubleRight />
                      </label>

                      <input onChange={(event) => {setFormData({...formData, title: event.target.value})}} 
                          value={formData.title} type="text" placeholder="Title..."
                          className="w-full border-b outline-none placeholder:text-black" />
                  </div>

                  {/* DATE & TIME */}
                  <div className="flex mt-2 justify-between mb-2">
                      <label className="mr-6 ml-2 mt-1.5">
                          <BsCalendarDate />
                      </label>

                      <input onChange={(event) => {setFormData({...formData, date: event.target.value})}} 
                          value={formData.date} type="date" 
                          className="w-full border-b outline-none mr-5" />
                      <input onChange={(event) => {setFormData({...formData, time: event.target.value})}} 
                          value={formData.time} type="time"
                          className="w-full border-b outline-none" />
                  </div>

                  {/* NOTES */}
                  <div className="flex mt-2 justify-between mb-2">
                      <label className="mr-6 ml-2 mt-1">
                          <FaRegStickyNote />
                      </label>

                      <textarea onChange={(event) => {setFormData({...formData, notes: event.target.value})}}  
                          value={formData.notes} placeholder="Notes..."
                          className="w-full border-b outline-none placeholder:text-black" />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="flex mt-4 justify-end mb-4 mr-1">
                      <button type="submit" className="bg-gray-200 hover:bg-gray-400 hover:text-white p-1 px-2"
                        onClick={() => formDataPublish()}>
                        OK
                      </button>
                  </div>
                  
              </div>

            </form>
          </div>
        }
      </div>

    </div>
  );
} 

export default ItemsPage;