import React, { useEffect, useState } from "react";
import AdminBase from "../core/AdminBase";
import { getCategories } from "./helper/adminapicall";

const Categories = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    console.log("*** GETS CALLED ***")
    getAllCategories();
  }, []);

  const getAllCategories = () => {
    getCategories().then((response) => {
      console.log(response);
      setCategoryList(response);
    });
  };

  const onChangeHandler = (event,index) => {
      const categoryListTemp = [...categoryList];
      categoryListTemp[index] = event.target.value
      setCategoryList(categoryListTemp)
      console.log(categoryList)
  };

  const categoryListTemplate = () => {
    console.log("*** GET CALLED ***")
    console.log(categoryList)
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
                    onChange={(event) => onChangeHandler(event,index)}
                  />
                </td>
                <td>
                  <button className="btn btn-primary bg-gradient rounded">
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger bg-gradient rounded">
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
        <div>{categoryListTemplate()}</div>
      </div>
    </AdminBase>
  );
};

export default Categories;
