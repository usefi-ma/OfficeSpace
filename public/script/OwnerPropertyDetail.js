function getInfo() {
    let url = "http://localhost:3004/OwnerPropertyDetail" + window.location.pathname;


    fetch(url).then(response => response.json())
        .then((result) => {
            console.log('successfully get', result)
            $('#PropertyName').val(result.Name);
            $('#PropertyType').val(result.Type);
            $('#PropertyPrice').val(result.Price);
            $('#PropertySmoking').prop('checked', result.Smoking);
            $('#Propertytransport').prop('checked', result.PublicTransport);
            $('#PropertyParking').prop('checked', result.Parking);
            $('input[name="AvaibilityDate"][value=' + result.AvaibilityDate + ']').attr('checked', 'checked');
            $('input[name="TermLease"][value=' + result.TermLease + ']').attr('checked', 'checked');

            $('#PropertyAddress').val(result.Address);
            $('#PropertyNeighbour').val(result.Neighbourhood);
            $('#PropertySeat').val(result.Seat);
            $('#PropertySquare').val(result.SquareFeet);
            $('#UserId').val(result.UserId);
            $("#PropertyList").click(function() {
                location.href = 'http://localhost:3004/OwnerList?id=' + result.UserId + '';
            })
            $("#PropertyAdd").click(function() {
                location.href = 'http://localhost:3004/AddProperty?id=' + result.UserId + '';
            })
        })

    .catch(error => console.log('error:', error));
}
getInfo();


function updateItem() {

    let url = "http://localhost:3004/OwnerPropertyDetail" + window.location.pathname;
    fetch(url, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                "Name": $('#PropertyName').val(),
                "Type": $('#PropertyType').val(),
                "AvaibilityDate": $('input[name="AvaibilityDate"]:checked').val(),
                "Price": $('#PropertyPrice').val(),
                "Smoking": $('#PropertySmoking').is(":checked") ? true : false,
                "PublicTransport": $('#Propertytransport').is(":checked") ? true : false,
                "Parking": $('#PropertyParking').is(":checked") ? true : false,
                "TermLease": $(".TermLease:checked").val(),
                "Address": $('#PropertyAddress').val(),
                "Neighbourhood": $('#PropertyNeighbour').val(),
                "SquareFeet": $('#PropertySquare').val(),
                "Seat": $('#PropertySeat').val(),
                "UserId": $('#UserId').val()
            })
        })
        .then(response => response.json())
        .then((result) => {
            console.log('successfully update:', result);
            location.href = 'http://localhost:3004/ownerList?id=' + $('#UserId').val() + '';
        })

    .catch(error => console.log('error:', error));
}


function deleteItem() {
    let url = "http://localhost:3004/OwnerPropertyDetail" + window.location.pathname;

    fetch(url, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then((result) => {
            console.log('successfully delete:', result)
        })

    .catch(error => console.log('error:', error));
    window.location.replace("ownerList");

    var stringName = window.location.pathname.split(":");
    let itemNameProperty = stringName[1];
    alert("The " + itemNameProperty + " property deleted succefully");
    location.href = 'http://localhost:3004/ownerList?id=' + $('#UserId').val() + '';
}