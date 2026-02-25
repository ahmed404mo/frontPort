// data/weeksData.ts

export type Week = {
  id: number;          // رقم الأسبوع (مثلاً 1, 2, 3)
  divisionId: number;  // رقم القسم (مثلاً 1 للـ Third، 2 للـ Fourth)
  title: string;
  description: string;
  video?: string;
  website?: string;
  powerpoint?: string;
  pdf?: string;
  mentalMaps?:string;
  FlashCard?:string;
  E_Book?:string;
};

export const weeksData: Week[] = [
  // ============================================
  // بيانات Third Division (Division ID: 1)
  // ============================================
  {
    id: 1,
    divisionId: 1,
    title: "The First Week (Third Div)",
    description: "Introductory activities and lesson introduction.",
    video: "https://drive.google.com/file/d/1o_692qddzgmQO0jQPsigZWZ13TESss90/preview?usp=sharing",
    powerpoint: "https://docs.google.com/presentation/d/1e6MnKzE0sa5FG30zUFrPjdR1WkCoqU7t/embed",
    website: "/weeks/weekOne/dist/index.html",
    pdf: "https://drive.google.com/file/d/1GMK_46-1a8N9KJLr8QUDyBID_EILtNIU/view?usp=sharing"
  },
  {
    id: 2,
    divisionId: 1,
    title: "The second week (Third Div)",
    description: "Recognizing letters and sounds.",
    video: "https://ahmed404mo.github.io/E-Book/",
    powerpoint: "https://www.canva.com/design/DAG4UtEnUQo/view?embed",
    website: "https://little-explorer-journey.lovable.app/",
    pdf: "https://drive.google.com/file/d/1k1lyso2vQBa94n1KUdZLPLIjxl9FRHxi/view?usp=sharing"
  },
  {
    id: 3,
    divisionId: 1,
    title: "The third week (Third Div)",
    description: "Recognizing letters and sounds.",
    mentalMaps: "https://ahmed404mo.github.io/main-mind/",
    FlashCard: "https://ahmed404mo.github.io/flashCards/",
    E_Book: "https://ahmed404mo.github.io/book/",
  },

  // ============================================
  // بيانات Fourth Division (Division ID: 2)
  // (ضيف بيانات القسم الجديد هنا براحتك)
  // ============================================
  {
    id: 1,
    divisionId: 2, // <-- ده القسم الرابع
    title: "Week 1 (Fourth Division)",
    description: "Special content for Fourth Division.",
    video: "https://www.canva.com/design/DAG4UtEnUQo/view?embed", // ضيف الروابط الخاصة بالقسم ده
    website: "",
  },
];