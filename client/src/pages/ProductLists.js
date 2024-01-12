// ProductList.js
import  { useState } from 'react';

const ProductLists = () => {
  const [cartButtonLabel, setCartButtonLabel] = useState('Add to Cart');

  const handleAddToCart = () => {
    // Handle add to cart logic here
    setCartButtonLabel('Added to Cart');
    setTimeout(() => {
      setCartButtonLabel('Add to Cart');
    }, 1000);
  };

  return (
    <div className="its">
      
        <div className="ok" >
        <div className="card">
            <div className="inner-card">
              <form method="POST" action="/single-product">
                <input type="hidden" name="productId" />
                <button>
                  <img src=""className="img-fluid rounded"  />
                </button>
              </form>
              <div className="d-flex justify-content-between align-items-center mt-3 px-2">
                <h4>name</h4>
              </div>
              <div className="mt-2 px-2">
                <small>description</small>
              </div>
              <div className="px-2">
                <h3>Rs. 12</h3>
              </div>
              <div className="icon">
                <form
                  method="POST"
                  id="add-to-cart-form"
                  action={`/add-to-cart-cat/$`}
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddToCart(1);
                  }}
                >
                  <button className="btn btn-outline-primary px-3" id="add" type="submit">
                    {cartButtonLabel}
                  </button>
                </form>
                <form method="POST" action="/add-to-wish-cat">
                  <input type="hidden" name="productId" value="1" />
                  <button id="wish">
                    <i className="fa-regular fa-heart fa-2x"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      
    </div>
  );
};

export default ProductLists;
