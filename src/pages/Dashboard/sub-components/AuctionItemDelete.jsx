import { deleteAuctionItem } from "@/store/slices/superAdminSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AuctionItemDelete = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  const handleAuctionDelete = (id) => {
    dispatch(deleteAuctionItem(id));
  };

  return (
    <>
      <div className="mb-10 overflow-x-auto">
        <table className="border-gray-300 bg-white min-w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {allAuctions.length > 0 ? (
              allAuctions.map((element) => {
                return (
                  <tr key={element._id}>
                    <td className="px-4 py-2">
                      <img
                        src={element.image?.url}
                        alt={element.title}
                        className="rounded w-12 h-12 object-cover"
                      />
                    </td>
                    <td className="px-4 py-2">{element.title}</td>
                    <td className="flex space-x-2 px-4 py-2">
                      <Link
                        to={`/auction/details/${element._id}`}
                        className="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded-md text-white transition-all duration-300"
                      >
                        View
                      </Link>
                      <button
                        className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded-md text-white transition-all duration-300"
                        onClick={() => handleAuctionDelete(element._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="py-3 text-left text-sky-600 text-xl">
                <td>No Auctions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AuctionItemDelete;
