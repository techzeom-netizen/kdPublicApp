export const student = {
  name: 'Aarav Kumar',
  className: 'Class 5 · Section A',
  admissionNo: 'KDPS-2026-0142',
  avatar: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=240&q=80',
  rollNo: '14',
  dateOfBirth: '18 August 2016',
  bloodGroup: 'B+',
  house: 'Tagore House',
  classTeacher: 'Mrs. Neha Sharma',
  session: '2026–27',
  address: 'Green Park, New Delhi, Delhi 110016',
};

export const parents = {
  mother: { name: 'Ananya Kumar', relation: 'Mother', phone: '+91 98765 43210', email: 'ananya.kumar@example.com', occupation: 'Architect' },
  father: { name: 'Rohan Kumar', relation: 'Father', phone: '+91 98765 43211', email: 'rohan.kumar@example.com', occupation: 'Business owner' },
};

export const notices = [
  { id: 'winter-exams', category: 'Academic', title: 'Winter examinations begin 8 December', date: '8 Dec', priority: 'Important', body: 'The detailed date sheet is now available. Students should carry their identity card and arrive 20 minutes before the examination.' },
  { id: 'ptm', category: 'Meeting', title: 'Parent-teacher meeting for Classes VI to X', date: '14 Nov', priority: 'Reminder', body: 'The PTM will be held from 9:00 AM to 12:30 PM. Appointment slots can be confirmed through the school office.' },
  { id: 'admissions', category: 'School', title: 'Registration is open for 2027–28', date: 'New', priority: 'Update', body: 'Sibling admission registration is open until 30 November. Please contact the admission desk for required documents.' },
  { id: 'sports-day', category: 'Event', title: 'Annual sports day practice schedule', date: '21 Nov', priority: 'Event', body: 'Selected students will stay for practice until 3:30 PM on Monday, Wednesday and Friday.' },
];

export const homework = [
  { id: 'math-fractions', subject: 'Mathematics', title: 'Fractions worksheet', detail: 'Complete questions 1–12 in the practice notebook.', due: 'Due today', status: 'Pending', date: 'Mon, 9 Nov', color: '#233F77' },
  { id: 'english-reading', subject: 'English', title: 'Read chapter 6 and answer Q1–5', detail: 'Write complete answers and underline new vocabulary.', due: 'Due tomorrow', status: 'Pending', date: 'Tue, 10 Nov', color: '#7A1724' },
  { id: 'science-plants', subject: 'Science', title: 'Parts of a flower diagram', detail: 'Draw, colour and label the diagram on an A4 sheet.', due: 'Due 12 Nov', status: 'Pending', date: 'Thu, 12 Nov', color: '#188B62' },
  { id: 'hindi-poem', subject: 'Hindi', title: 'Learn poem “Prakriti”', detail: 'Prepare for oral recitation in class.', due: 'Completed', status: 'Completed', date: 'Fri, 6 Nov', color: '#D97706' },
];

export const feePayments = [
  { id: 'KD-APR-1048', label: 'Tuition fee · Term 1', amount: '₹12,000', date: '10 Apr 2026' },
  { id: 'KD-APR-1051', label: 'Transport fee · Term 1', amount: '₹3,000', date: '10 Apr 2026' },
  { id: 'KD-JUL-2214', label: 'Tuition fee · Term 2', amount: '₹12,000', date: '15 Jul 2026' },
];

