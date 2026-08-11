import bobaSoftServe from "@assets/images/bing-chun/boba-soft-serve.webp";
import brandLogo from "@assets/images/bing-chun/brand-logo.png";
import fruitTea from "@assets/images/bing-chun/fruit-tea.webp";
import mulberrySundae from "@assets/images/bing-chun/mulberry-sundae.webp";
import blueberryBobo from "@assets/images/bing-chun/official-blueberry-bobo.avif";
import blueberryMilkshake from "@assets/images/bing-chun/official-blueberry-milkshake.avif";
import blueberrySundae from "@assets/images/bing-chun/official-blueberry-sundae.avif";
import boboMilkTea from "@assets/images/bing-chun/official-bobo-milk-tea.avif";
import brownSugarBoba from "@assets/images/bing-chun/official-brown-sugar-boba.avif";
import brownSugarSundae from "@assets/images/bing-chun/official-brown-sugar-sundae.avif";
import chocolateBiscuitSundae from "@assets/images/bing-chun/official-chocolate-biscuit-sundae.avif";
import chocolateOreoMilkshake from "@assets/images/bing-chun/official-chocolate-oreo-milkshake.avif";
import chocolateOreoSundae from "@assets/images/bing-chun/official-chocolate-oreo-sundae.avif";
import grapeBobo from "@assets/images/bing-chun/official-grape-bobo.avif";
import lycheeJasmine from "@assets/images/bing-chun/official-lychee-jasmine.avif";
import mulberryMilkshake from "@assets/images/bing-chun/official-mulberry-milkshake.avif";
import originalMilkTea from "@assets/images/bing-chun/official-original-milk-tea.avif";
import strawberryLemon from "@assets/images/bing-chun/official-strawberry-lemon.avif";
import strawberryMilkshake from "@assets/images/bing-chun/official-strawberry-milkshake.avif";
import strawberrySundae from "@assets/images/bing-chun/official-strawberry-sundae.avif";
import strawberryTea from "@assets/images/bing-chun/strawberry-tea.webp";

export type MenuCategoryId = "fruit-tea" | "milk-tea" | "sundaes" | "smoothies" | "milkshakes" | "toppings";

export type MenuProduct = {
    name: string;
    price: number;
    description: string;
    image: string;
    imageAlt: string;
    imageFit?: "contain" | "cover";
    imageWidth?: number;
    imageHeight?: number;
    status?: "sold-out-online";
};

export type MenuCategory = {
    id: MenuCategoryId;
    label: string;
    kicker: string;
    products: MenuProduct[];
};

export const assets = {
    brandLogo,
    blueberryBobo,
    blueberryMilkshake,
    blueberrySundae,
    bobaSoftServe,
    boboMilkTea,
    brownSugarBoba,
    brownSugarSundae,
    chocolateBiscuitSundae,
    chocolateOreoMilkshake,
    chocolateOreoSundae,
    fruitTea,
    grapeBobo,
    lycheeJasmine,
    mulberrySundae,
    mulberryMilkshake,
    originalMilkTea,
    strawberryLemon,
    strawberryMilkshake,
    strawberrySundae,
    strawberryTea,
};

export const commerce = {
    orderUrl: "https://chowdeck.com/store/ikeja/restaurants/bingchun-ikeja1wle1l",
    whatsappUrl: null,
    rewardsUrl: null,
} as const;

export const navigation = [
    { label: "Menu", href: "#menu" },
    { label: "Our flavour", href: "#story" },
    { label: "Offers", href: "#offers" },
    { label: "Visit", href: "#visit" },
] as const;

