import { FormEvent, ReactNode, useEffect, useState } from "react";
import { AdminLogin, AdminPortal, seedAppointments, type AdminAppointment } from "./AdminPanel";
import aaidLogo from "./assets/associates/aaid.png";
import invisalignLogo from "./assets/associates/invisalign-provider.png";
import smilelignLogo from "./assets/associates/smilelign.png";
import clinicLogo from "./assets/oxford-dental-centre-logo.png";

type Page =
  | "home"
  | "treatments"
  | "treatment"
  | "emergency"
  | "fees"
  | "first-visit"
  | "about"
  | "contact";

const clinicImage =
  "https://images.unsplash.com/photo-1629909613654-28e377c37b09?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1800";
const chairImage =
  "https://images.unsplash.com/photo-1643660527098-559f89e45a92?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1400";
const roomImage =
  "https://images.unsplash.com/photo-1728342057953-94bfad8f0e7e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200";
const careImage =
  "https://images.unsplash.com/photo-1777331903190-341a3dd0441b?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200";

const navItems: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Treatments", page: "treatments" },
  { label: "Emergencies", page: "emergency" },
  { label: "Fees", page: "fees" },
  { label: "First visits", page: "first-visit" },
  { label: "About", page: "about" },
];

export interface TreatmentDetail {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  image: string;
  heading: string;
  intro: string;
  sections: {
    title?: string;
    paragraphs?: string[];
    bullets?: string[];
    checklist?: string[];
  }[];
}

