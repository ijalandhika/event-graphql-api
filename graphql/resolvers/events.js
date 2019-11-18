const { dateToString } = require('../../helpers/date');
const Event = require('../../models/event');
const User = require('../../models/user');
const { eventTransformer } = require('./merge');


module.exports = {
    events: async() => {
        try{
            
            const events = await Event.find();
            return events.map(event => eventTransformer(event));
        }catch(err) {
            throw err;
        }
    },
    createEvent: async (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date().toISOString(),
            creator: '5dd26712a80a6337a5d713a9'
        });

        let createdEvent  = {};
        
        try{
            const eventResult = await event.save();
            createdEvent = eventTransformer(eventResult);

            const creator = await User.findById('5dd26712a80a6337a5d713a9');
            if (!creator) {
                throw new  Error('User not found.');
            }
            creator.createdEvents.push(event);
            await creator.save();

            return createdEvent;
        }catch(err){
            throw err;
        }
    }
}