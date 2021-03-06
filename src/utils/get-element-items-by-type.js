const uuidv4 = require("uuid/v4");

/**
 * Takes a collection and returns it back with the attached element items by type.
 *
 * @param {Array}           collection      The 11ty collection
 * @param {String}          itemType        The item type to use for the collection.
 * @param {Boolean|String}  elementTypeRef  The option to add a reference to the
 *                                            element machine name, using the element type.
 * @returns {Array}                         The filtered collection
 */
module.exports = (collection, itemType, elementTypeRef) => {
  let elementItems = [];
  const elementItemsLabel = itemType + '_items';

  if (
    typeof(collection) !== 'undefined' &&
    Array.isArray(collection) &&
    collection.length > 0
  ) {
    collection.forEach(item => {
      if (
        item.hasOwnProperty('data') &&
        item.data.hasOwnProperty('type') &&
        item.data.hasOwnProperty('machine_name') &&
        item.data.hasOwnProperty(elementItemsLabel) &&
        typeof(item.data[elementItemsLabel]) !== 'undefined' &&
        item.data[elementItemsLabel].length > 0
      ) {
        item.data[elementItemsLabel].forEach(elementItem => {
          let elementType = item.data['type'];
          let elementMachineName = item.data['machine_name'];

          if (
            elementItem.hasOwnProperty('type') &&
            elementItem.type === itemType
          ) {
            elementItem['uuid'] = uuidv4();

            if (elementTypeRef !== false) {
              elementItem[elementType] = elementMachineName;
            }

            elementItems.push({
              data: elementItem
            });
          }
        });
      }
    });
  }

  return elementItems;
};
