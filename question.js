import { asignarId } from "./utilytis.js";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { getUserById, deleteLine } from "./data.js";
import { saveUser } from "./data.js";
//prubea
export const rl = readline.createInterface({ input, output });
console.log("welcome to DB of weight !!!");

export const askMenu = async () => {
  let answer = await rl.question(
    "acept only sql, \nif u want to insert user as 4 colums 'name', 'gender','kilos','meter'\n"
  );

  return answer;
};

export async function memir(input) {
  const firstLine = await input;
  const firstWord = firstLine.split(" ")[0];
  if (firstWord.toUpperCase() === "ISERT") {
   return saveUser(userinfo(firstLine)) ;
  }
  if (firstWord.toUpperCase() === "SELECT") {
    return searchId(firstLine);
  }
  if (firstWord.toUpperCase() === "DELETE") {
    return deleteLine(getId(firstLine));
  }
}

function searchId(input) {
  const regex = /WHERE id = "(\w+)"/;
  const matches = input.match(regex);
  if (!matches) {
    return '';
  }
  return getUserById(matches[1]);
}


// export const idToDelete = async () => {
//   const answer = await rl.question("witch id u want to delete?\n");
//   deleteLine(answer);
// };

export const userinfo = (input) => {
  const expectedOrder = ["name", "gender", "kilos", "meter"];
  const keys = input.match(/\((.*?)\)/)[1].split(", ").map(key => key.trim());
  const values = input.match(/values \((.*?)\)/)[1];
  const result = values.split(", ").map(value => value.replace(/[\"\']/g, "").trim());
  const orderedResult = expectedOrder.map(expectedKey => {
    const index = keys.indexOf(expectedKey);
    return index !== -1 ? result[index] : null;
  });
  return orderedResult;
};


function getId(input) {
  const regex = /where id = "(\w+)"/;
  const matches = input.match(regex);
  if (!matches) {
    return '';
  }
  return matches[1];
}

// export const askForName = async (msg = null) => {
//   if (msg) console.log(msg);
//   const answer = await rl.question("Write your first and last name\n");
//   if (answer.length < 4)
//     return askForName("name should have more than 4 letters\n");
//   if (answer.length > 25)
//     return askForName("name should have no more than 25 letters\n");
//   if (/\d/.test(answer)) return askForName("name should have letters\n");
//   return answer;
// };

// export const askForWeight = async (msg = null) => {
//   if (msg) console.log(msg);
//   const answer = await rl.question(
//     "add the weight in kilos (must be greater than or equal to 10):\n"
//   );

//   if (isNaN(answer))
//     return askForWeight("The entered value is not a valid number. Try again.");
//   if (answer < 10)
//     return askForWeight(
//       "The weight must be greater than or equal to 10 kilos. Try again."
//     );
//   if (answer > 200)
//     return askForWeight("The weight should be less than 200 Kilos. Try again.");
//   return answer;
// };

// export const askForHeight = async (msg = null) => {
//   if (msg) console.log(msg);
//   const answer = await rl.question("height in meters!\n");
//   if (answer > 300)
//     return askForHeight("the height should not be more than 300 CM");
//   if (answer < 50)
//     return askForHeight("the height should not be less than 50 CM");
//   return Math.round(answer);
// };

// export const askForGender = async () => {
//   let gender = null;
//   while (gender !== "M" && gender !== "F") {
//     gender = await rl.question('gender: Please answer "M" or "F":\n');
//     gender = gender.toUpperCase();
//   }
//   return gender;
// };

// export const askForUserInfo = async () => {
//   const name = await askForName();
//   const gender = await askForGender();
//   const kilos = await askForWeight();
//   const meter = await askForHeight();
// saveUser([asignarId(), name, gender, kilos, meter]);
//   console.log(`thank you ${name}, your data is complete`);
// };
