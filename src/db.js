export const db = [
    {
        type: 'discount',
        number: 123456,
        balance: 300,
        allowedProducts: [
            {
                id: 'plus',
                name: 'Plus',
                minPriceCents: 75,
                maxPriceCents: 185,
                purchaseUnit: 'litre',
            },
            {
                id: 'ulp',
                name: 'ULP',
                minPriceCents: 10,
                maxPriceCents: 185,
                purchaseUnit: 'litre',
            },
            {
                id: 'diesel',
                name: 'Diesel',
                minPriceCents: 75,
                maxPriceCents: 195,
                purchaseUnit: 'litre',
            },
            {
                id: 'lpg',
                name: 'LPG',
                minPriceCents: 40,
                maxPriceCents: 150,
                purchaseUnit: 'litre',
            },
            {
                id: 'premiumULP',
                name: 'Premium ULP',
                minPriceCents: 85,
                maxPriceCents: 195,
                purchaseUnit: 'litre',
            },
            {
                id: 'premium98',
                name: 'Premium 98',
                minPriceCents: 90,
                maxPriceCents: 200,
                purchaseUnit: 'litre',
            },
            {
                id: 'lubes',
                name: 'Lubes',
                minPriceCents: 0,
                maxPriceCents: 200,
                purchaseUnit: 'dollar',
            },
            {
                id: 'carwashes',
                name: 'Carwashes',
                minPriceCents: 0,
                maxPriceCents: 150,
                purchaseUnit: 'dollar',
            },
            {
                id: 'shopGST',
                name: 'Shop-GST',
                minPriceCents: 0,
                maxPriceCents: 400,
                purchaseUnit: 'dollar',
            },
            {
                id: 'shopNoGST',
                name: 'Shop-NOGST',
                minPriceCents: 0,
                maxPriceCents: 185,
                purchaseUnit: 'dollar',
            },
            {
                id: 'e85',
                name: 'E85',
                minPriceCents: 50,
                maxPriceCents: 195,
                purchaseUnit: 'litre',
            },
        ]
    },
    {
        type: 'gift',
        number: 374837,
        balance: 50,
        allowedProducts:[
        {
            id: 'plus', 
            name: 'Plus', 
            minPriceCents: 75, 
            maxPriceCents: 135, 
            purchaseUnit:  'litre', 
            discountCentsPerLitre: 10
        },
        {
            id:  'ulp',
            name:  'ULP',
            minPriceCents: 65,
            maxPriceCents: 125,
            purchaseUnit:  'litre',
            discountCentsPerLitre: 4
        },
        {
            id:  'diesel',
            name:  'Diesel',
            minPriceCents: 75,
            maxPriceCents: 195,
            purchaseUnit:  'litre',
            discountCentsPerLitre: 6
        },
        {
            id:  'lpg',
            name:  'LPG',
            minPriceCents: 40,
            maxPriceCents: 150,
            purchaseUnit:  'litre',
            discountCentsPerLitre: 8
        },
        {
            id:  'premiumULP',
            name:  'Premium ULP',
            minPriceCents: 85,
            maxPriceCents: 195,
            purchaseUnit:  'litre',
            discountCentsPerLitre: 4
        },
        {
            id:  'premium98',
            name:  'Premium 98',
            minPriceCents: 90,
            maxPriceCents: 200,
            purchaseUnit:  'litre',
            discountCentsPerLitre: 2
        },
        {
            id:  'e85',
            name:  'E85',
            minPriceCents: 50,
            maxPriceCents: 95,
            purchaseUnit:  'litre',
            discountCentsPerLitre: 4
        }
    ]
    },
    {
        type: 'discount',
        number: 103456,
        balance: 300,
        allowedProducts:[
            {
                id: 'plus', 
                name: 'Plus', 
                minPriceCents: 10, 
                maxPriceCents: 185, 
                purchaseUnit:  'litre', 
                discountCentsPerLitre: 4
            },
            {
                id:  'ulp',
                name:  'ULP',
                minPriceCents: 7,
                maxPriceCents: 185,
                purchaseUnit:  'litre',
                discountCentsPerLitre: 4
            },
            {
                id:  'diesel',
                name:  'Diesel',
                minPriceCents: 100,
                maxPriceCents: 195,
                purchaseUnit:  'litre',
                discountCentsPerLitre: 4
            },
            {
                id:  'lpg',
                name:  'LPG',
                minPriceCents: 40,
                maxPriceCents: 150,
                purchaseUnit:  'litre',
                discountCentsPerLitre: 4
            },
            {
                id:  'premiumULP',
                name:  'Premium ULP',
                minPriceCents: 85,
                maxPriceCents: 105,
                purchaseUnit:  'litre',
                discountCentsPerLitre: 4
            },
            {
                id:  'premium98',
                name:  'Premium 98',
                minPriceCents: 90,
                maxPriceCents: 100,
                purchaseUnit:  'litre',
                discountCentsPerLitre: 4
            },
            {
                id:  'e85',
                name:  'E85',
                minPriceCents: 50,
                maxPriceCents: 295,
                purchaseUnit:  'litre',
                discountCentsPerLitre: 4
            }
        ]
    },
    {
        type: 'gift',
        number: 153456,
        balance: -200,
        allowedProducts:[
            {
                id: 'plus', 
                name: 'Plus', 
                minPriceCents: 75, 
                maxPriceCents: 135, 
                purchaseUnit:  'litre', 
                discountCentsPerLitre: 10
            },
            {
                id:  'ulp',
                name:  'ULP',
                minPriceCents: 65,
                maxPriceCents: 125,
                purchaseUnit:  'litre',
                discountCentsPerLitre: 4
            },
            {
                id:  'diesel',
                name:  'Diesel',
                minPriceCents: 75,
                maxPriceCents: 195,
                purchaseUnit:  'litre',
                discountCentsPerLitre: 6
            },
            {
                id:  'lpg',
                name:  'LPG',
                minPriceCents: 40,
                maxPriceCents: 150,
                purchaseUnit:  'litre',
                discountCentsPerLitre: 8
            },
            {
                id:  'premiumULP',
                name:  'Premium ULP',
                minPriceCents: 85,
                maxPriceCents: 195,
                purchaseUnit:  'litre',
                discountCentsPerLitre: 4
            },
            {
                id:  'premium98',
                name:  'Premium 98',
                minPriceCents: 90,
                maxPriceCents: 200,
                purchaseUnit:  'litre',
                discountCentsPerLitre: 2
            },
            {
                id:  'e85',
                name:  'E85',
                minPriceCents: 50,
                maxPriceCents: 95,
                purchaseUnit:  'litre',
                discountCentsPerLitre: 4
            }
        ]
    }
];