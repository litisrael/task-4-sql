import { addEmptyChars } from "./utilytis.js";
import { readFileSync, writeFile, appendFile, statSync } from "node:fs";
import fs from "fs";
//prubea
const USERS_PATH = "./users.txt";
const USER_MAP_PATH = "./usersMap.txt";
const LINE_SIZE = 60;
const getUsersFileSize = () => {
  const fileInfo = statSync(USERS_PATH, (error) => {
    if (error) console.error(error);
  });
  return fileInfo.size;
};

const getUsersLineCount = () => {
  const size = getUsersFileSize();
  return Math.floor(size / LINE_SIZE);
};

export const getUserMap = async () => {
  const data =
    readFileSync(USER_MAP_PATH, "utf8", (err) => {
      if (err) throw err;
    }) || "{}";

  return await JSON.parse(data);
};

export const saveUserMap = (data) =>
  writeFile(USER_MAP_PATH, JSON.stringify(data), (err) => {
    if (err) throw err;
  });

const addUserToMap = async (userId, line) => {
  const oldMap = await getUserMap();
  saveUserMap({ ...oldMap, [userId]: line });
};
function getLineByLinea(linea) {
  let data = fs.readFileSync("users.txt", "utf8");
  const start = (linea - 1) * 60;
  const end = start - 1 + 60;
  console.log("linea", linea - 1);
  console.log("start", start);
  console.log("end", end);
  const stream = fs.createReadStream("users.txt", { start, end });
  stream.on("data", (chunk) => {
    console.log(chunk.toString());
  });
}

const usersMap = await getUserMap();
console.log(usersMap);

const getValueByKey = (key) =>
  usersMap.hasOwnProperty(key) ? usersMap[key] : false;

export const getUserById = async (id) =>
  await getValueByKey(id)
    ? getLineByLinea(getValueByKey(id))
    : console.log(`the ${id} does not exist`);

//console.log(getValueByKey('um1u5skru'))

export const saveUser = (user) => {
  const data = addEmptyChars(JSON.stringify(user), LINE_SIZE - 1) + "\n";

  appendFile(USERS_PATH, data, (err) => {
    if (err) {
      console.log(err);
      exit(1);
    } else {
      addUserToMap(user[0], getUsersLineCount());
    }
  });
};
//console.log(getUserById('um1u5skru'))

export const deleteLine = (id) => {
  const line = +getValueByKey(id);
  const offset = (line - 1) * LINE_SIZE + 1;
  const buffer = Buffer.from("-".repeat(LINE_SIZE));
  const stream = fs.createWriteStream("users.txt", {
    flags: "r+",
    start: offset,
  });
  stream.write(buffer);
  stream.end();

  stream.on("finish", () => {
    console.log(`Line ${line} was deleted`);
  });
};

//deleteLine("um1u5skru");