export const timetable = {
  Monday: [
    { time: '8:00–8:40', subject: 'Mathematics', teacher: 'Ms. Ritu', room: '5-A' },
    { time: '8:40–9:20', subject: 'English', teacher: 'Mrs. Mehta', room: '5-A' },
    { time: '9:20–10:00', subject: 'Science', teacher: 'Mr. Dev', room: 'Lab 2' },
    { time: '10:20–11:00', subject: 'Social Science', teacher: 'Mrs. Kaur', room: '5-A' },
    { time: '11:00–11:40', subject: 'Computer', teacher: 'Mr. Anand', room: 'IT Lab' },
    { time: '11:40–12:20', subject: 'Hindi', teacher: 'Mrs. Joshi', room: '5-A' },
  ],
  Tuesday: [
    { time: '8:00–8:40', subject: 'English', teacher: 'Mrs. Mehta', room: '5-A' },
    { time: '8:40–9:20', subject: 'Mathematics', teacher: 'Ms. Ritu', room: '5-A' },
    { time: '9:20–10:00', subject: 'Hindi', teacher: 'Mrs. Joshi', room: '5-A' },
    { time: '10:20–11:00', subject: 'Art & Craft', teacher: 'Ms. Naina', room: 'Art Room' },
    { time: '11:00–11:40', subject: 'Science', teacher: 'Mr. Dev', room: '5-A' },
    { time: '11:40–12:20', subject: 'Physical Education', teacher: 'Mr. Rana', room: 'Ground' },
  ],
  Wednesday: [
    { time: '8:00–8:40', subject: 'Science', teacher: 'Mr. Dev', room: '5-A' },
    { time: '8:40–9:20', subject: 'Social Science', teacher: 'Mrs. Kaur', room: '5-A' },
    { time: '9:20–10:00', subject: 'Mathematics', teacher: 'Ms. Ritu', room: '5-A' },
    { time: '10:20–11:00', subject: 'English', teacher: 'Mrs. Mehta', room: 'Library' },
    { time: '11:00–11:40', subject: 'Music', teacher: 'Ms. Roy', room: 'Music Room' },
    { time: '11:40–12:20', subject: 'Hindi', teacher: 'Mrs. Joshi', room: '5-A' },
  ],
  Thursday: [
    { time: '8:00–8:40', subject: 'Mathematics', teacher: 'Ms. Ritu', room: '5-A' },
    { time: '8:40–9:20', subject: 'Computer', teacher: 'Mr. Anand', room: 'IT Lab' },
    { time: '9:20–10:00', subject: 'English', teacher: 'Mrs. Mehta', room: '5-A' },
    { time: '10:20–11:00', subject: 'Science', teacher: 'Mr. Dev', room: 'Lab 2' },
    { time: '11:00–11:40', subject: 'Social Science', teacher: 'Mrs. Kaur', room: '5-A' },
    { time: '11:40–12:20', subject: 'Library', teacher: 'Mrs. Sethi', room: 'Library' },
  ],
  Friday: [
    { time: '8:00–8:40', subject: 'Hindi', teacher: 'Mrs. Joshi', room: '5-A' },
    { time: '8:40–9:20', subject: 'Mathematics', teacher: 'Ms. Ritu', room: '5-A' },
    { time: '9:20–10:00', subject: 'English', teacher: 'Mrs. Mehta', room: '5-A' },
    { time: '10:20–11:00', subject: 'General Knowledge', teacher: 'Mrs. Sharma', room: '5-A' },
    { time: '11:00–11:40', subject: 'Club Activity', teacher: 'Faculty team', room: 'Activity Hall' },
    { time: '11:40–12:20', subject: 'Physical Education', teacher: 'Mr. Rana', room: 'Ground' },
  ],
};

export const results = [
  { subject: 'Mathematics', marks: 91, total: 100, grade: 'A1', trend: '+4%' },
  { subject: 'English', marks: 86, total: 100, grade: 'A2', trend: '+2%' },
  { subject: 'Science', marks: 82, total: 100, grade: 'A2', trend: '+5%' },
  { subject: 'Social Science', marks: 80, total: 100, grade: 'A2', trend: '+1%' },
  { subject: 'Hindi', marks: 78, total: 100, grade: 'B1', trend: '+3%' },
];

export const achievements = [
  { id: 'quiz', title: 'Inter-house Science Quiz', award: '1st position', date: '28 Oct 2026', category: 'Academic', description: 'Represented Tagore House and led the team through the final round.' },
  { id: 'art', title: 'Colours of India Art Fest', award: 'Special mention', date: '12 Sep 2026', category: 'Creative', description: 'Artwork selected for display in the annual school exhibition.' },
  { id: 'reading', title: 'Reading Champion', award: 'Gold badge', date: '31 Aug 2026', category: 'School', description: 'Completed 20 age-appropriate books during the summer reading programme.' },
  { id: 'relay', title: 'Junior Relay Team', award: '2nd position', date: '18 Jul 2026', category: 'Sports', description: 'Won silver with the Class V 4 × 100 metre relay team.' },
];
