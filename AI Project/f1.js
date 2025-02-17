// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
// start
import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import * as echarts from 'echarts';
interface Driver {
name: string;
firstName: string;
lastName: string;
team: string;
points: number;
position: number;
wins: number;
podiums: number;
fastestLaps: number;
image: string;
teamColor: string;
}
interface Track {
name: string;
country: string;
length: string;
corners: number;
drsZones: number;
lapRecord: string;
image: string;
}
interface User {
email: string;
name: string;
password: string;
}
const App: React.FC = () => {
const [showAuthModal, setShowAuthModal] = useState(false);
const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
const [user, setUser] = useState<User>({ email: '', name: '', password: '' });
const [error, setError] = useState('');
const [showSuccessModal, setShowSuccessModal] = useState(false);
useEffect(() => {
const isAuthenticated = localStorage.getItem('isAuthenticated');
if (!isAuthenticated) {
setShowAuthModal(true);
}
}, []);
const handleAuth = (e: React.FormEvent) => {
e.preventDefault();
if (authMode === 'signup') {
if (!user.email.includes('@')) {
setError('Please enter a valid email address');
return;
}
if (user.password.length < 6) {
setError('Password must be at least 6 characters long');
return;
}
// Simulate signup success
localStorage.setItem('isAuthenticated', 'true');
localStorage.setItem('user', JSON.stringify(user));
setShowAuthModal(false);
setShowSuccessModal(true);
} else {
// Simulate signin validation
const savedUser = localStorage.getItem('user');
if (savedUser) {
const parsedUser = JSON.parse(savedUser);
if (parsedUser.email === user.email && parsedUser.password === user.password) {
localStorage.setItem('isAuthenticated', 'true');
setShowAuthModal(false);
} else {
setError('Invalid email or password');
}
} else {
setError('No account found with this email');
}
}
};
const [theme, setTheme] = useState<'light' | 'dark'>('light');
const [currentPage, setCurrentPage] = useState<'analysis' | 'database' | 'stats'>('analysis');
const drivers: Driver[] = [
{
name: "Max Verstappen",
firstName: "Max",
lastName: "VERSTAPPEN",
team: "Red Bull Racing",
position: 1,
points: 575,
wins: 19,
podiums: 21,
fastestLaps: 12,
teamColor: "text-[#3671C6]",
image: "https://public.readdy.ai/ai/img_res/ab5dd9c2a8416004acb747db86ba8a68.jpg"
},
{
name: "Sergio Pérez",
firstName: "Sergio",
lastName: "PÉREZ",
team: "Red Bull Racing",
position: 2,
points: 285,
wins: 8,
podiums: 15,
fastestLaps: 5,
teamColor: "text-[#3671C6]",
image: "https://public.readdy.ai/ai/img_res/ff3945172a7348df0280737865469255.jpg"
},
{
name: "Lewis Hamilton",
firstName: "Lewis",
lastName: "HAMILTON",
team: "Mercedes",
position: 3,
points: 234,
wins: 7,
podiums: 14,
fastestLaps: 6,
teamColor: "text-[#27F4D3]",
image: "https://public.readdy.ai/ai/img_res/2c083fb23aeecbeb4d9b3ab7d3674a12.jpg"
},
{
name: "Fernando Alonso",
firstName: "Fernando",
lastName: "ALONSO",
team: "Aston Martin",
position: 4,
points: 206,
wins: 5,
podiums: 12,
fastestLaps: 4,
teamColor: "text-[#358C75]",
image: "https://public.readdy.ai/ai/img_res/611299cb87f98d0fee5c76ee2f610da4.jpg"
},
{
name: "Charles Leclerc",
firstName: "Charles",
lastName: "LECLERC",
team: "Ferrari",
position: 5,
points: 206,
wins: 6,
podiums: 13,
fastestLaps: 7,
teamColor: "text-[#DC0000]",
image: "https://public.readdy.ai/ai/img_res/4bef29bc868f746bc11de33d64c11156.jpg"
},
{
name: "Lando Norris",
firstName: "Lando",
lastName: "NORRIS",
team: "McLaren",
position: 6,
points: 205,
wins: 4,
podiums: 11,
fastestLaps: 3,
teamColor: "text-[#FF8700]",
image: "https://public.readdy.ai/ai/img_res/25e380b03c9283793d2cab7fc7c2c829.jpg"
},
{
name: "Carlos Sainz",
firstName: "Carlos",
lastName: "SAINZ",
team: "Ferrari",
position: 7,
points: 200,
wins: 3,
podiums: 10,
fastestLaps: 4,
teamColor: "text-[#DC0000]",
image: "https://public.readdy.ai/ai/img_res/dc6e1910cb1cd9fde9a94a54328b00bc.jpg"
},
{
name: "George Russell",
firstName: "George",
lastName: "RUSSELL",
team: "Mercedes",
position: 8,
points: 175,
wins: 2,
podiums: 8,
fastestLaps: 3,
teamColor: "text-[#27F4D3]",
image: "https://public.readdy.ai/ai/img_res/0de814dcfcdba5f323a8ec1bd2ea20bf.jpg"
},
{
name: "Oscar Piastri",
firstName: "Oscar",
lastName: "PIASTRI",
team: "McLaren",
position: 9,
points: 97,
wins: 1,
podiums: 6,
fastestLaps: 2,
teamColor: "text-[#FF8700]",
image: "https://public.readdy.ai/ai/img_res/cc0877ad6cfa10fc8ab8abbf221ea011.jpg"
}
];
const tracks: Track[] = [
{
name: "Silverstone Circuit",
country: "United Kingdom",
length: "5.891 km",
corners: 18,
drsZones: 2,
lapRecord: "1:27.097",
image: "https://public.readdy.ai/ai/img_res/f73662a0ca53dbf24b222381502f1a17.jpg"
},
{
name: "Circuit de Monaco",
country: "Monaco",
length: "3.337 km",
corners: 19,
drsZones: 1,
lapRecord: "1:12.909",
image: "https://public.readdy.ai/ai/img_res/b0bdadda068cc35f04ac485c69741e82.jpg"
},
{
name: "Spa-Francorchamps",
country: "Belgium",
length: "7.004 km",
corners: 20,
drsZones: 2,
lapRecord: "1:46.286",
image: "https://public.readdy.ai/ai/img_res/19cb8221704d89327a6d89a917da0f26.jpg"
},
{
name: "Monza Circuit",
country: "Italy",
length: "5.793 km",
corners: 11,
drsZones: 2,
lapRecord: "1:21.046",
image: "https://public.readdy.ai/ai/img_res/95f33e115643bdc7903a5c77e6a818ff.jpg"
},
{
name: "Suzuka Circuit",
country: "Japan",
length: "5.807 km",
corners: 18,
drsZones: 1,
lapRecord: "1:30.983",
image: "https://public.readdy.ai/ai/img_res/2b27e3fb10618afdbd95c542730f7d1e.jpg"
},
{
name: "Albert Park Circuit",
country: "Australia",
length: "5.278 km",
corners: 14,
drsZones: 3,
lapRecord: "1:20.235",
image: "https://public.readdy.ai/ai/img_res/33cdfacd6ac0ef0c1ff261f6a4eb2c0d.jpg"
},
{
name: "Interlagos Circuit",
country: "Brazil",
length: "4.309 km",
corners: 15,
drsZones: 2,
lapRecord: "1:10.540",
image: "https://public.readdy.ai/ai/img_res/22e0faaac4c4027859eefd9213f99cf3.jpg"
},
{
name: "Marina Bay Street Circuit",
country: "Singapore",
length: "5.063 km",
corners: 23,
drsZones: 3,
lapRecord: "1:41.905",
image: "https://public.readdy.ai/ai/img_res/75c8ca76705440a25e9a7da2ad6238d8.jpg"
},
{
name: "Red Bull Ring",
country: "Austria",
length: "4.318 km",
corners: 10,
drsZones: 3,
lapRecord: "1:05.619",
image: "https://public.readdy.ai/ai/img_res/5479b365dcb2a6294baa0f142657f431.jpg"
}
];
const chartRef = useRef<HTMLDivElement>(null);
useEffect(() => {
if (chartRef.current && currentPage === 'stats') {
const chart = echarts.init(chartRef.current);
const option = {
animation: false,
title: {
text: '2025 F1 Driver Performance',
left: 'center'
},
tooltip: {
trigger: 'axis'
},
legend: {
data: ['Points', 'Wins', 'Podiums'],
bottom: 0
},
xAxis: {
type: 'category',
data: drivers.map(driver => driver.name)
},
yAxis: [
{
type: 'value',
name: 'Points',
position: 'left'
}
],
series: [
{
name: 'Points',
type: 'bar',
data: drivers.map(driver => driver.points)
},
{
name: 'Wins',
type: 'bar',
data: drivers.map(driver => driver.wins)
},
{
name: 'Podiums',
type: 'bar',
data: drivers.map(driver => driver.podiums)
}
]
};
chart.setOption(option);
return () => {
chart.dispose();
};
}
}, [currentPage]);
const [selectedCircuit, setSelectedCircuit] = useState<string>('');
const [previewImage, setPreviewImage] = useState<string>('https://public.readdy.ai/ai/img_res/ac1e4d4ea2948248e0fcda2c4f363e2b.jpg');
const fileInputRef = useRef<HTMLInputElement>(null);
const toggleTheme = () => {
setTheme(prev => prev === 'light' ? 'dark' : 'light');
};
const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
const file = event.target.files?.[0];
if (file) {
try {
// First show the uploaded image
const reader = new FileReader();
reader.onloadend = () => {
setPreviewImage(reader.result as string);
};
reader.readAsDataURL(file);
// Simulate backend processing with a delay
setTimeout(() => {
// This is where you would normally make an API call to your backend
// For now, we'll simulate the processed track image
const processedTrackImage = 'https://public.readdy.ai/ai/img_res/e0b7316311ec56a292c01cd71273270c.jpg';
setPreviewImage(processedTrackImage);
// Add a message to the chat
setMessages(prev => [...prev, {
text: 'Track analysis complete. I\'ve processed the circuit image and added racing line overlay. Would you like me to analyze optimal racing lines and braking points?',
isUser: false
}]);
}, 2000);
} catch (error) {
console.error('Error processing track image:', error);
setMessages(prev => [...prev, {
text: 'Sorry, there was an error processing the track image. Please try again.',
isUser: false
}]);
}
}
};
interface Message {
text: string;
isUser: boolean;
timestamp: string;
}
const [messages, setMessages] = useState<Message[]>([
{
text: 'Hello! I\'m your F1 Assistant. I can help you with:\n- Drivers, teams, and standings\n- Circuits and track information\n- Technical regulations and rules\n- Race strategy and tactics\n- F1 history and records\n\nWhat would you like to know about?',
isUser: false,
timestamp: new Date().toLocaleTimeString()
}
]);
const [messageInput, setMessageInput] = useState('');
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const circuits = tracks.map(track => track.name);
const getSelectedTrackInfo = () => {
return tracks.find(track => track.name === selectedCircuit);
};
interface F1Knowledge {
category: string;
patterns: string[];
response: (question: string, data?: any) => string;
}
const f1Knowledge: F1Knowledge[] = [
{
category: 'Rules and Regulations',
patterns: ['rules', 'regulation', 'penalty', 'flag', 'qualifying', 'sprint race', 'drs', 'parc ferme', 'safety car', 'vsc', 'red flag', 'yellow flag', 'blue flag', 'format'],
response: (question) => {
if (question.includes('drs')) {
return 'DRS (Drag Reduction System) is a system that reduces aerodynamic drag to help overtaking. It can be used in designated DRS zones when a driver is within 1 second of the car ahead. DRS is not available in wet conditions, during the first 2 laps of a race, or within 2 laps of a race restart. The system works by opening a flap in the rear wing, reducing drag and increasing top speed by approximately 10-12 km/h.';
}
if (question.includes('qualifying')) {
return 'F1 qualifying consists of three sessions (Q1, Q2, Q3). Q1 lasts 18 minutes with 5 slowest cars eliminated, Q2 lasts 15 minutes with 5 more eliminated, and Q3 is a 12-minute shootout for pole position with the remaining 10 cars. Drivers must use new soft tires in Q3, and those who reach Q3 must start the race on their Q2 tire set. The grid order is determined by the fastest lap times set in the final session.';
}
if (question.includes('sprint')) {
return 'Sprint races are 100km races (about 1/3 distance of a Grand Prix) that set the grid for Sunday\'s main race. Points are awarded to the top 8 finishers (8,7,6,5,4,3,2,1). The sprint format includes: Friday - FP1 and Qualifying for Sprint, Saturday - Sprint Shootout and Sprint Race, Sunday - Main Race. Tire allocation is different for sprint weekends, with fewer sets available. There are 6 sprint events in the 2024 season.';
}
if (question.includes('flag')) {
return 'F1 uses a comprehensive flag system: Red (session stopped, return to pits), Yellow (danger, no overtaking), Double Yellow (severe danger, be prepared to stop), Blue (let faster car pass), Black (driver disqualified), Black/Orange (mechanical problem, must pit), Black/White (warning for unsportsmanlike behavior), Checkered (session end), and Green (racing conditions). Virtual Safety Car (VSC) requires drivers to slow to delta time, while Safety Car bunches up the field.';
}
if (question.includes('penalty')) {
return 'F1 penalties include: Time penalties (5s, 10s, drive-through, stop-go), Grid penalties (for engine/gearbox changes, exceeding component limits), License points (12 points in 12 months leads to race ban), Reprimands (3 driving reprimands lead to grid penalty). Common infractions include: track limits violations, causing collisions, impeding other drivers, unsafe releases in pit lane, and technical infringements.';
}
if (question.includes('parc ferme')) {
return 'Parc Fermé rules restrict car modifications from qualifying until the race. Teams can only make minor adjustments to front wing angles, tire pressures, and engine modes. Cars enter Parc Fermé conditions after qualifying, and breaking these rules results in a pit lane start. Emergency changes for safety reasons require stewards\' approval.';
}
return 'F1 has comprehensive regulations covering technical specifications, sporting rules, and safety requirements. Key areas include: car design regulations, power unit rules, tire regulations, race procedures, safety standards, and sporting code. Would you like to know about a specific aspect of the rules?';
}
},
{
category: 'Technical',
patterns: ['engine', 'power unit', 'tyre', 'tire', 'aerodynamic', 'downforce', 'chassis', 'brake', 'suspension', 'gearbox', 'fuel', 'ers', 'mgu', 'battery', 'floor'],
response: (question) => {
if (question.includes('engine') || question.includes('power unit')) {
return 'F1 power units consist of six components: 1.6L V6 turbocharged engine, Motor Generator Unit - Kinetic (MGU-K), Motor Generator Unit - Heat (MGU-H), Energy Store (battery), Control Electronics, and Turbocharger. They produce over 1000bhp (around 850bhp from ICE, 150bhp from electrical systems). Each driver is limited to 3 engines, 3 MGU-Ks, 3 MGU-Hs, 2 batteries, and 2 control electronics per season. Exceeding these limits results in grid penalties.';
}
if (question.includes('tyre') || question.includes('tire')) {
return 'F1 uses Pirelli tires with 5 dry compounds (C1-C5, from hardest to softest) and 2 wet weather options (Intermediate for light rain, Wet for heavy rain). Each compound has specific operating temperature windows and degradation characteristics. Teams must use at least 2 different compounds during a dry race. Tire management is crucial - factors include temperature, pressure, graining, blistering, and wear rates. Pirelli allocates specific compounds for each race based on track characteristics.';
}
if (question.includes('aerodynamic') || question.includes('downforce')) {
return 'F1 cars generate massive downforce through multiple elements: Front wing (creates downforce, manages airflow), Rear wing (main downforce generator, includes DRS), Floor and diffuser (ground effect creates low pressure), Bargeboards and sidepods (manage airflow). Ground effect aerodynamics was reintroduced in 2022, using venturi tunnels under the car. Cars can generate over 3.5G of lateral acceleration and up to 5G under braking. The 2022+ regulations aim to reduce dirty air effect, allowing closer racing.';
}
if (question.includes('brake')) {
return 'F1 braking systems combine traditional friction brakes with energy recovery (MGU-K). Carbon fiber brake discs operate at up to 1000°C, with brake-by-wire systems managing the balance between friction and regenerative braking. Cars can decelerate at over 5G, with drivers applying up to 180kg of pedal force. Brake cooling is critical, managed through carefully designed ducts and internal ventilation.';
}
if (question.includes('suspension')) {
return 'F1 cars use sophisticated suspension systems including push-rod or pull-rod configurations, torsion bars, and complex hydraulic systems. The suspension manages ride height, aerodynamic platform, tire contact, and mechanical grip. Active suspension is banned, but teams use clever passive systems to optimize performance. Suspension setup is crucial for managing tire wear and maximizing aerodynamic efficiency.';
}
return 'F1 cars are highly sophisticated machines with cutting-edge technology in areas like aerodynamics, power units, suspension, brakes, and electronics. Each component is optimized for performance while meeting strict technical regulations. What specific technical aspect would you like to learn about?';
}
},
{
category: 'History',
patterns: ['history', 'champion', 'record', 'legendary', 'famous', 'first', 'era', 'decade', 'classic', 'historic', 'team', 'constructor'],
response: (question) => {
if (question.includes('champion')) {
return 'Lewis Hamilton and Michael Schumacher share the record for most World Championships (7). Hamilton holds records for most wins (103) and poles (104). The most successful teams are Ferrari (16 Constructors\' Championships), followed by Williams (9) and McLaren (8). Notable champions include Ayrton Senna (3), Alain Prost (4), Sebastian Vettel (4), and Juan Manuel Fangio (5). Max Verstappen became the youngest F1 driver at 17 and has secured multiple championships.';
}
if (question.includes('record')) {
return 'Key F1 records: Most wins (103 - Hamilton), Most poles (104 - Hamilton), Most fastest laps (77 - Schumacher), Most consecutive wins (10 - Vettel), Most points in a season (575 - Verstappen, 2023), Most constructors\' titles (16 - Ferrari), Youngest winner (18 years, 228 days - Verstappen), Most race entries (358 - Alonso). Team records include most consecutive constructors\' titles (8 - Mercedes, 2014-2021) and most wins in a season (21 - Red Bull, 2023).';
}
if (question.includes('era') || question.includes('decade')) {
return 'F1 eras include: 1950s (Fangio dominance), 1960s (British teams revolution), 1970s (Ground effect era), 1980s (Turbo era), 1990s (Electronic aids era), 2000s (Ferrari/Schumacher dominance), 2010s (Hybrid/Mercedes dominance), 2020s (New regulations/Red Bull dominance). Each era brought significant technical innovations and legendary rivalries like Prost-Senna, Schumacher-Hakkinen, and Hamilton-Verstappen.';
}
return 'Formula 1 began in 1950 and has evolved from a dangerous gentleman\'s sport to a high-tech global spectacle. Key milestones include the introduction of constructors\' championship (1958), ground effect aerodynamics (1977), turbo engines (1977), carbon fiber chassis (1981), hybrid power units (2014), and ground effect return (2022). The sport has seen legendary drivers, iconic cars, and historic races that have shaped motorsport history.';
}
},
{
category: 'Strategy',
patterns: ['strategy', 'pit stop', 'overtake', 'racing line', 'fuel', 'pace', 'setup', 'quali', 'race pace', 'start', 'launch', 'formation lap'],
response: (question) => {
if (question.includes('pit stop')) {
return 'F1 pit stops involve 20+ crew members changing four wheels in under 2.5 seconds. Strategy elements include: Undercut (pitting before rivals to use fresh tire pace), Overcut (staying out longer on better tires), Safety Car opportunities (free pit stops), Tire management (extending stints), and Track position vs. tire advantage decisions. Teams use complex simulation software to model optimal strategies considering tire wear, fuel load, weather, and track position.';
}
if (question.includes('racing line') || question.includes('overtake')) {
return 'The racing line optimizes corner speed through proper entry, apex, and exit points. Overtaking techniques include: DRS passes on straights, Out-braking into corners, Switchback moves (cutting back on corner exit), and Setting up passes through multiple corners. Defensive driving involves positioning the car to prevent overtaking while staying within track limits and sporting regulations. Different lines may be used for tire management or defensive positioning.';
}
if (question.includes('start') || question.includes('launch')) {
return 'Race starts are crucial in F1. Key elements include: Optimal clutch bite point, Tire temperature and pressure, Engine mapping, Launch control settings (within rules), and First corner strategy. The formation lap is used to build tire and brake temperature, clean the grid slot, and practice launch procedures. Start procedures are highly regulated, with specific rules about grid positioning and movement before lights out.';
}
if (question.includes('setup') || question.includes('balance')) {
return 'Car setup involves balancing multiple factors: Aerodynamic configuration (downforce vs. drag), Mechanical grip (suspension settings), Tire management (pressures, camber), and Power unit modes. Teams adjust setups for different track characteristics, weather conditions, and race vs. qualifying requirements. Setup choices impact tire wear, fuel consumption, and overall race pace.';
}
return 'F1 race strategy combines tire management, fuel efficiency, track position, and adapting to changing conditions. Teams use real-time data and predictive models to optimize strategy. Key aspects include qualifying approach, race start tactics, pit stop timing, and managing car performance throughout the race distance. What specific strategic element would you like to understand?';
}
}
];
const generateAIResponse = (question: string): string => {
const lowerQuestion = question.toLowerCase();
// Check F1 Knowledge Base first
for (const knowledge of f1Knowledge) {
if (knowledge.patterns.some(pattern => lowerQuestion.includes(pattern))) {
return knowledge.response(lowerQuestion);
}
}
// Driver related questions
if (lowerQuestion.includes('who is the current champion') || lowerQuestion.includes('who leads')) {
const champion = drivers[0];
return `Currently, ${champion.name} leads the championship with ${champion.points} points, having secured ${champion.wins} wins and ${champion.podiums} podiums this season.`;
}
// Circuit related questions
if (lowerQuestion.includes('which circuit') || lowerQuestion.includes('what track')) {
if (lowerQuestion.includes('longest')) {
const longest = tracks.reduce((prev, current) =>
parseFloat(prev.length) > parseFloat(current.length) ? prev : current
);
return `The longest circuit is ${longest.name} in ${longest.country} with a length of ${longest.length}.`;
}
if (lowerQuestion.includes('most corners')) {
const mostCorners = tracks.reduce((prev, current) =>
prev.corners > current.corners ? prev : current
);
return `${mostCorners.name} has the most corners with ${mostCorners.corners} turns.`;
}
}
// Team related questions
if (lowerQuestion.includes('red bull') || lowerQuestion.includes('ferrari') || lowerQuestion.includes('mercedes')) {
const team = lowerQuestion.includes('red bull') ? 'Red Bull Racing' :
lowerQuestion.includes('ferrari') ? 'Ferrari' : 'Mercedes';
const teamDrivers = drivers.filter(d => d.team === team);
return `${team}'s current drivers are ${teamDrivers.map(d => d.name).join(' and ')}. They have collectively scored ${teamDrivers.reduce((sum, d) => sum + d.points, 0)} points this season.`;
}
// Points and statistics
if (lowerQuestion.includes('points') || lowerQuestion.includes('standings')) {
const topThree = drivers.slice(0, 3);
return `Current top 3 in the championship:\n1. ${topThree[0].name}: ${topThree[0].points} pts\n2. ${topThree[1].name}: ${topThree[1].points} pts\n3. ${topThree[2].name}: ${topThree[2].points} pts`;
}
// Specific driver questions
const mentionedDriver = drivers.find(driver =>
lowerQuestion.includes(driver.name.toLowerCase()) ||
lowerQuestion.includes(driver.firstName.toLowerCase()) ||
lowerQuestion.includes(driver.lastName.toLowerCase())
);
if (mentionedDriver) {
return `${mentionedDriver.name} currently races for ${mentionedDriver.team}. This season they have achieved ${mentionedDriver.wins} wins, ${mentionedDriver.podiums} podiums, and scored ${mentionedDriver.points} points.`;
}
// Specific circuit questions
const mentionedTrack = tracks.find(track =>
lowerQuestion.includes(track.name.toLowerCase()) ||
lowerQuestion.includes(track.country.toLowerCase())
);
if (mentionedTrack) {
return `${mentionedTrack.name} in ${mentionedTrack.country} is ${mentionedTrack.length} long with ${mentionedTrack.corners} corners. The current lap record is ${mentionedTrack.lapRecord} and it has ${mentionedTrack.drsZones} DRS zones.`;
}
return "I can help you with information about F1 drivers, teams, circuits, rules, technical aspects, history, and strategy. Please ask me something specific about these topics!";
};
const handleSendMessage = () => {
if (messageInput.trim()) {
const userMessage = {
text: messageInput,
isUser: true,
timestamp: new Date().toLocaleTimeString()
};
setMessages(prev => [...prev, userMessage]);
// Generate AI response
setTimeout(() => {
const aiResponse = {
text: generateAIResponse(messageInput),
isUser: false,
timestamp: new Date().toLocaleTimeString()
};
setMessages(prev => [...prev, aiResponse]);
}, 1000);
setMessageInput('');
}
};
return (
<div className={`min-h-screen transition-all duration-300 ${theme === 'light' ? 'bg-gradient-to-br from-gray-50 to-gray-100' : 'bg-gradient-to-br from-[#0F0F16] to-[#1A1A24]'}`}>
<div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
{/* Auth Modal */}
{showAuthModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className={`w-full max-w-md overflow-hidden rounded-2xl shadow-2xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
<div className="relative">
<div className="absolute inset-0 bg-gradient-to-br from-[#e10600] to-[#ff0000] opacity-10"></div>
<div className="relative p-8">
<div className="flex justify-between items-center mb-8">
<h2 className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
{authMode === 'signin' ? 'Welcome Back!' : 'Join F1 Sim'}
</h2>
<i className={`fas fa-trophy text-2xl ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}></i>
</div>
<form onSubmit={handleAuth} className="space-y-6">
<div className="space-y-2">
<label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
Email Address
</label>
<div className="relative">
<i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
<input
type="email"
placeholder="Enter your email"
className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme === 'light' ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-700'} focus:outline-none focus:ring-2 focus:ring-[#e10600] transition-all duration-300`}
value={user.email}
onChange={(e) => setUser({ ...user, email: e.target.value })}
required
/>
</div>
</div>
{authMode === 'signup' && (
<div className="space-y-2">
<label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
Full Name
</label>
<div className="relative">
<i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
<input
type="text"
placeholder="Enter your full name"
className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme === 'light' ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-700'} focus:outline-none focus:ring-2 focus:ring-[#e10600] transition-all duration-300`}
value={user.name}
onChange={(e) => setUser({ ...user, name: e.target.value })}
required
/>
</div>
</div>
)}
<div className="space-y-2">
<label className={`block text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
Password
</label>
<div className="relative">
<i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
<input
type="password"
placeholder="Enter your password"
className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme === 'light' ? 'border-gray-300 bg-white' : 'border-gray-600 bg-gray-700'} focus:outline-none focus:ring-2 focus:ring-[#e10600] transition-all duration-300`}
value={user.password}
onChange={(e) => setUser({ ...user, password: e.target.value })}
required
/>
</div>
</div>
{error && (
<div className="flex items-center space-x-2 text-red-500 bg-red-50 p-3 rounded-lg">
<i className="fas fa-exclamation-circle"></i>
<p className="text-sm">{error}</p>
</div>
)}
<button
type="submit"
className="!rounded-button w-full bg-gradient-to-r from-[#e10600] to-[#ff0000] text-white py-4 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5"
>
<i className={`fas ${authMode === 'signin' ? 'fa-sign-in-alt' : 'fa-user-plus'} mr-2`}></i>
{authMode === 'signin' ? 'Sign In' : 'Create Account'}
</button>
</form>
<div className="mt-6 flex items-center justify-center space-x-2">
<span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
{authMode === 'signin' ? "Don't have an account?" : "Already have an account?"}
</span>
<button
onClick={() => {
setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
setError('');
}}
className="text-sm font-semibold text-[#e10600] hover:text-[#ff0000] transition-colors duration-300"
>
{authMode === 'signin' ? 'Create one now' : 'Sign in instead'}
</button>
</div>
</div>
</div>
</div>
</div>
)}
{/* Success Modal */}
{showSuccessModal && (
<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
<div className={`w-full max-w-md p-8 rounded-xl shadow-2xl ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
<div className="text-center">
<i className="fas fa-check-circle text-green-500 text-5xl mb-4"></i>
<h2 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
Welcome to F1 Sim!
</h2>
<p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
Thank you for joining us. We've sent a welcome email to your inbox.
</p>
<button
onClick={() => setShowSuccessModal(false)}
className="!rounded-button bg-[#e10600] hover:bg-[#ff0000] text-white px-6 py-3 font-semibold transition-all duration-300"
>
Get Started
</button>
</div>
</div>
</div>
)}
{/* Navigation */}
<nav className="bg-gradient-to-br from-[#15151E] to-[#1F1F2B] text-white backdrop-blur-lg shadow-xl border-b border-white/5 font-['Titillium_Web'] sticky top-0 z-50">
<div className="max-w-7xl mx-auto px-4">
<div className="flex justify-between items-center h-20">
<div className="flex items-center space-x-12">
<img
src="https://public.readdy.ai/ai/img_res/6bfc3bffbc4eec9df7471204d17ac85e.jpg"
alt="F1 Sim Logo"
className="h-14 hover:scale-105 transition-all duration-300 filter brightness-110"
/>
<div className="hidden md:flex space-x-10">
<button
onClick={() => setCurrentPage('analysis')}
className={`px-6 py-2.5 transition-all duration-300 text-[14px] tracking-wider font-medium
${currentPage === 'analysis'
? 'text-[#e10600]'
: 'text-gray-300 hover:text-[#e10600]'}`}
>
<i className="fas fa-chart-line mr-2"></i>
Circuit Analysis
</button>
<button
onClick={() => setCurrentPage('database')}
className={`px-6 py-3 transition-all duration-300 text-[15px] tracking-wider font-semibold
${currentPage === 'database'
? 'text-[#e10600]'
: 'text-gray-300 hover:text-[#e10600]'}`}
>
<i className="fas fa-database mr-2"></i>
Track Database
</button>
<button
onClick={() => setCurrentPage('stats')}
className={`px-6 py-3 transition-all duration-300 text-[15px] tracking-wider font-semibold
${currentPage === 'stats'
? 'text-[#e10600]'
: 'text-gray-300 hover:text-[#e10600]'}`}
>
<i className="fas fa-trophy mr-2"></i>
Driver Stats
</button>
</div>
</div>
<div className="flex items-center space-x-6">
<button
onClick={toggleTheme}
className="!rounded-button bg-white/5 hover:bg-white/10 text-white/90 px-4 py-2.5 whitespace-nowrap transition-all duration-300 text-[14px] tracking-wide font-medium backdrop-blur-lg"
>
<i className={`fas ${theme === 'light' ? 'fa-moon' : 'fa-sun'} mr-2`}></i>
{theme === 'light' ? 'Dark Mode' : 'Light Mode'}
</button>
<button
onClick={() => {
const isAuthenticated = localStorage.getItem('isAuthenticated');
if (isAuthenticated) {
localStorage.removeItem('isAuthenticated');
localStorage.removeItem('user');
setShowAuthModal(true);
} else {
setShowAuthModal(true);
}
}}
className="!rounded-button bg-gradient-to-r from-[#FF1E1E] to-[#FF4949] text-white px-5 py-2.5 whitespace-nowrap transition-all duration-300 text-[14px] tracking-wide font-medium shadow-lg shadow-red-500/20 hover:shadow-red-500/30 hover:scale-105"
>
<i className="fas fa-user-circle mr-2"></i>
{localStorage.getItem('isAuthenticated') ? 'Sign Out' : 'Sign In'}
</button>
</div>
</div>
</div>
</nav>
{/* Main Content */}
<div className="max-w-7xl mx-auto px-4 py-8">
{currentPage === 'analysis' && (
<div className="flex gap-6">
{/* Left Panel - Circuit Upload */}
<div className="w-1/3 space-y-8">
<div className={`rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl backdrop-blur-lg border ${theme === 'light' ? 'bg-white/95 border-gray-100' : 'bg-[#1F1F2B]/95 border-white/5 text-white'}`}>
<h2 className="text-xl font-bold mb-4">Circuit Selection</h2>
<div className="relative">
<button
onClick={() => setIsDropdownOpen(!isDropdownOpen)}
className={`!rounded-button w-full p-3 text-left flex justify-between items-center ${
theme === 'light'
? 'bg-gray-50 border border-gray-300 text-gray-800'
: 'bg-gray-700 border border-gray-600 text-white'
}`}
>
<span>{selectedCircuit || 'Select a circuit'}</span>
<i className="fas fa-chevron-down"></i>
</button>
{isDropdownOpen && (
<div className={`absolute w-full mt-2 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} border ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'} rounded-lg shadow-lg z-10`}>
{circuits.map((circuit, index) => (
<div
key={index}
className={`p-3 cursor-pointer ${theme === 'light' ? 'hover:bg-gray-100 text-gray-800' : 'hover:bg-gray-700 text-white'}`}
onClick={() => {
setSelectedCircuit(circuit);
setIsDropdownOpen(false);
}}
>
{circuit}
</div>
))}
</div>
)}
</div>
<div
className={`mt-6 border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-300 ${
theme === 'light' ? 'border-gray-300' : 'border-gray-600'
}`}
onClick={() => fileInputRef.current?.click()}
>
<input
type="file"
ref={fileInputRef}
className="hidden"
accept="image/*"
onChange={handleFileUpload}
/>
<i className={`fas fa-upload text-4xl mb-2 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`}></i>
<p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
Drag and drop circuit image or
</p>
<button className="!rounded-button mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 whitespace-nowrap">
Browse Files
</button>
</div>
</div>
<div className={`rounded-2xl shadow-lg p-6 transition-all duration-300 backdrop-blur-lg border ${theme === 'light' ? 'bg-white/95 border-gray-100' : 'bg-[#1F1F2B]/95 border-white/5 text-white'}`}>
<h2 className="text-xl font-bold mb-4">Circuit Preview</h2>
<img
src={selectedCircuit ? getSelectedTrackInfo()?.image : previewImage}
alt="Circuit Preview"
className="w-full h-48 rounded-lg object-cover"
/>
<div className="mt-4 space-y-2">
<div className={`flex justify-between items-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
<span>Track Length:</span>
<span>{selectedCircuit ? getSelectedTrackInfo()?.length : '5.303 km'}</span>
</div>
<div className={`flex justify-between items-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
<span>Corners:</span>
<span>{selectedCircuit ? getSelectedTrackInfo()?.corners : 16}</span>
</div>
<div className={`flex justify-between items-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
<span>DRS Zones:</span>
<span>{selectedCircuit ? getSelectedTrackInfo()?.drsZones : 3}</span>
</div>
{selectedCircuit && (
<div className={`flex justify-between items-center ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
<span>Lap Record:</span>
<span>{getSelectedTrackInfo()?.lapRecord}</span>
</div>
)}
</div>
</div>
</div>
{/* Right Panel - AI Chat */}
<div className={`w-2/3 rounded-2xl shadow-lg p-6 ml-4 transition-all duration-300 backdrop-blur-lg border ${theme === 'light' ? 'bg-white/95 border-gray-100' : 'bg-[#1F1F2B]/95 border-white/5'}`}>
<div className="h-[500px] flex flex-col">
<div className="flex-1 overflow-y-auto mb-4 space-y-4">
{messages.map((message, index) => (
<div
key={index}
className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
>
<div
className={`max-w-[70%] p-4 rounded-lg ${
message.isUser
? 'bg-blue-600 text-white'
: theme === 'light'
? 'bg-gray-100 text-gray-800'
: 'bg-gray-700 text-white'
}`}
>
<div className="flex flex-col">
<div className="text-xs opacity-50 mb-1">{message.timestamp}</div>
<div className="whitespace-pre-line">{message.text}</div>
</div>
</div>
</div>
))}
</div>
<div className="border-t pt-4">
<div className="flex items-center space-x-4">
<input
type="text"
value={messageInput}
onChange={(e) => setMessageInput(e.target.value)}
placeholder="Ask about circuit analysis, racing lines, or tire strategy..."
className={`flex-1 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${
theme === 'light'
? 'border border-gray-300 bg-white text-gray-900'
: 'border border-gray-600 bg-gray-700 text-white placeholder-gray-400'
}`}
onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
/>
<button
onClick={handleSendMessage}
className="!rounded-button bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 whitespace-nowrap"
>
<i className="fas fa-paper-plane mr-2"></i>
Send
</button>
</div>
<div className="flex gap-2 mt-4">
<button className={`!rounded-button px-4 py-2 text-sm whitespace-nowrap transition-colors duration-300 ${
theme === 'light'
? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
: 'bg-gray-700 hover:bg-gray-600 text-white'
}`}>
Analyze Racing Line
</button>
<button className={`!rounded-button px-4 py-2 text-sm whitespace-nowrap transition-colors duration-300 ${
theme === 'light'
? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
: 'bg-gray-700 hover:bg-gray-600 text-white'
}`}>
Tire Strategy
</button>
<button className={`!rounded-button px-4 py-2 text-sm whitespace-nowrap transition-colors duration-300 ${
theme === 'light'
? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
: 'bg-gray-700 hover:bg-gray-600 text-white'
}`}>
Weather Impact
</button>
</div>
</div>
</div>
</div>
</div>
)}
{currentPage === 'database' && (
<>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{tracks.map((track, index) => (
<div key={index} className={`rounded-2xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border backdrop-blur-lg ${theme === 'light' ? 'bg-white/95 border-gray-100' : 'bg-[#1F1F2B]/95 border-white/5'}`}>
<img src={track.image} alt={track.name} className="w-full h-48 object-cover" />
<div className="p-6">
<h3 className={`text-xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{track.name}</h3>
<p className={`text-sm mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{track.country}</p>
<div className="space-y-2">
<div className="flex justify-between">
<span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Length:</span>
<span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{track.length}</span>
</div>
<div className="flex justify-between">
<span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Corners:</span>
<span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{track.corners}</span>
</div>
<div className="flex justify-between">
<span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>DRS Zones:</span>
<span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{track.drsZones}</span>
</div>
<div className="flex justify-between">
<span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Lap Record:</span>
<span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{track.lapRecord}</span>
</div>
</div>
<button
onClick={() => {
const detailsImage = `https://readdy.ai/api/search-image?query=detailed birds eye view of ${track.name} F1 racing circuit layout with clear track markings and racing lines, high resolution aerial photography&width=1200&height=800&orientation=landscape`;
window.open(detailsImage, '_blank');
}}
className="!rounded-button mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 whitespace-nowrap">
<i className="fas fa-eye mr-2"></i>
View Details
</button>
</div>
</div>
))}
</div>
</>
)}
{currentPage === 'stats' && (
<div className="space-y-8">
<div className={`p-8 transition-all duration-300 rounded-3xl backdrop-blur-lg ${theme === 'light' ? 'bg-white/95 text-gray-900 border border-gray-100' : 'bg-[#1F1F2B]/95 text-white border border-white/5'}`}>
<div className="max-w-7xl mx-auto">
<div className="flex justify-between items-center mb-8">
<h1 className="text-4xl font-bold">2025</h1>
<h2 className="text-4xl font-bold">Drivers</h2>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{drivers.map((driver) => (
<div key={driver.position} className={`relative rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group hover:scale-[1.02] ${theme === 'light' ? 'bg-white border border-gray-100' : 'bg-[#1F1F2B] border border-white/5'}`}>
<div className="absolute top-4 left-4 text-7xl font-bold bg-gradient-to-r from-[#333333] to-transparent bg-clip-text text-transparent">
{String(driver.position).padStart(2, '0')}
</div>
<div className="flex items-end h-[280px] relative">
<img
src={driver.image}
alt={driver.name}
className="absolute inset-0 w-full h-full object-cover object-center"
/>
<div className={`relative z-10 p-8 w-full ${theme === 'light' ? 'bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent' : 'bg-gradient-to-t from-black via-black/80 to-transparent'}`}>
<div className="space-y-2">
<h3 className="text-2xl font-bold text-white">{driver.firstName}</h3>
<p className={`text-3xl font-bold ${driver.teamColor}`}>{driver.lastName}</p>
<p className="text-gray-400">{driver.team}</p>
</div>
<div className="mt-4">
<div className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">{driver.points} PTS</div>
</div>
</div>
</div>
<div className={`p-8 space-y-4 transition-colors duration-300 ${theme === 'light' ? 'bg-[#f5f6f8]' : 'bg-gradient-to-br from-[#1f1f1f] to-[#2a2a2a]'}`}>
<div className="space-y-2">
<div className="flex justify-between items-center">
<span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Wins</span>
<span className="font-bold">{driver.wins}</span>
</div>
<div className="flex justify-between items-center">
<span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Podiums</span>
<span className="font-bold">{driver.podiums}</span>
</div>
<div className="flex justify-between items-center">
<span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Fastest Laps</span>
<span className="font-bold">{driver.fastestLaps}</span>
</div>
</div>
<button
onClick={() => {
const detailsImage = `https://readdy.ai/api/search-image?query=professional F1 driver ${driver.name} in racing suit with determined expression, high quality studio lighting on dark background&width=1200&height=800&orientation=landscape`;
window.open(detailsImage, '_blank');
}}
className="!rounded-button mt-4 w-full bg-[#e10600] hover:bg-[#cc0500] text-white py-2 whitespace-nowrap">
View Full Stats
</button>
</div>
</div>
))}
</div>
</div>
</div>
</div>
)}
</div>
</div>
);
};
export default App;
// end
