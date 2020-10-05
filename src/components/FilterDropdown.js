import React from "react";

export const FilterDropdown = ({ onChangeFilter }) => {
  return (
    <select
      name="filterDropdown"
      id="filterDropdown"
      onChange={onChangeFilter}
    >
      <option id="allMail" value="allMail">
        All Mail
      </option>
      <option id="unread" value="unread">
        Unread
      </option>
      <option id="flagged" value="flagged">
        Flagged
      </option>
    </select>
  );
};
