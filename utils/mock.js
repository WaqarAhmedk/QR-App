import {
  Facebook,
  Instagram,
  Linkedin,
  Pinterest,
  Skype,
  Twitter,
  Website,
  Whatsapp,
  Youtube,
} from "@/public/assets/svgs/social";

const NAVLINKS = [
  {
    name: "Home",
    goto: "/",
  },
  {
    name: "Help",
    goto: "",
    childrens: [
      {
        name: "FAQ",
        goto: "/help/faq",
      },
      {
        name: "Support",
        goto: "/help/support",
      },
    ],
  },
  {
    name: "Blog",
    goto: "/blog",
  },
  {
    name: "Pricing",
    goto: "/pricing",
  },
  {
    name: "Contact us",
    goto: "/contact-us",
  },
];

const SOCIAL_ICONS = [
  {
    icon: "/assets/svgs/social/twitter.svg",
    goto: "/",
  },
  {
    icon: "/assets/svgs/social/facebook.svg",
    goto: "/",
  },
  {
    icon: "/assets/svgs/social/instagram.svg",
    goto: "/",
  },
  {
    icon: "/assets/svgs/social/github.svg",
    goto: "/",
  },
];

const FOOTER_LINKS = [
  {
    name: "Home",
    goto: "/",
  },
  {
    name: "Blog",
    goto: "/",
  },
  {
    name: "FAQ",
    goto: "/faq",
  },
  {
    name: "Pricing",
    goto: "/pricing",
  },
  {
    name: "Contact us",
    goto: "/contactus",
  },
];

const MORE_THAN_A_QR = [
  {
    breif: "All team members can rapidly create custom QR codes.",
    title: "Create",
  },
  {
    breif: "Automatically update outdated QR destinations.",
    title: "Update",
  },
  {
    breif: "In-depth analytics monitors QR code performance.",
    title: "Track",
  },
  {
    breif: "Easily control a large number of QR codes across the business.",
    title: "Organize",
  },
];

const QR = [
  {
    title: "Circular",
    image: "/assets/svgs/LandingPage/qr_3.svg",
  },
  {
    title: "Rectangular",
    image: "/assets/svgs/LandingPage/qr_1.svg",
  },
  {
    title: "Colorful",
    image: "/assets/svgs/LandingPage/qr_2.svg",
  },
];

const BANNER_ICONS = [
  {
    title: "URL",
    image: "/assets/svgs/LandingPage/sms.svg",
  },

  {
    title: "PDF",
    image: "/assets/svgs/LandingPage/pdf.svg",
  },
  {
    title: "Email",
    image: "/assets/svgs/LandingPage/email.svg",
  },
  {
    title: `Scan Me to download mobile App`,
    image: "/assets/svgs/LandingPage/qr_purple.svg",
  },
];

const CARDS = [
  {
    title: "Add a Custom Domain",
    image: "/assets/images/person_qr.png",
    breif:
      "Custom domain feature gives you the ability to customize the link displayed on the address bar When the QR code is scanned.",
  },
  {
    title: "Enterprise Level Control",
    image: "/assets/images/pc_graph.png",
    breif:
      "QR code management can quickly become out of control with a lack of visibility. Q1 Box is built for multiple team members to work from one space. Simultaneously create a QR code, track performance or update a destination in one streamlined location.",
  },
];
const NavHelp = [
  {
    id: 1,
    title: "FAQ",
    route: "/help/faq",
  },
  {
    id: 2,
    title: "Support",
    route: "/help/support",
  },
];

const TAB_BAR = [
  { label: "URL", key: "Url" },
  { label: "Advanced Links", key: "AdvanceLinks" },
  { label: "Business Card", key: "BusinessCard" },
  { label: "Social", key: "Social" },
  { label: "Landing Page", key: "LandingPage" },
  { label: "SMS", key: "Sms" },
  { label: "Coupon", key: "Coupon" },
  { label: "Review Collector", key: "ReviewCollector" },
  { label: "Calendar", key: "Calendar" },
  { label: "Forms", key: "Forms" },
  { label: "Download PDF", key: "DownloadPdf" },
  { label: "Menu", key: "Menu" },
  { label: "Show Text", key: "ShowText" },
  { label: "App Download", key: "AppDownload" },
  { label: "Video", key: "Video" },
  { label: "Location", key: "Location" },
  { label: "Make a Call", key: "MakeCall" },
  { label: "Send Email", key: "SendEmail" },
  { label: "Upload Image", key: "UploadImage" },
];

