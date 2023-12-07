function ProductForm({showForm}) {
    return ( <div className="absolute top-0 bottom-0 right-0 left-0 bg-slate-600">
        <h1>ProductForm</h1>
        <form>
            <label>Product name</label>
            <input type="text" name="name" />
            <label>Product price</label>
            <input type="number" name="price" />
            <label>Product description</label>
            <input type="text" name="description" />
            <label>Product image</label>
            <input type="text" name="image" />
            <button onClick={showForm}>close</button>
        </form>
    </div> );
}

export default ProductForm;