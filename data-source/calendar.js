const DateTime = luxon.DateTime;

// Modify the holidays to include multiple years by wrapping each country's holidays in year-based objects
const holidays = {
    Thailand: {
        2024: {
            "2024-01-01": "New Year's Day",
            "2024-02-12": "Makha Bucha Day",
            "2024-04-06": "Chakri Memorial Day",
            "2024-04-07": "Substitute for Chakri Memorial Day",
            "2024-04-13": "Songkran Festival",
            "2024-04-14": "Songkran Festival",
            "2024-04-15": "Songkran Festival",
            "2024-04-16": "Songkran Observed",
            "2024-05-01": "Labor Day",
            "2024-05-04": "Coronation Day",
            "2024-05-05": "Substitute for Coronation Day",
            "2024-05-09": "Royal Ploughing Ceremony",
            "2024-05-11": "Visakha Bucha Day",
            "2024-05-12": "Substitute for Visakha Bucha Day",
            "2024-06-02": "Bridge Public Holiday",
            "2024-06-03": "Queen Suthida's Birthday",
            "2024-07-10": "Asalha Bucha Day",
            "2024-07-28": "King Vajiralongkorn's Birthday",
            "2024-08-11": "Bridge Public Holiday",
            "2024-08-12": "The Queen Mother's Birthday / Mother's Day",
            "2024-10-13": "King Bhumibol Memorial Day",
            "2024-10-23": "Chulalongkorn Day",
            "2024-12-05": "King Bhumibol's Birthday / Father's Day",
            "2024-12-10": "Constitution Day",
            "2024-12-31": "New Year's Eve"
        },
        2025: {
            "2025-01-01": "New Year's Day",
            "2025-02-12": "Makha Bucha Day",
            "2025-03-30": "End of Ramadan",
            "2025-04-06": "Chakri Memorial Day",
            "2025-04-07": "Substitute for Chakri Memorial Day",
            "2025-04-13": "Songkran Festival",
            "2025-04-14": "Songkran Festival",
            "2025-04-15": "Songkran Festival",
            "2025-04-16": "Songkran Observed",
            "2025-05-01": "Labor Day",
            "2025-05-04": "Coronation Day",
            "2025-05-05": "Substitute for Coronation Day",
            "2025-05-09": "Royal Ploughing Ceremony",
            "2025-05-11": "Visakha Bucha Day",
            "2025-05-12": "Substitute for Visakha Bucha Day",
            "2025-06-02": "Bridge Public Holiday",
            "2025-06-03": "Queen Suthida's Birthday",
            "2025-07-10": "Asalha Bucha Day",
            "2025-07-28": "King Vajiralongkorn's Birthday",
            "2025-08-11": "Bridge Public Holiday",
            "2025-08-12": "The Queen Mother's Birthday / Mother's Day",
            "2025-10-13": "King Bhumibol Memorial Day",
            "2025-10-23": "Chulalongkorn Day",
            "2025-12-05": "King Bhumibol's Birthday / Father's Day",
            "2025-12-10": "Constitution Day",
            "2025-12-31": "New Year's Eve"
        },
        2026: {
            "2026-01-01": "New Year's Day",
        "2026-01-02": "New Year Holiday",
        "2026-02-17": "Chinese New Year",
        "2026-03-03": "Makha Bucha Day",
        "2026-03-20": "End of Ramadan",
        "2026-04-06": "Chakri Day",
        "2026-04-13": "Songkran Festival",
        "2026-04-14": "Songkran Festival",
        "2026-04-15": "Songkran Festival",
        "2026-05-01": "Labour Day",
        "2026-05-01": "Visakha Bucha Day",
        "2026-05-04": "Coronation of King Vajiralongkorn Holiday",
        "2026-05-11": "Royal Ploughing Ceremony",
        "2026-06-03": "Queen Suthida's Birthday",
        "2026-07-28": "King Vajiralongkorn's Birthday",
        "2026-07-29": "Asahna Bucha Day",
        "2026-08-12": "The Queen Mother's Birthday",
        "2026-10-13": "King Bhumibol Adulyadej Memorial Day",
        "2026-10-23": "Chulalongkorn Memorial Day",
        "2026-12-05": "King Bhumibol Adulyadej's Birthday",
        "2026-12-10": "Constitution Day",
        "2026-12-31": "New Year's Eve"
        }
    },
    Myanmar: {
        2024: {
            "2024-01-01": "New Year's Day",
            "2024-01-04": "Independence Day",
            "2024-01-11": "Kayin New Year Day",
            "2024-02-12": "Union Day",
            "2024-03-02": "Peasants' Day",
            "2024-03-24": "Full Moon Day of Tabaung",
            "2024-03-27": "Armed Forces' Day",
            "2024-04-13": "Maha Thingyan (Water Festival)",
            "2024-04-14": "Maha Thingyan (Water Festival)",
            "2024-04-15": "Maha Thingyan (Water Festival)",
            "2024-04-16": "Maha Thingyan (Water Festival)",
            "2024-04-17": "Myanmar New Year",
            "2024-05-01": "Labour Day",
            "2024-05-22": "Full Moon Day of Kasone",
            "2024-07-19": "Martyrs' Day",
            "2024-07-20": "Full Moon Day of Waso",
            "2024-10-16": "Full Moon Day of Thadingyut",
            "2024-10-17": "Thadingyut Holiday",
            "2024-10-18": "Thadingyut Holiday",
            "2024-11-14": "Full Moon Day of Tazaungmone",
            "2024-11-15": "Tazaungmone Holiday",
            "2024-11-25": "National Day",
            "2024-12-25": "Christmas Day",
            "2024-12-30": "Kayin New Year Day",
            "2024-12-31": "New Year's Eve"
        },
        2025: {
            "2025-01-01": "New Year's Day",
            "2025-01-04": "Independence Day",
            "2025-01-29": "Chinese New Year",
            "2025-02-12": "Union Day",
            "2025-03-02": "Peasants' Day",
            "2025-03-13": "Full Moon Day of Tabaung",
            "2025-03-27": "Armed Forces' Day",
            "2025-04-13": "Thingyan Festival",
            "2025-04-14": "Thingyan Festival",
            "2025-04-15": "Thingyan Festival",
            "2025-04-16": "Thingyan Festival",
            "2025-04-17": "Myanmar New Year",
            "2025-05-01": "Labour Day",
            "2025-05-11": "Full Moon Day of Kasone",
            "2025-07-09": "Full Moon Day of Waso",
            "2025-07-19": "Martyrs' Day",
            "2025-10-05": "Full Moon Day of Thadingyut",
            "2025-10-06": "Thadingyut Holiday",
            "2025-10-07": "Thadingyut Holiday",
            "2025-11-03": "Day Before Full Moon Day of Tazaungmone",
            "2025-11-04": "Full Moon Day of Tazaungmone",
            "2025-11-14": "National Day",
            "2025-12-25": "Christmas Day",
            "2025-12-31": "New Year's Eve"
        },
        2026: {
            "2026-01-01": "New Year's Day",
            "2026-01-04": "Independence Day",
            "2026-02-12": "Union Day",
            "2026-03-02": "Peasants' Day",
            "2026-03-02": "Full Moon Day of Tabaung",
            "2026-03-27": "Armed Forces Day",
            "2026-04-13": "Thingyan Water Festival (Day 1)",
            "2026-04-14": "Thingyan Water Festival (Day 2)",
            "2026-04-15": "Thingyan Water Festival (Day 3)",
            "2026-04-16": "Thingyan Water Festival (Day 4)",
            "2026-04-17": "Myanmar New Year",
            "2026-04-30": "Full Moon Day of Kasong",
            "2026-05-01": "Labour Day",
            "2026-07-19": "Martyrs' Day",
            "2026-07-29": "Full Moon Day of Waso",
            "2026-10-24": "Full Moon Day of Thadingyut",
            "2026-11-22": "Full Moon Day of Tazaungmone",
            "2026-12-25": "Christmas Day",
            "2026-12-31": "New Year's Eve"
        }
    },
    Indonesia: {
        2024: {
            "2024-01-01": "New Year's Day",
        "2024-02-08": "Isra Mi'raj",
        "2024-02-10": "Chinese New Year",
        "2024-02-14": "Presidential Election",
        "2024-03-11": "Nyepi Day",
        "2024-03-29": "Good Friday",
        "2024-03-31": "Easter",
        "2024-04-10": "Eid al-Fitr",
        "2024-04-11": "Eid al-Fitr Holiday",
        "2024-05-01": "Labour Day",
        "2024-05-09": "Ascension Day of Jesus Christ",
        "2024-05-23": "Vesak Day",
        "2024-06-01": "Pancasila Day",
        "2024-06-17": "Eid al-Adha",
        "2024-07-07": "Islamic New Year",
        "2024-08-17": "Independence Day",
        "2024-09-16": "Prophet Muhammad's Birthday",
        "2024-12-25": "Christmas Day"
        },
        2025: {
            "2024-01-01": "New Year's Day",
    "2024-02-08": "Isra Mi'raj",
    "2024-02-10": "Chinese New Year",
    "2024-02-14": "Presidential Election",
    "2024-03-11": "Nyepi Day",
    "2024-03-29": "Good Friday",
    "2024-03-31": "Easter",
    "2024-04-10": "Eid al-Fitr",
    "2024-04-11": "Eid al-Fitr Holiday",
    "2024-05-01": "Labour Day",
    "2024-05-09": "Ascension Day of Jesus Christ",
    "2024-05-23": "Vesak Day",
    "2024-06-01": "Pancasila Day",
    "2024-06-17": "Eid al-Adha",
    "2024-07-07": "Islamic New Year",
    "2024-08-17": "Independence Day",
    "2024-09-16": "Prophet Muhammad's Birthday",
    "2024-12-25": "Christmas Day"
        },
        2026: {
            "2026-01-01": "New Year's Day",
    "2026-01-16": "Isra Mi'raj",
    "2026-02-17": "Chinese New Year",
    "2026-03-19": "Nyepi (Balinese Day of Silence)",
    "2026-03-20": "Hari Raya Idul Fitri",
    "2026-03-21": "Lebaran Holiday",
    "2026-04-03": "Good Friday",
    "2026-05-01": "Labour Day",
    "2026-05-14": "Ascension Day of Jesus Christ",
    "2026-05-27": "Eid al-Adha",
    "2026-05-31": "Vesak Day",
    "2026-06-01": "Pancasila Day",
    "2026-06-17": "Islamic New Year",
    "2026-08-17": "Independence Day",
    "2026-08-25": "Prophet Muhammad's Birthday",
    "2026-12-25": "Christmas Day"
        }
    },
    Singapore: {
       2024: {
        "2024-01-01": "New Year's Day",
    "2024-02-10": "Chinese New Year",
    "2024-02-11": "Chinese New Year Holiday",
    "2024-02-12": "Chinese New Year Holiday",
    "2024-03-29": "Good Friday",
    "2024-04-10": "Hari Raya Puasa",
    "2024-05-01": "Labour Day",
    "2024-05-22": "Vesak Day",
    "2024-06-17": "Hari Raya Haji",
    "2024-08-09": "National Day",
    "2024-10-31": "Deepavali",
    "2024-12-25": "Christmas Day"
       },
       2025: {
        "2025-01-01": "New Year's Day",
    "2025-01-29": "Chinese New Year",
    "2025-01-30": "Chinese New Year Holiday",
    "2025-03-31": "Hari Raya Puasa",
    "2025-04-18": "Good Friday",
    "2025-05-01": "Labour Day",
    "2025-05-12": "Vesak Day",
    "2025-06-07": "Hari Raya Haji",
    "2025-08-09": "National Day",
    "2025-10-20": "Deepavali",
    "2025-12-25": "Christmas Day"
       },
       2026: {
        "2026-01-01": "New Year's Day",
    "2026-02-17": "Chinese New Year",
    "2026-02-18": "Chinese New Year Holiday",
    "2026-03-20": "Hari Raya Puasa",
    "2026-04-03": "Good Friday",
    "2026-05-01": "Labour Day",
    "2026-05-27": "Hari Raya Haji",
    "2026-05-31": "Vesak Day",
    "2026-06-01": "Vesak Day Holiday",
    "2026-08-09": "National Day",
    "2026-08-10": "National Day Holiday",
    "2026-11-08": "Deepavali",
    "2026-11-09": "Deepavali Holiday",
    "2026-12-25": "Christmas Day"
       }
    },
    Malaysia: {
        2024: {
            "2024-01-01": "New Year's Day",
    "2024-01-14": "YDPB Negeri Sembilan's Birthday",
    "2024-01-15": "YDPB Negeri Sembilan's Birthday Holiday",
    "2024-01-25": "Thaipusam",
    "2024-02-01": "Federal Territory Day",
    "2024-02-10": "Chinese New Year",
    "2024-02-11": "Chinese New Year Holiday",
    "2024-02-12": "Chinese New Year Holiday",
    "2024-02-20": "Independence Declaration Day",
    "2024-03-04": "Installation of Sultan Terengganu",
    "2024-03-12": "Awal Ramadan",
    "2024-03-23": "Sultan of Johor's Birthday",
    "2024-03-28": "Nuzul Al-Quran",
    "2024-03-29": "Good Friday",
    "2024-04-10": "Hari Raya Aidilfitri",
    "2024-04-11": "Hari Raya Aidilfitri Holiday",
    "2024-04-26": "Sultan of Terengganu's Birthday",
    "2024-05-01": "Labour Day",
    "2024-05-17": "Raja Perlis' Birthday",
    "2024-05-22": "Hari Hol Pahang",
    "2024-05-22": "Wesak Day",
    "2024-05-30": "Harvest Festival",
    "2024-05-31": "Harvest Festival Holiday",
    "2024-06-01": "Hari Gawai",
    "2024-06-03": "Yang di-Pertuan Agong's Birthday",
    "2024-06-17": "Hari Raya Haji",
    "2024-07-07": "Awal Muharram",
    "2024-07-13": "Penang Governor's Birthday",
    "2024-07-22": "Sarawak Independence Day",
    "2024-07-30": "Sultan of Pahang's Birthday",
    "2024-08-11": "Almarhum Sultan Iskandar Hol Day",
    "2024-08-24": "Governor of Malacca's Birthday",
    "2024-08-31": "Malaysia's National Day",
    "2024-09-16": "The Prophet Muhammad's Birthday",
    "2024-09-16": "Malaysia Day",
    "2024-09-29": "Sultan of Kelantan's Birthday",
    "2024-09-30": "Holiday for Sultan of Kelantan's Birthday",
    "2024-10-05": "Governor of Sabah's Birthday",
    "2024-10-12": "Governor of Sarawak's Birthday",
    "2024-10-31": "Deepavali",
    "2024-12-25": "Christmas Day"
        },
        2025: {
            "2025-01-01": "New Year's Day",
            "2025-01-14": "YDPB Negeri Sembilan's Birthday",
            "2025-01-27": "Isra and Mi'raj",
            "2025-01-29": "Chinese New Year",
            "2025-01-30": "Chinese New Year Holiday",
            "2025-02-01": "Federal Territory Day",
            "2025-02-11": "Thaipusam",
            "2025-02-20": "Independence Declaration Day",
            "2025-03-02": "First Day of Ramadan",
            "2025-03-04": "Installation of Sultan Terengganu",
            "2025-03-18": "Nuzul Al-Quran",
            "2025-03-23": "Sultan of Johor's Birthday",
            "2025-03-31": "Hari Raya Puasa",
            "2025-04-01": "Hari Raya Puasa Holiday",
            "2025-04-18": "Good Friday",
            "2025-04-26": "Sultan of Terengganu's Birthday",
            "2025-05-01": "Labour Day",
            "2025-05-12": "Wesak Day",
            "2025-05-17": "Raja Perlis' Birthday",
            "2025-05-22": "Hari Hol Pahang",
            "2025-05-30": "Harvest Festival",
            "2025-05-31": "Harvest Festival Holiday",
            "2025-06-01": "Hari Gawai",
            "2025-06-02": "Hari Gawai Holiday",
            "2025-06-02": "Agong's Birthday",
            "2025-06-06": "Arafat Day",
            "2025-06-07": "Hari Raya Haji",
            "2025-06-08": "Hari Raya Haji Holiday",
            "2025-06-22": "Sultan of Kedah's Birthday",
            "2025-06-27": "Awal Muharram",
            "2025-07-07": "George Town Heritage Day",
            "2025-07-12": "Penang Governor's Birthday",
            "2025-07-22": "Sarawak Independence Day",
            "2025-07-30": "Sultan of Pahang's Birthday",
            "2025-07-31": "Hari Hol Almarhum Sultan Iskandar",
            "2025-08-24": "Governor of Malacca's Birthday",
            "2025-08-31": "Malaysia's National Day",
            "2025-09-05": "Maulidur Rasul",
            "2025-09-16": "Malaysia Day",
            "2025-09-29": "Sultan of Kelantan's Birthday",
            "2025-09-30": "Holiday for Sultan of Kelantan's Birthday",
            "2025-10-11": "Governor of Sarawak's Birthday",
            "2025-10-20": "Deepavali",
            "2025-12-25": "Christmas Day"
        },
        2026: {
            "2026-01-01": "New Year's Day",
            "2026-01-14": "YDPB Negeri Sembilan's Birthday",
            "2026-01-17": "Isra and Mi'raj",
            "2026-02-17": "Chinese New Year",
            "2026-02-18": "Chinese New Year Holiday",
            "2026-02-01": "Federal Territory Day",
            "2026-02-28": "Thaipusam",
            "2026-03-12": "First Day of Ramadan",
            "2026-03-16": "Nuzul Al-Quran",
            "2026-03-18": "Installation of Sultan Terengganu",
            "2026-03-23": "Sultan of Johor's Birthday",
            "2026-03-30": "Hari Raya Puasa",
            "2026-03-31": "Hari Raya Puasa Holiday",
            "2026-04-03": "Good Friday",
            "2026-04-26": "Sultan of Terengganu's Birthday",
            "2026-05-01": "Labour Day",
            "2026-05-01": "Wesak Day",
            "2026-05-17": "Raja Perlis' Birthday",
            "2026-05-22": "Hari Hol Pahang",
            "2026-05-30": "Harvest Festival",
            "2026-05-31": "Harvest Festival Holiday",
            "2026-06-01": "Hari Gawai",
            "2026-06-02": "Hari Gawai Holiday",
            "2026-06-06": "Agong's Birthday",
            "2026-06-25": "Arafat Day",
            "2026-06-26": "Hari Raya Haji",
            "2026-06-27": "Hari Raya Haji Holiday",
            "2026-07-12": "Penang Governor's Birthday",
            "2026-07-22": "Sarawak Independence Day",
            "2026-07-30": "Sultan of Pahang's Birthday",
            "2026-07-31": "Hari Hol Almarhum Sultan Iskandar",
            "2026-08-24": "Governor of Malacca's Birthday",
            "2026-08-31": "Malaysia's National Day",
            "2026-09-05": "Maulidur Rasul",
            "2026-09-16": "Malaysia Day",
            "2026-09-29": "Sultan of Kelantan's Birthday",
            "2026-09-30": "Holiday for Sultan of Kelantan's Birthday",
            "2026-10-11": "Governor of Sarawak's Birthday",
            "2026-10-09": "Awal Muharram",
            "2026-10-09": "Deepavali",
            "2026-12-25": "Christmas Day"
        }
    },
    China: {
        2024: {
            "2024-01-01": "New Year's Day",
        "2024-02-10": "Spring Festival",
        "2024-02-11": "Spring Festival Golden Week Holiday",
        "2024-02-12": "Spring Festival Golden Week Holiday",
        "2024-02-13": "Spring Festival Golden Week Holiday",
        "2024-02-14": "Spring Festival Golden Week Holiday",
        "2024-02-15": "Spring Festival Golden Week Holiday",
        "2024-02-16": "Spring Festival Golden Week Holiday",
        "2024-02-17": "Spring Festival Golden Week Holiday",
        "2024-04-04": "Qingming Festival",
        "2024-04-05": "Qingming Festival Holiday",
        "2024-04-06": "Qingming Festival Holiday",
        "2024-05-01": "Labor Day",
        "2024-05-02": "Labor Day Holiday",
        "2024-05-03": "Labor Day Holiday",
        "2024-05-04": "Labor Day Holiday",
        "2024-05-05": "Labor Day Holiday",
        "2024-06-10": "Dragon Boat Festival",
        "2024-09-15": "Mid-Autumn Festival",
        "2024-09-16": "Mid-Autumn Festival Holiday",
        "2024-09-17": "Mid-Autumn Festival Holiday",
        "2024-10-01": "National Day",
        "2024-10-02": "National Day Golden Week Holiday",
        "2024-10-03": "National Day Golden Week Holiday",
        "2024-10-04": "National Day Golden Week Holiday",
        "2024-10-05": "National Day Golden Week Holiday",
        "2024-10-06": "National Day Golden Week Holiday",
        "2024-10-07": "National Day Golden Week Holiday"
        },
        2025: {
            "2025-01-01": "New Year's Day",
        "2025-01-28": "Spring Festival Eve",
        "2025-01-29": "Chinese New Year",
        "2025-01-30": "Spring Festival Golden Week Holiday",
        "2025-01-31": "Spring Festival Golden Week Holiday",
        "2025-02-01": "Spring Festival Golden Week Holiday",
        "2025-02-02": "Spring Festival Golden Week Holiday",
        "2025-02-03": "Spring Festival Golden Week Holiday",
        "2025-02-04": "Spring Festival Golden Week Holiday",
        "2025-04-04": "Qingming Festival",
        "2025-05-01": "Labor Day",
        "2025-05-02": "Labor Day Holiday",
        "2025-05-03": "Labor Day Holiday",
        "2025-05-04": "Labor Day Holiday",
        "2025-05-05": "Labor Day Holiday",
        "2025-05-31": "Dragon Boat Festival",
        "2025-10-01": "National Day",
        "2025-10-02": "National Day Golden Week Holiday",
        "2025-10-03": "National Day Golden Week Holiday",
        "2025-10-04": "National Day Golden Week Holiday",
        "2025-10-05": "National Day Golden Week Holiday",
        "2025-10-06": "Mid-Autumn Festival",
        "2025-10-07": "National Day Golden Week Holiday",
        "2025-10-08": "National Day Golden Week Holiday"
        },
        2026: {
            "2026-01-01": "New Year's Day",
        "2026-01-02": "New Year Holiday",
        "2026-02-16": "Spring Festival Eve",
        "2026-02-17": "Chinese New Year",
        "2026-02-18": "Spring Festival Golden Week Holiday",
        "2026-02-19": "Spring Festival Golden Week Holiday",
        "2026-02-20": "Spring Festival Golden Week Holiday",
        "2026-02-21": "Spring Festival Golden Week Holiday",
        "2026-02-22": "Spring Festival Golden Week Holiday",
        "2026-02-23": "Spring Festival Golden Week Holiday",
        "2026-04-05": "Qingming Festival",
        "2026-05-01": "Labor Day",
        "2026-06-19": "Dragon Boat Festival",
        "2026-09-25": "Mid-Autumn Festival",
        "2026-10-01": "National Day",
        "2026-10-02": "National Day Golden Week Holiday",
        "2026-10-03": "National Day Golden Week Holiday",
        "2026-10-04": "National Day Golden Week Holiday",
        "2026-10-05": "National Day Golden Week Holiday",
        "2026-10-06": "National Day Golden Week Holiday",
        "2026-10-07": "National Day Golden Week Holiday"
        }
    }
};

