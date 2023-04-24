import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {

    switch (req.method) {
        case 'GET':
            return res.status(200).json({ message: 'GET athletes' });
        case 'PUT':
            return res.status(200).json({ message: 'POST athletes' });
        case 'DELETE':
            return res.status(200).json({ message: 'DELETE athletes' });
        default:
            return res.status(200).json({ message: 'Method not supported!' });
    }

}