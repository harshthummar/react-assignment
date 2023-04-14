import React, { useEffect, useRef, useState } from 'react';
import {Form,Button} from 'react-bootstrap'
import Contact from './Contact';
import '../style/AddContact.css'

function AddContact() {
    const [showForm,setShowForm]=useState(false);
    const [contacts, setContect] = useState([]);
    const nameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();
    const companyRef = useRef();
    const addressRef = useRef();
    function fetchContact(){
        setContect(JSON.parse(localStorage.getItem("contacts")))
    }
    useEffect(()=>{
        fetchContact();
    },[])
    
    const handlesbm = (e) => {
        e.preventDefault();
        let contact = { "name": nameRef.current.value, "email": emailRef.current.value, "phone": phoneRef.current.value, "company": companyRef.current.value, "address": addressRef.current.value }
        let list = [...contacts];
        list.push(contact);
        setContect(list);
        localStorage.setItem("contacts",JSON.stringify(list));
        setShowForm((prev)=>!prev);
    }
    const addIn = ()=>{
        setShowForm((prev)=>!prev);
    }
    const newContacts= (data)=>{
        setContect(data)
    }
    console.log(contacts);
    return (
        <div>
            <div>
                {
                    !showForm?
                    <Contact value={contacts} addIn={addIn} newContacts={newContacts} />:
                <div className='container'>
                    <div className='row'>
                    <div className='d-flex justify-content-center'>
                        <Form onSubmit={handlesbm}>
                            <label className='row form-text text-muted'>Full name</label>
                            <input className='row form-control' type="text" placeholder='Full name' ref={nameRef} />
                            <br></br>

                            <label className='row form-text text-muted'>Email</label>
                            <input className='row form-control' type="Email" placeholder='Email' ref={emailRef} />
                            <br></br>

                            <label className='row form-text text-muted'>Phone</label>
                            <input className='row form-control' type="number" placeholder='Phone' ref={phoneRef} />
                            <br></br>

                            <label className='row form-text text-muted'>Company</label>
                            <input className='row form-control' type="text" placeholder='Company' ref={companyRef} />
                            <br></br>

                            <label className='row form-text text-muted'>Address</label>
                            <input className='row form-control' type="text" placeholder='Address' ref={addressRef} />
                            <br></br>
                            <Button>Submit</Button>
                        </Form>
                    </div>
                    </div>
                </div>
                }
            </div>
        </div>

    )
}

export default AddContact