export const menuCategories: MenuCategory[] = [
    {
        id: "fruit-tea",
        label: "Fruit tea",
        kicker: "Bright, juicy and built for Lagos heat.",
        products: [
            {
                name: "Strawberry Lemon Tea",
                price: 3600,
                description: "A chilled strawberry and lemon pairing with a bright finish.",
                image: strawberryLemon,
                imageAlt: "Bing Chun strawberry and lemon fruit tea",
            },
            {
                name: "Grapes Crystal Tea",
                price: 4200,
                description: "A cool grape-forward tea made for slow, icy sips.",
                image: grapeBobo,
                imageAlt: "Bing Chun chilled fruit tea",
            },
            {
                name: "Mulberry Popping Pearls",
                price: 3600,
                description: "Deep berry flavour with playful popping pearls.",
                image: mulberryMilkshake,
                imageAlt: "Bing Chun fruit tea with fresh fruit styling",
            },
            {
                name: "Blueberry Fruit Tea",
                price: 3600,
                description: "A refreshing blueberry-led fruit tea served cold.",
                image: blueberryBobo,
                imageAlt: "Bing Chun fruit tea in a branded cup",
            },
            {
                name: "Lemon Green Tea",
                price: 3000,
                description: "Lemon and green tea in a clean, citrusy pour.",
                image: strawberryLemon,
                imageAlt: "Bing Chun citrus fruit tea",
            },
            {
                name: "Strawberry Mulberry Tea",
                price: 4200,
                description: "Two berry flavours in one vivid, chilled cup.",
                image: strawberryLemon,
                imageAlt: "Bing Chun strawberry fruit tea",
            },
            {
                name: "Lychee Jasmine Tea",
                price: 3000,
                description: "Floral jasmine tea lifted with sweet lychee flavour.",
                image: lycheeJasmine,
                imageAlt: "Bing Chun lychee drink from the Nigerian menu",
            },
            {
                name: "Jasmine Honey Tea",
                price: 2400,
                description: "A light jasmine tea with mellow honey sweetness.",
                image: lycheeJasmine,
                imageAlt: "Bing Chun jasmine drink from the Nigerian menu",
            },
        ],
    },
    {
        id: "milk-tea",
        label: "Milk tea",
        kicker: "Creamy comfort, tea depth and plenty of personality.",
        products: [
            {
                name: "Original Milk Tea",
                price: 3600,
                description: "The straight-up classic: smooth milk tea served chilled.",
                image: originalMilkTea,
                imageAlt: "Bing Chun milk tea in a branded cup",
            },
            {
                name: "Lychee Jasmine Milk Tea",
                price: 4200,
                description: "Floral jasmine milk tea with a juicy lychee lift.",
                image: lycheeJasmine,
                imageAlt: "Bing Chun Lychee Jasmine Milk Tea from the Nigerian menu",
            },
            {
                name: "Strawberry Coconut Jasmine Milk Tea",
                price: 4200,
                description: "Strawberry, coconut and jasmine meet in one creamy pour.",
                image: strawberryMilkshake,
                imageAlt: "Bing Chun fruit jasmine milk tea",
            },
            {
                name: "Coconut Milk Tea",
                price: 4200,
                description: "A mellow, coconut-led take on chilled milk tea.",
                image: boboMilkTea,
                imageAlt: "Bing Chun chilled milk tea",
            },
            {
                name: "Brown Sugar Boba Milk Tea",
                price: 4200,
                description: "Brown sugar richness, milk tea and chewy boba.",
                image: brownSugarBoba,
                imageAlt: "Bing Chun chocolate-toned boba milk tea",
                status: "sold-out-online",
            },
        ],
    },
    {
        id: "sundaes",
        label: "Sundaes",
        kicker: "Soft-serve dressed up with fruit, boba, biscuits and chocolate.",
        products: [
            {
                name: "Chocolate Boba Sundae",
                price: 4200,
                description: "Vanilla soft-serve with chocolate swirls and glossy boba.",
                image: bobaSoftServe,
                imageAlt: "Bing Chun Chocolate Boba Sundae",
                imageFit: "cover",
                imageWidth: 1000,
                imageHeight: 1000,
            },
            {
                name: "Chocolate Oreo Sundae",
                price: 4800,
                description: "Soft-serve piled with cookie crunch and chocolate.",
                image: chocolateOreoSundae,
                imageAlt: "Bing Chun Chocolate Oreo Sundae",
            },
            {
                name: "Brown Sugar Boba Sundae",
                price: 4200,
                description: "Creamy soft-serve with brown sugar character and boba.",
                image: brownSugarSundae,
                imageAlt: "Bing Chun soft-serve sundae with boba",
            },
            {
                name: "Strawberry Sundae",
                price: 3600,
                description: "Vanilla soft-serve finished with strawberry flavour.",
                image: strawberrySundae,
                imageAlt: "Bing Chun soft-serve sundae",
            },
            {
                name: "Mulberry Sundae",
                price: 3600,
                description: "A berry-bright sundae with a vivid mulberry finish.",
                image: mulberrySundae,
                imageAlt: "Bing Chun Mulberry Sundae",
                imageFit: "cover",
                imageWidth: 1200,
                imageHeight: 877,
            },
            {
                name: "Chocolate Biscuit Sundae",
                price: 4200,
                description: "Chocolate, biscuit crunch and cold vanilla soft-serve.",
                image: chocolateBiscuitSundae,
                imageAlt: "Bing Chun chocolate biscuit sundae",
            },
        ],
    },
    {
        id: "smoothies",
        label: "Smoothies",
        kicker: "Blended, cold and ready when the day runs hot.",
        products: [
            {
                name: "Grape Smoothie",
                price: 4200,
                description: "An icy grape blend with a fruit-forward finish.",
                image: grapeBobo,
                imageAlt: "Bing Chun cold fruit drink",
            },
            {
                name: "Blueberry Smoothie",
                price: 3600,
                description: "A bright blueberry smoothie blended cold.",
                image: blueberryMilkshake,
                imageAlt: "Bing Chun blue berry cold dessert",
            },
            {
                name: "Strawberry Smoothie",
                price: 3600,
                description: "A chilled strawberry blend for an easy cool-down.",
                image: strawberryMilkshake,
                imageAlt: "Bing Chun strawberry drink",
            },
            {
                name: "Cocoa Smoothie",
                price: 3600,
                description: "A chocolatey cold blend with a smooth cocoa finish.",
                image: chocolateOreoMilkshake,
                imageAlt: "Bing Chun cocoa drink",
                status: "sold-out-online",
            },
        ],
    },
    {
        id: "milkshakes",
        label: "Milkshakes",
        kicker: "Creamy, playful and unapologetically dessert-like.",
        products: [
            {
                name: "Chocolate Oreo Milkshake",
                price: 4200,
                description: "A creamy chocolate shake with cookie crunch.",
                image: chocolateOreoMilkshake,
                imageAlt: "Bing Chun Oreo ice cream dessert",
            },
            {
                name: "Chocolate Boba Milkshake",
                price: 4200,
                description: "Chocolate milkshake meets a generous boba topping.",
                image: boboMilkTea,
                imageAlt: "Bing Chun chocolate boba drink",
                status: "sold-out-online",
            },
        ],
    },
    {
        id: "toppings",
        label: "Toppings",
        kicker: "Add an extra layer of chew, bounce or coconut.",
        products: [
            {
                name: "Jelly",
                price: 550,
                description: "A playful extra for your favourite drink.",
                image: blueberrySundae,
                imageAlt: "Bing Chun fruit tea",
            },
            {
                name: "Coconut Jelly",
                price: 550,
                description: "A coconut-flavoured chew for milk tea or fruit tea.",
                image: lycheeJasmine,
                imageAlt: "Bing Chun milk tea",
            },
            {
                name: "Boba",
                price: 550,
                description: "The classic chewy finish for tea and desserts.",
                image: brownSugarBoba,
                imageAlt: "Bing Chun boba topping",
                status: "sold-out-online",
            },
        ],
    },
];

export const promotions: { title: string; description: string; href: string }[] = [];
export const socialLinks: { label: string; href: string }[] = [];
