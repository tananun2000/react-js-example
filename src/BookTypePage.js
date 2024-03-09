
//function component
//

import {useState,useEffect} from "react";

function BookTypePage(){

    const [bookTypeName,setBookTypeName] = useState("");
    const [bookTypes,setBookTypes] = useState([
        {
            "bookTypeId": 1,
            "bookTypeName": "นิยาย"
        },
        {
            "bookTypeId": 2,
            "bookTypeName": "การ์ตูน"
        }]);

    useEffect(() => {
        findAllBookType();
    },[]);

    function onChangeBookTypeName(e){
        setBookTypeName(e.target.value);
    }

    async function onSaveBookTypeName(){
        console.log(bookTypeName);
        console.log(bookTypes);

        let request = {
            "bookTypeName" : bookTypeName
        }

        let url = 'http://localhost:8080/book-type/save-book-type';
        const rawResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });
        const content = await rawResponse.json();
        alert(content.message);
        setBookTypeName("")

        findAllBookType();


    }

    async function findAllBookType(){
        let url = 'http://localhost:8080/book-type/find-all';
        const rawResponse = await fetch(url)


        const content = await rawResponse.json();
        setBookTypes(content)

    }

    function deleteBookType(id){
        console.log(id);
    }

    return (
        <div>
            <div>Book Type Page</div>
            <div>
                <label>Book Type Name : </label>
                <input type="text" value={bookTypeName} onChange={onChangeBookTypeName}/>
            </div>
            <div>
                <button type="button" onClick={onSaveBookTypeName}>SAVE</button>
            </div>
            <div>
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Book Type Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookTypes.map((bookType,i) => {
                                return <tr key={i}>
                                    <td>{bookType.bookTypeId}</td>
                                    <td>{bookType.bookTypeName}</td>
                                    <td>
                                        <button type="button" onClick={() => deleteBookType(bookType.bookTypeId)}>DELETE</button>
                                    </td>
                                </tr>;
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BookTypePage;
