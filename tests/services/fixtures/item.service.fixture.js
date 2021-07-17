
const findAndCountAllResolvedValue = {
    count: 1,
    rows: [
      {
        dataValues: {
            id: 1,
            name: 'Doritos',
            category: 'chips',
            stock: '2000000000',
            price: 2,
            sku: 12345678
        },
        _previousDataValues: {},
        _changed: {},
        _options: {},
        isNewRecord: {}
      },
    ]
}
  
const listItemsResolvedValue = {
    count: 1,
    rows:[
        {
            id: 1,
            name: 'Doritos',
            category: 'chips',
            stock: '2000000000',
            price: 2,
            sku: 12345678
        }
    ]
}

const findAndCountAllEmptyMatch = {
    count: 0,
    rows: []
}

module.exports = {
    findAndCountAllResolvedValue,
    listItemsResolvedValue,
    findAndCountAllEmptyMatch
}