const TAB_BAR_1 = [
  { lable: "URL" },
  { lable: "Advnaced Links" },
  { lable: "Buisness Card" },
  { lable: "Landing Page" },
  { lable: "Review Collector" },
];

const QR_STYLE = [
  {
    image: "/assets/images/circular.png",
    title: "Circular",
    type: "circular",
  },
  {
    image: "/assets/images/standard.png",
    title: "Standard",
    type: "standard",
  },
  {
    image: "/assets/images/with_logo.png",
    title: "With Logo",
    type: "logo",
  },
];
const QR_PRICING = [
  {
    Type: "Feature",
    header: true,
  },
  {
    Type: "Starter",
    price: "8",
    dynamic: "5",
    scans: "25,000",
    users: 1,
    analytics: "Basic",
    bulk: false,
    maxResolution: "1024 x 1024",
    QRShapes: false,
    whiteLabeling: false,
  },
  {
    Type: "Lite",
    price: "24",
    dynamic: "50",
    scans: "75,000",
    users: 1,
    analytics: "Basic",
    bulk: false,
    maxResolution: "2048 x 2048",
    QRShapes: false,
    whiteLabeling: false,
  },
  {
    popular: true,
    Type: "Business",
    price: "49",
    dynamic: "250",
    scans: "250,000",
    users: 2,
    analytics: "Advanced",
    bulk: true,
    maxResolution: "4096 x 4096",
    QRShapes: true,
    whiteLabeling: false,
  },
  {
    Type: "Professional",
    price: "99",
    dynamic: "500",
    scans: "500,000",
    users: 5,
    analytics: "Advanced",
    bulk: true,
    maxResolution: "4096 x 4096",
    QRShapes: true,
    whiteLabeling: false,
  },
  {
    Type: "Enterprise",
    price: "0",
    analytics: "Advanced",
    bulk: true,
    maxResolution: "4096 x 4096",
    QRShapes: true,
    whiteLabeling: true,
  },
];

const ARROW_ICONS = [
  "/assets/svgs/icons/arrow_up.svg",
  "/assets/svgs/icons/arrow_down.svg",
];
const PLUS_MINUS_ICONS = [
  "/assets/svgs/icons/minus.svg",
  "/assets/svgs/icons/plus.svg",
];

const COLOR_PALLETES = [
  {
    palette: [{ color: "#CFD5FF" }, { color: "#303038" }, { color: "#FFFFFF" }],
    status: true,
  },
  {
    palette: [
      {
        color: "#28EDC9",
      },
      {
        color: "#FFFFFF",
      },
      {
        color: "#03A183",
      },
    ],
    status: false,
  },
  {
    palette: [
      {
        color: "#FD264E",
      },
      {
        color: "#FFFFFF",
      },
      {
        color: "#B03D41",
      },
    ],
    status: false,
  },
  {
    palette: [
      {
        color: "#FD264E",
      },
      {
        color: "#FFFFFF",
      },
      {
        color: "#B03D41",
      },
    ],
    status: false,
  },
  {
    palette: [{ color: "#CFD5FF" }, { color: "#303038" }, { color: "#FFFFFF" }],
    status: false,
  },
  {
    palette: [
      {
        color: "#28EDC9",
      },
      {
        color: "#FFFFFF",
      },
      {
        color: "#03A183",
      },
    ],
    status: false,
  },
  {
    palette: [
      {
        color: "#FD264E",
      },
      {
        color: "#FFFFFF",
      },
      {
        color: "#B03D41",
      },
    ],
    status: false,
  },
  {
    palette: [
      {
        color: "#FD264E",
      },
      {
        color: "#FFFFFF",
      },
      {
        color: "#B03D41",
      },
    ],
    status: false,
  },
  {
    palette: [{ color: "#CFD5FF" }, { color: "#303038" }, { color: "#FFFFFF" }],
    status: false,
  },
  {
    palette: [
      {
        color: "#28EDC9",
      },
      {
        color: "#FFFFFF",
      },
      {
        color: "#03A183",
      },
    ],
    status: false,
  },
  {
    palette: [
      {
        color: "#FD264E",
      },
      {
        color: "#FFFFFF",
      },
      {
        color: "#B03D41",
      },
    ],
    status: false,
  },
  {
    palette: [
      {
        color: "#FD264E",
      },
      {
        color: "#FFFFFF",
      },
      {
        color: "#B03D41",
      },
    ],
    status: false,
  },
];

