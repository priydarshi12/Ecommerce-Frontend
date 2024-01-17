import React from 'react'

const CategoryForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
    <div className="from-group">
      <label>Name</label>
      <input
        type="text"
        className="form-control"
        onChange={(e) => props.setName(e.target.value)}
        value={props.name}
        autoFocus
        required
        placeholder='enter the product name'
      />
      <br />
      <button className="btn btn-outline-primary">Save</button>
    </div>
  </form>
  )
}

export default CategoryForm
