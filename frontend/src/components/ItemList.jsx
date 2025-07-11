import React from 'react'
import { MdFavorite } from "react-icons/md"

function ItemList({ item }) {
  return (
  <div key={item.id} className="bg-white p-4 rounded-lg shadow-md flex w-full mb-4">
      <div className="w-52 h-52 flex-shrink-0">
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-full object-contain object-center rounded-md"
      />
    </div>
    <div className="ml-6 flex flex-col justify-between flex-grow">
      <div>
        <div>
          <h2 className="text-2xl font-semibold ">{item.name}</h2>
          <p className="text-base text-gray-800 mt-1">{item.description}</p>
        </div>
        {item.material && (
          <div className="mt-1">
            <p className="text-base  text-gray-700"><span className='font-[500]'>Material:</span> {item.material}</p>
          </div>
        )}
        {item.gender && (
          <div className="mt-1">
            <p className="text-base  text-gray-700"><span className='font-[500]'>Gender:</span> {item.gender}</p>
          </div>
        )}
        {item.size && (
          <div className="mt-1">
            <p className="text-base  text-gray-700"><span className='font-[500]'>Size:</span> {item.size}</p>
          </div>
        )}
        <div className='mt-1'>
          <p className="text-base  text-gray-700"><span className='font-[500]'>Rating:</span> {item.rating}</p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-lg font-bold text-black">₹{item.price.toLocaleString()}</p>
      </div>
  </div>
</div>

  )
}

export default ItemList;
