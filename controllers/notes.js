const Note = require("../models/notes");
const User = require("../models/User");

exports.getNotes = async (req, res, next) => {
  User.findById({ _id: req.user.id })
    .populate("myNotes")
    .exec((err, document) => {
      if (err)
        res.status(500).json({
          message: { msgBody: "Error has occured", msgError: true },
        });
      else {
        res.status(200).json({ myNotes: document.myNotes, authenticate: true });
      }
    });
};

exports.addNote = async (req, res, next) => {
  const note = new Note(req.body);
  note.save((err) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    else {
      User.findById({ _id: req.user.id }, (err, user) => {
        user.myNotes.push(note);
        user.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: "Error has occureded", msgError: true },
            });
          else {
            User.findById({ _id: req.user.id })
              .populate("myNotes")
              .exec((err, document) => {
                if (err)
                  res.status(500).json({
                    message: { msgBody: "Error has occured", msgError: true },
                  });
                else {
                  res
                    .status(200)
                    .json({ myNotes: document.myNotes, authenticate: true });
                }
              });
          }
        });
      });
    }
  });
};
exports.deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        success: false,
        error: "No transaction found",
      });
    }
    await note.remove();
    return User.findById({ _id: req.user.id })
      .populate("myNotes")
      .exec((err, document) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Error has occured", msgError: true },
          });
        else {
          res
            .status(200)
            .json({ myNotes: document.myNotes, authenticate: true });
        }
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
