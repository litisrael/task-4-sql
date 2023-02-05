//prubea si sub
export const asignarId = () => Math.random().toString(36).substr(2, 9);
//export const addZeros = number => parseInt(number.toString() + '00');
// el user tiene 99 letras y el map tiene 33 letras

export const addEmptyChars = (str, addSpace) => {
  const countLong = addSpace - str.length;
  const completeSpace = (num) => " ".repeat(num);
  return str + completeSpace(countLong);
};
