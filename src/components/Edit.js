import React,{useRef, useState} from 'react'

function Edit(props) {
    const [name,setName] = useState(props.value[props.index].name);
    const [email,setEmail] = useState(props.value[props.index].email);
    const [phone,setPhone] = useState(props.value[props.index].phone);
    const [company,setCompany] = useState(props.value[props.index].company);
    const [address,setAddress] = useState(props.value[props.index].address);

    const handlesbm = (e) => {
        e.preventDefault();
        let contact = { "name": name, "email": email, "phone": phone, "company": company, "address": address}
        props.setEditMode((prev)=>!prev);
        props.newEditedValue(contact);
        console.log(contact);
    }
    return (
        <div className='container '>
            <div className='d-flex justify-content-center'>
                <form onSubmit={handlesbm}>
                    <label className='row'>Full name</label>
                    <input className='row' type="text" defaultValue={props.value[props.index].name} placeholder='Full name' onChange={(e)=>setName(e.target.value)} />
                    <br></br>

                    <label className='row'>Email</label>
                    <input className='row' defaultValue={props.value[props.index].email} type="Email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} />
                    <br></br>

                    <label className='row'>Phone</label>
                    <input className='row' defaultValue={props.value[props.index].phone} type="number" placeholder='Phone' onChange={(e)=>setPhone(e.target.value)} />
                    <br></br>

                    <label className='row'>Company</label>
                    <input className='row' defaultValue={props.value[props.index].company} type="text" placeholder='Company' onChange={(e)=>setCompany(e.target.value)} />
                    <br></br>

                    <label className='row'>Address</label>
                    <input className='row' defaultValue={props.value[props.index].address} type="text" placeholder='Address'onChange={(e)=>setAddress(e.target.value)} />
                    <button>Edit</button>
                </form>
            </div>
        </div>
    )
}

export default Edit
