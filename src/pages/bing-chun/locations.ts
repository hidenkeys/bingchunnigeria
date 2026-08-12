export type BingChunLocation = {
    id: string;
    name: string;
    city: "Lagos";
    area: string;
    address: string;
    phone: {
        display: string;
        href: string;
        schema: string;
    } | null;
    openingHours: {
        display: string;
        schema: string | null;
    } | null;
    latitude: number;
    longitude: number;
    image: null;
    mapUrl: string;
    status: "verified";
    postalAddress: {
        streetAddress: string;
        postalCode: string;
    };
};

export const locations: BingChunLocation[] = [
    {
        id: "jara-mall-ikeja",
        name: "Bingchun Jara Mall",
        city: "Lagos",
        area: "Ikeja",
        address: "Jara Mall, 22 Simbiat Abiola Way, Ikeja, Lagos 101233",
        phone: {
            display: "0701 087 1665",
            href: "tel:+2347010871665",
            schema: "+2347010871665",
        },
        openingHours: {
            display: "Daily · 10:30am–8:00pm",
            schema: "Mo-Su 10:30-20:00",
        },
        latitude: 6.592294,
        longitude: 3.3386004,
        image: null,
        mapUrl: "https://www.google.com/maps/dir/?api=1&destination=6.592294%2C3.3386004",
        status: "verified",
        postalAddress: {
            streetAddress: "Jara Mall, 22 Simbiat Abiola Way",
            postalCode: "101233",
        },
    },
    {
        id: "purple-mall-maryland",
        name: "Bing Chun Maryland",
        city: "Lagos",
        area: "Maryland",
        address: "Purple Mall, 350 Ikorodu Road, Maryland, Lagos 100211",
        phone: null,
        openingHours: {
            display: "Published opening · 9:00am",
            schema: null,
        },
        latitude: 6.571211,
        longitude: 3.3663151,
        image: null,
        mapUrl: "https://www.google.com/maps/dir/?api=1&destination=6.571211%2C3.3663151",
        status: "verified",
        postalAddress: {
            streetAddress: "Purple Mall, 350 Ikorodu Road",
            postalCode: "100211",
        },
    },
    {
        id: "bode-thomas-surulere",
        name: "Bing Chun Surulere",
        city: "Lagos",
        area: "Surulere",
        address: "75A Bode Thomas Street, Surulere, Lagos 101241",
        phone: {
            display: "0901 758 2027",
            href: "tel:+2349017582027",
            schema: "+2349017582027",
        },
        openingHours: {
            display: "Published opening · 9:00am",
            schema: null,
        },
        latitude: 6.4901147,
        longitude: 3.3559498,
        image: null,
        mapUrl: "https://www.google.com/maps/dir/?api=1&destination=6.4901147%2C3.3559498",
        status: "verified",
        postalAddress: {
            streetAddress: "75A Bode Thomas Street",
            postalCode: "101241",
        },
    },
    {
        id: "festac-22-road",
        name: "Bing Chun Festac",
        city: "Lagos",
        area: "Festac",
        address: "22 Road, beside Groove Mall, Festac Town, Lagos 102102",
        phone: {
            display: "0814 769 2951",
            href: "tel:+2348147692951",
            schema: "+2348147692951",
        },
        openingHours: {
            display: "Published opening · 9:00am",
            schema: null,
        },
        latitude: 6.4696356,
        longitude: 3.2821729,
        image: null,
        mapUrl: "https://www.google.com/maps/dir/?api=1&destination=6.4696356%2C3.2821729",
        status: "verified",
        postalAddress: {
            streetAddress: "22 Road, beside Groove Mall, Festac Town",
            postalCode: "102102",
        },
    },
    {
        id: "bonny-camp-victoria-island",
        name: "Bing Chun Victoria Island",
        city: "Lagos",
        area: "Victoria Island",
        address: "CCP4+CCQ, Bonny Camp Street, Victoria Island, Lagos 106104",
        phone: null,
        openingHours: null,
        latitude: 6.4360783,
        longitude: 3.4061192,
        image: null,
        mapUrl: "https://www.google.com/maps/dir/?api=1&destination=6.4360783%2C3.4061192",
        status: "verified",
        postalAddress: {
            streetAddress: "CCP4+CCQ, Bonny Camp Street",
            postalCode: "106104",
        },
    },
    {
        id: "curate-oniru",
        name: "Bing Chun CURATE",
        city: "Lagos",
        area: "Oniru",
        address: "CURATE, Water Corporation Drive, Eti-Osa, Lagos 106104",
        phone: {
            display: "0708 184 5959",
            href: "tel:+2347081845959",
            schema: "+2347081845959",
        },
        openingHours: {
            display: "Published opening · 9:00am",
            schema: null,
        },
        latitude: 6.4230016,
        longitude: 3.4453773,
        image: null,
        mapUrl: "https://www.google.com/maps/dir/?api=1&destination=6.4230016%2C3.4453773",
        status: "verified",
        postalAddress: {
            streetAddress: "CURATE, Water Corporation Drive",
            postalCode: "106104",
        },
    },
    {
        id: "olive-mall-lekki",
        name: "Bing Chun Lekki",
        city: "Lagos",
        area: "Lekki",
        address: "Olive Mall, 7B Emma Abimbola Cole, Lekki, Lagos 105102",
        phone: {
            display: "0704 700 5058",
            href: "tel:+2347047005058",
            schema: "+2347047005058",
        },
        openingHours: {
            display: "Daily · 9:00am–9:00pm",
            schema: "Mo-Su 09:00-21:00",
        },
        latitude: 6.4425329,
        longitude: 3.4769091,
        image: null,
        mapUrl: "https://www.google.com/maps/dir/?api=1&destination=6.4425329%2C3.4769091",
        status: "verified",
        postalAddress: {
            streetAddress: "Olive Mall, 7B Emma Abimbola Cole",
            postalCode: "105102",
        },
    },
];

export const locationAreas = ["All", ...locations.map(location => location.area)] as const;
