import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {

    switch (req.method) {
        case 'GET':
            return res.status(200).json({ message: 'GET athletes' });
        case 'POST':
            return res.status(200).json({ message: 'POST athletes' });
        default:
            return res.status(200).json({ message: 'Method not supported!' });
    }

}