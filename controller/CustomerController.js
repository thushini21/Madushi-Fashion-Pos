import CustomerModel from "../models/CustomerModel.js";
import {customer_array} from "../db/database.js";
import {loadCustomerselect} from "./OrderController.js";
import {validmobile,validemail} from "../utill/Validation.js";

let editingRow = null;

//generate id
const getNextCustomerId = () => {
    let id1 ;
    let index = customer_array.length;

    if(index > 0 ){
        id1 = Number(customer_array[customer_array.length - 1].id);
    }else {
        id1 = 0;
    }

    let id = id1 + 1;
    return id;
};

//load customers
const loadCustomerTable = () => {
    $("#customerTableBody").empty();

    customer_array.map((item ,index ) => {
        const customerRow = `
            <tr>
                <td>${item.id}</td>
                <td>${item.first_name}</td>
                <td>${item.last_name}</td>
                <td>${item.mobile}</td>
                <td>${item.email}</td>
                <td>${item.address}</td>
                <td>
                    <button class="btn btn-danger btn-sm delete-btn">delete</button>
                    <button class="btn btn-secondary btn-sm update-btn">update</button>
                </td>
            </tr>`;
        $('#customerTableBody').append(customerRow);
    });

    $('#customerid').val(getNextCustomerId());
};

//save
const saveCustomer = () => {
    const cus_id = editingRow ? $('#customerid').val() : getNextCustomerId();
    const firstName = $('#firstName').val();
    const lastName = $('#lastName').val();
    const mobile = $('#mobile').val();
    const email = $('#email').val();
    const address = $('#address').val();


      if (firstName.length === 0) {
          Swal.fire({
              title: "Invalid Input!",
              text: "Invalid first name",
              icon: "warning"
          });

      }else if(lastName.length === 0) {
          Swal.fire({
              title: "Invalid Input!",
              text: "Invalid last name",
              icon: "warning"
          });

      }else if(!validmobile(mobile)) {
          Swal.fire({
              title: "Invalid Input!",
              text: "Invalid mobile",
              icon: "warning"
          });

      }else if(!validemail(email)) {
          Swal.fire({
              title: "Invalid Input!",
              text: "Invalid email",
              icon: "warning"
          });


      }else if(address.length === 0) {
          Swal.fire({
              title: "Invalid Input!",
              text: "Invalid address",
              icon: "warning"
          });

      }else {

          let customer = new CustomerModel(cus_id, firstName, lastName, mobile, email, address);

          if (editingRow) {
              let index = -1;

              for (let i = 0; i < customer_array.length; i++) {
                  if (customer_array[i].id === editingRow.id) {
                      index = i;
                      break;
                  }
              }
              let id = editingRow.id;
              let first_name = $("#firstName").val();
              let last_name = $("#lastName").val();
              let mobile = $("#mobile").val();
              let email = $("#email").val();
              let address = $("#address").val();

              if (index !== -1) {
                  let customer = new CustomerModel(id,
                      first_name,
                      last_name,
                      mobile,
                      email,
                      address);

                  Swal.fire({
                      title: "Do you want to update the changes?",
                      showDenyButton: true,
                      showCancelButton: true,
                      confirmButtonText: "Update",
                      denyButtonText: `Don't update`
                  }).then((result) => {
                      if (result.isConfirmed) {

                          customer_array[index] = customer;
                          loadCustomerselect();
                          $('#customerForm')[0].reset();
                          loadCustomerTable();

                          Swal.fire("Updated!", "", "success");
                      } else if (result.isDenied) {
                          Swal.fire("Changes are not updated", "", "info");
                          $('#customerForm')[0].reset();
                          loadCustomerTable();
                      }
                      $('#customerForm')[0].reset();
                      loadCustomerTable();
                  })
              }
              editingRow = null;
              $('#add-customer-btn').text('Add Customer');
          } else {
              Swal.fire({
                  title: "Do you want to save the changes?",
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: "Save",
                  denyButtonText: `Don't save`
              }).then((result) => {
                  if (result.isConfirmed) {
                      customer_array.push(customer);
                      $('#customerCount').text(customer_array.length);
                      $('#customerName').val('');
                      loadCustomerselect();
                      $('#customerForm')[0].reset();
                      loadCustomerTable();
                      console.log(customer_array)
                      Swal.fire("Saved!", "", "success");
                  } else if (result.isDenied) {
                      Swal.fire("Changes are not saved", "", "info");
                      $('#customerForm')[0].reset();
                      loadCustomerTable();
                  }
                  $('#customerForm')[0].reset();
                  loadCustomerTable();
              })
          }
      }
};

//delete
const deleteCustomer = (cus_id) => {
    let index = -1;

    for (let i = 0; i < customer_array.length; i++) {
        if (customer_array[i].id === cus_id) {
            index = i;
            break;
        }
    }

    if (index !== -1) {
        Swal.fire({
            title: "Do you want to delete Customer?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't delete`
        }).then((result) => {
            if (result.isConfirmed) {

        customer_array.splice(index, 1);
        $('#customerCount').text(customer_array.length);

        $('#customerForm')[0].reset();
        $('#customerName').val('');
        loadCustomerTable();

                Swal.fire("Deleted!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Customer is not deleted", "", "info");
            }
        })
    }

};

//update
const editCustomer = (customer) => {
    if (customer) {
        $('#customerid').val(customer.id);
        $('#firstName').val(customer.first_name);
        $('#lastName').val(customer.last_name);
        $('#mobile').val(customer.mobile);
        $('#email').val(customer.email);
        $('#address').val(customer.address);
        editingRow = customer;
        $('#add-customer-btn').text('Update Customer');
    }
};

// Search
const searchCustomers = (searchValue) => {
    const lowerCaseValue = searchValue.toLowerCase();
    $('#customerTableBody tr').filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(lowerCaseValue) > -1);
    });
};

$('#add-customer-btn').on('click', saveCustomer);

$('#customerTableBody').on('click', '.delete-btn', function () {
    const index = $(this).closest('tr').index();
    const cus_id = customer_array[index].id;
    deleteCustomer(cus_id);
});

$('#customerTableBody').on('click', '.update-btn', function () {
    let index = $(this).closest('tr').index();
    editCustomer(customer_array[index]);
});

$('#customerSearch').on('keyup', function () {
    const value = $(this).val();
    searchCustomers(value);
});

loadCustomerTable();

