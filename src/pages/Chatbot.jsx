import { useState, useRef, useEffect } from "react";
import {
  BotIcon,
  FileTextIcon,
  SettingsIcon,
  BarChartIcon,
} from "lucide-react";
import React from "react";

const navItems = [
  { name: "Chat", icon: BotIcon, key: "assistant" },
  { name: "Workflow", icon: FileTextIcon, key: "templates" },
  { name: "OpenData", icon: BarChartIcon, key: "stats" },
  // { name: "Settings", icon: SettingsIcon, key: "settings" },
];
const dataSources = [
  "🐘 Protecting Giants: The Elephant Habitat Recovery Plan",
  "🦏 Last Line of Defense: Anti-Poaching Units for Rhinos",
  "🦁 Safe Passage: Wildlife Corridor Restoration Across Borders",
  "🐅 Bringing Back the Big Cats: Panthera Recovery Program",
  "🌳 Restoring the Green Belt: Native Forests Reforestation",
  "🌲 Forests for the Future: Sustainable Logging Alternatives",
  "🌿 Living Lands: Indigenous Stewardship and Forest Protection",
  "💧 Saving Our Source: River Basin Clean-Up and Protection",
  "🐠 Coral Comeback: Reef Regeneration Through Community Action",
  "🏝️ Plastic-Free Coastlines: Marine Waste Elimination Program",
  "🌎 Nature-Based Climate Solutions: Scaling Green Carbon Projects",
  "🔋 Power Shift: Transitioning Rural Communities to Solar Energy",
  "🔥 Adapting for Tomorrow: Climate Resilience in Vulnerable Areas",
  "🌾 Feeding the Planet Sustainably: Agroecology for Local Farmers",
  "🥗 Less Waste, More Future: Food Loss Reduction in Urban Areas",
  "🐄 Greener Grazing: Rangeland Management for Carbon and Wildlife",
  "🐟 Sustainable Seas: Empowering Artisanal Fishers with Tools and Rights",
  "🦓 Living with Nature: Human-Wildlife Conflict Mitigation Program",
  "🗣️ Voices of Nature: Empowering Local Leaders in Conservation",
  "🤝 Together for Nature: Business and Government Climate Coalition",
  "📊 Nature Counts: Data-Driven Decision Making for Biodiversity",
  "🌐 One Planet Learning: Environmental Education for Youth",
  "🛡️ Forest Shield: Fire Prevention and Community Response Program",
  "🔬 Earth Data Watch: Real-Time Ecosystem Monitoring",
  "🛰️ WildEyes: Drone Surveillance for Protected Areas"
];

