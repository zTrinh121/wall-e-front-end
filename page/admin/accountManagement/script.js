import { userList } from "../../../dummyData/userDemo.js";

// Start: Drop down
document.addEventListener("DOMContentLoaded", function () {
  const bell = document.getElementById("bell");
  const contentNotification = document.querySelector(".content-notification");
  const profileDropdownList = document.querySelector(".profile-dropdown-list");
  const profileDropdownBtn = document.querySelector(".profile-dropdown-btn");

  function toggleProfileDropdown() {
    profileDropdownList.classList.toggle("active");
    contentNotification.style.display = "none"; // Hide notification dropdown
  }

  function toggleNotificationDropdown() {
    contentNotification.style.display =
      contentNotification.style.display === "block" ? "none" : "block";
    profileDropdownList.classList.remove("active"); // Hide profile dropdown
  }

  bell.addEventListener("click", function () {
    toggleNotificationDropdown();
  });

  profileDropdownBtn.addEventListener("click", function () {
    toggleProfileDropdown();
  });

  // Close both dropdowns if the user clicks outside of them
  window.addEventListener("click", function (event) {
    if (
      !bell.contains(event.target) &&
      !contentNotification.contains(event.target)
    ) {
      contentNotification.style.display = "none";
    }
    if (
      !profileDropdownBtn.contains(event.target) &&
      !profileDropdownList.contains(event.target)
    ) {
      profileDropdownList.classList.remove("active");
    }
  });
});

// End: Drop down

// Start modal notification detail
document.addEventListener("DOMContentLoaded", function () {
  // Function to open the modal
  function openModal(notificationText) {
    const modal = document.getElementById("notificationModal");
    const notificationDetails = document.getElementById("notificationDetails");
    notificationDetails.innerText = notificationText;
    modal.style.display = "block";
  }

  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById("notificationModal");
    modal.style.display = "none";
  }

  // Event listener for notification clicks
  const notificationLinks = document.querySelectorAll(
    ".content-notification ul li a"
  );
  notificationLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent default anchor behavior
      const notificationText = this.getAttribute("data-notification");
      openModal(notificationText);
    });
  });

  // Event listener for close button
  const closeButton = document.querySelector(".modal .close");
  closeButton.addEventListener("click", closeModal);

  // Close modal when clicking outside of the modal content
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("notificationModal");
    if (event.target === modal) {
      closeModal();
    }
  });
});
// End modal notification detail


// Start: Hamburger
$(document).ready(function () {
  $(".hamburger").click(function () {

      $(".wrapper").toggleClass("collapse");
      if ($(window).width() < 768) {
        // Nếu chiều rộng bé hơn 768px, thêm phần tìm kiếm vào
        $(".search").toggleClass("show-search");
      }
  });
});
// End: Hamburger

// Display user data
userList.forEach((element) => {
  console.log(element);
});

document.addEventListener('DOMContentLoaded', function() {
  const roleFilter = document.getElementById('role');
  const tableBody = document.getElementById('tableBody');

  function buildTable(data) {
      tableBody.innerHTML = ''; // Clear existing table rows
      data.forEach((e) => {
          let lock = e.C14_ACC_STATUS == 1 ? "Khóa" : "Mở khóa";
          let row = `<tr>
                          <td><p>${e.C14_USER_NAME}</p></td>
                          <td><p>${e.C14_ROLE_ID}</p></td>
                          <td><p>${e.C14_ACC_STATUS}</p></td>
                          <td><button class="action-button">${lock}</button></td>
                     </tr>`;
          tableBody.innerHTML += row;
      });
      addEventListenersToButtons();
  }

  function filterTable() {
      const selectedRole = roleFilter.value;
      let roleEnum = 0; // Default to 'all'
      if(selectedRole === 'student') { roleEnum = 1; }
      else if(selectedRole === 'teacher') { roleEnum = 2; }
      else if(selectedRole === 'parent') { roleEnum = 3; }
      else if(selectedRole === 'manager') { roleEnum = 4; }

      const filteredData = roleEnum === 0 ? userList : userList.filter(user => user.C14_ROLE_ID === roleEnum);

      buildTable(filteredData);
  }

  // Listen button
  function addEventListenersToButtons() {
      const buttons = document.querySelectorAll('.action-button');
      buttons.forEach(button => {
          button.addEventListener('click', function() {
              const userName = button.parentElement.parentElement.querySelector('td:first-child p').innerText;
              // Toggle lock status
              const newStatus = button.innerText === "Khóa" ? "Mở khóa" : "Khóa";
              // Update button text
              button.innerText = newStatus;
              showToast(newStatus, userName);
          });
      });
  }

  function showToast(message, userName) {
      const toast = document.getElementById('toast');
      const toastMessage = document.getElementById('toastMessage');
      toastMessage.innerHTML = `<i class="fas fa-info"></i> Tài khoản ${userName} đã ${message.toLowerCase()}`;
      toast.className = 'toast show';
      setTimeout(function() {
          toast.className = toast.className.replace('show', '');
      }, 3000);
  }

  roleFilter.addEventListener('change', filterTable);

  // Initial table build
  buildTable(userList);
});
