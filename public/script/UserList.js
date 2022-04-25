var green = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#157347" class="bi bi-check2" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" /></svg>';
var red = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#dc3545" class="bi bi-x-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" /><path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" /></svg>'


var acc = document.getElementsByClassName("accordion");
var i;
for (i = 0; i < acc.length; i++) {
    var panel = acc[i].nextElementSibling;
    panel.style.maxHeight = panel.scrollHeight + "px";
    acc[i].addEventListener("click", function() {
        this.classList.toggle("accordion-active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

function getData() {
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

                text += '<div class="col-md-6 col-12 col-sm-6 list_container"><div class="list">' +
                    '<a href="listDetail.html"><div class="list_img" style=" background-image: url(/images/property/property1.jpg); ">' +
                    '</div></a><div class="list_content"><div class="row d-flex justify-content-between pb-2">' +
                    '<label class="w-auto green">' + myJson.property[i].Type + '</label><label class="w-auto">' + myJson.property[i].SquareFeet + 'sq.feet</label></div>' +
                    '<h2>' + myJson.property[i].Name + '</h2><span class="d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6c63ff" class="bi bi-geo-alt" viewBox="0 0 16 16"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" /><path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>' +
                    '<span class="ms-2">' + myJson.property[i].Address + '</span></span><div class="row"><div class="col-4"><label class="feature smoking">' +
                    '<span>' + (myJson.property[i].Smoking ? green : red) + ' Smoking </span></label></div><div class="col-5"><label class="feature">' +
                    '<span>' + (myJson.property[i].PublicTransport ? green : red) + ' Public Transport </span></label></div><div class="col-3"><label class="feature">' +
                    '<span>' + (myJson.property[i].Parking ? green : red) + ' Parking</span></label></div></div><div class="row mt-2"><div class="col-6 property_price green">$' + myJson.property[i].Price +
                    '</div><div class="col-6 d-flex justify-content-end"><form action="/:' + myJson.property[i].Name + '" method="get">' +
                    '<input class="property_btn" type="submit" value="SELECT"></form></div></div></div></div></div>'
            }


            document.getElementById("content").innerHTML = text;
        });
}
getData();


//alert(SmokingCheckbox.is(":checked"))



function showFilter() {

    var SmokingCheckbox = $('.smokingcheckbox');
    var TransportationCheckbox = $('.TransportationCheckbox');
    var ParkingCheckbox = $('.ParkingCheckbox');
    var SeatInput = document.getElementById("SeatInput");
    var SquarefeetInput = document.getElementById("SquarefeetInput");
    var NeighbourInput = document.getElementById("NeighbourInput");
    var AddressInput = document.getElementById("AddressInput");
    var PropertyTypeSelect = $('#PropertyType').val();
    var PriceInput = document.getElementById("PriceInput");
    var TermLease = $(".TermLease:checked");
    var Avaibility = $(".Avaibility:checked");


    var SearchResult = [];
    var TermArray = [];
    var AvaibilityArray = [];

    for (var k = 0; k < TermLease.length; k++) {
        TermArray.push(TermLease[k].value);
    }
    for (var k = 0; k < Avaibility.length; k++) {

        AvaibilityArray.push(Avaibility[k].value);

    }


    let SmokingFilter = true;
    let TransportationFilter = true;
    let ParkingFilter = true;
    let SeatFilter = true;
    let SquarefeetFilter = true;
    let NeighbourFilter = true;
    let AddressFilter = true;
    let TypeFilter = true;
    let PriceFilter = true;

    let CountTerm = 0
    let TermFilter = true;
    let AvaibilityFilter = true;

    var text = '';
    var SearchResult = [];





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

            for (var i = 0; i < myJson.property.length; i++) {
                if (SmokingCheckbox.is(":checked")) {
                    if (myJson.property[i].Smoking === SmokingCheckbox.is(":checked")) {
                        SmokingFilter = true;
                    } else {
                        SmokingFilter = false;
                    }
                }

                if (TransportationCheckbox.is(":checked")) {
                    if (myJson.property[i].PublicTransport === TransportationCheckbox.is(":checked")) {
                        TransportationFilter = true;
                    } else {
                        TransportationFilter = false;
                    }
                }

                if (ParkingCheckbox.is(":checked")) {
                    if (myJson.property[i].Parking === ParkingCheckbox.is(":checked")) {
                        ParkingFilter = true;
                    } else {
                        ParkingFilter = false;
                    }
                }

                if (PriceInput && PriceInput.value) {
                    if (myJson.property[i].Price == PriceInput.value) {
                        PriceFilter = true;
                    } else {
                        PriceFilter = false;
                    }
                }

                if (SeatInput && SeatInput.value) {
                    if (myJson.property[i].Seat == SeatInput.value) {
                        SeatFilter = true;
                    } else {
                        SeatFilter = false;
                    }
                }

                if (SquarefeetInput && SquarefeetInput.value) {
                    if (myJson.property[i].SquareFeet == SquarefeetInput.value) {
                        SquarefeetFilter = true;
                    } else {
                        SquarefeetFilter = false;
                    }
                }

                if (TermArray.length >= 1) {

                    for (let j = 0; j < TermArray.length; j++) {
                        if (myJson.property[i].TermLease == TermArray[j]) {
                            TermFilter = true;
                            break;
                        } else {
                            TermFilter = false;
                        }
                    }
                    if (TermArray.length >= 1 && TermFilter) {
                        TermFilter = true;
                    } else {
                        TermFilter = false;
                    }
                }


                if (AvaibilityArray.length >= 1) {
                    for (let j = 0; j < AvaibilityArray.length; j++) {
                        if (myJson.property[i].AvaibilityDate == AvaibilityArray[j]) {
                            AvaibilityFilter = true;
                            break;
                        } else {
                            AvaibilityFilter = false;
                        }
                    }
                    if (AvaibilityArray.length >= 1 && AvaibilityFilter) {
                        AvaibilityFilter = true;
                    } else {
                        AvaibilityFilter = false;
                    }
                }


                if (NeighbourInput && NeighbourInput.value) {
                    if (myJson.property[i].Neighbourhood == NeighbourInput.value) {
                        NeighbourFilter = true;
                    } else {
                        NeighbourFilter = false;
                    }
                }

                if (AddressInput && AddressInput.value) {
                    if (myJson.property[i].Address == AddressInput.value) {
                        AddressFilter = true;
                    } else {
                        AddressFilter = false;
                    }
                }

                if (PropertyTypeSelect != "") {
                    if (myJson.property[i].Type.split(" ").join("") == $('#PropertyType').val()) {
                        TypeFilter = true
                    } else {
                        TypeFilter = false;
                    }
                }



                if (SmokingFilter && TransportationFilter && ParkingFilter && SeatFilter && PriceFilter && SquarefeetFilter && NeighbourFilter && AddressFilter && TypeFilter && TermFilter && AvaibilityFilter) {
                    SearchResult.push(myJson.property[i]);
                    // console.log(SearchResult.length);
                }
            }



            for (var i = 0; i < SearchResult.length; i++) {
                text += '<div class="col-md-6 col-12 col-sm-6 list_container"><div class="list">' +
                    '<a href="listDetail.html"><div class="list_img" style=" background-image: url(/images/property/property1.jpg); ">' +
                    '</div></a><div class="list_content"><div class="row d-flex justify-content-between pb-2">' +
                    '<label class="w-auto green">' + SearchResult[i].Type + '</label><label class="w-auto">' + SearchResult[i].SquareFeet + 'sq.feet</label></div>' +
                    '<h2>' + SearchResult[i].Name + '</h2><span class="d-flex align-items-center"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#6c63ff" class="bi bi-geo-alt" viewBox="0 0 16 16"><path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" /><path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>' +
                    '<span class="ms-2">' + SearchResult[i].Address + '</span></span><div class="row"><div class="col-4"><label class="feature smoking">' +
                    '<span>Smoking : ' + SearchResult[i].Smoking + '</span></label></div><div class="col-5"><label class="feature"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#157347" class="bi bi-check2" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" /></svg>' +
                    '<span>Public Transport : ' + SearchResult[i].PublicTransport + '</span></label></div><div class="col-3"><label class="feature"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#dc3545" class="bi bi-x-lg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" /><path fill-rule="evenodd" d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" /></svg>' +
                    '<span>Parking : ' + SearchResult[i].Parking + '</span></label></div></div><div class="row mt-2"><div class="col-6 property_price green">$' + SearchResult[i].Price +
                    '</div><div class="col-6 d-flex justify-content-end"><form action="/:' + SearchResult[i].Name + '" method="get">' +
                    '<input class="property_btn" type="submit" value="SELECT"></form></div></div></div></div></div>'
            }
            document.getElementById("content").innerHTML = text;


        });
}