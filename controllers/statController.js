exports.getOrientationCounts = async (req, res) => {
    try {
      // Count the number of students in each orientation
      const mathelemeCount = await stud.countDocuments({ orientation: 'matheleme' });
      const scientifiqueCount = await stud.countDocuments({ orientation: 'scientifique' });
      const maththecniqueCount = await stud.countDocuments({ orientation: 'maththecnique' });
      const gestionCount = await stud.countDocuments({ orientation: 'gestion' });
  
      // Respond with the counts in a JSON object
      res.json({
        matheleme: mathelemeCount,
        scientifique: scientifiqueCount,
        maththecnique: maththecniqueCount,
        gestion: gestionCount,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
    }
  };