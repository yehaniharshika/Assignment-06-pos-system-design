
import {item_db} from "../db/db.js";
import {customer_db} from '../db/db.js';
import {order_db} from "../db/db.js";
import orderModel from "../model/orderModel.js";


function fillCurrentDate(){
    $("#order-date").val(new Date().toISOString().slice(0, 10));
}

function generateOrderId() {
    let highestOrderId = 0;

    // Find the highest numeric part of existing order IDs
    for (let i = 0; i < order_db.length; i++) {
        const numericPart = parseInt(order_db[i].orderId.split('-')[1]);
        if (!isNaN(numericPart) && numericPart > highestOrderId) {
            highestOrderId = numericPart;
        }
    }

    // Generate a new order ID by incrementing the highest numeric part
    const newOrderId = highestOrderId + 1;

    // Insert the new order ID into the #order-id text field
    $('#order-id').val('order-00' + newOrderId);

    // Return the generated order ID
    return 'order-00' + newOrderId;
}

window.addEventListener('load', function() {
    populateOrderIdField();
    fillCurrentDate();
});

/* Auto-generate the order ID when navigating to the main section */
function populateOrderIdField() {
    // Check if the input field with ID 'order-id' exists
    const orderIdField = document.getElementById('order-id');
    if (orderIdField) {
        // Call the function to generate and populate the order ID
        const generatedOrderId = generateOrderId();
        orderIdField.value = generatedOrderId;
    } else {
        console.error("Input field with ID 'order-id' not found.");
    }
}

/*load customers for combo box*/
export function loadAllCustomerId() {
    console.log('Loading all customer IDs');
    $('#custIdOption').empty(); // Clear existing options
    // Append new customer IDs
    for (let customerArElement of customer_db) {
        //console.log(`Appending customer ID: ${customerArElement.customerId}`);
        $('#custIdOption').append(`<option value="${customerArElement.customerId}">${customerArElement.customerId}</option>`);
    }
}

/*set customer details*/
$('#custIdOption').on('change', function(){
     var selectedCustomerId = $('#custIdOption option:selected').text();
    for (let customerArElement of customer_db) {
        if (customerArElement.customerId === selectedCustomerId){
            $('#set-customer-name').val(customerArElement.name);
            $('#set-customer-email').val(customerArElement.email);
        }
    }
});








