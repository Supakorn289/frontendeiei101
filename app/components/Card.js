export default function Card() {
    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-12 text-center mb-4"></div>
            <div className="col-md-12 text-center mb-4">
                <h3>บุคลากร</h3>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4 mb-4">
                <div className="card">
                <img src="https://it.cmtc.ac.th/wp-content/uploads/2025/05/Thapanan1.png" className="card-img-top mx-auto d-block" alt="..."  style={{ width: '70%', height: 'auto' }} />
                <div className="card-body">
                    <p className="card-text fw-bold text-center">อาจารย์ฐาปนันท์ ปัญญามี</p>
                </div>
                </div>
            </div>

            <div className="col-md-4 mb-4">
            <div className="card">
                <img src="https://it.cmtc.ac.th/wp-content/uploads/2025/05/Anuchat2.png" className="card-img-top mx-auto d-block" alt="..."  style={{ width: '70%', height: 'auto' }} />
                <div className="card-body">
                    <p className="card-text fw-bold text-center">อาจารย์อนุชาติ รังสิยานนท์</p>
                </div>
                </div>
            </div>
            <div className="col-md-4 mb-4">
            <div className="card">
                <img src="https://it.cmtc.ac.th/wp-content/uploads/2025/05/Tharit3.png" className="card-img-top mx-auto d-block" alt="..."  style={{ width: '70%', height: 'auto' }} />
                <div className="card-body">
                    <p className="card-text fw-bold text-center">อาจารย์ธฤต ไชยมงคล</p>
                </div>
                </div>
            </div>
      </div>
    </div>
    );
  }