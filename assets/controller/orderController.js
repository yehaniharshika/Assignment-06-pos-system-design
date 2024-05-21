
import {item_db} from "../db/db.js";
import {customer_db} from '../db/db.js';
import {order_db} from "../db/db.js";
import orderModel from "../model/orderModel.js";


function fillCurrentDate(){
    $("#order-date").val(new Date().toISOString().slice(0, 10));
}

export function loadAllCustomerId() {
    console.log('Loading all customer IDs');
    $('#cusIdOption').empty(); // Clear existing options
    // Append new customer IDs
    for (let customerArElement of customer_db) {
        //console.log(`Appending customer ID: ${customerArElement.customerId}`);
        $('#cusIdOption').append(`<option value="${customerArElement.customerId}">${customerArElement.customerId}</option>`);
    }
}

/*$(document).ready(function() {
    $('#cusIdOption').hide(); // Hide the dropdown for testing
});*/

window.addEventListener('load', function() {
    // console.log('Window loaded');
    // loadAllCustomerId();
    fillCurrentDate();
});





