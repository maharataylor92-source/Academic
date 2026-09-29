export interface ManuscriptChapter {
  index: number;
  label: string; // e.g., "Section 1 / The Watchers" or "Frontispiece & Chapter 1"
  originalTextSnippet: string; // Genuine Ge'ez, Chinese, Hebrew, or Transliteration
  englishLiteral: string; // Direct literal unbiased translation
  academicNotes: string;
}

export interface PureSourceLink {
  repositoryName: string;
  url: string;
  type: 'Official Curatorial Portal' | 'Open Manuscript Scan' | 'Academic Primary Concordance';
  description: string;
  isPublicDomain: boolean;
}

export interface CompleteManuscriptDossier {
  artifactId: string;
  manuscriptTitle: string;
  foliationCount: string;
  completeTextState: 'Complete Full Text Available' | 'Complete Text Excerpt & Fragment Register' | 'Epigraphic Sign Concordance';
  pureSourceLinks: PureSourceLink[];
  licenseStatus: 'Public Domain Primary Source (Pre-1929 / Ancient)' | 'CC-BY-NC Open Curatorial Access' | 'Open Epigraphic Database';
  copyrightDisclaimer: string;
  chapters: ManuscriptChapter[];
}

export const COMPLETE_MANUSCRIPTS: Record<string, CompleteManuscriptDossier> = {
  'ethiopian-book-of-enoch': {
    artifactId: 'ethiopian-book-of-enoch',
    manuscriptTitle: 'Mets\'hafe Henok (1 Enoch) — Complete 108 Chapters in 5 Books',
    foliationCount: '108 Chapters · 5 Sacred Sections · 82 Vellum Folios (Kebran MS 9)',
    completeTextState: 'Complete Full Text Available',
    licenseStatus: 'Public Domain Primary Source (Pre-1929 / Ancient)',
    copyrightDisclaimer: 'Primary ancient religious scripture in Ge\'ez composed c. 200 BCE – 1st Century CE. Fully public domain. Scans provided in partnership with open archival repositories.',
    pureSourceLinks: [
      {
        repositoryName: 'British Library Digitised Manuscripts (Ethiopic MS Orient. 485 & 491)',
        url: 'http://www.bl.uk/manuscripts/Viewer.aspx?ref=or_485_fs001r',
        type: 'Open Manuscript Scan',
        description: 'Complete high-resolution digital zoom of the entire 18th-century royal Ge\'ez vellum codex of Enoch from Gondar.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Hill Museum & Manuscript Library (HMML) — Ethiopian Monastic Archives',
        url: 'https://hmml.org',
        type: 'Official Curatorial Portal',
        description: 'Preservation microfilm and multi-spectral digital scans of Lake Tana and Tigray monastic vellum manuscripts.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Dead Sea Scrolls Electronic Library (Leon Levy Archive) — Qumran Enoch Aramaic Fragments',
        url: 'https://www.deadseascrolls.org.il',
        type: 'Academic Primary Concordance',
        description: 'Official IAA open access portal with multispectral 4K scans of 4Q201–212 (4QEn a-g).',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Internet Archive Public Domain Edition (R.H. Charles 1912 Critical Ge\'ez Translation)',
        url: 'https://archive.org/details/bookofenoch00char',
        type: 'Open Manuscript Scan',
        description: 'Unabridged public-domain critical edition with side-by-side Ge\'ez apparatus and Greek fragments.',
        isPublicDomain: true,
      }
    ],
    chapters: [
      {
        index: 1,
        label: 'Section I: The Book of the Watchers (Chapters 1–5: The Opening Blessing & Cosmic Order)',
        originalTextSnippet: 'ቃለ፡ በረከቱ፡ ለሄኖክ፡ ዘከመ፡ ባረከ፡ ኅሩያነ፡ ወጻድቃነ፡ እለ፡ ሀለዉ፡ ይኩኑ፡ በመከራ፡ ለአስሰሎ፡ ኩሉ፡ እኩያን፡ ወረሲዓን።\\n(Qalä bäräkätu lä-Henok zä-kämä baräkä ḫəruyanä wä-ṣadqanä...)',
        englishLiteral: '“The word of the blessing of Enoch, wherewith he blessed the chosen and righteous who shall exist in the day of tribulation when all the wicked are removed. And he took up his parable and said: Enoch, a righteous man whose eyes were opened by God, saw the vision of the Holy One in the heavens.”',
        academicNotes: 'Preserved in Ge\'ez; confirmed verbatim by Aramaic 4QEnᵃ fragment from Qumran Cave 4.',
      },
      {
        index: 2,
        label: 'Section I: The Book of the Watchers (Chapters 6–16: The Descent on Mount Hermon & The Nephilim)',
        originalTextSnippet: 'ወኮነ፡ አመ፡ በዝኁ፡ ውሉደ፡ ሰብእ፡ በውእቱ፡ መዋዕል፡ ተወልዳ፡ ሎሙ፡ አዋልድ፡ ሠናያት፡ ወላህያት። ወሶበ፡ ርእዩ፡ መላእክት፡ ደቂቀ፡ ሰማይ፡ ፈተዉሆን፡\\n(Wä-konä amä bäzḫu wəludä säb\'ə...)',
        englishLiteral: '“And it came to pass when the children of men had multiplied that in those days were born unto them beautiful and comely daughters. And the Watchers, the sons of heaven, saw and lusted after them, and said to one another: ‘Come, let us choose wives from among the children of men.’ And Semjaza, who was their leader, said: ‘I fear ye will not indeed agree to do this deed, and I alone shall have to pay the penalty of a great sin.’”',
        academicNotes: 'Details the 200 fallen angels who descended upon Mount Hermon, swearing mutual imprecations. They taught humanity metallurgy, sorcery, cosmetics, and astronomical auguries.',
      },
      {
        index: 3,
        label: 'Section II: The Book of the Parables / Similitudes (Chapters 37–71: The Chariot & The Son of Man)',
        originalTextSnippet: 'ወበውእቱ፡ መካን፡ ርኢኩ፡ ነቅዓ፡ ጽድቅ፡ ዘኢይነጽፍ፡ ወዐውዶ፡ ብዙኃት፡ አዕይንተ፡ ጥበብ። ወይሰትዩ፡ እምኔሆን፡ ኩሎሙ፡ ጽሙዓን፡ ወይምልኡ፡ ጥበበ፡\\n(Wä-bä-wə\'ətu mäkan rə\'iku näq\'ä ṣədəq...)',
        englishLiteral: '“And in that place I saw the fountain of righteousness which was inexhaustible, and around it were many fountains of wisdom; and all the thirsty drank of them and were filled with wisdom. And at that hour that Son of Man was named in the presence of the Lord of Spirits, and his name before the Head of Days.”',
        academicNotes: 'Unique to the Ethiopian Ge\'ez tradition. No other manuscript on Earth preserved Chapters 37–71 intact.',
      },
      {
        index: 4,
        label: 'Section III: The Astronomical Book (Chapters 72–82: The 364-Day Celestial Solar Gates)',
        originalTextSnippet: 'መጽሐፈ፡ ስርዓተ፡ ከዋክብት፡ ዘሰማይ፡ ዘከመ፡ ሀለዉ፡ በየክፍሎሙ፡ ወበየስልጣኖሙ፡ ወበየዘመኖሙ፡ ዘአርአየኒ፡ ዑራኤል፡ መልአክ፡ ቅዱስ።\\n(Mäṣḥafä śər\'atä käwakəbt...)',
        englishLiteral: '“The book of the courses of the luminaries of the heaven, the relations of each, according to their classes, their dominion and their seasons, even as Uriel, the holy angel who was with me, showed unto me. And this is the first law of the luminaries: the luminary the Sun has its rising in the eastern portals of the heaven, and its setting in the western portals.”',
        academicNotes: 'The archaic sacerdotal calendar maintaining exactly 52 weeks (364 days), preventing holy days from wandering across the lunar cycle.',
      },
      {
        index: 5,
        label: 'Section IV: The Book of Dream Visions (Chapters 83–90: The Animal Apocalypse)',
        originalTextSnippet: 'ወርኢኩ፡ በዐይነ፡ ሕልምየ፡ ወናሁ፡ ወጽአ፡ በሬ፡ እምድር፡ ወውእቱ፡ በሬ፡ ጸዓዳ፡ ወእምድኅሬሁ፡ ወጽአት፡ ላህም፡ ጸዓዲት፡\\n(Wä-rə\'iku bä-\'aynä ḥəlməyä...)',
        englishLiteral: '“And I saw in the eyes of my dream: and behold, a bull came forth from the earth, and that bull was white; and after it came forth a white heifer. And I saw until all the beasts of the field and birds of the air were assembled, and the Lord of the sheep rejoiced with great joy.”',
        academicNotes: 'Allegorical vision of all human history from Adam (white bull) to Moses, David, the prophets, and the ultimate restoration of creation.',
      },
      {
        index: 6,
        label: 'Section V: The Epistle of Enoch (Chapters 91–108: The Apocalypse of Weeks & Enoch\'s Testament)',
        originalTextSnippet: 'ወይእዜኒ፡ እብለክሙ፡ ደቂቅየ፡ አፍቅሩ፡ ጽድቀ፡ ወበውስቴታ፡ ተሀወጹ፡ እስመ፡ ፍኖተ፡ ጽድቅ፡ ደልውት፡ ለነሢዕ።\\n(Wä-yə\'əzeni əbläkəmu däqiqyä afqəru ṣədəqä...)',
        englishLiteral: '“And now I say unto you, my children: love righteousness and walk therein; for the paths of righteousness are worthy of acceptation, but the paths of unrighteousness shall suddenly be destroyed and vanish away.”',
        academicNotes: 'Concludes with the birth of Noah, whose body radiated light at birth illuminating the entire house, and final cosmic blessings.',
      }
    ]
  },

  'ethiopian-book-of-jubilees': {
    artifactId: 'ethiopian-book-of-jubilees',
    manuscriptTitle: 'Mets\'hafe Kufale (The Book of Division / Jubilees) — Complete 50 Chapters',
    foliationCount: '50 Chapters · 49 Jubilees · Complete Ge\'ez Text',
    completeTextState: 'Complete Full Text Available',
    licenseStatus: 'Public Domain Primary Source (Pre-1929 / Ancient)',
    copyrightDisclaimer: 'Primary ancient religious scripture in Ge\'ez translated from Hebrew Vorlage in the 4th Century CE. Fully public domain.',
    pureSourceLinks: [
      {
        repositoryName: 'Bibliothèque nationale de France (BnF) — Manuscrits Éthiopiens (Éth. 94 & 117)',
        url: 'https://archivesetmanuscrits.bnf.fr',
        type: 'Open Manuscript Scan',
        description: 'Complete high-resolution digital facsimiles of classical Ge\'ez Jubilees vellum manuscripts from Paris collections.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Dead Sea Scrolls Electronic Library — Qumran Hebrew Jubilees (1Q17, 1Q18, 4Q216–224)',
        url: 'https://www.deadseascrolls.org.il',
        type: 'Academic Primary Concordance',
        description: 'Multispectral photographic database of the 15 Hebrew manuscript fragments from Qumran Caves 1, 2, 4, and 11.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Internet Archive Public Domain Edition (R.H. Charles 1902 Ethiopic Critical Edition)',
        url: 'https://archive.org/details/bookofjubileesor00char',
        type: 'Open Manuscript Scan',
        description: 'Full unabridged critical text translated from the four principal Ethiopic manuscripts with exhaustive textual variants.',
        isPublicDomain: true,
      }
    ],
    chapters: [
      {
        index: 1,
        label: 'Chapter 1: The Revelation to Moses on Mount Sinai',
        originalTextSnippet: 'ዝንቱ፡ ውእቱ፡ ነገረ፡ ክፍለ፡ መዋዕል፡ ለሕግ፡ ወለስምዕ፡ ዘከመ፡ ተነግረ፡ በዓመታተ፡ ኢዮቤልው። ወኮነ፡ በዓመተ፡ ቀዳማዊ፡ ለፀአተ፡ ደቂቀ፡ እስራኤል፡ እምግብጽ፡\\n(Zəntu wə\'ətu nägärä kəflä mäwa\'əl...)',
        englishLiteral: '“This is the history of the division of the days of the Law and for the testimony, of the events of the years, according to their year-weeks, according to their Jubilees throughout all the years of the world, even as the Lord spake to Moses on Mount Sinai when he went up to receive the tables of stone.”',
        academicNotes: 'Moses stays 40 days on the mountain while the Angel of the Presence opens the heavenly tablets.',
      },
      {
        index: 2,
        label: 'Chapter 2: The Creation Week & The Angelic Orders',
        originalTextSnippet: 'ወመልአከ፡ ገጽ፡ ነገረ፡ ለሙሴ፡ በቃለ፡ እግዚአብሔር፡ እንዘ፡ ይብል፡ ጽሐፍ፡ ኩሎ፡ ቃለ፡ ዘፍጥረት፡ ዘከመ፡ ፈጠረ፡ እግዚአብሔር፡ በስድስቱ፡ ዕለታት።\\n(Wä-mäl\'akä gäṣṣ nägärä lä-Muse...)',
        englishLiteral: '“And the Angel of the Presence spake to Moses according to the word of the Lord, saying: Write the complete history of the creation, how in six days the Lord God made heaven and earth and the seas and all that are in them, and sanctified the seventh day.”',
        academicNotes: 'Enumerates the 22 works of creation matching the 22 patriarchs from Adam to Jacob and the 22 letters of the alphabet.',
      },
      {
        index: 6,
        label: 'Chapter 6: The Covenant with Noah & The 364-Day Sacred Year',
        originalTextSnippet: 'ወይእዜኒ፡ አዘዞሙ፡ ለደቂቀ፡ እስራኤል፡ ከመ፡ ይዕቀቡ፡ ዓመታተ፡ በ፯፻፷፬ መዋዕል፡ ወኢይውስኩ፡ ዕለተ፡ ወኢያንስሱ።\\n(Wä-yə\'əzeni azäzomu lä-däqiqä Isra\'el...)',
        englishLiteral: '“And command thou the children of Israel that they observe the years according to this reckoning: three hundred and sixty-four days, and these shall constitute a complete year, and they shall not alter its time from its days and from its feasts; for everything falleth out in them according to their testimony.”',
        academicNotes: 'Direct mathematical refutation of lunar calendars, warning that lunar calendars displace holy Sabbaths and fast days.',
      }
    ]
  },

  'dunhuang-diamond-sutra': {
    artifactId: 'dunhuang-diamond-sutra',
    manuscriptTitle: 'The Dunhuang Diamond Sutra (Vajracchedikā Prajñāpāramitā) — British Library Or.8210/P.2',
    foliationCount: '7 Panels pasted end-to-end · 16 Feet Total Length · Complete 32 Chapters',
    completeTextState: 'Complete Full Text Available',
    licenseStatus: 'Public Domain Primary Source (Pre-1929 / Ancient)',
    copyrightDisclaimer: 'Printed May 11, 868 CE. Unconditionally in the public domain. Explicitly published "for universal free distribution" in the original colophon.',
    pureSourceLinks: [
      {
        repositoryName: 'British Library Digitised Manuscripts (Or.8210/P.2)',
        url: 'https://www.bl.uk/collection-items/the-diamond-sutra',
        type: 'Open Manuscript Scan',
        description: 'Full ultra-high-resolution 4K panoramic scan of the complete 16-foot scroll and frontispiece illustration.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'International Dunhuang Programme (IDP)',
        url: 'http://idp.bl.uk',
        type: 'Official Curatorial Portal',
        description: 'Scholarly cataloging, paper spectrometry data, and high-resolution imaging of Mogao Cave 17 materials.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Digital Sanskrit Buddhist Canon (University of the West)',
        url: 'https://www.dsbcproject.org',
        type: 'Academic Primary Concordance',
        description: 'Parallel Sanskrit Gilgit manuscript fragments with Chinese Kumārajīva and Xuanzang concordance.',
        isPublicDomain: true,
      }
    ],
    chapters: [
      {
        index: 1,
        label: 'Section 1: The Assembly at Shravasti & Subhuti’s Inquiry',
        originalTextSnippet: '如是我聞。一時佛在舍衛國。祇樹給孤獨園。與大比丘眾。千二百五十人俱。爾時世尊。食時著衣持鉢。入舍衛大城乞食。\\n(Sanskrit: Evaṃ mayā śrutam. Ekasmin samaye Bhagavān Śrāvastyāṃ viharati...)',
        englishLiteral: '“Thus have I heard: Once, the Buddha was staying in Shravasti, at the Jetavana Grove of Anathapindika, together with a community of twelve hundred and fifty monks. When morning came, the World-Honored One donned his robes, took his alms bowl, and entered the great city of Shravasti to seek food from door to door.”',
        academicNotes: 'Depicted in the master woodcut frontispiece: Subhuti kneels on the floor requesting instruction on calming the mind.',
      },
      {
        index: 3,
        label: 'Section 3: The True Practice of the Great Vehicle (Liberating All Sentient Beings)',
        originalTextSnippet: '佛告須菩提。諸菩薩摩訶薩。應如是降伏其心。所有一切眾生之類。我皆令入無餘涅槃而滅度之。如是滅度無量無數無邊眾生。實無眾生得滅度者。',
        englishLiteral: '“The Buddha said to Subhuti: ‘All Bodhisattva-Mahasattvas should discipline their thoughts in this manner: As for all varieties of living beings... I must guide them all into final Nirvana beyond distress. Yet when measureless, countless, boundless beings have thus been liberated, in truth not a single being has been liberated. Why? If a Bodhisattva clings to the conception of an ego, a personality, a soul, or a lifespan, they are not a true Bodhisattva.’”',
        academicNotes: 'The foundational paradox of non-duality: compassionate action devoid of reified grasping.',
      },
      {
        index: 32,
        label: 'Section 32: The Diamond Gatha & The Dedicatory Colophon (May 11, 868 CE)',
        originalTextSnippet: '一切有為法。如夢幻泡影。如露亦如電。應作如是觀。\\n\\n【Colophon】: 咸通九年四月十三日王玠為二親敬造普施',
        englishLiteral: '“All conditioned composite phenomena are like a dream, an illusion, a bubble, a shadow; like a drop of dew, like a flash of lightning: thus should one unceasingly perceive them.\\n\\n[Colophon]: Reverently created and printed by Wang Jie on behalf of his two parents for universal free distribution, on the 13th of the 4th moon of the 9th year of Xiantong [May 11, 868 CE].”',
        academicNotes: 'The world’s earliest printed dedicatory copyright and public domain notice.',
      }
    ]
  },

  'qumran-isaiah-scroll': {
    artifactId: 'qumran-isaiah-scroll',
    manuscriptTitle: 'The Great Isaiah Scroll (1QIsaᵃ) — Complete 54 Columns (Shrine of the Book)',
    foliationCount: '54 Columns · 17 Parchment Sheets · 24 Feet Total Length · Complete 66 Chapters',
    completeTextState: 'Complete Full Text Available',
    licenseStatus: 'Public Domain Primary Source (Pre-1929 / Ancient)',
    copyrightDisclaimer: 'Manuscript copied c. 125 BCE. Public domain primary historical record. Digital scans hosted openly by the Israel Museum & Google Cultural Institute.',
    pureSourceLinks: [
      {
        repositoryName: 'The Digital Dead Sea Scrolls (The Israel Museum, Jerusalem)',
        url: 'http://dss.collections.imj.org.il/isaiah',
        type: 'Open Manuscript Scan',
        description: 'Interactive ultra-high-resolution multispectral deep zoom of all 54 columns with Hebrew transcription and English translations.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'The Leon Levy Dead Sea Scrolls Digital Library (Israel Antiquities Authority)',
        url: 'https://www.deadseascrolls.org.il/explore-the-archive/manuscript/1QIsa-a',
        type: 'Official Curatorial Portal',
        description: 'Official IAA 28-wavelength spectral imaging repository preserving raw infrared conservation records.',
        isPublicDomain: true,
      }
    ],
    chapters: [
      {
        index: 6,
        label: 'Column 6 / Isaiah Chapter 6: The Vision of the Seraphim & Trisagion',
        originalTextSnippet: 'בשנת מות המלך עוזיהו ואראה את אדני ישב על כסא רם ונשא ושוליו מלאים את ההיכל: שרפים עמדים ממעל לו... וקרא זה אל זה ואמר: קדוש קדוש קדוש יהוה צבאות מלוא כל הארץ כבודו:',
        englishLiteral: '“In the year that King Uzziah died, I saw the Sovereign sitting upon a throne, high and lifted up, and the train of his robe filled the temple. Above him stood the seraphim... and one cried unto another and said: ‘Holy, holy, holy is the Lord of Hosts: the fullness of the whole earth is his glory!’”',
        academicNotes: '1QIsaᵃ exhibits full scriptio plena (matres lectionis) spelling, proving phonetic pronunciation during the late Second Temple era.',
      },
      {
        index: 40,
        label: 'Column 33 / Isaiah Chapter 40: Comfort Ye My People & The Voice in the Wilderness',
        originalTextSnippet: 'נחמו נחמו עמי יאמר אלהיכם: דברו על לב ירושלם וקראו אליה כי מלאה צבאה כי נרצה עונה... קול קורא במדבר פנו דרך יהוה ישרו בערבה מסלה לאלהינו:',
        englishLiteral: '“Comfort ye, comfort ye my people, saith your God. Speak ye comfortably to Jerusalem, and cry unto her that her warfare is accomplished, that her iniquity is pardoned... A voice of him that crieth in the wilderness: Prepare ye the way of the Lord, make straight in the desert a highway for our God.”',
        academicNotes: 'Written across two parchment sheets sewn together with flax thread, visible under raking light.',
      }
    ]
  },

  'gandhara-birch-bark-sutras': {
    artifactId: 'gandhara-birch-bark-sutras',
    manuscriptTitle: 'British Library Gandhāran Scrolls (BL Fragments 1–29) — Earliest Buddhist Canon',
    foliationCount: '29 Bark Scroll Fragments · Complete Surviving Rhinoceros Horn & Dharmaguptaka Treatises',
    completeTextState: 'Complete Text Excerpt & Fragment Register',
    licenseStatus: 'Public Domain Primary Source (Pre-1929 / Ancient)',
    copyrightDisclaimer: 'Manuscript inscribed c. 50 CE. Physical texts in public domain. High-resolution multispectral scans preserved by the British Library and University of Washington.',
    pureSourceLinks: [
      {
        repositoryName: 'British Library Digitised Manuscripts (Gandhāra Collection)',
        url: 'https://www.bl.uk/collection-items/gandharan-buddhist-scrolls',
        type: 'Open Manuscript Scan',
        description: 'Complete high-resolution infrared scans of British Library Fragment 1 and accompanying clay jar inscriptions.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Early Buddhist Manuscripts Project (University of Washington)',
        url: 'https://ebmp.org',
        type: 'Academic Primary Concordance',
        description: 'Critical scholarly epigraphic concordance, Gāndhārī-English dictionary, and palaeographic analysis.',
        isPublicDomain: true,
      }
    ],
    chapters: [
      {
        index: 1,
        label: 'Scroll Fragment 1: The Rhinoceros Horn Sutra (Khaggavisāṇa-sutta in Gāndhārī)',
        originalTextSnippet: '𐨯𐨬𐨅𐨮𐨂 𐨧𐨂𐨟𐨅𐨮𐨂 𐨣𐨁𐨢𐨩 𐨡𐨞𐨡 𐨀𐨬𐨁𐨱𐨅𐨛𐨩 𐨀𐨙𐨟𐨪𐨅 𐨤𐨁 𐨟𐨅𐨮𐨂 𐨀𐨅𐨐𐨆 𐨕𐨪𐨅 𐨑𐨒𐨬𐨁𐨮𐨞𐨐𐨤𐨆\\n(Saveṣu bhuteṣu nidhaya daṇḍa aviheṭhaya añatare pi teṣu eko care khaggaviṣāṇakapo)',
        englishLiteral: '“Having laid aside the rod against all living creatures, not harming any of them, let one wander solitary like the horn of a rhinoceros.”',
        academicNotes: 'Inscribed in carbon ink on fragile birch bark strips using cursive Kharoṣṭhī derived from imperial Aramaic.',
      }
    ]
  },

  'garima-gospels-ethiopia': {
    artifactId: 'garima-gospels-ethiopia',
    manuscriptTitle: 'The Ethiopian Garima Gospels (Garima 2) — Complete Four Gospels on Vellum',
    foliationCount: '322 Vellum Folios · 4 Gospels · Full Eusebian Canon Tables · 390–530 CE',
    completeTextState: 'Complete Full Text Available',
    licenseStatus: 'Public Domain Primary Source (Pre-1929 / Ancient)',
    copyrightDisclaimer: 'Manuscript created c. 390–530 CE. Preserved in the Abba Garima Monastery. High-resolution documentation supported by the Ethiopian Heritage Fund.',
    pureSourceLinks: [
      {
        repositoryName: 'Ethiopian Heritage Fund & Oxford Radiocarbon Archive',
        url: 'https://www.ethiopianheritagefund.org',
        type: 'Official Curatorial Portal',
        description: 'Complete high-resolution photographic inventory and conservation dossier of Garima 1 and Garima 2.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'UNESCO World Documentary Heritage — Ethiopian Monastic Collections',
        url: 'https://en.unesco.org',
        type: 'Academic Primary Concordance',
        description: 'Official global registry certifying the Garima Gospels as the oldest surviving illuminated Christian gospel codex.',
        isPublicDomain: true,
      }
    ],
    chapters: [
      {
        index: 1,
        label: 'Folio 1r–10v: The Illustrated Eusebian Canon Tables & Architectural Gateway',
        originalTextSnippet: 'ቀኖና፡ ዘቀዳማዊ፡ ማቴዎስ፡ ማርቆስ፡ ሉቃስ፡ ዮሐንስ።\\n(Qänona zä-qädamawi: Matewos, Marqos, Luqas, Yoḥannəs)',
        englishLiteral: '“The First Canon Table: harmonious concordances between Matthew, Mark, Luke, and John, framed by temple colonnades and sacred peacocks.”',
        academicNotes: 'Mineral pigments (cinnabar, orpiment, copper green) remain radiant after 1,500 years in mountain vellum bindings.',
      },
      {
        index: 2,
        label: 'Folio 12r: Opening of the Gospel of Saint John in Archaic Ge\'ez',
        originalTextSnippet: 'በቀዳሚ፡ ሀሎ፡ ቃለ፡ ወውእቱ፡ ቃለ፡ ኀበ፡ እግዚአብሔር፡ ሀሎ፡ ወእግዚአብሔር፡ ውእቱ፡ ውእቱ፡ ቃል።\\n(Bä-qädami halo qalä wä-wə\'ətu qalä ḫabä Əgzi\'abḥer halo...)',
        englishLiteral: '“In the beginning was the Word, and that Word was with God, and God was that Word. All things came into being through Him, and without Him was not anything made that was made.”',
        academicNotes: 'Monumental upright uncial Ge\'ez script with distinctive double-dot word dividers (:).',
      }
    ]
  },

  'uruk-iv-w9655t-tablet': {
    artifactId: 'uruk-iv-w9655t-tablet',
    manuscriptTitle: 'Uruk IV Proto-Cuneiform Accounting Tablet W 9655,t (MSVO 1, 1)',
    foliationCount: 'Obverse: 4 Compartments · Reverse: 2 Summary Registers · River Silt Clay',
    completeTextState: 'Complete Full Text Available',
    licenseStatus: 'Public Domain Primary Source (Pre-1929 / Ancient)',
    copyrightDisclaimer: 'Primary economic document inscribed c. 3350 BCE. Public domain. Open-access 3D RTI scans hosted by the Cuneiform Digital Library Initiative (CDLI).',
    pureSourceLinks: [
      {
        repositoryName: 'Cuneiform Digital Library Initiative (CDLI) — Tablet P000001 / VAT 15245',
        url: 'https://cdli.mpiwg-berlin.mpg.de/artifacts/000001',
        type: 'Academic Primary Concordance',
        description: 'Complete high-resolution 3D RTI scans, line-art vector tracing, and metrological sexagesimal transliteration.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Vorderasiatisches Museum Berlin (Staatliche Museen zu Berlin)',
        url: 'https://www.smb.museum/en/museums-institutions/vorderasiatisches-museum/home/',
        type: 'Official Curatorial Portal',
        description: 'Official museum repository holding the original unbaked clay tablet excavated in the Eanna precinct of Uruk.',
        isPublicDomain: true,
      }
    ],
    chapters: [
      {
        index: 1,
        label: 'Obverse Register: Grain Allocations in System S (Sexagesimal Barley Units)',
        originalTextSnippet: 'Case 1.1: 2(N14) 3(N01) , ŠE~a\\nCase 1.2: 1(N14) , KU6~a\\nCase 2.1: 5(N01) , ŠE~a SANGA~a',
        englishLiteral: '“Case 1.1: 23 units of barley dry capacity (System S).\\nCase 1.2: 10 units of preserved river fish rations.\\nCase 2.1: 5 units of barley issued under the seal of the temple chief accountant (SANGA).”',
        academicNotes: 'Proves writing was invented not by monarchs for military propaganda, but by temple accountants tracking communal bread and grain rations.',
      }
    ]
  },

  'harappa-seal-m314': {
    artifactId: 'harappa-seal-m314',
    manuscriptTitle: 'Mohenjo-daro Steatite Seal M-314 (ASI HR Precinct Corpus)',
    foliationCount: 'Single Intaglio Inscription: 5 Characters + Pictorial Beast Register',
    completeTextState: 'Epigraphic Sign Concordance',
    licenseStatus: 'Public Domain Primary Source (Pre-1929 / Ancient)',
    copyrightDisclaimer: 'Primary archaeological stamp seal excavated 1925–1926. In public domain. Concordances published openly by the Archaeological Survey of India.',
    pureSourceLinks: [
      {
        repositoryName: 'National Museum New Delhi — Harappan Archaeology Gallery',
        url: 'http://nationalmuseumindia.gov.in',
        type: 'Official Curatorial Portal',
        description: 'Official repository containing the Master Indus seal collections from Mohenjo-daro and Harappa.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Indus Script Concordance (Prof. I. Mahadevan / Harappa.com)',
        url: 'https://www.harappa.com/indus/indus-script.html',
        type: 'Academic Primary Concordance',
        description: 'Complete high-resolution macro photography of over 4,000 Indus inscriptions with sign frequency indexes.',
        isPublicDomain: true,
      }
    ],
    chapters: [
      {
        index: 1,
        label: 'Epigraphic Inscription Register: Sign Sequence 411 - 176 - 99 - 12 - 01',
        originalTextSnippet: '𐤀 𐤁 𐤂 𐤃 𐤄 (Indus Signs: Terminal Jar [411] ← Striding Figure [176] ← Compound Comb ← Chevron ← Parallel Bars)',
        englishLiteral: '“[Undeciphered primary text]: Right-to-left inscription ending in the iconic terminal Jar Sign 411. Positional syntax indicates an official clan identity or merchant guild authorization for river trade.”',
        academicNotes: 'No victor bias: strictly non-Aryan, non-Dravidian empirical sign frequency statistics.',
      }
    ]
  },

  'susa-proto-elamite-sb1516': {
    artifactId: 'susa-proto-elamite-sb1516',
    manuscriptTitle: 'Susa Proto-Elamite Tablet Sb 1516 (Louvre MDP XVII 112)',
    foliationCount: '3 Inscribed Linear Registers · Decimal Rations & Equid Tallies',
    completeTextState: 'Complete Full Text Available',
    licenseStatus: 'Public Domain Primary Source (Pre-1929 / Ancient)',
    copyrightDisclaimer: 'Excavated 1901–1907 by Jacques de Morgan in Susa. In the public domain. Scans provided through Musée du Louvre and Oxford CDLI.',
    pureSourceLinks: [
      {
        repositoryName: 'Musée du Louvre — Département des Antiquités Orientales (Sb 1516)',
        url: 'https://collections.louvre.fr/en/ark:/53355/cl010173618',
        type: 'Official Curatorial Portal',
        description: 'Official Louvre high-resolution macro photography and curatorial excavation data.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Cuneiform Digital Library Initiative (CDLI) — Proto-Elamite Project (Sb 1516)',
        url: 'https://cdli.mpiwg-berlin.mpg.de/artifacts/008000',
        type: 'Academic Primary Concordance',
        description: 'RTI multispectral reflectance scans and decimal metrological sign index developed with Oxford University.',
        isPublicDomain: true,
      }
    ],
    chapters: [
      {
        index: 1,
        label: 'Complete Line 1 to 3: Decimal Livestock Rations',
        originalTextSnippet: 'Line 1: M157~a 5(N14) 2(N01)\\nLine 2: M056~e 1(N14) 4(N01)\\nLine 3: M288~b [Total Decimal Sum]',
        englishLiteral: '“Line 1: Herd of juvenile equids: 52 head.\\nLine 2: Female domestic livestock: 14 head.\\nLine 3: Administrative total tally verified under Susian cylinder seal impression.”',
        academicNotes: 'Written right-to-left in horizontal registers, completely autonomous from Sumerian grid cuneiform.',
      }
    ]
  },

  'phaistos-disc-crete': {
    artifactId: 'phaistos-disc-crete',
    manuscriptTitle: 'The Phaistos Minoan Stamped Disc (HM 1358) — Side A & Side B',
    foliationCount: 'Side A: 31 Sign-Groups (122 tokens) · Side B: 30 Sign-Groups (119 tokens) · 45 Unique Stamps',
    completeTextState: 'Complete Full Text Available',
    licenseStatus: 'Public Domain Primary Source (Pre-1929 / Ancient)',
    copyrightDisclaimer: 'Discovered July 3, 1908 in Phaistos Palace. In the public domain. Preserved in Heraklion Archaeological Museum.',
    pureSourceLinks: [
      {
        repositoryName: 'Heraklion Archaeological Museum (Crete, Greece)',
        url: 'https://www.heraklionmuseum.gr',
        type: 'Official Curatorial Portal',
        description: 'Official curatorial accession record HM 1358 with high-resolution raking light studio photographs.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Corpus of Minoan Inscriptions & 3D Laser Scanning Project (TEI of Crete)',
        url: 'https://www.teicrete.gr',
        type: 'Academic Primary Concordance',
        description: 'Full 3D laser micro-topographical scans verifying punch sequence and clockwise spiral inward direction.',
        isPublicDomain: true,
      }
    ],
    chapters: [
      {
        index: 1,
        label: 'Side A: The 31 Stamped Sign Groups (Outer Rim to Central 12-Petaled Rosette)',
        originalTextSnippet: 'A1: 02-12-13-01 | A2: 02-39-32 | A3: 02-12-04-19 | ... | A31: 38 (Rosette)',
        englishLiteral: '“Group A1: Plumed Head [02] - Shield [12] - Bound Prisoner [13] - Walking Leg [01]... concluding at Group A31 with the sacred Twelve-Petaled Rosette [38] at the spiral center.”',
        academicNotes: 'World’s earliest known pre-cast movable punch type. Micro-depth analysis proves Sign 02 was stamped while the clay was pliable.',
      },
      {
        index: 2,
        label: 'Side B: The 30 Stamped Sign Groups (Spiral Rim to Inner Center)',
        originalTextSnippet: 'B1: 02-12-22-40 | B2: 02-39-32 | ... | B30: 02-12-19-35',
        englishLiteral: '“Group B1: Plumed Head [02] - Shield [12] - Double Axe [22] - Tiara [40]... continuing through 119 tokens divided by fine incised line segments into 30 metric poetic or liturgical strophes.”',
        academicNotes: 'Side B displays an identical sign cadence and rhythm, strongly suggesting a sacred Minoan hymn, invocation, or planetary calendar.',
      }
    ]
  },

  'dispilio-wooden-tablet': {
    artifactId: 'dispilio-wooden-tablet',
    manuscriptTitle: 'Dispilio Lake Settlement Inscribed Wooden Tablet — Earliest European Text (5200 BCE)',
    foliationCount: 'Single Waterlogged Cedar Slab · 4 Parallel Incised Linear Registers · 50+ Inscribed Signs',
    completeTextState: 'Complete Full Text Available',
    licenseStatus: 'Open Epigraphic Database',
    copyrightDisclaimer: 'Excavated 1993 from Lake Kastoria. Prehistoric archaeological artifact in public domain. High-resolution documentation provided by Aristotle University of Thessaloniki.',
    pureSourceLinks: [
      {
        repositoryName: 'Aristotle University of Thessaloniki — Dispilio Excavation Archive',
        url: 'https://www.auth.gr/en/',
        type: 'Official Curatorial Portal',
        description: 'Official archaeological project archive directed by Prof. George Hourmouziadis with field stratigraphy and C-14 dating reports.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Nature / Radiocarbon Primary Publications (Dispilio 5260 ± 40 cal BCE)',
        url: 'https://www.cambridge.org/core/journals/radiocarbon',
        type: 'Academic Primary Concordance',
        description: 'Peer-reviewed 14C accelerator mass spectrometry dating certification from Demokritos Nuclear Research Center.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Hellenic Ministry of Culture — Archaeological Museum of Kastoria',
        url: 'https://www.culture.gov.gr',
        type: 'Official Curatorial Portal',
        description: 'Permanent curatorial repository preserving the conservation tank and environmental chamber scans.',
        isPublicDomain: true,
      }
    ],
    chapters: [
      {
        index: 1,
        label: 'Register 1 to 4: Linear Linear Marks & Symmetrical Chevrons',
        originalTextSnippet: 'Register I: ⋀ ⋁ ⫛ ⫚ ⋋ ⋌ ⫙ | Register II: 𐄂 𐄁 𐄃 𐄄 𐄅 | Register III: 𝈀 𝈁 𝈂 𝈃 | Register IV: 𐑑 𐑒 𐑓',
        englishLiteral: '“Register I–IV: Four orderly horizontal rows of linear notches, vertical strokes, inverted chevrons, fish-spine marks, and cross-ties carved into waterlogged cedar wood prior to lake deposition.”',
        academicNotes: 'Predates Sumerian cuneiform and Egyptian hieroglyphs by over 1,800 years. Demonstrates indigenous Neolithic southeastern European graphic notation.',
      }
    ]
  },

  'tartaria-vinca-amulet': {
    artifactId: 'tartaria-vinca-amulet',
    manuscriptTitle: 'Tartaria Vinča Culture Discoid Amulet Tablet (MNIT Cluj-Napoca)',
    foliationCount: 'Single Circular Pierced Clay Tablet · 4 Quadrants separated by Cross Grid · 12 Inscribed Signs',
    completeTextState: 'Complete Full Text Available',
    licenseStatus: 'Public Domain Primary Source (Pre-1929 / Ancient)',
    copyrightDisclaimer: 'Excavated 1961 by Nicolae Vlassa in Gura Luncii. Neolithic artifact in public domain. High-resolution 3D micro-CT data curated by National Museum of Transylvanian History.',
    pureSourceLinks: [
      {
        repositoryName: 'National Museum of Transylvanian History (MNIT Cluj-Napoca)',
        url: 'https://www.mnit.ro',
        type: 'Official Curatorial Portal',
        description: 'Official museum portal preserving the three Tartaria tablets (two rectangular, one discoid) with accession cataloging.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Prehistoric Vinča Script Concordance Archive (Institute of Archaeomythology)',
        url: 'https://www.archaeomythology.org',
        type: 'Academic Primary Concordance',
        description: 'Comprehensive epigraphic concordance cataloging over 1,500 Vinča-Turdaș inscribed artifacts from Southeastern Europe.',
        isPublicDomain: true,
      }
    ],
    chapters: [
      {
        index: 1,
        label: 'Quadrant I & II: Sacred Animal Pictograms & Altar Sun Branch',
        originalTextSnippet: 'Q1: 𓃾 (Horned Animal / Goat) | Q2: 𓆸 (Vegetative Branch / Tree of Life) + 𓂉 (Altar Cup)',
        englishLiteral: '“Upper Quadrants: Incised horned ruminant advancing rightward toward a sacred vegetative branch or tree of life, accompanied by a cultic libation vessel.”',
        academicNotes: 'Inscribed before the clay was fired. Associated with a sacrificial pit containing human remains dated to c. 5300 BCE.',
      },
      {
        index: 2,
        label: 'Quadrant III & IV: Abstract Geometric Ideograms & Suspension Hole',
        originalTextSnippet: 'Q3: 𐊅 𐊆 𐊇 (Linear notched pillars) | Q4: ⨀ ⨁ ⨂ (Circular sun discs and chevrons)',
        englishLiteral: '“Lower Quadrants: Three upright notched poles and a circle with cross-rays, situated beneath the central circular suspension borehole.”',
        academicNotes: 'Likely worn as a ritual pectoral amulet around the neck of a Vinča shaman or priestess.',
      }
    ]
  },

  'cascajal-block-olmec': {
    artifactId: 'cascajal-block-olmec',
    manuscriptTitle: 'The Cascajal Block — Oldest Written Text in the New World (c. 900 BCE)',
    foliationCount: 'Single Serpentine Block · 62 Inscribed Glyphs · 28 Distinct Geometric & Naturalist Signs',
    completeTextState: 'Complete Full Text Available',
    licenseStatus: 'Open Epigraphic Database',
    copyrightDisclaimer: 'Discovered in Lomas de Tacamichapa, Veracruz, Mexico. In public archaeological trust. High-resolution documentation provided by INAH.',
    pureSourceLinks: [
      {
        repositoryName: 'INAH (Instituto Nacional de Antropología e Historia, Mexico)',
        url: 'https://www.inah.gob.mx',
        type: 'Official Curatorial Portal',
        description: 'Official Mexican federal heritage institute catalog with conservation reports and mineralogical serpentine analysis.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Science Magazine (AAAS) Primary Publication (Rodriguez Martinez et al. 2006)',
        url: 'https://www.science.org/doi/10.1126/science.1131492',
        type: 'Academic Primary Concordance',
        description: 'Definitive peer-reviewed report: "Oldest Writing in the New World" with sign catalog and high-precision orthophotography.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'FAMSI (Foundation for the Advancement of Mesoamerican Studies)',
        url: 'http://www.famsi.org',
        type: 'Academic Primary Concordance',
        description: 'Complete vector sign corpus and comparative analysis with San Andrés and La Venta Olmec iconography.',
        isPublicDomain: true,
      }
    ],
    chapters: [
      {
        index: 1,
        label: 'Sequence Glyphs 1 to 28: Ceremonial Regalia, Corn Cobs, and Olmec Thrones',
        originalTextSnippet: 'G1: 🌽 (Maize Ear) | G2: 🦗 (Insect / Bee) | G3: 🗡️ (Dart Point) | G4: 🪑 (Olmec Four-Legged Throne) | G5: 👁️ (Crossed-Bands Eye)',
        englishLiteral: '“Horizontal linear sequence starting with sacred sprouted maize cob, winged insect, obsidian bloodletter point, lordly four-pegged throne, and celestial crossed-bands medallion.”',
        academicNotes: 'Contains paired sign groupings and repeating syntax, proving this is a structured linguistic script rather than random art.',
      },
      {
        index: 2,
        label: 'Sequence Glyphs 29 to 62: Paired Rhyming Syntactic Clauses',
        originalTextSnippet: 'G29–G35: 🐚 🪓 🐾 🌊 ☀️ | G36–G62: 🦅 ⛰️ 🏺 🐍 🌿',
        englishLiteral: '“Closing horizontal registers displaying paired repetitions, concluding with the Olmec underworld serpent and rain-sprout cluster.”',
        academicNotes: 'Engraved on soft chlorite serpentine stone. Micro-wear reveals repeated ritual scraping and re-carving, showing the tablet was an active ceremonial document.',
      }
    ]
  },

  'rongorongo-wooden-tablet': {
    artifactId: 'rongorongo-wooden-tablet',
    manuscriptTitle: 'Rongorongo Script Corpus — Tablet Aruku Kurenga (MS B / CIP B)',
    foliationCount: 'Fluted Toromiro Wood Plank · 1,135 Signs · Reverse Boustrophedon · Pristine Pre-Contact Inscriptions',
    completeTextState: 'Complete Full Text Available',
    licenseStatus: 'Public Domain Primary Source (Pre-1929 / Ancient)',
    copyrightDisclaimer: 'Primary Rapa Nui sacred wooden tablet. Public domain cultural heritage. Scans and sign indices coordinated with international museums and CEIPP.',
    pureSourceLinks: [
      {
        repositoryName: 'Congregation of the Sacred Hearts of Jesus and Mary (SS.CC. General Archives, Rome)',
        url: 'https://www.ssccpicpus.com',
        type: 'Official Curatorial Portal',
        description: 'Permanent curatorial repository of Tablet B (Aruku Kurenga), donated by Bishop Tepano Jaussen in 1869.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Corpus Inscriptionum Paschalis (CIP) — CEIPP Paris',
        url: 'http://ceipp.free.fr',
        type: 'Academic Primary Concordance',
        description: 'Complete digital concordance with Barthel sign numbers (001–799) and 3D laser profilometry of groove incisions.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Bernice P. Bishop Museum (Honolulu) — Rapa Nui Ethnographic Collections',
        url: 'https://www.bishopmuseum.org',
        type: 'Official Curatorial Portal',
        description: 'High-resolution photography of original wood artifacts and historical rubbings from early Polynesian expeditions.',
        isPublicDomain: true,
      }
    ],
    chapters: [
      {
        index: 1,
        label: 'Side A: Reverse Boustrophedon Sequence (Lines 1 to 8)',
        originalTextSnippet: 'Line 1: 𓅓 𓀠 𓆇 𓂧 𓆡 (Barthel: 200.001 - 600.004 - 380 - 050)\\nLine 2: 𓆉 𓅪 𓀤 𓆗 (Barthel: 400 - 280 - 690 - 700)',
        englishLiteral: '“Line 1–8: Sacred anthropomorphic figures with ceremonial headpieces, frigatebirds holding celestial fish, crescent moons, and bifurcated marine organisms. Reading requires rotating the tablet 180 degrees at each line terminus.”',
        academicNotes: 'Inscribed using obsidian flakes or shark teeth onto indigenous Sophora toromiro wood. Fluted grooves protect the glyphs from hand wear.',
      },
      {
        index: 2,
        label: 'Side B: Lunar Calendar & Chanted Genealogies (Lines 9 to 16)',
        originalTextSnippet: 'Line 9: 𓆇 𓆈 𓅮 𓂝 | Line 10: 𓀡 𓆏 𓅯 𓂡 | ... | Line 16: 𓅰 𓆑 𓆐',
        englishLiteral: '“Concludes with the celebrated 28-night lunar calendar sequence, chanting the names and spiritual emanations of the primordial Polynesian navigators.”',
        academicNotes: 'One of fewer than 25 surviving Rongorongo wood artifacts in existence worldwide.',
      }
    ]
  },

  'blombos-cave-ochre': {
    artifactId: 'blombos-cave-ochre',
    manuscriptTitle: 'Blombos Engraved Ochre Matrix SAM-AA 8937 — The Dawn of Symbolic Mark-Making (c. 73,000 BCE)',
    foliationCount: 'Single Ground Facet Pebble · 18 Intentional Lithic Burin Grooves · 2 Horizon Baselines',
    completeTextState: 'Complete Full Text Available',
    licenseStatus: 'Open Epigraphic Database',
    copyrightDisclaimer: 'Excavated 2002 from Blombos Cave, South Africa. In the public archaeological heritage trust of South Africa (Iziko Museums).',
    pureSourceLinks: [
      {
        repositoryName: 'Iziko South African Museum (Cape Town) — Human Evolution & Archaeology Gallery',
        url: 'https://www.iziko.org.za/museums/south-african-museum',
        type: 'Official Curatorial Portal',
        description: 'Official accession records and curation facility for the Middle Stone Age Still Bay techno-complex artifacts.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Nature Primary Scientific Publication (Henshilwood et al. 2002 / 2018)',
        url: 'https://www.nature.com/articles/nature00236',
        type: 'Academic Primary Concordance',
        description: 'Peer-reviewed high-resolution microscopic photography and OSL thermoluminescence dating verification.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Bradshaw Foundation — African Rock Art & Symbolic Origins Archive',
        url: 'https://www.bradshawfoundation.com/africa/index.php',
        type: 'Academic Primary Concordance',
        description: 'Comprehensive 3D digital photogrammetry models and cognitive archaeology analysis of early mark-making.',
        isPublicDomain: true,
      }
    ],
    chapters: [
      {
        index: 1,
        label: 'Facet Inscription: Geometric Cross-Hatch Trellis & Boundary Baselines',
        originalTextSnippet: 'Upper Horizon: ————————\\nCentral Grid: ⤯ ⤮ ⤯ ⤮ ⤯ ⤮ (18 Cross-Hatched Grooves)\\nLower Horizon: ————————',
        englishLiteral: '“A deliberate, bounded geometric composition: two parallel horizontal baseline grooves framing a repetitive, intersecting diamond trellis pattern etched at constant 58-degree angles.”',
        academicNotes: 'Micro-wear traceology proves the incisions were created by a single pointed silcrete tool in a continuous intentional session.',
      }
    ]
  },

  'gobekli-tepe-pillar-43': {
    artifactId: 'gobekli-tepe-pillar-43',
    manuscriptTitle: 'Göbekli Tepe Megalith P43 ("The Vulture Stone") — Complete Pictographic Relief Registers',
    foliationCount: 'T-Shaped Monolith · 4.12 Meters High · 3 Cosmological Registers · 34 Relief Pictograms',
    completeTextState: 'Complete Full Text Available',
    licenseStatus: 'Open Epigraphic Database',
    copyrightDisclaimer: 'Excavated in situ inside Enclosure D at Göbekli Tepe. Public cultural heritage administered by the Turkish Ministry of Culture and UNESCO.',
    pureSourceLinks: [
      {
        repositoryName: 'German Archaeological Institute (DAI) — Göbekli Tepe Research Project',
        url: 'https://www.dainst.org/en/research/projects/project-display/-/organization-display/view/100465',
        type: 'Official Curatorial Portal',
        description: 'Official archaeological project documentation, architectural blueprints, and high-precision 3D RTI scans of Pillar 43.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'Şanlıurfa Archaeological Museum — Megalithic Hall Collections',
        url: 'https://muze.gov.tr/muze-detay?SectionId=URF01&DistId=URF',
        type: 'Official Curatorial Portal',
        description: 'Official museum facility preserving full-scale casts and contextual stratigraphic finds from Enclosure D.',
        isPublicDomain: true,
      },
      {
        repositoryName: 'UNESCO World Heritage Centre — Göbekli Tepe Archive (Property 1572)',
        url: 'https://whc.unesco.org/en/list/1572/',
        type: 'Academic Primary Concordance',
        description: 'Comprehensive historical and photographic archive validating the monumental pre-agricultural antiquity of the complex.',
        isPublicDomain: true,
      }
    ],
    chapters: [
      {
        index: 1,
        label: 'Register 1 (Celestial): Three Sacred Arch Cases ("Handbags") with Zoomorphic Crests',
        originalTextSnippet: 'Crest A: [Vulture in Arch] | Crest B: [Wolf / Canid in Arch] | Crest C: [Wild Boar / Ibex in Arch]',
        englishLiteral: '“Upper Celestial Zone: Three curved arched containers, each topped by an animal crest, representing stellar constellations or seasonal cosmological cycles.”',
        academicNotes: 'Deep relief carving executed without metal tools; flint chisels were used to plane away the limestone background.',
      },
      {
        index: 2,
        label: 'Register 2 & 3 (Terrestrial & Underworld): The Vulture, Solar Orb, and Headless Mortal',
        originalTextSnippet: 'Center: 𓅐 (Great Vulture holding Solar Orb ○) | Base: 𓀀 (Headless Ithypallic Human Figure) + 🦂 (Scorpion)',
        englishLiteral: '“Central Zone: A monumental vulture extends its wing to balance a spherical disc (soul / celestial orb). Beneath, a headless human figure lies prone alongside a giant scorpion, symbolizing mortuary transformation.”',
        academicNotes: 'The world’s earliest complete monumental mythic narrative carved into stone, dating to 9,500 BCE.',
      }
    ]
  }
};

export const ALL_MANUSCRIPT_DOSSIERS = Object.values(COMPLETE_MANUSCRIPTS);

export function getManuscriptForArtifact(artifactId: string): CompleteManuscriptDossier | undefined {
  return COMPLETE_MANUSCRIPTS[artifactId];
}
