const Booking = require('../../models/booking');
const Event = require('../../models/event');
const { bookingTransformer, eventTransformer } = require('./merge');


module.exports = {
    bookEvent: async (args)  => {
        try{
            const fetchedEvent = await Event.findOne({_id: args.eventId});
            const booking = new Booking({
                user: '5dd26712a80a6337a5d713a9',
                event: fetchedEvent
            });
    
            const result = await booking.save();
            return bookingTransformer(result);

        }catch(err) {
            throw err;
        }
    },
    cancelBooking: async (args)  => {
        try{
            const booking = await Booking.findById(args.bookingId).populate('event');
            
            const event = eventTransformer(booking.event);

            await Booking.deleteOne({
                _id: args.bookingId
            });
            return event;

        }catch(err) {
            throw err;
        }
    }
}


