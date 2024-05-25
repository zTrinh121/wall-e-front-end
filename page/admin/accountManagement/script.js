import { userList } from "../../../dummyData/userDemo.js";

// Start: Hamburger
$(document).ready(function () {
  $(".hamburger").click(function () {
    $(".wrapper").toggleClass("collapse");
  });
});
// End: Hamburger

// Display user data
userList.forEach((element) => {
  console.log(element);
});

function buildTable(data) {
  var table = document.getElementById("tableBody");
  userList.forEach((e) => {
    if(e.C14_ACC_STATUS == 1){
      var lock = "Khóa";
    }else lock = "Mở khóa";
    var row = `<tr>
                    <td>
                        <p>${e.C14_USER_NAME}</p>
                    </td>
                    <td>
                        <p>${e.C14_ROLE_ID}</p>
                    </td>
                    <td>
                      <p>${e.C14_ACC_STATUS}</p>
                    </td>
                    <td>
                      <button>${lock}</button>
                    </td>
                </tr>`;
                table.innerHTML += row;
  });
}

buildTable(userList);
