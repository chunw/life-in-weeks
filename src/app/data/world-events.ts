// World Events Data - Major historical events from 1986 onwards
// These appear as small overlay indicators when toggled on

export interface WorldEvent {
  headline: string
  description?: string
  category: 'politics' | 'technology' | 'disaster' | 'culture' | 'economy' | 'war'
}

export const worldEvents: Record<string, WorldEvent[]> = {
  "1989-03-12": [
    {
      headline: "🌐 World Wide Web Invented",
      description: "Tim Berners-Lee creates the web at CERN - https://en.wikipedia.org/wiki/World_Wide_Web",
      category: "technology"
    }
  ],
  "1989-11-09": [
    {
      headline: "🧱 Berlin Wall Falls",
      description: "End of Cold War symbol - https://en.wikipedia.org/wiki/Fall_of_the_Berlin_Wall",
      category: "politics"
    }
  ],
  "1991-12-25": [
    {
      headline: "🇷🇺 Soviet Union Dissolves",
      description: "End of USSR - https://en.wikipedia.org/wiki/Dissolution_of_the_Soviet_Union",
      category: "politics"
    }
  ],
  "1995-08-24": [
    {
      headline: "💻 Windows 95 Released",
      description: "Microsoft's breakthrough OS - https://en.wikipedia.org/wiki/Windows_95",
      category: "technology"
    }
  ],
  "1997-08-31": [
    {
      headline: "👑 Princess Diana Dies",
      description: "Car crash in Paris - https://en.wikipedia.org/wiki/Death_of_Diana,_Princess_of_Wales",
      category: "culture"
    }
  ],
  "1998-09-04": [
    {
      headline: "🔍 Google Founded",
      description: "Larry Page and Sergey Brin start Google - https://en.wikipedia.org/wiki/History_of_Google",
      category: "technology"
    }
  ],
  "2001-09-11": [
    {
      headline: "🏢 9/11 Attacks",
      description: "Twin Towers destroyed - https://en.wikipedia.org/wiki/September_11_attacks",
      category: "war"
    }
  ],
  "2004-02-04": [
    {
      headline: "👥 Facebook Founded",
      description: "Mark Zuckerberg launches TheFacebook - https://en.wikipedia.org/wiki/History_of_Facebook",
      category: "technology"
    }
  ],
  "2007-01-09": [
    {
      headline: "📱 iPhone Announced",
      description: "Apple revolutionizes smartphones - https://en.wikipedia.org/wiki/IPhone_(1st_generation)",
      category: "technology"
    }
  ],
  "2008-09-15": [
    {
      headline: "📉 Lehman Brothers Collapses",
      description: "Global financial crisis - https://en.wikipedia.org/wiki/Bankruptcy_of_Lehman_Brothers",
      category: "economy"
    }
  ],
  "2009-01-03": [
    {
      headline: "₿ Bitcoin Genesis Block",
      description: "Satoshi Nakamoto mines first Bitcoin - https://en.wikipedia.org/wiki/Bitcoin",
      category: "technology"
    }
  ],
  "2009-01-20": [
    {
      headline: "🇺🇸 Barack Obama Inaugurated",
      description: "First Black US President takes office - https://en.wikipedia.org/wiki/Barack_Obama",
      category: "politics"
    }
  ],
  "2010-04-03": [
    {
      headline: "📱 iPad Released",
      description: "Apple launches tablet revolution - https://en.wikipedia.org/wiki/IPad",
      category: "technology"
    }
  ],
  "2010-10-06": [
    {
      headline: "📸 Instagram Launched",
      description: "Photo-sharing app goes live - https://en.wikipedia.org/wiki/Instagram",
      category: "technology"
    }
  ],
  "2010-12-17": [
    {
      headline: "🌍 Arab Spring Begins",
      description: "Democratic uprisings across Middle East and North Africa - https://en.wikipedia.org/wiki/Arab_Spring",
      category: "politics"
    }
  ],
  "2012-10-29": [
    {
      headline: "🌊 Hurricane Sandy",
      description: "Superstorm hits US East Coast - https://en.wikipedia.org/wiki/Hurricane_Sandy",
      category: "disaster"
    }
  ],
  "2013-06-06": [
    {
      headline: "🔓 Snowden Leaks NSA Surveillance",
      description: "Edward Snowden reveals global surveillance programs - https://en.wikipedia.org/wiki/Edward_Snowden",
      category: "politics"
    }
  ],
  "2014-02-19": [
    {
      headline: "💬 Facebook Acquires WhatsApp",
      description: "$19 billion acquisition - https://en.wikipedia.org/wiki/WhatsApp",
      category: "technology"
    }
  ],
  "2015-06-26": [
    {
      headline: "🏳️‍🌈 US Legalizes Same-Sex Marriage",
      description: "Supreme Court ruling nationwide - https://en.wikipedia.org/wiki/Obergefell_v._Hodges",
      category: "culture"
    }
  ],
  "2016-06-23": [
    {
      headline: "🇬🇧 Brexit Vote",
      description: "UK votes to leave European Union - https://en.wikipedia.org/wiki/Brexit",
      category: "politics"
    }
  ],
  "2016-11-08": [
    {
      headline: "🇺🇸 Donald Trump Elected President",
      description: "Trump defeats Clinton in US election - https://en.wikipedia.org/wiki/2016_United_States_presidential_election",
      category: "politics"
    }
  ],
  "2017-10-05": [
    {
      headline: "#️⃣ #MeToo Movement Goes Viral",
      description: "Weinstein allegations spark global movement - https://en.wikipedia.org/wiki/Me_Too_movement",
      category: "culture"
    }
  ],
  "2020-01-21": [
    {
      headline: "🦠 First US COVID Case",
      description: "Pandemic begins - https://en.wikipedia.org/wiki/COVID-19_pandemic",
      category: "disaster"
    }
  ],
  "2020-05-25": [
    {
      headline: "✊ George Floyd Killed",
      description: "Death sparks global Black Lives Matter protests - https://en.wikipedia.org/wiki/George_Floyd",
      category: "culture"
    }
  ],
  "2021-01-06": [
    {
      headline: "🏛️ US Capitol Attack",
      description: "Riot during 2020 election certification - https://en.wikipedia.org/wiki/January_6_United_States_Capitol_attack",
      category: "politics"
    }
  ],
  "2021-10-28": [
    {
      headline: "🌐 Facebook Renamed to Meta",
      description: "Mark Zuckerberg announces company rebranding to focus on metaverse - https://en.wikipedia.org/wiki/Meta_Platforms",
      category: "technology"
    }
  ],
  "2022-02-24": [
    {
      headline: "🇺🇦 Russia Invades Ukraine",
      description: "Full-scale invasion begins - https://en.wikipedia.org/wiki/Russian_invasion_of_Ukraine",
      category: "war"
    }
  ],
  "2022-11-30": [
    {
      headline: "🤖 ChatGPT Launches",
      description: "AI chatbot reaches 100M users in 2 months - https://en.wikipedia.org/wiki/ChatGPT",
      category: "technology"
    }
  ]
}