const treatmentsData: TreatmentDetail[] = [
  {
    slug: "cosmetic",
    title: "Cosmetic Dentistry",
    subtitle: "Clear, considerate treatment planning focused on your comfort, dental health and long-term wellbeing.",
    tag: "Cosmetic",
    image: careImage,
    heading: "Innovative Dental Solutions",
    intro: "Transform your smile with advanced cosmetic treatments tailored to your exact aesthetic goals.",
    sections: [
      {
        title: "Porcelain Veneers",
        paragraphs: [
          "Correct chipped, uneven, stained, or gapped teeth with thin ceramic shells custom-crafted to your smile."
        ],
        bullets: [
          "Natural appearance",
          "Durable and stain-resistant",
          "Dramatic improvement in just a few visits",
          "Instantly brightens and balances your smile"
        ]
      },
      {
        title: "The Procedure:",
        bullets: [
          "Consultation & Smile Design",
          "Tooth Preparation: (a small amount of enamel is shaved)",
          "Impressions or scans",
          "Custom Veneer Creation",
          "Bonding & Final Reveal"
        ]
      },
      {
        title: "Composite Bonding",
        paragraphs: [
          "An affordable, non-invasive way to reshape, brighten, and correct flaws in your teeth – all in a single visit.",
          "Get a flawless natural-looking smile without harming your natural teeth."
        ],
        bullets: [
          "Perfect for cracks, chips, and gaps",
          "Preserves natural tooth structure",
          "Immediate results with no downtime"
        ]
      },
      {
        title: "Professional Teeth Whitening",
        paragraphs: ["Brighten Your Smile. Boost Your Confidence."],
        bullets: [
          "Brighten your smile with our in-clinic or at-home whitening kits:",
          "Safe and effective",
          "Up to 8 shades whiter",
          "Custom-fitted for comfort and results"
        ]
      }
    ]
  },
  {
    slug: "general",
    title: "General Dentistry Services",
    subtitle: "Tooth-Coloured Fillings – Smile with Confidence Ready to laugh freely and smile proudly?",
    tag: "General care",
    image: chairImage,
    heading: "Tooth-Coloured Fillings – Smile with Confidence Ready to laugh freely and smile proudly?",
    intro: "At Oxford Dental Centre, our expertly crafted tooth-coloured fillings give you every reason to show off your smile. Unlike traditional grey amalgam fillings, our modern, dental care materials blend seamlessly with your natural teeth – so no one will ever know you've had dental work done. These virtually invisible fillings are the ideal solution if you want a flawless, confident smile.",
    sections: [
      {
        title: "Why choose Oxford Dental Centre for your general dentistry needs?",
        checklist: [
          "Natural-looking beautiful results",
          "Performed by a highly skilled, experienced dentist",
          "Feel confident to smile, laugh, and live boldly"
        ],
        paragraphs: [
          "We use the latest techniques to ensure your comfort throughout the procedure.",
          "In a relaxed atmosphere, peacefully restore your tooth's appearance and function without compromising your bite.",
          "Our goal is simple: to leave you with a radiant, healthy smile you will be proud to share."
        ]
      }
    ]
  },
  {
    slug: "root-canal",
    title: "Root Canal",
    subtitle: "Clear, considerate treatment planning focused on your comfort, dental health and long-term wellbeing.",
    tag: "Preserve",
    image: roomImage,
    heading: "Root Canal Treatment: Pain-Free Endodontic Care at Oxford Dental Centre",
    intro: "Root canal therapy doesn't have to be a daunting experience. It is a highly effective, pain-relieving solution designed to save an infected tooth from extraction while restoring your dental comfort and overall health.",
    sections: [
      {
        title: "Signs You May Need a Root Canal",
        bullets: [
          "Persistent toothache or throbbing pain",
          "Sensitivity to hot or cold",
          "Swollen gums or tenderness",
          "Discomfort when biting or chewing",
          "Darkened or discolored teeth"
        ],
        paragraphs: [
          "If you're experiencing any of these symptoms, don't delay. Early treatment can prevent complications."
        ]
      },
      {
        title: "What to Expect:",
        bullets: [
          "We'll numb the area to ensure your complete comfort.",
          "The infected pulp is carefully removed.",
          "The canals are thoroughly cleaned and sealed.",
          "A crown is placed to protect and strengthen the tooth."
        ],
        paragraphs: [
          "Typically, treatment requires one to two visits, depending on the tooth's condition."
        ]
      },
      {
        title: "After Treatment Care",
        paragraphs: [
          "Your tooth may be sensitive for a few days, but this sensitivity is temporary. We recommend placing a crown afterward to ensure long-term protection and to restore the tooth's strength and function."
        ]
      }
    ]
  },
  {
    slug: "orthodontic",
    title: "Orthodontic Treatment",
    subtitle: "Clear, considerate treatment planning focused on your comfort, dental health and long-term wellbeing.",
    tag: "Straighten",
    image: clinicImage,
    heading: "Healthy smiles start with a trusted routine.",
    intro: "Achieve a straight, confident smile with our advanced orthodontic treatments, including popular clear aligners like Invisalign, Smilelign, and more.",
    sections: []
  },
  {
    slug: "implants",
    title: "Dental Implants",
    subtitle: "Clear, considerate treatment planning focused on your comfort, dental health and long-term wellbeing.",
    tag: "Replace",
    image: careImage,
    heading: "Permanent Tooth Replacement That Feels Natural",
    intro: "Missing teeth? Dental implants offer a permanent dental solution that provides a long-term, stable option, looking, feeling, and functioning just like natural teeth.",
    sections: [
      {
        title: "Why choose dental implants?",
        bullets: [
          "Prevent bone loss",
          "Eat, speak, and smile with confidence",
          "No slipping or clicking like dentures",
          "Maintain facial structures and oral health"
        ]
      }
    ]
  },
  {
    slug: "crowns",
    title: "Dental Crowns",
    subtitle: "Clear, considerate treatment planning focused on your comfort, dental health and long-term wellbeing.",
    tag: "Restorative",
    image: chairImage,
    heading: "Restore Your Smile with Durable, Natural looking crowns",
    intro: "At Oxford Dental centre, our custom-made dental crowns and bridges are expertly designed to restore damaged or missing teeth with strength, functionality, and a natural look.",
    sections: [
      {
        title: "Benefits of Dental Crowns",
        checklist: [
          "Restores confidence",
          "Restores strength and function",
          "Protects against further damage",
          "Improves appearance and alignment",
          "Blends seamlessly with natural teeth",
          "Long-lasting and durable"
        ]
      }
    ]
  },
  {
    slug: "wisdom-teeth",
    title: "Wisdom Teeth Removal",
    subtitle: "Assessment and treatment for painful, impacted or problematic wisdom teeth.",
    tag: "Oral surgery",
    image: roomImage,
    heading: "Wisdom Teeth Removal",
    intro: "Wisdom teeth typically emerge in your late teens or early twenties. While some people never develop these third molars, others may face issues such as pain, crowding, or infections due to impacted wisdom teeth.",
    sections: [
      {
        title: "Symptoms of impacted wisdom teeth may include:",
        bullets: [
          "Pain or swelling",
          "Gum infection",
          "Damage to adjacent teeth",
          "Cysts or decay"
        ]
      }
    ]
  },
  {
    slug: "dentures",
    title: "Dentures",
    subtitle: "Comfortable, natural-looking solutions designed to restore your smile and confidence.",
    tag: "Restore",
    image: careImage,
    heading: "Dentures in Oxford",
    intro: "Dentures are removable prosthetic devices used to replace missing teeth and surrounding gum tissue.",
    sections: [
      {
        title: "Benefits of Dentures from Oxford Dental Centre",
        checklist: [
          "Natural Appearance – Designed to match original teeth.",
          "Comfortable Fit – Secure fit with minimal irritation.",
          "Facial Support – Reduces wrinkles and enhances facial structure.",
          "Improved Function – Regain ability to eat, speak, and smile."
        ]
      }
    ]
  },
  {
    slug: "extractions",
    title: "Oral and Teeth Extractions",
    subtitle: "Considered, gentle removal care with clear guidance before and after your appointment.",
    tag: "Oral surgery",
    image: chairImage,
    heading: "Oral and Teeth Extractions",
    intro: "Gentle removal care with clear guidance before and after your appointment.",
    sections: []
  }
];

