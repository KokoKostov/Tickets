// controllers/ticket.controller.js
const Ticket = require('../models/ticket.model');

const createTicket = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const newTicket = new Ticket({
            ...req.body,
            user: userId
        });
        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (err) {
        next(err);
    }
};

const purchaseTicket = async (req, res, next) => {
    try {
        const ticketId = req.params.id;
        const userId = req.user.userId;
        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        if (ticket.buyer.includes(userId)) {
            return res.status(400).json({ message: 'You have already purchased this ticket' });
        }
        ticket.buyer.push(userId);
        await ticket.save();
        res.status(200).json({ message: 'Purchase successful' });
    } catch (err) {
        next(err);
    }
};


module.exports = { createTicket, purchaseTicket };
