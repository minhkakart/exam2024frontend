// import { useState } from "react";

function ProductList({ isOpenForm, showform}) {
    // const [isOpenForm, setIsOpenForm] = useState(false);
    return ( 
        <div>
            <div>
                <h2>Product Form</h2>
                <button className="rounded border" onClick={showform}>{isOpenForm ? 'close' : 'open'}</button>
            </div>
        </div>
     );
}

export default ProductList;