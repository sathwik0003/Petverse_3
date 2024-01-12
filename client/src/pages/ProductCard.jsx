

const ProductCard = () => (
   
        <div className="container py-5" style={{ width: '380px', margin: '0px', backgroundColor: '#eee' }}>
          <div className="row" style={{ margin: '2px',width:'65rem' }}>
            <div className="col-md-12 col-lg-4 mb-4 mb-lg-0">
              <div className="card">
                <div className=" justify-content-between p-3">
                  <div className="rounded-circle d-flex align-items-center justify-content-center shadow-1-strong" style={{ width: '35px', height: '35px' }}></div>
                </div>
                <div>
                  <img src="" alt="" />
                </div>
                <div className="card-body" style={{ width: '332px' }}>
                  <div className="d-flex justify-content-between">
                    <p className="" style={{ fontSize: '20px' }}>name</p>
                    <p>Rs.12</p>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <h5 className="mb-0">description</h5>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <p className="text-muted mb-0">Available: <span className="fw-bold">available</span></p>
                  </div>
                </div>
                <div className="but" style={{ display: 'flex' }}>
                  <form  method="GET" style={{ display: 'inline' }}>
                    <button type="submit" style={{ padding: '8px 65px' }}>Edit</button>
                  </form>
                  <form method="GET" style={{ display: 'inline' }}>
                    <button type="submit" style={{ padding: '8px 55px' }}>Delete</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

export default ProductCard;
