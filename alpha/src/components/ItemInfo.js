import { BiTrash } from 'react-icons/bi';

const ItemInfo = ({ item, onDeleteItem }) => {
    return (
        <li className="flex justify-between">

                {/* ITEMS LIST */}
                <div>

                  {/* TITLE */}
                  <div>
                    <b>{item.title}</b>
                  </div>

                  {/* NOTES */}
                  <div className="mb-2">
                    <span>{item.notes}</span>
                  </div>

                  {/* DATE & TIME */}
                  <div>
                    <span className="text-sm">{item.date}</span>
                  </div>   
                </div>

                {/* BUTTONS SECTION */}
                <div className="flex flex-col space-y-1 place-content-center mr-1">

                  {/* DELETE BUTTON */}
                  <button onClick={() => onDeleteItem(item.id)} type="button" className="p-1 bg-gray-200 hover:bg-gray-400 hover:text-white">
                    <BiTrash />
                  </button>

                </div>

              </li>
    )
}

export default ItemInfo;