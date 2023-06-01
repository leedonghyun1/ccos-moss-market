import type { NextPage } from "next";
import React from "react";

const Upload: NextPage = () => {
  return (
    <div className="px-4 space-y-5 py-16">
      <div>
        <div>
          <label className="w-full cursor-pointer text-gray-600 hover:border-purple-400 hover:text-purple-400 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input type="file" className="hidden" />
          </label>
        </div>
      </div>
      <div className="my-5">
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor="name"
        >
          Name
        </label>
        <div className="rounded-md relative flex items-center shadow-sm">
          <input
            id="name"
            type="email"
            className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#A191E4] focus:border-[#A191E4]"
            placeholder="xxxxxx@naver.com"
            required
          />
        </div>
      </div>
      <div>
        <label
          className="mb-1 block text-sm font-medium text-gray-700"
          htmlFor="price"
        >
          Price
        </label>
        <div className="rounded-md relative flex  items-center shadow-sm">
          <div className="absolute left-0 pointer-events-none pl-3 flex items-center justify-center">
            <span className="text-gray-500 text-sm">$</span>
          </div>
          <input
            id="price"
            className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#A191E4] focus:border-[#A191E4]"
            type="text"
            placeholder="0.00"
          />
          <div className="absolute right-0 pointer-events-none pr-3 flex items-center">
            <span className="text-gray-500">USD</span>
          </div>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
        <div>
          <textarea rows={4} className="mt-1 shadow-sm w-full focus:ring-[#A191E4] rounded-md border-gray-300 focus:border-purple-400"/>
        </div>
      </div>
      <button className="w-full bg-[#A191E4] hover:bg-purple-400 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 focus:outline-noe">Upload item</button>
    </div>
  );
};

export default Upload;