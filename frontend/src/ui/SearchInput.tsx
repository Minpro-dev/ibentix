import type { ChangeEvent } from "react";

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function SearchInput({ placeholder, value, onChange }: SearchInputProps) {
  return (
    <div className="w-full lg:w-[50%]">
      <input
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={onChange}
        className="w-full h-10 px-5 text-zinc-600 border placeholder:tracking-wider placeholder:text-sm border-slate-300 rounded-full focus:outline-none focus:ring-1 focus:ring-indigo-300"
      />
    </div>
  );
}

export default SearchInput;
