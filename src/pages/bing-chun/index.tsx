import type { CSSProperties, ReactNode } from "react";

import {
    ArrowRight,
    ArrowUpRight,
    Check,
    Clock,
    ExternalLink,
    MapPin,
    Menu,
    Phone,
    ShoppingBag,
    Snowflake,
    Sparkles,
    X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { MenuCategoryId, MenuProduct } from "./data";
import type { BingChunLocation } from "./locations";

import {
    assets,
    commerce,
    menuCategories,
    navigation,
    promotions,
} from "./data";
import { locationAreas, locations } from "./locations";
import "./bing-chun.css";

const formatNaira = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
});

const mapBounds = {
    north: 6.61,
    east: 3.49,
    south: 6.41,
    west: 3.27,
};

function getMapMarkerStyle(location: BingChunLocation) {
    const x = ((location.longitude - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 100;
    const y = (1 - ((location.latitude - mapBounds.south) / (mapBounds.north - mapBounds.south))) * 100;

    return {
        "--bc-marker-x": `${Math.min(94, Math.max(6, x))}%`,
        "--bc-marker-y": `${Math.min(94, Math.max(6, y))}%`,
    } as CSSProperties;
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element)
            return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting)
                    return;

                setIsVisible(true);
                observer.unobserve(entry.target);
            },
            { threshold: 0.12, rootMargin: "0px 0px -8%" },
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`bc-reveal ${isVisible ? "is-visible" : ""} ${className}`.trim()}
            style={{ "--bc-delay": `${delay}ms` } as CSSProperties}
        >
            {children}
        </div>
    );
}