const treatments = [
  {
    title: "Dental emergencies",
    text: "Prompt advice and urgent care when pain, swelling or dental injury cannot wait.",
    image: roomImage,
    tag: "Urgent care",
    page: "emergency" as Page,
    slug: "emergency",
  },
  {
    title: "Dentures",
    text: "Comfortable, natural-looking solutions designed to restore your smile and confidence.",
    image: careImage,
    tag: "Restore",
    page: "treatment" as Page,
    slug: "dentures",
  },
  {
    title: "Root Canal",
    text: "Careful treatment to relieve pain, remove infection and help preserve your natural tooth.",
    image: chairImage,
    tag: "Preserve",
    page: "treatment" as Page,
    slug: "root-canal",
  },
  {
    title: "Orthodontic treatment",
    text: "Personalised options to improve alignment, bite and long-term dental health.",
    image: clinicImage,
    tag: "Straighten",
    page: "treatment" as Page,
    slug: "orthodontic",
  },
  {
    title: "Dental implants",
    text: "A secure, long-lasting solution for replacing missing teeth.",
    image: careImage,
    tag: "Replace",
    page: "treatment" as Page,
    slug: "implants",
  },
  {
    title: "Oral and Teeth Extractions",
    text: "Considered, gentle removal care with clear guidance before and after your appointment.",
    image: roomImage,
    tag: "Oral surgery",
    page: "treatment" as Page,
    slug: "extractions",
  },
  {
    title: "Wisdom teeth removal",
    text: "Assessment and treatment for painful, impacted or problematic wisdom teeth.",
    image: chairImage,
    tag: "Oral surgery",
    page: "treatment" as Page,
    slug: "wisdom-teeth",
  },
  {
    title: "General Dentistry",
    text: "Tooth-coloured fillings and routine care for a healthy, confident smile.",
    image: roomImage,
    tag: "General care",
    page: "treatment" as Page,
    slug: "general",
  },
  {
    title: "Cosmetic Treatments",
    text: "Transform your smile with porcelain veneers, composite bonding, and professional whitening.",
    image: careImage,
    tag: "Cosmetic",
    page: "treatment" as Page,
    slug: "cosmetic",
  },
  {
    title: "Dental Crowns",
    text: "Expertly designed crowns and bridges to restore damaged or missing teeth.",
    image: chairImage,
    tag: "Restorative",
    page: "treatment" as Page,
    slug: "crowns",
  },
  {
    title: "Dental Bridges",
    text: "Reliable bridgework to seamlessly bridge gaps left by missing teeth.",
    image: careImage,
    tag: "Restorative",
    page: "treatment" as Page,
    slug: "crowns",
  },
  {
    title: "Oral Hygiene & Bad Breath",
    text: "Professional cleaning and tailored guidance for pristine oral hygiene.",
    image: roomImage,
    tag: "Hygiene",
    page: "treatment" as Page,
    slug: "general",
  }
];

const fees = [
  ["Adult consultation", "£95"],
  ["Child consultation", "£65"],
  ["Hygiene appointment", "from £89"],
  ["White filling", "from £185"],
  ["Ceramic crown", "from £795"],
  ["Teeth whitening", "from £395"],
  ["Invisalign", "from £3,250"],
];

