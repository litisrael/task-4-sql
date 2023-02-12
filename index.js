import {
  rl,
  memir,
  userInfo,
  askMenu,
  searchId,
  getIdToDelete
 
} from "./question.js";



const operations = {
  1: userInfo,
  2: searchId,
  3:getIdToDelete
};

//push
const usersApp = async () => {
  const answer =  await askMenu()
  const whatTodo = await memir(answer);

 
  const myFn = operations[whatTodo];
 
    await myFn(answer);
  

  console.log("Thank you for use the app, bye bye");
  rl.close();
};

usersApp();
