import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";

import Loading from "../../../components/Loading/index";
import styled from "styled-components";
import { getMessage, clearError } from "../../../redux/actions/messageActions";
import toast from "react-hot-toast";
import { AiTwotoneDelete } from "react-icons/ai";

const MessageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .__t2 {
    font-weight: 400;
    font-size: 2.8rem;
    color: #ed143d;
    margin: 2rem 0;
  }
`;

const StyledTable = styled.table`
  border-spacing: 0;
  width: 80%;
  margin-top: 1rem;
  border-radius: 8px;
  background-color: #d6d6d6;
  ._table_head {
    padding: 2rem 0;
    height: 5rem;
    color: #fff;
    background: #6c7ae0;
    display: table-row;
  }
  .__td_name {
    display: flex;
    gap: 2rem;
    align-items: center;
    justify-content: start;
  }
  tr {
    :hover {
      background-color: #a0a8e4;
    }
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }
  th,
  td {
    text-align: start;
    margin: 0;
    padding: 0.5rem;
    :last-child {
      border-right: 0;
    }
    span {
      cursor: pointer;
    }
  }
  .__actions {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 2rem;
  }
  .__cancel_btn {
    background: transparent;
    border-radius: 9px;
    width: 6rem;
    height: 4rem;
    color: #ed143d;
    font-weight: 600;
    font-size: 1rem;
    border: none;
    cursor: pointer;
  }
`;

const Message = ({
  getMessage,
  clearError,
  loading, messages, error
}) => {
  const dispatch = useDispatch();
  // const handleDelete = (id) => {
  //   deleteOrder(id);
  // };
  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
    // if (deleteError) {
    //   toast.error(deleteError);
    //   clearError();
    // }
    // if (isDeleted) {
    //   toast.success("Order Deleted Successfully");
    //   dispatch({ type: DELETE_ORDERS_RESET });
    // }
    getMessage();

  }, [dispatch, toast, error]);
  if (loading) {
    return <Loading />;
  }
  console.log(messages)

  return (
    <MessageDiv>
      <p className="__t2">Message</p>
      <StyledTable>
        <thead>
          {/* "first_name": "ajaya",
            "last_name": "shrestha",
            "phone": 9849997420,
            "email": "shresthaaz16@gmail.com",
            "description": "jk", */}
          <tr className="_table_head">
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Description</th>

          </tr>
        </thead>
        <tbody>
          {messages?.map(msg => <tr key={msg?._id}>
            <td >{msg?.first_name}</td>
            <td >{msg?.last_name}</td>
            <td >{msg?.email}</td>
            <td >{msg?.phone}</td>
            <td >{msg?.description}</td>

          </tr>)}
        </tbody>
      </StyledTable>
    </MessageDiv>
  );
};
const mapStateToProps = ({
  messageState: { loading, messages, error }

}) => ({
  loading, messages, error
});

const mapDispatchToProps = {
  getMessage, clearError
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Message);
