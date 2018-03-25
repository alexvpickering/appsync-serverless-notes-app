import React from "react";
import PropTypes from "prop-types";
//== NoteSelector

const NoteSelector = ({ setNoteId }) => {
  return (
    <div>
      <h2>Select a Note</h2>
      <select onChange={setNoteId}>
        <option value="" />
        <option value="1">Note 1</option>
        <option value="2">Note 2</option>
        <option value="3">Note 3</option>
        <option value="4">Note 4</option>
        <option value="5">Note 5</option>
      </select>
    </div>
  );
};

NoteSelector.propTypes = {
  setNoteId: PropTypes.func.isRequired
};

export default NoteSelector;
