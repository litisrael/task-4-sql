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
  if (firstWord.toUpperCase() === "INSERT") {
    return 1 ;
  }
  if (firstWord.toUpperCase() === "SELECT") {
    return 2;
  }
  if (firstWord.toUpperCase() === "DELETE") {
    return  3;
  }
}

export function searchId(input) {
  const regex = /WHERE id = "(\w+)"/;
  const matches = input.match(regex);
  if (!matches) {
    return '';
  }
  return getUserById(matches[1]);
}


export const userInfo = (input) => {
  input = input.replace("insert into file", "").trim();
  const expectedOrder = ["name", "gender", "kilos", "meter"];
  const keys = input.match(/\((.*?)\)/)[1].split(", ").map(key => key.trim());
  const values = input.match(/values \((.*?)\)/)[1];
  const result = values.split(", ").map(value => value.replace(/^["']|["']$/g, "").trim());
  const orderedResult = expectedOrder.map(expectedKey => {
    const index = keys.indexOf(expectedKey);
    return index !== -1 ? result[index] : null;
  });
  const user = [asignarId(), ...orderedResult];
  saveUser(user);
};


export function getIdToDelete(input) {
  const regex = /where id = "(\w+)"/;
  const matches = input.match(regex);
  if (!matches) {
    return '';
  }
  deleteLine( matches[1]);
}

