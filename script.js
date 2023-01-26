function validateForm() {
    var amount = document.getElementById("amount").value;
    var desc = document.getElementById("desc").value;
    var cat = document.getElementById("cat").value;

    if (amount == "") {
        // alert("Expense Amount is Required..!");
        msg.innerHTML = `<h6 style="color: red;">Expense Amount is Required..!</h6>`;
        return false;
    }
    if (desc == "") {
        // alert("Expense Description is Required..!");
        msg.innerHTML = `<h6 style="color: red;">Expense Description is Required..!</h6>`;
        return false;
    }
    if (cat == "") {
        // alert("Expense Category is Required..!");
        msg.innerHTML = `<h6 style="color: red;">Expense Category is Required..!</h6>`;
        return false;
    }
    return true;
}

function showData() {
    var expenseList;
    if (localStorage.getItem("expenseList") == null) {
        expenseList = [];
    } else {
        expenseList = JSON.parse(localStorage.getItem("expenseList"));
    }

    var html = "";

    expenseList.forEach(function (element, index){
        html = html + "<tr>";
        html = html + "<td>" + element.amount + "</td>";
        html = html + "<td>" + element.desc + "</td>";
        html = html + "<td>" + element.cat + "</td>";
        html = html + '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button><button onclick="updateData(' + index + ')" class="btn btn-warning m-2">Edit</button></td>';
        html = html + "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = showData();

function AddData() {
    if (validateForm() == true) {
        var amount = document.getElementById("amount").value;
        var desc = document.getElementById("desc").value;
        var cat = document.getElementById("cat").value;

        var expenseList;
        if (localStorage.getItem("expenseList") == null) {
            expenseList = [];
        } else {
            expenseList = JSON.parse(localStorage.getItem("expenseList"));
        }

        expenseList.push({
            amount: amount,
            desc: desc,
            cat: cat,
        });


        for (var i = 0; i < expenseList.length; i++) {
            // Post APi SUccess
            axios.post("https://crudcrud.com/api/5c08f89b525746a99b76eeedf1bb63c4/appointmentData", expenseList[i])
              .then((response) => {
                showData(response.data);
                console.log(response);
              })
              .catch((err) => {
                console.log(err);
              });
        }
        // localStorage.setItem("expenseList", JSON.stringify(expenseList));
        // showData();
        msg.innerHTML = `<h6 style="color: green;">Data Added Successfully..!</h6>`;
        document.getElementById("amount").value = "";
        document.getElementById("desc").value = "";
        document.getElementById("cat").value = "";
    }
}

function deleteData(index) {
    var ans = confirm("Are you Sure you want to permanentaly delete this data ?");
    if (ans == true) {
        var expenseList;
        if (localStorage.getItem("expenseList") == null) {
          expenseList = [];
        } else {
          expenseList = JSON.parse(localStorage.getItem("expenseList"));
        }

        expenseList.splice(index, 1);
        localStorage.setItem("expenseList", JSON.stringify(expenseList));
        showData();
        msg.innerHTML = `<h6 style="color: red;">Data Deleted Successfully..!</h6>`;
    }
}

function updateData(index) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";
    
    var expenseList;
    if (localStorage.getItem("expenseList") == null) {
      expenseList = [];
    } else {
      expenseList = JSON.parse(localStorage.getItem("expenseList"));
    }

    document.getElementById("amount").value = expenseList[index].amount;
    document.getElementById("desc").value = expenseList[index].desc;
    document.getElementById("cat").value = expenseList[index].cat;

    document.querySelector("#Update").onclick = function () {
        if (validateForm() == true) {
            expenseList[index].amount = document.getElementById("amount").value;
            expenseList[index].desc = document.getElementById("desc").value;
            expenseList[index].cat = document.getElementById("cat").value;

            localStorage.setItem("expenseList", JSON.stringify(expenseList));
            showData();
            msg.innerHTML = `<h6 style="color: yellow;">Data Updated Successfully..!</h6>`;
            document.getElementById("amount").value = "";
            document.getElementById("desc").value = "";
            document.getElementById("cat").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}