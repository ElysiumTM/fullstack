const Notification = require('../models/notification')
const withAuth = require('../withAuth')

function notificationRoutes(app) {
    app.post('/notification/add', withAuth, async (req, res) => {
        const data = {
        receiverUserId: req.body.receiverUserId,
        message: req.body.message,
        viewed: false
        }
    
        const notification = new Notification(data);
        const result = await notification.save();
        console.log(result);
        
        if (result.code) {
        res.status(result.code).json({ result });
        }
        
        res.status(200).json({ result });
    });

    app.get('/notification/:id', withAuth, async (req, res) => {
        const receiverUserId = req.params.receiverUserId;
        const notifications = await Notification.find({ receiverUserId });
    
        if (notifications.code) {
        res.status(notifications.code).json({ notifications });
        }
    
        res.status(200).json({ notifications });
    });

    app.put('/notification/view/:id', withAuth, async (req, res) => {
        const id = req.params.id;
        const result = await Notification.updateOne({ _id: id }, { viewed: true });
    
        if (result.code) {
        res.status(result.code).json({ result });
        }
    
        res.status(200).json({ result });
    });
};

module.exports = notificationRoutes;