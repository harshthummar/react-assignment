import React, { useEffect, useState } from 'react'
import { NavItem } from 'react-bootstrap'
import photo from '../Assets/logo192.png';
import "../style/Contact.css";
import Edit from './Edit';
function Contact(props) {
    const [cardData, setCardData] = useState({});
    const [isHovering, setIsHovering] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchItems, setSearchItems] = useState([]);
    const [editMode, setEditMode] = useState({ index: -1, flag: false });
    const newEditedValue = (data) => {
        setSearchItems([...searchItems.slice(0, editMode.index), data, ...searchItems.slice(editMode.index + 1)]);
        localStorage.setItem("contacts",JSON.stringify([...searchItems.slice(0, editMode.index),data, ...searchItems.slice(editMode.index + 1)]));
        props.newContacts([...searchItems.slice(0, editMode.index),data, ...searchItems.slice(editMode.index + 1)])
    }
    const deleteContact = (index) => {
        localStorage.setItem("contacts",JSON.stringify([...searchItems.slice(0, index), ...searchItems.slice(index + 1)]));
        setSearchItems([...searchItems.slice(0, index), ...searchItems.slice(index + 1)])
        props.newContacts([...searchItems.slice(0, index), ...searchItems.slice(index + 1)]);
    }
    const handleMouseOver = (card_details) => {
        setCardData(card_details);
        setIsHovering(true);
    };
    const handleMouseOut = () => {
        setCardData({});
        setIsHovering(false);
    };

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    }
    const filterFunction = (userInput) => {
        if (searchInput === '') {
            setSearchItems(props.value);
            return;
        }
        const regex = new RegExp(userInput, "i");
        let filteredNames = props.value.filter((x) => {
            return regex.test(x.name);
        })
        setSearchItems(filteredNames);
        console.log(filteredNames)
    }
    useEffect(() => {
        filterFunction(searchInput);
    }, [searchInput])
    useEffect(() => {
        setSearchItems(props.value);
        console.log(searchItems, "searchitems");
    }, [props.value])
    return (
        <div>
            {!editMode.flag ? <div className="container">
                <div className="">
                    <input type="text" placeholder="Search contact" onChange={handleSearchInput} />
                    <button type="button" onClick={() => props.addIn()}>Add Contact</button>
                </div>
                <div className="col-8 table d-flex justify-content-center" style={{ minWidth: "358px", minHeight: "308px" }}>
                    <table className="table mx-5">
                        <thead>
                            <tr>
                                <th scope="col">
                                    Basic Info
                                </th>
                                <th scope='col'>Company</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchItems?.map((val, ind) => {
                                return (<>
                                    <tr key={ind}>
                                        <td>
                                            <div className="row">
                                                <div className="col-3">
                                                    <img
                                                        className="imgs"
                                                        src={photo}
                                                        onMouseOver={() => handleMouseOver(val)}
                                                        onMouseOut={handleMouseOut}
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className="col"
                                                    style={{
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    <div className="row user_name">
                                                        {val.name}
                                                    </div>
                                                    <div className="row user_mail">{val.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="row user_mail ms-4">{val.company}</div>
                                        </td>
                                        <td><button style={{ all: "unset" }} onClick={() => setEditMode({ ...editMode, index: ind, flag: true })}><i class="fa-solid fa-pen-to-square"></i></button></td>
                                        <td><button style={{ all: "unset" }} onClick={() => deleteContact(ind)}>
                                            <i class="fa fa-trash" aria-hidden="true"></i></button>
                                        </td>
                                    </tr>
                                </>);
                            })}
                        </tbody>
                    </table>
                    <div>
                        {isHovering ? <div className="col-4 d-flex align-items-center">
                            <label>{cardData.name}</label>
                        </div> : null}
                    </div>
                </div>
            </div> : <Edit value={props.value} index={editMode.index} setEditMode={setEditMode} newEditedValue={newEditedValue} />}

        </div>
    )
}

export default Contact
