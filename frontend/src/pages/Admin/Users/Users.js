import React, { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import Loading from "../../../components/Loading/index";
import styled from "styled-components";
import { clearError, getAllUsers, deleteUser } from "../../../redux/actions/userActions";
import toast from "react-hot-toast";
import { AiTwotoneDelete } from "react-icons/ai";
import { DELETE_USER_RESET } from "../../../redux/constants/userConstants";

const UsersDiv = styled.div`
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
    justify-content: flex-start;
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

const Users = ({
      loading,
      error,
      users,
      deleteUser,
      isDeleted,
      deleteError,
      getAllUsers
}) => {
      const dispatch = useDispatch();
      const handleDelete = (id) => {
            deleteUser(id)
      };
      useEffect(() => {
            if (error) {
                  toast.error(error);
                  clearError();
            }
            if (deleteError) {
                  toast.error(deleteError);
                  clearError();
            }
            if (isDeleted) {
                  toast.success("User Deleted Successfully");
                  dispatch({ type: DELETE_USER_RESET });
            }
            getAllUsers();
      }, [dispatch, toast, error, deleteError, isDeleted]);
      if (loading) {
            return <Loading />;
      }

      return (
            <UsersDiv>
                  <p className="__t2">Users</p>
                  <StyledTable>
                        <thead>
                              <tr className="_table_head">
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                              </tr>
                        </thead>
                        <tbody>
                              {users &&
                                    users?.map((user) => (
                                          <tr key={user.id}>
                                                <td className="__td_name">
                                                      <img
                                                            src={
                                                                  user?.avatar?.url
                                                            }
                                                            alt=""
                                                            width={50}
                                                      />
                                                      {user?.name}
                                                </td>
                                                <td>{user.email}</td>
                                                <td>{user?.role}</td>

                                                <td>
                                                      <button
                                                            className="__cancel_btn"
                                                            onClick={() => handleDelete(user?._id)}
                                                      >
                                                            <AiTwotoneDelete size={20} />
                                                      </button>
                                                </td>
                                          </tr>
                                    ))}
                        </tbody>
                  </StyledTable>
            </UsersDiv>
      );
};
const mapStateToProps = ({
      users: { loading, users, error },
      profile: { isDeleted, error: deleteError }
}) => ({
      loading,
      error,
      users,
      isDeleted,
      deleteError
});

const mapDispatchToProps = {
      getAllUsers,
      deleteUser
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connector(Users);
