import {ItemModel} from "../model/ItemModel.js";
import {customer_db, item_db} from "../db/db.js";

var recordIndex;
function loadTable() {

    $("#item-tbl-tbody").empty();

    item_db.map((item, index) => {
        console.log(item);

        let record = `<tr>
                <td class="item-code-value">${item.itemCode}</td>
                <td class="item-name-value">${item.itemName}</td>
                <td class="item-unitPrice-value">${item.unitPrice}</td>
                <td class="qty-on-hand-value">${item.qtyOnHand}</td>
            </tr>`;
        $("#item-tbl-tbody").append(record);
    });
}

$("#item-tbl-tbody").on('click', 'tr', function() {
    let index = $(this).index();
    recordIndex = index;

    console.log("index: ", index);

    let itemCode = $(this).find(".item-code-value").text();
    let itemName = $(this).find(".item-name-value").text();
    let unitPrice = $(this).find(".item-unitPrice-value").text();
    let qtyOnHand = $(this).find(".qty-on-hand-value").text();

    $("#item-code").val(itemCode);
    $("#item-name").val(itemName);
    $("#unit-price").val(unitPrice);
    $("#qty-on-hand").val(qtyOnHand);

});

/*
function generateCustomerId() {
    let highestCustomerId = 0;

    // Find the highest numeric part of existing customer IDs
    for (let i = 0; i < item_db.length; i++) {
        const numericPart = parseInt(item_db[i].customerId.split('-')[1]);
        if (!isNaN(numericPart) && numericPart > highestCustomerId) {
            highestCustomerId = numericPart;
        }
    }

    // Generate a new customer ID by incrementing the highest numeric part
    const newCustomerId = highestCustomerId + 1;

    // Insert the new customer ID into the #customer-id text field
    $('#customer-id').val('CUS-00' + newCustomerId);

    // Return the generated customer ID
    return 'CUS-00' + newCustomerId;
}*/

/*save item*/
$("#item-save").on('click', () => {
    var itemCode = $('#item-code').val();
    var itemName = $('#item-name').val().trim();
    var unitPrice = $('#unit-price').val().trim();
    var qtyOnHand = $('#qty-on-hand').val().trim();

    let item = new ItemModel(
        itemCode,
        itemName,
        unitPrice,
        qtyOnHand
    );

    Swal.fire(
        'Save Successfully!',
        'Item saved successfully.',
        'success'
    );

    // push to the array
    item_db.push(item);

    loadTable();
    $("#item-reset").click();
    populateCustomerIdField();
});

/*update item*/
$("#item-update").on('click', () => {
    var itemCode = $('#customer-Id').val();
    var itemName = $('#customer-name').val();
    var itemUnitPrice = $('#customer-address').val();
    var itemQtyOnHand = $('#contact-number').val();


    let itemObj = item_db[recordIndex];

    itemObj.itemCode = itemCode;
    itemObj.itemName = itemName;
    itemObj.unitPrice = itemUnitPrice;
    itemObj.qtyOnHand = itemQtyOnHand;

    Swal.fire(
        'Update Successfully !',
         I updated successfully.',
        'success'
    )


    loadTable();
    $("#customer-reset").click();
    populateCustomerIdField();

});