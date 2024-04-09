export function mixAccessoriesAndPhones(accessories, phones) {
  const mixedArray = [];
  const till =
    accessories.length >= phones.length ? accessories.length : phones.length;

  for (let i = 0; i < till; i += 2) {
    // Змінено умову циклу
    if (i < accessories.length) {
      // Виправлено перевірку доступу до accessories
      mixedArray.push(accessories[i]);
      if (i + 1 < accessories.length) {
        // Виправлено перевірку доступу до accessories
        mixedArray.push(accessories[i + 1]);
      }
    }

    if (i < phones.length) {
      // Виправлено перевірку доступу до phones
      mixedArray.push(phones[i]);
      if (i + 1 < phones.length) {
        // Виправлено перевірку доступу до phones
        mixedArray.push(phones[i + 1]);
      }
    }
  }
  return mixedArray;
}