const state = {
    selectedCountry: "Thailand",
    currentYear: DateTime.local().year,
    currentMonth: DateTime.local().month
};

function generateCalendar(month, year, holidayList) {
    const dt = DateTime.local(year, month);
    const firstDay = dt.startOf("month");
    const lastDay = dt.endOf("month");
    const today = DateTime.local();

    let html = `
        <div class="calendar-month">
            <div class="month-header">
                <h4>${dt.toFormat('LLLL yyyy')}</h4>
            </div>
            <div class="calendar-days">
                ${["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
                    .map(day => `<div class="day-header">${day}</div>`).join("")}
    `;

    for (let i = 0; i < firstDay.weekday % 7; i++) {
        html += `<div class="calendar-cell"></div>`;
    }

    for (let day = 1; day <= lastDay.day; day++) {
        const currentDate = DateTime.local(year, month, day);
        const fullDateStr = currentDate.toISODate(); // "YYYY-MM-DD"
        const mmdd = currentDate.toFormat('MM-dd');  // "MM-DD"

        const holidayName = holidayList[fullDateStr] || holidayList[mmdd];
        const isHoliday = !!holidayName;
        const isToday = currentDate.hasSame(today, 'day');

        html += `
            <div class="calendar-cell ${isHoliday ? 'holiday' : ''} ${isToday ? 'today' : ''}">
                <div class="day-number">${day}</div>
                ${isHoliday ? `<div class="holiday-label">${holidayName}</div>` : ""}
                ${isToday && !isHoliday ? `<div class="holiday-label">Today</div>` : ""}
            </div>
        `;
    }

    html += `</div></div>`;
    return html;
}

