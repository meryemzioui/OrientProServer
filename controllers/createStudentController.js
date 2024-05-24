const stud = require("../models/stud");

exports.createStud = async (req, res) => {
  const {
    classe,
    name,
    datedenaissance,
    filiere,
    moyg,
    math,
    phys,
    scie,
    choix,
  } = req.body;
  //   const avatar = req.image;

  const existingstud = await stud.findOne({ name });
  if (existingstud) {
    return res.status(400).send("Student already exists");
  }

  let orient;
  if (moyg < 10) {
    orient = "non admis";
  } else if (choix === "mathematique" && (math + phys) / 2 > 13) {
    orient = "mathematique";
  } else if (choix === "scientifique" && (math + scie + phys) / 3 > 10) {
    orient = "scientifique";
  } else if (choix === "technique mathematique" && (math + phys) / 2 > 9) {
    orient = "technique mathematique";
  } else if (choix === "gestion" && math > 9) {
    orient = "gestion";
  } else {
    return res.status(400).send("Orientation does not meet requirements");
  }

  try {
    const Stud = new stud({
      classe,
      name,
      datedenaissance,
      filiere,
      moyg,
      math,
      phys,
      scie,
      choix,
      orient,
    });
    await Stud.save();
    res.json({ stud });
  } catch (err) {
    console.log(err);
  }
};

exports.readStud = async (req, res) => {
  try {
    const Stud = await stud.find();
    console.log(Stud);
    res.json(Stud);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteStudents = async (req, res) => {
  try {
    const deletedStudents = await stud.findByIdAndDelete(req.params.id);
    if (!deletedStudents) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




exports.getNumberOfNonAdmittedStudents = async (req, res) => {
  try {
    const numberOfNonAdmittedStudents = await stud.countDocuments({ orient: "non admis" });
    res.json({ numberOfNonAdmittedStudents });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred while fetching number of non admitted students");
  }
};

exports.getNumberOfAdmittedStudents = async (req, res) => {
  try {
    const numberOfAdmittedStudents = await stud.countDocuments({ orient: { $ne: "non admis" } });
    res.json({ numberOfAdmittedStudents });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error occurred while fetching number of admitted students");
  }
};