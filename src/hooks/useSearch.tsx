import { useState } from "react";

export type SearchType = {
  city: string;
  country: string;
}

export type SearchResult = {
  /**
   * search object
   */
  search: SearchType;
  /**
   * Used to handle search input
   * @param e HTML input element
   * @returns void
   */
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * This hook is used to handle search input for this application
 * @returns {search, handleSearch}
 */
export const useSearch = (): SearchResult => {
  const [search, setSearch] = useState<SearchType>({
    city: "",
    country: "",
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  return { search, handleSearch };
}