const socialIcons = [
  {
    Icon: ({ isLight }) => <Youtube light={isLight} />,
    name: "youtube",
    url: "https://www.youtube.com",
    type: "youtube",
    displayField: false,
  },
  {
    Icon: ({ isLight }) => <Facebook light={isLight} />,
    name: "facebook",
    url: "https://www.facebook.com",
    type: "facebook",
    displayField: false,
  },
  {
    Icon: ({ isLight }) => <Instagram light={isLight} />,
    name: "instagram",
    url: "https://www.instagram.com",
    type: "instagram",
    displayField: false,
  },
  {
    Icon: ({ isLight }) => <Pinterest light={isLight} />,
    name: "pinterest",
    url: "https://www.pinterest.com",
    type: "pinterest",
    displayField: false,
  },
  {
    Icon: ({ isLight }) => <Twitter light={isLight} />,
    name: "twitter",
    url: "https://www.twitter.com",
    type: "twitter",
    displayField: false,
  },
  {
    Icon: ({ isLight }) => <Linkedin light={isLight} />,
    name: "linkedin",
    url: "https://www.linkedin.com",
    type: "linkedin",
    displayField: false,
  },
  {
    Icon: ({ isLight }) => <Skype light={isLight} />,
    name: "skype",
    url: "https://www.skype.com",
    type: "skype",
    displayField: false,
  },
  {
    Icon: ({ isLight }) => <Whatsapp light={isLight} />,
    name: "whatsapp",
    type: "whatsapp",
    displayField: false,
  },
  {
    Icon: ({ isLight }) => <Website temp={1} light={isLight} />,
    name: "website1",
    url: "https://www.example.com",
    type: "website1",
    displayField: false,
  },
  {
    Icon: ({ isLight }) => <Website temp={2} light={isLight} />,
    name: "website2",
    url: "https://www.example.com",
    type: "website2",
    displayField: false,
  },
  {
    Icon: ({ isLight }) => <Website temp={3} light={isLight} />,
    name: "website3",
    url: "https://www.example.com",
    type: "website3",
    displayField: false,
  },
];

const COLOR_PALLETES_MENU = [
  {
    id: 1,
    palette: [
      { color: "#CFD5FF" },
      { color: "#303038" },
      {
        color: "#28EDC9",
      },
    ],
    isSelected: false,
  },
  {
    id: 2,
    palette: [
      {
        color: "#28EDC9",
      },
      {
        color: "#03A183",
      },
      {
        color: "#28EDC9",
      },
    ],
    isSelected: false,
  },
  {
    id: 3,
    palette: [
      {
        color: "#FD264E",
      },
      {
        color: "#B03D41",
      },
      {
        color: "#28EDC9",
      },
    ],
    isSelected: false,
  },
  {
    id: 4,
    palette: [
      { color: "#CFD5FF" },
      { color: "#28EDC9" },
      {
        color: "#28EDC9",
      },
    ],
    isSelected: false,
  },
];

const COLOR_PALLETES_ADVANCE_LINKS = [
  {
    id: 1,
    palette: [{ color: "#5E61F6" }, { color: "#FD264E" }, { color: "#303038" }],
    isSelected: false,
  },
  {
    id: 2,
    palette: [
      {
        color: "#28EDC9",
      },
      { color: "#CFD5FF" },
      {
        color: "#303038",
      },
    ],
    isSelected: false,
  },
  {
    id: 3,
    palette: [
      {
        color: "#FD264E",
      },
      {
        color: "#CFD5FF",
      },
      {
        color: "#B03D41",
      },
    ],
    isSelected: false,
  },
];

const COLOR_PALLETES_COUPON = [
  {
    id: 1,
    palette: [{ color: "#D9F8C4" }, { color: "#FD264E" }, { color: "#303038" }],
    isSelected: false,
  },
  {
    id: 2,
    palette: [
      {
        color: "#CFD5FF",
      },
      { color: "#D71313" },
      {
        color: "#0D1282",
      },
    ],
    isSelected: false,
  },
  {
    id: 3,
    palette: [
      {
        color: "#FFF9C9",
      },
      {
        color: "#D71313",
      },
      {
        color: "#B03D41",
      },
    ],
    isSelected: false,
  },
];

