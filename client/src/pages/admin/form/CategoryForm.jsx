/* eslint-disable react/prop-types */


const CategoryForm = ( {name , setName, handleSubmit}) => {
  // eslint-disable-next-line react/prop-types
  return (
    <>
    <div>CategoryForm</div>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="text" value={name} className="form-control"  aria-describedby="emailHelp" onChange={(e)=>setName(e.target.value)}/>
  <button type="submit" className="btn btn-primary mt-2" >Submit</button>
  </div>
</form>
    </>
  )
}

export default CategoryForm