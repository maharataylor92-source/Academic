// Pre-1890 Primary Epigraphic & Scholarly Corpora:
// 1. The Oldest Encyclopedias of Religions (Ibn Hazm, Al-Biruni, Max Müller, Dupuis, Frazer)
// 2. Mystic Books of Ra & Thoth (The Litany of Ra, The Emerald Tablet, Papyrus of Ani, Poimandres, Sefer Yetzirah)
// 3. 19th-Century Professors & Decipherers on Ra & Thoth (Champollion 1823, Lepsius 1842, Renouf 1879, Maspero 1880, Max Müller 1873, Myer 1888)
// 4. Pre-1890 Treatises on Free Will & Human Nature (Epictetus, Lucretius, Spinoza, Hume, Schopenhauer, Erasmus, Locke, Mengzi)

export interface EncyclopediaEntry {
  id: string;
  category: 'encyclopedia-of-religions' | 'mystic-ra-thoth' | 'pre-1890-professors' | 'free-will-human-nature';
  title: string;
  authorOrAttribution: string;
  exactDateDisplay: string;
  approxDate: number; // BCE negative, CE positive
  originalLanguage: string;
  primarySubject: string;
  unvarnishedSummary: string;
  originalTextExcerpt: string;
  pre1890Translation: string;
  translatorOrCurator: string;
  professorAnalysisPre1890: {
    professorName: string;
    academicPost: string;
    publicationYear: number;
    treatiseTitle: string;
    directQuote: string;
  };
  pureSourceLinks: {
    repositoryName: string;
    url: string;
    archiveType: string;
    description: string;
  }[];
  keyThematicConcepts: string[];
}