const COLOR_PALLETES_QR = [
  {
    id: 1,
    palette: [
      { color: "#CFD5FF" },
      { color: "#303038" },
      { color: "#FFFFFF" },
      {
        color: "#03A183",
      },
    ],
    isSelected: false,
  },
  {
    id: 2,
    palette: [
      {
        color: "#28EDC9",
      },
      {
        color: "#FFFFFF",
      },
      {
        color: "#03A183",
      },
      {
        color: "#03A183",
      },
    ],
    isSelected: false,
  },
  {
    id: 3,
    palette: [
      {
        color: "#FD264E",
      },
      {
        color: "#FFFFFF",
      },
      {
        color: "#B03D41",
      },
      {
        color: "#03A183",
      },
    ],
    isSelected: false,
  },
];

const PRODUCT_PALLETE = [
  {
    id: 1,
    palette: [{ color: "#CFD5FF" }, { color: "#303038" }],
    isSelected: false,
  },
  {
    id: 2,
    palette: [
      {
        color: "#28EDC9",
      },
      {
        color: "#FFFFFF",
      },
    ],
    isSelected: false,
  },
  {
    id: 3,
    palette: [
      {
        color: "#FD264E",
      },
      {
        color: "#FFFFFF",
      },
    ],
    isSelected: false,
  },
];

const COLOR_PALLETES_FRAMES = [
  {
    id: 1,
    palette: [{ color: "#CFD5FF" }, { color: "#303038" }],
    isSelected: false,
  },
  {
    id: 2,
    palette: [
      {
        color: "#28EDC9",
      },
      {
        color: "#CFD5FF",
      },
    ],
    isSelected: false,
  },
  {
    id: 3,
    palette: [
      {
        color: "#FD264E",
      },
      {
        color: "#CFD5FF",
      },
    ],
    isSelected: false,
  },
];

const VIDEO_PALLETE = [
  {
    id: 1,
    palette: [
      { color: "#CFD5FF" },
      { color: "#303038" },

      {
        color: "#03A183",
      },
    ],
    isSelected: false,
  },
  {
    id: 2,
    palette: [
      {
        color: "#28EDC9",
      },
      {
        color: "#FFFFFF",
      },
      {
        color: "#03A183",
      },
    ],
    isSelected: false,
  },
  {
    id: 3,
    palette: [
      {
        color: "#FD264E",
      },
      {
        color: "#FFFFFF",
      },
      {
        color: "#03A183",
      },
    ],
    isSelected: false,
  },
];

const ADVANCE_LINKS_INPUTS = [
  {
    placeHolder: "https://www.youtube.com",
    name: "youtube",
  },
  {
    placeHolder: "https://www.facebook.com",
    name: "facebook",
  },
  {
    placeHolder: "https://www.instagram.com",
    name: "instagram",
  },
  {
    placeHolder: "https://www.pinterest.com",
    name: "pinterest",
  },
  {
    placeHolder: "https://www.twitter.com",
    name: "twitter",
  },
  {
    placeHolder: "https://www.linkedin.com",
    name: "linkedin",
  },
  {
    placeHolder: "https://www.skype.com",
    name: "skype",
  },
  {
    placeHolder: "https://www.whatsapp.com",
    name: "whatsapp",
  },
  {
    placeHolder: "https://www.website.com",
    name: "website1",
  },
  {
    placeHolder: "https://www.website.com",
    name: "website2",
  },
  {
    placeHolder: "https://www.website.com",
    name: "website3",
  },
];

const LOGOS = [
  {
    name: "youtube",
    src: "/assets/svgs/icons/youtube_plain.svg",
    isSelected: false,
  },
  {
    name: "facebook",
    src: "/assets/svgs/icons/facebook.svg",
    isSelected: false,
  },
  {
    name: "instagram",
    src: "/assets/svgs/icons/instagram.svg",
    isSelected: false,
  },
  {
    name: "pinterest",
    src: "/assets/svgs/icons/pinterest.svg",
    isSelected: false,
  },
];

