const Student = require("../models/student");

exports.createStudents = async (req, res) => {
  console.log(req.formattedData);

  // Get the formatted data from the request object
  const studentsData = req.formattedData;

  // Prepare an array to hold promises for each student creation
  const createPromises = studentsData.map((studentData) => {
    // Create a new student instance using the provided data
    const newStudent = new Student(studentData);

    // Save the student instance to the database
    return newStudent.save();
  });
  try {
    // Wait for all student creation promises to complete
    await Promise.all(createPromises);
    // Respond with a success message and status code
    res.status(201).send("Students created successfully");
  } catch (error) {
    console.error("Error creating students:", error);
    // Respond with an error message and status code
    res.status(500).send("Error creating students");
  }
};