const tableSample = [
  [
    "ID", "Project Name", "Status", "Region", "Country", "Start Date", "End Date", "Budget (USD)", 
    "Lead Scientist", "Project Manager", "Team Size", "Target Species", "Forest Area (ha)", 
    "Protected Zones", "Community Partners", "Gov. Partners", "Satellite Monitoring", 
    "Poaching Incidents", "Species Sightings", "Biodiversity Index", "Carbon Offset (tons)", 
    "Water Sources Preserved", "Conflict Zones", "Drone Coverage (%)", "Training Workshops", 
    "Field Stations", "Last Audit", "Funding Source", "NGO Collaborators", "Report Submitted"
  ],
  [
    "001", "Wildlife Corridor Preservation", "Active", "Eastern Africa", "Kenya", "2023-01-15", 
    "2025-12-20", "2,400,000", "Dr. Kamau N.", "Jane Doe", "22", "Elephant, Leopard", "12,000", 
    "5", "Mara Eco Trust", "Kenya Wildlife Service", "Yes", "3", "212", "0.81", "3,200", 
    "9", "1", "76", "8", "4", "2024-06-10", "WWF Global", "Conservation Int'l", "Yes"
  ],
  [
    "002", "River Basin Restoration", "Planning", "South-East Asia", "Indonesia", "2024-03-01", 
    "2027-10-15", "1,800,000", "Dr. Lin Surya", "Budi Santoso", "17", "Orangutan, Hornbill", 
    "6,500", "3", "Forest Watch Asia", "Indonesia Forest Dept.", "No", "0", "34", "0.64", 
    "1,100", "5", "0", "0", "2", "2", "2024-07-01", "EU Grant", "Rainforest Foundation", "No"
  ],
  [
    "003", "Coastal Mangrove Resilience", "Completed", "South America", "Colombia", "2020-05-10", 
    "2023-11-30", "950,000", "Dr. Maria Lopez", "Carlos Reyes", "10", "Sea Turtle, Crab", 
    "3,200", "2", "GreenCoast Assoc.", "Colombia Enviro Dept.", "Yes", "1", "89", "0.72", 
    "850", "3", "0", "60", "5", "3", "2023-12-10", "UNEP", "WWF Coastal Division", "Yes"
  ],
  [
    "004", "Snow Leopard Range Expansion", "Active", "Central Asia", "Nepal", "2022-07-01", 
    "2026-12-31", "3,100,000", "Dr. Tashi Lama", "Lhamo Dorje", "14", "Snow Leopard", 
    "5,800", "4", "Himalaya Wildwatch", "Nepal Wildlife Dept.", "Yes", "2", "105", "0.79", 
    "2,200", "2", "0", "85", "6", "2", "2024-04-22", "USAID", "Panthera", "Yes"
  ],
  [
    "005", "Wetlands Revival Project", "Ongoing", "Eastern Europe", "Poland", "2021-03-20", 
    "2025-11-11", "1,250,000", "Dr. Anna Novak", "Tomasz Zielinski", "12", "Beaver, Heron", 
    "4,500", "3", "EcoPolska", "Polish Forest Dept.", "Yes", "0", "58", "0.68", 
    "1,500", "4", "0", "45", "4", "2", "2024-05-15", "WWF EU", "BirdLife Int'l", "Yes"
  ],
  [
    "006", "Amazon Biodiversity Defense", "Active", "South America", "Brazil", "2022-10-01", 
    "2026-03-01", "5,000,000", "Dr. Joana Silva", "Pedro Costa", "30", "Jaguar, Macaw", 
    "18,000", "7", "Amazonia Alliance", "IBAMA", "Yes", "5", "311", "0.88", 
    "5,800", "7", "2", "92", "10", "6", "2024-07-12", "WWF US", "IUCN", "Yes"
  ],
  [
    "007", "Reef Restoration Lab", "In Progress", "Oceania", "Fiji", "2023-06-01", 
    "2025-08-30", "820,000", "Dr. Niko Vuki", "Mere Naivalu", "9", "Clownfish, Coral", 
    "N/A", "1", "BlueReef Fiji", "Fiji Marine Dept.", "Yes", "0", "47", "0.59", 
    "400", "2", "0", "70", "3", "1", "2024-06-28", "Pacific Fund", "CoralWatch", "No"
  ],
  [
    "008", "Savannah Fire Buffer Zones", "Completed", "Southern Africa", "Botswana", "2019-09-01", 
    "2022-10-31", "1,600,000", "Dr. Kabelo Dube", "Thandi Mokoena", "15", "Wild Dog, Giraffe", 
    "9,200", "4", "Savannah Alliance", "Botswana Parks", "Yes", "1", "132", "0.76", 
    "2,700", "6", "1", "68", "4", "3", "2022-11-10", "GCF", "WWF Africa", "Yes"
  ],
  [
    "009", "Island Species Monitoring", "Ongoing", "Pacific Islands", "Vanuatu", "2022-01-10", 
    "2025-06-01", "670,000", "Dr. Tui Kalo", "Mele Tahi", "8", "Fruit Bat, Gecko", 
    "1,100", "2", "IslandLife Network", "Vanuatu Enviro Dept.", "No", "0", "26", "0.55", 
    "300", "1", "0", "20", "2", "1", "2024-04-01", "SPREP", "Nature Conservancy", "No"
  ],
  [
    "010", "Urban Biodiversity Corridors", "Active", "Western Europe", "Germany", "2023-02-15", 
    "2026-05-30", "2,200,000", "Dr. Klaus Richter", "Lena Schulz", "20", "Birds, Hedgehog", 
    "750", "12", "GreenBerlin", "Berlin City Council", "Yes", "0", "112", "0.73", 
    "950", "0", "0", "40", "6", "3", "2024-06-01", "WWF Germany", "ICLEI", "Yes"
  ],
  [
    "011", "Desert Oryx Reintroduction", "In Progress", "Middle East", "Jordan", "2023-10-01", 
    "2027-04-15", "1,450,000", "Dr. Hadi Zahran", "Amal Najjar", "11", "Arabian Oryx", 
    "2,300", "2", "DesertLife Assoc.", "Jordan Wildlife Authority", "Yes", "0", "62", "0.70", 
    "1,000", "3", "0", "65", "3", "2", "2024-07-05", "World Bank", "WWF MENA", "No"
  ],
  [
    "006", "Amazon Biodiversity Defense", "Active", "South America", "Brazil", "2022-10-01", 
    "2026-03-01", "5,000,000", "Dr. Joana Silva", "Pedro Costa", "30", "Jaguar, Macaw", 
    "18,000", "7", "Amazonia Alliance", "IBAMA", "Yes", "5", "311", "0.88", 
    "5,800", "7", "2", "92", "10", "6", "2024-07-12", "WWF US", "IUCN", "Yes"
  ],
  [
    "007", "Reef Restoration Lab", "In Progress", "Oceania", "Fiji", "2023-06-01", 
    "2025-08-30", "820,000", "Dr. Niko Vuki", "Mere Naivalu", "9", "Clownfish, Coral", 
    "N/A", "1", "BlueReef Fiji", "Fiji Marine Dept.", "Yes", "0", "47", "0.59", 
    "400", "2", "0", "70", "3", "1", "2024-06-28", "Pacific Fund", "CoralWatch", "No"
  ],
  [
    "008", "Savannah Fire Buffer Zones", "Completed", "Southern Africa", "Botswana", "2019-09-01", 
    "2022-10-31", "1,600,000", "Dr. Kabelo Dube", "Thandi Mokoena", "15", "Wild Dog, Giraffe", 
    "9,200", "4", "Savannah Alliance", "Botswana Parks", "Yes", "1", "132", "0.76", 
    "2,700", "6", "1", "68", "4", "3", "2022-11-10", "GCF", "WWF Africa", "Yes"
  ],
  [
    "009", "Island Species Monitoring", "Ongoing", "Pacific Islands", "Vanuatu", "2022-01-10", 
    "2025-06-01", "670,000", "Dr. Tui Kalo", "Mele Tahi", "8", "Fruit Bat, Gecko", 
    "1,100", "2", "IslandLife Network", "Vanuatu Enviro Dept.", "No", "0", "26", "0.55", 
    "300", "1", "0", "20", "2", "1", "2024-04-01", "SPREP", "Nature Conservancy", "No"
  ],
  [
    "010", "Urban Biodiversity Corridors", "Active", "Western Europe", "Germany", "2023-02-15", 
    "2026-05-30", "2,200,000", "Dr. Klaus Richter", "Lena Schulz", "20", "Birds, Hedgehog", 
    "750", "12", "GreenBerlin", "Berlin City Council", "Yes", "0", "112", "0.73", 
    "950", "0", "0", "40", "6", "3", "2024-06-01", "WWF Germany", "ICLEI", "Yes"
  ],
  [
    "011", "Desert Oryx Reintroduction", "In Progress", "Middle East", "Jordan", "2023-10-01", 
    "2027-04-15", "1,450,000", "Dr. Hadi Zahran", "Amal Najjar", "11", "Arabian Oryx", 
    "2,300", "2", "DesertLife Assoc.", "Jordan Wildlife Authority", "Yes", "0", "62", "0.70", 
    "1,000", "3", "0", "65", "3", "2", "2024-07-05", "World Bank", "WWF MENA", "No"
  ]
  ,
  [
    "006", "Amazon Biodiversity Defense", "Active", "South America", "Brazil", "2022-10-01", 
    "2026-03-01", "5,000,000", "Dr. Joana Silva", "Pedro Costa", "30", "Jaguar, Macaw", 
    "18,000", "7", "Amazonia Alliance", "IBAMA", "Yes", "5", "311", "0.88", 
    "5,800", "7", "2", "92", "10", "6", "2024-07-12", "WWF US", "IUCN", "Yes"
  ],
  [
    "007", "Reef Restoration Lab", "In Progress", "Oceania", "Fiji", "2023-06-01", 
    "2025-08-30", "820,000", "Dr. Niko Vuki", "Mere Naivalu", "9", "Clownfish, Coral", 
    "N/A", "1", "BlueReef Fiji", "Fiji Marine Dept.", "Yes", "0", "47", "0.59", 
    "400", "2", "0", "70", "3", "1", "2024-06-28", "Pacific Fund", "CoralWatch", "No"
  ],
  [
    "008", "Savannah Fire Buffer Zones", "Completed", "Southern Africa", "Botswana", "2019-09-01", 
    "2022-10-31", "1,600,000", "Dr. Kabelo Dube", "Thandi Mokoena", "15", "Wild Dog, Giraffe", 
    "9,200", "4", "Savannah Alliance", "Botswana Parks", "Yes", "1", "132", "0.76", 
    "2,700", "6", "1", "68", "4", "3", "2022-11-10", "GCF", "WWF Africa", "Yes"
  ],
  [
    "009", "Island Species Monitoring", "Ongoing", "Pacific Islands", "Vanuatu", "2022-01-10", 
    "2025-06-01", "670,000", "Dr. Tui Kalo", "Mele Tahi", "8", "Fruit Bat, Gecko", 
    "1,100", "2", "IslandLife Network", "Vanuatu Enviro Dept.", "No", "0", "26", "0.55", 
    "300", "1", "0", "20", "2", "1", "2024-04-01", "SPREP", "Nature Conservancy", "No"
  ],
  [
    "010", "Urban Biodiversity Corridors", "Active", "Western Europe", "Germany", "2023-02-15", 
    "2026-05-30", "2,200,000", "Dr. Klaus Richter", "Lena Schulz", "20", "Birds, Hedgehog", 
    "750", "12", "GreenBerlin", "Berlin City Council", "Yes", "0", "112", "0.73", 
    "950", "0", "0", "40", "6", "3", "2024-06-01", "WWF Germany", "ICLEI", "Yes"
  ],
  [
    "011", "Desert Oryx Reintroduction", "In Progress", "Middle East", "Jordan", "2023-10-01", 
    "2027-04-15", "1,450,000", "Dr. Hadi Zahran", "Amal Najjar", "11", "Arabian Oryx", 
    "2,300", "2", "DesertLife Assoc.", "Jordan Wildlife Authority", "Yes", "0", "62", "0.70", 
    "1,000", "3", "0", "65", "3", "2", "2024-07-05", "World Bank", "WWF MENA", "No"
  ],
  [
    "006", "Amazon Biodiversity Defense", "Active", "South America", "Brazil", "2022-10-01", 
    "2026-03-01", "5,000,000", "Dr. Joana Silva", "Pedro Costa", "30", "Jaguar, Macaw", 
    "18,000", "7", "Amazonia Alliance", "IBAMA", "Yes", "5", "311", "0.88", 
    "5,800", "7", "2", "92", "10", "6", "2024-07-12", "WWF US", "IUCN", "Yes"
  ],
  [
    "007", "Reef Restoration Lab", "In Progress", "Oceania", "Fiji", "2023-06-01", 
    "2025-08-30", "820,000", "Dr. Niko Vuki", "Mere Naivalu", "9", "Clownfish, Coral", 
    "N/A", "1", "BlueReef Fiji", "Fiji Marine Dept.", "Yes", "0", "47", "0.59", 
    "400", "2", "0", "70", "3", "1", "2024-06-28", "Pacific Fund", "CoralWatch", "No"
  ],
  [
    "008", "Savannah Fire Buffer Zones", "Completed", "Southern Africa", "Botswana", "2019-09-01", 
    "2022-10-31", "1,600,000", "Dr. Kabelo Dube", "Thandi Mokoena", "15", "Wild Dog, Giraffe", 
    "9,200", "4", "Savannah Alliance", "Botswana Parks", "Yes", "1", "132", "0.76", 
    "2,700", "6", "1", "68", "4", "3", "2022-11-10", "GCF", "WWF Africa", "Yes"
  ],
  [
    "009", "Island Species Monitoring", "Ongoing", "Pacific Islands", "Vanuatu", "2022-01-10", 
    "2025-06-01", "670,000", "Dr. Tui Kalo", "Mele Tahi", "8", "Fruit Bat, Gecko", 
    "1,100", "2", "IslandLife Network", "Vanuatu Enviro Dept.", "No", "0", "26", "0.55", 
    "300", "1", "0", "20", "2", "1", "2024-04-01", "SPREP", "Nature Conservancy", "No"
  ],
  [
    "010", "Urban Biodiversity Corridors", "Active", "Western Europe", "Germany", "2023-02-15", 
    "2026-05-30", "2,200,000", "Dr. Klaus Richter", "Lena Schulz", "20", "Birds, Hedgehog", 
    "750", "12", "GreenBerlin", "Berlin City Council", "Yes", "0", "112", "0.73", 
    "950", "0", "0", "40", "6", "3", "2024-06-01", "WWF Germany", "ICLEI", "Yes"
  ],
  [
    "011", "Desert Oryx Reintroduction", "In Progress", "Middle East", "Jordan", "2023-10-01", 
    "2027-04-15", "1,450,000", "Dr. Hadi Zahran", "Amal Najjar", "11", "Arabian Oryx", 
    "2,300", "2", "DesertLife Assoc.", "Jordan Wildlife Authority", "Yes", "0", "62", "0.70", 
    "1,000", "3", "0", "65", "3", "2", "2024-07-05", "World Bank", "WWF MENA", "No"
  ],
  [
    "006", "Amazon Biodiversity Defense", "Active", "South America", "Brazil", "2022-10-01", 
    "2026-03-01", "5,000,000", "Dr. Joana Silva", "Pedro Costa", "30", "Jaguar, Macaw", 
    "18,000", "7", "Amazonia Alliance", "IBAMA", "Yes", "5", "311", "0.88", 
    "5,800", "7", "2", "92", "10", "6", "2024-07-12", "WWF US", "IUCN", "Yes"
  ],
  [
    "007", "Reef Restoration Lab", "In Progress", "Oceania", "Fiji", "2023-06-01", 
    "2025-08-30", "820,000", "Dr. Niko Vuki", "Mere Naivalu", "9", "Clownfish, Coral", 
    "N/A", "1", "BlueReef Fiji", "Fiji Marine Dept.", "Yes", "0", "47", "0.59", 
    "400", "2", "0", "70", "3", "1", "2024-06-28", "Pacific Fund", "CoralWatch", "No"
  ],
  [
    "008", "Savannah Fire Buffer Zones", "Completed", "Southern Africa", "Botswana", "2019-09-01", 
    "2022-10-31", "1,600,000", "Dr. Kabelo Dube", "Thandi Mokoena", "15", "Wild Dog, Giraffe", 
    "9,200", "4", "Savannah Alliance", "Botswana Parks", "Yes", "1", "132", "0.76", 
    "2,700", "6", "1", "68", "4", "3", "2022-11-10", "GCF", "WWF Africa", "Yes"
  ],
  [
    "009", "Island Species Monitoring", "Ongoing", "Pacific Islands", "Vanuatu", "2022-01-10", 
    "2025-06-01", "670,000", "Dr. Tui Kalo", "Mele Tahi", "8", "Fruit Bat, Gecko", 
    "1,100", "2", "IslandLife Network", "Vanuatu Enviro Dept.", "No", "0", "26", "0.55", 
    "300", "1", "0", "20", "2", "1", "2024-04-01", "SPREP", "Nature Conservancy", "No"
  ],
  [
    "010", "Urban Biodiversity Corridors", "Active", "Western Europe", "Germany", "2023-02-15", 
    "2026-05-30", "2,200,000", "Dr. Klaus Richter", "Lena Schulz", "20", "Birds, Hedgehog", 
    "750", "12", "GreenBerlin", "Berlin City Council", "Yes", "0", "112", "0.73", 
    "950", "0", "0", "40", "6", "3", "2024-06-01", "WWF Germany", "ICLEI", "Yes"
  ],
  [
    "011", "Desert Oryx Reintroduction", "In Progress", "Middle East", "Jordan", "2023-10-01", 
    "2027-04-15", "1,450,000", "Dr. Hadi Zahran", "Amal Najjar", "11", "Arabian Oryx", 
    "2,300", "2", "DesertLife Assoc.", "Jordan Wildlife Authority", "Yes", "0", "62", "0.70", 
    "1,000", "3", "0", "65", "3", "2", "2024-07-05", "World Bank", "WWF MENA", "No"
  ],
  [
    "006", "Amazon Biodiversity Defense", "Active", "South America", "Brazil", "2022-10-01", 
    "2026-03-01", "5,000,000", "Dr. Joana Silva", "Pedro Costa", "30", "Jaguar, Macaw", 
    "18,000", "7", "Amazonia Alliance", "IBAMA", "Yes", "5", "311", "0.88", 
    "5,800", "7", "2", "92", "10", "6", "2024-07-12", "WWF US", "IUCN", "Yes"
  ],
  [
    "007", "Reef Restoration Lab", "In Progress", "Oceania", "Fiji", "2023-06-01", 
    "2025-08-30", "820,000", "Dr. Niko Vuki", "Mere Naivalu", "9", "Clownfish, Coral", 
    "N/A", "1", "BlueReef Fiji", "Fiji Marine Dept.", "Yes", "0", "47", "0.59", 
    "400", "2", "0", "70", "3", "1", "2024-06-28", "Pacific Fund", "CoralWatch", "No"
  ],
  [
    "008", "Savannah Fire Buffer Zones", "Completed", "Southern Africa", "Botswana", "2019-09-01", 
    "2022-10-31", "1,600,000", "Dr. Kabelo Dube", "Thandi Mokoena", "15", "Wild Dog, Giraffe", 
    "9,200", "4", "Savannah Alliance", "Botswana Parks", "Yes", "1", "132", "0.76", 
    "2,700", "6", "1", "68", "4", "3", "2022-11-10", "GCF", "WWF Africa", "Yes"
  ],
  [
    "009", "Island Species Monitoring", "Ongoing", "Pacific Islands", "Vanuatu", "2022-01-10", 
    "2025-06-01", "670,000", "Dr. Tui Kalo", "Mele Tahi", "8", "Fruit Bat, Gecko", 
    "1,100", "2", "IslandLife Network", "Vanuatu Enviro Dept.", "No", "0", "26", "0.55", 
    "300", "1", "0", "20", "2", "1", "2024-04-01", "SPREP", "Nature Conservancy", "No"
  ],
  [
    "010", "Urban Biodiversity Corridors", "Active", "Western Europe", "Germany", "2023-02-15", 
    "2026-05-30", "2,200,000", "Dr. Klaus Richter", "Lena Schulz", "20", "Birds, Hedgehog", 
    "750", "12", "GreenBerlin", "Berlin City Council", "Yes", "0", "112", "0.73", 
    "950", "0", "0", "40", "6", "3", "2024-06-01", "WWF Germany", "ICLEI", "Yes"
  ],
  [
    "011", "Desert Oryx Reintroduction", "In Progress", "Middle East", "Jordan", "2023-10-01", 
    "2027-04-15", "1,450,000", "Dr. Hadi Zahran", "Amal Najjar", "11", "Arabian Oryx", 
    "2,300", "2", "DesertLife Assoc.", "Jordan Wildlife Authority", "Yes", "0", "62", "0.70", 
    "1,000", "3", "0", "65", "3", "2", "2024-07-05", "World Bank", "WWF MENA", "No"
  ],
];