const CUSTOMIZE_QR_TABS = [
  {
    name: "TEMPLATES",
    premium: false,
  },
  {
    name: "UPLOAD LOGO",
    premium: true,
  },
  {
    name: "COLOR CHANGE",
    premium: false,
  },
  {
    name: "SHAPE",
    premium: true,
  },
  {
    name: "FRAMES",
    premium: true,
  },
];
const MarketingCard = [
  {
    title: "Your Success Is Our Motivation",
    text: "Facilitating your success is what drives us to bring affordable and impactful tools. Every feature we create is designed to make small and medium-sized businesses more productive and efficient while making it easier to raise brand awareness and generate additional revenue.",
  },
  {
    title: "Reduce Spend & Increase Impact",
    text: "Are you spending a bucket load of cash every time you have to re-print marketiasng collateral? It's time to go down the digital route. Introduce a QR code to business cards, posters, packaging, and any other physical items. This protects your marketing budget and creates a more impactful experience.",
  },
];

const QR_FRAMES = [
  {
    image: "/assets/svgs/Frame/frame_1.svg",
    selected: false,
    type: "frameBoldText",
  },
  {
    image: "/assets/svgs/Frame/frame_2.svg",
    selected: false,
    type: "frameSimple",
  },

  {
    image: "/assets/svgs/Frame/frame_4.svg",
    selected: false,
    type: "frameRibbon",
  },
];
const QR_SHAPES = [
  {
    name: "Data Pattern",
    type: "pattren",
    childrens: [
      {
        image: "/assets/svgs/Shapes/DP_2.svg",
        selected: false,
        mode: "rounded",
      },
      {
        image: "/assets/svgs/Shapes/DP_3.svg",
        selected: false,
        mode: "dots",
      },
    ],
  },
  {
    name: "Eye Frame Type",
    type: "eye-frame",
    childrens: [
      {
        image: "/assets/svgs/Shapes/EFT_1.svg",
        selected: false,
        mode: "eye-frame-circle",
      },
      {
        image: "/assets/svgs/Shapes/EFT_2.svg",
        selected: false,
        mode: "eye-frame-rounded",
      },
      // {
      //   image: '/assets/svgs/Shapes/EFT_3.svg',
      //   selected: false,
      //   mode: 'eye-frame-hexagon',
      // },
      {
        image: "/assets/svgs/Shapes/EFT_4.svg",
        selected: false,
        mode: "eye-frame-dashed",
      },
      {
        image: "/assets/svgs/Shapes/EFT_5.svg",
        selected: false,
        mode: "eye-frame-square-plain-br",
      },
      {
        image: "/assets/svgs/Shapes/EFT_6.svg",
        selected: false,
        mode: "eye-frame-leaf",
      },
      {
        image: "/assets/svgs/Shapes/EFT_7.svg",
        selected: false,
        mode: "eye-frame-plain-square",
      },
    ],
  },
  {
    name: "Eye Ball Type",
    type: "eye-ball",
    childrens: [
      {
        image: "/assets/svgs/Shapes/EBT_1.svg",
        selected: false,
        mode: "eye-ball-circle",
      },
      {
        image: "/assets/svgs/Shapes/EBT_2.svg",
        selected: false,
        mode: "eye-ball-plain-square",
      },
      {
        image: "/assets/svgs/Shapes/EBT_3.svg",
        selected: false,
        mode: "eye-ball-square-plain-br",
      },
      {
        image: "/assets/svgs/Shapes/EBT_4.svg",
        selected: false,
        mode: "eye-ball-square-plain-bl",
      },
      {
        image: "/assets/svgs/Shapes/EBT_5.svg",
        selected: false,
        mode: "eye-ball-square-plain-tr",
      },
      {
        image: "/assets/svgs/Shapes/EBT_6.svg",
        selected: false,
        mode: "eye-ball-square-plain-tl",
      },
      // {
      //   image: '/assets/svgs/Shapes/EBT_7.svg',
      //   selected: false,
      //   mode: 'eye-ball-hexagon',
      // },
    ],
  },
];

