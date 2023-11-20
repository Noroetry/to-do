import cors from 'cors';
export const corsMw = () => 
    cors({
        origin: (origin, callback) => {
            const ACCEPTED_ORIGINS = [
                'http://localhost:8080',
                'http://localhost:3000',
                'http://www.google.com'
            ];

            if (ACCEPTED_ORIGINS.includes(origin)){
                return callback(null, true);
            }
            if (!origin){
                return callback(null, true);
            }
            return callback(new Error('Not Allowed Origin Cors...'));
        }
    })