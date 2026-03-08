export interface MeetupEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  description: string;
  image?: string;
}

export const meetupEvents: MeetupEvent[] = [
  { id: 1, title: "Classic Car Saturday", date: "Every Saturday", time: "6:00 PM - 9:00 PM", description: "Bring your vintage ride and share stories with fellow enthusiasts." },
  { id: 2, title: "Spirit Tasting Night", date: "First Friday", time: "7:00 PM - 10:00 PM", description: "A curated tasting of our newest spirits with expert guidance." },
  { id: 3, title: "Local Beats Live", date: "Bi-Weekly Sundays", time: "4:00 PM - 7:00 PM", description: "Chill vibes with local acoustic artists in our parking lounge." }
];
