$(document).ready(function() {
    var Username = $("input[name='Email']");
    var Password = $("input[name='Password']");
    $('#signinbutton').click(function(e) {
        if ($(Username).val() == '' || $(Password).val() == '') {
            alert("Plaese Enter all inputs")
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }

    });


});

// function getErrorMessage() {
//     let url = "http://localhost:3004/check/:" + $("input[name='Email']").val();


//     fetch(url)
//         .then(response => response.json())
//         .then((result) => {
//             console.log('successfully get', result)
//                 // $('#message').text(result);
//             alert(result.msg);
//             return false
//         })

//     .catch(error => console.log('error:', error));
// }


//for alerting this is the best way