function BingChunPage() {
    const [activeCategory, setActiveCategory] = useState<MenuCategoryId>("fruit-tea");
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<{ product: MenuProduct; categoryLabel: string } | null>(null);
    const [headerCompact, setHeaderCompact] = useState(false);
    const [locationFilter, setLocationFilter] = useState("All");
    const [selectedLocationId, setSelectedLocationId] = useState(locations[0].id);
    const productDialogCloseRef = useRef<HTMLButtonElement>(null);
    const currentCategory = menuCategories.find(category => category.id === activeCategory) ?? menuCategories[0];
    const filteredLocations = locationFilter === "All" ? locations : locations.filter(location => location.area === locationFilter);
    const selectedLocation = locations.find(location => location.id === selectedLocationId) ?? locations[0];

    useEffect(() => {
        const onScroll = () => setHeaderCompact(window.scrollY > 24);
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setMenuOpen(false);
                setSelectedProduct(null);
            }
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, []);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = menuOpen || selectedProduct ? "hidden" : previousOverflow;

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [menuOpen, selectedProduct]);

    useEffect(() => {
        if (!selectedProduct)
            return;

        const focusTimer = window.setTimeout(() => productDialogCloseRef.current?.focus(), 40);
        return () => window.clearTimeout(focusTimer);
    }, [selectedProduct]);

    useEffect(() => {
        const previousTitle = document.title;
        const metaDefinitions = [
            { selector: "meta[name='description']", attribute: "name", key: "description", content: "Discover Bing Chun Nigeria: fruit tea, milk tea, boba, smoothies and soft-serve at seven verified locations across Lagos." },
            { selector: "meta[property='og:title']", attribute: "property", key: "og:title", content: "Bing Chun Nigeria | Ice Cream & Tea in Lagos" },
            { selector: "meta[property='og:description']", attribute: "property", key: "og:description", content: "Cold fruit teas, creamy milk teas and playful soft-serve across Lagos." },
        ];
        const snapshots = metaDefinitions.map((definition) => {
            const existing = document.head.querySelector<HTMLMetaElement>(definition.selector);
            const element = existing ?? document.createElement("meta");
            const previousContent = element.content;

            if (!existing) {
                element.setAttribute(definition.attribute, definition.key);
                document.head.appendChild(element);
            }

            element.content = definition.content;
            return { element, existed: Boolean(existing), previousContent };
        });

        document.title = "Bing Chun Nigeria | Ice Cream & Tea in Lagos";

        const existingFavicon = document.head.querySelector<HTMLLinkElement>("link[rel~='icon']");
        const favicon = existingFavicon ?? document.createElement("link");
        const previousFaviconHref = favicon.href;
        const previousFaviconType = favicon.type;

        if (!existingFavicon) {
            favicon.rel = "icon";
            document.head.appendChild(favicon);
        }

        favicon.type = "image/png";
        favicon.href = assets.brandLogo;

        const branches = locations.map(location => ({
            "@type": "Restaurant",
            "@id": `${window.location.origin}#${location.id}`,
            "name": location.name,
            "servesCuisine": ["Bubble tea", "Fruit tea", "Milk tea", "Ice cream"],
            "address": {
                "@type": "PostalAddress",
                "streetAddress": location.postalAddress.streetAddress,
                "addressLocality": location.area,
                "addressRegion": "Lagos",
                "postalCode": location.postalAddress.postalCode,
                "addressCountry": "NG",
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": location.latitude,
                "longitude": location.longitude,
            },
            ...(location.phone ? { telephone: location.phone.schema } : {}),
            ...(location.openingHours?.schema ? { openingHours: location.openingHours.schema } : {}),
            ...(location.orderUrl ? { menu: location.orderUrl } : {}),
        }));

        const structuredData = document.createElement("script");
        structuredData.id = "bing-chun-structured-data";
        structuredData.type = "application/ld+json";
        structuredData.text = JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "Organization",
                    "@id": `${window.location.origin}#organization`,
                    "name": "Bing Chun Nigeria",
                    "url": window.location.origin,
                    "logo": new URL(assets.brandLogo, window.location.origin).href,
                    "image": new URL(assets.lycheeJasmine, window.location.origin).href,
                },
                ...branches,
            ],
        });
        document.head.appendChild(structuredData);

        return () => {
            document.title = previousTitle;
            structuredData.remove();
            if (existingFavicon) {
                favicon.href = previousFaviconHref;
                favicon.type = previousFaviconType;
            }
            else {
                favicon.remove();
            }
            snapshots.forEach(({ element, existed, previousContent }) => {
                if (existed)
                    element.content = previousContent;
                else
                    element.remove();
            });
        };
    }, []);

    const showCategory = (category: MenuCategoryId) => {
        setActiveCategory(category);
        document.querySelector("#menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const filterLocations = (area: string) => {
        setLocationFilter(area);
        const nextLocation = area === "All" ? locations[0] : locations.find(location => location.area === area);

        if (nextLocation)
            setSelectedLocationId(nextLocation.id);
    };

    return (
        <div className="bc-page">
            <a className="bc-skip-link" href="#main-content">Skip to content</a>

            <header className={`bc-header ${headerCompact ? "is-compact" : ""} ${menuOpen ? "is-menu-open" : ""}`}>
                <div className="bc-shell bc-header__inner">
                    <a className="bc-brand" href="#top" aria-label="Bing Chun Nigeria home">
                        <img src={assets.brandLogo} alt="Bing Chun" width="467" height="600" />
                        <span className="bc-brand__market">Nigeria</span>
                    </a>

                    <nav className="bc-nav bc-nav--desktop" aria-label="Primary navigation">
                        {navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
                    </nav>

                    <a className="bc-button bc-button--small bc-button--ink bc-header__order" href={commerce.orderUrl} target="_blank" rel="noreferrer">
                        <ShoppingBag size={16} aria-hidden="true" />
                        Order now
                    </a>

                    <button
                        className="bc-icon-button bc-menu-button"
                        type="button"
                        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
                        aria-expanded={menuOpen}
                        aria-controls="bc-mobile-navigation"
                        onClick={() => setMenuOpen(open => !open)}
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                <div id="bc-mobile-navigation" className={`bc-mobile-nav ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
                    <div className="bc-mobile-nav__intro">
                        <span>Bing Chun · Nigeria</span>
                        <small>Ice cream & tea across Lagos</small>
                    </div>
                    <nav aria-label="Mobile navigation">
                        {navigation.map((item, index) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                style={{ "--bc-menu-index": index } as CSSProperties}
                            >
                                <span>{item.label}</span>
                                <ArrowRight size={18} aria-hidden="true" />
                            </a>
                        ))}
                    </nav>
                    <a className="bc-mobile-nav__order" href={commerce.orderUrl} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>
                        <span>
                            <ShoppingBag size={18} aria-hidden="true" />
                            Order on Chowdeck
                        </span>
                        <ArrowUpRight size={19} aria-hidden="true" />
                    </a>
                    <p className="bc-mobile-nav__footnote">Seven verified locations across Lagos</p>
                </div>
            </header>

            <main id="main-content">
                <section className="bc-hero" id="top">
                    <div className="bc-shell bc-hero__grid">
                        <div className="bc-hero__copy">
                            <p className="bc-eyebrow bc-hero__eyebrow">
                                <Snowflake size={15} />
                                {" "}
                                Ice cream & tea · Lagos
                            </p>
                            <h1>
                                Bubble tea.
                                <br />
                                Soft-serve.
                                <br />
                                <em>Bing Chun.</em>
                            </h1>
                            <p className="bc-hero__lede">Bright fruit teas, creamy milk teas and cold desserts, now serving across Lagos.</p>
                            <div className="bc-hero__actions">
                                <button className="bc-button bc-button--ink" type="button" onClick={() => showCategory("fruit-tea")}>
                                    Explore the menu
                                    {" "}
                                    <ArrowRight size={18} />
                                </button>
                                <a className="bc-text-link" href={commerce.orderUrl} target="_blank" rel="noreferrer">
                                    Order on Chowdeck
                                    {" "}
                                    <ArrowUpRight size={17} />
                                </a>
                            </div>
                            <div className="bc-hero__proof" aria-label="Bing Chun Nigeria highlights">
                                <span>
                                    <strong>From ₦2,400</strong>
                                    {" "}
                                    for drinks
                                </span>
                                <span>
                                    <strong>7 locations</strong>
                                    {" "}
                                    across Lagos
                                </span>
                            </div>
                        </div>

                        <div className="bc-hero__visual" aria-label="Bing Chun drinks and soft-serve">
                            <div className="bc-hero__blue-block" aria-hidden="true">
                                <span>ICE</span>
                                <span>PURE</span>
                            </div>
                            <figure className="bc-hero__image bc-hero__image--main">
                                <img src={assets.lycheeJasmine} alt="Bing Chun Lychee Jasmine Milk Tea" width="700" height="700" sizes="(max-width: 620px) 58vw, 340px" fetchPriority="high" />
                                <figcaption>
                                    <span>Local menu</span>
                                    {" "}
                                    Lychee Jasmine Milk Tea · ₦4,200
                                </figcaption>
                            </figure>
                            <figure className="bc-hero__image bc-hero__image--secondary">
                                <img src={assets.chocolateOreoSundae} alt="Bing Chun chocolate Oreo soft-serve sundae" width="700" height="700" sizes="(max-width: 620px) 38vw, 230px" />
                            </figure>
                            <div className="bc-hero__stamp" aria-hidden="true">
                                <strong>2012</strong>
                                <span>
                                    since
                                    <br />
                                    ice & tea
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="bc-ticker" aria-label="Bing Chun menu highlights">
                    <div className="bc-ticker__track">
                        {[0, 1].map(group => (
                            <div className="bc-ticker__group" key={group} aria-hidden={group === 1}>
                                <span>FRUIT TEA</span>
                                <i>✦</i>
                                <span>MILK TEA</span>
                                <i>✦</i>
                                <span>SOFT-SERVE</span>
                                <i>✦</i>
                                <span>BOBA</span>
                                <i>✦</i>
                                <span>SMOOTHIES</span>
                                <i>✦</i>
                            </div>
                        ))}
                    </div>
                </div>

                <section className="bc-menu-section" id="menu">
                    <div className="bc-shell">
                        <Reveal className="bc-section-heading">
                            <div>
                                <p className="bc-eyebrow">
                                    <Sparkles size={15} />
                                    {" "}
                                    Jara Mall menu
                                </p>
                                <h2>Pick your kind of cold.</h2>
                            </div>
                            <p>Current listed prices for Bingchun Jara Mall. Switch categories and find the cup that matches the moment.</p>
                        </Reveal>

                        <div className="bc-category-tabs" role="tablist" aria-label="Menu categories">
                            {menuCategories.map(category => (
                                <button
                                    key={category.id}
                                    id={`tab-${category.id}`}
                                    type="button"
                                    role="tab"
                                    aria-selected={activeCategory === category.id}
                                    aria-controls="bc-menu-panel"
                                    className={activeCategory === category.id ? "is-active" : ""}
                                    onClick={() => setActiveCategory(category.id)}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>

                        <div
                            className="bc-menu-panel"
                            id="bc-menu-panel"
                            role="tabpanel"
                            aria-labelledby={`tab-${activeCategory}`}
                            key={activeCategory}
                        >
                            <div className="bc-menu-panel__intro">
                                <span>{String(menuCategories.indexOf(currentCategory) + 1).padStart(2, "0")}</span>
                                <p>{currentCategory.kicker}</p>
                            </div>
                            <div className={`bc-product-grid bc-product-grid--count-${currentCategory.products.length}`}>
                                {currentCategory.products.map((product, index) => (
                                    <article
                                        className={`bc-product-card ${index === 0 ? "bc-product-card--feature" : ""}`.trim()}
                                        key={product.name}
                                        style={{ "--bc-product-index": index } as CSSProperties}
                                    >
                                        <button
                                            className="bc-product-card__trigger"
                                            type="button"
                                            aria-label={`View ${product.name} details`}
                                            aria-haspopup="dialog"
                                            onClick={() => setSelectedProduct({ product, categoryLabel: currentCategory.label })}
                                        >
                                            <div className="bc-product-card__image">
                                                <span className="bc-product-card__number">{String(index + 1).padStart(2, "0")}</span>
                                                <span className="bc-product-card__spark" aria-hidden="true">✦</span>
                                                <img
                                                    className={`is-${product.imageFit ?? "contain"}`}
                                                    src={product.image}
                                                    alt={product.imageAlt}
                                                    width={product.imageWidth ?? 700}
                                                    height={product.imageHeight ?? 700}
                                                    sizes={index === 0 ? "(max-width: 620px) 90vw, 500px" : "(max-width: 620px) 44vw, 300px"}
                                                    loading="lazy"
                                                />
                                                {product.status === "sold-out-online" && <span className="bc-product-card__status">Sold out online</span>}
                                            </div>
                                            <div className="bc-product-card__body">
                                                <span className="bc-product-card__category">{currentCategory.label}</span>
                                                <div>
                                                    <h3>{product.name}</h3>
                                                    <p>{product.description}</p>
                                                </div>
                                                <div className="bc-product-card__footer">
                                                    <strong>{formatNaira.format(product.price)}</strong>
                                                    <span className="bc-product-card__open" aria-hidden="true">
                                                        <ArrowUpRight size={18} />
                                                    </span>
                                                </div>
                                            </div>
                                        </button>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <p className="bc-menu-note">Menu and prices checked against the Jara Mall Chowdeck listing in August 2026. Availability and prices can change.</p>
                    </div>
                </section>

                <section className="bc-signature" id="story">
                    <div className="bc-shell bc-signature__grid">
                        <Reveal className="bc-signature__media">
                            <img src={assets.lycheeJasmine} alt="Bing Chun Lychee Jasmine Milk Tea" width="700" height="700" sizes="(max-width: 860px) 90vw, 520px" loading="lazy" />
                            <div className="bc-signature__label">
                                <span>JASMINE · LYCHEE · MILK</span>
                                <strong>₦4,200</strong>
                            </div>
                        </Reveal>
                        <Reveal className="bc-signature__copy" delay={100}>
                            <p className="bc-eyebrow">The local signature</p>
                            <h2>
                                Floral tea,
                                <br />
                                fruit turned up.
                            </h2>
                            <p className="bc-signature__lede">Lychee Jasmine Milk Tea carries the brand’s fruit-and-jasmine point of view into the current Nigerian menu: fragrant, creamy and unmistakably bright.</p>
                            <div className="bc-flavour-line">
                                <span>
                                    01
                                    <strong>Floral</strong>
                                </span>
                                <span>
                                    02
                                    <strong>Fruity</strong>
                                </span>
                                <span>
                                    03
                                    <strong>Creamy</strong>
                                </span>
                            </div>
                            <a className="bc-button bc-button--blue" href={commerce.orderUrl} target="_blank" rel="noreferrer">
                                Try it today
                                {" "}
                                <ArrowUpRight size={18} />
                            </a>
                        </Reveal>
                    </div>
                </section>

                <section className="bc-soft-serve">
                    <div className="bc-shell">
                        <Reveal className="bc-soft-serve__heading">
                            <div>
                                <p className="bc-eyebrow bc-eyebrow--light">
                                    <Snowflake size={15} />
                                    {" "}
                                    Soft-serve mode
                                </p>
                                <h2>
                                    Swirls before
                                    <br />
                                    everything else.
                                </h2>
                            </div>
                            <div>
                                <p>Go simple, add boba, bring the biscuit crunch or turn the chocolate all the way up.</p>
                                <button className="bc-text-link bc-text-link--light" type="button" onClick={() => showCategory("sundaes")}>
                                    See every sundae
                                    {" "}
                                    <ArrowRight size={17} />
                                </button>
                            </div>
                        </Reveal>

                        <div className="bc-soft-serve__gallery">
                            <Reveal className="bc-soft-serve__tile bc-soft-serve__tile--wide">
                                <img className="is-cover" src={assets.mulberrySundae} alt="Bing Chun Mulberry Sundae" width="1200" height="877" sizes="(max-width: 860px) 90vw, 520px" loading="lazy" />
                                <span>Mulberry Sundae · ₦3,600</span>
                            </Reveal>
                            <Reveal className="bc-soft-serve__tile" delay={80}>
                                <img className="is-cover" src={assets.bobaSoftServe} alt="Bing Chun Chocolate Boba Sundae" width="1000" height="1000" sizes="(max-width: 620px) 45vw, 340px" loading="lazy" />
                                <span>Chocolate Boba · ₦4,200</span>
                            </Reveal>
                            <Reveal className="bc-soft-serve__tile" delay={160}>
                                <img src={assets.chocolateOreoSundae} alt="Bing Chun Chocolate Oreo Sundae" width="700" height="700" sizes="(max-width: 620px) 45vw, 340px" loading="lazy" />
                                <span>Chocolate Oreo · ₦4,800</span>
                            </Reveal>
                        </div>
                    </div>
                </section>

                <section className="bc-value">
                    <div className="bc-shell">
                        <Reveal className="bc-value__lead">
                            <p className="bc-eyebrow">Why Bing Chun</p>
                            <h2>
                                Big choice.
                                <br />
                                Easy decisions.
                            </h2>
                            <p>Tea, fruit, boba and soft-serve share one menu, with current prices shown before you order.</p>
                        </Reveal>
                        <div className="bc-value__grid">
                            {[
                                ["01", "Tea to dessert", "Move from a light jasmine tea to a full sundae without changing stops."],
                                ["02", "Prices up front", "See the current Jara Mall menu price before opening the order page."],
                                ["03", "Seven Lagos stops", "Distinct verified branches with accurate coordinates and clear directions."],
                                ["04", "Order your way", "Visit in person, call a published store number or use an available delivery link."],
                            ].map(([number, title, description], index) => (
                                <Reveal className="bc-value__item" delay={index * 60} key={number}>
                                    <span>{number}</span>
                                    <h3>{title}</h3>
                                    <p>{description}</p>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bc-offers" id="offers">
                    <div className="bc-shell bc-offers__inner">
                        <Reveal>
                            <p className="bc-eyebrow">
                                <Sparkles size={15} />
                                {" "}
                                Offers
                            </p>
                            <h2>{promotions.length > 0 ? promotions[0].title : "The next sweet deal will land here."}</h2>
                        </Reveal>
                        <Reveal className="bc-offers__status" delay={100}>
                            <span>
                                <Check size={16} />
                                {" "}
                                Verified updates only
                            </span>
                            <p>{promotions.length > 0 ? promotions[0].description : "There is no active Jara Mall promotion published right now. Check the live order page for the latest menu and availability."}</p>
                            <a className="bc-button bc-button--coral" href={commerce.orderUrl} target="_blank" rel="noreferrer">
                                Check live menu
                                {" "}
                                <ExternalLink size={17} />
                            </a>
                        </Reveal>
                    </div>
                </section>

                <section className="bc-visit" id="visit">
                    <div className="bc-shell">
                        <Reveal className="bc-visit__intro">
                            <div>
                                <p className="bc-eyebrow">
                                    <MapPin size={15} />
                                    {" "}
                                    Find Bing Chun
                                </p>
                                <h2>
                                    Your cold stop
                                    <br />
                                    across Lagos.
                                </h2>
                            </div>
                            <p>Seven distinct branches, plotted from verified coordinates. Select a location for current published details and directions.</p>
                        </Reveal>
                        <Reveal className="bc-locator" delay={100}>
                            <div className="bc-location-filters" aria-label="Filter locations by area">
                                {locationAreas.map(area => (
                                    <button
                                        type="button"
                                        key={area}
                                        className={locationFilter === area ? "is-active" : ""}
                                        aria-pressed={locationFilter === area}
                                        onClick={() => filterLocations(area)}
                                    >
                                        {area}
                                    </button>
                                ))}
                            </div>

                            <div className="bc-locator__grid">
                                <div className="bc-location-list" aria-live="polite">
                                    {filteredLocations.map((branch) => {
                                        const branchIndex = locations.findIndex(location => location.id === branch.id) + 1;
                                        const isSelected = branch.id === selectedLocation.id;

                                        return (
                                            <article className={`bc-location-card ${isSelected ? "is-selected" : ""}`} key={branch.id}>
                                                <button
                                                    className="bc-location-card__select"
                                                    type="button"
                                                    aria-pressed={isSelected}
                                                    onClick={() => setSelectedLocationId(branch.id)}
                                                >
                                                    <span className="bc-location-card__index">{String(branchIndex).padStart(2, "0")}</span>
                                                    <span className="bc-location-card__copy">
                                                        <span className="bc-location-card__verified">
                                                            <Check size={13} />
                                                            Verified branch
                                                        </span>
                                                        <strong>{branch.name}</strong>
                                                        <span>{branch.address}</span>
                                                        <span className="bc-location-card__hours">
                                                            <Clock size={15} />
                                                            {branch.openingHours?.display ?? "Hours not published"}
                                                        </span>
                                                    </span>
                                                </button>
                                                <div className="bc-location-card__actions">
                                                    <a href={branch.mapUrl} target="_blank" rel="noreferrer">
                                                        <MapPin size={15} />
                                                        Directions
                                                    </a>
                                                    {branch.phone && (
                                                        <a href={branch.phone.href}>
                                                            <Phone size={15} />
                                                            Call
                                                        </a>
                                                    )}
                                                    {branch.orderUrl && (
                                                        <a href={branch.orderUrl} target="_blank" rel="noreferrer">
                                                            <ShoppingBag size={15} />
                                                            Order
                                                        </a>
                                                    )}
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>

                                <div className="bc-location-map" aria-label="Interactive map of verified Bing Chun Lagos branches">
                                    <div className="bc-location-map__plot">
                                        <div className="bc-location-map__grid" aria-hidden="true" />
                                        <span className="bc-location-map__north" aria-hidden="true">N</span>
                                        {filteredLocations.map((branch) => {
                                            const branchIndex = locations.findIndex(location => location.id === branch.id) + 1;

                                            return (
                                                <button
                                                    className={`bc-map-marker ${branch.id === selectedLocation.id ? "is-selected" : ""}`}
                                                    type="button"
                                                    key={branch.id}
                                                    style={getMapMarkerStyle(branch)}
                                                    aria-label={`Select ${branch.name}`}
                                                    title={`${branch.name} · ${branch.area}`}
                                                    onClick={() => setSelectedLocationId(branch.id)}
                                                >
                                                    {String(branchIndex).padStart(2, "0")}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <div className="bc-location-map__details">
                                        <img src={assets.brandLogo} alt="" width="467" height="600" />
                                        <div>
                                            <span>{`${selectedLocation.area} · Lagos`}</span>
                                            <strong>{selectedLocation.name}</strong>
                                            <small>
                                                {`${selectedLocation.latitude.toFixed(5)}° N · ${selectedLocation.longitude.toFixed(5)}° E`}
                                            </small>
                                        </div>
                                        <a href={selectedLocation.mapUrl} target="_blank" rel="noreferrer" aria-label={`Get directions to ${selectedLocation.name}`}>
                                            <ArrowUpRight size={19} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </section>

                <section className="bc-gallery" aria-label="Bing Chun product gallery">
                    <div className="bc-gallery__grid">
                        <figure><img src={assets.fruitTea} alt="Bing Chun fruit tea with strawberry and citrus" width="1200" height="876" sizes="(max-width: 860px) 50vw, 25vw" loading="lazy" /></figure>
                        <figure><img className="is-contain" src={assets.grapeBobo} alt="Bing Chun grape boba tea" width="700" height="700" sizes="(max-width: 860px) 50vw, 25vw" loading="lazy" /></figure>
                        <figure><img src={assets.mulberrySundae} alt="Bing Chun Mulberry Sundae" width="1200" height="877" sizes="(max-width: 860px) 50vw, 25vw" loading="lazy" /></figure>
                        <figure><img src={assets.strawberryTea} alt="Bing Chun strawberry lemon tea" width="1200" height="1200" sizes="(max-width: 860px) 50vw, 25vw" loading="lazy" /></figure>
                    </div>
                    <div className="bc-gallery__caption">
                        <span>COLOUR IN EVERY CUP</span>
                        <strong>冰淳茶饮</strong>
                    </div>
                </section>
            </main>

            {selectedProduct && (
                <div
                    className="bc-product-dialog"
                    role="presentation"
                    onMouseDown={(event) => {
                        if (event.currentTarget === event.target)
                            setSelectedProduct(null);
                    }}
                >
                    <section
                        className="bc-product-dialog__panel"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="bc-product-dialog-title"
                    >
                        <button
                            ref={productDialogCloseRef}
                            className="bc-product-dialog__close"
                            type="button"
                            aria-label="Close product details"
                            onClick={() => setSelectedProduct(null)}
                        >
                            <X size={22} />
                        </button>
                        <div className="bc-product-dialog__media">
                            <span aria-hidden="true">ICE & TEA · LAGOS</span>
                            <img
                                className={`is-${selectedProduct.product.imageFit ?? "contain"}`}
                                src={selectedProduct.product.image}
                                alt={selectedProduct.product.imageAlt}
                                width={selectedProduct.product.imageWidth ?? 700}
                                height={selectedProduct.product.imageHeight ?? 700}
                            />
                            <i aria-hidden="true">✦</i>
                        </div>
                        <div className="bc-product-dialog__content">
                            <p className="bc-product-dialog__category">{selectedProduct.categoryLabel}</p>
                            <h2 id="bc-product-dialog-title">{selectedProduct.product.name}</h2>
                            <p className="bc-product-dialog__description">{selectedProduct.product.description}</p>
                            <div className="bc-product-dialog__meta">
                                <span>
                                    Menu price
                                    <strong>{formatNaira.format(selectedProduct.product.price)}</strong>
                                </span>
                                <span>
                                    Online status
                                    <strong>{selectedProduct.product.status === "sold-out-online" ? "Sold out online" : "Check live menu"}</strong>
                                </span>
                            </div>
                            <a className="bc-button bc-button--ink bc-product-dialog__cta" href={commerce.orderUrl} target="_blank" rel="noreferrer">
                                {selectedProduct.product.status === "sold-out-online" ? "Check live menu" : "Order on Chowdeck"}
                                <ArrowUpRight size={18} />
                            </a>
                            <small>Price and availability are based on the current Jara Mall listing and may change.</small>
                        </div>
                    </section>
                </div>
            )}

            <footer className="bc-footer">
                <div className="bc-shell bc-footer__top">
                    <div className="bc-footer__brand">
                        <img src={assets.brandLogo} alt="Bing Chun" width="467" height="600" />
                        <p>Tea, fruit, boba and soft-serve across Lagos.</p>
                    </div>
                    <div className="bc-footer__links">
                        <div>
                            <strong>Explore</strong>
                            {navigation.map(item => <a key={item.href} href={item.href}>{item.label}</a>)}
                        </div>
                        <div>
                            <strong>Visit</strong>
                            <a href="#visit">Find a Lagos location</a>
                            <a href="#visit">7 verified branches</a>
                            <a href={commerce.orderUrl} target="_blank" rel="noreferrer">Order on Chowdeck</a>
                        </div>
                    </div>
                </div>
                <div className="bc-shell bc-footer__bottom">
                    <span>
                        ©
                        {new Date().getFullYear()}
                        {" "}
                        Bing Chun Nigeria
                    </span>
                    <span>Menu details sourced from the live Jara Mall listing.</span>
                </div>
            </footer>
        </div>
    );
}

export default BingChunPage;
