import { json } from 'express'; // json faz exatamente o que o body parser fazia, o express integrou essa biblioteca dentro dele

export const bodyParser = json();
