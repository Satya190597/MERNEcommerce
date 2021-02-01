import React, { useEffect, useState } from "react";
import AdminBase from "../core/AdminBase";
import { getCategories, deleteCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const Categories = () => {
  const auth = isAuthenticated();

  const [categoryList, setCategoryList] = useState([]);
  const [deleteSuccessFlag, setDeleteSuccessFlag] = useState(false);
  useEffect(() => {
    console.log("*** GETS CALLED ***");
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    getCategories().then((response) => {
      console.log(response);
      setCategoryList(response);
    });
  };

  const onChangeHandler = (event, index) => {
    const categoryListTemp = [...categoryList];
    categoryListTemp[index] = event.target.value;
    setCategoryList(categoryListTemp);
  };

  const deleteCategoryHandler = (categoryId) => {
    deleteCategories(auth.data._id, auth.token, categoryId)
      .then((response) => {
        console.log(response);
        getAllCategories();
        setDeleteSuccessFlag(true);
        setTimeout(function () {
          setDeleteSuccessFlag(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const successMessageForDelete = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: deleteSuccessFlag ? "" : "none" }}
      >
        <h4 class="alert-heading">Category Deleted Successfully</h4>
      </div>
    );
  };

  const categoryListTemplate = () => {
    console.log("*** GET CALLED ***");
    console.log(categoryList);
    return (
      <table class="table text-white">
        <thead>
          <tr>
            <th>Number</th>
            <th>Category Name</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categoryList.map((category, index) => {
            return (
              <tr scope="row" key={"category-row-" + index}>
                <th>{index + 1}</th>
                <td>
                  <input
                    type="text"
                    value={category.name}
                    className="form-control"
                    onChange={(event) => onChangeHandler(event, index)}
                  />
                </td>
                <td>
                  <button className="btn btn-primary bg-gradient rounded">
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger bg-gradient rounded"
                    onClick={() => deleteCategoryHandler(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <AdminBase
      title="Manage Categories"
      description="Edit Or Delete Your Categories"
    >
      <div className="container mt-5">
        <div>{successMessageForDelete()}</div>
        <div>{categoryListTemplate()}</div>
      </div>
    </AdminBase>
  );
};

export default Categories;