const QR_STYLES = [
  {
    image: "/assets/svgs/qr/qr_1.svg",
    selected: false,
    type: "plain",
  },
  {
    image: "/assets/svgs/qr/qr_5.svg",
    selected: false,
    type: "dots",
  },
  // {
  //   image: '/assets/svgs/qr/qr_4.svg',
  //   selected: false,
  //   type: 'circular'
  // },
  {
    image: "/assets/svgs/qr/qr_3.svg",
    selected: false,
    type: "ScanButton",
  },
  {
    image: "/assets/svgs/qr/qr_2.svg",
    selected: false,
    type: "ScanTagButton",
  },
];

const LIST_DATA = [
  {
    label: "Option 1",
  },
  {
    label: "Option 2",
  },
  {
    label: "Option 3",
  },
];

const BLOG_CARD = [
  {
    image: "/assets/images/Blog_1.png",
    Date: "Mar 08 2023",
    Title: "Headline",
    Description: "Little Description",
  },
  {
    image: "/assets/images/Blog_2.png",
    Date: "Mar 08 2023",
    Title: "Headline",
    Description: "Little Description",
  },
  {
    image: "/assets/images/Blog_3.png",
    Date: "Mar 08 2023",
    Title: "Headline",
    Description: "Little Description",
  },
  {
    image: "/assets/images/Blog_4.png",
    Date: "Mar 08 2023",
    Title: "Headline",
    Description: "Little Description",
  },
  {
    image: "/assets/images/Blog_5.png",
    Date: "Mar 08 2023",
    Title: "Headline",
    Description: "Little Description",
  },
  {
    image: "/assets/images/Blog_6.png",
    Date: "Mar 08 2023",
    Title: "Headline",
    Description: "Little Description",
  },
];

const DOWNLOAD_OPTIONS_BTNS = [
  {
    label: "PNG",
    id: "PNG",
    selected: true,
  },

  {
    label: "SVG",
    id: "SVG",
    selected: false,
  },
];

const ERORR_LEVEL_OPTIONS = [
  {
    text: "L",
    id: "L",
    selected: false,
  },
  {
    text: "M",
    id: "M",
    selected: true,
  },
  {
    text: "Q",
    id: "Q",
    selected: false,
  },
  {
    text: "H",
    id: "H",
    selected: false,
  },
];

const QUALITY_BTNS = [
  {
    text: "HIGH",
    id: "HIGH",
    selected: true,
    type: "fill",
  },
  {
    text: "LOW",
    id: "LOW",
    selected: false,
    type: "graident",
  },
];

const SECONDS = Array.from({ length: 60 }, (_, index) => {
  const value = index < 10 ? `0${index}` : `${index}`; // add leading zero to single digit values
  return { value, label: value };
});

const HOURS = Array.from({ length: 100 }, (_, index) => {
  const value = index < 10 ? `0${index}` : `${index}`;
  return { value, label: value };
});

const MINUTES = Array.from({ length: 60 }, (_, index) => {
  const value = index < 10 ? `0${index}` : `${index}`;
  return { value, label: value };
});

export {
  ADVANCE_LINKS_INPUTS,
  ARROW_ICONS,
  BANNER_ICONS,
  BLOG_CARD,
  CARDS,
  COLOR_PALLETES_ADVANCE_LINKS,
  COLOR_PALLETES,
  CUSTOMIZE_QR_TABS,
  DOWNLOAD_OPTIONS_BTNS,
  ERORR_LEVEL_OPTIONS,
  FOOTER_LINKS,
  LIST_DATA,
  LOGOS,
  MORE_THAN_A_QR,
  NavHelp,
  NAVLINKS,
  PLUS_MINUS_ICONS,
  QR_FRAMES,
  QR_PRICING,
  QR_SHAPES,
  QR_STYLE,
  MarketingCard,
  QR_STYLES,
  QR,
  QUALITY_BTNS,
  SOCIAL_ICONS,
  socialIcons,
  TAB_BAR_1,
  TAB_BAR,
  COLOR_PALLETES_QR,
  COLOR_PALLETES_FRAMES,
  SECONDS,
  HOURS,
  MINUTES,
  COLOR_PALLETES_MENU,
  VIDEO_PALLETE,
  PRODUCT_PALLETE,
  COLOR_PALLETES_COUPON,
};

export function formatFileSize(fileSize) {
  const units = ["B", "KB", "MB", "GB", "TB"];
  let size = fileSize;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  const formattedSize = size.toFixed(2) + units[unitIndex];
  return formattedSize;
}
