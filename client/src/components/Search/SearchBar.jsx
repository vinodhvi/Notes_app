import React from "react";
import { IoMdClose } from "react-icons/io";
import { SlMagnifier } from "react-icons/sl";
const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-md">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        value={value}
        onChange={onChange}
      />
     { value && (<IoMdClose
        className="text-xl text-slate-400 cursor-pointer mr-3 hover:text-black"
        onClick={onClearSearch}
      />)}
      <SlMagnifier
        className="text-slate-400 cursor-pointer hover:text-black"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
