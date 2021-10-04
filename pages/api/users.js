import dbConnect from '../../utils/dbConnect';
import User from '../../models/user';


export default async function handler (req, res) {
    const { method } = req
  
    await dbConnect();
  
    switch (method) {
      case 'POST':
        try {
          const user = await User.create(req.body)
          res.status(201).json({ success: true, data: user })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break
      default:
        res.status(400).json({ success: false })
        break
    }
};