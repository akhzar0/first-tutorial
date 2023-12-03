import React, { useState } from "react";
import { Form, Button, Container, Table } from "react-bootstrap";
import Swal from "sweetalert2";
const Todoinput = () => {
  const [inputt, setinputt] = useState("");
  const [listodo, setlisttodo] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [itemIndex, setItemIndex] = useState(null);

  let addlist = (inputt) => {
    if (isUpdating) {
      updateData(inputt, itemIndex);
      setIsUpdating(false);
    } 
    else if (!isUpdating && inputt.length) {
      setlisttodo([...listodo, inputt]);
    } 
    else {
      Swal.fire({
        title: "Alert!",
        text: "Enter Your Items!",
        icon: "error",
      });
    }
  };
  const updateData = (data, index) => {
    setlisttodo(
      listodo.map((item, i) => {
        return i===index ? data : item;
      })
    );
    setIsUpdating(true);
  };

  const deleteitem = (key) => {
      Swal.fire({
        title: "Are you sure!",
        text: "Deleted",
        icon: "warning",
        showCancelButton:true,
        confirmButtonColor:"#3085d6",
        cancelButtonColor:"#d33",
        confirmButtonText:"Yes Delete it"
      })
      .then((res) => {
          if(res.isConfirmed){
            let newdelete = [...listodo];
            newdelete.splice(key, 1);
            setlisttodo([...newdelete]);
          } 
      });
  }
  const edit = (item, index) => {
    setinputt(item);
    setIsUpdating(true);
    setItemIndex(index);
  };

  return (
    <Container className="py-5">
      <h1> Todo List Demo </h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Form.Group>
          <Form.Label className="mt-2 fw-medium"> Enter Your Item </Form.Label>
          <Form.Control
            onChange={(e) => setinputt(e.target.value)}
            value={inputt}
            className="w-25 shadow-none"
            type="text"
            placeholder="Enter Your Items..."/>
        </Form.Group>
        <Button
          onClick={() => {addlist(inputt)
           setinputt("")}}
          className="mt-3"> Add <i className="fa fa-plus"> </i>
        </Button>
      </Form>
      <hr className="mt-4" />
      <Table className=" striped border hover text-center">
        <thead>
          <tr>
            <th> Sr No. </th> 
            <th> Items Name </th> 
            <th> Action </th>
          </tr>
        </thead>
        <tbody>
          {listodo.length === 0 ? <h4> Data Not Found </h4>:
            listodo.map((item, index) => {
              return (
                <tr key={index}>
                  <td> {index + 1} </td> 
                  <td> {item} </td>
                  <td>
                    <Button onClick={() => edit(item, index)}>
                      <i className="fa fa-edit"></i>
                    </Button>
                    <Button onClick={() =>{deleteitem(index);
                    }}
                      className="bg-danger mx-3 text - white border - 0 ">
                      <i className="fa fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    </Container>
  );
};
export default Todoinput;
