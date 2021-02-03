import React, { useEffect, useState } from "react";
import AdminBase from "../core/AdminBase";
import {
  getCategories,
  deleteCategories,
  updateCategory,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper/index";

const Categories = () => {
  const auth = isAuthenticated();

  const [categoryList, setCategoryList] = useState([]);
  const [deleteSuccessFlag, setDeleteSuccessFlag] = useState(false);
  const [textFieldEnableReference, setTextFieldEnableReference] = useState([]);

  useEffect(() => {
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
    let categoryObject = { ...categoryListTemp[index] };
    categoryObject.name = event.target.value;
    categoryListTemp[index] = categoryObject;
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

  const updateCategoryHandler = (categoryId, index) => {
    const category = categoryList[index].name;
    updateCategory(auth.data._id, auth.token, categoryId, category)
      .then((response) => {
        alert(response);
        setTextFieldDisable("text_" + index);
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

  const isTextFieldEnable = (id) => {
    return textFieldEnableReference.includes(id);
  };

  const setTextFieldEnable = (id) => {
    const textFieldEnableArray = [...textFieldEnableReference];
    textFieldEnableArray.push(id);
    setTextFieldEnableReference(textFieldEnableArray);
  };
  const setTextFieldDisable = (id) => {
    const textFieldEnableArray = [...textFieldEnableReference];
    const index = textFieldEnableArray.indexOf(id);
    if (index > -1) {
      textFieldEnableArray.splice(index, 1);
    }
    setTextFieldEnableReference(textFieldEnableArray);
  };

  const categoryListTemplate = () => {
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
            const inputId = "text_" + index;
            return (
              <tr scope="row" key={"category-row-" + index}>
                <th>{index + 1}</th>
                <td>
                  <input
                    type="text"
                    value={category.name}
                    className="form-control"
                    disabled={!isTextFieldEnable(inputId)}
                    onChange={(event) => onChangeHandler(event, index)}
                  />
                </td>
                <td>
                  <button
                    style={{
                      display: !isTextFieldEnable(inputId) ? "" : "none",
                    }}
                    className="btn btn-primary bg-gradient rounded"
                    onClick={() => setTextFieldEnable(inputId)}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      display: isTextFieldEnable(inputId) ? "" : "none",
                    }}
                    className="btn btn-primary bg-gradient rounded "
                    onClick={() => updateCategoryHandler(category._id, index)}
                  >
                    Update
                  </button>
                  <button
                    style={{
                      display: isTextFieldEnable(inputId) ? "" : "none",
                    }}
                    className="btn btn-primary bg-gradient rounded mx-2"
                    onClick={() => setTextFieldDisable(inputId)}
                  >
                    Cancel
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
