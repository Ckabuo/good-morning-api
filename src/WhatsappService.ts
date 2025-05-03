import https from 'https';
import { config } from './config';

interface RequestOptions {
    method: string;
    hostname: string;
    port: number | null;
    path: string;
    headers: {
        'x-rapidapi-key': string;
        'x-rapidapi-host': string;
        'Content-Type': string;
    };
}

interface MessagePayload {
    token: string;
    phone_number_or_group_id: string;
    is_group: boolean;
    message: string;
    quoted_message_id?: string;
    quoted_phone_number?: string;
    reply_privately?: boolean;
    reply_privately_group_id?: string;
}

export async function sendWhatsAppMessage(message: string): Promise<void> {
    // const recipients: string[] = [
    //     '+2348131828508',
    //     '+2347065268751',
    // ];
    const recipients: string[] = config.recipientNumbers;

    const options: RequestOptions = {
        method: 'POST',
        hostname: 'whatsapp-messaging-hub.p.rapidapi.com',
        port: null,
        path: '/WhatsappSendMessage',
        headers: {
            'x-rapidapi-key': config.yourRapidAPIKey,
            'x-rapidapi-host': 'whatsapp-messaging-hub.p.rapidapi.com',
            'Content-Type': 'application/json',
        },
    };


    recipients.forEach((recipient) => {
        const payload: MessagePayload = {
            token: config.yourApiToken,
            phone_number_or_group_id: recipient,
            is_group: false,
            // message: 'Hello! I dey active my guy. This API really works! https://rapidapi.com/finestoreuk/api/whatsapp-messaging-hub',
            message,
            quoted_message_id: '',
            quoted_phone_number: '',
            reply_privately: false,
            reply_privately_group_id: '',
        };


    const req = https.request(options, (res) => {
        const chunks: Buffer[] = [];

        res.on('data', (chunk) => {
            chunks.push(chunk);
        });

        res.on('end', () => {
            const body = Buffer.concat(chunks);
            console.log(`Response from WhatsApp API [${recipient}]:`, body.toString());
        });
    });

    req.on('error', (e) => {
        console.error('Error sending WhatsApp message ${recipient}:', e.message);
    });

    req.write(JSON.stringify(payload));
    req.end();
    });
}