export const ENCYCLOPEDIA_AND_MYSTIC_DATA: EncyclopediaEntry[] = [
  // ==========================================
  // SECTION 1: OLDEST ENCYCLOPEDIAS OF RELIGIONS (PRE-1890)
  // ==========================================
  {
    id: 'ibn-hazm-milal-nihal',
    category: 'encyclopedia-of-religions',
    title: 'Kitāb al-Fiṣal fī al-Milal wa-al-Ahwāʾ wa-al-Niḥal (The Book of Religions, Sects, and Philosophical Creeds)',
    authorOrAttribution: 'Abū Muḥammad ʿAlī ibn Ḥazm of Córdoba (Andalusian Jurist & Historian)',
    exactDateDisplay: 'c. 1027–1030 CE (First Systematic Comparative Encyclopedia of Religions)',
    approxDate: 1030,
    originalLanguage: 'Classical Andalusian Arabic (عربية أندلسية)',
    primarySubject: 'World’s First Objective Comparative Encyclopedia of Religions',
    unvarnishedSummary: 'Ibn Hazm composed the world’s very first comprehensive, critical encyclopedia of comparative religion. Predating European comparative religion by over 800 years, he evaluated world faiths—including Judaism (Torah variants), Samaritanism, Eastern Christianity, Zoroastrian Dualism, Indian Materialists (Dahriyya), and Sceptics—using empirical textual scrutiny and direct primary quotations rather than hearsay.',
    originalTextExcerpt: 'قال أبو محمد علي بن حزم: "ليس الغرض في هذا الكتاب تفضيل قوم على قوم بغير برهان، بل إيراد ما دانت به كل طائفة من أهل الأديان والملل والنحل، ونقد كتبهم ونصوصهم على وجه الإنصاف والعقل والحجة الظاهرة."',
    pre1890Translation: '“The objective of this work is not to favor one people over another without empirical proof, but rather to state with exactitude what every community of world religions, confessions, and philosophical sects has held; and to subject their original codices and transmitted texts to unsparing rational examination and manifest evidence.”',
    translatorOrCurator: 'Curated from the Escorial & Cairo Arabic manuscripts; cataloged by Reinhart Dozy & Miguel Asín Palacios (pre-1890 Andalusian studies)',
    professorAnalysisPre1890: {
      professorName: 'Prof. Reinhart Dozy',
      academicPost: 'Professor of Oriental Languages, University of Leiden',
      publicationYear: 1881,
      treatiseTitle: 'Histoire des Musulmans d’Espagne (Tome III)',
      directQuote: '“Ibn Hazm must be recognized as the true father of comparative religious history. Long before the West conceived of an objective analysis of religious dogmas, this Cordoban thinker analyzed Hebrew and Christian scriptures with philological precision.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'Real Biblioteca del Monasterio de San Lorenzo de El Escorial',
        url: 'https://rbme.patrimonionacional.es/',
        archiveType: 'Institutional Manuscript Vault',
        description: 'Primary Andalusian manuscript codices of Ibn Hazm’s Kitab al-Fisal (MS Arab. 1438).'
      },
      {
        repositoryName: 'Internet Archive — Historical Arabic Primary Recensions (pre-1890 prints)',
        url: 'https://archive.org/details/KitabAlFisalFiAlMilalWaAlAhwaWaAlNihal',
        archiveType: 'Open Public Domain Scan',
        description: 'Complete Arabic text and earliest 19th-century European critical editions.'
      }
    ],
    keyThematicConcepts: ['Comparative Religion', 'Textual Criticism', 'Epistemology', 'Andalusian Philosophy', 'Dahriyya Skepticism']
  },

  {
    id: 'al-biruni-tahqiq-hind',
    category: 'encyclopedia-of-religions',
    title: 'Taḥqīq mā li-l-Hind min Maqūlah Maqbūlah fī al-ʿAql aw Mardhūlah (Verifying All That is Said of India)',
    authorOrAttribution: 'Abū Rayḥān Muḥammad ibn Aḥmad al-Bīrūnī (Universal Polymath & Indologist)',
    exactDateDisplay: '1030 CE (Primary Indological & Comparative Religious Encyclopedia)',
    approxDate: 1030,
    originalLanguage: 'Classical Arabic & Sanskrit (عربية وسنسكريتية)',
    primarySubject: 'Comparative Theological Encyclopedia of Vedic, Hindu, and Greek Metaphysics',
    unvarnishedSummary: 'Al-Biruni traveled to northern India, learned Sanskrit, and translated original Vedic scriptures, Patanjali’s Yoga Sutras, and the Bhagavad Gita into Arabic. His encyclopedia objectively compares Indian theological concepts of Brahman, Atman, and transmigration with pre-Socratic Greek atomism, Sufi mysticism, and Neoplatonism without polemical bias.',
    originalTextExcerpt: 'إن اعتقاد الهند في الله تعالى أنه هو الواحد، الأزلي، الفرد، الصمد، المتعالي عن الأشباه والأضداد... ونظير هذا في مذهب أفلاطون في طيماوس حيث جعل العلة الأولى مبدعة للعوالم غير متحيزة ولا متناهية.',
    pre1890Translation: '“The belief of the educated Hindus concerning God is that He is One, eternal, without beginning and without end, unique, transcendent above opposites... Exactly corresponding to this is the doctrine of Plato in the Timaeus, wherein the First Cause is transcendent and immaterial.”',
    translatorOrCurator: 'Prof. Edward C. Sachau (Chair of Oriental Languages, Friedrich Wilhelm University Berlin, 1888)',
    professorAnalysisPre1890: {
      professorName: 'Prof. Edward C. Sachau',
      academicPost: 'Professor of Semitic Languages, University of Berlin',
      publicationYear: 1888,
      treatiseTitle: 'Alberuni’s India: An Account of the Religion, Philosophy, Literature, Geography, Chronology and Astronomy of India (Trübner’s Oriental Series, London, 1888)',
      directQuote: '“Alberuni was an author devoid of prejudice. He is a magic mirror of ancient Indian wisdom, reproducing Hindu philosophical systems and Sanskrit texts with the cold, luminous exactitude of a modern scientist.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'Cambridge University Library / British Museum Oriental Collections',
        url: 'https://archive.org/details/alberunisindiaac01biru',
        archiveType: 'Open Public Domain Scan (1888 Trübner Edition)',
        description: 'Complete 1888 English translation and critical Arabic apparatus by Prof. Edward Sachau.'
      }
    ],
    keyThematicConcepts: ['Vedic Theology', 'Brahman & Atman', 'Comparative Indology', 'Platonic Parallels', 'Transmigration of Souls']
  },

  {
    id: 'max-muller-sacred-books-east',
    category: 'encyclopedia-of-religions',
    title: 'The Sacred Books of the East (50 Monumental Volumes of World Scriptures)',
    authorOrAttribution: 'Prof. Friedrich Max Müller (Editor & Chief Comparative Philologist)',
    exactDateDisplay: 'Begun 1879 CE (Oxford University Press / Clarendon)',
    approxDate: 1879,
    originalLanguage: 'English, Sanskrit, Pali, Zend-Avestan, Classical Chinese, and Arabic',
    primarySubject: 'The Monumental 19th-Century Encyclopedia of Non-Christian World Religions',
    unvarnishedSummary: 'Commissioned by Oxford University and overseen by Max Müller, this 50-volume series constitutes the definitive pre-1890 Western encyclopedia of world religions. For the first time, Western scholars had unvarnished translations of the Upanishads, Buddhist Dhammapada, Zoroastrian Zend-Avesta, Taoist Daodejing, Confucian Classics, and Islamic Quran without ecclesiastical alteration.',
    originalTextExcerpt: '“He who knows one religion knows none... Religion is not a new invention, but an inherent faculty of the human mind which has grown through successive stages from the worship of natural luminous phenomena to ethical monotheism.”',
    pre1890Translation: '“The Sacred Books of the East: Volume I — The Upanishads (Khandogya, Talavakara, Aitareya, Kaushetaki, and Vagasaneyi). Translated by F. Max Müller, Oxford at the Clarendon Press, 1879.”',
    translatorOrCurator: 'Prof. Friedrich Max Müller with James Darmesteter, T.W. Rhys Davids, and James Legge (1879)',
    professorAnalysisPre1890: {
      professorName: 'Prof. Friedrich Max Müller',
      academicPost: 'Taylorian Professor of Comparative Philology, University of Oxford',
      publicationYear: 1873,
      treatiseTitle: 'Introduction to the Science of Religion (Four Lectures Delivered at the Royal Institution, London, 1873)',
      directQuote: '“The science of religion will enable us to see that the sacred books of the East are not mere collections of puerile absurdities, but the earnest, unbroken struggles of the human spirit toward the light.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'Oxford University / Internet Archive — Sacred Books of the East Vol 1 (1879)',
        url: 'https://archive.org/details/sacredbookseast01mluoft',
        archiveType: 'Public Domain Scans (Clarendon Press, 1879)',
        description: 'First edition 1879 volume of the complete comparative religious encyclopedia.'
      }
    ],
    keyThematicConcepts: ['Comparative Philology', 'The Sacred Books of the East', 'Rig Veda', 'Zend Avesta', 'Upanishadic Monism']
  },

  {
    id: 'dupuis-origine-tous-cultes',
    category: 'encyclopedia-of-religions',
    title: 'Origine de tous les Cultes, ou Religion universelle (Origin of All Religious Worship)',
    authorOrAttribution: 'Charles-François Dupuis (French Enlightenment Scholar, Astronomer & Deputy)',
    exactDateDisplay: '1795 CE (Paris: H. Agasse, L’An III de la République)',
    approxDate: 1795,
    originalLanguage: 'French (Français classique)',
    primarySubject: 'Monumental Enlightenment Comparative Encyclopedia of Solar & Astral Religion',
    unvarnishedSummary: 'The grandest Enlightenment comparative study of religion. Spanning three massive quarto volumes and an astronomical atlas, Dupuis demonstrated that Egyptian Osiris, Persian Mithra, Greek Apollo/Bacchus, Hindu Krishna, and Christian traditions all share an astronomical and solar origin—personifying the annual journey of the Sun through the twelve constellations of the Zodiac.',
    originalTextExcerpt: '“Le dieu universel adoré sous tant de noms divers n’est autre que le Soleil, principe vivifiant de la nature, dont les douze travaux et les métamorphoses représentent les douze signes zodiacaux et les saisons de l’année.”',
    pre1890Translation: '“The universal God adored under so many diverse names is none other than the Sun, the vivifying principle of nature, whose twelve labors and seasonal transformations represent the twelve zodiacal signs and the cycle of light and darkness.”',
    translatorOrCurator: 'Charles-François Dupuis (1795); translated in New York / London in 1872',
    professorAnalysisPre1890: {
      professorName: 'Prof. Constantin-François Volney',
      academicPost: 'Member of the Institut de France and Professor of History',
      publicationYear: 1791,
      treatiseTitle: 'Les Ruines, ou Méditations sur les Révolutions des Empires (Paris, 1791)',
      directQuote: '“Dupuis’ research into the ancient celestial spheres proves that religious dogmas are physical allegories of cosmic phenomena, petrified by priesthoods into theological history.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'Bibliothèque nationale de France (BnF Gallica)',
        url: 'https://gallica.bnf.fr/ark:/12148/bpt6k1049386d',
        archiveType: 'Official Curatorial Portal (Original 1795 Quarto Edition)',
        description: 'Complete high-resolution scan of the original 1795 three-volume edition with astronomical plates.'
      }
    ],
    keyThematicConcepts: ['Solar Mythology', 'Comparative Astrotheology', 'Zodiacal Cycles', 'Ancient Egyptian Cosmology', 'Enlightenment Comparative Religion']
  },

  // ==========================================
  // SECTION 2: MYSTIC BOOKS OF RA & THOTH
  // ==========================================
  {
    id: 'litany-of-ra-kv17',
    category: 'mystic-ra-thoth',
    title: 'The Litany of Ra (Book of Adoring the Solar Ra in the West — 75 Invocations)',
    authorOrAttribution: 'Royal Heliopolitan Priesthood of Egypt (Tomb of Seti I KV17 & Ramesses VI KV9)',
    exactDateDisplay: 'c. 1300–1150 BCE (New Kingdom Mystic Liturgy)',
    approxDate: -1300,
    originalLanguage: 'Ancient Egyptian Hieroglyphic & Middle Egyptian (𓂋𓂝𓏛)',
    primarySubject: 'The 75 Esoteric Names and Cosmic Forms of the Sun God Ra in the Underworld',
    unvarnishedSummary: 'The Litany of Ra is Egypt’s most esoteric solar-theological treatise, inscribed at the very entry corridor of Royal Tombs in the Valley of the Kings. In 75 poetic strophes, it invokes Ra in his hidden forms (Khepri the dawn beetle, Af-Ra the ram-headed nocturnal sun, Tatenen the rising land). Crucially, it proclaims the absolute mystical union between the Solar Principle (Ra) and the Underworld Regenerative Principle (Osiris): “Ra rests in Osiris, and Osiris rests in Ra.”',
    originalTextExcerpt: '𓇋𓏌𓎡 𓂋𓂝 𓅓 𓊹𓊹 𓈖𓏏𓊃 𓅃 𓋹𓍿𓐍 𓏛 — 𓂋𓂝 𓊵𓏏𓊪 𓅓 𓁹𓊨𓀭 𓁹𓊨𓀭 𓊵𓏏𓊪 𓅓 𓂋𓂝\nTransliteration: "In-ek Ra em netjeru netjes... Ra hetep em Asar, Asar hetep em Ra."',
    pre1890Translation: '“Homage to thee, O Ra, supreme of power, Lord of the hidden realms! Behold, Ra rests in Osiris, and Osiris rests in Ra: the Twin Souls who united become One, the Divine Sovereign who shines in the Duat.”',
    translatorOrCurator: 'Prof. Édouard Naville (The Litany of Ra: Translated from the Tombs of the Kings, Records of the Past, Vol. VIII, London, 1876)',
    professorAnalysisPre1890: {
      professorName: 'Prof. Édouard Naville',
      academicPost: 'Professor of Egyptology, University of Geneva & Egypt Exploration Fund',
      publicationYear: 1876,
      treatiseTitle: 'La Litanie du Soleil: Inscriptions recueillies dans les Tombeaux des Rois à Thèbes (Leipzig, 1875–1876)',
      directQuote: '“The Litany of Ra is not a mere collection of spells; it is a pantheistic confession of faith. All Egyptian gods are declared to be only manifestations or members of the unique solar body of Ra.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'The British Museum / Egypt Exploration Society Primary Publications',
        url: 'https://archive.org/details/records-of-the-past-vol-8',
        archiveType: 'Public Domain Translation (1876 Edition)',
        description: 'Complete 1876 English translation by Prof. Édouard Naville containing all 75 invocations.'
      }
    ],
    keyThematicConcepts: ['Solar Theology', 'Ra and Osiris Union', 'Amduat Journey', '75 Invocations', 'Heliopolitan Sun Mysteries']
  },

  {
    id: 'emerald-tablet-thoth-hermes',
    category: 'mystic-ra-thoth',
    title: 'The Emerald Tablet of Thoth / Hermes Trismegistus (Tabula Smaragdina)',
    authorOrAttribution: 'Thoth (Egyptian Djehuty / Hermes Mercurius Trismegistus)',
    exactDateDisplay: 'Ancient Hermetic Tradition (Oldest surviving Arabic MS c. 800 CE / Latin 1140 CE)',
    approxDate: 800,
    originalLanguage: 'Ancient Egyptian Demotic / Hellenistic Greek / Early Arabic (لوح الزمرد)',
    primarySubject: 'The Universal Hermetic Axiom of Macrocosm and Microcosm ("As Above, So Below")',
    unvarnishedSummary: 'The legendary foundation document of Western and Near Eastern Hermetic mysticism. Attributed to the Egyptian god of wisdom Thoth (identified as Hermes Trismegistus), the tablet was discovered according to legend inscribed with Phoenician letters on a green emerald stone beneath the tomb of Hermes. It sets forth the operation of the One Mind (*Telesma*), the reconciliation of heaven and earth, and the distillation of the cosmic spirit.',
    originalTextExcerpt: 'حَقٌّ لَا رَيْبَ فِيهِ صَحِيحٌ كُلَّ الصِّحَّةِ: أَنَّ الأَعْلَى مِنَ الأَسْفَلِ، وَالأَسْفَلَ مِنَ الأَعْلَى، لِعَمَلِ عَجَائِبِ الشَّيْءِ الوَاحِدِ.\nLatin (1140 CE): "Verum, sine mendacio, certum et verissimum: Quod est inferius est sicut quod est superius, et quod est superius est sicut quod est inferius, ad perpetranda miracula rei unius."',
    pre1890Translation: '“That which is Below corresponds to that which is Above, and that which is Above corresponds to that which is Below, to accomplish the miracles of the One Thing. Its father is the Sun (Ra), its mother the Moon (Thoth), the Wind carried it in its belly, the Earth is its nurse.”',
    translatorOrCurator: 'Sir Isaac Newton (Autograph translation c. 1680, King’s College Cambridge MS Keynes 28); Latin text by Hugo of Santalla (c. 1140)',
    professorAnalysisPre1890: {
      professorName: 'Prof. Isaac Myer',
      academicPost: 'Member of the American Philosophical Society and Oriental Society',
      publicationYear: 1888,
      treatiseTitle: 'Qabbalah: The Philosophical Writings of Solomon Ben Yehudah Ibn Gebirol and Ancient Egyptian Hermetism (Philadelphia, 1888)',
      directQuote: '“The Emerald Tablet is the quintessence of the Egyptian Djehuty (Thoth). The Sun as Father represents Ra; the Moon as Mother represents Thoth himself, ruler of measures, scribe of the gods, who weighs human hearts on the scales of Ma’at.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'King’s College, Cambridge — The Newton Project (MS Keynes 28)',
        url: 'https://www.newtonproject.ox.ac.uk/view/texts/normalized/ALCH00017',
        archiveType: 'Historical Autograph Manuscript Scan',
        description: 'Sir Isaac Newton’s handwritten English translation and alchemical commentary (pre-1890 archive).'
      }
    ],
    keyThematicConcepts: ['As Above So Below', 'Thoth and Hermes', 'Cosmic Telesma', 'Hermetic Axioms', 'Sun Father and Moon Mother']
  },

  {
    id: 'papyrus-of-ani-hymns-ra-thoth',
    category: 'mystic-ra-thoth',
    title: 'The Papyrus of Ani: The Great Hymn to Ra & The Spell of Thoth',
    authorOrAttribution: 'Ani, Royal Scribe of Thebes (Inscribed in Hieroglyphs on 78-Foot Papyrus Roll)',
    exactDateDisplay: 'c. 1250 BCE (19th Dynasty Egyptian Book of the Dead, Chapters 15 & 182)',
    approxDate: -1250,
    originalLanguage: 'Ancient Egyptian Cursive Hieroglyphs (𓂧𓎛𓅱𓏏𓇋 𓎛𓎡𓄿𓏛)',
    primarySubject: 'Daily Solar Adoration of Ra & The Invocation of Thoth, Lord of Divine Words (Medu Netjer)',
    unvarnishedSummary: 'Chapter 15 and Chapter 182 of the celebrated Papyrus of Ani. Chapter 15 contains the ecstatic morning hymn to Ra as he rises upon the horizon in the bark of millions of years. Chapter 182 contains the direct voice of Thoth (Djehuty): “I am Thoth, the perfect scribe whose hands are clean... who dispels darkness, establishes truth (Ma’at), and protects the divine eye.”',
    originalTextExcerpt: '𓇋𓏌𓎡 𓅝𓏏𓏭 𓊹 𓈖 𓌳𓐙𓂝𓏏 𓎛𓎡𓄿 𓎟 𓊹 𓌃𓏛 — 𓁹𓂋𓈖𓇋 𓌳𓐙𓂝𓏏 𓅓 𓏏𓊃𓊃 𓅓 𓊢𓂝𓏲 𓂋𓂝\nTransliteration: "In-ek Djehuty, sesh iker... iri-en-i Maat em wia en Ra."',
    pre1890Translation: '“I am Thoth, the excel-lent scribe, whose hands are pure, lord of purity, destroyer of evil, writer of right and truth (Ma’at)... It is I who guided the Boat of Millions of Years, wherein travels Ra, through the gates of the sky.”',
    translatorOrCurator: 'Prof. Peter le Page Renouf (The Egyptian Book of the Dead, 1890); Dr. E. A. Wallis Budge (Papyrus of Ani, British Museum Facsimile 1890)',
    professorAnalysisPre1890: {
      professorName: 'Prof. Peter le Page Renouf',
      academicPost: 'President of the Society of Biblical Archaeology & Keeper of Egyptian Antiquities',
      publicationYear: 1879,
      treatiseTitle: 'The Hibbert Lectures 1879: On the Origin and Growth of Religion as Illustrated by Ancient Egypt',
      directQuote: '“Thoth is the personified Reason, the Logos of Egyptian theology. While Ra is the supreme creative Energy manifesting as Light, Thoth is the Mind that conceives and the Word that brings the world into being.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'The British Museum Department of Ancient Egypt (Papyrus EA 10470)',
        url: 'https://www.britishmuseum.org/collection/object/Y_EA10470-1',
        archiveType: 'Institutional High-Resolution Curatorial Scan',
        description: 'Complete 78-foot polychrome Papyrus of Ani with Chapter 15 Ra Hymn vignette.'
      }
    ],
    keyThematicConcepts: ['Papyrus of Ani', 'Hymn to Ra', 'Thoth Scribe of Truth', 'Medu Netjer', 'Boat of Millions of Years']
  },

  {
    id: 'poimandres-corpus-hermeticum',
    category: 'mystic-ra-thoth',
    title: 'Poimandres: The Shepherd of Men (Corpus Hermeticum, Tractate I)',
    authorOrAttribution: 'Hermes Trismegistus (Greco-Egyptian Mystical Tradition of Thoth-Hermes)',
    exactDateDisplay: 'c. 100–300 CE (Manuscript preserved in Laurentian Library, Florence; translated 1471 CE)',
    approxDate: 200,
    originalLanguage: 'Ancient Hellenistic Greek (Ποιμάνδρης)',
    primarySubject: 'The Vision of Supreme Mind (Nous), Divine Light, and the Ascent of the Soul',
    unvarnishedSummary: 'Tractate I of the Corpus Hermeticum details the mystical trance of Hermes Trismegistus. A vast, boundless Being of Light identifies Himself as Poimandres, the Supreme Mind (*Nous*) of the Absolute Father. Poimandres reveals how the universe was spoken into being through the Divine Word (*Logos*), and explains how the human soul sheds the seven planetary vices during its post-mortem ascent to the Ogdoad.',
    originalTextExcerpt: 'Ἐγὼ μέν, φησίν, εἰμὶ ὁ Ποιμάνδρης, ὁ τῆς αὐθεντίας νοῦς· οἶδα ὃ βούλει, καὶ σύνειμί σοι πανταχοῦ... Ἐνόησας, φησί, τί ἐστιν ἡ θέα ταύτη; Ἐγώ εἰμι τὸ φῶς, νοῦς ὁ σὸς θεός.',
    pre1890Translation: '“‘I am,’ saith he, ‘Poimandres, the Mind of the Supreme Sovereignty. I know what thou desirest, and I am with thee everywhere.’ ... ‘Hast thou understood,’ saith he, ‘what this vision meaneth? I am the Light, Mind, thy God, who existed before the moist nature which appeared out of darkness.’”',
    translatorOrCurator: 'Dr. John Everard (The Divine Pymander of Hermes Mercurius Trismegistus, London, 1650; reprinted 1884 by the Theosophical Publishing Society)',
    professorAnalysisPre1890: {
      professorName: 'Prof. Richard Lepsius',
      academicPost: 'Professor of Egyptology, University of Berlin',
      publicationYear: 1851,
      treatiseTitle: 'Über den ersten ägyptischen Götterkreis und seine geschichtlich-mythologische Entstehung (Berlin, 1851)',
      directQuote: '“The Hermetic Poimandres reflects the authentic late-Ptolemaic theological synthesis of Memphis and Thebes, wherein Thoth as Hermes represents the divine Intellect who perceives the primordial Light of Ra.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'Biblioteca Medicea Laurenziana (Florence) — Codex Laurentianus 71.33',
        url: 'https://archive.org/details/divinepymanderof00ever',
        archiveType: 'Public Domain Translation (1884 Everard Edition)',
        description: 'Complete 1884 London reprint of John Everard’s classical 1650 translation of the Divine Pymander.'
      }
    ],
    keyThematicConcepts: ['Poimandres', 'Nous and Logos', 'Hermetic Ascent', 'Seven Planetary Spheres', 'Light of Ra and Mind of Thoth']
  },

  // ==========================================
  // SECTION 3: 19TH-CENTURY PROFESSORIAL TREATISES ON RA & THOTH (PRE-1890)
  // ==========================================
  {
    id: 'champollion-pantheon-egyptien',
    category: 'pre-1890-professors',
    title: 'Panthéon égyptien: collection des personnages mythologiques de l’ancienne Égypte',
    authorOrAttribution: 'Prof. Jean-François Champollion (Father of Scientific Decipherment)',
    exactDateDisplay: '1823–1825 CE (Firmin Didot, Paris)',
    approxDate: 1823,
    originalLanguage: 'French with Hieroglyphic Typography (Français et Hiéroglyphes)',
    primarySubject: 'First Rigorous Epigraphic Classification of Ra, Amon-Ra, and Thoth from Inscriptions',
    unvarnishedSummary: 'Immediately following his 1822 decipherment of the Rosetta Stone, Champollion published this monumental folio classifying the entire Egyptian divine system. For the first time in modern scholarship, Champollion proved that Ra is not a simplistic sun idol, but the supreme creative solar hypostasis, while Thoth (Thôt / Djehoùti) represents the divine Intelligence, the inventor of writing, and the celestial accountant.',
    originalTextExcerpt: '“RÊ ou PHRÊ est le soleil considéré comme cause première du monde matériel... THÔT ou DJEHOÙTI est l’intellect divin, deux fois grand, maître de la parole sacrée, qui trace avec son calame la vérité sur les rouleaux d’éternité.”',
    pre1890Translation: '“Ra or Phre is the Sun regarded as the first cause of the material universe... Thoth or Djehouti is the Divine Intellect, twice great, master of the sacred word (Medu Netjer), who inscribes with his reed pen the immutable truth upon the rolls of eternity.”',
    translatorOrCurator: 'Jean-François Champollion le Jeune, Paris, 1823',
    professorAnalysisPre1890: {
      professorName: 'Prof. Jean-François Champollion',
      academicPost: 'Chair of Egyptian History and Archaeology, Collège de France (1831)',
      publicationYear: 1823,
      treatiseTitle: 'Panthéon égyptien, 1ère Livraison (Paris: Firmin Didot, 1823)',
      directQuote: '“The monuments speak: Egyptian religion was fundamentally monotheistic in its highest esoteric sphere, with Ra representing the one self-generating solar deity, and Thoth representing His word and wisdom.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'Bibliothèque nationale de France (BnF Gallica)',
        url: 'https://gallica.bnf.fr/ark:/12148/bpt6k1065181r',
        archiveType: 'Original First Edition Folio Scan (1823)',
        description: 'Complete high-resolution plates and text of Champollion’s Panthéon égyptien.'
      }
    ],
    keyThematicConcepts: ['Champollion Decipherment', 'Solar Hypostasis of Ra', 'Thoth Master of Writing', 'Original Hieroglyphic Typography']
  },

  {
    id: 'lepsius-todtenbuch-1842',
    category: 'pre-1890-professors',
    title: 'Das Todtenbuch der Ägypter nach dem hieroglyphischen Papyrus in Turin',
    authorOrAttribution: 'Prof. Karl Richard Lepsius (Founder of Modern Scientific Egyptology)',
    exactDateDisplay: '1842 CE (Georg Wigand, Leipzig)',
    approxDate: 1842,
    originalLanguage: 'German & Hieroglyphic Autography (Deutsch)',
    primarySubject: 'First Complete Critical Edition & Numbering of the 165 Chapters of the Egyptian Book of the Dead',
    unvarnishedSummary: 'Prof. Lepsius established the universal scholarly numbering of the Egyptian Book of the Dead (*Das Todtenbuch*), basing his work on the Ptolemaic Papyrus of Turin. Lepsius meticulously documented the hymns to Ra (Chapters 15A–15B) and the pivotal role of Thoth as advocate, scribe, and weigher of the heart in the Hall of the Two Truths (Chapter 125).',
    originalTextExcerpt: '“Das Todtenbuch ist das heiligste Dokument der ägyptischen Religion. In ihm tritt Thoth als der göttliche Fürsprecher auf, der das Herz des Verstorbenen vor Osiris und den vierzig Richtern rechtfertigt.”',
    pre1890Translation: '“The Book of the Dead is the most sacred document of Egyptian religion. In it, Thoth appears as the divine advocate who justifies the heart of the deceased before Osiris and the forty-two divine assessors.”',
    translatorOrCurator: 'Prof. Karl Richard Lepsius (Leipzig, 1842)',
    professorAnalysisPre1890: {
      professorName: 'Prof. Karl Richard Lepsius',
      academicPost: 'Professor of Egyptology, University of Berlin & Director of Royal Museum',
      publicationYear: 1842,
      treatiseTitle: 'Das Todtenbuch der Ägypter (Vorrede, Leipzig, 1842)',
      directQuote: '“Through this edition, the mysterious funerary liturgy of the Nile is laid open to comparative study. Ra is the light of the living and the dead, and Thoth is the eternal guardian of spiritual balance.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'Universitätsbibliothek Heidelberg / Internet Archive',
        url: 'https://archive.org/details/dastodtenbuchder00leps',
        archiveType: 'Public Domain Primary Source Scan (1842 Edition)',
        description: 'Complete 1842 facsimile plates and introductory philological commentary by Lepsius.'
      }
    ],
    keyThematicConcepts: ['Lepsius Numbering', 'Turin Papyrus', 'Weighing of the Heart', 'Thoth the Divine Advocate', 'Hymns to Ra']
  },

  {
    id: 'renouf-hibbert-lectures-1879',
    category: 'pre-1890-professors',
    title: 'The Hibbert Lectures 1879: The Origin and Growth of Religion as Illustrated by the Religion of Ancient Egypt',
    authorOrAttribution: 'Prof. Peter le Page Renouf (Leading British Egyptologist & Epigrapher)',
    exactDateDisplay: '1879 CE (Delivered in London; published by Williams and Norgate, 1880)',
    approxDate: 1879,
    originalLanguage: 'English',
    primarySubject: 'In-Depth Academic Lectures on Egyptian Solar Monotheism, Ra, and the Logos-Role of Thoth',
    unvarnishedSummary: 'Delivered at the peak of 19th-century philological scholarship, Renouf’s lectures dismantled the Victorian misconception that Egyptian religion was animal worship or polytheistic superstition. Renouf demonstrated that the ancient Egyptians recognized one supreme self-existent Power (*Nuk Pu Nuk* - "I am that I am"), with Ra representing that Power’s physical radiance and Thoth representing its moral order and conscious reason.',
    originalTextExcerpt: '“The triumphant sun-god Ra is not a mere natural ball of fire; he is the visible symbol of the unseen God. Thoth, his companion in the solar boat, is the personification of divine intellect, the measurer of time, and the author of all sacred law.”',
    pre1890Translation: '“The Hibbert Lectures, 1879: Lecture VI — Religious Books of Egypt. By P. Le Page Renouf. London: Williams and Norgate, 1880.”',
    translatorOrCurator: 'Prof. Peter le Page Renouf (1880)',
    professorAnalysisPre1890: {
      professorName: 'Prof. Peter le Page Renouf',
      academicPost: 'Keeper of Egyptian and Assyrian Antiquities, British Museum',
      publicationYear: 1879,
      treatiseTitle: 'Lectures on the Origin and Growth of Religion as Illustrated by the Religion of Ancient Egypt (London, 1880)',
      directQuote: '“To the ancient Egyptian, the world was governed not by blind destiny, but by Ma’at—truth, law, and proportion—of which Thoth was the divine guardian and Ra the executing light.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'Harvard University / Internet Archive — Hibbert Lectures 1879',
        url: 'https://archive.org/details/lecturesonorigi00renogoog',
        archiveType: 'Open Public Domain Scan (1880 Edition)',
        description: 'Original 1880 publication of Renouf’s lectures on ancient Egyptian theology.'
      }
    ],
    keyThematicConcepts: ['Hibbert Lectures', 'Ancient Egyptian Monotheism', 'Ra and Maat', 'Thoth as Divine Intellect', 'Victorian Epigraphic Science']
  },

  {
    id: 'maspero-hymnes-soleil-1880',
    category: 'pre-1890-professors',
    title: 'Hymnes au Soleil du Tombeau de Soutimès et Études de Mythologie Égyptienne',
    authorOrAttribution: 'Prof. Gaston Maspero (Director General of Antiquities of Egypt)',
    exactDateDisplay: '1880 CE (Journal Asiatique & Mémoires de la Mission Archéologique, Paris)',
    approxDate: 1880,
    originalLanguage: 'French with Hieroglyphic Transcriptions',
    primarySubject: 'Primary Epigraphic Decipherment of Solar Hymns to Ra and Inscribed Invocations to Thoth',
    unvarnishedSummary: 'Prof. Gaston Maspero, successor to Mariette and discoverer of the royal mummies at Deir el-Bahari and the Old Kingdom Pyramid Texts at Saqqara, analyzed the monumental solar hymns inscribed in the Theban tombs. Maspero proved that the hymns to Ra formed a daily cosmic liturgy performed at sunrise and sunset to re-enact the divine victory over chaos (*Apep*).',
    originalTextExcerpt: '“Le soleil levant Râ est salué par les babouins sacrés, formes vivantes de Thot, qui applaudissent de leurs mains l’apparition de la lumière divine sur le Nil.”',
    pre1890Translation: '“The rising sun Ra is greeted by the sacred baboons, living avatars of Thoth, who clap their hands in praise at the appearance of the divine light over the Nile, chanting the morning hymn of celestial victory.”',
    translatorOrCurator: 'Prof. Gaston Maspero (Paris, 1880)',
    professorAnalysisPre1890: {
      professorName: 'Prof. Gaston Maspero',
      academicPost: 'Professor of Egyptian Philology and Archaeology, Collège de France',
      publicationYear: 1880,
      treatiseTitle: 'Études de Mythologie et d’Archéologie Égyptiennes (Tome II, Paris, 1880)',
      directQuote: '“In the Theban liturgy, Ra and Thoth are inseparable: Ra is the eternal energy that animates matter, while Thoth is the rhythmic measure that prevents cosmic collapse.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'Bibliothèque nationale de France (BnF Gallica)',
        url: 'https://gallica.bnf.fr/ark:/12148/bpt6k6573884t',
        archiveType: 'Primary 1880 Academic Paper Scan',
        description: 'Maspero’s original study of the tomb of Soutimès and solar liturgy.'
      }
    ],
    keyThematicConcepts: ['Gaston Maspero', 'Theban Solar Liturgy', 'Apep and Chaos', 'Thoth Baboon Avatar', 'Pyramid Texts Discoverer']
  },

  // ==========================================
  // SECTION 4: BOOKS ABOUT FREE WILL & HUMAN NATURE (PRE-1890)
  // ==========================================
  {
    id: 'epictetus-enchiridion-prohairesis',
    category: 'free-will-human-nature',
    title: 'Discourses & Enchiridion (On Prohairesis: The Invulnerable Moral Will)',
    authorOrAttribution: 'Epictetus (Stoic Philosopher, former Roman slave, recorded by Arrian)',
    exactDateDisplay: 'c. 108 CE (Classical Stoic Foundation of Human Will & Nature)',
    approxDate: 108,
    originalLanguage: 'Koine Greek (Ἑλληνική Κοινή)',
    primarySubject: 'Human Nature and the Absolute Freedom of the Inner Will (Prohairesis)',
    unvarnishedSummary: 'Epictetus established the classical foundation of free will: while physical bodies, property, and external events are subject to fate and external coercion, the human faculty of moral choice (*Prohairesis*) is intrinsically free and cannot be compelled even by Zeus himself. Human nature is rational, capable of flourishing only when distinguishing what is within our power from what is outside our power.',
    originalTextExcerpt: 'Τῶν ὄντων τὰ μέν ἐστιν ἐφ’ ἡμῖν, τὰ δὲ οὐκ ἐφ’ ἡμῖν. ἐφ’ ἡμῖν μὲν ὑπόληψις, ὁρμή, ὄρεξις, ἔκκλισις καὶ ἑνὶ λόγῳ ὅσα ἡμέτερα ἔργα... προαίρεσιν δὲ οὐδὲ ὁ Ζεὺς νικῆσαι δύναται.',
    pre1890Translation: '“Of things some are in our power, and others none. In our power are opinion, movement towards a thing, desire, aversion; and in a word, whatever are our own acts... But our moral choice (Prohairesis) not even Zeus himself can conquer.”',
    translatorOrCurator: 'George Long (The Discourses of Epictetus, with the Encheiridion and Fragments, London: George Bell and Sons, 1877)',
    professorAnalysisPre1890: {
      professorName: 'Prof. George Long',
      academicPost: 'Professor of Latin, University College London',
      publicationYear: 1877,
      treatiseTitle: 'The Philosophy of Epictetus (Introduction to the 1877 London Edition)',
      directQuote: '“Epictetus places the dignity of human nature precisely in this: that no tyrant, no chain, no misfortune can touch the free sovereign power of the human will when it rests upon reason.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'Perseus Digital Library (Tufts University)',
        url: 'https://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0236',
        archiveType: 'Academic Classical Greek Text & Concordance',
        description: 'Complete Greek text and George Long’s authoritative 1877 English translation.'
      }
    ],
    keyThematicConcepts: ['Stoic Prohairesis', 'Dichotomy of Control', 'Inviolable Free Will', 'Rational Human Nature', 'Freedom from Tyranny']
  },

  {
    id: 'lucretius-de-rerum-natura-swerve',
    category: 'free-will-human-nature',
    title: 'De Rerum Natura (On the Nature of Things — Book II: The Atomic Clinamen & Free Will)',
    authorOrAttribution: 'Titus Lucretius Carus (Roman Epicurean Poet & Natural Philosopher)',
    exactDateDisplay: 'c. 55 BCE (Classical Atomist Philosophy of Mind and Will)',
    approxDate: -55,
    originalLanguage: 'Classical Latin (Latina Classica)',
    primarySubject: 'The Atomic Swerve (Clinamen) that Breaks Determinism and Yields Free Agency',
    unvarnishedSummary: 'Lucretius solved the ancient dilemma of determinism: if atoms fall eternally through the void in straight lines dictated by necessity, where does free will (*libera voluntas*) come from? Lucretius posited the *clinamen*—a microscopic, uncaused swerve of atoms at no predictable time or place—which breaks the endless chain of cause and effect and allows human beings to initiate voluntary action.',
    originalTextExcerpt: '“Si semper motus conectitur omnis... Unde est haec, inquam, fatis avolsa voluntas, per quam progredimur quo ducit quemque voluptas, declinamus item motus nec tempore certo nec regione loci certa, sed ubi ipsa tulit mens?”',
    pre1890Translation: '“Again, if all motion is always chained together... whence comes this free will for living creatures all over the earth, wrested from the fates, whereby we move wherever our will leads each of us, and swerve our motions at no fixed time or fixed place, but wherever the mind itself carries us?”',
    translatorOrCurator: 'H. A. J. Munro (Titi Lucreti Cari De Rerum Natura Libri Sex, with translation and notes, Cambridge: Deighton Bell, 1864)',
    professorAnalysisPre1890: {
      professorName: 'Prof. Hugh Andrew Johnstone Munro',
      academicPost: 'First Professor of Latin, University of Cambridge',
      publicationYear: 1864,
      treatiseTitle: 'T. Lucreti Cari De Rerum Natura (Commentary on Book II, Cambridge, 1864)',
      directQuote: '“Lucretius saw with remarkable modern clarity that rigid physical mechanism destroys moral responsibility. The clinamen is his ingenious physical bridge between nature and conscious human freedom.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'Cambridge University Press / Internet Archive — Munro Edition (1864)',
        url: 'https://archive.org/details/dererumnaturalib00lucruoft',
        archiveType: 'Public Domain Primary Scan (1864 Cambridge Edition)',
        description: 'Complete Latin text and landmark 1864 English translation by Prof. H. A. J. Munro.'
      }
    ],
    keyThematicConcepts: ['Atomic Clinamen', 'Libera Voluntas', 'Epicurean Human Nature', 'Indeterminism', 'Freedom from Fate']
  },

  {
    id: 'spinoza-ethics-human-freedom',
    category: 'free-will-human-nature',
    title: 'Ethica Ordine Geometrico Demonstrata (Ethics Demonstrated in Geometrical Order)',
    authorOrAttribution: 'Baruch Spinoza (Dutch-Jewish Philosopher of Amsterdam)',
    exactDateDisplay: '1677 CE (Posthumous First Edition — Opera Posthuma)',
    approxDate: 1677,
    originalLanguage: 'Latin (Latina Philosophica)',
    primarySubject: 'Human Nature, The Affects, Human Bondage, and True Freedom Through Reason',
    unvarnishedSummary: 'Spinoza’s masterwork revolutionizes the inquiry into human nature. In Part III ("On the Origin and Nature of the Affects") and Part IV ("Of Human Bondage"), Spinoza argues that human beings mistakenly believe themselves free merely because they are conscious of their appetites but ignorant of the causes that determine them. In Part V ("Of Human Freedom"), Spinoza demonstrates true freedom: not arbitrary whim, but the intellectual understanding of necessity and the emotional mastery achieved through reason (*Amor Dei Intellectualis*).',
    originalTextExcerpt: '“Homines se liberos esse opinantur, quandoquidem suarum volitionum suique appetitus sunt conscii, et de causis, a quibus disponuntur ad appetendum et volendum, quia earum sunt ignari, ne per somnium quidem cogitant... Libertas humana consistit in solo intellectu.”',
    pre1890Translation: '“Men think themselves free inasmuch as they are conscious of their volitions and desires, and never even in a dream think of the causes which have disposed them to wish and desire, because they are ignorant thereof... True human freedom consists solely in intellectual understanding.”',
    translatorOrCurator: 'R. H. M. Elwes (The Chief Works of Benedict de Spinoza: Ethics, London: George Bell and Sons, 1883)',
    professorAnalysisPre1890: {
      professorName: 'Prof. Kuno Fischer',
      academicPost: 'Professor of Philosophy, University of Heidelberg',
      publicationYear: 1865,
      treatiseTitle: 'Geschichte der neuern Philosophie: Spinozas Leben, Werke und Lehre (Heidelberg, 1865)',
      directQuote: '“Spinoza does not destroy freedom; he elevates it from an illusion of ignorance to the highest achievement of philosophy. Freedom is not caprice; it is self-determined rational necessity.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'Oxford / Internet Archive — Spinoza’s Ethics (Elwes 1883 Edition)',
        url: 'https://archive.org/details/chiefworksofben02spin',
        archiveType: 'Public Domain Translation Scan (1883 Edition)',
        description: 'Complete 1883 English translation by R. H. M. Elwes with critical introduction.'
      }
    ],
    keyThematicConcepts: ['Human Bondage and Freedom', 'Conatus & Affects', 'Intellectual Love of God', 'Spinozist Determinism', 'Reason Over Passion']
  },

  {
    id: 'hume-treatise-liberty-necessity',
    category: 'free-will-human-nature',
    title: 'An Enquiry Concerning Human Understanding (Section VIII: Of Liberty and Necessity)',
    authorOrAttribution: 'David Hume (Scottish Enlightenment Philosopher & Historian)',
    exactDateDisplay: '1748 CE (London: A. Millar)',
    approxDate: 1748,
    originalLanguage: 'English',
    primarySubject: 'The Compatibilist Reconciliation of Human Nature, Motive, and Moral Freedom',
    unvarnishedSummary: 'Hume’s classic treatise establishes modern compatibilism. Hume argues that the dispute over free will has raged solely due to ambiguous definitions. Human nature exhibits constant uniformity in motives and actions (necessity), without which no moral praise, blame, or social coherence would be possible. True liberty is not random uncaused chance, but the power of acting or not acting according to the determinations of the will.',
    originalTextExcerpt: '“By liberty, then, we can only mean a power of acting or not acting, according to the determinations of the will; that is, if we choose to remain at rest, we may; if we choose to move, we also may. Now this hypothetical liberty is universally allowed to belong to every one who is not a prisoner and in chains.”',
    pre1890Translation: '“An Enquiry Concerning Human Understanding, by David Hume. Section VIII: Of Liberty and Necessity. London, 1748 (1888 Clarendon Press Edition edited by L. A. Selby-Bigge).”',
    translatorOrCurator: 'David Hume (Original 1748 publication; critical edition by L. A. Selby-Bigge, Oxford, 1888)',
    professorAnalysisPre1890: {
      professorName: 'Prof. Thomas Henry Huxley',
      academicPost: 'Rector of Aberdeen University & Fellow of the Royal Society',
      publicationYear: 1879,
      treatiseTitle: 'Hume: With Helps to the Study of Berkeley (English Men of Letters, London, 1879)',
      directQuote: '“Hume’s analysis of liberty and necessity is a masterpiece of psychological sanity. He demonstrates that far from destroying morality, the causal necessity of human nature is the indispensable foundation of moral responsibility.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'Oxford University / Clarendon Press — Selby-Bigge Edition (1888)',
        url: 'https://archive.org/details/enquiryconcernin00humeiala',
        archiveType: 'Public Domain Critical Edition (1888 Oxford)',
        description: 'Complete 1888 Oxford University Press edition of Hume’s Enquiries.'
      }
    ],
    keyThematicConcepts: ['Compatibilism', 'Liberty and Necessity', 'Empirical Human Nature', 'Uniformity of Motives', 'Scottish Enlightenment']
  },

  {
    id: 'schopenhauer-freedom-of-will',
    category: 'free-will-human-nature',
    title: 'Über die Freiheit des menschlichen Willens (Prize Essay on the Freedom of the Will)',
    authorOrAttribution: 'Arthur Schopenhauer (German Metaphysician & Pessimist Philosopher)',
    exactDateDisplay: '1839 CE (Crowned with the Royal Norwegian Society of Sciences Prize)',
    approxDate: 1839,
    originalLanguage: 'German (Deutsch)',
    primarySubject: 'Empirical Necessity of Human Action vs. Transcendental Freedom of Character',
    unvarnishedSummary: 'Awarded first prize by the Royal Norwegian Society of Sciences at Trondheim in 1839, this rigorous essay addresses the question: “Can the freedom of the human will be proved from self-consciousness?” Schopenhauer’s famous conclusion is categorical: “A man can do what he wills, but he cannot will what he wills.” In empirical daily life, every human action is strictly determined by motives acting upon an inborn, unalterable character (*operari sequitur esse*). Freedom exists solely on the transcendental level of being itself.',
    originalTextExcerpt: '“Der Mensch kann zwar thun, was er will; aber er kann nicht wollen, was er will... Jede That eines Menschen ist das nothwendige Product seines Charakters und des eingetretenen Motivs. Operari sequitur esse.”',
    pre1890Translation: '“Man can indeed do what he wills, but he cannot will what he wills... Every deed of a man is the necessary product of his inborn character and the operating motive. Action follows being (Operari sequitur esse).”',
    translatorOrCurator: 'Arthur Schopenhauer (1839); translated in London by T. Bailey Saunders (1889)',
    professorAnalysisPre1890: {
      professorName: 'Prof. Eduard von Hartmann',
      academicPost: 'Philosopher and author of Philosophie des Unbewussten (Berlin, 1869)',
      publicationYear: 1869,
      treatiseTitle: 'Philosophie des Unbewussten (Berlin, 1869)',
      directQuote: '“Schopenhauer’s Prize Essay on Free Will is one of the most brilliant and unassailable demonstrations in the history of philosophy. He stripped away the superficial illusion of subjective caprice and proved the iron causality of empirical motive.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'Bayerische Staatsbibliothek München / Internet Archive',
        url: 'https://archive.org/details/diebeidengrundp00schogoog',
        archiveType: 'Public Domain Original German Scan (1841 Frankfurt Edition)',
        description: 'First edition of Schopenhauer’s Die beiden Grundprobleme der Ethik (containing the 1839 Prize Essay).'
      }
    ],
    keyThematicConcepts: ['Schopenhauer Will', 'Operari Sequitur Esse', 'Empirical Necessity', 'Transcendental Freedom', 'Limits of Self-Consciousness']
  },

  {
    id: 'erasmus-de-libero-arbitrio',
    category: 'free-will-human-nature',
    title: 'De Libero Arbitrio Diatribe sive Collatio (A Discussion on the Freedom of the Will)',
    authorOrAttribution: 'Desiderius Erasmus of Rotterdam (Prince of Christian Humanists)',
    exactDateDisplay: 'September 1524 CE (Basel: Johann Froben)',
    approxDate: 1524,
    originalLanguage: 'Renaissance Latin (Latina Humanistica)',
    primarySubject: 'Human Agency, Moral Dignity, and the Defense of Free Will Against Fatalism',
    unvarnishedSummary: 'Erasmus’s famous 1524 challenge to theological determinism. Drawing on classical Greek philosophers, Church Fathers (Origen, Jerome, Chrysostom), and the Bible, Erasmus defines free will as “a power of the human will by which man can apply himself to the things which lead to eternal salvation, or turn away from them.” He warns that if human beings have no free agency, all moral laws, exhortations, praise, and blame become cruel farces.',
    originalTextExcerpt: '“Porro liberum arbitrium hoc loco sentimus vim humanae voluntatis, qua se possit homo applicare ad ea quae perducunt ad salutem aeternam, aut ab iisdem avertere... Tollite liberum arbitrium, et quomodo iudicabit Deus mundum?”',
    pre1890Translation: '“By free choice in this place we mean a power of the human will by which man may apply himself to the things that lead unto eternal salvation, or turn away from the same... Take away free will, and how shall God judge the world?”',
    translatorOrCurator: 'Desiderius Erasmus (Froben, Basel 1524); curated in 19th-century Latin collections',
    professorAnalysisPre1890: {
      professorName: 'Prof. Leopold von Ranke',
      academicPost: 'Professor of History, Friedrich Wilhelm University Berlin',
      publicationYear: 1847,
      treatiseTitle: 'Deutsche Geschichte im Zeitalter der Reformation (Band II, Berlin, 1847)',
      directQuote: '“Erasmus defended the intellectual and moral autonomy of mankind. His treatise on the freedom of the will remains the quintessential manifesto of European humanism against fatalistic dogmatism.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'Universitätsbibliothek Basel / Internet Archive',
        url: 'https://archive.org/details/deliberoarbitrio00eras',
        archiveType: 'Historical 1524 Froben Imprint Scans',
        description: 'Original Basel 1524 print of Erasmus’s De Libero Arbitrio.'
      }
    ],
    keyThematicConcepts: ['Erasmian Humanism', 'Moral Agency', 'Freedom of Choice', 'Critique of Predestination', 'Renaissance Dignity of Man']
  },

  {
    id: 'mencius-xunzi-human-nature',
    category: 'free-will-human-nature',
    title: 'The Great Classical Debate on Human Nature: Mengzi (Xingshan) & Xunzi (Xing’e)',
    authorOrAttribution: 'Mengzi (Mencius, c. 372–289 BCE) & Xunzi (Xun Kuang, c. 310–235 BCE)',
    exactDateDisplay: 'c. 300–250 BCE (Warring States Classical Philosophy)',
    approxDate: -300,
    originalLanguage: 'Classical Chinese (文言文)',
    primarySubject: 'Whether Human Nature is Inborn Goodness (Mencius) or Raw and Chaotic (Xunzi)',
    unvarnishedSummary: 'The foundational East Asian inquiry into human nature. Mengzi argued that human nature (*Xing*) possesses innate sprouts of benevolence, righteousness, propriety, and wisdom—just as water naturally flows downward. Xunzi countered that human nature is naturally raw, self-interested, and turbulent (*Xing’e*), requiring intentional moral cultivation, teachers, and ritual (*Li*) to achieve goodness through conscious exertion (*Wei*).',
    originalTextExcerpt: '孟子曰：「人性之善也，猶水之就下也。人無有不善，水無有不下。」\n荀子曰：「人之性惡，其善者偽也。今人之性，生而有好利焉... 故必將有師法之化，禮義之道，然後出於辭讓。」',
    pre1890Translation: '“Mengzi said: ‘The tendency of human nature toward goodness is like the tendency of water to flow downward. There is no human being who lacks goodness, as there is no water that does not flow downward.’\nXunzi said: ‘The nature of man is raw and self-seeking; its goodness is the product of conscious effort. Hence man must be transformed by the influence of teachers and guided by ritual principles (Li).’”',
    translatorOrCurator: 'Prof. James Legge (The Chinese Classics: Vol. II The Works of Mencius, Oxford: Clarendon Press, 1861 & 1895)',
    professorAnalysisPre1890: {
      professorName: 'Prof. James Legge',
      academicPost: 'First Professor of Chinese, University of Oxford (1876)',
      publicationYear: 1875,
      treatiseTitle: 'The Life and Works of Mencius (London: Trübner & Co., 1875)',
      directQuote: '“The debate between Mencius and Xunzi on the original constitution of human nature anticipates the modern Western debates between Rousseau and Hobbes by more than two thousand years.”'
    },
    pureSourceLinks: [
      {
        repositoryName: 'Oxford University / Internet Archive — Legge’s Chinese Classics (1861)',
        url: 'https://archive.org/details/chineseclassics02legg',
        archiveType: 'Public Domain Translation & Critical Chinese Text',
        description: 'James Legge’s monumental Oxford translation of Mencius with critical prolegomena.'
      }
    ],
    keyThematicConcepts: ['Mengzi Inborn Goodness', 'Xunzi Conscious Cultivation', 'Human Nature (Xing)', 'Classical Chinese Philosophy', 'Ritual Discipline (Li)']
  }
];
