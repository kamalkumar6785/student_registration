$(document).ready(function() {
  var x = 1;

  $('#switchBtn').click(function(event) {
      if (x % 2 == 1) {
          $('#switchBtn').text("Register a new student");
          $('#GetinfoForm').show();
          $('#RegistrationForm').hide();
          x++;
      } else {
          $('#switchBtn').text("Get Info using Student ID");
          $('#RegistrationForm').show();
          $('#GetinfoForm').hide();
          x++;
      }
  });

  $('#registerBtn').click(function(event) {
      console.log("Registering Student...");
    
      // Gather form data
      const formData = {
          fname: $('#fname').val(),
          lname: $('#lname').val(),
          age: $('#age').val(),
          gender: $('input[name="list-radio"]:checked').val(),
          rno: $('#rno').val(),
          dob: $('[datepicker]').val(),
          department: $('#dropdownMenu').val(),
          hobbies: $('#hobbies').val().split(",").map(item => item.trim())
      };

      console.log(formData);
        
      const rollNo = formData.rno;

      // Save form data to local storage with roll number as key
      localStorage.setItem(`student_${rollNo}`, JSON.stringify(formData));
      
      // Clear form fields
      $('#regform')[0].reset();

      // Optionally, you can display a success message or perform other actions here
      alert("Registration successful!");

      event.preventDefault();
  });

  function getStudentInfoByRno(rollNo) {
      const key = `student_${rollNo}`;
      const studentData = localStorage.getItem(key);
      return JSON.parse(studentData);
  }

  $('#showinfoBtn').click(function(event) {
      console.log("Getting Info");
      event.preventDefault();

      // Get roll number from input field
      const rollNoInput = $('#getRno').val();

      // Get student info based on roll number
      const studentInfo = getStudentInfoByRno(rollNoInput);

      // Check if student info exists
      if (studentInfo) {
          alert("Name: "+ studentInfo["fname"]+" " +studentInfo["lname"] + "\n"+
                "Age: " + studentInfo["age"]+"\n"+
                "Gender: " + studentInfo["gender"]+ "\n" +
                "DOB: " + studentInfo["dob"] + "\n"+
                "Department: " + studentInfo["department"]+"\n"+
                "hobbies: "+ studentInfo["hobbies"]
          );
      } else {
          // If student info doesn't exist, display a message
          console.log("Student with Roll No. " + rollNoInput + " not found!");
          // Example: You can display a message on the webpage indicating that the student info was not found
      }
  });
});