export default function WwfAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hi! Ask me anything about projects, setup, or documentation.",
    },
  ]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("assistant");
  const [selectedSource, setSelectedSource] = useState(dataSources[0]);

  const chatEndRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;
    const newUserMsg = { role: "user", text: input };
    const botReply = { role: "bot", text: `I noted: "${input}"` };
    setMessages((prev) => [...prev, newUserMsg, botReply]);
    setInput("");
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderChatSection = () => (
    <div className="flex-1 flex flex-col  border border-gray-300 h-[80vh] rounded">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 ">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-lg px-4 py-2 rounded-lg text-sm ${
              msg.role === "user"
                ? "ml-auto bg-green-500 text-white"
                : "mr-auto bg-gray-200 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="border-t bg-white p-4">
        <textarea
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask something like 'How do I load a project?'"
          className="w-full resize-none p-3 rounded-lg border border-gray-300 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <div className="text-right mt-2">
          <button
            onClick={handleSend}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );

   const headers = tableSample[0];
  const dataRows = tableSample.slice(1);

  const [filters, setFilters] = useState(Array(headers.length).fill(""));

  const handleFilterChange = (value, index) => {
    const updatedFilters = [...filters];
    updatedFilters[index] = value.toLowerCase();
    setFilters(updatedFilters);
  };

  const filteredData = dataRows.filter((row) =>
    row.every((cell, i) =>
      cell.toString().toLowerCase().includes(filters[i] || "")
    )
  );

  return (
    <div className="h-[94vh] w-full bg-gray-50 font-sans flex flex-col">
      {/* Top Nav */}
      <header className="bg-gray-800 px-6 py-4 border-b border-gray-300 flex items-center justify-between text-white">
        <h1 className="text-2xl font-semibold">Panda</h1>
        <nav className="flex gap-4 text-sm font-medium">
          {navItems.map(({ name, icon: Icon, key }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                activeTab === key
                  ? "bg-green-100 text-green-800"
                  : "text-white hover:text-green-500 hover:bg-gray-200"
              }`}
            >
              <Icon size={16} />
              {name}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex h-[86vh]">
        {activeTab === "assistant" && (
          <>
            <section className="flex-1 p-6 bg-white">{renderChatSection()}</section>
            <aside className="w-72 p-6 bg-gray-50 border-l border-gray-300 hidden lg:block overflow-y-auto">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">FAQ</h3>
              <input
                type="text"
                placeholder="Search FAQ..."
                className="w-full px-3 py-1 mb-4 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:outline-none shadow-sm"
              />
              <ul className="space-y-2 text-sm text-blue-600">
                <li className="cursor-pointer hover:underline">How to load a project?</li>
                <li className="cursor-pointer hover:underline">Where to find templates?</li>
                <li className="cursor-pointer hover:underline">Deployment steps?</li>
                <li className="cursor-pointer hover:underline">How to load a project?</li>
                <li className="cursor-pointer hover:underline">Where to find templates?</li>
                <li className="cursor-pointer hover:underline">Deployment steps?</li>
                <li className="cursor-pointer hover:underline">How to load a project?</li>
                <li className="cursor-pointer hover:underline">Where to find templates?</li>
                <li className="cursor-pointer hover:underline">Deployment steps?</li>
              </ul>
            </aside>
          </>
        )}

        {activeTab === "templates" && (
        <div className="flex h-[86vh] w-full">
          <section className="w-[25vw] p-4 border-r border-gray-200 bg-white">
            {renderChatSection()}
          </section>
          <section className="w-[45vw] p-6 bg-white flex flex-col">
            
            <div className="flex-1 border rounded-lg shadow-sm overflow-hidden">
              <iframe
                title="Sample Report"
                className="w-full h-full border-0"
                src="/temp.pdf"
              ></iframe>
            </div>
            <div className="mt-4 float-right">
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                Download Report
              </button>
            </div>
          </section>

          <aside className="w-[20vw] p-6 bg-gray-50 border-l border-gray-200 overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Templates</h3>
              <input
                type="text"
                placeholder="Search FAQ..."
                className="w-full px-3 py-1 mb-4 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:outline-none shadow-sm"
              />

            <ul className="space-y-2 h-[20vh]">
              {[...Array(7)].map((_, i) => (
                <li
                  key={i}
                  className="flex items-center bg-white px-4 py-3 rounded-lg shadow-sm border hover:bg-gray-50 transition"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 shadow-sm mr-2 flex-shrink-0">
                    <img
                      src={`/assets/out1.png`}
                      alt={`Outcome ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Outcome {i + 1}</p>
                </li>
              ))}

              <div className="text-center text-gray-500 text-sm mt-2 border border-gray-200 h-[22vh]">
                <div className=" text-gray-950 w-full bg-blue-200">
                  <p className="py-2">Number Of API Request for the day</p>
                </div>
                <div className="flex justify-center items-center h-full -mt-5">
                  <p className="text-2xl font-bold text-green-600">16</p>
                </div>
              </div>
            </ul>
              

          </aside>
        </div>
      )}

        {activeTab === "stats" && (
          <>
            <section className="flex-1 bg-white p-6 overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-700">Preview Report</h3>
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
                  Download Report
                </button>
              </div>
              <input
                type="text"
                placeholder="Search Data..."
                className="w-full px-3 py-1 mb-4 border border-gray-300 rounded-lg text-sm focus:ring-green-500 focus:outline-none shadow-sm"
              />
            
              <h3 className="font-semibold text-gray-700 mb-4">
                {selectedSource} Table
              </h3>
               <div className="overflow-x-auto border rounded-xl shadow-md">
          <table className="w-full bg-white text-xs sm:text-sm md:text-base">
            <thead className="bg-gray-100 text-left sticky top-0 z-10">
              <tr>
                {headers.map((head, i) => (
                  <th key={i} className="px-3 py-2 border-b border-gray-300 font-semibold whitespace-nowrap">
                    <div className="flex flex-col">
                      <span>{head}</span>
                      <input
                        type="text"
                        value={filters[i]}
                        onChange={(e) => handleFilterChange(e.target.value, i)}
                        placeholder="Filter"
                        className="mt-1 p-1 rounded border border-gray-300 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={headers.length}
                    className="text-center px-3 py-4 text-gray-500"
                  >
                    No matching records found.
                  </td>
                </tr>
              ) : (
                filteredData.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-gray-50">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3 py-2 border-b border-gray-200 whitespace-nowrap">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
            </section>
            <aside className="w-[20vw] bg-gray-50 border-l border-gray-200 p-4 h-full overflow-y-auto"> 
              <h3 className="font-semibold text-gray-700 mb-3">Data Sources</h3>
              <ul className="space-y-2 text-sm ">
                {dataSources.map((src) => (
                  <li
                    key={src}
                    onClick={() => setSelectedSource(src)}
                    className={`cursor-pointer px-3 py-2 rounded-lg hover:bg-green-100 ${
                      selectedSource === src ? "bg-green-100 text-green-800" : ""
                    }`}
                  >
                    {src}
                  </li>
                ))}
              </ul>
            </aside>
          </>
        )}

        {activeTab === "settings" && (
          <section className="p-6">
            <h3 className="text-lg font-semibold text-gray-800">Settings</h3>
            <p className="mt-4 text-sm text-gray-600">Coming soon...</p>
          </section>
        )}
      </main>
    </div>
  );
}