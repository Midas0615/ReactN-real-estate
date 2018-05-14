const IdxController = module.exports = {
    testing: function(req, res) {
        let idxes = [
            {
                address: '20950 32B AVENUE',
                area: 'Langley',
                type: 'HACR',
                totalBedrooms: 3,
                totalBaths: 3,
                mlNo: 'R2249001',
                status: 'A',
                price: '4,999,000',
                imgSrcs: [
                    'http://cdnparap130.paragonrels.com/ParagonImages/Property/p13/BCRES/262270628/0/640/480/862a5e5d2ce22879059e720223d836ce/15/46979881b6a0bd46d902600b24dc0352/262270628.JPG',
                    'http://cdnparap130.paragonrels.com/ParagonImages/Property/p13/BCRES/262270628/1/640/480/2fd28e088cd52071bbcf8a628b12ef70/15/46979881b6a0bd46d902600b24dc0352/262270628-1.JPG',
                    'http://cdnparap130.paragonrels.com/ParagonImages/Property/p13/BCRES/262270628/2/640/480/fdfcc54a4b28684f2a7980412d592223/15/46979881b6a0bd46d902600b24dc0352/262270628-2.JPG',
                    'http://cdnparap130.paragonrels.com/ParagonImages/Property/p13/BCRES/262270628/3/640/480/b074c5856274898470ca8371d37bc96d/15/46979881b6a0bd46d902600b24dc0352/262270628-3.JPG'
                ]
            },
            {
                address: '245 172 STREET',
                area: 'Surrey',
                type: 'HACR',
                totalBedrooms: 6,
                totalBaths: 3,
                mlNo: 'R2254304',
                status: 'A',
                price: '3,999,900',
                imgSrcs: [
                    'http://cdnparap130.paragonrels.com/ParagonImages/Property/p13/BCRES/262199923/1/640/480/3dd54777d5b4a2992538c24845ee01e6/15/52ad7f01212dd186f88636eabbab5a28/262199923-1.JPG',
                    'http://cdnparap130.paragonrels.com/ParagonImages/Property/p13/BCRES/262270628/1/640/480/2fd28e088cd52071bbcf8a628b12ef70/15/46979881b6a0bd46d902600b24dc0352/262199923-2.JPG',
                    'http://cdnparap130.paragonrels.com/ParagonImages/Property/p13/BCRES/262270628/1/640/480/2fd28e088cd52071bbcf8a628b12ef70/15/46979881b6a0bd46d902600b24dc0352/262199923-3.JPG',
                    'http://cdnparap130.paragonrels.com/ParagonImages/Property/p13/BCRES/262270628/1/640/480/2fd28e088cd52071bbcf8a628b12ef70/15/46979881b6a0bd46d902600b24dc0352/262199923-4.JPG'
                ]
            },
            {
                address: '14601 55A AVENUE',
                area: 'Surrey',
                type: 'HOUSE',
                totalBedrooms: 7,
                totalBaths: 8,
                mlNo: 'R2238696',
                status: 'A',
                price: '3,599,000',
                imgSrcs: [
                    'http://cdnparap130.paragonrels.com/ParagonImages/Property/p13/BCRES/262260323/0/640/480/68bfcc7d4360f121f8f1c9cce914080f/15/eb71dbda38cbd420a10c51d2c0b475b7/262260323.JPG',
                    'http://cdnparap130.paragonrels.com/ParagonImages/Property/p13/BCRES/262260323/1/640/480/82fb882d5ba835b8b7d6ed5c6b2ae82a/15/eb71dbda38cbd420a10c51d2c0b475b7/262260323-1.JPG',
                    'http://cdnparap130.paragonrels.com/ParagonImages/Property/p13/BCRES/262260323/2/640/480/e66e1018fd131e98b5ccde1956b1ac83/15/eb71dbda38cbd420a10c51d2c0b475b7/262260323-2.JPG',
                    'http://cdnparap130.paragonrels.com/ParagonImages/Property/p13/BCRES/262260323/3/640/480/cdf2886abfe05c5a47acc72fbe96be69/15/eb71dbda38cbd420a10c51d2c0b475b7/262260323-3.JPG',
                    'http://cdnparap130.paragonrels.com/ParagonImages/Property/p13/BCRES/262260323/3/640/480/cdf2886abfe05c5a47acc72fbe96be69/15/eb71dbda38cbd420a10c51d2c0b475b7/262260323-4.JPG',
                    'http://cdnparap130.paragonrels.com/ParagonImages/Property/p13/BCRES/262260323/3/640/480/cdf2886abfe05c5a47acc72fbe96be69/15/eb71dbda38cbd420a10c51d2c0b475b7/262260323-5.JPG',
                    'http://cdnparap130.paragonrels.com/ParagonImages/Property/p13/BCRES/262260323/3/640/480/cdf2886abfe05c5a47acc72fbe96be69/15/eb71dbda38cbd420a10c51d2c0b475b7/262260323-6.JPG',
                ]
            }
        ]
        return res.json(idxes);
    }
}