import { useState, useEffect, useCallback } from 'react';
import { BiArchive } from 'react-icons/bi';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import Search from './components/Search';
import AddItem from './components/AddItem';
import ItemInfo from './components/ItemInfo';

function App() {
  let[items, setItems] = useState([]);
  let[query, setQuery] = useState("");
  let[sortBy, setSortBy] = useState("title");
  let[orderBy, setOrderBy] = useState("asc");
  let [toggleList, setToggleList] = useState(false);

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

  return (
    <div className="grid place-content-center space-y-4">
      <div className="w-96 space-y-4">

      {/* HEADER SECTION*/}
      <div>
          <div className="flex text-4xl place-content-center ">
            <div>
              <BiArchive className="mt-1 mx-1" />
            </div>
            <div>
              <h1>Items</h1>
            </div>
          </div>
      </div>

      {/* ADD ITEM SECTION */}  
      <div>
        <AddItem 
          onSendInfo={myItem => setItems([...items, myItem])}
          lastId={items.reduce((max, item) => Number(item.id) > max ? Number(item.id) : max, 0)}
        />
      </div>

      {/* LIST ITEMS SECTION */}
      <div>

         {/* HEADER BUTTON SECTION */}
        <div className='flex bg-gray-200 items-center hover:bg-gray-400 hover:text-white'>
          <button onClick={() => setToggleList(!toggleList)}
            type="button" className="flex mt-2">
              <AiOutlineUnorderedList className="mt-1 mx-1 mb-3 ml-2" />
              List Items
          </button>
        </div>

        <div>

        {/* TOGGLE ADD ITEM FORM ON CLICK */}
        {
          !toggleList && 

          <div className="w-96">

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

      </div>
    </div>
  );
}

export default App;