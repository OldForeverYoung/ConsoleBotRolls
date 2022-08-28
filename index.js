// Import stylesheets
import './style.css';
// типо консоль
const consoleInput = document.getElementById('console');
const chat = document.getElementById('chat');
const SendButton = document.getElementById('send');
const someMassages = {
  massage: '',
  target: [], // эт на потом
  parseMassage: '',
};
SendButton.addEventListener('click', () => {
  // console.log(consoleInput);
  someMassages.massage = consoleInput.value;
  sendMessage(consoleInput.value);

  bot(someMassages.massage); // типо бот который ловит инфу
});
//принимает месседж для отправки в чат
/**
 * @param {string} someString
 */
function sendMessage(someString) {
  chat.value = chat.value + '\n' + someString;
  consoleInput.value = '';
}
// контрольная точка для проверки "чё там в данных?"
document.getElementById('info').addEventListener('click', () => {
  console.log(someMassages);
});

// типо бот на который будет чёт приходить
/**
 * @param {string} massage входящий месседж
 */
function bot(massage) {
  let massivOut = /\s*!\s*([1-9]\d*)\s*[dD]\s*([1-9]\d*)\s*$/.exec(massage);
  if (massivOut) {
    if (massivOut[1] * 1 < 21 && massivOut[2] * 1 < 101) {
      sendMessage(rollDice(massivOut[1] * 1, massivOut[2] * 1));
    } else {
    }
  } else {
    massivOut =
      /\s*!\s*([1-9]\d*)\s*[dD]\s*([1-9]\d*)\s*(\+|\-)\s*([1-9]\d*)\s*$/.exec(
        massage
      );
    if (massivOut) {
      if (massivOut[1] * 1 < 21 && massivOut[2] * 1 < 101) {
        if (massivOut[3] === '+') {
          sendMessage(
            rollDice(massivOut[1] * 1, massivOut[2] * 1, massivOut[4] * 1)
          );
        }
        if (massivOut[3] === '-')
          sendMessage(
            rollDice(massivOut[1] * 1, massivOut[2] * 1, massivOut[4] * -1)
          );
      } else {
      }
    }
  }
}
/**
 * @param {number} roll количество бросков
 * @param {number} dice грани
 */
function rollDice(roll, dice, mod = 0) {
  let sum = mod;
  let rolls = [];
  for (let step = 0; step < roll; step++) {
    rolls.push(Math.floor(Math.random() * dice) + 1);
    sum += rolls[step];
  }
  if (mod < 0) {
    return `rolls= ${rolls.join('+')}${mod} = ${sum}`;
  } else if (mod > 0) {
    return `rolls= ${rolls.join('+')}+${mod} = ${sum}`;
  } else {
    return `rolls= ${rolls.join('+')} = ${sum}`;
  }
}
