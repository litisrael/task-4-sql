import {
  rl,
  memir,
  userinfo,
  askMenu,
 
} from "./question.js";


const usersApp = async () => {
  const whatTodo = await memir(askMenu());
  await console.log(whatTodo)
  console.log("Thank you for use the app, bye bye");
  rl.close();
}


// const operations = {
//   1: UserInfo,
//   2: searchId,
//   3: idToDelete,
// };
// //push
// const usersApp = async () => {
//   const whatTodo = await askMenu();
//   const myFn = operations[whatTodo];
//   await myFn();
//   console.log("Thank you for use the app, bye bye");
//   rl.close();
// };

usersApp();
