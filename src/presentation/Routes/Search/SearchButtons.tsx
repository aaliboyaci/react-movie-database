import React from "react";

interface SearchButtonsProps {
  searchSelect: number;
  setsearchSelect: React.Dispatch<React.SetStateAction<number>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const SearchButtons: React.FC<SearchButtonsProps> = ({
  searchSelect,
  setsearchSelect,
  setPage,
}) => {
  return (
    <div style={{ display: "flex" }}>
      <button
        className={searchSelect === 1 ? "searchSelectOn" : "searchSelectOff"}
        onClick={() => (
          searchSelect === 0 || searchSelect === 2
            ? setsearchSelect(1)
            : setsearchSelect(0),
          setPage(1)
        )}
      >
        Movies
      </button>
      <button
        className={searchSelect === 2 ? "searchSelectOn" : "searchSelectOff"}
        onClick={() => (
          searchSelect === 0 || searchSelect === 1
            ? setsearchSelect(2)
            : setsearchSelect(0),
          setPage(1)
        )}
      >
        People
      </button>
    </div>
  );
};

export default SearchButtons;
