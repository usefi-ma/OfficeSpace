var green = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#157347" class="bi bi-check2" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" /></svg>';
var red = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#dc3545" class="bi bi-x-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" /><path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" /></svg>'

function getData() {

    const params = window.location.search;
    let useridSplit = params.split('=')
    let userid = useridSplit[1];
    // alert(userid)
    fetch('PropertyFile.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            // console.log(response)
            return response.json();
        })
        .then(function(myJson) {
            // console.log(myJson);

            var text = '';
            for (var i = 0; i < myJson.property.length; i++) {
                if (myJson.property[i].UserId == userid) {
                    text += '<div class="col-md-6 col-12 col-sm-6 list_container"><div class="list">' +
                        '<a href="listDetail.html"><div class="list_img" style=" background-image: url(/images/property/property1.jpg); ">' +
                        '</div></a><div class="list_content"><div class="row d-flex justify-content-between pb-2">' +
                        '<label class="w-auto green">' + myJson.property[i].Type + '</label><label class="w-auto">' + myJson.property[i].SquareFeet + 'sq.feet</label></div>' +
                        '<h2>' + myJson.property[i].Name + '</h2><span class="d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6c63ff" class="bi bi-geo-alt" viewBox="0 0 16 16"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" /><path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>' +
                        '<span class="ms-2">' + myJson.property[i].Address + '</span></span><div class="row"><div class="col-4"><label class="feature smoking">' +
                        '<span>' + (myJson.property[i].Smoking ? green : red) + ' Smoking </span></label></div><div class="col-5"><label class="feature">' +
                        '<span>' + (myJson.property[i].PublicTransport ? green : red) + ' Public Transport  </span></label></div><div class="col-3"><label class="feature">' +
                        '<span>' + (myJson.property[i].Parking ? green : red) + ' Parking </span></label></div></div><div class="row mt-2"><div class="col-6 property_price green">$' + myJson.property[i].Price +
                        '</div><div class="col-6 d-flex justify-content-end"><form action="/:' + myJson.property[i].Name + '" method="post"><input class=" me-2 property_btn" type="submit" value="select">' +
                        '</form></div></div></div></div></div>'
                }
            }


            document.getElementById("content").innerHTML = text;
        });
}
getData();
$(document).ready(function() {
    const params = window.location.search;
    let useridSplit = params.split('=')
    let userid = useridSplit[1];
    $("#PropertyList").click(function() {
        window.location.href = "http://localhost:3004/ownerlist?id=" + userid;
    })
})

function AddPropertyById() {
    const params = window.location.search;
    let useridSplit = params.split('=')
    let userid = useridSplit[1];

    location.href = 'http://localhost:3004/AddProperty?id=' + userid + '';

}

function SortByName(a, b) {
    var aName = a.Name.toLowerCase();
    var bName = b.Name.toLowerCase();
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function SortByPrice(a, b) {
    var aPrice = a.Price;
    var bPrice = b.Price;
    return ((aPrice < bPrice) ? -1 : ((aPrice > bPrice) ? 1 : 0));
}

function SortByFeet(a, b) {
    var aSquareFeet = a.SquareFeet;
    var bSquareFeet = b.SquareFeet;
    return ((aSquareFeet < bSquareFeet) ? -1 : ((aSquareFeet > bSquareFeet) ? 1 : 0));
}

function SortBySeat(a, b) {
    var aSeat = a.Seat;
    var bSeat = b.Seat;
    return ((aSeat < bSeat) ? -1 : ((aSeat > bSeat) ? 1 : 0));
}

var SortValue = "";

$('#SortSelect').on('change', function() {
    SortValue = $(this).val();
    console.log(SortValue)
});

function SortItems() {

    fetch('PropertyFile.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            switch (SortValue) {
                case 'Price':
                    myJson.property.sort(SortByPrice);
                    break;
                case 'Name':
                    myJson.property.sort(SortByName);
                    break;
                case 'SquareFeet':
                    myJson.property.sort(SortByFeet);
                    break;
                case 'Seat':
                    myJson.property.sort(SortBySeat);
                    break;
            }
            const params = window.location.search;
            let useridSplit = params.split('=')
            let userid = useridSplit[1];
            var text = '';
            for (var i = 0; i < myJson.property.length; i++) {
                if (myJson.property[i].UserId == userid) {
                    text += '<div class="col-md-6 col-12 col-sm-6 list_container"><div class="list">' +
                        '<a href="listDetail.html"><div class="list_img" style=" background-image: url(/images/property/property1.jpg); ">' +
                        '</div></a><div class="list_content"><div class="row d-flex justify-content-between pb-2">' +
                        '<label class="w-auto green">' + myJson.property[i].Type + '</label><label class="w-auto">' + myJson.property[i].SquareFeet + 'sq.feet</label></div>' +
                        '<h2>' + myJson.property[i].Name + '</h2><span class="d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6c63ff" class="bi bi-geo-alt" viewBox="0 0 16 16"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" /><path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>' +
                        '<span class="ms-2">' + myJson.property[i].Address + '</span></span><div class="row"><div class="col-4"><label class="feature smoking">' +
                        '<span>' + (myJson.property[i].Smoking ? green : red) + ' Smoking </span></label></div><div class="col-5"><label class="feature">' +
                        '<span>' + (myJson.property[i].PublicTransport ? green : red) + ' Public Transport</span></label></div><div class="col-3"><label class="feature">' +
                        '<span> ' + (myJson.property[i].Parking ? green : red) + ' Parking</span></label></div></div><div class="row mt-2"><div class="col-6 property_price green">$' + myJson.property[i].Price +
                        '</div><div class="col-6 d-flex justify-content-end"><form action="/:' + myJson.property[i].Name + '" method="post"><input class=" me-2 property_btn" type="submit" value="select">' +
                        '</form></div></div></div></div></div>'
                }
            }
            document.getElementById("content").innerHTML = text;
        });
}