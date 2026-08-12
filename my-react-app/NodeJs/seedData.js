import Product from "./Model/products.model.js";

const initialProducts = [
  {
    "_id": "elec-001",
    "title": "Apple iPhone 15 Pro Max (256 GB) - Natural Titanium",
    "description": "Forged in titanium with the groundbreaking A17 Pro chip, customizable Action button, and the most powerful iPhone camera system ever with 5x Telephoto lens.",
    "price": 159900,
    "stock": 25,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-002",
    "title": "Samsung Galaxy S24 Ultra 5G (12GB RAM, 512GB Storage)",
    "description": "Meet Galaxy S24 Ultra with Galaxy AI, titanium frame, built-in S Pen, 200MP camera, and Snapdragon 8 Gen 3 for Galaxy processor.",
    "price": 139999,
    "stock": 18,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-003",
    "title": "Apple MacBook Pro 16-inch M3 Max (36GB Unified Memory, 1TB SSD)",
    "description": "The 16-inch MacBook Pro blasts forward with M3 Max, an extraordinarily advanced chip that brings massive performance for demanding workflows.",
    "price": 349900,
    "stock": 10,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-004",
    "title": "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    "description": "Industry-leading noise canceling with two processors and 8 microphones, magnificent sound quality, crystal clear hands-free calling, and 30-hour battery life.",
    "price": 29990,
    "stock": 45,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-005",
    "title": "Sony PlayStation 5 Slim Console (Disc Edition)",
    "description": "Unleash new gaming possibilities with lightning fast loading via an ultra-high speed SSD, deeper immersion with haptic feedback, adaptive triggers, and 3D Audio.",
    "price": 54990,
    "stock": 30,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-006",
    "title": "Apple iPad Pro 13-inch M4 (256GB, Wi-Fi) - Space Black",
    "description": "Thinpossible design with groundbreaking Ultra Retina XDR display, outrageously fast M4 chip performance, and next-gen AI capabilities.",
    "price": 129900,
    "stock": 15,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-007",
    "title": "Dell XPS 15 9530 Laptop (Intel Core i9 13th Gen, 32GB RAM, 1TB SSD, RTX 4060)",
    "description": "Immerse yourself in content with stunning 3.5K OLED touch display, premium machined aluminum chassis, and powerful NVIDIA GeForce RTX graphics.",
    "price": 249990,
    "stock": 12,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-008",
    "title": "Apple Watch Ultra 2 (GPS + Cellular, 49mm) - Titanium Case",
    "description": "The most capable and rugged Apple Watch ever. Designed for outdoor adventure and endurance workouts with a lightweight titanium case and up to 72 hours battery life.",
    "price": 89900,
    "stock": 22,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-009",
    "title": "Bose QuietComfort Ultra Wireless Earbuds",
    "description": "Breakthrough spatialized audio for more immersive listening, world-class noise cancellation, and CustomTune technology for personalized sound.",
    "price": 25900,
    "stock": 40,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-010",
    "title": "LG C3 55-inch 4K Smart OLED EVO TV (OLED55C3PSA)",
    "description": "Self-lit OLED pixels generate infinite contrast, 100% color fidelity, powered by the α9 AI Processor 4K Gen6 for extraordinary picture and sound.",
    "price": 119990,
    "stock": 8,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-011",
    "title": "Canon EOS R6 Mark II Mirrorless Camera (Body Only)",
    "description": "Full-frame 24.2 MP sensor, 40 fps continuous shooting, 4K 60p uncropped video recording, advanced Dual Pixel CMOS AF II with subject tracking.",
    "price": 215995,
    "stock": 7,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-012",
    "title": "ASUS ROG Zephyrus G16 Gaming Laptop (Intel Core Ultra 9, RTX 4080)",
    "description": "Ultra-thin 16-inch gaming laptop featuring Nebula OLED 240Hz display, CNC-machined aluminum body, and desktop-class gaming performance.",
    "price": 279990,
    "stock": 9,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-013",
    "title": "Samsung Galaxy Tab S9 Ultra (14.6-inch Dynamic AMOLED 2X, 12GB RAM)",
    "description": "Massive 14.6-inch AMOLED display, IP68 water resistance, Snapdragon 8 Gen 2 processor, included S Pen with ultra-low latency.",
    "price": 108999,
    "stock": 14,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-014",
    "title": "JBL Charge 5 Portable Waterproof Bluetooth Speaker",
    "description": "Delivers bold JBL Original Pro Sound with an optimized long excursion driver, separate tweeter, and dual pumping JBL bass radiators. 20 hours play time.",
    "price": 14999,
    "stock": 60,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-015",
    "title": "Google Pixel 8 Pro (12GB RAM, 128GB Storage) - Bay Blue",
    "description": "Powered by Google Tensor G3 chip, fully upgraded camera system with Pro controls, 6.7-inch Super Actua display, and 7 years of OS updates.",
    "price": 93999,
    "stock": 20,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-016",
    "title": "Logitech MX Master 3S Performance Wireless Mouse",
    "description": "Quiet Clicks technology, 8000 DPI track-on-glass sensor, MagSpeed electromagnetic scrolling, and ergonomic comfortable silhouette.",
    "price": 9495,
    "stock": 50,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-017",
    "title": "Keychron K2 Pro Wireless Mechanical Keyboard (RGB Backlit)",
    "description": "QMK/VIA wireless mechanical keyboard with hot-swappable switches, double-shot PBT keycaps, and seamless Bluetooth 5.1 connectivity.",
    "price": 10499,
    "stock": 35,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-018",
    "title": "GoPro HERO12 Black Action Camera",
    "description": "Incredible 5.3K60 video, HDR imaging, HyperSmooth 6.0 stabilization, rugged waterproof build up to 33ft, and Bluetooth audio support.",
    "price": 37990,
    "stock": 28,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-019",
    "title": "DJI Mini 4 Pro Drone (Fly More Combo with DJI RC 2)",
    "description": "Under 249g ultra-lightweight foldable drone with 4K/60fps HDR video, omnidirectional obstacle sensing, 34-min flight time, and 20km HD video transmission.",
    "price": 98990,
    "stock": 11,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-020",
    "title": "Sony Bravia 65-inch 4K Ultra HD Smart LED Google TV",
    "description": "4K HDR Processor X1 delivers smooth and clear pictures, Live Color technology for real-world colors, and immersive Dolby Atmos surround sound.",
    "price": 76990,
    "stock": 13,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1577979749830-f1d742b96791?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-021",
    "title": "Anker MagGo 10000mAh Qi2 Certified Magnetic Power Bank",
    "description": "15W ultra-fast wireless charging for MagSafe iPhones, smart display monitoring battery status and charging times, fold-out kickstand.",
    "price": 6999,
    "stock": 80,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-022",
    "title": "Kindle Paperwhite (16 GB) - 6.8-inch Display & Adjustable Warm Light",
    "description": "Now with a 6.8-inch display and thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns.",
    "price": 14999,
    "stock": 42,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1592496001020-d31bd830651f?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-023",
    "title": "Apple AirPods Pro (2nd Generation) with MagSafe Case (USB-C)",
    "description": "Up to 2x more Active Noise Cancellation, Adaptive Audio, Transparency mode, Personalized Spatial Audio, and precision tracking Precision Finding.",
    "price": 24900,
    "stock": 75,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-024",
    "title": "Marshall Stanmore III Bluetooth Home Speaker",
    "description": "Re-engineered for a wider soundstage, delivering room-filling Marshall signature sound, classic vintage design with brass control knobs.",
    "price": 31999,
    "stock": 19,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1543512214-318c7553f230?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-025",
    "title": "Samsung Odyssey G9 49-inch Dual QHD Curved Gaming Monitor",
    "description": "Revolutionary 1000R curved screen with 240Hz refresh rate, 1ms response time, Quantum Mini-LED technology, and VESA DisplayHDR 2000.",
    "price": 139990,
    "stock": 6,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-026",
    "title": "Xbox Series X Console (1TB SSD)",
    "description": "The fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles with 12 teraflops of raw graphic processing power.",
    "price": 49990,
    "stock": 24,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-027",
    "title": "Razer DeathAdder V3 Pro Wireless Gaming Mouse",
    "description": "Ultra-lightweight 63g ergonomic design, Focus Pro 30K Optical Sensor, Optical Mouse Switches Gen-3, and up to 90 hours battery life.",
    "price": 13999,
    "stock": 32,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1629429408209-1f912961dbd8?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-028",
    "title": "ASUS TUF Gaming F15 (Core i7 13th Gen, 16GB RAM, RTX 4060)",
    "description": "Military-grade durability gaming laptop featuring FHD 144Hz IPS display, Arc Flow Fans cooling system, and MUX Switch for high FPS gaming.",
    "price": 99990,
    "stock": 21,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-029",
    "title": "OnePlus 12 5G (16GB RAM, 512GB Storage) - Silky Black",
    "description": "Powered by Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera System for Mobile, 2K 120Hz ProXDR display, and 100W SUPERVOOC fast charging.",
    "price": 69999,
    "stock": 27,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-030",
    "title": "Nothing Phone (2) 5G (12GB RAM, 256GB Storage) - Dark Grey",
    "description": "Iconic Glyph Interface, 6.7-inch LTPO OLED 120Hz display, dual 50MP rear cameras, and Snapdragon 8+ Gen 1 chipset with Nothing OS 2.5.",
    "price": 39999,
    "stock": 33,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-031",
    "title": "Sony Alpha 7 IV Full-Frame Hybrid Camera (28-70mm Lens Kit)",
    "description": "33MP Exmor R CMOS sensor, BIONZ XR processing engine, 4K 60p video, real-time Eye AF for humans, animals, and birds.",
    "price": 242990,
    "stock": 5,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-032",
    "title": "Bose SoundLink Flex Bluetooth Portable Speaker",
    "description": "PositionIQ technology automatically detects orientation to optimize sound quality. IP67 waterproof and dustproof design with 12 hours battery.",
    "price": 15900,
    "stock": 48,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-033",
    "title": "Apple Studio Display 27-inch 5K Retina Display",
    "description": "27-inch 5K Retina display, 12MP Ultra Wide camera with Center Stage, studio-quality three-mic array, and six-speaker sound system with Spatial Audio.",
    "price": 159900,
    "stock": 8,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-034",
    "title": "HP Spectre x360 2-in-1 Laptop (Intel Core Ultra 7, 32GB RAM, 1TB SSD)",
    "description": "14-inch 2.8K OLED touch screen, 360-degree convertible hinge, 9MP AI camera with auto frame, and Intel Arc graphics.",
    "price": 164990,
    "stock": 11,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-035",
    "title": "Garmin Fenix 7X Pro Solar Multisport GPS Smartwatch",
    "description": "Solar charging lens for extended battery life, built-in LED flashlight, multi-band GPS, advanced training metrics, and preloaded TopoActive maps.",
    "price": 98990,
    "stock": 14,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-036",
    "title": "Lenovo Legion Pro 7i Gaming Laptop (Core i9 14th Gen, RTX 4090)",
    "description": "The ultimate gaming machine featuring 16-inch WQXGA 240Hz display, Coldfront 5.0 vapor chamber cooling, and peak RTX 4090 performance.",
    "price": 389990,
    "stock": 4,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1593640495253-23196b27a87f?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-037",
    "title": "Sennheiser Momentum 4 Wireless ANC Headphones",
    "description": "Signature Sennheiser sound with audiophile 42mm transducer system, custom sound personalization, and unbelievable 60-hour battery life.",
    "price": 26990,
    "stock": 29,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-038",
    "title": "Shure SM7B Cardioid Dynamic Vocal Microphone",
    "description": "Legendary studio microphone with smooth, flat, wide-range frequency response for speech and music in professional broadcasting and recording.",
    "price": 34990,
    "stock": 17,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-039",
    "title": "Elgato Stream Deck MK.2 Studio Controller",
    "description": "15 customizable LCD keys to trigger actions, launch social posts, adjust audio, switch scenes, and optimize livestream production.",
    "price": 13999,
    "stock": 38,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-040",
    "title": "Samsung T7 Shield 2TB Portable External SSD",
    "description": "Rugged durable design with IP65 rating for water and dust resistance, lightning fast USB 3.2 Gen 2 read speeds up to 1050 MB/s.",
    "price": 18999,
    "stock": 44,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-041",
    "title": "Apple iPad Mini 6th Gen (Wi-Fi, 64GB) - Purple",
    "description": "Compact 8.3-inch Liquid Retina display, A15 Bionic chip with Neural Engine, Touch ID integrated into top button, and USB-C port.",
    "price": 49900,
    "stock": 23,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-042",
    "title": "Sony HT-A7000 7.1.2ch Dolby Atmos Soundbar",
    "description": "Flagship soundbar with 360 Spatial Sound Mapping, Sound Field Optimization, 8K HDR pass-through, and Hi-Res Audio wireless.",
    "price": 129990,
    "stock": 6,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-043",
    "title": "Nintendo Switch OLED Model Console (White Joy-Con)",
    "description": "Vibrant 7-inch OLED screen, wide adjustable stand, wired LAN port dock, 64GB internal storage, and enhanced audio output.",
    "price": 32990,
    "stock": 31,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-044",
    "title": "Meta Quest 3 128GB VR Headset",
    "description": "Breakthrough mixed reality headset powered by Snapdragon XR2 Gen 2, 4K+ Infinite Display, Touch Plus controllers, and 3D spatial audio.",
    "price": 49990,
    "stock": 16,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-045",
    "title": "Xiaomi 14 Ultra 5G (16GB RAM, 512GB Storage) - Black",
    "description": "Leica Quad Camera system with 1-inch sensor, Snapdragon 8 Gen 3, WQHD+ 120Hz AMOLED display, 90W HyperCharge fast charging.",
    "price": 99999,
    "stock": 12,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-046",
    "title": "Logitech C920 HD Pro Webcam 1080p",
    "description": "Full HD 1080p video calling and recording at 30 fps, dual stereo microphones, automatic light correction, and premium glass lens.",
    "price": 7495,
    "stock": 55,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1587483166702-bf9aa66bd791?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-047",
    "title": "SteelSeries Arctis Nova Pro Wireless Multi-System Gaming Headset",
    "description": "OmniPoint High-Fidelity drivers, Active Noise Cancellation, Infinity Power System dual hot-swappable batteries, 360 Spatial Audio.",
    "price": 36999,
    "stock": 20,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-048",
    "title": "Anker Soundcore Motion X600 Spatial Audio Portable Speaker",
    "description": "World's first portable spatial audio speaker with 5 drivers and 5 amplifiers, 50W output, LDAC audio certification, 12 hours playtime.",
    "price": 19999,
    "stock": 26,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-049",
    "title": "ASUS ROG Ally Handheld Gaming Console (AMD Z1 Extreme, 512GB SSD)",
    "description": "7-inch 120Hz FHD gaming handheld running Windows 11, ergonomic grip, ROG Intelligent Cooling, and expandable microSD storage.",
    "price": 59990,
    "stock": 18,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-050",
    "title": "Segway Ninebot KickScooter MAX G30P Electric Scooter",
    "description": "Gen 2 motor with 40-mile top range, 18.6 mph max speed, 10-inch pneumatic tires, built-in fast charging, and mobile app connectivity.",
    "price": 64990,
    "stock": 9,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-051",
    "title": "BenQ EW3280U 32-inch 4K UHD IPS Entertainment Monitor",
    "description": "4K UHD resolution, HDRi technology, 2.1 channel treVolo built-in speakers with subwoofer, USB-C connectivity, eye-care technology.",
    "price": 54990,
    "stock": 14,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "elec-052",
    "title": "Nanoleaf Shapes Triangles Starter Kit (9 Light Panels)",
    "description": "Modular LED light panels with touch reactivity, music visualizer, dynamic RGB color scenes, and smart home hub compatibility.",
    "price": 19999,
    "stock": 35,
    "category": "electronics",
    "images": [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-001",
    "title": "Men's Premium Classic Denim Jacket - Vintage Blue",
    "description": "Crafted from heavy-duty 100% cotton denim, featuring contrast stitching, dual chest flap pockets, button closure, and a comfortable relaxed fit.",
    "price": 3499,
    "stock": 40,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-002",
    "title": "Women's Elegant Floral Print Summer Midi Dress",
    "description": "Breezy lightweight chiffon midi dress featuring a sweetheart neckline, puff sleeves, smocked waist, and vibrant floral pattern.",
    "price": 2799,
    "stock": 35,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-003",
    "title": "Unisex Heavyweight Fleece Pullover Hoodie - Charcoal",
    "description": "Ultra-soft 400 GSM organic cotton blend fleece hoodie with kangaroo pocket, double-lined drawstring hood, and ribbed cuffs.",
    "price": 2499,
    "stock": 50,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-004",
    "title": "Men's Slim-Fit Formal Pure Cotton Dress Shirt",
    "description": "Wrinkle-resistant 100% Egyptian cotton shirt with spread collar, french cuffs, and clean tailored silhouette for business wear.",
    "price": 1999,
    "stock": 45,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-005",
    "title": "Genuine Leather Biker Jacket - Onyx Black",
    "description": "100% lambskin leather moto jacket with asymmetrical front zipper, quilted shoulder pads, multiple zip pockets, and satin lining.",
    "price": 8999,
    "stock": 15,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-006",
    "title": "Women's High-Waisted Stretch Skinny Fit Jeans",
    "description": "Premium power-stretch denim jeans with tummy control waist, classical 5-pocket styling, and shape-retaining flex fabric.",
    "price": 2299,
    "stock": 60,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-007",
    "title": "Handcrafted Banarasi Silk Saree with Zari Embroidery",
    "description": "Luxurious pure silk saree woven with intricate golden zari motifs, traditional border, and matching unstitched blouse piece.",
    "price": 6499,
    "stock": 20,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-008",
    "title": "Men's Athletic Fit Quick-Dry Gym T-Shirt",
    "description": "Moisture-wicking 4-way stretch polyester performance t-shirt engineered for intense workouts with mesh ventilation panels.",
    "price": 999,
    "stock": 75,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-009",
    "title": "Women's Double-Breasted Classic Trench Coat - Beige",
    "description": "Timeless water-resistant twill trench coat with waist tie belt, storm flap, wide lapel collar, and deep side welt pockets.",
    "price": 5499,
    "stock": 22,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-010",
    "title": "Men's Stretch Cotton Chino Trousers - Olive Green",
    "description": "Versatile smart-casual chinos with comfort stretch fabric, flat-front design, coin pocket, and button-through back pockets.",
    "price": 1899,
    "stock": 50,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-011",
    "title": "Vintage Graphic Printed Oversized Streetwear T-Shirt",
    "description": "Heavy 240 GSM drop-shoulder t-shirt featuring retro washed aesthetic and durable screen-printed graphic art.",
    "price": 1299,
    "stock": 65,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-012",
    "title": "Wool Blend Long Winter Overcoat - Camel",
    "description": "Tailored Italian wool-blend single-breasted coat with notched lapel collar, full inner lining, and back vent for movement.",
    "price": 7999,
    "stock": 18,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-013",
    "title": "Men's Casual Pure Linen Long Sleeve Button-Down Shirt",
    "description": "100% natural breathable flax linen shirt designed for warm summer days, featuring relaxed fit and pearl buttons.",
    "price": 2199,
    "stock": 40,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-014",
    "title": "Women's High-Rise Wide Leg Straight Jeans - Light Wash",
    "description": "90s inspired non-stretch rigid denim jeans with high waistline, wide leg opening, and raw hem detailing.",
    "price": 2599,
    "stock": 30,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-015",
    "title": "Men's Tailored Slim Fit Suit Blazer Jacket - Navy",
    "description": "Sharp textured single-breasted suit blazer with notch lapel, dual flap pockets, inner welt pocket, and smooth lining.",
    "price": 4999,
    "stock": 25,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-016",
    "title": "Designer Cotton Silk Kurta Pajama Set with Nehru Jacket",
    "description": "3-piece ethnic festival set crafted from jacquard cotton-silk blend with fine thread embroidery and Mandarin collar.",
    "price": 4299,
    "stock": 28,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-017",
    "title": "Women's Premium Cashmere Blend Knit Crewneck Sweater",
    "description": "Sumptuously soft cashmere blend knit sweater with ribbed neckline, cuffs, and hem in a versatile relaxed cut.",
    "price": 3299,
    "stock": 35,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-018",
    "title": "Men's Athletic Jogger Sweatpants - Heather Grey",
    "description": "Tapered French terry cotton joggers with elastic drawstring waistband, zippered side pockets, and cuffed ankles.",
    "price": 1499,
    "stock": 55,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-019",
    "title": "Women's Satin Cowl Neck Evening Party Gown - Emerald",
    "description": "Luxe silky satin floor-length gown featuring a graceful cowl neckline, adjustable spaghetti straps, and thigh-high slit.",
    "price": 3999,
    "stock": 19,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-020",
    "title": "Men's Classic Pique Polo T-Shirt - Burgundy",
    "description": "Breathable 100% combed cotton pique polo shirt with two-button placket, flat knit collar, and side slit hem.",
    "price": 1199,
    "stock": 60,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-021",
    "title": "Insulated Hooded Winter Puffer Jacket - Black",
    "description": "Windproof and water-repellent quilted puffer jacket stuffed with lightweight thermal insulation and detachable hood.",
    "price": 4599,
    "stock": 30,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-022",
    "title": "Bohemian Tiered Printed Maxi Dress",
    "description": "Free-spirited tiered maxi dress crafted from breathable rayon with empire waist, tassel ties, and floral motifs.",
    "price": 2499,
    "stock": 40,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-023",
    "title": "Men's Multi-Pocket Tactical Cargo Pants",
    "description": "Durable ripstop cotton cargo pants with 6 reinforced utility pockets, articulated knees, and adjustable ankle cinch straps.",
    "price": 2299,
    "stock": 48,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-024",
    "title": "Classic Sherpa-Lined Corduroy Trucker Jacket",
    "description": "Vintage ribbed corduroy outerwear lined with plush warm sherpa fleece, featuring antique brass snap buttons.",
    "price": 3899,
    "stock": 25,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-025",
    "title": "Women's Power Blazer & Cropped Trousers Co-ord Set",
    "description": "Sophisticated 2-piece tailoring set including single-breasted blazer and high-waisted cigarette pants in crepe fabric.",
    "price": 4899,
    "stock": 22,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-026",
    "title": "Men's Zip-Up Tracksuit Set (Jacket & Pants)",
    "description": "Sporty tricot polyester tracksuit featuring full-zip track jacket with standing collar and matching elastic pants.",
    "price": 2999,
    "stock": 35,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-027",
    "title": "Women's Pleated Satin A-Line Midi Skirt",
    "description": "Flowy high-waisted accordion pleated midi skirt in shimmering satin fabric with hidden elastic waist.",
    "price": 1899,
    "stock": 45,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-028",
    "title": "Soft Thermal Quarter-Zip Pullover Sweatshirt",
    "description": "Cozy waffle-knit thermal pullover with quarter-zip stand collar, perfect for layering during chilly evenings.",
    "price": 1799,
    "stock": 50,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-029",
    "title": "Men's Printed Cuban Collar Resort Hawaiian Shirt",
    "description": "Tropical palm tree print short-sleeve shirt crafted from lightweight viscose with open Cuban collar.",
    "price": 1399,
    "stock": 55,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-030",
    "title": "Women's Chunky Cable Knit Button Cardigan",
    "description": "Relaxed fit vintage cable knit cardigan sweater featuring tortoise shell buttons and deep V-neckline.",
    "price": 2699,
    "stock": 38,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-031",
    "title": "Men's Stretch Cotton Chino Bermudas Shorts",
    "description": "Knee-length smart casual chino shorts with 9-inch inseam, slant front pockets, and belt loops.",
    "price": 1299,
    "stock": 60,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-032",
    "title": "Velvet Off-Shoulder Bodycon Party Dress",
    "description": "Luxe plush stretch velvet mini dress with folded off-shoulder neckline and body-hugging ruched silhouette.",
    "price": 2999,
    "stock": 25,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-033",
    "title": "Lightweight Waterproof Running Windbreaker",
    "description": "Ultra-packable weather-resistant nylon running jacket with reflective strips, back ventilation, and elastic binding.",
    "price": 2199,
    "stock": 42,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-034",
    "title": "Traditional Designer Anarkali Suit with Dupatta",
    "description": "Floor-length flared Georgette Anarkali dress embellished with sequins and zari work, paired with matching pants and net dupatta.",
    "price": 5299,
    "stock": 20,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-035",
    "title": "Men's Striped Organic Cotton Crewneck T-Shirt",
    "description": "Classic nautical Breton striped t-shirt made from 100% GOTS certified organic ring-spun cotton.",
    "price": 999,
    "stock": 70,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-036",
    "title": "Women's Faux Leather High-Waisted Leggings",
    "description": "Sleek coated faux leather leggings with high control waistband and smooth fleece-lined interior.",
    "price": 1799,
    "stock": 50,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-037",
    "title": "Men's Casual Checkered Cotton Flannel Shirt",
    "description": "Soft brushed cotton plaid flannel shirt with dual chest patch pockets and adjustable button cuffs.",
    "price": 1699,
    "stock": 45,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-038",
    "title": "Women's Ribbed Knit Bodycon Midi Dress",
    "description": "Form-fitting ribbed stretch viscose midi dress with high mock neckline and long snug sleeves.",
    "price": 2199,
    "stock": 35,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-039",
    "title": "Unisex Pastel Tie-Dye Oversized Sweatshirt",
    "description": "Hand-dyed French terry cotton pullover featuring custom swirl pastel dye pattern and relaxed drop shoulders.",
    "price": 1999,
    "stock": 40,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-040",
    "title": "Men's Linen Blend Drawstring Trousers",
    "description": "Relaxed summer trousers with elasticated drawstring waist, breathable linen cotton fabric, and side pockets.",
    "price": 1999,
    "stock": 48,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-041",
    "title": "Women's Cropped Light Wash Denim Jacket",
    "description": "Trendy waist-length cropped denim jacket with frayed hem detailing and classic metal button closure.",
    "price": 2299,
    "stock": 42,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-042",
    "title": "Men's Merino Wool V-Neck Pullover Sweater",
    "description": "Fine gauge 100% extra-fine Merino wool sweater, naturally thermoregulating and soft against skin.",
    "price": 2899,
    "stock": 30,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-043",
    "title": "Women's Off-Shoulder Ribbed Summer Crop Top",
    "description": "Stretchy ribbed knit crop top featuring Bardot off-the-shoulder neckline and lettuce trim edge.",
    "price": 899,
    "stock": 65,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-044",
    "title": "Athletic Compression Workout Tights",
    "description": "High-density compression leggings designed for muscular support, reducing fatigue, with targeted ventilation.",
    "price": 1599,
    "stock": 50,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-045",
    "title": "Women's High-Waisted Distressed Denim Shorts",
    "description": "Classic vintage cut-off denim shorts with distressed frayed hem, high rise fit, and 5-pocket design.",
    "price": 1499,
    "stock": 55,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-046",
    "title": "Men's Italian Wool Double-Breasted Suit",
    "description": "Premium 2-piece double-breasted suit crafted from Super 130s Italian virgin wool, fully canvas construction.",
    "price": 12999,
    "stock": 12,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-047",
    "title": "Women's Wrap Front V-Neck Casual Blouse",
    "description": "Flowy woven surplice wrap blouse featuring a flattering V-neckline, self-tie side sash, and long elastic cuffs.",
    "price": 1699,
    "stock": 45,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-048",
    "title": "Men's Quilted Gilet Puffer Vest - Olive",
    "description": "Lightweight thermal insulated vest with standing collar, full front zip, and fleece-lined zippered hand pockets.",
    "price": 2499,
    "stock": 35,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-049",
    "title": "Women's Linen Shift Dress with Pockets",
    "description": "Effortless casual summer shift dress made from pre-washed pure flax linen with boat neckline and functional side pockets.",
    "price": 2399,
    "stock": 38,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-050",
    "title": "Men's Seamless Anti-Chafing Workout Shorts",
    "description": "Lightweight 2-in-1 running shorts with built-in compression liner, phone pocket, and towel loop.",
    "price": 1399,
    "stock": 60,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-051",
    "title": "Women's Faux Suede Trench Jacket - Tan",
    "description": "Soft touch micro-suede open front jacket featuring waterfall lapels, waist belt, and turn-back cuffs.",
    "price": 3699,
    "stock": 24,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "cloth-052",
    "title": "Unisex Minimalist Heavy Cotton Graphic Sweatshirt",
    "description": "350 GSM premium looped cotton crewneck sweatshirt with embroidered chest typography logo.",
    "price": 1899,
    "stock": 50,
    "category": "clothes",
    "images": [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-001",
    "title": "Nike Air Jordan 1 Retro High OG - Chicago Lost & Found",
    "description": "Iconic high-top basketball sneaker featuring premium cracked leather uppers, encapsulated Air-Sole cushioning, and vintage aesthetic detailing.",
    "price": 16995,
    "stock": 20,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-002",
    "title": "Adidas Ultraboost Light Running Shoes - Core Black",
    "description": "Experience epic energy return with Light BOOST material, Primeknit+ upper for targeted support, and Continental Rubber outsole grip.",
    "price": 18999,
    "stock": 35,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-003",
    "title": "Puma RS-X Efekt Reflective Chunky Sneakers",
    "description": "Futuristic retro-inspired chunky sneakers with mesh upper, leather overlays, lightweight PU midsole, and reflective pops.",
    "price": 9999,
    "stock": 45,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-004",
    "title": "New Balance 550 Vintage Basketball Lifestyle Shoes",
    "description": "Tribute to the 1989 basketball original, featuring low-top streamlined silhouette, premium leather upper, and durable rubber outsole.",
    "price": 11999,
    "stock": 30,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-005",
    "title": "Timberland 6-Inch Premium Waterproof Leather Boots",
    "description": "Rugged iconic waterproof leather boots with PrimaLoft insulation, anti-fatigue technology, and seam-sealed construction.",
    "price": 17999,
    "stock": 18,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-006",
    "title": "ASICS Gel-Kayano 30 Long-Distance Running Shoes",
    "description": "Advanced stability running shoes with 4D GUIDANCE SYSTEM, PureGEL technology for cloud-like landings, and FF BLAST PLUS ECO cushioning.",
    "price": 15999,
    "stock": 40,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-007",
    "title": "Handcrafted Men's Genuine Leather Oxford Dress Shoes - Tan",
    "description": "Classic Goodyear welted full-grain calfskin leather Oxfords with brogue punch details and cushioned leather sole.",
    "price": 6999,
    "stock": 25,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-008",
    "title": "Converse Chuck 70 Vintage High-Top Canvas Sneakers",
    "description": "Elevated Chuck Taylor featuring heavier 12oz organic canvas, vintage stitching, cushioned OrthoLite insole, and glossy egret midsole.",
    "price": 5999,
    "stock": 50,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-009",
    "title": "Salomon Speedcross 6 Gore-Tex Trail Running Shoes",
    "description": "Legendary trail running shoe featuring GORE-TEX waterproof membrane, Mud Contagrip deep lugged outsole, and Quicklace system.",
    "price": 14999,
    "stock": 22,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-010",
    "title": "Dr. Martens 1460 Smooth Leather 8-Eye Boots",
    "description": "Original Dr. Martens 8-eye boot crafted from durable smooth leather, featuring yellow welt stitching and air-cushioned Bouncing Soles.",
    "price": 16999,
    "stock": 15,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-011",
    "title": "Vans Old Skool Core Classic Skate Shoes - Black/White",
    "description": "Timeless side-stripe skate shoe featuring sturdy canvas and suede uppers, re-enforced toe caps, and signature rubber waffle outsoles.",
    "price": 4999,
    "stock": 65,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-012",
    "title": "Men's Italian Leather Penny Loafers - Espresso Brown",
    "description": "Hand-finished Italian suede penny loafers with apron toe stitching, flexible Blake welt construction, and memory foam insoles.",
    "price": 7999,
    "stock": 28,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-013",
    "title": "Nike Air Force 1 '07 Triple White",
    "description": "Radiant low-top original with crisp leather overlays, perforated toe box, and Nike Air unit for lightweight all-day cushioning.",
    "price": 8995,
    "stock": 55,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-014",
    "title": "Women's Leather Ankle Chelsea Boots with Elastic Side Panels",
    "description": "Sleek pull-on Chelsea boots in polished calfskin leather with durable stacked heel and non-slip rubber tread.",
    "price": 5499,
    "stock": 32,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-015",
    "title": "Under Armour Curry Flow 11 Basketball Shoes",
    "description": "Stephen Curry signature basketball shoes featuring rubberless UA Flow cushioning, Warp upper technology, and dual-density responsiveness.",
    "price": 13999,
    "stock": 24,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-016",
    "title": "Reebok Club C 85 Vintage Tennis Shoes",
    "description": "Clean heritage court shoes made from soft garment leather, towel lining, EVA midsole, and high-abrasion rubber outsole.",
    "price": 6999,
    "stock": 42,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-017",
    "title": "Hoka One One Clifton 9 Maximalist Running Shoes",
    "description": "Ultra-cushioned daily trainer featuring responsive new foam, breathable engineered knit upper, and early-stage Meta-Rocker technology.",
    "price": 14999,
    "stock": 38,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-018",
    "title": "Nike ZoomX Vaporfly NEXT% 3 Racing Shoes",
    "description": "Elite marathon road racing shoes equipped with full-length carbon fiber flyplate and responsive ZoomX foam midsole.",
    "price": 21995,
    "stock": 12,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-019",
    "title": "Skechers Arch Fit Go Walk Slip-On Walking Shoes",
    "description": "Podiatrist-certified arch support walking shoes with stretch fit mesh fabric upper and lightweight ULTRA GO cushioning.",
    "price": 5499,
    "stock": 60,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1562183241-b937e95585b6?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-020",
    "title": "Men's Handcrafted Genuine Suede Driving Moccasins",
    "description": "Plush velvet suede driving shoes featuring pebbled rubber sole pods, exposed hand-stitching, and breathable leather footbed.",
    "price": 4499,
    "stock": 30,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-021",
    "title": "Crocs Classic Clog - Unisex Water Sandals",
    "description": "Lightweight water-friendly clogs with Croslite foam cushioning, ventilation ports, and pivoting heel strap.",
    "price": 2995,
    "stock": 80,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-022",
    "title": "Adidas Predator Elite Firm Ground Football Boots",
    "description": "Precision football boots featuring Strikeskin rubber fins, HybridTouch 2.0 upper, and CONTROLFRAME 2.0 outsole for firm ground pitch.",
    "price": 19999,
    "stock": 16,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-023",
    "title": "Birkenstock Arizona Unisex Two-Strap Leather Sandals",
    "description": "Iconic two-strap adjustable slide sandal with anatomically shaped cork-latex footbed lined in soft suede.",
    "price": 8990,
    "stock": 45,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-024",
    "title": "Columbia Crestwood Waterproof Hiking Shoes",
    "description": "Durable suede leather and mesh trail shoes featuring Omni-Tech waterproof seam-sealed construction and Techlite lightweight midsole.",
    "price": 7999,
    "stock": 35,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-025",
    "title": "Puma Future Ultimate FG/AG Soccer Cleats",
    "description": "Engineered dual-mesh FUZIONFIT360 upper with PWRTAPE support, PWRPRINT texturing for ball touch, and Dynamic Motion System outsole.",
    "price": 16999,
    "stock": 18,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-026",
    "title": "Women's Strappy Stiletto Heel Sandals - Nude",
    "description": "Glamorous 3.5-inch stiletto heels featuring delicate ankle strap, padded footbed, and sleek metallic pin heel.",
    "price": 3999,
    "stock": 25,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-027",
    "title": "Nike Metcon 9 Cross-Training Shoes",
    "description": "The gold standard for weightlifting and functional fitness, featuring enlarged Hyperlift plate, rubber rope wrap, and dual-density foam.",
    "price": 12795,
    "stock": 33,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-028",
    "title": "On Cloud 5 Lightweight Speed-Lacing Running Shoes",
    "description": "Signature Swiss engineering featuring CloudTec zero-gravity foam, patented Speedboard, and breathable antimicrobial mesh.",
    "price": 13999,
    "stock": 40,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-029",
    "title": "Men's Classic Wingtip Brogue Formal Leather Shoes",
    "description": "Full-grain burnished leather dress Oxfords with decorative perforations, stacked heel, and soft leather lining.",
    "price": 5999,
    "stock": 22,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-030",
    "title": "Brooks Ghost 15 Neutral Distance Running Shoes",
    "description": "Smooth transition running shoes featuring updated DNA LOFT v2 cushioning, 3D Fit Print upper, and durable rubber traction.",
    "price": 12999,
    "stock": 36,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-031",
    "title": "Clarks Desert Boot in Original Beeswax Leather",
    "description": "The iconic crepe-soled ankle boot introduced in 1950, crafted from rich beeswax leather with simple lace-up fastening.",
    "price": 11999,
    "stock": 20,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-032",
    "title": "Adidas Samba OG Shoes - Cloud White/Core Black",
    "description": "Born on the pitch, the Samba is a timeless icon of street style featuring soft leather upper, suede overlays, and gum rubber sole.",
    "price": 9999,
    "stock": 48,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-033",
    "title": "Merrell Moab 3 Mid Waterproof Hiking Boots",
    "description": "Famous for out-of-the-box comfort, durable suede upper, Vibram TC5+ outsole grip, and Air Cushion in the heel.",
    "price": 12999,
    "stock": 26,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-034",
    "title": "Nike Dunk Low Retro - Panda (Black/White)",
    "description": "Created for the hardwood but taken to the streets, featuring crisp leather overlays, padded low-cut collar, and classic color-blocking.",
    "price": 9695,
    "stock": 50,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-035",
    "title": "Men's Slip-On Canvas Espadrilles - Navy Blue",
    "description": "Casual summer espadrilles featuring breathable canvas upper, braided jute rope midsole, and flexible rubber sole.",
    "price": 1999,
    "stock": 70,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-036",
    "title": "Under Armour Phantom 3 SE Running Shoes",
    "description": "Ultra-breathable Warp upper, Molded midfoot panel for added structure, and responsive UA HOVR cushioning.",
    "price": 11999,
    "stock": 30,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-037",
    "title": "Women's Pointed Toe Block Heel Pumps - Classic Black",
    "description": "Sophisticated 2-inch block heel pumps crafted from smooth faux leather with padded memory foam footbed.",
    "price": 2799,
    "stock": 40,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-038",
    "title": "Puma Future Rider Play On Unisex Sneakers",
    "description": "Vibrant retro running sneakers featuring slim Federbein shock-absorbing outsole and lightweight rider foam midsole.",
    "price": 6999,
    "stock": 45,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-039",
    "title": "Mizuno Wave Rider 27 Performance Running Shoes",
    "description": "Features Mizuno Enerzy foam for soft cushioning and high energy return, combined with eco-friendly Wave plate technology.",
    "price": 11999,
    "stock": 25,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-040",
    "title": "Men's Handcrafted Leather Double Monk Strap Shoes",
    "description": "Distinguished double monk strap dress shoes with dual brass buckles, hand-burnished toe, and leather lining.",
    "price": 6499,
    "stock": 22,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-041",
    "title": "Reebok Zig Kinetica 2.5 Edge Outdoor Shoes",
    "description": "Rugged outdoor inspired shoes with Zig Energy Shell surrounding the foam midsole and Vibram Ecostep lugged outsole.",
    "price": 10999,
    "stock": 28,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-042",
    "title": "Asics GEL-Nimbus 25 Maximum Cushioning Shoes",
    "description": "Softest cushioning running shoe featuring PureGEL technology, FF BLAST PLUS ECO cushioning, and stretch knit upper.",
    "price": 15999,
    "stock": 35,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-043",
    "title": "Women's Plush Faux Fur Slippers - Blush Pink",
    "description": "Ultra-cozy indoor slide slippers with high-density memory foam footbed and non-slip durable rubber sole.",
    "price": 1299,
    "stock": 75,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-044",
    "title": "Saucony Endorphin Speed 3 Nylon Plate Trainers",
    "description": "Featuring SPEEDROLL technology for effortless speed, PWRRUN PB foam cushioning, and re-designed winged nylon plate.",
    "price": 16999,
    "stock": 20,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-045",
    "title": "Nike Pegasus 40 Road Running Shoes",
    "description": "The trusted workhorse with wings, featuring dual Zoom Air units, engineered single-layer mesh, and neutral support.",
    "price": 11895,
    "stock": 50,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-046",
    "title": "Men's Genuine Leather Chukka Ankle Boots - Dark Brown",
    "description": "Versatile 3-eyelet Chukka boots crafted from rich oiled leather with comfortable crepe rubber outsole.",
    "price": 4999,
    "stock": 32,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-047",
    "title": "Adidas Forum Low Classic Retro Sneakers",
    "description": "80s basketball icon featuring removable ankle strap, premium coated leather upper, and classic trefoil branding.",
    "price": 8999,
    "stock": 44,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-048",
    "title": "FootJoy Pro SL Golf Shoes - Waterproof Leather",
    "description": "Tour-proven spikeless golf shoes with ChromoSkin leather by Pittards, Fine Tuned Foam (FTF) for supple cushioning, and Infinity Outsole.",
    "price": 15999,
    "stock": 18,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-049",
    "title": "Women's Platform Canvas Lace-Up Sneakers",
    "description": "Trendy 1.5-inch platform canvas sneakers with durable vulcanized rubber sole and soft breathable cotton lining.",
    "price": 2499,
    "stock": 55,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-050",
    "title": "Men's Waterproof Tactical Combat Army Boots",
    "description": "Heavy-duty military tactical boots with side zip, high ankle collar, slip-resistant rubber lugs, and moisture-wicking lining.",
    "price": 5999,
    "stock": 25,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-051",
    "title": "SG Full Spike Leather Cricket Shoes",
    "description": "Professional cricket shoes with lightweight TPU sole, removable steel spikes, reinforced toe box, and EVA mid-layer.",
    "price": 4299,
    "stock": 30,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "shoe-052",
    "title": "Unisex High-Top Canvas Skate Sneakers - All Black",
    "description": "Stealth black high-top canvas sneakers featuring reinforced metal eyelets, padded collar, and vulcanized rubber sole.",
    "price": 3499,
    "stock": 60,
    "category": "shoes",
    "images": [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-001",
    "title": "MRF Genius Grand Edition English Willow Cricket Bat",
    "description": "Grade 1 natural air-dried English Willow cricket bat crafted for explosive power, optimum balance, and massive sweet spot.",
    "price": 38999,
    "stock": 15,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-002",
    "title": "Adidas FIFA World Cup Official Match Football - Size 5",
    "description": "Thermal bonded seamless surface technology for predictable trajectory, better touch, and lower water uptake. FIFA Quality Pro certified.",
    "price": 9999,
    "stock": 40,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-003",
    "title": "Wilson NBA Official Composite Leather Basketball",
    "description": "Official NBA indoor/outdoor composite leather basketball featuring Ever Bounce construction and Inflation Retention Lining.",
    "price": 4999,
    "stock": 50,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-004",
    "title": "Babolat Pure Drive Tennis Racket (300g)",
    "description": "Iconic power tennis racket featuring FSI Power technology and HTR System for explosive responsiveness and high stability.",
    "price": 19999,
    "stock": 22,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-005",
    "title": "Yonex Astrox 99 Pro Badminton Racket (4U, G5)",
    "description": "Head-heavy badminton racket engineered with NAMD graphite for steep, devastating smashes and enhanced shuttle hold.",
    "price": 16499,
    "stock": 30,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-006",
    "title": "Everlast Pro Style Training Boxing Gloves (14 oz) - Red",
    "description": "Premium synthetic leather boxing gloves with dual-layered foam padding, full wrist wrap strap, and mesh ventilated palm.",
    "price": 3499,
    "stock": 45,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-007",
    "title": "Rubber Encased Hex Dumbbell Set (20kg Pair)",
    "description": "Professional grade cast iron hex dumbbells with protective heavy-duty rubber coating and ergonomically contoured chrome handles.",
    "price": 5999,
    "stock": 25,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-008",
    "title": "Premium 6mm Non-Slip TPE Yoga Mat with Alignment Lines",
    "description": "Eco-friendly dual-layer TPE yoga mat providing superior grip, extra density cushioning for joints, and laser-engraved alignment markings.",
    "price": 1899,
    "stock": 80,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-009",
    "title": "Motorized Folding Treadmill with 3.0 HP Peak Motor & Incline",
    "description": "Heavy-duty home treadmill featuring multi-layer shock absorption belt, digital LCD console, speed up to 14 km/h, and Bluetooth speakers.",
    "price": 29990,
    "stock": 10,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-010",
    "title": "Callaway Strata Complete Golf Club Set with Stand Bag (12-Piece)",
    "description": "Complete golf set including titanium driver, 3-wood, 4 & 5 hybrids, 6-9 irons, pitching wedge, putter, and lightweight stand bag.",
    "price": 44999,
    "stock": 12,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-011",
    "title": "Stiga Pro Carbon Table Tennis Racket",
    "description": "Performance level ping pong paddle featuring 7-ply lightweight blade with carbon technology, 2.0mm ITTF approved rubber.",
    "price": 6999,
    "stock": 35,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-012",
    "title": "Element Complete 8.0-inch Skateboard - Maple Deck",
    "description": "Pre-assembled complete skateboard featuring 7-ply North American maple deck, 52mm 99A wheels, and smooth ABEC-5 bearings.",
    "price": 7499,
    "stock": 28,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-013",
    "title": "Speedo Vanquisher 2.0 Anti-Fog Swim Goggles",
    "description": "Low-profile competitive swim goggles with panoramic anti-fog UV protection lenses, silicone eye seals, and 4 interchangeable nosepieces.",
    "price": 1999,
    "stock": 60,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-014",
    "title": "Giro Register MIPS Adult Road Cycling Helmet",
    "description": "Lightweight in-mold polycarbonate helmet featuring MIPS Brain Protection System, Roc Loc Sport fit dial, and 22 wind tunnel vents.",
    "price": 5499,
    "stock": 32,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1559348349-86f1f65817fe?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-015",
    "title": "CamelBak HydroBak Light 1.5L Hydration Backpack",
    "description": "Compact lightweight hydration pack with 1.5-liter Crux reservoir, breathable air mesh back panel, and reflective safety accents.",
    "price": 3999,
    "stock": 40,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-016",
    "title": "Heavy Duty 4ft Filled Punching Bag Set with Chains",
    "description": "Durable synthetic leather heavy bag stuffed with shock-absorbing textile filling, includes heavy duty ceiling hanger swivel mount.",
    "price": 4999,
    "stock": 20,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-017",
    "title": "11-Piece Stackable Resistance Bands Set with Door Anchor & Handles",
    "description": "Heavy-duty natural latex workout bands up to 150 lbs total resistance, includes ankle straps, foam handles, and travel pouch.",
    "price": 1499,
    "stock": 90,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-018",
    "title": "Quechua 4-Person Waterproof Camping Tent (2 Seconds Easy setup)",
    "description": "Pop-up dome tent with Fresh & Black technology to keep interior cool and dark, wind-resistant up to 50 km/h, and 2000mm waterproofing.",
    "price": 8999,
    "stock": 18,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-019",
    "title": "Black Diamond Trail Ergo Cork Trekking Poles (Pair)",
    "description": "Lightweight aluminum hiking poles with natural cork grips, ergonomic 15-degree corrective angle, and dual FlickLock adjustability.",
    "price": 9999,
    "stock": 25,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-020",
    "title": "USAPA Approved Pickleball Paddle Set (2 Paddles + 4 Balls)",
    "description": "Graphite carbon fiber face pickleball paddles with polymer honeycomb core, sweat-absorbent grip, and outdoor balls with carry bag.",
    "price": 4499,
    "stock": 38,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-021",
    "title": "Rawlings Select Pro Lite Youth Baseball Glove (11.5-inch)",
    "description": "All-leather shell baseball glove featuring Pro H web pattern, palm padding for impact protection, and soft fingerback lining.",
    "price": 3999,
    "stock": 30,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-022",
    "title": "Cressi Panoramic Tempered Glass Snorkel Diving Set",
    "description": "Dry-top splash-proof snorkel with panoramic 4-lens tempered glass scuba mask and soft hypoallergenic silicone skirt.",
    "price": 3499,
    "stock": 35,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-023",
    "title": "Intex Challenger K2 Inflatable 2-Person Kayak Set",
    "description": "Heavy-duty puncture resistant vinyl inflatable kayak with aluminum oars, high-output hand pump, removable skeg, and cargo net.",
    "price": 12999,
    "stock": 14,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-024",
    "title": "Adjustable Inline Skates Roller Blades with Illuminating Wheels",
    "description": "High-performance outdoor roller blades with aluminium frame, ABEC-7 bearings, and self-generating power LED light wheels.",
    "price": 3999,
    "stock": 42,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-025",
    "title": "SG Club Leather Cricket Ball (Pack of 6) - Red",
    "description": "Alum tanned top quality leather cricket balls sewn with linen thread, hand-crafted core for shape retention and consistent bounce.",
    "price": 2499,
    "stock": 50,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-026",
    "title": "Molten B7G5000 FIBA Approved Match Basketball - Size 7",
    "description": "Flagship premium real leather basketball featuring Dual-Cushion technology, 12-panel design, and superior tactile grip.",
    "price": 8999,
    "stock": 20,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-027",
    "title": "Head Radical Pro Tennis Racket (315g)",
    "description": "Engineered with Auxetic technology for sensational impact feel, versatile frame geometry, and extreme spin potential.",
    "price": 18499,
    "stock": 24,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-028",
    "title": "Li-Ning G-Force Superlite 3600 Badminton Racket",
    "description": "Ultra-lightweight 78g carbon fiber racket with High Tensile Slim Shaft and Dynamic Optimum Frame for fast swing speeds.",
    "price": 3299,
    "stock": 45,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-029",
    "title": "Cast Iron Kettlebell 16kg with Vinyl Coating",
    "description": "Solid cast iron kettlebell coated in color-coded vinyl to protect floors, featuring wide smooth handle for two-handed grip.",
    "price": 3299,
    "stock": 35,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-030",
    "title": "Mikasa V200W Official FIVB Volleyball",
    "description": "Official indoor match volleyball featuring 18 aerodynamic dimpled panels and Nano Balloon Silica technology for flight control.",
    "price": 6499,
    "stock": 28,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-031",
    "title": "Nivia Storm Football - Size 5 (White/Blue)",
    "description": "Durable 32-panel rubberized hand-stitched football with high air retention butyl bladder for rough ground play.",
    "price": 999,
    "stock": 75,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-032",
    "title": "Decathlon Domyos Magnetic Exercise Spin Bike",
    "description": "Ultra-smooth magnetic resistance indoor cycling bike with 12kg flywheel, adjustable handlebars/seat, and heart rate sensors.",
    "price": 24999,
    "stock": 15,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-033",
    "title": "Kookaburra Kahuna Pro Batting Pads (Cricket)",
    "description": "Ultra-lightweight high-density foam cricket leg guards with traditional cane construction and ergonomic knee roll.",
    "price": 4999,
    "stock": 32,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-034",
    "title": "High Density EVA Foam Fitness Roller for Muscle Recovery",
    "description": "18-inch deep tissue foam roller for myofascial release, relieving muscle soreness, and improving flexibility.",
    "price": 999,
    "stock": 65,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-035",
    "title": "Garmin HRM-Pro Plus Premium Chest Strap Heart Rate Monitor",
    "description": "Transmits real-time heart rate data via ANT+ and Bluetooth LE, captures running dynamics, and stores data during swims.",
    "price": 11990,
    "stock": 22,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-036",
    "title": "Louisville Slugger Vapor Aluminum Baseball Bat (-3 drop)",
    "description": "7-Series one-piece alloy baseball bat with HUB 1-piece end cap for maximum swing speed and sweet spot performance.",
    "price": 7999,
    "stock": 20,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-037",
    "title": "Victor Feather Shuttlecocks Gold No. 1 (Tube of 12)",
    "description": "Premium goose feather shuttlecocks crafted for accurate flight stability, durability, and tournament speed.",
    "price": 1899,
    "stock": 80,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-038",
    "title": "Speedo Silicone Unisex Swimming Cap",
    "description": "100% premium ergonomic silicone swim cap designed to reduce drag, protect hair from chlorine, and fit securely.",
    "price": 599,
    "stock": 100,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-039",
    "title": "Spalding High-Speed Weighted Skipping Jump Rope",
    "description": "Tangle-free ball bearing steel cable jump rope with non-slip foam handles, easily adjustable cable length for cardio workouts.",
    "price": 799,
    "stock": 85,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-040",
    "title": "Coleman 48-Quart Heavy Duty Ice Chest Cooler Box",
    "description": "Insulated hard cooler holds up to 63 cans, keeps ice frozen for up to 3 days in temperatures up to 90°F, leak-resistant drain.",
    "price": 4999,
    "stock": 25,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-041",
    "title": "Titleist Pro V1 Golf Balls (Dozen)",
    "description": "The #1 ball in golf offering total performance for extraordinary distance, high flight, low long game spin, and Drop-and-Stop control.",
    "price": 5499,
    "stock": 40,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-042",
    "title": "Cosco Target Basketball Board Set with Steel Ring & Net",
    "description": "Heavy-duty acrylic backboard with spring-action steel breakaway rim and weather-resistant nylon net.",
    "price": 3499,
    "stock": 30,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-043",
    "title": "Decathlon 500 Indoor Table Tennis Table (Standard Foldable)",
    "description": "Official size foldable ping pong table with 18mm chipboard top, sturdy steel frame, integrated net, and 4 locking wheels.",
    "price": 26999,
    "stock": 8,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-044",
    "title": "Pro Handcrafted English Leather Field Hockey Ball (Pack of 4)",
    "description": "Official match dimpled hockey ball engineered for water-turf and grass pitches, seamless cork core interior.",
    "price": 1299,
    "stock": 55,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-045",
    "title": "Multi-Grip Wall Mounted Pull-Up Bar",
    "description": "Heavy-gauge steel chin-up bar with 6 padded foam handles, supports up to 200kg for arm, back, and core workouts.",
    "price": 2299,
    "stock": 45,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-046",
    "title": "Nivia Double Action High Pressure Ball Air Pump",
    "description": "Dual-action inflation pump pushes air on both push and pull stroke, includes flex hose and metal needles.",
    "price": 499,
    "stock": 120,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-047",
    "title": "Body Sculpture Adjustable Ab Roller Wheel with Knee Pad",
    "description": "Ultra-wide dual wheel design for enhanced stability, non-slip rubber tread, ergonomic comfort handles, and thick foam knee mat.",
    "price": 899,
    "stock": 70,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-048",
    "title": "Puma Cat Hand-Stitched Size 5 Training Soccer Ball",
    "description": "32-panel TPU casing training football with multi-layered polyester backing and rubber bladder for shape stability.",
    "price": 1499,
    "stock": 60,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-049",
    "title": "Hydration Running Belt Waist Pack with Water Bottle Holder",
    "description": "No-bounce lightweight fanny pack with insulated water bottle pocket, touchscreen zipper pouch, and key clip.",
    "price": 1199,
    "stock": 65,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-050",
    "title": "Everlast Heavy Duty Hand Wraps (180-inch) - Pair",
    "description": "Polyester-cotton blend breathable hand wraps with thumb loop and hook-and-loop closure for wrist & knuckle support.",
    "price": 599,
    "stock": 95,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-051",
    "title": "SG Savage Edition Cricket Helmet with Steel Visor",
    "description": "High impact outer shell cricket helmet with sweat-absorbent lining, adjustable steel face guard, and ear protectors.",
    "price": 2799,
    "stock": 35,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop"
    ]
  },
  {
    "_id": "sport-052",
    "title": "Dunlop Fort All Court Tennis Balls (Can of 3)",
    "description": "Premium pressurised tennis balls engineered with HD Durability Cloth for high visibility and long-lasting play on all court surfaces.",
    "price": 799,
    "stock": 90,
    "category": "sports",
    "images": [
      "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&auto=format&fit=crop"
    ]
  }
];

import auth from "./Model/auth.model.js";
import bcrypt from "bcryptjs";

export async function seedProducts() {
  try {
    console.log("🌱 Re-seeding all 208 products into MongoDB collection...");
    await Product.deleteMany({});
    await Product.insertMany(initialProducts);
    console.log("✅ All 208 products successfully seeded into MongoDB!");

    // Seed default user nikhil@gmail.com (preserve existing name/phone)
    const hashedPassword = await bcrypt.hash("nikhil123", 10);
    await auth.updateOne(
      { email: "nikhil@gmail.com" },
      { $setOnInsert: { email: "nikhil@gmail.com", password: hashedPassword, name: "Nikhil", phone: "9876543210" } },
      { upsert: true }
    );
    console.log("✅ Seeded default user nikhil@gmail.com into MongoDB!");
  } catch (err) {
    console.error("❌ Error seeding products to MongoDB:", err.message);
  }
}
