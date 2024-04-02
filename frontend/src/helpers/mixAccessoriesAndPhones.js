export function mixAccessoriesAndPhones(accessories, phones) {
  const mixedArray = [];
  const till =
    accessories.length >= phones.length ? accessories.length : phones.length;

  for (let i = 0; i < till - 1; i += 2) {
    if (accessories.length >= i) {
      mixedArray.push(accessories[i]);
      if (accessories.length >= i + 1) {
        mixedArray.push(accessories[i + 1]);
      }
    }

    if (phones.length >= i) {
      mixedArray.push(phones[i]);
      if (phones.length >= i + 1) {
        mixedArray.push(phones[i + 1]);
      }
    }
  }
  return mixedArray;
}
