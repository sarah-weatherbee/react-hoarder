import React from 'react';
import './EditHoard.scss';

class EditHoard extends React.Component {
  render() {
    const editId = this.props.match.params.id;

    return (
      <div className="EditHoard">
        <h1>Edit Hoard</h1>
        <h2>The editId is {editId}</h2>
      </div>
    );
  }
}

export default EditHoard;
