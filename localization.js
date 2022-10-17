var locale = "en";

function localization(lan) {
alert("localization added");
    if (lan == "English") {
        locale = "en";
        //console.log(document.querySelectorAll("[data-lang]"));
        document.querySelectorAll("[data-lang]").forEach(translateElement);

    } else if (lan == "Hindi") {
        locale = "hindi";
        document.querySelectorAll("[data-lang]").forEach(translateElement);
        //console.log(document.querySelectorAll("[data-lang]"));

    } else if (lan == "Arab") {
        locale = "ar";
        document.querySelectorAll("[data-lang]").forEach(translateElement);
        //console.log(document.querySelectorAll("[data-lang]"));
    }
}

function translateElement(element) {
    const key = element.getAttribute("data-lang");
    const translation = translations[locale][key];
    element.innerText = translation;
}


const translations = {
    // English translations
    "en": {
        "home": "Home",
        "Student-Panel": "Student Panel",
        "About-Project": "About Project",
        "welcome": "Welcome",
        "sign-up": "Sign Up",
        "sign-in": "Sign In",
        "user_fname": "First Name",
        "user_lname": "Last Name",
        "user_uname": "User Name",
        "register": "Register",
        "login": "Login",
        "creater": "Saurabh Kumar Rai",

        "sign_out": "Sign out",
        "Create_Quiz": "Create Quiz",
        "Create": "Create",
        "Add_Question": "Add Question",
        "All_Quizess": "All Quizess",

        
        "admin_h1": "Admin Panel",
        "admin_p1": "1-Quiz object send to JSON Server.",
        "admin_p2": "2-Admin Start Quiz and share a Prandom No. to student",
        "admin_p3": "9-Data fetched from JSON Server<--- ",
        "admin_p4": "10-All Student name with their marks will shown in Response",

        "json_h1":"Json Server",
        "json_p1":"3-Data stored in JSON Server",
        "json_p3":"8-Data updated on JSON Server",

        "stud_h2":"Start Quiz",
        "stud_h3":"Response",
        "stud_p1":">4-Student start quiz using prandom no.",
        "stud_p2":"-->5-Student Give Quiz",
        "stud_p3":"6-Student Submit quiz",
        "stud_p4":" <---7-Marks will be calculated and stored on JSON Server along wih Student Name",
    },

    // Hindi translations
    "hindi": {
        "home": "गृह",
        "Student-Panel": "छात्र पैनल",
        "About-Project": "परियोजना के बारे में",
        "welcome": "आपका स्वागत है",
        "sign-up": "साइन अप",
        "sign-in": "साइन इन",
        "user_fname": "प्रथम नाम",
        "user_lname": "अंतिम नाम",
        "user_uname": "उपयोगकर्ता नाम",
        "register": "पंजीकृत",
        "login": "लॉग इन",
        "creater": "सौरभ कुमार राय",


        "sign_out": "साइन आउट",
        "Create_Quiz": "क्विज़ बनाएं",
        "Create": "सृजन करना",
        "Add_Question": "प्रश्न जोड़ें",
        "All_Quizess": "सभी प्रश्नोत्तरी",


        "admin_h1": "व्यवस्थापक पैनल",
        "admin_p1": "1-क्विज़ ऑब्जेक्ट JSON सर्वर को भेजें।",
        "admin_p2": "2-व्यवस्थापक प्रारंभ प्रश्नोत्तरी और छात्र को एक यादृच्छिक संख्या साझा करें",
        "admin_p3": "9-डेटा JSON सर्वर से प्राप्त किया गया",
        "admin_p4": "1-क्विज़ ऑब्जेक्ट JSON सर्वर को भेजें।",
        "admin_p5": "10-सभी छात्र का नाम उनके अंकों के साथ प्रत्युत्तर में दिखाया जाएगा",

        "json_h1":"JSON सर्वर",
        "json_p1":"3-डेटा JSON सर्वर में संग्रहीत",
        "json_p3":"8-डेटा JSON सर्वर पर अपडेट किया गया",

        "stud_h2":"प्रश्नोत्तरी शुरू करें",
        "stud_h3":"जवाब",
        "stud_p1":"4-छात्र ने प्रैंडम नंबर का उपयोग करके प्रश्नोत्तरी शुरू की।",
        "stud_p2":"->5-छात्र प्रश्नोत्तरी दें",
        "stud_p3":"6-छात्र प्रश्नोत्तरी सबमिट करें",
        "stud_p4":"<---7-अंकों की गणना की जाएगी और छात्र के नाम के साथ JSON सर्वर पर संग्रहीत किया जाएगा",
        
    },

    // Arabic translations
    "ar": {
        "home": "مسكن",
        "Student-Panel": "لوحة الطالب",
        "About-Project": "حول المشروع",
        "welcome": "أهلا وسهلا",
        "sign-up": "اشتراك الدخو",
        "sign-in": "تسجيل الدخول",
        "user_fname": "الاسم الاول",
        "user_lname": "الكنية",
        "user_uname": "اسم االمستخدم",
        "register": "يسجل",
        "login": "تسجيل الدخول",
        "creater": "سوراب كومار راي",


        "sign_out": "خروج",
        "Create_Quiz": "إنشاء اختبار",
        "Create": "خلق",
        "Add_Question": "إضافة سؤال",
        "All_Quizess": "جميع الاختبارات",

        "admin_h1": "لوحة الادارة",
        "admin_p1": "1-إرسال كائن الاختبار JSON إلى الخادم",
        "admin_p2": "2-بدء الاختبار ومشاركة رقم عشوائي للطالب",
        "admin_p3": "9-تم استلام البيانات من خادم JSON",
        "admin_p4": "1-أرسل كائن الاختبار JSON إلى الخادم.",
        "admin_p5": "10-أرسل كائن الاختبار JSON إلى الخادم.",

        "json_h1":"JSON الخادم",
        "json_p1":"3-البيانات المخزنة في خادم JSON",
        "json_p3":"8-تم تحديث البيانات JSON على الخادم",

        "stud_h2":"بدء الاختبار",
        "stud_h3":"إجابه",
        "stud_p1":"4-بدأ الطالب الاختبار",
        "stud_p2":"->5-مسابقة الطالب",
        "stud_p3":"6-إرسال اختبار ",
        "stud_p4":"<---7سيتم حساب 7 أرقام وتخزينها على خادم JSON باسم الطالب",

    },
};

