export function uniqueKeyGenerator() {
   let counter = -1;
   function generateKey(keyName) {
      counter += 1;
      return keyName + String(counter);
   }
   return generateKey;
}