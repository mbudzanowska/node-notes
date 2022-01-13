const { default: chalk } = require("chalk");
const fs = require("fs");

const getNotes = () => {
  return "Your notes...";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.find((note) => note.title === title);

  if (!duplicateNotes) {
    notes.push({
      title,
      body,
    });
    savedNotes(notes);
    console.log(chalk.inverse.green("New note added!"));
  } else {
    console.log(chalk.inverse.red("Note title taken!"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const filteredNotes = notes.filter((note) => note.title !== title);
  if (filteredNotes.length === notes.length) {
    console.log(chalk.inverse.red("Could not find a note with given title!"));
  } else {
    savedNotes(filteredNotes);
    console.log(chalk.inverse.green("Note removed!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length > 0) {
    console.log(chalk.inverse.blue("Your notes:"));
    notes.forEach((note) => {
      console.log(note.title);
    });
  } else {
    console.log(chalk.inverse.yellow("You don't have any notes."));
  }
};

const savedNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (!note) {
    console.log(chalk.inverse.red("Could not find a note with given title!"));
  } else {
    console.log(chalk.blue("Title: ", chalk.inverse(note.title)));
    console.log(note.body);
  }
};

module.exports = {
  addNote,
  getNotes,
  removeNote,
  listNotes,
  readNote,
};
