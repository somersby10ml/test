function test() {
  console.log('test');
}
let promise = new Promise(
  function(resolve, reject){
    resolve()
  }
);
