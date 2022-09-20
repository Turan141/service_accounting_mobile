export default function logToConsole(...args) {
  args.forEach((arg, number) => {
    console.log('------------- arg #', number);
    console.log(JSON.stringify(arg, undefined, 4));
  });
}
