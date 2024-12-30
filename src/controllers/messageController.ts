import { Request, Response } from 'express';
import { messageService } from "../messageService";

export class MessageController {
    getMessage(req: Request, res: Response) {
        try {
            const message = messageService.getMessage()
            res.status(200).json(message.text);

        } catch ( error ) {
            console.error( 'Error getting message:', error );
            res.status(500).json({
                status: false,
                message: 'Error getting message:', error
            });
        }
    }

    getAllMessages(req: Request, res: Response) {
        try {
            const messages = messageService.getAllMessages();

            res.status(200).json({
                status: true,
                messages: messages
            });
        } catch (error) {
            console.error( 'Error getting all messages:', error );
            res.status(500).json({
                status: false,
                message: 'Error getting all messages:', error
            })
        }
    }

    getCurrentMessageIndex(req: Request, res: Response) {
        try {
            const index = messageService.getCurrentMessageIndex();
            res.status(200).json({
                status: true,
                currentIndex: index
            })

        } catch (error) {
            console.error( 'Error getting current message index:', error );
            res.status(500).json({
                status: false,
                message: 'Error getting current message index:', error
            })
        }
    }

    getLastUpdateTime(req: Request, res: Response) {
        try {
            const lastUpdate = messageService.getLastUpdateTime();
            res.status(200).json({
                status: true,
                lastUpdateTime: lastUpdate.formatted
            })
        } catch (error) {
            console.error( 'Error getting last update time:', error );
            res.status(500).json({
                status: false,
                message: 'Error getting last update time:', error
            })
        }
    }

    getMessageCount(req: Request, res: Response) {
        try {
            const count = messageService.getMessageCount();

            res.status(200).json({
                status: true,
                message: `There are a total of ${count} messages`
            });
        } catch (error) {
            console.error( 'Error getting message count:', error );
            res.status(500).json({
                status: false,
                message: 'Error getting message count:', error
            })
        }
    }

    addMessage(req: Request, res: Response) {
        const { message } = req.body;

        if (!message || typeof message !== 'string') {
            res.status(400).json({
                status: false,
                error: 'Invalid message format'
            })
        }

        messageService.addMessage(message);
        res.status(201).json({
            status: true,
            message: 'Message added successfully',
        })

    }

}

export const messageController = new MessageController();