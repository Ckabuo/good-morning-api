import {Message} from './types';

class MessageService {

    private messages: string[];
    private currentMessage: Message;
    private currentIndex: number;

    constructor() {
        this.messages = [
            "Rise and shine! It's a beautiful morning!",
            "Good morning! Make today amazing!",
            "Hello sunshine! Ready for a great day?",
            "Good morning! Seize the day!",
            "Another day, another opportunity. Good morning!"
        ];

        this.currentMessage = {
            text: this.messages[0],
            lastUpdated: new Date(),
        };

        this.currentIndex = 0;
    }

    private formatDate(date: Date) : string {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZoneName: "short",

        });
    }

    private shouldUpdateMessage(): boolean  {
        const now = new Date();
        const lastUpdate = this.currentMessage.lastUpdated;

        // Check if it's a new day and after 8 AM
        const isAfter8AM = now.getHours() >= 8;
        const isNextDay = now.getDate() !== lastUpdate.getDate();

        // Check if 24 hours have passed
        const hoursDiff = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
        const is24HoursPassed = hoursDiff >= 24;

        return (isNextDay && isAfter8AM) || is24HoursPassed;

        /*
        // For testing: Change 24 hours to 1 minute
        const minutesDiff = (now.getTime() - lastUpdate.getTime()) / (1000 * 60);
         // Will update after 1 minute
        return minutesDiff >= 1;
        */
    };

    public getAllMessages(): string[] {
        return [...this.messages];
    }

    public getMessage(): { text: string; lastUpdated: Date; formattedLastUpdated: string } {
        if (this.shouldUpdateMessage()) {
            this.currentIndex = (this.currentIndex + 1) % this.messages.length;
            this.currentMessage = {
                text: this.messages[this.currentIndex],
                lastUpdated: new Date(),
            };
        }
        return {
            text: this.currentMessage.text,
            lastUpdated: this.currentMessage.lastUpdated,
            formattedLastUpdated: this.formatDate(this.currentMessage.lastUpdated)
        };
    }

    public getMessageCount(): number {
        return this.messages.length;
    }

    public addMessage(message: string): void {
        if (!message.trim()) {
            throw new Error('Message cannot be empty');
        }
        this.messages.push(message);
    }

    public getCurrentMessageIndex(): number {
        return this.currentIndex;
    }

    public getLastUpdateTime(): {date: Date; formatted: string} {
        return {
            date: this.currentMessage.lastUpdated,
            formatted: this.formatDate(this.currentMessage.lastUpdated)
        };
    }

}

export const messageService = new MessageService();