function Icon({
  name,
  size = 20,
  className = "",
}: {
  name: "arrow" | "phone" | "clock" | "pin" | "menu" | "close" | "check" | "plus";
  size?: number;
  className?: string;
}) {
  const paths: Record<string, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92Z" />
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h16" />
        <path d="M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="m18 6-12 12" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    >
      {paths[name]}
    </svg>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [activeTreatmentSlug, setActiveTreatmentSlug] = useState<string>("cosmetic");
  const [menuOpen, setMenuOpen] = useState(false);
  const [portalMode, setPortalMode] = useState<"public" | "login" | "admin">("public");
  const [appointments, setAppointments] = useState<AdminAppointment[]>(seedAppointments);

  const navigate = (next: Page, treatmentSlug?: string) => {
    setPage(next);
    if (treatmentSlug) {
      setActiveTreatmentSlug(treatmentSlug);
    }
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.title = "Oxford Dental Centre";
  }, []);

  if (portalMode === "login") {
    return (
      <AdminLogin onBack={() => setPortalMode("public")} onLogin={() => setPortalMode("admin")} />
    );
  }

  if (portalMode === "admin") {
    return (
      <AdminPortal
        appointments={appointments}
        onLogout={() => setPortalMode("login")}
        onWebsite={() => setPortalMode("public")}
        setAppointments={setAppointments}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f2] text-[#172c32]">
      <Header
        menuOpen={menuOpen}
        navigate={navigate}
        onAdminLogin={() => setPortalMode("login")}
        page={page}
        setMenuOpen={setMenuOpen}
      />
      <main>
        {page === "home" && <HomePage navigate={navigate} />}
        {page === "treatments" && <TreatmentsPage navigate={navigate} />}
        {page === "treatment" && <TreatmentPage navigate={navigate} slug={activeTreatmentSlug} />}
        {page === "emergency" && <EmergencyPage navigate={navigate} />}
        {page === "fees" && <FeesPage navigate={navigate} />}
        {page === "first-visit" && <FirstVisitPage navigate={navigate} />}
        {page === "about" && <AboutPage navigate={navigate} />}
        {page === "contact" && <ContactPage setAppointments={setAppointments} />}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

function Header({
  page,
  navigate,
  menuOpen,
  setMenuOpen,
  onAdminLogin,
}: {
  page: Page;
  navigate: (page: Page, slug?: string) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  onAdminLogin: () => void;
}) {
  return (
    <>
      <div className="bg-[#14383d] px-5 py-2.5 text-[11px] tracking-[.12em] text-white/80 uppercase">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-4 sm:gap-6">
          <span className="hidden sm:inline">Independent dental care in the heart of Oxford</span>
          <a
            className="ml-auto hidden items-center gap-2 transition hover:text-white sm:flex"
            href="tel:+441865493372"
          >
            <Icon name="phone" size={14} /> +44 1865 493372
          </a>
          <button
            className="border-l border-white/20 pl-4 font-semibold text-white transition hover:text-[#9bc8bf] sm:pl-6"
            onClick={onAdminLogin}
          >
            Staff admin login
          </button>
        </div>
      </div>
      <header className="sticky top-0 z-50 border-b border-[#16383e]/10 bg-[#f7f7f2]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[82px] max-w-7xl items-center px-5 lg:px-8">
          <button className="group mr-auto shrink-0" onClick={() => navigate("home")}>
            <img
              alt="Oxford Dental Centre — Personalised Care"
              className="h-[62px] w-auto transition group-hover:opacity-80"
              src={clinicLogo}
            />
          </button>
          <nav className="hidden items-center gap-6 xl:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                className={`nav-link ${page === item.page || (page === "treatment" && item.page === "treatments") ? "active" : ""}`}
                key={item.page}
                onClick={() => navigate(item.page)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            className="button-primary ml-8 hidden lg:flex"
            onClick={() => navigate("contact")}
          >
            Book appointment <Icon name="arrow" size={17} />
          </button>
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="ml-5 grid h-11 w-11 place-items-center rounded-full border border-[#14383d]/15 xl:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-[#14383d]/10 bg-[#f7f7f2] px-5 py-5 xl:hidden">
            <div className="mx-auto grid max-w-7xl gap-1">
              {navItems.map((item) => (
                <button
                  className="border-b border-[#14383d]/10 py-3 text-left font-medium"
                  key={item.page}
                  onClick={() => navigate(item.page)}
                >
                  {item.label}
                </button>
              ))}
              <button className="button-primary mt-4 w-full" onClick={() => navigate("contact")}>
                Book appointment <Icon name="arrow" size={17} />
              </button>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

function HomePage({ navigate }: { navigate: (page: Page, slug?: string) => void }) {
  const [review, setReview] = useState(0);
  const reviews = [
    {
      quote:
        "The whole team made me feel completely at ease. The care was thoughtful, unhurried and genuinely kind.",
      name: "Emily R.",
    },
    {
      quote:
        "A beautiful practice with an exceptional team. Every part of my treatment was explained clearly.",
      name: "James T.",
    },
    {
      quote:
        "The most comfortable dental experience I have had. I left feeling listened to and confident.",
      name: "Sophie M.",
    },
  ];

  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-[#dfeeea]">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[56%]">
          <img
            alt="Bright and modern treatment room at Oxford Dental Centre"
            className="h-full w-full object-cover"
            src={clinicImage}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#dfeeea] via-[#dfeeea]/30 to-transparent lg:from-[#dfeeea]/50" />
        </div>
        <div className="relative mx-auto flex min-h-[720px] max-w-7xl items-center px-5 py-24 lg:px-8">
          <div className="max-w-[650px]">
            <p className="eyebrow">Oxford’s independent dental practice</p>
            <h1 className="mt-7 font-serif text-[clamp(3.4rem,7vw,6.8rem)] leading-[.88] font-medium tracking-[-.04em]">
              Care that feels
              <span className="block italic text-[#477c74]">wonderfully human.</span>
            </h1>
            <p className="mt-8 max-w-lg text-lg leading-8 text-[#3e565a]">
              Modern dentistry, delivered with time, clarity and genuine kindness in the heart of
              Oxford.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <button className="button-primary" onClick={() => navigate("contact")}>
                Book your visit <Icon name="arrow" size={18} />
              </button>
              <button className="button-secondary" onClick={() => navigate("treatments")}>
                Explore treatments
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-start gap-14 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Your dental home</p>
              <h2 className="section-title mt-5">A calmer kind of dentistry.</h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <p className="text-xl leading-9 text-[#41585c]">
                We believe exceptional dentistry begins with listening. Our independent Oxford
                practice brings clinical expertise and thoughtful technology together in a space
                designed around you.
              </p>
              <div className="border-l border-[#14383d]/15 pl-7">
                {["Unhurried appointments", "Clear, honest advice", "Thoughtful modern care"].map(
                  (item) => (
                    <div
                      className="flex items-center gap-3 border-b border-[#14383d]/10 py-3"
                      key={item}
                    >
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-[#9bc8bf]">
                        <Icon name="check" size={14} />
                      </span>
                      <span className="font-medium">{item}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#14383d] py-24 text-white lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-[#9bc8bf]">What we offer</p>
              <h2 className="mt-5 max-w-2xl font-serif text-5xl leading-tight md:text-6xl">
                Care for every chapter of your smile.
              </h2>
            </div>
            <button className="button-light" onClick={() => navigate("treatments")}>
              View all treatments <Icon name="arrow" size={18} />
            </button>
          </div>
          <div className="grid gap-px overflow-hidden bg-white/15 md:grid-cols-3">
            {treatments.slice(0, 3).map((treatment, index) => (
              <button
                className="group relative min-h-[480px] overflow-hidden bg-[#14383d] text-left"
                key={treatment.title}
                onClick={() => navigate(treatment.page, treatment.slug)}
              >
                <img
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-105 group-hover:opacity-50"
                  src={treatment.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b292e] via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <span className="text-xs tracking-[.18em] text-[#c1ded8] uppercase">
                    0{index + 1} · {treatment.tag}
                  </span>
                  <h3 className="mt-3 font-serif text-3xl">{treatment.title}</h3>
                  <p className="mt-3 max-w-sm leading-7 text-white/75">{treatment.text}</p>
                  <span className="mt-6 flex items-center gap-2 text-sm font-semibold">
                    Learn more <Icon name="arrow" size={16} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div className="relative">
              <img
                alt="A welcoming modern dental treatment space"
                className="aspect-[4/5] w-[85%] object-cover"
                src={chairImage}
              />
              <div className="absolute right-0 bottom-[-8%] w-[48%] bg-[#e4b982] p-7">
                <p className="font-serif text-5xl">15+</p>
                <p className="mt-2 text-sm leading-6">years of trusted dental care in Oxford</p>
              </div>
            </div>
            <div>
              <p className="eyebrow">Designed around you</p>
              <h2 className="section-title mt-5">Expert care. Without the clinical feeling.</h2>
              <p className="body-copy mt-7">
                From our calm rooms to the way we explain each option, every detail is here to make
                dental care feel easier. You will always know what is happening, why it matters and
                what comes next.
              </p>
              <button className="text-link mt-9" onClick={() => navigate("about")}>
                Meet the practice <Icon name="arrow" size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e1ede9] py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <p className="eyebrow">Kind words</p>
          <div className="mt-8 text-[#d59d55]">★★★★★</div>
          <blockquote className="mt-8 font-serif text-3xl leading-snug md:text-5xl">
            “{reviews[review].quote}”
          </blockquote>
          <p className="mt-7 text-sm font-semibold tracking-[.14em] uppercase">
            {reviews[review].name}
          </p>
          <div className="mt-10 flex justify-center gap-2">
            {reviews.map((item, index) => (
              <button
                aria-label={`Show review by ${item.name}`}
                className={`h-2 rounded-full transition-all ${review === index ? "w-8 bg-[#14383d]" : "w-2 bg-[#14383d]/25"}`}
                key={item.name}
                onClick={() => setReview(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="py-12 bg-white border-t border-[#14383d]/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
          <p className="eyebrow mb-6">Proudly associated with</p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            <img alt="Invisalign provider logo" className="h-10 w-auto object-contain" src={invisalignLogo} />
            <img alt="AAID logo" className="h-10 w-auto object-contain" src={aaidLogo} />
            <img alt="Smilelign logo" className="h-10 w-auto object-contain" src={smilelignLogo} />
          </div>
        </div>
      </div>
    </>
  );
}

function PageHero({
  eyebrow,
  title,
  text,
  image = clinicImage,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[#14383d] text-white">
      <div className="absolute inset-y-0 right-0 w-full opacity-45 lg:w-1/2 lg:opacity-75">
        <img alt="" className="h-full w-full object-cover" src={image} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#14383d] via-[#14383d]/35 to-transparent" />
      </div>
      <div className="relative mx-auto flex min-h-[520px] max-w-7xl items-end px-5 py-20 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow text-[#9bc8bf]">{eyebrow}</p>
          <h1 className="mt-5 font-serif text-[clamp(3.4rem,7vw,6.3rem)] leading-[.95] font-medium tracking-[-.03em]">
            {title}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-white/75">{text}</p>
        </div>
      </div>
    </section>
  );
}

function TreatmentsPage({ navigate }: { navigate: (page: Page, slug?: string) => void }) {
  return (
    <>
      <PageHero
        eyebrow="Treatment page"
        image={careImage}
        text="From everyday prevention to advanced restorative care, our team brings clarity, comfort and precision to every treatment."
        title="Thoughtful care for every smile."
      />
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 grid gap-8 lg:grid-cols-2">
            <h2 className="section-title">Treatments, tailored to you.</h2>
            <p className="body-copy">
              No two people are the same, so no two care plans should be either. We take time to
              understand what matters to you and explain every option without pressure.
            </p>
          </div>
          <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {treatments.map((treatment, index) => (
              <article className="group" key={treatment.title}>
                <button
                  className="block w-full overflow-hidden text-left"
                  onClick={() => navigate(treatment.page, treatment.slug)}
                >
                  <img
                    alt=""
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                    src={treatment.image}
                  />
                </button>
                <p className="mt-6 text-xs tracking-[.16em] text-[#58736f] uppercase">
                  0{index + 1} · {treatment.tag}
                </p>
                <h3 className="mt-2 font-serif text-3xl">{treatment.title}</h3>
                <p className="mt-3 leading-7 text-[#52666a]">{treatment.text}</p>
                <button className="text-link mt-5" onClick={() => navigate(treatment.page, treatment.slug)}>
                  Learn more <Icon name="arrow" size={17} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="py-12 bg-white border-t border-[#14383d]/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
          <p className="eyebrow mb-6">Proudly associated with</p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            <img alt="Invisalign provider logo" className="h-10 w-auto object-contain" src={invisalignLogo} />
            <img alt="AAID logo" className="h-10 w-auto object-contain" src={aaidLogo} />
            <img alt="Smilelign logo" className="h-10 w-auto object-contain" src={smilelignLogo} />
          </div>
        </div>
      </div>

      <CTA navigate={navigate} />
    </>
  );
}

function TreatmentPage({ navigate, slug }: { navigate: (page: Page, slug?: string) => void; slug: string }) {
  const data = treatmentsData.find((t) => t.slug === slug) || treatmentsData[0];

  return (
    <>
      <PageHero
        eyebrow="Treatment details"
        image={data.image}
        text={data.subtitle}
        title={data.title}
      />
      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1.2fr_.8fr] lg:px-8">
          <div>
            <p className="eyebrow">Everyday dental care</p>
            <h2 className="section-title mt-5">{data.heading}</h2>
            <p className="body-copy mt-7">{data.intro}</p>

            {data.sections.map((sec, idx) => (
              <div key={idx} className="mt-10">
                {sec.title && <h3 className="font-serif text-2xl text-[#14383d] mb-4">{sec.title}</h3>}
                {sec.paragraphs?.map((p, pIdx) => (
                  <p key={pIdx} className="body-copy mt-4">{p}</p>
                ))}
                {sec.bullets && (
                  <ul className="mt-4 space-y-3">
                    {sec.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3">
                        <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-[#9bc8bf]">
                          <Icon name="check" size={10} />
                        </span>
                        <span className="text-[#485f63] font-medium">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {sec.checklist && (
                  <div className="mt-6 space-y-4">
                    {sec.checklist.map((check, cIdx) => (
                      <div className="flex items-center gap-3 border-b border-[#14383d]/15 pb-3" key={cIdx}>
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#9bc8bf]">
                          <Icon name="check" size={13} />
                        </span>
                        <span className="font-medium">{check}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <aside className="self-start bg-[#e1ede9] p-8 lg:p-10">
            <p className="eyebrow">Treatment quick details</p>
            <p className="mt-4 leading-7 text-[#51676a]">
              Call our friendly team today on 01865 493372 or 07985 716665 to book your appointment or learn more about how our treatments can transform your smile.
            </p>
            <button className="button-primary mt-8 w-full" onClick={() => navigate("contact")}>
              Ask about treatment <Icon name="arrow" size={18} />
            </button>
          </aside>
        </div>
      </section>

      <section className="bg-[#14383d] py-24 text-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="eyebrow text-[#9bc8bf]">Treatment fees</p>
          <h2 className="mt-5 font-serif text-5xl">Clear fees. No surprises.</h2>
          <div className="mt-10 grid gap-px bg-white/15 md:grid-cols-2">
            {fees.map(([name, price]) => (
              <div className="flex justify-between bg-[#14383d] p-6" key={name}>
                <span>{name}</span>
                <strong>{price}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-12 bg-white border-t border-[#14383d]/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
          <p className="eyebrow mb-6">Proudly associated with</p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            <img alt="Invisalign provider logo" className="h-10 w-auto object-contain" src={invisalignLogo} />
            <img alt="AAID logo" className="h-10 w-auto object-contain" src={aaidLogo} />
            <img alt="Smilelign logo" className="h-10 w-auto object-contain" src={smilelignLogo} />
          </div>
        </div>
      </div>

      <CTA navigate={navigate} />
    </>
  );
}

function EmergencyPage({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <>
      <PageHero
        eyebrow="Oxford Dental Centre"
        image={chairImage}
        text="Prompt, compassionate emergency dental care for sudden pain, swelling, trauma or dental infection."
        title="Dental emergencies."
      />
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_.72fr]">
            <div>
              <p className="eyebrow">What to do in a dental emergency</p>
              <h2 className="section-title mt-5">We are here when you need us.</h2>
              <p className="body-copy mt-7">
                If you are experiencing sudden tooth pain, swelling, trauma or a dental infection,
                call us immediately. We prioritise emergency dental care to help you get fast and
                effective relief when you need it most.
              </p>
            </div>
            <aside className="bg-[#e4b982] p-8 lg:p-10">
              <p className="eyebrow">Dental emergency numbers</p>
              <div className="mt-5 space-y-3">
                <a
                  className="block font-serif text-3xl transition hover:opacity-70 sm:text-4xl"
                  href="tel:+441865493372"
                >
                  01865 493372
                </a>
                <span className="block text-xs tracking-[.15em] uppercase">or</span>
                <a
                  className="block font-serif text-3xl transition hover:opacity-70 sm:text-4xl"
                  href="tel:+447985716665"
                >
                  07985 716665
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <CTA navigate={navigate} />
    </>
  );
}

function FeesPage({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <>
      <PageHero
        eyebrow="Fees and finances"
        image={careImage}
        text="Enjoy dental fee transparency with no hidden costs, ensuring you always know what you're paying for."
        title="Clarity at every step."
      />
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-20 max-w-4xl">
            <h2 className="section-title">Transparent Dental Fees and Clear Communication</h2>
            <p className="body-copy mt-7 max-w-4xl">
              Oxford Dental Centre is dedicated to ensuring dental fee transparency through a clear
              pricing model. We provide comprehensive treatment plans and straightforward
              explanations of your care, helping you fully understand the value of your treatment.
            </p>
          </div>
          <div className="grid gap-14 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="eyebrow">Service fees and finances</p>
              <h2 className="section-title mt-5">A guide to our fees.</h2>
              <div className="mt-10 border-t border-[#14383d]/20">
                {fees.map(([service, price]) => (
                  <div
                    className="flex items-center justify-between gap-5 border-b border-[#14383d]/15 py-5"
                    key={service}
                  >
                    <span>{service}</span>
                    <strong>{price}</strong>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-[#e1ede9] p-8 lg:p-10">
                <p className="eyebrow">Approved payment information</p>
                <h3 className="mt-5 font-serif text-3xl">Spread the cost of care.</h3>
                <p className="mt-5 leading-7 text-[#51676a]">
                  Flexible finance options are available on selected treatments, subject to status.
                </p>
                <button className="button-primary mt-8" onClick={() => navigate("contact")}>
                  Ask reception <Icon name="arrow" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 bg-white border-t border-[#14383d]/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
          <p className="eyebrow mb-6">Proudly associated with</p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            <img alt="Invisalign provider logo" className="h-10 w-auto object-contain" src={invisalignLogo} />
            <img alt="AAID logo" className="h-10 w-auto object-contain" src={aaidLogo} />
            <img alt="Smilelign logo" className="h-10 w-auto object-contain" src={smilelignLogo} />
          </div>
        </div>
      </div>

      <CTA navigate={navigate} />
    </>
  );
}

function FirstVisitPage({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <>
      <PageHero
        eyebrow="First-visit page"
        image={chairImage}
        text="We understand dental anxiety and know is real. We offer a calm, pressure-free environment tailored for nervous patients."
        title="Gentle, Compassionate Dental Care"
      />
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="border border-[#14383d]/15 bg-white p-8">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e1ede9] font-semibold text-[#14383d] text-sm">
                01
              </span>
              <h3 className="mt-6 font-serif text-2xl">What to bring with you</h3>
              <p className="mt-4 leading-7 text-[#52666a]">
                A list of current medication, relevant medical details and any questions you would like
                us to answer.
              </p>
            </div>
            <div className="border border-[#14383d]/15 bg-white p-8">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e1ede9] font-semibold text-[#14383d] text-sm">
                02
              </span>
              <h3 className="mt-6 font-serif text-2xl">What documents you need</h3>
              <p className="mt-4 leading-7 text-[#52666a]">
                Please complete your medical history form before you arrive. We will send it securely
                by email.
              </p>
            </div>
            <div className="border border-[#14383d]/15 bg-white p-8">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#e1ede9] font-semibold text-[#14383d] text-sm">
                03
              </span>
              <h3 className="mt-6 font-serif text-2xl">Nervous about the dentist?</h3>
              <p className="mt-4 leading-7 text-[#52666a]">
                Tell us when you book. We will allow extra time, explain each step and move entirely
                at your pace.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 bg-white border-t border-[#14383d]/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
          <p className="eyebrow mb-6">Proudly associated with</p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            <img alt="Invisalign provider logo" className="h-10 w-auto object-contain" src={invisalignLogo} />
            <img alt="AAID logo" className="h-10 w-auto object-contain" src={aaidLogo} />
            <img alt="Smilelign logo" className="h-10 w-auto object-contain" src={smilelignLogo} />
          </div>
        </div>
      </div>

      <CTA navigate={navigate} />
    </>
  );
}

function AboutPage({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <>
      <PageHero
        eyebrow="About Oxford Dental Centre"
        image={roomImage}
        text="An independent dental practice built on clinical excellence, time, trust and a genuinely caring approach."
        title="Meet our practice."
      />
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="eyebrow">Our philosophy</p>
              <h2 className="section-title mt-5">Dentistry as it should be.</h2>
              <p className="body-copy mt-7">
                Located on Banbury Road in Oxford, our practice was founded with a clear goal: to
                offer unhurried, exceptional dental care in an environment that feels calm and
                welcoming.
              </p>
            </div>
            <div className="bg-[#e1ede9] p-8 lg:p-12">
              <p className="eyebrow">Accreditations &amp; Associates</p>
              <h3 className="mt-4 font-serif text-3xl">Trusted standards</h3>
              <div className="mt-8 grid grid-cols-3 gap-6 items-center">
                <img alt="AAID logo" className="max-h-12 w-auto object-contain" src={aaidLogo} />
                <img
                  alt="Invisalign provider logo"
                  className="max-h-12 w-auto object-contain"
                  src={invisalignLogo}
                />
                <img alt="Smilelign logo" className="max-h-12 w-auto object-contain" src={smilelignLogo} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <CTA navigate={navigate} />
    </>
  );
}

function ContactPage({
  setAppointments,
}: {
  setAppointments: React.Dispatch<React.SetStateAction<AdminAppointment[]>>;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    treatment: "Routine Examination",
    date: "",
    notes: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newAppt: AdminAppointment = {
      id: "APT-" + Math.floor(1000 + Math.random() * 9000),
      patientName: form.name,
      email: form.email,
      phone: form.phone,
      treatment: form.treatment,
      date: form.date || new Date().toISOString().split("T")[0],
      status: "pending",
    };
    setAppointments((prev) => [newAppt, ...prev]);
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact and appointments"
        image={chairImage}
        text="Whether you are ready to book or simply have a question, our friendly reception team is here to help."
        title="Let’s start a conversation."
      />
      <section className="section-pad">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.2fr_.8fr]">
            <div className="border border-[#14383d]/15 bg-white p-8 lg:p-12">
              {submitted ? (
                <div className="py-12 text-center">
                  <span className="inline-grid h-16 w-16 place-items-center rounded-full bg-[#e1ede9] text-[#14383d] text-2xl mb-6">
                    ✓
                  </span>
                  <h3 className="font-serif text-3xl">Appointment Request Received</h3>
                  <p className="mt-4 text-[#52666a] max-w-md mx-auto">
                    Thank you, {form.name}. Our reception team will review your request and contact you
                    shortly.
                  </p>
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <p className="eyebrow">Request an appointment</p>
                  <h3 className="font-serif text-3xl">How can we help?</h3>
                  <div>
                    <label className="field-label" htmlFor="name">Patient Name</label>
                    <input
                      required
                      className="field-input"
                      id="name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="phone">Contact Number</label>
                    <input
                      required
                      type="tel"
                      className="field-input"
                      id="phone"
                      placeholder="Your phone number"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="email">Email Address</label>
                    <input
                      required
                      type="email"
                      className="field-input"
                      id="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="field-label" htmlFor="notes">Message</label>
                    <textarea
                      className="field-input min-h-[120px]"
                      id="notes"
                      placeholder="Tell us a little more..."
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-4">
                    <button className="button-primary" type="submit">
                      Send enquiry <Icon name="arrow" size={18} />
                    </button>
                    <button
                      type="button"
                      className="button-secondary"
                      onClick={() => setForm({ name: "", email: "", phone: "", treatment: "Routine Examination", date: "", notes: "" })}
                    >
                      Clear
                    </button>
                  </div>
                </form>
              )}
            </div>

            <aside className="bg-[#14383d] p-8 lg:p-10 text-white space-y-8">
              <div>
                <p className="eyebrow text-[#9bc8bf]">Contact Information</p>
              </div>
              <div className="border-b border-white/15 pb-6">
                <p className="text-xs uppercase tracking-wider text-[#9bc8bf]">Telephone</p>
                <a className="mt-1 block font-serif text-2xl hover:underline" href="tel:+441865493372">
                  +44 1865 493372
                </a>
              </div>
              <div className="border-b border-white/15 pb-6">
                <p className="text-xs uppercase tracking-wider text-[#9bc8bf]">Emergency Contact</p>
                <a className="mt-1 block font-serif text-2xl hover:underline" href="tel:+447985716665">
                  +44 7985 716665
                </a>
              </div>
              <div className="border-b border-white/15 pb-6">
                <p className="text-xs uppercase tracking-wider text-[#9bc8bf]">Find Us</p>
                <p className="mt-1 font-serif text-lg">162 Banbury Road, Oxford OX2 7BT</p>
              </div>
              <div className="border-b border-white/15 pb-6">
                <p className="text-xs uppercase tracking-wider text-[#9bc8bf]">Working Hours</p>
                <p className="mt-1 text-sm text-white/80">Monday–Friday, 09:00–17:00</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#9bc8bf]">Email</p>
                <a className="mt-1 block text-sm hover:underline" href="mailto:info@oxforddentalcentre.co.uk">
                  info@oxforddentalcentre.co.uk
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="py-12 bg-white border-t border-[#14383d]/10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 text-center">
          <p className="eyebrow mb-6">Proudly associated with</p>
          <div className="flex flex-wrap items-center justify-center gap-12">
            <img alt="Invisalign provider logo" className="h-10 w-auto object-contain" src={invisalignLogo} />
            <img alt="AAID logo" className="h-10 w-auto object-contain" src={aaidLogo} />
            <img alt="Smilelign logo" className="h-10 w-auto object-contain" src={smilelignLogo} />
          </div>
        </div>
      </div>
    </>
  );
}

function CTA({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <section className="bg-[#14383d] py-24 text-white lg:py-32">
      <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
        <p className="eyebrow text-[#9bc8bf]">Ready to begin?</p>
        <h2 className="mt-5 font-serif text-4xl md:text-6xl">Experience a calmer kind of dentistry.</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="button-light" onClick={() => navigate("contact")}>
            Book appointment <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer({ navigate }: { navigate: (page: Page) => void }) {
  return (
    <footer className="border-t border-[#14383d]/10 bg-[#0e2a2e] py-16 text-white/90">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[.18em] text-[#9bc8bf] font-semibold mb-4">Explore</p>
            <ul className="space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.page}>
                  <button className="transition hover:text-white text-white/75" onClick={() => navigate(item.page)}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[.18em] text-[#9bc8bf] font-semibold mb-4">Working Hours</p>
            <ul className="space-y-2 text-sm text-white/75">
              <li className="flex justify-between max-w-xs"><span>Mon</span> <span>09:00–17:00</span></li>
              <li className="flex justify-between max-w-xs"><span>Tue</span> <span>09:00–17:00</span></li>
              <li className="flex justify-between max-w-xs"><span>Wed</span> <span>09:00–17:00</span></li>
              <li className="flex justify-between max-w-xs"><span>Thu</span> <span>09:00–17:00</span></li>
              <li className="flex justify-between max-w-xs"><span>Fri</span> <span>09:00–17:00</span></li>
              <li className="flex justify-between max-w-xs"><span>Sat</span> <span>Closed</span></li>
              <li className="flex justify-between max-w-xs"><span>Sun</span> <span>Closed</span></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[.18em] text-[#9bc8bf] font-semibold mb-4">Contact</p>
            <p className="text-sm text-white/75 leading-6">
              162 Banbury Road<br />Oxford OX2 7BT
            </p>
            <p className="mt-3 text-sm font-semibold text-white">
              <a href="tel:+441865493372">+44 1865 493372</a>
            </p>
            <p className="mt-2 text-sm text-white/75">
              <a href="mailto:info@oxforddentalcentre.co.uk">info@oxforddentalcentre.co.uk</a>
            </p>
            <p className="mt-2 text-sm text-white/75">
              Emergency: <a href="tel:+447985716665">+44 7985 716665</a>
            </p>
          </div>
        </div>
        <div className="mt-14 border-t border-white/10 pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-white/50">
          <p>© 2025 Oxford Dental Centre · Website Concept</p>
        </div>
      </div>
    </footer>
  );
}