function populateCarousel() {
    const calendarCarousel = document.getElementById("calendar-carousel");
    calendarCarousel.innerHTML = "";
    const yearData = holidays[state.selectedCountry][state.currentYear] || {};
    
    for (let i = 1; i <= 12; i++) {
        const monthHTML = generateCalendar(i, state.currentYear, yearData);
        const isActive = (i === state.currentMonth) ? 'active' : '';
        const slide = document.createElement('div');
        slide.className = `carousel-item ${isActive}`;
        slide.innerHTML = monthHTML;
        calendarCarousel.appendChild(slide);
    }

    const carousel = new bootstrap.Carousel('#calendar-carousel', {
        interval: false,
        ride: false
    });

    carousel.to(state.currentMonth - 1);

    // Add event listeners for carousel navigation
    const carouselElement = document.getElementById('carouselExample');
    carouselElement.addEventListener('slide.bs.carousel', (event) => {
        const newMonth = event.to + 1; // Convert 0-based index to 1-based month
        state.currentMonth = newMonth;
        
        // Update the month dropdown
        const monthSelect = document.getElementById('month-select');
        monthSelect.value = newMonth;
    });
}

function initializeCalendar() {
    // Set default values to current year and month
    const yearSelect = document.getElementById('year-select');
    const monthSelect = document.getElementById('month-select');
    const countrySelect = document.getElementById('country-select');

    yearSelect.value = state.currentYear;
    monthSelect.value = state.currentMonth;

    // Add event listeners for dropdowns
    yearSelect.addEventListener('change', (e) => {
        state.currentYear = parseInt(e.target.value);
        populateCarousel();
    });

    monthSelect.addEventListener('change', (e) => {
        state.currentMonth = parseInt(e.target.value);
        populateCarousel();
    });

    countrySelect.addEventListener('change', (e) => {
        state.selectedCountry = e.target.value;
        populateCarousel();
    });

    // Initialize the calendar
    populateCarousel();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCalendar);

