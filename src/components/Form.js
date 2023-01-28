import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';

const Form = ({showModal, setShowModal, setRefresh}) => {

    const initialValue = {
        nama: "",
        deskripsi : "",
        hargaBeli: "",
        hargaJual: "",
        foto: ""
    }

    const [data, setData] = useState(initialValue)
    const {nama, deskripsi, hargaBeli, hargaJual, foto} = data;

    const onValueChange = (e) =>
    {
        setData({...data, [e.target.name]: e.target.value});
       
    }

    const handleChangeImage = (e) => {
        setData({ ...data, [e.target.name]: URL.createObjectURL(e.target.files[0]) });
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if( !data.nama || !data.hargaBeli || !data.hargaJual ){
            
            alert("File belum dimasukkan dan semua inputan belum terisi")
            return
        }

        fetch('http://localhost:8000/data', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(() => {
            setRefresh(true)
			alert("Data Added")
            setShowModal(false)
        });
        
    }

    const onReset = () => {
        setData({
            nama: "",
            deskripsi : "",
            hargaBeli: "",
            hargaJual: "",
            foto: ""
        })
    }

    return (
        <>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Add Data</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form >
                    <div className="form-group mt-3">
                        <input type="text" 
                            className="form-control" 
                            placeholder="Nama Produk"
                            onChange={(e) => onValueChange(e)}
                            name="nama" 
                            value={nama} />
                    </div>
                    <div className="form-group mt-3">
                        <input type="text" 
                            className="form-control" 
                            placeholder="Deskripsi"
                            onChange={(e) => onValueChange(e)}
                            name="deskripsi" 
                            value={deskripsi} />
                    </div>
                    <div className="form-group mt-3">
                        <input type="text" 
                            className="form-control" 
                            placeholder="Harga Beli"
                            onChange={(e) => onValueChange(e)}
                            name="hargaBeli" 
                            value={hargaBeli} />
                    </div>
                    <div className="form-group mt-3">
                        <input type="text" 
                            className="form-control" 
                            placeholder="Harga Jual"
                            onChange={(e) => onValueChange(e)}
                            name="hargaJual" 
                            value={hargaJual} />
                    </div>
                    <div className="form-group mt-3">
                        <label>Foto</label>
                        <br/>
                        <input type="file" className="form-control-file" name="foto"  onChange={(e) => handleChangeImage(e)} />
                    </div>

                    <button type="button" className="btn btn-warning mt-3 " onClick={onReset}>Reset</button>
                    <button type="button" className="btn btn-primary mt-3 mx-3" onClick={onSubmit}>Submit</button>
                </form>
                </Modal.Body>
            </Modal>
        </>       
    )
}

export default Form