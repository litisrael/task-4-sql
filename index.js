import {
  rl,
  askForUserInfo,
  askMenu,
  searchId,
  idToDelete,
} from "./question.js";



const operations = {
  1: askForUserInfo,
  2: searchId,
  3: idToDelete,
};
//push
const usersApp = async () => {
  const whatTodo = await askMenu();
  const myFn = operations[whatTodo];
  await myFn();
  console.log("Thank you for use the app, bye bye");
  rl.close();
};

usersApp();
